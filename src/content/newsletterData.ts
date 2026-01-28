// Mock newsletter data
export interface Newsletter {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  category: string;
  tags: string[];
  image?: string;
}

export const newsletters: Newsletter[] = [
  {
    slug: "january-2026-product-updates",
    title: "January 2026 Product Updates",
    excerpt: "New features, performance improvements, and what's coming next for Fyreway.",
    content: `# January 2026 Product Updates

Welcome to our monthly product newsletter! Here's what's new at Fyreway.

## 🚀 New Features

### Multi-Region Failover
We've launched automatic multi-region failover. If a region experiences issues, your connections automatically route to the nearest healthy region with zero downtime.

### Enhanced Analytics Dashboard
New real-time analytics give you deeper insights into:
- Connection patterns
- Geographic distribution
- Performance metrics
- Usage trends

### API v2.0 Beta
Our new API version includes:
- Improved response times (30% faster)
- Enhanced error messaging
- New endpoints for advanced management
- Better documentation

## 🔧 Improvements

- **Performance**: 25% reduction in connection latency
- **Reliability**: 99.95% uptime achieved across all regions
- **Security**: Upgraded encryption protocols
- **UX**: Simplified dashboard navigation

## 📊 Platform Stats

- 10M+ active connections daily
- 52 server locations worldwide
- <50ms average latency
- 99.95% uptime

## 🔮 Coming Soon

- Custom domain support
- Advanced traffic shaping
- Enhanced compliance reports
- Mobile SDK v3.0

## 💬 Community Highlights

Thank you to our amazing community for your feedback and contributions. Join our Discord to connect with other developers and the Fyreway team.

## 📚 Resources

- [Documentation Updates](https://docs.fyreway.com)
- [API Reference](https://api.fyreway.com/docs)
- [Community Discord](https://discord.gg/fyreway)

Stay tuned for next month's updates!`,
    date: "2026-01-25",
    category: "Product Updates",
    tags: ["Features", "Updates", "Release Notes"],
    image: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=400&fit=crop"
  },
  {
    slug: "december-2025-roundup",
    title: "December 2025 Roundup: Year-End Review",
    excerpt: "Looking back at an incredible year of growth, new features, and community achievements.",
    content: `# December 2025: Year-End Review

As we wrap up 2025, let's celebrate our achievements and look ahead to 2026.

## 🎉 2025 Highlights

### Platform Growth
- 300% increase in customers
- 5 billion connections served
- 20 new server locations added
- 15 new team members joined

### Major Launches
1. WireGuard protocol support
2. Enterprise tier with SLA
3. Advanced monitoring suite
4. Partner program launch

### Community Milestones
- 5,000+ Discord members
- 50+ open-source contributions
- 100+ case studies published
- 1,000+ API integrations

## 🏆 Customer Success Stories

Our customers shipped amazing products this year:
- Mobile VPN apps in 30+ countries
- Enterprise security solutions
- IoT device protection
- Gaming network optimization

## 🙏 Thank You

To our customers, partners, and community members: thank you for making 2025 incredible. Here's to an even better 2026!

## 🎯 2026 Roadmap Preview

- Geographic expansion (70+ locations)
- Advanced customization options
- Enhanced compliance tools
- New partnership integrations
- Developer experience improvements

See you in 2026! 🚀`,
    date: "2025-12-28",
    category: "Company News",
    tags: ["Year Review", "Milestones", "Community"],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=400&fit=crop"
  },
  {
    slug: "security-compliance-updates-q4",
    title: "Security & Compliance Updates: Q4 2025",
    excerpt: "Important security enhancements and new compliance certifications achieved this quarter.",
    content: `# Q4 2025 Security & Compliance Updates

Your trust is our top priority. Here's what we've done to strengthen security and compliance.

## 🔒 Security Enhancements

### Infrastructure Hardening
- Implemented zero-trust architecture
- Enhanced DDoS protection
- Automated security patching
- Extended penetration testing

### Encryption Updates
- Updated to latest TLS 1.3
- Implemented post-quantum crypto readiness
- Enhanced key management system
- Improved certificate rotation

## ✅ New Certifications

We're proud to announce:
- **SOC 2 Type II** certification achieved
- **ISO 27001** compliance verified
- **GDPR** framework enhanced
- **HIPAA** readiness confirmed

## 📋 Compliance Features

New tools to help you meet your compliance needs:
- Automated audit logs
- Compliance report generation
- Data retention controls
- Geographic data restrictions

## 🛡️ Incident Response

No security incidents reported in Q4. Our 24/7 security monitoring and rapid response protocols continue to protect your infrastructure.

## 📖 Resources

- [Security Whitepaper](https://fyreway.com/security)
- [Compliance Documentation](https://fyreway.com/compliance)
- [Trust Center](https://trust.fyreway.com)

Questions? Contact our security team: security@fyreway.com`,
    date: "2025-12-15",
    category: "Security",
    tags: ["Security", "Compliance", "Certifications"],
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=400&fit=crop"
  },
  {
    slug: "new-sdk-release-v2-5",
    title: "SDK Release v2.5: Enhanced Developer Experience",
    excerpt: "Our latest SDK release brings improved performance, better error handling, and new convenience methods.",
    content: `# SDK v2.5 Release Notes

We're excited to release SDK v2.5 with major improvements for developers.

## 🆕 What's New

### Improved Connection Management
\`\`\`typescript
// Simpler connection handling
const vpn = new FyrewayVPN({
  apiKey: process.env.FYREWAY_API_KEY,
  autoReconnect: true,
  region: 'auto'
});

await vpn.connect();
\`\`\`

### Enhanced Error Handling
Better error messages and typed exceptions make debugging easier:
\`\`\`typescript
try {
  await vpn.connect();
} catch (error) {
  if (error instanceof ConnectionError) {
    // Handle connection-specific errors
  }
}
\`\`\`

### TypeScript Support
Full TypeScript support with improved type definitions and IntelliSense.

### React Hooks
New React hooks for easier integration:
\`\`\`typescript
import { useVPN } from '@fyreway/react';

function App() {
  const { connect, disconnect, status } = useVPN();
  // Use in your components
}
\`\`\`

## 🔧 Breaking Changes

- Minimum Node.js version: 16.x
- Updated authentication flow
- Renamed some configuration options

See our [migration guide](https://docs.fyreway.com/sdk/migration) for details.

## 📦 Installation

\`\`\`bash
npm install @fyreway/sdk@latest
# or
yarn add @fyreway/sdk@latest
\`\`\`

## 📚 Documentation

- [API Reference](https://docs.fyreway.com/sdk/api)
- [Examples](https://github.com/fyreway/examples)
- [Migration Guide](https://docs.fyreway.com/sdk/migration)`,
    date: "2025-11-20",
    category: "Technical",
    tags: ["SDK", "Release", "Developer Tools"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&h=400&fit=crop"
  }
];
