import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { PlatformOverviewSection } from "@/components/PlatformOverviewSection";
import { CommercialAbstractionSection } from "@/components/CommercialAbstractionSection";
import { TimeToValueSection } from "@/components/TimeToValueSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ScalePerformanceSection } from "@/components/ScalePerformanceSection";
import { TargetAudienceSection } from "@/components/TargetAudienceSection";
import { OutcomesSection } from "@/components/OutcomesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { UseCasesSection } from "@/components/UseCasesSection";
import { PricingSection } from "@/components/PricingSection";
import { FAQSection } from "@/components/FAQSection";
import { CTASection } from "@/components/CTASection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { Footer } from "@/components/Footer";
import GlobalServerMap from "@/components/MapSVG";
import { ChatbotWidget } from 'fyrebot-widget';
import { AuthModal } from "@/components/AuthModal";
import { toast } from "sonner";


const Index = () => {
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Check if we were redirected from a protected route
    if (location.state?.showLoginModal) {
      setIsAuthModalOpen(true);
      toast.info("Please sign in to access this page");
      // Clear the state to avoid showing modal on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <TargetAudienceSection /> 
        <TimeToValueSection />
        <OutcomesSection />
        <CommercialAbstractionSection />
        <PlatformOverviewSection />
        <HowItWorksSection />
        <CTASection />
        <FeaturesSection />
        <ScalePerformanceSection />
        <GlobalServerMap />
        <UseCasesSection />
        <ExperienceSection />
        <PricingSection />

        <FAQSection />
        <FinalCTASection />
      </main>
      <ChatbotWidget 
        apiKey={'sk_FBCYeaNQVFsRwIIyGHiAHuK8TuClsvES'}
        apiUrl='https://api.fyreway.com/api'
        title='Ask About FyreWay'
        subtitle="I'm here to help!" 
        enableContactSupport={true}  
        primaryColor="#10b5cb"
        // suggestedQuestions={
        //   [
        //     { id: "1", question: "What services do you offer?" },
        //     { id: "2", question: "How quickly can I deploy VPN servers?" },
        //     { id: "3", question: "How can I contact support?" },
        //   ]
        // }
        
      />
      <Footer />
      
      {/* Auth Modal for protected route redirects */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={() => {
          // Redirect to the originally requested page if available
          const from = location.state?.from?.pathname;
          if (from && from !== '/') {
            window.location.href = from;
          }
        }}
        defaultTab="login"
      />
    </div>
  );
};

export default Index;
