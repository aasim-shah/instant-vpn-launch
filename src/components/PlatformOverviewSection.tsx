import { 
  Globe, 
  LayoutDashboard, 
  Activity, 
  GitBranch, 
  Scale, 
  BarChart3, 
  Code2, 
  ShieldCheck, 
  Cloud,
  CheckCircle2
} from "lucide-react";

const platformFeatures = [
  { icon: Globe, text: "Global VPN infrastructure provisioning across multiple providers" },
  { icon: LayoutDashboard, text: "Centralized management dashboards" },
  { icon: Activity, text: "Real-time monitoring, health checks, and alerting" },
  { icon: GitBranch, text: "Traffic routing, capacity planning, and optimization" },
  { icon: Scale, text: "Automated horizontal and vertical scaling" },
  { icon: BarChart3, text: "Reporting, analytics, and usage visibility" },
  { icon: Code2, text: "APIs & SDKs for seamless application integration" },
  { icon: ShieldCheck, text: "Built-in security and operational best practices" },
  { icon: Cloud, text: "Cloud provider abstraction — we manage providers so you don't have to" },
];

export function PlatformOverviewSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Platform Overview
          </span>
          <p className="mb-6 text-3xl font-bold sm:text-3xl lg:text-4xl">
            A True VPN Infrastructure Platform{" "}
            <span className="gradient-text text-2xl block">(Not Just APIs or Servers)</span>
          </p>
          <p className="text-lg text-muted-foreground">
            Our platform is built for companies that need to run VPN infrastructure at scale, 
            without taking on the complexity, cost, and risk of building it themselves.
          </p>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-6xl">
          {/* Description Card */}
          <div className="mb-12 rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm">
            <p className="text-lg text-muted-foreground leading-relaxed">
              Instead of stitching together cloud providers, writing orchestration logic, building dashboards, 
              managing contracts, and operating global networks 24/7, our platform delivers a complete, 
              production-ready VPN infrastructure system out of the box.
            </p>
          </div>

          {/* Features Grid */}
          <div className="mb-12">
            <h3 className="mb-8 text-xl font-semibold text-center">The platform includes:</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {platformFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="group flex items-start gap-4 rounded-xl border border-border/50 bg-card/50 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:bg-card/80"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Statement */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-center">
            {["Everything is integrated", "Everything is managed", "Everything is designed for production use"].map((text) => (
              <div key={text} className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="font-medium">{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
