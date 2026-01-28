import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HubCard, ContentCard } from '@/components/ContentCards';
import { BookOpen, Mail, FileText, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/content/blogData';
import { newsletters } from '@/content/newsletterData';
import { caseStudies } from '@/content/caseStudyData';
import { Button } from '@/components/ui/button';

export default function ContentHub() {
  // Get latest content from each category
  const latestBlog = blogPosts[0];
  const latestNewsletter = newsletters[0];
  const latestCaseStudy = caseStudies[0];

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
                Content & <span className="gradient-text">Knowledge</span>
              </h1>
              
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                Explore our technical blogs, product updates, and customer success stories. 
                Stay informed with the latest insights from the VPN infrastructure world.
              </p>
            </div>
          </div>
        </section>

        {/* Hub Cards Section */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-3">
              <HubCard
                icon={<BookOpen className="h-8 w-8" />}
                title="Blogs & Tech News"
                description="Technical articles, best practices, and industry insights from our engineering team."
                href="/blog"
                count={`${blogPosts.length} articles`}
              />
              <HubCard
                icon={<Mail className="h-8 w-8" />}
                title="Newsletters & Updates"
                description="Monthly product updates, new features, and company news delivered to your inbox."
                href="/newsletter"
                count={`${newsletters.length} editions`}
              />
              <HubCard
                icon={<FileText className="h-8 w-8" />}
                title="Customer Stories"
                description="Real-world case studies showing how teams build with Fyreway's VPN infrastructure."
                href="/case-studies"
                count={`${caseStudies.length} case studies`}
              />
            </div>
          </div>
        </section>

        {/* Latest Content Section */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="mb-12 flex items-center justify-between">
              <h2 className="text-3xl font-bold">Latest Content</h2>
            </div>

            <div className="space-y-16">
              {/* Latest Blog */}
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">From the Blog</h3>
                  <Button variant="ghost" asChild>
                    <Link to="/blog">
                      View all
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {blogPosts.slice(0, 3).map((post) => (
                    <ContentCard
                      key={post.slug}
                      title={post.title}
                      excerpt={post.excerpt}
                      href={`/blog/${post.slug}`}
                      image={post.image}
                      date={post.date}
                      readingTime={post.readingTime}
                      category={post.category}
                      tags={post.tags}
                      author={post.author}
                    />
                  ))}
                </div>
              </div>

              {/* Latest Newsletter */}
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">Recent Newsletters</h3>
                  <Button variant="ghost" asChild>
                    <Link to="/newsletter">
                      View all
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {newsletters.slice(0, 2).map((newsletter) => (
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

              {/* Latest Case Study */}
              <div>
                <div className="mb-6 flex items-center justify-between">
                  <h3 className="text-2xl font-semibold">Customer Success Stories</h3>
                  <Button variant="ghost" asChild>
                    <Link to="/case-studies">
                      View all
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {caseStudies.slice(0, 2).map((caseStudy) => (
                    <ContentCard
                      key={caseStudy.slug}
                      title={caseStudy.title}
                      excerpt={caseStudy.excerpt}
                      href={`/case-studies/${caseStudy.slug}`}
                      image={caseStudy.image}
                      date={caseStudy.date}
                      category={caseStudy.industry}
                      tags={caseStudy.tags}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl">
                Stay Updated
              </h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Subscribe to our newsletter for monthly product updates, technical insights, 
                and exclusive content delivered to your inbox.
              </p>
              <Button size="lg" asChild>
                <Link to="/newsletter/subscribe">
                  Subscribe to Newsletter
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
