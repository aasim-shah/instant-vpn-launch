import { useState } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function NewsletterSubscribe() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic email validation
    if (!email || !email.includes('@')) {
      setStatus('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    
    // TODO: Implement actual newsletter subscription
    // This is a placeholder - integrate with your email service provider
    setTimeout(() => {
      setStatus('success');
    }, 1000);
  };

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
            <div className="mx-auto max-w-2xl">
              {status === 'success' ? (
                // Success State
                <Card className="p-12 text-center">
                  <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-green-500/10">
                    <CheckCircle2 className="h-8 w-8 text-green-500" />
                  </div>
                  <h2 className="mb-4 text-3xl font-bold">You're Subscribed!</h2>
                  <p className="mb-6 text-lg text-muted-foreground">
                    Thank you for subscribing to our newsletter. You'll receive our next edition 
                    directly in your inbox.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
                    <Button asChild>
                      <Link to="/newsletter">Browse Past Editions</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link to="/blog">Read Our Blog</Link>
                    </Button>
                  </div>
                </Card>
              ) : (
                // Subscription Form
                <>
                  <div className="text-center mb-12">
                    <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                      <Mail className="h-8 w-8 text-primary" />
                    </div>
                    <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
                      Subscribe to Our <span className="gradient-text">Newsletter</span>
                    </h1>
                    <p className="text-lg text-muted-foreground">
                      Get monthly product updates, feature releases, and technical insights 
                      delivered straight to your inbox.
                    </p>
                  </div>

                  <Card className="p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@company.com"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setStatus('idle');
                            setErrorMessage('');
                          }}
                          required
                          className="h-12"
                        />
                        {status === 'error' && (
                          <p className="mt-2 text-sm text-destructive">{errorMessage}</p>
                        )}
                      </div>

                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full"
                        disabled={status === 'loading'}
                      >
                        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>

                      <p className="text-xs text-center text-muted-foreground">
                        By subscribing, you agree to receive monthly newsletters from Fyreway. 
                        You can unsubscribe at any time. We'll never share your email with third parties.
                      </p>
                    </form>
                  </Card>

                  {/* Benefits */}
                  <div className="mt-12 space-y-4">
                    <h3 className="text-center font-semibold">What You'll Get:</h3>
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Product Updates</p>
                          <p className="text-sm text-muted-foreground">Latest features and releases</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Technical Insights</p>
                          <p className="text-sm text-muted-foreground">Engineering deep dives</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Customer Stories</p>
                          <p className="text-sm text-muted-foreground">Real-world use cases</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium">Community Highlights</p>
                          <p className="text-sm text-muted-foreground">Events and updates</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Past Editions */}
        {status !== 'success' && (
          <section className="py-20 border-t border-border bg-card/50">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl text-center">
                <h2 className="mb-4 text-3xl font-bold">Browse Past Editions</h2>
                <p className="mb-6 text-muted-foreground">
                  Want to see what you'll be getting? Check out our newsletter archive.
                </p>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/newsletter">View Newsletter Archive</Link>
                </Button>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}
