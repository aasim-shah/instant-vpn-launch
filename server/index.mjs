// SEO runtime for the VPS deployment.
//
// The site is a static Vite SPA served by Nginx from dist/. Per-article meta
// and the blog sitemap need a runtime, so Nginx proxies exactly two things to
// this tiny zero-dependency Node service (run under PM2):
//
//   /sitemap.xml      -> live sitemap (static + case studies + ALL blogs)
//   /blog/<slug>      -> dist/index.html with real <title>/OG/JSON-LD injected
//
// Everything else stays on Nginx (static assets + SPA fallback to index.html).
// Requires Node 18+ (global fetch). No npm install required.

import { createServer } from 'node:http';
import { readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

// ─── Configuration (override via env when starting under PM2) ──────────────────

const PORT = Number(process.env.SEO_PORT || 3001);
const DIST_DIR = process.env.DIST_DIR || '/home/vpn-sales-landing-page/dist';
const SITE_URL = (process.env.SITE_URL || 'https://fyreway.com').replace(/\/$/, '');
const SITE_NAME = process.env.SITE_NAME || 'FyreWay';
const DEFAULT_OG_IMAGE = `${SITE_URL}/image3.png`;

const apiRoot = (process.env.VITE_INFRASTRUCTURE_API_BASE_URL || 'https://infra-api-prod.fyreway.com').replace(/\/$/, '');
const apiBase = apiRoot.endsWith('/api/v1') ? apiRoot : `${apiRoot}/api/v1`;
const cmsPrefix = `${apiBase}/cms`;
const imageBase = apiBase.replace(/\/api\/v\d+$/, '');

// Static SPA routes. Change via code + redeploy, so they are inlined here.
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
  { path: '/sdk/docs/v3', priority: 0.8, changefreq: 'monthly' },
  { path: '/sdk/docs/v3/whats-new', priority: 0.7, changefreq: 'monthly' },
  { path: '/sdk/docs/v3/getting-started', priority: 0.75, changefreq: 'monthly' },
  { path: '/sdk/docs/v3/server-discovery', priority: 0.7, changefreq: 'monthly' },
  { path: '/sdk/docs/v3/connection-lifecycle', priority: 0.7, changefreq: 'monthly' },
  { path: '/sdk/docs/v3/smart-connect', priority: 0.7, changefreq: 'monthly' },
  { path: '/sdk/docs/v3/error-handling', priority: 0.65, changefreq: 'monthly' },
  { path: '/sdk/docs/v3/ui-utilities', priority: 0.65, changefreq: 'monthly' },
  { path: '/sdk/docs/v3/configuration', priority: 0.7, changefreq: 'monthly' },
];

// Case studies are static mock data — keep in sync with src/content/caseStudyData.ts.
const caseStudyRoutes = [
  { slug: 'securemobile-vpn-app-launch', date: '2026-01-15' },
  { slug: 'enterprise-saas-remote-access', date: '2026-01-10' },
  { slug: 'iot-device-security-platform', date: '2025-12-20' },
  { slug: 'gaming-platform-latency-optimization', date: '2025-11-28' },
].map((cs) => ({ path: `/case-studies/${cs.slug}`, lastmod: cs.date, priority: 0.7, changefreq: 'monthly' }));

// ─── Helpers ──────────────────────────────────────────────────────────────────

const today = () => new Date().toISOString();

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;').replaceAll("'", '&apos;');
}

function escapeAttr(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function escapeHtml(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
}

function normalizeDate(value) {
  if (!value) return today();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? today() : date.toISOString();
}

function toAbsoluteImage(path) {
  if (!path) return undefined;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${imageBase}${path.startsWith('/') ? path : `/${path}`}`;
}

function stripTags(html) {
  return String(html)
    .replace(/<[^>]+>/g, ' ')
    .replaceAll('&nbsp;', ' ').replaceAll('&amp;', '&').replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'").replaceAll('&lt;', '<').replaceAll('&gt;', '>')
    .replace(/\s+/g, ' ').trim();
}

async function fetchJson(url) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
    return await res.json();
  } finally {
    clearTimeout(timeout);
  }
}

// ─── index.html shell (cached, refreshed when the file changes on disk) ─────────

let shellCache = { mtimeMs: 0, html: '' };
function readShell() {
  const file = join(DIST_DIR, 'index.html');
  const { mtimeMs } = statSync(file);
  if (mtimeMs !== shellCache.mtimeMs) {
    shellCache = { mtimeMs, html: readFileSync(file, 'utf8') };
  }
  return shellCache.html;
}

// ─── Sitemap ────────────────────────────────────────────────────────────────

async function fetchAllBlogRoutes() {
  const limit = 100;
  const routes = [];
  try {
    let page = 1;
    while (page <= 100) {
      const json = await fetchJson(`${cmsPrefix}/blogs/public?page=${page}&limit=${limit}`);
      const items = json?.body?.data || [];
      for (const item of items) {
        if (!item?.slug) continue;
        routes.push({
          path: `/blog/${item.slug}`,
          lastmod: normalizeDate(item.updatedAt || item.publishedAt || item.createdAt),
          priority: 0.75,
          changefreq: 'weekly',
          image: toAbsoluteImage(item.featuredImage),
        });
      }
      const totalPages = json?.body?.pagination?.totalPages;
      if (items.length < limit || (totalPages && page >= totalPages)) break;
      page += 1;
    }
  } catch (error) {
    console.warn(`sitemap: skipping blog routes — ${error.message}`);
  }
  return routes;
}

function routeToXml(route) {
  const lines = [
    '  <url>',
    `    <loc>${escapeXml(`${SITE_URL}${route.path}`)}</loc>`,
    `    <lastmod>${escapeXml(route.lastmod || today())}</lastmod>`,
    `    <changefreq>${escapeXml(route.changefreq)}</changefreq>`,
    `    <priority>${route.priority.toFixed(2)}</priority>`,
  ];
  if (route.image) {
    lines.push('    <image:image>', `      <image:loc>${escapeXml(route.image)}</image:loc>`, '    </image:image>');
  }
  lines.push('  </url>');
  return lines.join('\n');
}

async function buildSitemap() {
  const blogRoutes = await fetchAllBlogRoutes();
  const all = [
    ...staticRoutes.map((r) => ({ ...r, lastmod: today() })),
    ...caseStudyRoutes,
    ...blogRoutes,
  ];
  const deduped = [...new Map(all.map((r) => [r.path, r])).values()].sort((a, b) => a.path.localeCompare(b.path));
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...deduped.map(routeToXml),
    '</urlset>',
    '',
  ].join('\n');
}

// ─── Blog prerender ───────────────────────────────────────────────────────────

function parseFaqs(content) {
  const faqs = [];
  const re = /<h[2-4][^>]*>([\s\S]*?)<\/h[2-4]>\s*<p[^>]*>([\s\S]*?)<\/p>/gi;
  let match;
  while ((match = re.exec(content)) !== null) {
    const heading = stripTags(match[1]);
    if (!/^faq\s*:/i.test(heading)) continue;
    const question = heading.replace(/^faq\s*:\s*/i, '').trim();
    const answer = stripTags(match[2]);
    if (question && answer) faqs.push({ question, answer });
  }
  return faqs;
}

function withBrandSuffix(title) {
  return title.endsWith(`| ${SITE_NAME}`) ? title : `${title} | ${SITE_NAME}`;
}

function replaceMetaByName(html, name, content) {
  const re = new RegExp(`(<meta\\s+name="${name}"\\s+content=")[^"]*(")`, 'i');
  if (re.test(html)) return html.replace(re, `$1${escapeAttr(content)}$2`);
  return html.replace('</head>', `    <meta name="${name}" content="${escapeAttr(content)}" />\n  </head>`);
}

function replaceMetaByProperty(html, property, content) {
  const re = new RegExp(`(<meta\\s+property="${property}"\\s+content=")[^"]*(")`, 'i');
  if (re.test(html)) return html.replace(re, `$1${escapeAttr(content)}$2`);
  return html.replace('</head>', `    <meta property="${property}" content="${escapeAttr(content)}" />\n  </head>`);
}

function injectMeta(html, post, slug) {
  const canonical = `${SITE_URL}/blog/${slug}`;
  const title = withBrandSuffix(post.metaTitle || post.title || 'Blog');
  const description = post.metaDescription || post.summary || post.subtitle || post.subTitle || `Read ${post.title} from ${SITE_NAME}.`;
  const image = toAbsoluteImage(post.featuredImage) || DEFAULT_OG_IMAGE;
  const publishedTime = post.publishedAt || post.createdAt;
  const tags = Array.isArray(post.tags) ? post.tags : [];

  let out = html;
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);
  out = replaceMetaByName(out, 'title', title);
  out = replaceMetaByName(out, 'description', description);
  if (tags.length) out = replaceMetaByName(out, 'keywords', tags.join(', '));

  out = replaceMetaByProperty(out, 'og:type', 'article');
  out = replaceMetaByProperty(out, 'og:url', canonical);
  out = replaceMetaByProperty(out, 'og:title', title);
  out = replaceMetaByProperty(out, 'og:description', description);
  out = replaceMetaByProperty(out, 'og:image', image);
  out = replaceMetaByProperty(out, 'og:image:alt', post.title || title);

  out = replaceMetaByName(out, 'twitter:card', 'summary_large_image');
  out = replaceMetaByName(out, 'twitter:url', canonical);
  out = replaceMetaByName(out, 'twitter:title', title);
  out = replaceMetaByName(out, 'twitter:description', description);
  out = replaceMetaByName(out, 'twitter:image', image);
  out = replaceMetaByName(out, 'twitter:image:alt', post.title || title);

  if (/<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i.test(out)) {
    out = out.replace(/(<link\s+rel="canonical"\s+href=")[^"]*(")/i, `$1${escapeAttr(canonical)}$2`);
  } else {
    out = out.replace('</head>', `    <link rel="canonical" href="${escapeAttr(canonical)}" />\n  </head>`);
  }

  const blogPosting = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description,
    image,
    datePublished: publishedTime,
    dateModified: post.updatedAt || publishedTime,
    author: { '@type': 'Person', name: post.author?.name || SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME, url: SITE_URL, logo: { '@type': 'ImageObject', url: `${SITE_URL}/logo.png` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': canonical },
    keywords: tags.join(', '),
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
    ],
  };
  const scripts = [blogPosting, breadcrumb];
  const faqs = parseFaqs(post.content || '');
  if (faqs.length) {
    scripts.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } })),
    });
  }
  const jsonLd = scripts.map((s) => `    <script type="application/ld+json" data-seo-managed="true">${JSON.stringify(s)}</script>`).join('\n');
  out = out.replace('</head>', `${jsonLd}\n  </head>`);
  return out;
}

async function renderBlog(slug) {
  let html = readShell();
  if (!slug) return html;
  try {
    const json = await fetchJson(`${cmsPrefix}/blogs/public/${encodeURIComponent(slug)}`);
    const post = json?.body;
    if (post) html = injectMeta(html, post, slug);
  } catch (error) {
    console.warn(`blog-meta: prerender skipped for "${slug}" — ${error.message}`);
  }
  return html;
}

// ─── HTTP server ──────────────────────────────────────────────────────────────

const server = createServer(async (req, res) => {
  try {
    const url = new URL(req.url, `http://localhost:${PORT}`);
    const pathname = decodeURIComponent(url.pathname);

    if (pathname === '/sitemap.xml') {
      const xml = await buildSitemap();
      res.writeHead(200, {
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600',
      });
      res.end(xml);
      return;
    }

    const blogMatch = pathname.match(/^\/blog\/([^/]+)\/?$/);
    if (blogMatch) {
      const html = await renderBlog(blogMatch[1]);
      res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=600',
      });
      res.end(html);
      return;
    }

    // Health check + anything else this service shouldn't own.
    if (pathname === '/healthz') {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end('ok');
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Not handled by SEO service');
  } catch (error) {
    console.error('SEO service error:', error);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Internal error');
  }
});

server.listen(PORT, () => {
  console.log(`SEO service listening on http://127.0.0.1:${PORT} (dist: ${DIST_DIR}, cms: ${cmsPrefix})`);
});
