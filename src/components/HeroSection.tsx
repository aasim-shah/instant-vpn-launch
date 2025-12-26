import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Globe, Zap, Shield } from "lucide-react";
import { SurveyModal } from "./SurveyModal";

export function HeroSection() {
  const [surveyOpen, setSurveyOpen] = useState(false);

  return (
    <section className="relative min-h-screen overflow-hidden pt-16">
      {/* Background Elements */}
      <div className="hero-grid absolute inset-0" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[600px] w-[600px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
      </div>
      
      {/* Floating Elements */}
      <div className="absolute left-[15%] top-[30%] hidden lg:block">
        <div className="animate-float rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <Globe className="h-8 w-8 text-primary" />
        </div>
      </div>
      <div className="absolute right-[15%] top-[25%] hidden lg:block">
        <div className="animate-float animation-delay-200 rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <Zap className="h-8 w-8 text-primary" />
        </div>
      </div>
      <div className="absolute left-[20%] bottom-[25%] hidden lg:block">
        <div className="animate-float animation-delay-400 rounded-2xl border border-border/50 bg-card/50 p-4 backdrop-blur-sm">
          <Shield className="h-8 w-8 text-primary" />
        </div>
      </div>

      {/* Content */}
      <div className="container relative mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-20">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="animate-fade-up mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm backdrop-blur-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground">Powered by 10+ infrastructure providers with worldwide presence</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up animation-delay-200 mb-6 text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            What Takes Years to Build{" "}
            <span className="gradient-text">We Deliver in Hours</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up animation-delay-400 mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
            A fully managed, end-to-end VPN infrastructure platform that handles everything — global provisioning, scaling, monitoring, reporting, dashboards, and APIs — so companies can launch and operate VPN-enabled products without building or operating the underlying infrastructure.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up animation-delay-600 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button variant="hero" size="xl" onClick={() => setSurveyOpen(true)}>
              Explore the Platform
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="hero-outline" size="xl">
              View Documentation
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="animate-fade-up animation-delay-600 mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              99.9% Uptime SLA
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Enterprise Security
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-green-500" />
              Real-time Monitoring
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="mt-20 grid w-full max-w-4xl grid-cols-2 gap-6 md:grid-cols-4">
          {[
            { value: "100+", label: "Global Locations" },
            { value: "99.9%", label: "Uptime SLA" },
            { value: "<10ms", label: "Regional Latency" },
            { value: "10 Gbps", label: "Throughput/Node" },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="animate-fade-up text-center"
              style={{ animationDelay: `${600 + index * 100}ms` }}
            >
              <div className="text-3xl font-bold gradient-text sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Survey Modal */}
      <SurveyModal open={surveyOpen} onOpenChange={setSurveyOpen} />
    </section>
  );
}
