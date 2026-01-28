// Mock case study data
export interface CaseStudy {
  slug: string;
  title: string;
  client: string;
  industry: string;
  useCase: string;
  excerpt: string;
  image?: string;
  results: {
    metric: string;
    value: string;
  }[];
  problem: string;
  solution: string;
  implementation: string;
  outcomes: string;
  testimonial: {
    quote: string;
    author: string;
    role: string;
    company: string;
  };
  tags: string[];
  date: string;
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "securemobile-vpn-app-launch",
    title: "SecureMobile Launches Consumer VPN App in 3 Weeks",
    client: "SecureMobile",
    industry: "Consumer Technology",
    useCase: "Mobile VPN Application",
    excerpt: "How a startup launched a production-ready VPN app serving 100K+ users in under a month.",
    image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=400&fit=crop",
    results: [
      { metric: "Time to Market", value: "3 weeks" },
      { metric: "Active Users", value: "100,000+" },
      { metric: "Connection Success Rate", value: "99.7%" },
      { metric: "DevOps Cost Reduction", value: "85%" }
    ],
    problem: `SecureMobile, a new startup in the consumer VPN space, faced a common challenge: their small team of 3 developers needed to launch a competitive VPN application quickly, but building VPN infrastructure from scratch would take 6-12 months and require significant DevOps expertise they didn't have.

Their challenges included:
- Limited infrastructure experience
- Tight launch deadline (1 quarter)
- Small team with no dedicated DevOps engineer
- Need for global server presence
- Requirement for 99.9% uptime SLA
- Budget constraints as a pre-revenue startup`,

    solution: `SecureMobile chose Fyreway as their VPN backend infrastructure provider. This decision allowed them to focus entirely on building a great user experience while Fyreway handled all infrastructure complexities.

Key aspects of the solution:
- **Ready Infrastructure**: Access to 50+ global server locations on day one
- **Simple Integration**: SDK integration completed in 2 days
- **Automated Operations**: No DevOps team needed
- **Scalable Architecture**: Ready to handle growth from day one
- **Built-in Monitoring**: Real-time insights and alerts
- **Compliance Ready**: SOC 2 and GDPR compliance inherited`,

    implementation: `The implementation process was straightforward and completed in phases:

**Week 1: Integration**
- SDK integration into iOS and Android apps
- API authentication setup
- Basic connection flow implementation
- Initial testing with development servers

**Week 2: Features & Testing**
- Server selection UI implementation
- Connection status monitoring
- Error handling and retry logic
- Beta testing with 50 users

**Week 3: Launch Preparation**
- Performance optimization
- Production monitoring setup
- App Store submission
- Final security audit

**Post-Launch**
- Gradual user onboarding
- Performance monitoring
- Iterative improvements based on metrics
- Customer support integration

The entire process required zero infrastructure management from the SecureMobile team.`,

    outcomes: `The results exceeded expectations:

**Business Impact**
- Launched 9 months ahead of original timeline
- 85% reduction in infrastructure costs vs DIY approach
- No DevOps hiring needed (estimated savings: $200K+/year)
- Successful App Store launch with 4.5+ star rating

**Technical Performance**
- 99.7% connection success rate
- <100ms average connection time
- 50+ server locations available globally
- Zero infrastructure-related downtime

**User Growth**
- 100,000+ users in first 3 months
- 60% month-over-month growth
- High user retention (70% MAU/DAU ratio)
- Excellent customer satisfaction scores

**Team Velocity**
- 100% focus on product features
- Rapid iteration cycle (2-week sprints)
- Ability to respond quickly to user feedback
- More time for marketing and growth`,

    testimonial: {
      quote: "Fyreway transformed our VPN app from impossible dream to market reality in just 3 weeks. Without their infrastructure, we'd still be hiring DevOps engineers instead of serving customers. Best decision we made as a startup.",
      author: "Marcus Chen",
      role: "Co-founder & CTO",
      company: "SecureMobile"
    },
    tags: ["Mobile Apps", "Consumer VPN", "Startup", "Fast Launch"],
    date: "2026-01-15"
  },
  {
    slug: "enterprise-saas-remote-access",
    title: "Enterprise SaaS Adds Secure Remote Access Without Infrastructure Team",
    client: "DataFlow Pro",
    industry: "Enterprise SaaS",
    useCase: "Secure Remote Access",
    excerpt: "How an enterprise SaaS platform added VPN functionality for 10,000+ users without expanding their ops team.",
    image: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=800&h=400&fit=crop",
    results: [
      { metric: "Deployment Time", value: "2 weeks" },
      { metric: "Users Supported", value: "10,000+" },
      { metric: "Infrastructure Cost Savings", value: "70%" },
      { metric: "Zero", value: "DevOps Hires Needed" }
    ],
    problem: `DataFlow Pro, an established enterprise data analytics SaaS platform, needed to add secure remote access capabilities for their customers' distributed teams. Their customers were requesting VPN functionality to enable secure access to sensitive data dashboards from anywhere.

The challenges they faced:
- Existing product roadmap was already full
- No bandwidth to build infrastructure from scratch
- Need to maintain their high SLA (99.95% uptime)
- Security and compliance requirements (SOC 2, HIPAA)
- Global customer base requiring low-latency access
- Limited budget for infrastructure expansion`,

    solution: `DataFlow Pro integrated Fyreway's VPN backend as a white-label solution within their existing platform. This approach allowed them to add VPN capabilities without the infrastructure burden.

Solution highlights:
- **White-Label Integration**: Fyreway backend with DataFlow branding
- **API-First**: Seamless integration with existing auth system
- **Multi-tenant**: Separate VPN configs per customer organization
- **Compliance**: Inherited SOC 2, HIPAA compliance
- **Custom Domains**: Customers connect to dataflow.vpn domains
- **Usage-Based Pricing**: Pay only for active connections`,

    implementation: `The implementation followed their agile methodology:

**Phase 1: Planning (3 days)**
- Architecture review and design
- API integration planning
- Security audit and approval
- Compliance verification

**Phase 2: Development (1 week)**
- API integration implementation
- SSO and auth flow setup
- Admin dashboard development
- Connection management UI
- Usage tracking integration

**Phase 3: Testing (3 days)**
- Security testing
- Load testing (simulated 10K connections)
- UAT with pilot customers
- Documentation creation

**Phase 4: Rollout (3 days)**
- Soft launch to 5 pilot customers
- Monitoring and optimization
- Full launch to all customers
- Customer training materials

Total implementation: 2 weeks from kickoff to production.`,

    outcomes: `The integration delivered significant value:

**Business Results**
- New revenue stream: $50K+ MRR from VPN add-on
- Increased enterprise deal size by 30%
- Differentiated from competitors
- No additional ops team needed

**Technical Achievement**
- Seamless integration with existing platform
- Maintains 99.95% uptime SLA
- <50ms latency for 95% of connections
- Scales automatically with customer growth

**Customer Impact**
- 10,000+ end users connected
- 85% adoption rate among enterprise customers
- Improved customer satisfaction scores
- Reduced security-related support tickets by 40%

**Cost Efficiency**
- 70% lower cost vs building in-house
- No DevOps team expansion needed
- Predictable usage-based pricing
- Zero infrastructure maintenance overhead`,

    testimonial: {
      quote: "Adding VPN functionality to our SaaS platform seemed like a multi-quarter project that would require hiring. With Fyreway, we shipped it in 2 weeks with our existing team. It's now a key differentiator in enterprise sales.",
      author: "Jennifer Martinez",
      role: "VP of Engineering",
      company: "DataFlow Pro"
    },
    tags: ["Enterprise", "SaaS", "Remote Access", "White-Label"],
    date: "2026-01-10"
  },
  {
    slug: "iot-device-security-platform",
    title: "IoT Platform Secures 1M+ Devices with Global VPN Network",
    client: "SmartHome Connect",
    industry: "IoT & Smart Devices",
    useCase: "Device Security & Communication",
    excerpt: "How an IoT platform provider secured millions of smart home devices using Fyreway's scalable infrastructure.",
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&h=400&fit=crop",
    results: [
      { metric: "Devices Protected", value: "1,000,000+" },
      { metric: "Global Coverage", value: "40+ countries" },
      { metric: "Latency Reduction", value: "65%" },
      { metric: "Security Incidents", value: "Zero" }
    ],
    problem: `SmartHome Connect manages millions of IoT devices (smart locks, cameras, thermostats) across the globe. As they scaled, they faced critical security and connectivity challenges:

**Security Concerns:**
- Devices directly exposed to internet
- Difficult to patch security vulnerabilities
- Customer concerns about privacy
- Need for encrypted communication

**Connectivity Issues:**
- Inconsistent connection reliability
- High latency affecting real-time features
- Complex NAT traversal problems
- Poor performance in some regions

**Scalability Challenges:**
- Rapid growth from 100K to 1M devices
- Infrastructure couldn't keep pace
- Rising costs of DIY infrastructure
- Limited ops team (5 engineers)`,

    solution: `SmartHome Connect deployed Fyreway as their secure communication backbone for all IoT devices. Every device connects through Fyreway's VPN infrastructure to their control plane.

Architecture:
- **Device → Fyreway VPN → Control Plane**: Encrypted connection
- **Automatic Region Selection**: Devices connect to nearest server
- **Lightweight Protocol**: Optimized for IoT constraints
- **Certificate-Based Auth**: Secure device identity
- **Zero-Touch Provisioning**: Devices auto-configure on first boot
- **Bandwidth Optimization**: Efficient data transfer for constrained devices`,

    implementation: `Implementation rolled out in phases to minimize risk:

**Phase 1: Prototype (2 weeks)**
- Integration with 100 test devices
- Performance benchmarking
- Security validation
- SDK optimization for embedded devices

**Phase 2: Pilot (1 month)**
- 10,000 device deployment
- Real-world performance monitoring
- User experience validation
- Firmware update process testing

**Phase 3: Regional Rollout (3 months)**
- North America: 300K devices
- Europe: 250K devices
- Asia: 200K devices
- Other regions: 250K devices

**Phase 4: Full Production**
- All 1M+ devices migrated
- Legacy infrastructure decommissioned
- Automated scaling enabled
- 24/7 monitoring established`,

    outcomes: `The transformation delivered remarkable results:

**Security Improvements**
- Zero security breaches post-deployment
- End-to-end encryption for all device communication
- Eliminated direct internet exposure
- Rapid security patch deployment capability
- Enhanced customer trust and privacy

**Performance Gains**
- 65% reduction in average latency
- 99.9% device connectivity reliability
- 50% reduction in connection failures
- Real-time features now truly real-time
- Improved app responsiveness

**Operational Excellence**
- Supports 1M+ devices with same ops team
- Automated scaling handles growth
- 70% reduction in infrastructure costs
- Simplified device provisioning
- Better visibility and monitoring

**Business Impact**
- Customer satisfaction scores increased 40%
- Support tickets reduced by 35%
- Faster expansion to new markets
- Competitive advantage in enterprise sales
- Foundation for future growth (10M+ devices)`,

    testimonial: {
      quote: "Managing VPN infrastructure for a million IoT devices would have been impossible with our team size. Fyreway handles the complexity while we focus on building great smart home experiences. It's been transformative.",
      author: "Dr. Raj Patel",
      role: "Chief Technology Officer",
      company: "SmartHome Connect"
    },
    tags: ["IoT", "Device Security", "Scale", "Smart Home"],
    date: "2025-12-20"
  },
  {
    slug: "gaming-platform-latency-optimization",
    title: "Gaming Platform Reduces Latency 40% with Intelligent Routing",
    client: "GameStream Pro",
    industry: "Gaming & Entertainment",
    useCase: "Low-Latency Networking",
    excerpt: "How a cloud gaming platform optimized network performance for competitive gaming using Fyreway's infrastructure.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop",
    results: [
      { metric: "Latency Reduction", value: "40%" },
      { metric: "Geographic Coverage", value: "50+ locations" },
      { metric: "Concurrent Users", value: "500,000+" },
      { metric: "Uptime", value: "99.98%" }
    ],
    problem: `GameStream Pro, a cloud gaming platform, faced a critical challenge: network latency was affecting competitive gameplay experience. For cloud gaming, every millisecond matters.

**Technical Challenges:**
- Average latency: 80-120ms (too high for competitive gaming)
- Inconsistent routing via public internet
- No geographic presence in key gaming markets
- Limited ability to optimize network paths
- Packet loss during peak hours

**Business Impact:**
- User churn due to poor experience
- Negative reviews mentioning lag
- Unable to target competitive gaming segment
- Losing market share to competitors
- Limited geographic expansion capability`,

    solution: `GameStream Pro integrated Fyreway's intelligent routing infrastructure to optimize network paths between players and game servers.

**Technical Solution:**
- **Intelligent Routing**: AI-powered path selection
- **Edge Locations**: 50+ global POPs close to users
- **Protocol Optimization**: Gaming-optimized UDP tunneling
- **DDoS Protection**: Built-in mitigation
- **Real-time Monitoring**: Per-connection metrics
- **Automatic Failover**: Instant route changes on issues

**Integration:**
- SDK integration into game client
- Server-side API for routing control
- Analytics integration for performance tracking
- Custom protocols for lowest latency`,

    implementation: `Implementation focused on gradual optimization:

**Week 1-2: Infrastructure Setup**
- Fyreway API integration
- Client SDK implementation
- Server configuration
- Initial testing in lab environment

**Week 3-4: Beta Testing**
- 1,000 users in controlled beta
- A/B testing vs existing infrastructure
- Performance metric collection
- User feedback gathering

**Week 5-6: Regional Rollout**
- 10% traffic in North America
- 10% traffic in Europe
- 10% traffic in Asia
- Monitor and optimize

**Week 7-8: Full Deployment**
- 100% traffic migration
- Legacy infrastructure standby
- Performance optimization
- Documentation and training`,

    outcomes: `The results transformed their gaming experience:

**Performance Improvements**
- 40% reduction in average latency (now 45-70ms)
- 60% reduction in packet loss
- 30% improvement in connection stability
- 95th percentile latency under 80ms
- Jitter reduced by 50%

**User Experience**
- User satisfaction increased 55%
- Churn rate decreased 30%
- 4.5+ star ratings in app stores
- Positive reviews highlighting performance
- Competitive gaming segment now viable

**Business Growth**
- 25% increase in daily active users
- 40% increase in session duration
- Premium tier conversion up 35%
- Expansion to 20 new markets enabled
- Competitive gaming partnerships secured

**Technical Benefits**
- Real-time performance visibility
- Proactive issue detection
- Automated optimization
- Scalable architecture for growth
- DDoS protection included`,

    testimonial: {
      quote: "Latency is everything in cloud gaming. Fyreway's intelligent routing reduced our lag by 40% and transformed our user experience. We're now competitive with the best platforms in the industry.",
      author: "Alex Thompson",
      role: "VP of Infrastructure",
      company: "GameStream Pro"
    },
    tags: ["Gaming", "Performance", "Low Latency", "Optimization"],
    date: "2025-11-28"
  }
];
