# Chatbot Training Datasets

## FAQ Dataset (JSON Format)

```json
[
  {
    "question": "What is FyreWay?",
    "answer": "FyreWay is a managed VPN infrastructure platform that enables companies to launch production-ready VPN services in hours instead of months. We handle all backend infrastructure, server management, security, and scaling so you can focus on building your VPN product or application."
  },
  {
    "question": "How quickly can I deploy VPN servers?",
    "answer": "Our platform provisions servers in under 10 seconds. Once you select your configuration and locations, your VPN infrastructure is ready to accept connections almost instantly."
  },
  {
    "question": "Which VPN protocols are supported?",
    "answer": "We support WireGuard, OpenVPN, and IKEv2/IPSec out of the box. All protocols come pre-configured with optimized settings for mobile applications. WireGuard is recommended for best performance."
  },
  {
    "question": "How much does FyreWay cost?",
    "answer": "We offer custom pricing based on your specific needs. Typical reference ranges: Starter tier $49-99/month, Growth tier $149-499/month, Enterprise tier $1,000+/month. Contact our sales team at info@fyreway.com for accurate pricing."
  },
  {
    "question": "What server locations are available?",
    "answer": "We offer 50+ server locations worldwide including North America, Europe, Asia Pacific, Middle East, South America, and Africa. New regions are added regularly based on customer demand."
  },
  {
    "question": "Is there a free trial?",
    "answer": "We offer custom trial periods on a case-by-case basis, typically 7-14 days. No credit card required for initial exploration. Contact sales to discuss trial options for your specific use case."
  },
  {
    "question": "Can servers scale automatically?",
    "answer": "Yes, Growth and Enterprise plans include auto-scaling. The platform monitors your server load and automatically provisions additional capacity during traffic spikes, then scales down during quiet periods."
  },
  {
    "question": "Is there an SDK for mobile integration?",
    "answer": "Yes! We provide native SDKs for iOS (Swift) and Android (Kotlin/Java) that handle VPN connection management, server selection, and session handling. REST APIs are also available for custom integrations."
  },
  {
    "question": "What kind of uptime can I expect?",
    "answer": "We guarantee 99.9% uptime SLA for Growth plans and 99.99% for Enterprise plans. Our infrastructure runs on enterprise-grade hardware with redundant networking and automated failover."
  },
  {
    "question": "How is bandwidth calculated?",
    "answer": "Bandwidth is measured as the total data transferred through your VPN servers (inbound and outbound combined). Usage resets monthly, and you can monitor consumption in real-time via the dashboard."
  },
  {
    "question": "Can I bring my own server configuration?",
    "answer": "Enterprise customers can customize server configurations, including kernel parameters, encryption settings, and networking rules. We work with your team to ensure optimal performance for your use case."
  },
  {
    "question": "What support is available?",
    "answer": "Support varies by tier: Starter plans include email support (24-48 hour response). Growth plans get priority email (4-8 hour response). Enterprise customers receive 24/7 phone support and a dedicated account manager."
  },
  {
    "question": "Who is FyreWay for?",
    "answer": "FyreWay is built for VPN product companies, SaaS teams adding VPN features, mobile app developers entering the VPN market, enterprises needing private VPN infrastructure, and startups scaling globally without infrastructure specialists."
  },
  {
    "question": "Do you log user activity?",
    "answer": "We do NOT log user browsing activity, connection contents, traffic destinations, or DNS queries. We only log connection timestamps, bandwidth usage for billing, server performance metrics, and authentication attempts for operational purposes."
  },
  {
    "question": "Is FyreWay GDPR compliant?",
    "answer": "Yes, FyreWay is GDPR compliant with data minimization principles, user data rights respected, data processing agreements available, EU data residency options, and privacy-by-design architecture."
  },
  {
    "question": "Can I white-label the solution?",
    "answer": "Yes, Enterprise customers can use custom domains, brand connection screens, use custom SSL certificates, remove FyreWay branding, and use custom API endpoints."
  },
  {
    "question": "How do I get started with FyreWay?",
    "answer": "Contact our sales team at info@fyreway.com or call +92 300 5163362. We'll discuss your requirements, provide a custom quote within 24 hours, and get you onboarded with dedicated support."
  },
  {
    "question": "What happens if a server goes down?",
    "answer": "Our monitoring systems detect failures within seconds and automatically failover users to nearby healthy servers, alert your team, provision replacement servers if needed, and investigate root cause. 99.9%+ uptime SLA ensures minimal disruption."
  },
  {
    "question": "Can I migrate from my current VPN infrastructure?",
    "answer": "Yes! We provide zero-downtime migration support, configuration import tools, 24/7 migration assistance, gradual transition options, and cost comparison analysis to help you migrate smoothly."
  },
  {
    "question": "What payment methods do you accept?",
    "answer": "We accept credit/debit cards (Visa, Mastercard, Amex), bank transfer/wire transfer, ACH for US customers, PayPal in select regions, and cryptocurrency for Enterprise customers."
  },
  {
    "question": "How long does integration take?",
    "answer": "Typical integration timelines: basic integration 1-2 days, full-featured app 1-2 weeks, migration from another platform 2-4 weeks, and enterprise custom integration 4-8 weeks."
  },
  {
    "question": "What if I exceed my bandwidth limit?",
    "answer": "You'll receive alerts at 80% and 90% usage. Overage charges apply (typically $0.05-0.10/GB) or you can upgrade your plan for higher limits. We'll work with you to find the best solution."
  },
  {
    "question": "Can I change my plan anytime?",
    "answer": "Yes! Upgrades take effect immediately with prorated billing. Downgrades typically apply at your next billing cycle. No penalties for changing plans."
  },
  {
    "question": "Do you provide code examples?",
    "answer": "Yes! We provide complete sample apps for iOS and Android, API integration examples, common use case implementations, a GitHub repository with examples, and integration guides and tutorials."
  },
  {
    "question": "What security measures are in place?",
    "answer": "We provide hardened servers with minimal attack surface, automatic security patches within 24 hours, DDoS protection, military-grade encryption, no user traffic logging, SOC 2 Type II certification, and regular security audits."
  },
  {
    "question": "Can I test in a sandbox environment?",
    "answer": "Yes, all accounts include development/staging servers, test API keys, sandbox user accounts, and full feature access for testing before production deployment."
  },
  {
    "question": "What makes FyreWay different from building my own infrastructure?",
    "answer": "Building yourself takes 6-18 months and costs $150K-300K+ first year. FyreWay gets you production-ready in hours for $600-20K first year, representing 80-95% cost reduction plus eliminating need for DevOps teams."
  },
  {
    "question": "Who operates FyreWay?",
    "answer": "FyreWay is operated by Exceleries Consultancy, a digital transformation company specializing in mobile app and game development with decades of experience in infrastructure management and operational excellence."
  },
  {
    "question": "Can I schedule a demo?",
    "answer": "Absolutely! Contact sales at info@fyreway.com to schedule a live platform demo, see SDK integration walkthrough, ask specific technical questions, and discuss your use case."
  },
  {
    "question": "What are the main benefits of using FyreWay?",
    "answer": "Main benefits include: faster time to market (hours vs months), 80-95% lower infrastructure costs, reduced operational risk, predictable scaling, enterprise-grade security, and focus on product development instead of infrastructure management."
  }
]
```

---

## Intent-Based Training Dataset

### Intent: greeting
**User Says**:
- "Hello"
- "Hi there"
- "Hey"
- "Good morning"
- "Greetings"

**Bot Response**:
"Hello! Welcome to FyreWay. I'm here to help you with any questions about our VPN infrastructure platform. How can I assist you today?"

---

### Intent: about_fyreway
**User Says**:
- "What is FyreWay?"
- "Tell me about your platform"
- "What do you do?"
- "Explain your service"
- "What does FyreWay offer?"

**Bot Response**:
"FyreWay is a managed VPN infrastructure platform that enables companies to launch production-ready VPN services in hours instead of months. We handle all the complex backend infrastructure including server provisioning, security, scaling, and monitoring. This allows you to focus on building your VPN product without needing infrastructure expertise or DevOps teams. We support 50+ global locations, multiple VPN protocols, and serve companies from startups to enterprises."

---

### Intent: pricing_inquiry
**User Says**:
- "How much does it cost?"
- "What's your pricing?"
- "Tell me about your plans"
- "How much do you charge?"
- "What are your prices?"

**Bot Response**:
"We offer custom pricing tailored to your specific needs. Our typical reference tiers are: Starter ($49-99/month) for MVPs and testing, Growth ($149-499/month) for scaling applications, and Enterprise ($1,000+/month) for large deployments. The exact price depends on your expected user volume, server locations needed, bandwidth requirements, and support level. Contact our sales team at info@fyreway.com for an accurate quote within 24 hours."

---

### Intent: deployment_speed
**User Says**:
- "How fast can I deploy?"
- "How long does setup take?"
- "How quickly can I get started?"
- "What's the deployment time?"
- "How soon can I launch?"

**Bot Response**:
"FyreWay servers deploy in under 10 seconds! Once you select your configuration and locations, your VPN infrastructure is production-ready almost instantly. Complete integration typically takes 1-2 weeks for full-featured apps, but you can start testing within minutes of account creation. This is dramatically faster than building your own infrastructure, which typically takes 6-18 months."

---

### Intent: protocol_support
**User Says**:
- "What protocols do you support?"
- "Which VPN protocols are available?"
- "Do you support WireGuard?"
- "Can I use OpenVPN?"
- "What about IKEv2?"

**Bot Response**:
"We support three protocols out of the box: WireGuard (recommended for best performance), OpenVPN (maximum compatibility), and IKEv2/IPSec (native iOS support). All protocols come pre-configured and optimized for mobile applications. You can use all protocols simultaneously, and users can switch between them without any infrastructure changes. WireGuard typically offers 5-10x better performance than OpenVPN."

---

### Intent: server_locations
**User Says**:
- "What server locations do you have?"
- "Where are your servers?"
- "Which countries are available?"
- "Do you have servers in [country]?"
- "What's your global coverage?"

**Bot Response**:
"We offer 50+ server locations worldwide including: North America (US, Canada), Europe (UK, Germany, France, Netherlands, Switzerland, and more), Asia Pacific (Singapore, Japan, Hong Kong, Australia, India), Middle East (UAE, Israel), South America (Brazil, Argentina), and Africa (South Africa). We continuously add new regions based on customer demand. Which specific regions are you interested in?"

---

### Intent: free_trial
**User Says**:
- "Do you have a free trial?"
- "Can I try it for free?"
- "Is there a trial period?"
- "How can I test your platform?"
- "Free trial available?"

**Bot Response**:
"Yes! We offer custom trial periods on a case-by-case basis, typically 7-14 days. No credit card is required for initial exploration, and you get full feature access during the trial. Contact our sales team at info@fyreway.com to discuss trial options specific to your use case."

---

### Intent: auto_scaling
**User Says**:
- "Does it scale automatically?"
- "Can servers auto-scale?"
- "How does scaling work?"
- "What about traffic spikes?"
- "Will it handle growth?"

**Bot Response**:
"Yes! Growth and Enterprise plans include auto-scaling. Our platform continuously monitors server load and automatically provisions additional capacity during traffic spikes, then scales down during quiet periods to optimize costs. Scaling happens in seconds, so users never experience interruptions. You can configure scaling rules and set maximum limits to control costs."

---

### Intent: sdk_availability
**User Says**:
- "Do you have an SDK?"
- "Is there a mobile SDK?"
- "SDK for iOS?"
- "Android SDK available?"
- "How do I integrate?"

**Bot Response**:
"Yes! We provide native SDKs for iOS (Swift) and Android (Kotlin/Java) that handle VPN connection management, server selection, and session handling. We also offer REST APIs for custom integrations. Complete documentation, code examples, and sample apps are included. Integration typically takes 1-2 days for basic functionality."

---

### Intent: uptime_sla
**User Says**:
- "What's your uptime?"
- "SLA guarantees?"
- "How reliable is it?"
- "Do you guarantee uptime?"
- "What if servers go down?"

**Bot Response**:
"We guarantee 99.9% uptime SLA for Growth plans and 99.99% for Enterprise plans. Our infrastructure runs on enterprise-grade hardware with redundant networking and automated failover. If a server goes down, our monitoring systems detect it within seconds and automatically failover users to nearby healthy servers while we investigate and resolve the issue."

---

### Intent: bandwidth_calculation
**User Says**:
- "How is bandwidth measured?"
- "How do you calculate data usage?"
- "What counts as bandwidth?"
- "Explain bandwidth limits"
- "How much bandwidth do I get?"

**Bot Response**:
"Bandwidth is measured as the total data transferred through your VPN servers, including both inbound and outbound traffic. Usage resets monthly at your billing cycle. You can monitor consumption in real-time via the dashboard and receive alerts at 80% and 90% usage. Different plans offer different bandwidth allocations: Starter (500 GB), Growth (5 TB), Enterprise (unlimited)."

---

### Intent: custom_configuration
**User Says**:
- "Can I customize servers?"
- "Do you allow custom configs?"
- "Can I change server settings?"
- "Custom configuration options?"
- "Bring my own config?"

**Bot Response**:
"Basic configurations are managed automatically for simplicity and security. However, Enterprise customers can customize advanced settings including kernel parameters, encryption options, and networking rules. We work with your team to ensure optimal performance for your specific use case. Contact sales to discuss your customization needs."

---

### Intent: support_options
**User Says**:
- "What support do you provide?"
- "How can I get help?"
- "Support options?"
- "Do you have phone support?"
- "What's your response time?"

**Bot Response**:
"Support varies by tier: Starter plans include email support with 24-48 hour response times. Growth plans get priority email with 4-8 hour response. Enterprise customers receive 24/7 phone support, 1-2 hour response times, and a dedicated account manager. All plans include comprehensive documentation, video tutorials, and access to code examples."

---

### Intent: target_audience
**User Says**:
- "Who is this for?"
- "Is FyreWay right for me?"
- "What type of companies use this?"
- "Am I your target customer?"
- "Who should use FyreWay?"

**Bot Response**:
"FyreWay is built for: VPN product companies looking to launch faster, SaaS teams adding VPN features to existing apps, mobile app developers entering the VPN market, enterprises needing private VPN infrastructure, and startups scaling globally without hiring infrastructure specialists. If you want VPN capabilities without building and managing infrastructure yourself, FyreWay is perfect for you."

---

### Intent: security_privacy
**User Says**:
- "Is it secure?"
- "Do you log user data?"
- "What about privacy?"
- "How secure is the platform?"
- "Do you track users?"

**Bot Response**:
"Security is our top priority. We provide hardened servers, automatic security patches, DDoS protection, and military-grade encryption. We do NOT log user browsing activity, connection contents, traffic destinations, or DNS queries. We only log connection timestamps and bandwidth for billing/operational purposes. We're SOC 2 Type II certified and GDPR compliant."

---

### Intent: migration_support
**User Says**:
- "Can I migrate from my current setup?"
- "Help migrating infrastructure?"
- "Switch from my own servers?"
- "Migration assistance?"
- "Moving from another platform?"

**Bot Response**:
"Absolutely! We provide comprehensive migration support including zero-downtime migration assistance, configuration import tools, 24/7 support during migration, gradual transition options, and cost comparison analysis. Many customers migrate from self-managed infrastructure to reduce costs and operational overhead. Contact us to discuss your migration plan."

---

### Intent: get_started
**User Says**:
- "How do I get started?"
- "How to sign up?"
- "Start using FyreWay"
- "Begin the process"
- "I want to try it"

**Bot Response**:
"Getting started is easy! Contact our sales team at info@fyreway.com or call +92 300 5163362. We'll discuss your requirements, provide a custom quote within 24 hours, and get you onboarded with dedicated support. You can deploy your first servers within hours of account creation. Would you like me to help you prepare for the initial consultation?"

---

### Intent: contact_information
**User Says**:
- "How do I contact you?"
- "Contact details?"
- "Phone number?"
- "Email address?"
- "Where are you located?"

**Bot Response**:
"You can reach us at: Email: info@fyreway.com, Phone: +92 300 5163362 (Mon-Fri, 9am-6pm PKT), Office: Ground Floor, Binchiragh Heights, Plaza No 23, Near Eiffel Tower, Bahria Town Phase 7, Islamabad/Rawalpindi, Pakistan. For technical support: support@fyreway.com. We typically respond to inquiries within 24 business hours."

---

### Intent: integration_time
**User Says**:
- "How long does integration take?"
- "Time to integrate?"
- "How fast can I integrate?"
- "Integration timeline?"
- "Development time needed?"

**Bot Response**:
"Typical integration timelines: Basic integration takes 1-2 days, full-featured app takes 1-2 weeks, migration from another platform takes 2-4 weeks, and enterprise custom integration takes 4-8 weeks. We provide SDKs, documentation, code examples, and support to make integration as smooth as possible. Most developers can have a working prototype within a few days."

---

### Intent: payment_methods
**User Says**:
- "What payment methods do you accept?"
- "How can I pay?"
- "Payment options?"
- "Do you accept credit cards?"
- "Can I pay with PayPal?"

**Bot Response**:
"We accept multiple payment methods: Credit/debit cards (Visa, Mastercard, Amex), bank transfer/wire transfer, ACH for US customers, PayPal in select regions, and cryptocurrency for Enterprise customers. Invoices are sent via email and downloadable from your dashboard."

---

### Intent: white_label
**User Says**:
- "Can I white-label this?"
- "Remove your branding?"
- "Use my own domain?"
- "Custom branding options?"
- "White-label solution?"

**Bot Response**:
"Yes! Enterprise customers can fully white-label the solution including: using custom domains, branding connection screens, using custom SSL certificates, removing FyreWay branding, and using custom API endpoints. This allows you to present the VPN service as entirely your own. Contact sales to discuss white-label options."

---

### Intent: performance_specs
**User Says**:
- "What's the performance?"
- "How fast is it?"
- "Bandwidth per server?"
- "Connection speed?"
- "Performance specifications?"

**Bot Response**:
"Each server provides 10 Gbps bandwidth with dedicated resources and no throttling. Expected per-connection performance: WireGuard up to 2 Gbps, OpenVPN up to 500 Mbps, IKEv2 up to 800 Mbps. Regional latency is typically <10ms. Each server supports 5,000+ concurrent connections. Performance is monitored in real-time through your dashboard."

---

### Intent: troubleshooting
**User Says**:
- "I'm having connection issues"
- "Server not working"
- "Can't connect"
- "Troubleshooting help"
- "Something's not working"

**Bot Response**:
"I can help with that! Common solutions: 1) Check server status in your dashboard, 2) Try a different VPN protocol, 3) Verify firewall settings allow VPN ports, 4) Test from a different network, 5) Re-download configuration files. For detailed troubleshooting, check our troubleshooting guide or contact support at support@fyreway.com with your server ID and error message."

---

### Intent: cost_comparison
**User Says**:
- "Compare to building my own"
- "DIY vs FyreWay"
- "Cost comparison"
- "Why not build it myself?"
- "Savings vs self-hosted?"

**Bot Response**:
"Building VPN infrastructure yourself typically costs $150K-300K+ in the first year (including DevOps salaries, cloud costs, tools, and 6-18 months development time). FyreWay costs $600-20K first year depending on scale, representing 80-95% cost reduction. Plus, you avoid hiring specialized teams and can launch in hours instead of months. Focus your resources on your core product, not infrastructure."

---

### Intent: thank_you
**User Says**:
- "Thank you"
- "Thanks"
- "That helps"
- "Appreciate it"
- "Thanks for your help"

**Bot Response**:
"You're welcome! If you have any other questions about FyreWay, feel free to ask. Ready to get started? Contact our sales team at info@fyreway.com or call +92 300 5163362. Have a great day!"

---

### Intent: goodbye
**User Says**:
- "Goodbye"
- "Bye"
- "See you"
- "That's all"
- "I'm done"

**Bot Response**:
"Thank you for your interest in FyreWay! If you have questions later, I'm always here to help. To get started with our VPN infrastructure platform, contact us at info@fyreway.com. Have a great day!"

---

## Glossary of Terms

### VPN (Virtual Private Network)
A technology that creates a secure, encrypted connection over a less secure network, such as the internet. Allows users to send and receive data as if their devices were directly connected to a private network.

### WireGuard
A modern, fast, and secure VPN protocol that uses state-of-the-art cryptography. Known for excellent performance and low battery consumption on mobile devices.

### OpenVPN
A widely-used, open-source VPN protocol known for strong security and broad device compatibility. More resource-intensive than WireGuard but works in more scenarios.

### IKEv2/IPSec
Internet Key Exchange version 2 / Internet Protocol Security. A VPN protocol with native support in iOS and macOS, excellent for mobile devices with good roaming capabilities.

### Bandwidth
The amount of data that can be transferred over a network connection in a given time period, typically measured in Gbps (gigabits per second) or GB (gigabytes).

### Latency
The time delay between sending data from one point to another, typically measured in milliseconds (ms). Lower latency means faster, more responsive connections.

### Auto-Scaling
Automatically adjusting the number of servers based on demand. Scales up during traffic spikes and down during quiet periods to optimize performance and costs.

### SLA (Service Level Agreement)
A commitment between service provider and customer defining the level of service expected, particularly uptime guarantees and consequences if not met.

### DDoS Protection
Defense against Distributed Denial of Service attacks, where multiple systems flood a target with traffic to make it unavailable. Protects infrastructure from these attacks.

### Encryption
The process of encoding data so only authorized parties can read it. VPN encryption protects data traveling between user devices and VPN servers.

### SDK (Software Development Kit)
A collection of software tools, libraries, and documentation that developers use to integrate FyreWay into their applications.

### API (Application Programming Interface)
A set of protocols and tools for building software and applications. Allows your application to communicate with FyreWay's platform programmatically.

### Concurrent Connections
The number of simultaneous active VPN connections to a server at any given moment.

### Server Provisioning
The process of preparing and configuring a server so it's ready to use. FyreWay automates this process to deploy servers in seconds.

### Perfect Forward Secrecy
A security feature ensuring that past communications remain secure even if encryption keys are compromised in the future.

### Multi-Region Deployment
Deploying servers across multiple geographic locations to improve performance, provide redundancy, and offer location choices to users.

### Load Balancing
Distributing network traffic across multiple servers to ensure no single server becomes overwhelmed, improving reliability and performance.

### Session Management
Tracking and controlling user VPN sessions, including authentication, connection duration, and data usage.

### White-Label
A product or service produced by one company that other companies rebrand and sell as their own. FyreWay Enterprise supports white-labeling.

### Infrastructure as a Service (IaaS)
A cloud computing model where infrastructure (servers, storage, networking) is provided as a service, eliminating need to manage physical hardware.

### Zero-Downtime Migration
Moving from one system to another without service interruption. Users continue using services normally during the migration process.

### Failover
Automatically switching to a backup server or system when the primary one fails, ensuring continuous service availability.

### SOC 2 Type II
A security certification indicating that a service organization has been audited for security, availability, processing integrity, confidentiality, and privacy.

### GDPR (General Data Protection Regulation)
European Union regulation on data protection and privacy, requiring specific handling of personal data for EU residents.

### Prorated Billing
Billing adjusted proportionally based on usage or time. If you upgrade mid-month, you only pay for the remaining days at the new rate.

### Throughput
The actual amount of data successfully transferred over a connection in a given time, often less than theoretical bandwidth due to various factors.

### Kill Switch
A security feature that automatically disconnects your internet if the VPN connection drops, preventing data from being exposed.

### Split Tunneling
A feature allowing some traffic to go through the VPN while other traffic uses the regular internet connection directly.

### DNS (Domain Name System)
The system that translates human-readable domain names (like fyreway.com) into IP addresses that computers use to identify each other.

### SSL/TLS Certificate
Digital certificates used to establish secure, encrypted connections between servers and clients.

### DevOps
A combination of development and operations practices aimed at shortening development cycles and providing continuous delivery of high-quality software.

### VPS (Virtual Private Server)
A virtual machine running on physical hardware, providing dedicated resources and control similar to a dedicated server but at lower cost.

---

*Last Updated: January 2026*
