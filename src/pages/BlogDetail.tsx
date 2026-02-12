import { useParams, Link, Navigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin, Facebook, AlertCircle } from 'lucide-react';
import { useBlogBySlug, useRelatedBlogs } from '@/hooks/use-cms';import '@/styles/cms-content.css';
import { UserAvatar } from '@/components/ui/user-avatar';
export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: blogResponse,
    isLoading,
    isError,
  } = useBlogBySlug(slug || '');

  const post = blogResponse?.body;

  // Fetch related blogs using the post ID
  const { data: relatedResponse } = useRelatedBlogs(post?._id || '');
  const relatedPosts = relatedResponse?.body ?? [];

  if (!isLoading && !post && !isError) {
    return <Navigate to="/blog" replace />;
  }

  const shareUrl = `https://fyreway.com/blog/${slug}`;
  const shareText = post?.title || '';

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

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

  if (isError || !post) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-32 pb-20">
          <div className="container mx-auto px-4 text-center">
            <AlertCircle className="mx-auto mb-4 h-12 w-12 text-destructive" />
            <h1 className="mb-2 text-2xl font-bold">Blog Post Not Found</h1>
            <p className="mb-6 text-muted-foreground">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Header Section */}
        <section className="relative overflow-hidden pt-32 pb-12 border-b border-border">
          <div className="hero-grid absolute inset-0 opacity-50" />
          
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <Button variant="ghost" size="sm" asChild className="mb-6">
                <Link to="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
                </Link>
              </Button>

              <div className="mb-4 flex flex-wrap gap-2">
                {post.categories?.map(cat => (
                  <span key={cat} className="px-4 py-2 text-sm rounded-full bg-primary/20 text-primary border border-primary/30">
                    {cat}
                  </span>
                ))}
                {post.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 text-sm rounded-full bg-muted/50 text-muted-foreground border border-border">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                {post.author && (
                  <div className="flex items-center gap-2">
                    <UserAvatar name={post.author.name} imageUrl={""} size="md" />
                    <span className="font-medium text-foreground">{post.author.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                {post.readTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime} min read</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.featuredImage && (
          <section className="border-b border-border">
            <div className="container mx-auto px-4 py-8">
              <div className="mx-auto max-w-4xl">
                <img
                  src={post.featuredImage}
                  alt={post.title}
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
              <div className="grid gap-12 lg:grid-cols-[1fr,250px]">
                {/* Main Content */}
                <div
                  className="cms-content"
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Sidebar */}
                <aside className="space-y-6">
                  {/* Share */}
                  <Card className="p-6 sticky top-24 hover:shadow-lg hover:border-foreground/10 transition-all">
                    <h3 className="mb-4 font-semibold flex items-center gap-2">
                      <Share2 className="h-4 w-4" />
                      Share
                    </h3>
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="justify-start"
                        onClick={() => handleShare('twitter')}
                      >
                        <Twitter className="mr-2 h-4 w-4" />
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="justify-start"
                        onClick={() => handleShare('linkedin')}
                      >
                        <Linkedin className="mr-2 h-4 w-4" />
                        LinkedIn
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="justify-start"
                        onClick={() => handleShare('facebook')}
                      >
                        <Facebook className="mr-2 h-4 w-4" />
                        Facebook
                      </Button>
                    </div>
                  </Card>
                </aside>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="py-20 border-t border-border bg-card/50">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-8 text-3xl font-bold">Related Articles</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.map(relatedPost => (
                    <Card key={relatedPost._id} className="overflow-hidden group hover:shadow-xl hover:shadow-primary/20 hover:-translate-y-1 hover:border-primary/50 transition-all">
                      <Link to={`/blog/${relatedPost.slug}`}>
                        {relatedPost.featuredImage && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={relatedPost.featuredImage}
                              alt={relatedPost.title}
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <h3 className="mb-2 font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {relatedPost.summary}
                          </p>
                        </div>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
