import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Globe,
  Shield,
  Zap,
  Server,
  Lock,
  Activity,
  Cloud,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Instant Deployment",
    description: "Spin up production-ready VPN servers in seconds with zero configuration required.",
  },
  {
    icon: Globe,
    title: "Global Coverage",
    description: "50+ server locations worldwide with optimized routing for low latency connections.",
  },
  {
    icon: Shield,
    title: "Security First",
    description: "Hardened servers with automatic updates, DDoS protection, and encrypted connections.",
  },
  {
    icon: Server,
    title: "High Performance",
    description: "10Gbps bandwidth per server with dedicated resources and no throttling.",
  },
  {
    icon: Lock,
    title: "Protocol Support",
    description: "WireGuard, OpenVPN, and IKEv2 pre-configured and ready for your mobile app.",
  },
  {
    icon: Activity,
    title: "Real-time Monitoring",
    description: "Live metrics, usage analytics, and automated alerts for your entire infrastructure.",
  },
  {
    icon: Cloud,
    title: "Auto Scaling",
    description: "Automatically scale server capacity based on user demand and traffic patterns.",
  },
  {
    icon: Users,
    title: "User Management",
    description: "Built-in user authentication, session management, and access control APIs.",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 lg:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold uppercase tracking-wider text-primary">
            Features
          </span>
          <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Everything You Need to{" "}
            <span className="gradient-text">Power VPN Apps</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Enterprise-grade VPN infrastructure designed specifically for mobile 
            applications and SaaS products.
          </p>
        </div>

        {/* Features Grid */}
        <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className="group card-hover border-border/50 bg-card/50 backdrop-blur-sm shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-shadow"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardHeader className="pb-3">
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <feature.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
