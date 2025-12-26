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
import { Footer } from "@/components/Footer";
import GlobalServerMap from "@/components/MapSVG";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <PlatformOverviewSection />
        <CommercialAbstractionSection />
        <TimeToValueSection />
        <ExperienceSection />
        <ScalePerformanceSection />
        <TargetAudienceSection />
        <OutcomesSection />
        <GlobalServerMap />
        <HowItWorksSection />
        <FeaturesSection />
        <UseCasesSection />
        <PricingSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
