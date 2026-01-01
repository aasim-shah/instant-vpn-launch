import { useState } from "react";
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
  ArrowRight,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [isVideoOpen, setIsVideoOpen] = useState(false);

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

          {/* show image with hover effect */}
          <div className="w-full rounded-2xl mt-10 group relative cursor-pointer overflow-hidden">
            <img 
              src="image2.jpeg" 
              alt="How it works !"
              className="max-w-full w-full rounded-2xl shadow-2xl shadow-primary/20 dark:shadow-primary/10 transition-transform duration-300 group-hover:scale-105"
            />
            {/* Hover Overlay */}
            <div className="absolute inset-0 rounded-2xl bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <Button
                onClick={() => setIsVideoOpen(true)}
                size="lg"
                className="gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              >
                <Play className="h-5 w-5" />
                Watch how it works!
              </Button>
            </div>
          </div>
        </div>

        {/* Video Modal */}
        <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
          <DialogContent className="max-w-4xl p-0 m-0 w-full border-0">
            <div className="relative w-full aspect-video rounded-lg p-0 m-0 overflow-hidden">
              <button
                onClick={() => setIsVideoOpen(false)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/90 hover:bg-black transition-colors"
              >
                <svg
                  className="h-6 w-6 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/k9T2eQhM4eY"
                title="How It Works"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 left-0 right-0 top-0 bottom-0"
              />
            </div>
          </DialogContent>
        </Dialog>

        {/* Main Content */}
        {/* <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
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
        </div> */}
      </div>
    </section>
  );
}
