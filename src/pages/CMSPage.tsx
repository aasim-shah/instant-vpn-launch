import { useParams, Link } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { useCMSPageBySlug } from '@/hooks/use-cms';
import '@/styles/cms-content.css';

export default function CMSPage() {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: pageResponse,
    isLoading,
    isError,
  } = useCMSPageBySlug(slug || '');

  const page = pageResponse?.body;

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-6">
              <Skeleton className="h-8 w-32" />
              <Skeleton className="h-12 w-3/4" />
              <Skeleton className="h-6 w-full" />
              <div className="space-y-4 pt-8">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
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

  if (isError || !page) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
            <h1 className="mb-2 text-2xl font-bold">Page Not Found</h1>
            <p className="mb-6 text-muted-foreground">
              The page you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/">Go Home</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* SEO Meta Tags */}
      <SEO
        title={page.metaTitle || page.headerTitle}
        description={page.metaDescription || page.headerDescription}
        canonical={`/page/${page.slug}`}
        ogImage={page.featuredImage || '/image3.png'}
        ogImageAlt={page.headerTitle}
        keywords={page.metaKeywords}
        jsonLd={{
          '@type': 'WebPage',
          name: page.headerTitle,
          description: page.metaDescription || page.headerDescription,
          url: `https://fyreway.com/page/${page.slug}`,
          datePublished: page.createdAt,
          dateModified: page.updatedAt,
        }}
      />

      <Header />

      <main>
        {/* Header Section */}
        <section className="relative overflow-hidden pt-32 pb-16 border-b border-border">
          <div className="hero-grid absolute inset-0 opacity-50" />
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <Button variant="ghost" size="sm" asChild className="mb-6">
                <Link to="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>

              <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                {page.headerTitle}
              </h1>
              <p className="text-lg text-muted-foreground">
                {page.headerDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {/* {page.featuredImage && (
          <section className="border-b border-border">
            <div className="container mx-auto px-4 py-8">
              <div className="mx-auto max-w-4xl">
                <img
                  src={page.featuredImage}
                  alt={page.headerTitle}
                  className="w-full rounded-lg object-cover"
                />
              </div>
            </div>
          </section>
        )} */}

        {/* Body Content */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div 
                className="cms-content"
                dangerouslySetInnerHTML={{ __html: page.bodyContent }} 
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
