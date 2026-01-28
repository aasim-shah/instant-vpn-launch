import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Quote, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PartnerReviews() {
  const testimonials = [
    {
      quote: "Fyreway transformed our VPN app development from a multi-year project to a three-week sprint. The infrastructure just works, and our team can focus entirely on user experience.",
      author: "Marcus Chen",
      role: "Co-founder & CTO",
      company: "SecureMobile",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    },
    {
      quote: "As an agency, we've built VPN solutions for multiple clients using Fyreway. The white-label capabilities and reliable infrastructure make us look like heroes.",
      author: "Jennifer Martinez",
      role: "VP of Engineering",
      company: "DataFlow Pro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jennifer",
    },
    {
      quote: "Managing VPN infrastructure for a million IoT devices seemed impossible. Fyreway made it trivial. The scalability is remarkable.",
      author: "Dr. Raj Patel",
      role: "CTO",
      company: "SmartHome Connect",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Raj",
    },
    {
      quote: "The latency reduction we achieved with Fyreway's intelligent routing changed our entire business. Competitive gaming is now viable on our platform.",
      author: "Alex Thompson",
      role: "VP of Infrastructure",
      company: "GameStream Pro",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    },
    {
      quote: "Support is exceptional. The team genuinely cares about our success and responds quickly to any questions or issues.",
      author: "Sarah Kim",
      role: "Engineering Lead",
      company: "PrivateNet",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
    },
    {
      quote: "The documentation is outstanding. We integrated Fyreway in days, not weeks. The SDK examples covered exactly what we needed.",
      author: "David Brown",
      role: "Senior Developer",
      company: "Shield VPN",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=David",
    },
  ];

  const partners = [
    { name: "SecureMobile", logo: "SM" },
    { name: "DataFlow Pro", logo: "DF" },
    { name: "SmartHome Connect", logo: "SH" },
    { name: "GameStream Pro", logo: "GS" },
    { name: "PrivateNet", logo: "PN" },
    { name: "Shield VPN", logo: "SV" },
    { name: "CloudGuard", logo: "CG" },
    { name: "NetSecure", logo: "NS" },
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
                <Star className="h-4 w-4 text-primary fill-primary" />
                <span className="text-muted-foreground">Trusted by 500+ Companies</span>
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Partner Showcase & <span className="gradient-text">Reviews</span>
              </h1>
              
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                See what our partners and customers say about building with Fyreway. 
                Real feedback from real companies building real products.
              </p>
            </div>
          </div>
        </section>

        {/* Partner Logos */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-12 text-2xl font-semibold text-center">Trusted By</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center p-6 rounded-lg border border-border bg-card hover:border-foreground/20 hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="text-center">
                      <div className="mb-2 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary font-bold text-lg">
                        {partner.logo}
                      </div>
                      <div className="text-sm font-medium">{partner.name}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-12 text-3xl font-bold text-center">What Our Partners Say</h2>
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {testimonials.map((testimonial, index) => (
                  <Card key={index} className="relative p-6 hover:shadow-xl hover:shadow-primary/15 hover:-translate-y-1 hover:border-primary/40 transition-all">
                    <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/10" />
                    <div className="relative">
                      <div className="mb-4 flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                        ))}
                      </div>
                      <p className="mb-6 text-muted-foreground italic">
                        "{testimonial.quote}"
                      </p>
                      <div className="flex items-center gap-3 pt-4 border-t">
                        <img
                          src={testimonial.avatar}
                          alt={testimonial.author}
                          className="h-10 w-10 rounded-full"
                        />
                        <div>
                          <div className="font-semibold text-sm">{testimonial.author}</div>
                          <div className="text-xs text-muted-foreground">
                            {testimonial.role} at {testimonial.company}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-12 text-3xl font-bold text-center">By the Numbers</h2>
              <div className="grid gap-8 md:grid-cols-4">
                <Card className="p-6 text-center hover:shadow-lg hover:border-foreground/10 hover:-translate-y-0.5 transition-all">
                  <div className="mb-2 text-4xl font-bold text-primary">500+</div>
                  <div className="text-sm text-muted-foreground">Active Customers</div>
                </Card>
                <Card className="p-6 text-center hover:shadow-lg hover:border-foreground/10 hover:-translate-y-0.5 transition-all">
                  <div className="mb-2 text-4xl font-bold text-primary">99.95%</div>
                  <div className="text-sm text-muted-foreground">Uptime SLA</div>
                </Card>
                <Card className="p-6 text-center hover:shadow-lg hover:border-foreground/10 hover:-translate-y-0.5 transition-all">
                  <div className="mb-2 text-4xl font-bold text-primary">10M+</div>
                  <div className="text-sm text-muted-foreground">Daily Connections</div>
                </Card>
                <Card className="p-6 text-center hover:shadow-lg hover:border-foreground/10 hover:-translate-y-0.5 transition-all">
                  <div className="mb-2 text-4xl font-bold text-primary">50+</div>
                  <div className="text-sm text-muted-foreground">Server Locations</div>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Become a Partner</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join hundreds of companies building with Fyreway. Experience the same success our partners have achieved.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link to="/partners/affiliate">
                    Join Affiliate Program
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/case-studies">Read Case Studies</Link>
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
