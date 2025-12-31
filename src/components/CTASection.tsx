import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Rocket } from "lucide-react";
import { SurveyModal } from "./SurveyModal";

export function CTASection() {
  const [surveyOpen, setSurveyOpen] = useState(false);

  return (
    <section className="relative overflow-hidden py-24 lg:py-32 bg-secondary/30">
      {/* Background Elements */}
      <div className="absolute inset-0 hero-grid opacity-50" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="h-[400px] w-[600px] rounded-full bg-primary/10 blur-[100px] animate-pulse-glow" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center shadow-2xl shadow-primary/10 rounded-3xl p-12 bg-gradient-to-br from-primary/5 to-transparent backdrop-blur-sm">
          {/* Icon */}
          <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 shadow-lg shadow-primary/20">
            <Rocket className="h-8 w-8 text-primary" />
          </div>

          {/* Headline */}
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Take the Fast Path to{" "}
            <span className="gradient-text">Production-Ready VPN Infrastructure</span>
          </h2>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-xl text-lg text-muted-foreground">
            Stop spending months building infrastructure that already exists. 
            Use a platform designed to help you launch faster, operate reliably, 
            and scale globally — without infrastructure chaos.
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button variant="hero" size="xl" onClick={() => setSurveyOpen(true)}>
              Explore the VPN Infrastructure Platform
              <ArrowRight className="h-5 w-5" />
            </Button>
            <Button variant="hero-outline" size="xl">
              View Platform Documentation
            </Button>
          </div>
        </div>
      </div>

      {/* Survey Modal */}
      <SurveyModal open={surveyOpen} onOpenChange={setSurveyOpen} />
    </section>
  );
}
