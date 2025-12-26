import { 
  ShieldCheck, 
  Activity, 
  Gauge, 
  Wrench
} from "lucide-react";

const outcomes = [
  { 
    icon: ShieldCheck, 
    title: "Security", 
    description: "Hardened VPN configurations with continuous monitoring and isolation" 
  },
  { 
    icon: Activity, 
    title: "Monitoring", 
    description: "Always-on health checks, traffic visibility, and automated alerts" 
  },
  { 
    icon: Gauge, 
    title: "Optimization", 
    description: "Infrastructure tuned specifically for VPN protocols and encrypted traffic" 
  },
  { 
    icon: Wrench, 
    title: "Operations", 
    description: "Built-in operational workflows refined through real-world usage" 
  },
];

export function OutcomesSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            What You Get
          </span>
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Designed for Outcomes,{" "}
            <span className="gradient-text">Not Buzzwords</span>
          </h2>
        </div>

        {/* Outcomes Grid */}
        <div className="mx-auto max-w-5xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {outcomes.map((outcome, index) => (
              <div
                key={index}
                className="group text-center"
              >
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:scale-110">
                  <outcome.icon className="h-8 w-8" />
                </div>
                <h3 className="mb-3 text-xl font-bold">{outcome.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{outcome.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
