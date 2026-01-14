import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { SurveyModal } from "./SurveyModal";

export function FinalCTASection() {
  const [surveyOpen, setSurveyOpen] = useState(false);

  const benefits = [
    "Launch in days, not months",
    "99.9% uptime guarantee",
    "Enterprise-grade security",
    "24/7 expert support"
  ];

  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-gradient-to-b from-background to-secondary/20">
      {/* Background Elements */}
      <div className="absolute inset-0 hero-grid opacity-30" />
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />
      <div className="absolute left-0 bottom-0 h-[500px] w-[500px] rounded-full bg-primary/5 blur-[120px]" />

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          {/* Content Grid */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left Column - Text Content */}
            <div className="space-y-6">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <Zap className="h-4 w-4" />
                Ready to Transform Your VPN Business?
              </div>

              {/* Headline */}
              <h2 className="text-3xl font-bold sm:text-4xl lg:text-5xl">
                Start Building Your VPN Service{" "}
                <span className="gradient-text">Today</span>
              </h2>

              {/* Description */}
              <p className="text-lg text-muted-foreground">
                Join forward-thinking companies that trust FyreWay to power their VPN infrastructure. 
                Get started in minutes with our intuitive platform.
              </p>

              {/* Benefits List */}
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">{benefit}</span>
                  </li>
                ))}
              </ul>

              {/* CTAs */}
              <div className="flex flex-col gap-3 sm:flex-row pt-4">
                <Button variant="hero" size="lg" onClick={() => setSurveyOpen(true)}>
                  Get Started Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
                <a href="mailto:info@fyreway.com">
                  <Button variant="hero-outline" size="lg">
                    Reach us
                  </Button>
                </a>
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="relative">
              <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm p-8 shadow-2xl shadow-primary/5">
                <div className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-3xl font-bold gradient-text">50+</p>
                      <p className="text-sm text-muted-foreground">Global Locations</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-bold gradient-text">10M+</p>
                      <p className="text-sm text-muted-foreground">API Calls/Day</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-bold gradient-text">99.9%</p>
                      <p className="text-sm text-muted-foreground">Uptime SLA</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-3xl font-bold gradient-text">&lt;100ms</p>
                      <p className="text-sm text-muted-foreground">Avg Response</p>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-border/50" />

                  {/* Quote or Testimonial */}
                  {/* <div className="space-y-3">
                    <p className="text-sm italic text-muted-foreground">
                      "FyreWay helped us launch our VPN service in record time. 
                      The infrastructure is rock-solid and scales effortlessly."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">JD</span>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">John Doe</p>
                        <p className="text-xs text-muted-foreground">CTO, SecureNet</p>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
              
              {/* Decorative element */}
              <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
              <div className="absolute -left-4 -bottom-4 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
            </div>
          </div>
        </div>
      </div>

      {/* Survey Modal */}
      <SurveyModal open={surveyOpen} onOpenChange={setSurveyOpen} />
    </section>
  );
}
