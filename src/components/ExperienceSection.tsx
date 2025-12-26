import { 
  Award,
  Target,
  Lightbulb,
  CheckCircle2
} from "lucide-react";

export function ExperienceSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Why Us
          </span>
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Built From Years of{" "}
            <span className="gradient-text">Real-World VPN Operations</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-4xl">
          {/* Main Description Card */}
          <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-8 lg:p-10 backdrop-blur-sm">
            {/* Background Accent */}
            <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
            <div className="absolute -left-20 -bottom-20 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
            
            <div className="relative space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <Award className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold">Production-Tested Expertise</h3>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed">
                This platform is the result of years of hands-on experience designing, deploying, 
                and operating VPN infrastructure across regions, providers, traffic patterns, and failure scenarios.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="flex items-start gap-3 rounded-lg bg-secondary/50 p-4">
                  <Target className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    Every part of the system — from scaling rules to monitoring thresholds — 
                    is based on real production learnings, not theoretical designs.
                  </p>
                </div>
                <div className="flex items-start gap-3 rounded-lg bg-secondary/50 p-4">
                  <Lightbulb className="h-5 w-5 shrink-0 text-primary mt-0.5" />
                  <p className="text-sm text-muted-foreground">
                    We've already solved the problems that typically appear only after months 
                    or years of operating VPN networks.
                  </p>
                </div>
              </div>

              {/* Result Statement */}
              <div className="mt-8 rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 to-transparent p-6">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                  <p className="text-lg font-medium">
                    The result: a system you can trust for{" "}
                    <span className="text-primary">mission-critical workloads</span> from day one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
