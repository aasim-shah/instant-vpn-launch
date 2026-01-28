import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MessageSquare, Users, Mic, Calendar, ExternalLink, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DiscordCommunity() {
  const benefits = [
    {
      icon: <Users className="h-6 w-6" />,
      title: 'Network with Developers',
      description: 'Connect with developers building similar products and share experiences.',
    },
    {
      icon: <MessageSquare className="h-6 w-6" />,
      title: 'Get Quick Support',
      description: 'Ask questions and get help from both the community and Fyreway team.',
    },
    {
      icon: <Mic className="h-6 w-6" />,
      title: 'Join AMAs & Events',
      description: 'Participate in Ask Me Anything sessions with the Fyreway engineering team.',
    },
    {
      icon: <Calendar className="h-6 w-6" />,
      title: 'Stay Updated',
      description: 'Be the first to know about new features, releases, and platform updates.',
    },
  ];

  const channels = [
    { name: 'general', description: 'General discussion and community chat' },
    { name: 'help-support', description: 'Get help with integration and troubleshooting' },
    { name: 'showcase', description: 'Share your projects built with Fyreway' },
    { name: 'feature-requests', description: 'Suggest and discuss new features' },
    { name: 'announcements', description: 'Official product updates and news' },
    { name: 'engineering', description: 'Technical deep dives and architecture discussions' },
  ];

  const faqs = [
    {
      question: 'Do I need to be a Fyreway customer to join?',
      answer: 'No! Our Discord community is open to everyone interested in VPN infrastructure, whether you\'re evaluating Fyreway, already using it, or just curious about the space.',
    },
    {
      question: 'What kind of discussions happen in the community?',
      answer: 'We discuss VPN architecture, best practices, integration help, feature ideas, industry trends, and more. It\'s a mix of technical deep dives and casual networking.',
    },
    {
      question: 'Will the Fyreway team be active in Discord?',
      answer: 'Yes! Our engineering, support, and product teams are active daily to answer questions, gather feedback, and engage with the community.',
    },
    {
      question: 'Are there community events?',
      answer: 'Yes! We host monthly AMAs, quarterly tech talks, and occasional workshops. All events are announced in the Discord server.',
    },
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
                <MessageSquare className="h-4 w-4 text-primary" />
                <span className="text-muted-foreground">5,000+ Active Members</span>
              </div>

              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Join Our <span className="gradient-text">Discord Community</span>
              </h1>
              
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                Connect with developers, get support, share knowledge, and stay updated 
                with the latest from Fyreway. Join thousands of builders in our Discord server.
              </p>

              <Button size="lg" asChild>
                <a href="https://discord.gg/fyreway" target="_blank" rel="noopener noreferrer">
                  Join Discord
                  <ExternalLink className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-12 text-3xl font-bold text-center">Why Join Our Community?</h2>
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

        {/* Channels Section */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="mb-8 text-3xl font-bold text-center">Community Channels</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {channels.map((channel, index) => (
                  <Card key={index} className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30 mt-1 whitespace-nowrap">
                        #{channel.name}
                      </span>
                      <p className="text-sm text-muted-foreground flex-1">{channel.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="mb-8 text-3xl font-bold text-center">Frequently Asked Questions</h2>
              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="mb-2 text-lg font-semibold">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Ready to Join?</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                Be part of a growing community of developers building the future of VPN infrastructure.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <a href="https://discord.gg/fyreway" target="_blank" rel="noopener noreferrer">
                    Join Discord Community
                    <ExternalLink className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link to="/community">
                    Back to Community
                  </Link>
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
