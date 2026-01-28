import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HubCard } from '@/components/ContentCards';
import { Award, Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export default function PartnersHub() {
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
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Partnerships & <span className="gradient-text">Trust</span>
              </h1>
              
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                Join our partner ecosystem and grow with Fyreway. Whether you're a content creator, 
                agency, or technology partner, we offer programs designed for mutual success.
              </p>
            </div>
          </div>
        </section>

        {/* Hub Cards */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
              <HubCard
                icon={<Award className="h-8 w-8" />}
                title="Affiliate Program"
                description="Earn recurring revenue by recommending Fyreway to your audience. Competitive commissions and dedicated support."
                href="/partners/affiliate"
                count="Join today"
              />
              <HubCard
                icon={<Star className="h-8 w-8" />}
                title="Partner Showcase & Reviews"
                description="See what our partners and customers say about working with Fyreway. Read testimonials and success stories."
                href="/partners/reviews"
                count="See reviews"
              />
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-12 text-3xl font-bold text-center">Why Partner with Fyreway?</h2>
              <div className="grid gap-8 md:grid-cols-3">
                <div className="text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Award className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Competitive Revenue</h3>
                  <p className="text-muted-foreground">
                    Earn recurring commissions on every referral with our generous partner program.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Star className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Dedicated Support</h3>
                  <p className="text-muted-foreground">
                    Get priority support from our partner success team to help you succeed.
                  </p>
                </div>
                <div className="text-center">
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <ArrowRight className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">Marketing Resources</h3>
                  <p className="text-muted-foreground">
                    Access co-marketing materials, case studies, and promotional content.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Ready to Partner?</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join our growing partner ecosystem and help developers build better VPN infrastructure.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link to="/partners/affiliate">
                    Apply for Affiliate Program
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/partners/reviews">View Testimonials</Link>
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
