import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How quickly can I deploy VPN servers?",
    answer: "Our platform provisions servers in under 10 seconds. Once you select your configuration and locations, your VPN infrastructure is ready to accept connections almost instantly.",
  },
  {
    question: "Which VPN protocols are supported?",
    answer: "We support WireGuard, OpenVPN, and IKEv2/IPSec out of the box. All protocols come pre-configured with optimized settings for mobile applications. WireGuard is recommended for best performance.",
  },
  {
    question: "Can I scale servers automatically?",
    answer: "Yes, our Growth and Enterprise plans include auto-scaling. The platform monitors your server load and automatically provisions additional capacity during traffic spikes, then scales down during quiet periods.",
  },
  {
    question: "Is there an SDK for mobile integration?",
    answer: "We provide native SDKs for iOS and Android that handle VPN connection management, server selection, and session handling. REST APIs are also available for custom integrations.",
  },
  {
    question: "What kind of uptime can I expect?",
    answer: "We guarantee 99.99% uptime SLA for all paid plans. Our infrastructure runs on enterprise-grade hardware with redundant networking and automated failover across multiple availability zones.",
  },
  {
    question: "How is bandwidth calculated?",
    answer: "Bandwidth is measured as the total data transferred through your VPN servers. Inbound and outbound traffic are both counted. Usage resets monthly, and you can monitor consumption in real-time via the dashboard.",
  },
  {
    question: "Can I bring my own server configuration?",
    answer: "Enterprise customers can customize server configurations, including kernel parameters, encryption settings, and networking rules. We work with your team to ensure optimal performance for your use case.",
  },
  {
    question: "What support is available?",
    answer: "Starter plans include email support. Growth plans get priority email with 4-hour response times. Enterprise customers receive 24/7 phone support and a dedicated account manager.",
  },
];

export function FAQSection() {
  return (
    <section id="faq" className="relative py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            FAQ
          </span>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Frequently Asked{" "}
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to know about launching VPN infrastructure with our platform.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="rounded-xl border border-border/50 bg-card/50 px-6 backdrop-blur-sm"
              >
                <AccordionTrigger className="py-5 text-left font-semibold hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
