import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { ContentCard } from '@/components/ContentCards';
import { Button } from '@/components/ui/button';
import { Mail, ArrowRight } from 'lucide-react';
import { newsletters } from '@/content/newsletterData';
import { Link } from 'react-router-dom';

export default function NewsletterListing() {
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const sortedNewsletters = useMemo(() => {
    const sorted = [...newsletters];
    sorted.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });
    return sorted;
  }, [sortOrder]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-32 pb-20 border-b border-border">
          <div className="hero-grid absolute inset-0" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="h-[400px] w-[400px] rounded-full bg-primary/10 blur-[100px] animate-pulse-glow" />
          </div>
          
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm backdrop-blur-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Monthly Updates</span>
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Newsletters & <span className="gradient-text">Product Updates</span>
              </h1>
              
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                Stay up-to-date with the latest product releases, features, and company news. 
                Get insights delivered straight to your inbox.
              </p>

              <Button size="lg" asChild>
                <Link to="/newsletter/subscribe">
                  Subscribe Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold">Past Editions</h2>
              <div className="flex gap-2">
                <Button
                  variant={sortOrder === 'newest' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortOrder('newest')}
                >
                  Newest
                </Button>
                <Button
                  variant={sortOrder === 'oldest' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSortOrder('oldest')}
                >
                  Oldest
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Newsletters Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {sortedNewsletters.map(newsletter => (
                <ContentCard
                  key={newsletter.slug}
                  title={newsletter.title}
                  excerpt={newsletter.excerpt}
                  href={`/newsletter/${newsletter.slug}`}
                  image={newsletter.image}
                  date={newsletter.date}
                  category={newsletter.category}
                  tags={newsletter.tags}
                />
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-3xl font-bold text-center">Newsletter FAQ</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="mb-2 text-lg font-semibold">How often do you send newsletters?</h3>
                  <p className="text-muted-foreground">
                    We send monthly newsletters with product updates, feature releases, and company news. 
                    We may also send special announcements for major releases or events.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">What kind of content is included?</h3>
                  <p className="text-muted-foreground">
                    Our newsletters include new feature announcements, product roadmap updates, 
                    technical insights, customer success stories, and community highlights.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Can I unsubscribe anytime?</h3>
                  <p className="text-muted-foreground">
                    Yes, every newsletter includes an unsubscribe link. You can opt out at any time 
                    with a single click.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Do you share my email with third parties?</h3>
                  <p className="text-muted-foreground">
                    Never. Your email is only used to send you our newsletter and important product updates. 
                    We never share, sell, or distribute your information to third parties.
                  </p>
                </div>
                <div>
                  <h3 className="mb-2 text-lg font-semibold">Can I access past newsletters?</h3>
                  <p className="text-muted-foreground">
                    Yes! All past newsletters are archived on this page and accessible to everyone, 
                    whether subscribed or not.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
