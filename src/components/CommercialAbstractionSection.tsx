import { 
  FileText, 
  DollarSign, 
  Receipt, 
  Gauge,
  CheckCircle2
} from "lucide-react";

const managedItems = [
  { icon: FileText, text: "Contracting and commercial relationships with infrastructure providers" },
  { icon: DollarSign, text: "Provider-level pricing complexity" },
  { icon: Receipt, text: "Invoicing and cost aggregation" },
  { icon: Gauge, text: "Usage-based billing and metering" },
];

export function CommercialAbstractionSection() {
  return (
    <section className="relative py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Key Differentiator
          </span>
          <h2 className="mb-6 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Commercial & Operational{" "}
            <span className="gradient-text">Abstraction</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Beyond infrastructure, we remove the commercial and operational burden of working 
            with multiple cloud providers and hyperscalers.
          </p>
        </div>

        {/* Main Content */}
        <div className="mx-auto max-w-5xl">
          {/* What We Manage */}
          <div className="mb-12">
            <h3 className="mb-8 text-xl font-semibold text-center">Our platform manages:</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {managedItems.map((item, index) => (
                <div
                  key={index}
                  className="group flex items-center gap-4 rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/30"
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <p className="text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Value Proposition Card */}
          <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent p-8 lg:p-10">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative">
              <p className="mb-6 text-xl font-medium leading-relaxed">
                You get <span className="text-primary">one platform</span>, <span className="text-primary">one contract</span>, <span className="text-primary">one bill</span>, with a pay-as-you-go pricing model that scales with your business.
              </p>
              <div className="flex flex-wrap gap-4">
                {["No long-term commitments", "No hidden operational costs", "Scales with your business"].map((text) => (
                  <div key={text} className="flex items-center gap-2 text-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                    <span className="text-muted-foreground">{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
