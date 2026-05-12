import { useParams, Link, Navigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, ArrowLeft, Mail, AlertCircle } from 'lucide-react';
import { useNewsletterBySlug } from '@/hooks/use-cms';import '@/styles/cms-content.css';
import { SEO, organizationSchema } from '@/components/SEO';
export default function NewsletterDetail() {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: newsletterResponse,
    isLoading,
    isError,
  } = useNewsletterBySlug(slug || '');

  const newsletter = newsletterResponse?.body;

  if (!isLoading && !newsletter && !isError) {
    return <Navigate to="/newsletter" replace />;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-6">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-1/2" />
              <Skeleton className="aspect-video w-full rounded-lg" />
              <div className="space-y-4">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (isError || !newsletter) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
            <h1 className="mb-2 text-2xl font-bold">Newsletter Not Found</h1>
            <p className="mb-6 text-muted-foreground">
              The newsletter you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/newsletter">Back to Newsletters</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const publishedDate = newsletter.publishedAt || newsletter.createdAt;
  const metaTitle = newsletter.metaTitle || newsletter.title;
  const metaDescription = newsletter.metaDescription || newsletter.summary || `Read ${newsletter.title} from FyreWay.`;

  return (
    <div className="min-h-screen bg-background">
      <SEO
        title={metaTitle}
        description={metaDescription}
        canonical={`/newsletter/${newsletter.slug}`}
        ogType="article"
        ogImage={newsletter.featuredImage || '/image3.png'}
        ogImageAlt={newsletter.title}
        keywords={newsletter.tags}
        article={{
          publishedTime: publishedDate,
          modifiedTime: newsletter.updatedAt,
          author: 'FyreWay',
          tags: newsletter.tags,
        }}
        jsonLd={{
          '@type': 'Article',
          headline: newsletter.title,
          description: metaDescription,
          image: newsletter.featuredImage,
          datePublished: publishedDate,
          dateModified: newsletter.updatedAt,
          author: {
            '@type': 'Organization',
            name: 'FyreWay',
          },
          publisher: organizationSchema,
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://fyreway.com/newsletter/${newsletter.slug}`,
          },
          keywords: newsletter.tags.join(', '),
        }}
      />
      <Header />
      
      <main>
        {/* Header Section */}
        <section className="relative overflow-hidden pt-32 pb-12 border-b border-border">
          <div className="hero-grid absolute inset-0 opacity-50" />
          
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <Button variant="ghost" size="sm" asChild className="mb-6">
                <Link to="/newsletter">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Newsletters
                </Link>
              </Button>

              <div className="mb-4 flex flex-wrap gap-2">
                {newsletter.categories?.map(cat => (
                  <span key={cat} className="px-4 py-2 text-sm rounded-full bg-primary/20 text-primary border border-primary/30">
                    {cat}
                  </span>
                ))}
                {newsletter.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 text-sm rounded-full bg-muted/50 text-muted-foreground border border-border">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
                {newsletter.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(newsletter.publishedAt || newsletter.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {newsletter.featuredImage && (
          <section className="border-b border-border">
            <div className="container mx-auto px-4 py-8">
              <div className="mx-auto max-w-4xl">
                <img
                  src={newsletter.featuredImage}
                  alt={newsletter.title}
                  className="w-full rounded-lg object-cover aspect-video"
                />
              </div>
            </div>
          </section>
        )}

        {/* Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="grid gap-12 lg:grid-cols-[1fr,300px]">
                {/* Main Content */}
                <div
                  className="cms-content"
                  dangerouslySetInnerHTML={{ __html: newsletter.content }}
                />

                {/* Sidebar */}
                <aside className="space-y-6">
                  {/* Subscribe CTA */}
                  <Card className="p-6 sticky top-24 hover:shadow-lg hover:border-foreground/10 transition-all">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <Mail className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="mb-2 font-semibold">Never Miss an Update</h3>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Get the latest product updates and news delivered to your inbox monthly.
                    </p>
                    <Button className="w-full" asChild>
                      <Link to="/newsletter/subscribe">
                        Subscribe Now
                      </Link>
                    </Button>
                  </Card>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* More Newsletters */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-6xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Explore More Editions</h2>
              <p className="mb-8 text-muted-foreground">
                Browse our archive of past newsletters
              </p>
              <Button size="lg" asChild>
                <Link to="/newsletter">View All Newsletters</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
