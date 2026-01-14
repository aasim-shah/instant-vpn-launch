import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Check, ArrowRight, MessageSquare } from "lucide-react";

const plans = [
  {
    name: "Starter",
    description: "Perfect for MVP and testing",
    price: "$49",
    period: "/month",
    features: [
      "2 server locations",
      "500 GB bandwidth",
      "Up to 100 users",
      "WireGuard protocol",
      "Basic analytics",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Growth",
    description: "For growing VPN applications",
    price: "$149",
    period: "/month",
    features: [
      "10 server locations",
      "5 TB bandwidth",
      "Up to 5,000 users",
      "All protocols",
      "Advanced analytics",
      "Priority support",
      "Custom DNS",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For large-scale deployments",
    price: "Custom",
    period: "",
    features: [
      "Unlimited locations",
      "Unlimited bandwidth",
      "Unlimited users",
      "Dedicated servers",
      "Custom protocols",
      "24/7 phone support",
      "SLA guarantee",
      "Dedicated account manager",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Pricing
          </span>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Simple,{" "}
            <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Start free, scale as you grow. No hidden fees or surprise charges.
          </p>
        </div>

        {/* Contact for Pricing Section */}
        <div className="mx-auto max-w-2xl">
          <Card className="border-border/50 shadow-lg shadow-primary/5 bg-gradient-to-br from-primary/5 to-transparent">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Custom Pricing Available</CardTitle>
              <CardDescription className="mt-2 text-base">
                Need a tailored solution? Contact us for personalized pricing based on your specific requirements.
              </CardDescription>
            </CardHeader>
            
            <CardContent className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:gap-3">
              <a href="mailto:info@fyreway.com">
                <Button variant="hero" size="lg">
                  Contact Sales
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </a>
              <Button variant="hero-outline" size="lg">
                Schedule Demo
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
