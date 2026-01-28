import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Award, DollarSign, Users, BarChart3, CheckCircle2 } from 'lucide-react';

export default function AffiliateProgram() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    audience: '',
    notes: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.website) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    
    // TODO: Implement actual form submission
    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

  const benefits = [
    {
      icon: <DollarSign className="h-6 w-6" />,
      title: '25% Recurring Commission',
      description: 'Earn 25% monthly recurring revenue for every customer you refer, for as long as they stay.',
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Dedicated Support',
      description: 'Work directly with our partner success team for personalized support and resources.',
    },
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: 'Real-Time Analytics',
      description: 'Track your referrals, conversions, and earnings with our comprehensive dashboard.',
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: 'Marketing Resources',
      description: 'Access exclusive content, banners, landing pages, and promotional materials.',
    },
  ];

  const idealFor = [
    'Technical content creators and bloggers',
    'YouTube and podcast hosts',
    'Developer influencers',
    'Development agencies and consultancies',
    'SaaS review platforms',
    'Tech community leaders',
  ];

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
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-2 text-sm backdrop-blur-sm">
                <Award className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">Earn 25% Recurring Revenue</span>
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Fyreway <span className="gradient-text">Affiliate Program</span>
              </h1>
              
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                Earn recurring revenue by recommending Fyreway to your audience. 
                Help developers build better VPN infrastructure while growing your income.
              </p>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-12 text-3xl font-bold text-center">Program Benefits</h2>
              <div className="grid gap-6 md:grid-cols-2">
                {benefits.map((benefit, index) => (
                  <Card key={index} className="p-6">
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {benefit.icon}
                    </div>
                    <h3 className="mb-2 text-xl font-semibold">{benefit.title}</h3>
                    <p className="text-muted-foreground">{benefit.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Ideal For Section */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-3xl font-bold text-center">Ideal For</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {idealFor.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-2xl">
              {status === 'success' ? (
                <Card className="p-12 text-center">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <h2 className="mb-4 text-3xl font-bold">Application Submitted!</h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    Thank you for your interest in the Fyreway Affiliate Program. 
                    Our team will review your application and get back to you within 2-3 business days.
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Check your email at <strong>{formData.email}</strong> for updates.
                  </p>
                </Card>
              ) : (
                <>
                  <div className="mb-8 text-center">
                    <h2 className="mb-4 text-3xl font-bold">Apply Now</h2>
                    <p className="text-muted-foreground">
                      Fill out the form below to join our affiliate program. We review all applications within 2-3 business days.
                    </p>
                  </div>

                  <Card className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="website" className="block text-sm font-medium mb-2">
                          Website/Platform URL *
                        </label>
                        <Input
                          id="website"
                          type="url"
                          placeholder="https://"
                          value={formData.website}
                          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                          required
                        />
                      </div>

                      <div>
                        <label htmlFor="audience" className="block text-sm font-medium mb-2">
                          Audience Size
                        </label>
                        <Input
                          id="audience"
                          placeholder="e.g., 10,000 monthly visitors"
                          value={formData.audience}
                          onChange={(e) => setFormData({ ...formData, audience: e.target.value })}
                        />
                      </div>

                      <div>
                        <label htmlFor="notes" className="block text-sm font-medium mb-2">
                          Tell us about yourself
                        </label>
                        <Textarea
                          id="notes"
                          rows={4}
                          placeholder="How do you plan to promote Fyreway? What makes you a good fit for our affiliate program?"
                          value={formData.notes}
                          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        />
                      </div>

                      {status === 'error' && (
                        <p className="text-sm text-destructive">
                          Please fill in all required fields.
                        </p>
                      )}

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full"
                        disabled={status === 'loading'}
                      >
                        {status === 'loading' ? 'Submitting...' : 'Submit Application'}
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        By applying, you agree to our affiliate program terms and conditions.
                      </p>
                    </form>
                  </Card>
                </>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
