import { 
  Globe, 
  Activity, 
  Gauge, 
  Zap
} from "lucide-react";

const stats = [
  { 
    icon: Globe, 
    value: "100+", 
    label: "Global Locations", 
    description: "Powered by 10+ infrastructure providers with worldwide presence" 
  },
  { 
    icon: Activity, 
    value: "99.9%", 
    label: "Uptime SLA", 
    description: "Designed for continuous, production-grade availability" 
  },
  { 
    icon: Gauge, 
    value: "<10ms", 
    label: "Regional Latency", 
    description: "Optimized routing based on user proximity" 
  },
  { 
    icon: Zap, 
    value: "10 Gbps", 
    label: "Throughput per Node", 
    description: "Built for high-volume, encrypted VPN traffic" 
  },
];

export function ScalePerformanceSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Infrastructure
          </span>
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Platform Scale &{" "}
            <span className="gradient-text">Performance</span>
          </h2>
        </div>

        {/* Stats Grid */}
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg"
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div className="mb-2 text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="mb-2 font-semibold">{stat.label}</div>
                  <p className="text-sm text-muted-foreground">{stat.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Disclaimer */}
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Performance and latency may vary by region and provider.
          </p>
        </div>
      </div>
    </section>
  );
}
