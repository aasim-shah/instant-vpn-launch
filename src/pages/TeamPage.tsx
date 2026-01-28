import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Mail, Linkedin } from 'lucide-react';

export default function TeamPage() {
  const team = [
    {
      name: 'Alex Rivera',
      role: 'Co-founder & CEO',
      bio: 'Former infrastructure lead at a major cloud provider. Passionate about simplifying complex systems for developers.',
      expertise: ['Leadership', 'Strategy', 'Product Vision'],
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alex',
      email: 'alex@fyreway.com',
      linkedin: 'https://linkedin.com/in/alexrivera',
    },
    {
      name: 'Samantha Chen',
      role: 'Co-founder & CTO',
      bio: 'Scaled VPN infrastructure for 100M+ users at previous companies. Expert in network protocols and distributed systems.',
      expertise: ['VPN Architecture', 'Distributed Systems', 'Performance'],
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Samantha',
      email: 'sam@fyreway.com',
      linkedin: 'https://linkedin.com/in/samanthachen',
    },
    {
      name: 'Marcus Johnson',
      role: 'VP of Engineering',
      bio: 'Led engineering teams at enterprise SaaS companies. Focused on developer experience and platform reliability.',
      expertise: ['Engineering Leadership', 'DevOps', 'Cloud Infrastructure'],
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus',
      email: 'marcus@fyreway.com',
      linkedin: 'https://linkedin.com/in/marcusjohnson',
    },
    {
      name: 'Priya Sharma',
      role: 'Head of Product',
      bio: 'Product leader with expertise in developer tools. Believes in building products that developers love to use.',
      expertise: ['Product Strategy', 'Developer Tools', 'UX'],
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Priya',
      email: 'priya@fyreway.com',
      linkedin: 'https://linkedin.com/in/priyasharma',
    },
    {
      name: 'James Taylor',
      role: 'Lead Security Engineer',
      bio: 'Security researcher and cryptography expert. Ensures Fyreway meets the highest security standards.',
      expertise: ['Security', 'Cryptography', 'Compliance'],
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=James',
      email: 'james@fyreway.com',
      linkedin: 'https://linkedin.com/in/jamestaylor',
    },
    {
      name: 'Elena Rodriguez',
      role: 'Head of Customer Success',
      bio: 'Dedicated to helping customers succeed. Builds relationships and ensures customers get maximum value.',
      expertise: ['Customer Success', 'Support', 'Training'],
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Elena',
      email: 'elena@fyreway.com',
      linkedin: 'https://linkedin.com/in/elenarodriguez',
    },
  ];

  const values = [
    {
      title: 'Developer First',
      description: 'We build for developers, by developers. Every decision starts with "how does this help our users?"',
    },
    {
      title: 'Transparency',
      description: 'Open communication, honest pricing, and clear documentation. No hidden fees, no surprises.',
    },
    {
      title: 'Security Mindset',
      description: 'Security isn\'t a feature—it\'s a foundation. We take protecting your data seriously.',
    },
    {
      title: 'Continuous Improvement',
      description: 'We ship fast, learn faster, and iterate constantly based on customer feedback.',
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
              <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                The People at <span className="gradient-text">Fyreway</span>
              </h1>
              
              <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
                Meet the team building the VPN infrastructure platform for developers. 
                We're engineers, designers, and support specialists passionate about simplifying complex systems.
              </p>
            </div>
          </div>
        </section>

        {/* Team Grid */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
              {team.map((member, index) => (
                <Card key={index} className="p-6 group hover:shadow-lg transition-shadow">
                  <div className="flex flex-col items-center text-center mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mb-4"
                    />
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{member.role}</p>
                    <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  </div>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {member.expertise.map((skill, idx) => (
                      <span key={idx} className="px-3 py-1 text-xs rounded-full bg-primary/20 text-primary border border-primary/30">
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 justify-center pt-4 border-t">
                    <a
                      href={`mailto:${member.email}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-secondary transition-colors"
                      title="Email"
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border hover:bg-secondary transition-colors"
                      title="LinkedIn"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-20 border-t border-border bg-card/50">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-5xl">
              <h2 className="mb-12 text-3xl font-bold text-center">Our Values</h2>
              <div className="grid gap-8 md:grid-cols-2">
                {values.map((value, index) => (
                  <Card key={index} className="p-6">
                    <h3 className="mb-3 text-xl font-semibold">{value.title}</h3>
                    <p className="text-muted-foreground">{value.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Join Us Section */}
        <section className="py-20 border-t border-border">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="mb-4 text-3xl font-bold">Join Our Team</h2>
              <p className="mb-8 text-lg text-muted-foreground">
                We're always looking for talented engineers, designers, and customer success professionals 
                who share our passion for building great developer tools.
              </p>
              <p className="text-muted-foreground">
                Interested in joining Fyreway?{' '}
                <a href="mailto:careers@fyreway.com" className="text-primary hover:underline">
                  careers@fyreway.com
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
