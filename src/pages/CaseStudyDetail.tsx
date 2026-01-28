import { useParams, Link, Navigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ArrowLeft, Quote, TrendingUp, ArrowRight } from 'lucide-react';
import { caseStudies } from '@/content/caseStudyData';

export default function CaseStudyDetail() {
  const { slug } = useParams<{ slug: string }>();
  const caseStudy = caseStudies.find(cs => cs.slug === slug);

  if (!caseStudy) {
    return <Navigate to="/case-studies" replace />;
  }

  const relatedCaseStudies = caseStudies
    .filter(cs => (cs.industry === caseStudy.industry || cs.useCase === caseStudy.useCase) && cs.slug !== caseStudy.slug)
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main>
        {/* Header Section */}
        <section className="relative overflow-hidden pt-32 pb-12 border-b border-border">
          <div className="hero-grid absolute inset-0 opacity-50" />
          
          <div className="container relative mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <Button variant="ghost" size="sm" asChild className="mb-6">
                <Link to="/case-studies">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Case Studies
                </Link>
              </Button>

              <div className="mb-4 flex flex-wrap gap-2">
                <span className="px-4 py-2 text-sm rounded-full bg-primary/20 text-primary border border-primary/30">
                  {caseStudy.industry}
                </span>
                <span className="px-4 py-2 text-sm rounded-full bg-muted/50 text-muted-foreground border border-border">
                  {caseStudy.useCase}
                </span>
                {caseStudy.tags.map(tag => (
                  <span key={tag} className="px-4 py-2 text-sm rounded-full bg-muted/50 text-muted-foreground border border-border">
                    {tag}
                  </span>
                ))}
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
                {caseStudy.title}
              </h1>

              <p className="text-xl text-muted-foreground mb-8">
                {caseStudy.excerpt}
              </p>

              {/* Results Highlights */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {caseStudy.results.map((result, index) => (
                  <Card key={index} className="p-4 bg-card/50 backdrop-blur-sm">
                    <div className="flex items-start gap-2 mb-2">
                      <TrendingUp className="h-4 w-4 text-primary shrink-0 mt-1" />
                      <div className="text-sm text-muted-foreground">{result.metric}</div>
                    </div>
                    <div className="text-2xl font-bold text-primary">{result.value}</div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Featured Image */}
        {caseStudy.image && (
          <section className="border-b border-border">
            <div className="container mx-auto px-4 py-8">
              <div className="mx-auto max-w-5xl">
                <img
                  src={caseStudy.image}
                  alt={caseStudy.title}
                  className="w-full rounded-lg object-cover aspect-video"
                />
              </div>
            </div>
          </section>
        )}

        {/* Content Sections */}
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl space-y-12">
              {/* Problem */}
              <div>
                <h2 className="mb-4 text-3xl font-bold">The Challenge</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {caseStudy.problem}
                  </p>
                </div>
              </div>

              {/* Solution */}
              <div>
                <h2 className="mb-4 text-3xl font-bold">The Solution</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {caseStudy.solution}
                  </p>
                </div>
              </div>

              {/* Implementation */}
              <div className="bg-card/50 rounded-lg p-8 border border-border">
                <h2 className="mb-4 text-3xl font-bold">Implementation</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {caseStudy.implementation}
                  </p>
                </div>
              </div>

              {/* Outcomes */}
              <div>
                <h2 className="mb-4 text-3xl font-bold">Results & Outcomes</h2>
                <div className="prose prose-slate dark:prose-invert max-w-none">
                  <p className="text-lg text-muted-foreground whitespace-pre-wrap leading-relaxed">
                    {caseStudy.outcomes}
                  </p>
                </div>
              </div>

              {/* Testimonial */}
              <Card className="relative overflow-hidden p-8 bg-gradient-to-br from-primary/5 to-transparent border-primary/20">
                <Quote className="absolute top-4 right-4 h-16 w-16 text-primary/10" />
                <div className="relative">
                  <p className="mb-6 text-xl font-medium italic">
                    "{caseStudy.testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div>
                      <div className="font-semibold">{caseStudy.testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">
                        {caseStudy.testimonial.role} at {caseStudy.testimonial.company}
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Build Your Own Success Story</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Ready to transform your VPN infrastructure like {caseStudy.client}? 
                Get started with Fyreway today.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link to="/#pricing">
                    Start Free Trial
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

        {/* Related Case Studies */}
        {relatedCaseStudies.length > 0 && (
          <section className="py-20 border-t border-border">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-6xl">
                <h2 className="mb-8 text-3xl font-bold">More Success Stories</h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {relatedCaseStudies.map(related => (
                    <Link key={related.slug} to={`/case-studies/${related.slug}`}>
                      <Card className="group overflow-hidden transition-all hover:shadow-lg h-full">
                        {related.image && (
                          <div className="aspect-video overflow-hidden">
                            <img
                              src={related.image}
                              alt={related.title}
                              className="h-full w-full object-cover transition-transform group-hover:scale-105"
                            />
                          </div>
                        )}
                        <div className="p-6">
                          <div className="mb-2 flex gap-2">
                            <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30">
                              {related.industry}
                            </span>
                          </div>
                          <h3 className="mb-2 font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                            {related.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {related.excerpt}
                          </p>
                        </div>
                      </Card>
                    </Link>
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
