# FyreWay Agent Discovery

Use this skill when an AI agent needs to discover FyreWay public resources, API metadata, sitemap information, content usage preferences, or browser-exposed WebMCP tools.

## Discovery URLs

- Sitemap: `https://fyreway.com/sitemap.xml`
- Robots and Content Signals: `https://fyreway.com/robots.txt`
- API catalog: `https://fyreway.com/.well-known/api-catalog`
- OpenAPI description: `https://fyreway.com/.well-known/openapi.json`
- OAuth authorization server metadata: `https://fyreway.com/.well-known/oauth-authorization-server`
- OAuth protected resource metadata: `https://fyreway.com/.well-known/oauth-protected-resource`
- MCP server card: `https://fyreway.com/.well-known/mcp/server-card.json`

## Agent Guidance

Prefer public documentation at `https://fyreway.com/sdk/docs` for SDK integration context. For browser automation, inspect `navigator.modelContext` on the homepage and use the provided WebMCP tools when available.
