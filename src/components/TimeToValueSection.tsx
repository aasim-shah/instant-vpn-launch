import { 
  Network, 
  Globe, 
  Scale, 
  AlertTriangle, 
  ShieldCheck, 
  Users,
  Clock,
  Rocket,
  PiggyBank,
  ShieldAlert,
  TrendingUp,
  ArrowRight
} from "lucide-react";

const buildChallenges = [
  { icon: Network, text: "Network architecture and protocol decisions" },
  { icon: Globe, text: "Global provider sourcing and negotiations" },
  { icon: Scale, text: "Scaling logic and failure handling" },
  { icon: AlertTriangle, text: "Monitoring, alerting, and reporting systems" },
  { icon: ShieldCheck, text: "Security hardening and compliance work" },
  { icon: Users, text: "Ongoing operational staffing" },
];

const businessBenefits = [
  { icon: Rocket, title: "Faster time to market", description: "Launch in hours, not months" },
  { icon: PiggyBank, title: "Lower infrastructure costs", description: "Significantly reduce DevOps spend" },
  { icon: ShieldAlert, title: "Reduced risk", description: "Lower operational and security risk" },
  { icon: TrendingUp, title: "Predictable scaling", description: "Scale confidently from day one" },
];

export function TimeToValueSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Time to Value
          </span>
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
            From Concept to Global VPN Infrastructure —{" "}
            <span className="gradient-text">In Hours</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Building VPN infrastructure internally typically takes months or years. 
            Our platform compresses all of this into a few hours.
          </p>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-6xl">
          {/* Two Column Layout */}
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Left: What Building Internally Involves */}
            <div className="rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500/10">
                  <Clock className="h-5 w-5 text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold">Building internally involves:</h3>
              </div>
              <div className="space-y-4">
                {buildChallenges.map((challenge, index) => (
                  <div key={index} className="flex items-center gap-3 text-muted-foreground">
                    <challenge.icon className="h-5 w-5 shrink-0 text-muted-foreground/60" />
                    <span>{challenge.text}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg bg-orange-500/10 p-4">
                <p className="text-sm text-orange-600 dark:text-orange-400 font-medium">
                  Typical timeline: 6-18 months with a dedicated team
                </p>
              </div>
            </div>

            {/* Right: What This Means for Your Business */}
            <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Rocket className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">What this means for your business:</h3>
              </div>
              <div className="space-y-5">
                {businessBenefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="font-semibold">{benefit.title}</h4>
                      <p className="text-sm text-muted-foreground">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 rounded-lg bg-primary/10 p-4">
                <p className="text-sm text-primary font-medium flex items-center gap-2">
                  <ArrowRight className="h-4 w-4" />
                  Our platform: Production-ready in hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
