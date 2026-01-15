import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Target, Users, Lightbulb, TrendingUp, Award } from "lucide-react";

const AboutUs = () => {
  const services = [
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Digital Transformation Consulting",
      description: "Guide your business through the digital evolution with strategic planning and execution.",
    },
    {
      icon: <Target className="h-6 w-6" />,
      title: "Mobile Experience Innovation",
      description: "Create exceptional experiences across Android, iOS, and beyond.",
    },
    {
      icon: <Lightbulb className="h-6 w-6" />,
      title: "AI-Powered Innovation",
      description: "Leverage cutting-edge AI solutions for smarter business outcomes.",
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Future-Ready Development",
      description: "Build scalable and agile frameworks designed for sustainable growth.",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Strategic Growth Consulting",
      description: "Achieve business excellence through strategic planning and operational optimization.",
    },
  ];

  const atxPillars = [
    "Goals & Objectives",
    "Leadership & Governance",
    "Talent & Skills",
    "Processes & Methodologies",
    "Tools & Technologies",
    "Training & Development",
    "Collaboration & Communication",
    "Innovation & R&D",
    "Metrics & Performance",
    "Customer Focus",
    "Continuous Improvement",
  ];

  const whyChooseUs = [
    {
      title: "Industry Expertise",
      description: "Deep knowledge in app & game development with proven track record",
    },
    {
      title: "Proven Structured Model",
      description: "AT-X Framework built from decades of real-world experience",
    },
    {
      title: "Results-Focused Approach",
      description: "Actionable strategies, not generic advice",
    },
    {
      title: "End-to-End Improvement",
      description: "Comprehensive solutions across delivery, leadership, and retention",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-16">
        {/* Hero Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-primary/10 text-primary hover:bg-primary/20">
              About Exceleries Consultancy
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              Transforming Goals Into Results
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
              Exceleries Consultancy helps mobile app and game companies transform goals into results through strategy, innovation, and operational excellence. Our approach is built around the AT-X (AppTech Excellence) Framework, covering leadership, talent, processes, tools, performance metrics, and customer focus to drive profitability and sustainable growth.
            </p>
          </div>
        </section>

        {/* About Us Content */}
        <section className="container mx-auto px-4 mb-20">
          <Card className="max-w-5xl mx-auto border-2">
            <CardContent className="p-8 md:p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Who We Are</h2>
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-muted-foreground leading-relaxed mb-4">
                  At Exceleries Consultancy, we empower mobile apps and games development businesses to transform and thrive in the digital age. With a structured and practical approach, we help companies align business goals with execution, optimize performance, and strengthen long-term profitability.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Our in-house developed <strong className="text-foreground">AT-X (AppTech Excellence) Framework</strong> provides an integrated roadmap that supports growth across leadership, talent, processes, innovation, customer engagement, and continuous improvement.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Services Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">What We Do</h2>
              <p className="text-muted-foreground text-lg">
                Comprehensive services designed to elevate your business
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="mb-4 text-primary">
                      {service.icon}
                    </div>
                    <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* AT-X Framework Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-5xl mx-auto">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <Badge className="mb-4 bg-primary text-primary-foreground">
                    Our Core Framework
                  </Badge>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4">
                    The AT-X Framework
                  </h2>
                  <p className="text-muted-foreground text-lg max-w-3xl mx-auto">
                    A structured business excellence framework built around 11 pillars, designed specifically for app/game development companies to improve execution and scale sustainably.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                  {atxPillars.map((pillar, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg bg-background/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors"
                    >
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0" />
                      <span className="font-medium text-sm">{pillar}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="container mx-auto px-4 mb-20">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Exceleries</h2>
              <p className="text-muted-foreground text-lg">
                A consulting approach built on expertise, structure, and results
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {whyChooseUs.map((item, index) => (
                <Card key={index} className="border-2">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Award className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                        <p className="text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto border-2 border-primary/20 bg-gradient-to-r from-primary/10 to-primary/5">
            <CardContent className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Transform Your Business?
              </h2>
              <p className="text-muted-foreground text-lg mb-8 max-w-2xl mx-auto">
                Let's discuss how the AT-X Framework can drive sustainable growth and operational excellence for your organization.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="mailto:info@fyreway.com"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md text-primary-foreground bg-primary hover:bg-primary/90 transition-colors"
                >
                  Get In Touch
                </a>
                <a
                  href="#"
                  className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-md border-2 border-primary text-primary hover:bg-primary/10 transition-colors"
                >
                  Learn More
                </a>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutUs;
