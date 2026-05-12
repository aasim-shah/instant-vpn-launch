type WebMcpTool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  execute: (input?: Record<string, unknown>) => unknown;
};

type ModelContext = {
  provideContext?: (context: { tools: WebMcpTool[] }) => void | Promise<void>;
};

const routes = {
  home: '/',
  platform: '/platform',
  docs: '/sdk/docs',
  contact: '/contact',
  blog: '/blog',
  caseStudies: '/case-studies',
} as const;

function navigateTo(route: keyof typeof routes) {
  window.history.pushState({}, '', routes[route]);
  window.dispatchEvent(new PopStateEvent('popstate'));
  return { route, url: `${window.location.origin}${routes[route]}` };
}

export function registerWebMcpTools() {
  if (typeof window === 'undefined') return;

  const modelContext = (navigator as Navigator & { modelContext?: ModelContext }).modelContext;
  if (!modelContext?.provideContext) return;

  modelContext.provideContext({
    tools: [
      {
        name: 'navigate_fyreway',
        description: 'Navigate to a key FyreWay page.',
        inputSchema: {
          type: 'object',
          properties: {
            route: {
              type: 'string',
              enum: Object.keys(routes),
              description: 'The FyreWay page to open.',
            },
          },
          required: ['route'],
          additionalProperties: false,
        },
        execute(input = {}) {
          const route = input.route as keyof typeof routes;
          if (!Object.prototype.hasOwnProperty.call(routes, route)) {
            throw new Error('Unknown FyreWay route.');
          }
          return navigateTo(route);
        },
      },
      {
        name: 'get_fyreway_discovery_links',
        description: 'Return FyreWay discovery URLs for agents.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false,
        },
        execute() {
          const origin = window.location.origin;
          return {
            sitemap: `${origin}/sitemap.xml`,
            robots: `${origin}/robots.txt`,
            apiCatalog: `${origin}/.well-known/api-catalog`,
            agentSkills: `${origin}/.well-known/agent-skills/index.json`,
            mcpServerCard: `${origin}/.well-known/mcp/server-card.json`,
            sdkDocs: `${origin}/sdk/docs`,
          };
        },
      },
    ],
  });
}
