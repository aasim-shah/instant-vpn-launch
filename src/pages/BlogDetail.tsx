import { useParams, Link, Navigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, ArrowLeft, Share2, Twitter, Linkedin, Facebook } from 'lucide-react';
import { blogPosts } from '@/content/blogData';

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get related posts (same category, different post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.slug !== post.slug)
    .slice(0, 3);

  const shareUrl = `https://fyreway.com/blog/${post.slug}`;
  const shareText = post.title;

  const handleShare = (platform: string) => {
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    };
    window.open(urls[platform as keyof typeof urls], '_blank', 'width=600,height=400');
  };

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
                <span className="px-4 py-2 text-sm rounded-full bg-primary/20 text-primary border border-primary/30">
                  {post.category}
                </span>
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
                    {post.author.avatar && (
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-10 w-10 rounded-full"
                      />
                    )}
                    <span className="font-medium text-foreground">{post.author.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(post.date).toLocaleDateString('en-US', {
                      month: 'long',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                </div>
                {post.readingTime && (
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readingTime}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {post.image && (
          <section className="border-b border-border">
            <div className="container mx-auto px-4 py-8">
              <div className="mx-auto max-w-4xl">
                <img
                  src={post.image}
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
                <article className="prose prose-slate dark:prose-invert max-w-none">
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {post.content}
                  </div>
                </article>

                {/* Sidebar */}
                <aside className="space-y-6">
                  {/* Share */}
                  <Card className="p-6 sticky top-24">
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
                    <Card key={relatedPost.slug} className="overflow-hidden group hover:shadow-lg transition-shadow">
                      <Link to={`/blog/${relatedPost.slug}`}>
                        {relatedPost.image && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={relatedPost.image}
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
                            {relatedPost.excerpt}
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
