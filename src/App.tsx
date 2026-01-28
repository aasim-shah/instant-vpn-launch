import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Infrastructure from "./pages/Infrastructure";
import ShowDetails from "./pages/show-details";
import AboutUs from "./pages/AboutUs";
import VerifyEmail from "./pages/verify-email";
import Contact from "./pages/Contact";
import Platform from "./pages/Platform";
import ContentHub from "./pages/ContentHub";
import BlogListing from "./pages/BlogListing";
import BlogDetail from "./pages/BlogDetail";
import NewsletterListing from "./pages/NewsletterListing";
import NewsletterDetail from "./pages/NewsletterDetail";
import NewsletterSubscribe from "./pages/NewsletterSubscribe";
import CaseStudiesListing from "./pages/CaseStudiesListing";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import CommunityHub from "./pages/CommunityHub";
import DiscordCommunity from "./pages/DiscordCommunity";
import TeamPage from "./pages/TeamPage";
import PartnersHub from "./pages/PartnersHub";
import AffiliateProgram from "./pages/AffiliateProgram";
import PartnerReviews from "./pages/PartnerReviews";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route 
              path="/infrastructure" 
              element={
                <ProtectedRoute>
                  <Infrastructure />
                </ProtectedRoute>
              } 
            />
            <Route path="/detailed-logs" element={<ShowDetails/>} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/verify-email" element={<VerifyEmail />} />
            
            {/* Platform */}
            <Route path="/platform" element={<Platform />} />
            
            {/* Content & Knowledge */}
            <Route path="/content" element={<ContentHub />} />
            <Route path="/blog" element={<BlogListing />} />
            <Route path="/blog/:slug" element={<BlogDetail />} />
            <Route path="/newsletter" element={<NewsletterListing />} />
            <Route path="/newsletter/:slug" element={<NewsletterDetail />} />
            <Route path="/newsletter/subscribe" element={<NewsletterSubscribe />} />
            <Route path="/case-studies" element={<CaseStudiesListing />} />
            <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
            
            {/* Community */}
            <Route path="/community" element={<CommunityHub />} />
            <Route path="/community/discord" element={<DiscordCommunity />} />
            <Route path="/community/team" element={<TeamPage />} />
            
            {/* Partners */}
            <Route path="/partners" element={<PartnersHub />} />
            <Route path="/partners/affiliate" element={<AffiliateProgram />} />
            <Route path="/partners/reviews" element={<PartnerReviews />} />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
