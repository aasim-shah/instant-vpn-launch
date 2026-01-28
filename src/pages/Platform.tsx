import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { FeatureCard } from '@/components/ContentCards';
import { 
  Globe, 
  Zap, 
  Shield, 
  Code, 
  BarChart3, 
  Lock,
  Server,
  Boxes,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Platform() {
  const capabilities = [
    {
      icon: <Code className="h-6 w-6" />,
      title: 'Developer-First API',
      description: 'Clean, well-documented REST API that integrates seamlessly with your existing infrastructure.',
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: 'Global Network',
      description: '50+ server locations across all continents, ensuring low latency for your users worldwide.',
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: 'Auto-Scaling',
      description: 'Automatically scale from 10 to 10 million connections without infrastructure changes.',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Real-Time Analytics',
      description: 'Comprehensive dashboards with real-time metrics, logs, and performance insights.',
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: 'Enterprise Security',
      description: 'SOC 2, ISO 27001, GDPR compliant infrastructure with enterprise-grade encryption.',
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: 'Protocol Support',
      description: 'WireGuard, OpenVPN, IKEv2 - choose the protocol that fits your use case.',
    },
  ];

  const architectureComponents = [
    {
      icon: <Server className="h-6 w-6" />,
      title: 'Edge Network',
      description: 'Global CDN-like VPN edge network with intelligent routing and automatic failover.',
    },
    {
      icon: <Boxes className="h-6 w-6" />,
      title: 'Control Plane',
      description: 'Centralized management API for configuration, monitoring, and user authentication.',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Observability Stack',
      description: 'Built-in logging, metrics, and tracing for complete system visibility.',
    },
  ];

  const useCases = [
    'Mobile VPN applications',
    'SaaS secure remote access',
    'IoT device communication',
    'Gaming network optimization',
    'Enterprise connectivity',
    'Privacy-focused consumer apps',
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20">
          <div className="hero-grid absolute inset-0" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[500px] w-[500px] rounded-full bg-primary/10 blur-[100px] animate-pulse-glow" />
          </div>
          
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm backdrop-blur-sm">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-muted-foreground">The VPN Backend Platform</span>
              </div>
              
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                A Powerful and Scalable{' '}
                <span className="gradient-text">VPN Backend Platform</span>
              </h1>
              
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                Built for developers and SaaS teams. Deploy production-ready VPN infrastructure 
                in hours, not months. Focus on your product while we handle the complexity.
              </p>
              
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link to="/#pricing">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/contact">Talk to Sales</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* What It Is Section */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                What is Fyreway?
              </h2>
              <p className="text-lg text-muted-foreground">
                Fyreway is a VPN backend infrastructure platform that eliminates the complexity 
                of building and managing VPN infrastructure. We provide the servers, protocols, 
                networking, monitoring, and security - you provide the vision.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {capabilities.map((capability, index) => (
                <FeatureCard key={index} {...capability} />
              ))}
            </div>
          </div>
        </section>

        {/* Architecture Section */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Platform Architecture
              </h2>
              <p className="text-lg text-muted-foreground">
                Built on a modern, cloud-native architecture designed for reliability, 
                performance, and scale.
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 mb-12">
              {architectureComponents.map((component, index) => (
                <FeatureCard key={index} {...component} />
              ))}
            </div>

            <div className="mx-auto max-w-4xl p-8 rounded-2xl border border-border bg-card/50 backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-6 text-center">How It Works</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Your Application</h4>
                    <p className="text-sm text-muted-foreground">
                      Integrate our SDK or API into your mobile app, SaaS platform, or IoT device.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Fyreway Edge Network</h4>
                    <p className="text-sm text-muted-foreground">
                      Your users connect to our global edge network with intelligent routing for optimal performance.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">Your Infrastructure</h4>
                    <p className="text-sm text-muted-foreground">
                      Secure, encrypted traffic reaches your backend services or provides internet access.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center mb-16">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Built for Developers & SaaS Teams
              </h2>
              <p className="text-lg text-muted-foreground">
                Whether you're building a consumer VPN app or adding secure remote access 
                to your SaaS platform, Fyreway has you covered.
              </p>
            </div>

            <div className="mx-auto max-w-4xl">
              <div className="grid gap-4 sm:grid-cols-2">
                {useCases.map((useCase, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card"
                  >
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0" />
                    <span className="font-medium">{useCase}</span>
                  </div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <Button size="lg" asChild>
                  <Link to="/case-studies">
                    See Customer Stories
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Ready to Build?
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join hundreds of developers and SaaS teams building on Fyreway. 
                Get started in minutes with our comprehensive documentation and support.
              </p>
              <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link to="/#pricing">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/blog">Read the Blog</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/community">Join Community</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
