const siteUrl = 'https://fyreway.com';

const markdownByPath: Record<string, string> = {
  '/': `# FyreWay

Launch production-ready VPN infrastructure in minutes.

FyreWay provides pre-configured VPN infrastructure, global locations, SDK documentation, and monitoring for SaaS and app teams.

## Useful Resources

- Platform: ${siteUrl}/platform
- SDK documentation: ${siteUrl}/sdk/docs
- Content hub: ${siteUrl}/content
- Blog: ${siteUrl}/blog
- Case studies: ${siteUrl}/case-studies
- Contact sales: ${siteUrl}/contact
- Sitemap: ${siteUrl}/sitemap.xml
- API catalog: ${siteUrl}/.well-known/api-catalog
- Agent skills: ${siteUrl}/.well-known/agent-skills/index.json
`,
  '/platform': `# FyreWay VPN Backend Platform

Explore FyreWay's developer-first VPN backend platform with global servers, WireGuard and OpenVPN support, analytics, and automated scaling.

## Useful Resources

- SDK documentation: ${siteUrl}/sdk/docs
- Contact sales: ${siteUrl}/contact
- API catalog: ${siteUrl}/.well-known/api-catalog
`,
  '/sdk/docs': `# FyreWay SDK Documentation

Developer documentation for integrating the FyreWay VPN SDK, including setup, server discovery, smart connect, connection lifecycle, error handling, UI utilities, and configuration.

## Sections

- Getting started: ${siteUrl}/sdk/docs/getting-started
- Server discovery: ${siteUrl}/sdk/docs/server-discovery
- Connection lifecycle: ${siteUrl}/sdk/docs/connection-lifecycle
- Smart connect: ${siteUrl}/sdk/docs/smart-connect
- Error handling: ${siteUrl}/sdk/docs/error-handling
- UI utilities: ${siteUrl}/sdk/docs/ui-utilities
- Configuration: ${siteUrl}/sdk/docs/configuration
`,
};

const routeTitles: Record<string, string> = {
  '/about': 'About FyreWay',
  '/blog': 'FyreWay Blog',
  '/case-studies': 'FyreWay Case Studies',
  '/community': 'FyreWay Community',
  '/contact': 'Contact FyreWay Sales',
  '/content': 'FyreWay Content Hub',
  '/newsletter': 'FyreWay Newsletter',
  '/partners': 'FyreWay Partners',
};

function acceptsMarkdown(request: Request) {
  return request.headers.get('accept')?.toLowerCase().includes('text/markdown') ?? false;
}

export const config = {
  matcher: '/((?!assets|\\.well-known|sitemap.xml|robots.txt|favicon.png).*)',
};

export default function middleware(request: Request) {
  if (!acceptsMarkdown(request)) {
    return;
  }

  const path = new URL(request.url).pathname.replace(/\/$/, '') || '/';
  const markdown = markdownByPath[path] ?? `# ${routeTitles[path] ?? 'FyreWay'}

FyreWay provides production-ready VPN infrastructure, SDK documentation, global locations, and monitoring for SaaS and app teams.

## Useful Resources

- Homepage: ${siteUrl}/
- Platform: ${siteUrl}/platform
- SDK documentation: ${siteUrl}/sdk/docs
- Contact sales: ${siteUrl}/contact
- Sitemap: ${siteUrl}/sitemap.xml
- API catalog: ${siteUrl}/.well-known/api-catalog
`;
  const tokenCount = Math.ceil(markdown.split(/\s+/).filter(Boolean).length * 1.33);

  return new Response(markdown, {
    status: 200,
    headers: {
      'Cache-Control': 'public, max-age=0, must-revalidate',
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept',
      'x-markdown-tokens': String(tokenCount),
    },
  });
}
