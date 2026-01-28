import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { caseStudies } from '@/content/caseStudyData';
import { Link } from 'react-router-dom';

export default function CaseStudiesListing() {
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);
  const [selectedUseCase, setSelectedUseCase] = useState<string | null>(null);

  const industries = useMemo(() => 
    Array.from(new Set(caseStudies.map(cs => cs.industry))).sort(), 
  []);

  const useCases = useMemo(() => 
    Array.from(new Set(caseStudies.map(cs => cs.useCase))).sort(), 
  []);

  const filteredCaseStudies = useMemo(() => {
    let filtered = [...caseStudies];
    if (selectedIndustry) {
      filtered = filtered.filter(cs => cs.industry === selectedIndustry);
    }
    if (selectedUseCase) {
      filtered = filtered.filter(cs => cs.useCase === selectedUseCase);
    }
    return filtered;
  }, [selectedIndustry, selectedUseCase]);

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
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Customer Stories & <span className="gradient-text">Case Studies</span>
              </h1>
              
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                See how teams across industries use Fyreway to build and scale their VPN infrastructure. 
                Real problems, real solutions, real results.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="space-y-4">
              <div>
                <h3 className="mb-2 text-sm font-medium">Filter by Industry:</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedIndustry(null)}
                    className={`px-4 py-2 text-sm rounded-full transition-all ${
                      selectedIndustry === null
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'bg-muted/50 text-muted-foreground border border-border hover:bg-muted hover:border-border/80'
                    }`}
                  >
                    All Industries
                  </button>
                  {industries.map(industry => (
                    <button
                      key={industry}
                      onClick={() => setSelectedIndustry(industry)}
                      className={`px-4 py-2 text-sm rounded-full transition-all ${
                        selectedIndustry === industry
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'bg-muted/50 text-muted-foreground border border-border hover:bg-muted hover:border-border/80'
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="mb-2 text-sm font-medium">Filter by Use Case:</h3>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedUseCase(null)}
                    className={`px-4 py-2 text-sm rounded-full transition-all ${
                      selectedUseCase === null
                        ? 'bg-primary/20 text-primary border border-primary/30'
                        : 'bg-muted/50 text-muted-foreground border border-border hover:bg-muted hover:border-border/80'
                    }`}
                  >
                    All Use Cases
                  </button>
                  {useCases.map(useCase => (
                    <button
                      key={useCase}
                      onClick={() => setSelectedUseCase(useCase)}
                      className={`px-4 py-2 text-sm rounded-full transition-all ${
                        selectedUseCase === useCase
                          ? 'bg-primary/20 text-primary border border-primary/30'
                          : 'bg-muted/50 text-muted-foreground border border-border hover:bg-muted hover:border-border/80'
                      }`}
                    >
                      {useCase}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Case Studies Grid */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            {filteredCaseStudies.length > 0 ? (
              <div className="grid gap-8 md:grid-cols-2">
                {filteredCaseStudies.map(caseStudy => (
                  <Link key={caseStudy.slug} to={`/case-studies/${caseStudy.slug}`}>
                    <Card className="group overflow-hidden transition-all hover:shadow-lg hover:shadow-primary/10 hover:border-primary/50 h-full">
                      {caseStudy.image && (
                        <div className="aspect-video overflow-hidden">
                          <img
                            src={caseStudy.image}
                            alt={caseStudy.title}
                            className="h-full w-full object-cover transition-transform group-hover:scale-105"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <div className="mb-3 flex flex-wrap gap-2">
                          <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30">
                            {caseStudy.industry}
                          </span>
                          <span className="px-3 py-1 text-xs rounded-full bg-muted/50 text-muted-foreground border border-border">
                            {caseStudy.useCase}
                          </span>
                        </div>
                        <h3 className="mb-2 text-2xl font-semibold group-hover:text-primary transition-colors">
                          {caseStudy.title}
                        </h3>
                        <p className="mb-4 text-muted-foreground">
                          {caseStudy.excerpt}
                        </p>
                        <div className="grid grid-cols-2 gap-4 py-4 border-t border-border">
                          {caseStudy.results.slice(0, 4).map((result, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <TrendingUp className="h-4 w-4 text-primary shrink-0 mt-1" />
                              <div>
                                <div className="text-sm font-medium text-muted-foreground">
                                  {result.metric}
                                </div>
                                <div className="text-lg font-bold text-primary">
                                  {result.value}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-primary font-medium pt-4 border-t">
                          Read full case study
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="text-lg text-muted-foreground">
                  No case studies found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  onClick={() => {
                    setSelectedIndustry(null);
                    setSelectedUseCase(null);
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Ready to Build Your Success Story?</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Join hundreds of teams building with Fyreway. Start your free trial today.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link to="/#pricing">
                    Get Started
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
      </main>

      <Footer />
    </div>
  );
}
