import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AlertCircle, ArrowRight, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePublishedPages } from '@/hooks/use-cms';

export default function PagesListing() {
  const { data: pagesResponse, isLoading, isError, error } = usePublishedPages();

  const pages = pagesResponse?.body?.data ?? [];
  const sortedPages = [...pages].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));

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
                <FileText className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Information</span>
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Our <span className="gradient-text">Pages</span>
              </h1>

              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                Important information about our policies, terms, and more.
              </p>
            </div>
          </div>
        </section>

        {/* Pages Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {isLoading ? (
              <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="space-y-4 rounded-lg border border-border p-6">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))}
              </div>
            ) : isError ? (
              <div className="text-center py-20">
                <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
                <p className="text-lg text-muted-foreground">
                  {(error as Error)?.message || 'Failed to load pages. Please try again later.'}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
              </div>
            ) : sortedPages.length > 0 ? (
              <div className="mx-auto max-w-5xl grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {sortedPages.map((page) => (
                  <Link key={page._id} to={`/page/${page.slug}`}>
                    <Card className="group h-full overflow-hidden transition-all hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/50">
                      {page.featuredImage && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={page.featuredImage}
                            alt={page.headerTitle}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                      )}
                      <CardHeader>
                        {!page.featuredImage && (
                          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                            <FileText className="h-5 w-5" />
                          </div>
                        )}
                        <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                          {page.headerTitle}
                        </CardTitle>
                        <CardDescription className="line-clamp-3">
                          {page.headerDescription}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-primary font-medium">
                          Read more
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <FileText className="mx-auto mb-4 h-12 w-12 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">
                  No pages available yet. Check back soon!
                </p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
