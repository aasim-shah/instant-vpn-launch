import { useEffect, useState, lazy, Suspense } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "@/components/Header";
import { HeroSection } from "@/components/HeroSection";
import { LazySection } from "@/components/LazySection";

// Near-fold sections — code-split (contain 21 lucide icons + Button)
const TargetAudienceSection = lazy(() => import("@/components/TargetAudienceSection").then(m => ({ default: m.TargetAudienceSection })));
const TimeToValueSection = lazy(() => import("@/components/TimeToValueSection").then(m => ({ default: m.TimeToValueSection })));
const OutcomesSection = lazy(() => import("@/components/OutcomesSection").then(m => ({ default: m.OutcomesSection })));

// Footer — code-split (pulls @tanstack/react-query + CMS services)
const Footer = lazy(() => import("@/components/Footer").then(m => ({ default: m.Footer })));

// Below-fold — code-split into separate chunks, loaded when near viewport
const CommercialAbstractionSection = lazy(() => import("@/components/CommercialAbstractionSection").then(m => ({ default: m.CommercialAbstractionSection })));
const PlatformOverviewSection = lazy(() => import("@/components/PlatformOverviewSection").then(m => ({ default: m.PlatformOverviewSection })));
const HowItWorksSection = lazy(() => import("@/components/HowItWorksSection").then(m => ({ default: m.HowItWorksSection })));
const CTASection = lazy(() => import("@/components/CTASection").then(m => ({ default: m.CTASection })));
const FeaturesSection = lazy(() => import("@/components/FeaturesSection").then(m => ({ default: m.FeaturesSection })));
const ScalePerformanceSection = lazy(() => import("@/components/ScalePerformanceSection").then(m => ({ default: m.ScalePerformanceSection })));
const UseCasesSection = lazy(() => import("@/components/UseCasesSection").then(m => ({ default: m.UseCasesSection })));
const ExperienceSection = lazy(() => import("@/components/ExperienceSection").then(m => ({ default: m.ExperienceSection })));
const PricingSection = lazy(() => import("@/components/PricingSection").then(m => ({ default: m.PricingSection })));
const FAQSection = lazy(() => import("@/components/FAQSection").then(m => ({ default: m.FAQSection })));
const FinalCTASection = lazy(() => import("@/components/FinalCTASection").then(m => ({ default: m.FinalCTASection })));
const GlobalServerMap = lazy(() => import("@/components/MapSVG"));
const ChatbotWidget = lazy(() => import('fyrebot-widget').then(m => ({ default: m.ChatbotWidget })));
const AuthModal = lazy(() => import("@/components/AuthModal").then(m => ({ default: m.AuthModal })));


const Index = () => {
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    // Check if we were redirected from a protected route
    if (location.state?.showLoginModal) {
      setIsAuthModalOpen(true);
      import("sonner").then(m => m.toast.info("Please sign in to access this page"));
      // Clear the state to avoid showing modal on refresh
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Above the fold — renders immediately */}
        <HeroSection />
        
        {/* Near-fold sections — code-split, preloaded aggressively */}
        <LazySection rootMargin="600px" minHeight="300px">
          <Suspense fallback={<div className="h-72" />}>
            <TargetAudienceSection />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="600px" minHeight="400px">
          <Suspense fallback={<div className="h-96" />}>
            <TimeToValueSection />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="600px" minHeight="300px">
          <Suspense fallback={<div className="h-72" />}>
            <OutcomesSection />
          </Suspense>
        </LazySection>
        
        {/* Below the fold — code-split chunks, deferred until near viewport */}
        <LazySection rootMargin="400px" minHeight="400px">
          <Suspense fallback={<div className="h-96" />}>
            <CommercialAbstractionSection />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="400px" minHeight="400px">
          <Suspense fallback={<div className="h-96" />}>
            <PlatformOverviewSection />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="400px" minHeight="400px">
          <Suspense fallback={<div className="h-96" />}>
            <HowItWorksSection />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="300px" minHeight="200px">
          <Suspense fallback={<div className="h-48" />}>
            <CTASection />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="400px" minHeight="400px">
          <Suspense fallback={<div className="h-96" />}>
            <FeaturesSection />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="400px" minHeight="400px">
          <Suspense fallback={<div className="h-96" />}>
            <ScalePerformanceSection />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="400px" minHeight="400px">
          <Suspense fallback={<div className="h-96" />}>
            <GlobalServerMap />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="400px" minHeight="400px">
          <Suspense fallback={<div className="h-96" />}>
            <UseCasesSection />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="400px" minHeight="400px">
          <Suspense fallback={<div className="h-96" />}>
            <ExperienceSection />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="400px" minHeight="500px">
          <Suspense fallback={<div className="h-96" />}>
            <PricingSection />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="400px" minHeight="400px">
          <Suspense fallback={<div className="h-96" />}>
            <FAQSection />
          </Suspense>
        </LazySection>
        <LazySection rootMargin="300px" minHeight="300px">
          <Suspense fallback={<div className="h-72" />}>
            <FinalCTASection />
          </Suspense>
        </LazySection>
      </main>
      <Suspense fallback={null}>
        <ChatbotWidget 
          apiKey={'sk_FBCYeaNQVFsRwIIyGHiAHuK8TuClsvES'}
          apiUrl='https://api.fyreway.com/api'
          title='Ask About FyreWay'
          subtitle="I'm here to help!" 
          enableContactSupport={true}  
          primaryColor="#10b5cb"
        />
      </Suspense>
      <LazySection rootMargin="400px" minHeight="200px">
        <Suspense fallback={<div className="h-48" />}>
          <Footer />
        </Suspense>
      </LazySection>
      
      {/* Auth Modal for protected route redirects - lazy loaded */}
      {isAuthModalOpen && (
        <Suspense fallback={null}>
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onSuccess={() => {
              const from = location.state?.from?.pathname;
              if (from && from !== '/') {
                window.location.href = from;
              }
            }}
            defaultTab="login"
          />
        </Suspense>
      )}
    </div>
  );
};

export default Index;
