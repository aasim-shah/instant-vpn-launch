import { Smartphone, Building2, Rocket, RefreshCcw } from "lucide-react";

const useCases = [
  {
    icon: Smartphone,
    title: "VPN Mobile Apps",
    description: "Launch consumer VPN apps with reliable backend infrastructure. Support millions of users with auto-scaling servers and global coverage.",
    features: ["iOS & Android SDK", "User session management", "Bandwidth analytics"],
  },
  {
    icon: Building2,
    title: "Enterprise VPN Solutions",
    description: "Build corporate VPN products with advanced security features, dedicated servers, and compliance-ready infrastructure.",
    features: ["Private server clusters", "SSO integration", "Audit logging"],
  },
  {
    icon: Rocket,
    title: "VPN Startups",
    description: "Go from idea to launch in days. Pre-built infrastructure lets you focus on product development instead of server management.",
    features: ["Quick deployment", "Predictable pricing", "No DevOps needed"],
  },
  {
    icon: RefreshCcw,
    title: "Existing VPN Migration",
    description: "Migrate from self-managed servers to our managed platform. Reduce operational overhead while improving reliability.",
    features: ["Zero-downtime migration", "Config import tools", "24/7 support"],
  },
];

export function UseCasesSection() {
  return (
    <section className="relative py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Use Cases
          </span>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Built for{" "}
            <span className="gradient-text">VPN Innovators</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Whether you're building a consumer app or enterprise solution, 
            our platform adapts to your needs.
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="group relative overflow-hidden rounded-2xl border border-border/50 bg-card/50 p-8 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-2xl hover:shadow-primary/15 shadow-lg shadow-primary/5"
            >
              {/* Gradient Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              
              <div className="relative">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <useCase.icon className="h-7 w-7" />
                </div>
                
                <h3 className="mb-3 text-xl font-bold sm:text-2xl">{useCase.title}</h3>
                <p className="mb-5 text-muted-foreground">{useCase.description}</p>
                
                <ul className="flex flex-wrap gap-2">
                  {useCase.features.map((feature) => (
                    <li
                      key={feature}
                      className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground"
                    >
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
