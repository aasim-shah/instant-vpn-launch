import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { HubCard } from '@/components/ContentCards';
import { MessageSquare, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Link } from 'react-router-dom';

export default function CommunityHub() {
  const guidelines = [
    'Be respectful and professional',
    'Help others and share knowledge',
    'Stay on topic and constructive',
    'No spam or self-promotion',
    'Follow Discord/platform rules',
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
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Community & <span className="gradient-text">Engagement</span>
              </h1>
              
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                Connect with developers, share knowledge, and stay updated with the Fyreway community. 
                Join discussions, attend events, and meet the team behind the platform.
              </p>
            </div>
          </div>
        </section>

        {/* Hub Cards */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 max-w-5xl mx-auto">
              <HubCard
                icon={<MessageSquare className="h-8 w-8" />}
                title="Discord Community"
                description="Join our active Discord server for real-time discussions, support, and networking with fellow developers."
                href="/community/discord"
                count="5,000+ members"
              />
              <HubCard
                icon={<Users className="h-8 w-8" />}
                title="The People at Fyreway"
                description="Meet our team of engineers, designers, and support specialists who make Fyreway possible."
                href="/community/team"
                count="Meet the team"
              />
            </div>
          </div>
        </section>

        {/* Community Guidelines */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-3xl font-bold text-center">Community Guidelines</h2>
              <Card className="p-8 hover:shadow-lg hover:border-foreground/10 transition-all">
                <p className="mb-6 text-muted-foreground">
                  Our community is built on respect, collaboration, and shared learning. 
                  Follow these simple guidelines to ensure a positive experience for everyone:
                </p>
                <ul className="space-y-3">
                  {guidelines.map((guideline, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary text-sm font-semibold">
                        {index + 1}
                      </div>
                      <span className="pt-0.5">{guideline}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Join the Conversation</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Whether you're just getting started or scaling to millions of users, 
                our community is here to help.
              </p>
              <Button size="lg" asChild>
                <Link to="/community/discord">
                  Join Discord Community
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
