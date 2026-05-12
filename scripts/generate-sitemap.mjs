import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = 'https://fyreway.com';
const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, '..');
const today = new Date().toISOString();

const staticRoutes = [
  { path: '/', priority: 1.0, changefreq: 'weekly' },
  { path: '/platform', priority: 0.9, changefreq: 'monthly' },
  { path: '/content', priority: 0.8, changefreq: 'weekly' },
  { path: '/blog', priority: 0.8, changefreq: 'weekly' },
  { path: '/case-studies', priority: 0.8, changefreq: 'monthly' },
  { path: '/newsletter', priority: 0.7, changefreq: 'weekly' },
  { path: '/newsletter/subscribe', priority: 0.6, changefreq: 'monthly' },
  { path: '/about', priority: 0.6, changefreq: 'monthly' },
  { path: '/contact', priority: 0.6, changefreq: 'monthly' },
  { path: '/community', priority: 0.6, changefreq: 'monthly' },
  { path: '/community/discord', priority: 0.5, changefreq: 'monthly' },
  { path: '/community/team', priority: 0.5, changefreq: 'monthly' },
  { path: '/partners', priority: 0.6, changefreq: 'monthly' },
  { path: '/partners/affiliate', priority: 0.6, changefreq: 'monthly' },
  { path: '/partners/reviews', priority: 0.5, changefreq: 'monthly' },
  { path: '/pages', priority: 0.5, changefreq: 'weekly' },
  { path: '/sdk/docs', priority: 0.8, changefreq: 'monthly' },
  { path: '/sdk/docs/whats-new', priority: 0.7, changefreq: 'monthly' },
  { path: '/sdk/docs/getting-started', priority: 0.75, changefreq: 'monthly' },
  { path: '/sdk/docs/server-discovery', priority: 0.7, changefreq: 'monthly' },
  { path: '/sdk/docs/connection-lifecycle', priority: 0.7, changefreq: 'monthly' },
  { path: '/sdk/docs/smart-connect', priority: 0.7, changefreq: 'monthly' },
  { path: '/sdk/docs/error-handling', priority: 0.65, changefreq: 'monthly' },
  { path: '/sdk/docs/ui-utilities', priority: 0.65, changefreq: 'monthly' },
  { path: '/sdk/docs/configuration', priority: 0.7, changefreq: 'monthly' },
];

const apiRoot = (process.env.VITE_INFRASTRUCTURE_API_BASE_URL || 'https://infra-api.fyreway.com').replace(/\/$/, '');
const apiBase = apiRoot.endsWith('/api/v1') ? apiRoot : `${apiRoot}/api/v1`;
const cmsPrefix = `${apiBase}/cms`;

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function normalizeDate(value) {
  if (!value) return today;

  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? today : date.toISOString();
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchCmsRoutes(endpoint, routePrefix, priority, changefreq) {
  try {
    const response = await fetchJson(`${cmsPrefix}/${endpoint}?page=1&limit=100`);
    const items = response?.body?.data || [];

    return items
      .filter((item) => item?.slug)
      .map((item) => ({
        path: `${routePrefix}/${item.slug}`,
        lastmod: normalizeDate(item.updatedAt || item.publishedAt || item.createdAt),
        priority,
        changefreq,
      }));
  } catch (error) {
    console.warn(`Skipping CMS sitemap entries for ${endpoint}: ${error.message}`);
    return [];
  }
}

function getCaseStudyRoutes() {
  const sourcePath = join(rootDir, 'src/content/caseStudyData.ts');
  const source = readFileSync(sourcePath, 'utf8');
  const matches = [...source.matchAll(/slug:\s*"([^"]+)"[\s\S]*?date:\s*"([^"]+)"/g)];

  return matches.map((match) => ({
    path: `/case-studies/${match[1]}`,
    lastmod: normalizeDate(match[2]),
    priority: 0.7,
    changefreq: 'monthly',
  }));
}

function routeToXml(route) {
  return [
    '  <url>',
    `    <loc>${escapeXml(`${SITE_URL}${route.path}`)}</loc>`,
    `    <lastmod>${escapeXml(route.lastmod || today)}</lastmod>`,
    `    <changefreq>${escapeXml(route.changefreq)}</changefreq>`,
    `    <priority>${route.priority.toFixed(2)}</priority>`,
    '  </url>',
  ].join('\n');
}

async function main() {
  const cmsRoutes = [
    ...(await fetchCmsRoutes('blogs/public', '/blog', 0.75, 'weekly')),
    ...(await fetchCmsRoutes('newsletters/public', '/newsletter', 0.65, 'weekly')),
    ...(await fetchCmsRoutes('pages/public', '/page', 0.6, 'monthly')),
  ];

  const routes = [
    ...staticRoutes.map((route) => ({ ...route, lastmod: today })),
    ...getCaseStudyRoutes(),
    ...cmsRoutes,
  ];

  const dedupedRoutes = [...new Map(routes.map((route) => [route.path, route])).values()]
    .sort((a, b) => a.path.localeCompare(b.path));

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...dedupedRoutes.map(routeToXml),
    '</urlset>',
    '',
  ].join('\n');

  const sitemapPath = join(rootDir, 'public/sitemap.xml');
  writeFileSync(sitemapPath, xml, 'utf8');
  console.log(`Generated ${dedupedRoutes.length} sitemap URLs at public/sitemap.xml`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
