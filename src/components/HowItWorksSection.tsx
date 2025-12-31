import { Settings, Server, Rocket, BarChart3 } from "lucide-react";

const steps = [
  {
    icon: Settings,
    title: "Configure",
    description: "Choose your server locations, protocols, and security settings from our intuitive dashboard.",
  },
  {
    icon: Server,
    title: "Deploy",
    description: "We provision hardened VPS instances with optimized VPN configurations in seconds.",
  },
  {
    icon: Rocket,
    title: "Connect",
    description: "Integrate with your mobile app using our SDK or standard VPN protocols.",
  },
  {
    icon: BarChart3,
    title: "Scale",
    description: "Monitor performance and scale automatically as your user base grows.",
  },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-24 lg:py-32">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            How It Works
          </span>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            From Zero to VPN in{" "}
            <span className="gradient-text">Four Steps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            No server expertise needed. We handle the infrastructure complexity 
            so you can focus on building your VPN application.
          </p>
        </div>

        {/* Steps */}
        <div className="relative mx-auto max-w-5xl">
          {/* Connection Line */}
          <div className="absolute left-[50%] top-8 hidden h-[calc(100%-4rem)] w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent lg:block" />

          <div className="grid gap-8 lg:gap-0">
            {steps.map((step, index) => (
              <div
                key={step.title}
                className={`relative flex flex-col items-center gap-6 lg:flex-row lg:gap-16 ${
                  index % 2 === 1 ? "lg:flex-row-reverse" : ""
                }`}
              >
                {/* Content */}
                <div className={`flex-1 text-center ${index % 2 === 0 ? "lg:text-right" : "lg:text-left"}`}>
                  <div className="inline-block">
                    <span className="mb-2 inline-block text-5xl font-bold text-primary/20">
                      0{index + 1}
                    </span>
                    <h3 className="mb-2 text-xl font-bold sm:text-2xl">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-border bg-card shadow-xl shadow-primary/15">
                  <step.icon className="h-7 w-7 text-primary" />
                </div>

                {/* Spacer for layout */}
                <div className="hidden flex-1 lg:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
