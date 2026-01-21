# Frequently Asked Questions (Comprehensive)

## General Questions

### What is FyreWay?

FyreWay is a managed VPN infrastructure platform that enables companies to launch production-ready VPN services in hours instead of months. We handle all backend infrastructure, server management, security, and scaling so you can focus on building your VPN product or application.

### Who operates FyreWay?

FyreWay is operated by Exceleries Consultancy, a digital transformation company specializing in mobile app development and technology infrastructure with expertise in app/game development consulting.

### What problems does FyreWay solve?

FyreWay eliminates the need to build and maintain VPN infrastructure yourself, which typically requires 6-18 months and a dedicated DevOps team. We provide instant deployment, global coverage, security, monitoring, and scaling—all managed for you.

### Is FyreWay suitable for beginners?

Yes! FyreWay is designed for companies without infrastructure expertise. You don't need to understand VPN protocols, server management, or network architecture. Our platform handles all technical complexity.

### Can I use FyreWay if I already have a VPN product?

Absolutely! We support migrations from self-managed infrastructure. Many customers migrate to reduce costs and operational overhead while improving reliability.

---

## Technical Questions

### How quickly can I deploy VPN servers?

Servers are provisioned in under 10 seconds. Once you select your configuration and locations, your VPN infrastructure is ready to accept connections almost instantly.

### Which VPN protocols are supported?

We support three protocols out of the box:
- **WireGuard** (recommended): Fastest performance, modern devices
- **OpenVPN**: Maximum compatibility, all devices  
- **IKEv2/IPSec**: Native iOS/macOS support

All protocols come pre-configured with optimized settings. Enterprise customers can request custom protocol configurations.

### What server locations are available?

We offer 50+ locations across:
- North America (US, Canada)
- Europe (UK, Germany, France, Netherlands, Switzerland, etc.)
- Asia Pacific (Singapore, Japan, Hong Kong, Australia, India)
- Middle East (UAE, Israel)
- South America (Brazil, Argentina)
- Africa (South Africa)

New regions are added regularly based on customer demand.

### Can I use multiple protocols simultaneously?

Yes! All protocols are available on all servers simultaneously. Users can switch between protocols without any infrastructure changes on your end.

### What kind of bandwidth do you provide?

Each server provides 10 Gbps bandwidth with dedicated resources and no throttling. Expected per-connection performance:
- WireGuard: Up to 2 Gbps
- OpenVPN: Up to 500 Mbps
- IKEv2: Up to 800 Mbps

### How many concurrent users can a server handle?

Each server supports 5,000+ concurrent connections depending on protocol and usage patterns. Auto-scaling ensures capacity grows with demand.

### Do you provide SDKs for mobile apps?

Yes! We provide native SDKs for:
- iOS (Swift)
- Android (Kotlin/Java)
- Web/Backend (REST API)

Complete documentation and code examples are included.

### Can I customize server configurations?

Basic configurations are managed automatically. Enterprise customers can customize advanced settings including kernel parameters, encryption options, and networking rules.

### What happens if a server goes down?

Our monitoring systems detect failures within seconds and:
1. Automatically failover users to nearby healthy servers
2. Alert your team via configured channels
3. Provision replacement server if needed
4. Investigate root cause

99.9%+ uptime SLA ensures minimal disruption.

### Can I bring my own IP addresses?

Enterprise customers can use custom IP ranges in some regions. Contact sales to discuss your specific requirements.

---

## Scaling & Performance

### Can servers scale automatically?

Yes! Growth and Enterprise plans include auto-scaling:
- Monitors server load in real-time
- Automatically provisions additional capacity during traffic spikes
- Scales down during quiet periods to optimize costs
- Configurable scaling rules and limits

Starter plans require manual scaling through the dashboard.

### How do I know when to scale?

Dashboard provides real-time metrics and alerts:
- Active connection counts
- CPU and bandwidth utilization
- Response times and latency
- Automated warnings before hitting limits

Auto-scaling handles this automatically for Growth/Enterprise tiers.

### Is there a limit to how much I can scale?

- **Starter**: Manual scaling, practical limits based on plan
- **Growth**: Auto-scale up to 10 servers per region
- **Enterprise**: Unlimited scaling

### What happens during traffic spikes?

With auto-scaling enabled:
1. System detects increased load
2. New servers provisioned within 10 seconds
3. Load balancer distributes traffic
4. Users experience no interruption
5. Scales back down when spike ends

### How is latency optimized?

We optimize latency through:
- 100+ global locations for proximity to users
- Intelligent server selection based on user location
- Premium Tier 1 network providers
- Optimized routing protocols
- Regional latency typically <10ms

### Can I load test before launching?

Yes! We encourage load testing. Contact support for:
- Best practices for load testing
- Temporary capacity increase during tests
- Monitoring assistance
- Performance optimization recommendations

---

## Security & Privacy

### How secure is the platform?

Security is our top priority:
- Hardened servers with minimal attack surface
- Automatic security patches within 24 hours
- DDoS protection at network level
- Military-grade encryption for all protocols
- No user traffic logging
- SOC 2 Type II certified infrastructure
- Regular security audits and penetration testing

### Do you log user activity?

**We do NOT log**:
- User browsing activity
- Connection contents
- Traffic destinations
- DNS queries

**We do log** (for operational purposes only):
- Connection timestamps
- Bandwidth usage (for billing)
- Server performance metrics
- Authentication attempts

### Is the platform GDPR compliant?

Yes, FyreWay is GDPR compliant:
- Data minimization principles
- User data rights respected
- Data processing agreements available
- EU data residency options
- Privacy-by-design architecture

### What encryption standards do you use?

- **WireGuard**: ChaCha20, Curve25519
- **OpenVPN**: AES-256-GCM, RSA-4096
- **IKEv2**: AES-256-CBC, SHA-256

All protocols include perfect forward secrecy.

### How do you protect against DDoS attacks?

Multi-layer DDoS protection:
- Layer 3, 4, and 7 mitigation
- Automatic traffic filtering
- Geographic blocking capabilities
- Rate limiting per user
- Dedicated DDoS protection infrastructure

### Can I audit your security?

Enterprise customers can:
- Review security documentation
- Request penetration testing results
- Conduct third-party audits (with advance notice)
- Review compliance certifications
- Access security incident reports

### What happens in case of a security breach?

We follow strict incident response procedures:
1. Immediate containment and assessment
2. Customer notification within required timeframes
3. Root cause analysis
4. Remediation and prevention measures
5. Post-incident report provided

---

## Pricing & Billing

### How much does FyreWay cost?

We offer custom pricing based on your specific needs. Typical reference ranges:
- **Starter**: $49-99/month
- **Growth**: $149-499/month  
- **Enterprise**: $1,000+/month (custom)

Contact sales for accurate pricing: info@fyreway.com

### Is there a free trial?

We offer custom trial periods on a case-by-case basis. Contact sales to discuss trial options for your specific use case.

### What's included in the base price?

- Server provisioning and maintenance
- Network bandwidth (up to plan limits)
- Security updates and DDoS protection
- Monitoring and analytics dashboard
- API access
- Support according to your tier

### How is bandwidth calculated?

Bandwidth is total data transferred through your VPN servers (inbound + outbound combined). Usage resets monthly and is visible in real-time via the dashboard.

### What happens if I exceed my bandwidth limit?

You'll receive alerts at 80% and 90% usage. Overage charges apply (typically $0.05-0.10/GB) or you can upgrade your plan for higher limits.

### Can I change my plan anytime?

Yes! Upgrades take effect immediately with prorated billing. Downgrades typically apply at your next billing cycle. No penalties for changing plans.

### Are there setup fees?

No setup fees for standard plans. Custom integrations or migration assistance may have one-time fees discussed upfront.

### What payment methods do you accept?

- Credit/Debit cards (Visa, Mastercard, Amex)
- Bank transfer/wire transfer
- ACH (US customers)
- PayPal (select regions)
- Cryptocurrency (Enterprise only)

### Do you offer discounts?

- Annual billing: 10-20% discount
- Volume discounts for high usage
- Non-profit organization discounts
- Startup programs (case by case)
- Multi-year enterprise agreements

### Can I get a refund?

Refund policies depend on your contract terms. Generally:
- Trial periods allow cancellation without charges
- Monthly plans: 7-day money-back guarantee (case by case)
- Annual plans: Prorated refunds (case by case)

Contact support to discuss specific situations.

---

## Integration & Development

### Is there an SDK for mobile integration?

Yes! Native SDKs available for:
- **iOS**: Swift Package Manager
- **Android**: Gradle dependency
- Full documentation included
- Sample apps provided
- Regular updates and bug fixes

### Are REST APIs available?

Yes, comprehensive REST APIs for:
- Server management
- User authentication
- Session handling
- Analytics and reporting
- Configuration management

Full API documentation provided upon onboarding.

### How long does integration take?

Typical integration timelines:
- Basic integration: 1-2 days
- Full-featured app: 1-2 weeks
- Migration from another platform: 2-4 weeks
- Enterprise custom integration: 4-8 weeks

### Do you provide code examples?

Yes! We provide:
- Complete sample apps (iOS, Android)
- API integration examples
- Common use case implementations
- GitHub repository with examples
- Integration guides and tutorials

### Can I test in a sandbox environment?

Yes, all accounts include:
- Development/staging servers
- Test API keys
- Sandbox user accounts
- Full feature access for testing

### What programming languages are supported?

Our REST API works with any language. Official SDKs:
- Swift (iOS)
- Kotlin/Java (Android)
- JavaScript/TypeScript (web)

Community SDKs may be available for other languages.

### Can I white-label the solution?

Enterprise customers can:
- Use custom domains
- Brand connection screens
- Custom SSL certificates
- Remove FyreWay branding
- Custom API endpoints

---

## Support & Troubleshooting

### What support is available?

Support varies by tier:
- **Starter**: Email support, 24-48 hour response
- **Growth**: Priority email, 4-8 hour response
- **Enterprise**: 24/7 phone support, 1-2 hour response, dedicated account manager

### How do I contact support?

- **Email**: support@fyreway.com
- **Phone**: +92 300 5163362 (Enterprise customers)
- **Dashboard**: Submit ticket from support section
- **Live Chat**: Available for Growth/Enterprise

### What if I have a critical outage?

Critical issues are prioritized:
- Immediate escalation to engineering team
- Real-time status updates
- All hands on deck resolution
- Post-incident analysis provided

Enterprise customers get 24/7 phone support for emergencies.

### Do you provide migration assistance?

Yes! We help migrate from:
- Self-managed VPN infrastructure
- Other VPN platforms
- Legacy systems

Services include:
- Migration planning
- Configuration import tools
- Zero-downtime migration support
- Post-migration optimization

### Can I schedule a demo?

Absolutely! Contact sales to:
- Schedule live platform demo
- See SDK integration walkthrough
- Ask specific technical questions
- Discuss your use case

Email: info@fyreway.com

### Is training provided?

Yes, we provide:
- Onboarding documentation
- Video tutorials
- Live training sessions (Enterprise)
- Developer resources
- Best practices guides

### What if I find a bug?

Report bugs via:
- Support email: support@fyreway.com
- Dashboard ticket system
- Emergency phone (critical bugs)

We prioritize bugs based on severity and impact.

---

## Account Management

### How do I create an account?

Accounts are created through our sales process:
1. Contact sales team
2. Discuss requirements
3. Receive custom quote
4. Sign agreement
5. Get onboarding credentials

Contact: info@fyreway.com

### Can I have multiple team members?

Yes! Invite unlimited team members with role-based access:
- **Admin**: Full access
- **Developer**: Technical features only
- **Billing**: Billing and usage only
- **Viewer**: Read-only access

### How do I reset my password?

1. Visit login page
2. Click "Forgot Password"
3. Enter your email
4. Check email for reset link
5. Create new password

Or contact support for manual reset.

### Can I have multiple organizations/projects?

Yes! Enterprise customers can:
- Create multiple isolated projects
- Separate billing per project
- Di
Report bugs via:
- Supp project
- Independe- Dashboard ticket system
- EmI close my account?

Contact support to:
1. Request account closure
2. Export any needed data
3. Settle final billing
4. Confirm closure
5. Data deleted per retention policy

### What happens to my data after cancellation?

- Active data retained for 30 days
- Billing records retained per legal requirements
- User data deleted after retention period
- Backups purged per schedule
- Certificates revoked immediately

---

## Compliance & Legal

### What compliance certifications do you have?

- SOC 2 Type II
- GDPR compliant
- ISO 27001 (in progress)
- PCI DSS compliant infrastructure

### Can you provide a Data Processing Agreement (DPA)?

Yes, DPAs are available for all customers. Enterprise customers receive customized DPAs as part of their contract.

### Where is data stored?

Data is stored in the regions where you deploy servers. You can choose specific geographic regions to meet compliance requirements.

### Do you support EU data residency?

Yes, you can deploy exclusively in EU regions to meet data residency requirements. All data processing occurs within selected regions.

### Can I get a BAA for HIPAA compliance?

Business Associate Agreements are available for Enterprise customers requiring HIPAA compliance. Additional technical controls may be required.

### What are your SLA terms?

- **Starter**: No SLA
- **Growth**: 99.9% uptime SLA
- **Enterprise**: 99.99% uptime SLA with credits

SLA credits applied automatically for violations.

---

## Miscellaneous

### Can I use FyreWay for personal use?

FyreWay is designed for businesses building VPN products. For personal VPN needs, we recommend consumer VPN services.

### Do you offer reseller or partner programs?

Yes! We have partnership opportunities for:
- Development agencies
- System integrators
- VPN resellers
- Technology consultants

Contact: info@fyreway.com

### Can I contribute to the platform?

While the core platform is proprietary, we welcome:
- Feature suggestions
- Bug reports
- Community SDK contributions
- Integration guides and tutorials

### How often do you add new features?

We release:
- Minor updates: Weekly
- Major features: Monthly
- SDK updates: As needed
- Infrastructure improvements: Continuous

Release notes available in dashboard.

### Can I request custom features?

Yes! Feature requests are welcome:
- Submit via dashboard feedback
- Discuss with account manager (Enterprise)
- Community voting for popular requests
- Custom development available (Enterprise, additional cost)

---

## Contact Information

**Sales & General Inquiries**  
Email: info@fyreway.com  
Phone: +92 300 5163362  

**Technical Support**  
Email: support@fyreway.com  
Phone: +92 300 5163362 (Enterprise only)  

**Office**  
Exceleries Consultancy - Fyreway  
Ground Floor, Binchiragh Heights  
Plaza No 23, Near Eiffel Tower  
Bahria Town Phase 7  
Islamabad/Rawalpindi, Pakistan  

**Hours**  
Monday - Friday: 9am - 6pm PKT  
Emergency Support: 24/7 (Enterprise customers)

---

*Last Updated: January 2026*
