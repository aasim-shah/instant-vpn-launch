import { 
  Smartphone, 
  Building2, 
  Rocket, 
  Server,
  TrendingUp
} from "lucide-react";

const audiences = [
  { 
    icon: Smartphone, 
    title: "VPN Product Companies", 
    description: "Launch faster without building or operating backend VPN infrastructure" 
  },
  { 
    icon: Building2, 
    title: "SaaS & Consumer Application Teams", 
    description: "Add secure networking or VPN features without operational complexity" 
  },
  { 
    icon: Rocket, 
    title: "Mobile App Development Companies", 
    description: "Enter the VPN market quickly and capture market share — even if you've never built a VPN product before" 
  },
  { 
    icon: Server, 
    title: "Enterprises", 
    description: "Deploy private or hybrid VPN infrastructure without internal DevOps overhead" 
  },
  { 
    icon: TrendingUp, 
    title: "Startups & Growth Teams", 
    description: "Scale globally without hiring networking and infrastructure specialists" 
  },
];

export function TargetAudienceSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Who It's For
          </span>
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Who This Platform Is{" "}
            <span className="gradient-text">Built For</span>
          </h2>
        </div>

        {/* Audience Grid */}
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {audiences.map((audience, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg ${
                  index === 4 ? "sm:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Gradient Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                
                <div className="relative">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <audience.icon className="h-7 w-7" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold">{audience.title}</h3>
                  <p className="text-muted-foreground">{audience.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
