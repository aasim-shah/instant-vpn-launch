import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import { lazy, Suspense, useEffect, useState, createContext, useContext } from "react";

// Critical routes - loaded immediately (only homepage)
import Index from "./pages/Index";

// Lazy load ALL other routes including 404
const NotFound = lazy(() => import("./pages/NotFound"));
const Infrastructure = lazy(() => import("./pages/Infrastructure"));
const ShowDetails = lazy(() => import("./pages/show-details"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const VerifyEmail = lazy(() => import("./pages/verify-email"));
const Contact = lazy(() => import("./pages/Contact"));
const Platform = lazy(() => import("./pages/Platform"));
const ContentHub = lazy(() => import("./pages/ContentHub"));
const BlogListing = lazy(() => import("./pages/BlogListing"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const NewsletterListing = lazy(() => import("./pages/NewsletterListing"));
const NewsletterDetail = lazy(() => import("./pages/NewsletterDetail"));
const NewsletterSubscribe = lazy(() => import("./pages/NewsletterSubscribe"));
const CaseStudiesListing = lazy(() => import("./pages/CaseStudiesListing"));
const CaseStudyDetail = lazy(() => import("./pages/CaseStudyDetail"));
const CommunityHub = lazy(() => import("./pages/CommunityHub"));
const DiscordCommunity = lazy(() => import("./pages/DiscordCommunity"));
const TeamPage = lazy(() => import("./pages/TeamPage"));
const PartnersHub = lazy(() => import("./pages/PartnersHub"));
const AffiliateProgram = lazy(() => import("./pages/AffiliateProgram"));
const PartnerReviews = lazy(() => import("./pages/PartnerReviews"));
const CMSPage = lazy(() => import("./pages/CMSPage"));
const PagesListing = lazy(() => import("./pages/PagesListing"));

// SDK Documentation
const SDKDocsOverview = lazy(() => import("./pages/sdk-docs/SDKDocsOverview"));
const SDKDocsGettingStarted = lazy(() => import("./pages/sdk-docs/SDKDocsGettingStarted"));
const SDKDocsServerDiscovery = lazy(() => import("./pages/sdk-docs/SDKDocsServerDiscovery"));
const SDKDocsConnectionLifecycle = lazy(() => import("./pages/sdk-docs/SDKDocsConnectionLifecycle"));
const SDKDocsSmartConnect = lazy(() => import("./pages/sdk-docs/SDKDocsSmartConnect"));
const SDKDocsErrorHandling = lazy(() => import("./pages/sdk-docs/SDKDocsErrorHandling"));
const SDKDocsUIUtilities = lazy(() => import("./pages/sdk-docs/SDKDocsUIUtilities"));
const SDKDocsConfiguration = lazy(() => import("./pages/sdk-docs/SDKDocsConfiguration"));
const SDKDocsWhatsNew = lazy(() => import("./pages/sdk-docs/SDKDocsWhatsNew"));

// QueryClient created lazily — only initialized when first needed
let _qc: any = null;
function getQueryClient() {
  if (!_qc) {
    // Dynamic import ensures @tanstack/react-query is NOT in critical path
    // This is safe because all consumers are lazy-loaded (Footer, CMS pages)
    _qc = import("@tanstack/react-query").then(m => new m.QueryClient());
  }
  return _qc;
}

// Lazy-load QueryClientProvider to keep @tanstack/react-query off critical path
const LazyQueryProvider = lazy(() =>
  import("@tanstack/react-query").then(m => ({
    default: ({ children }: { children: React.ReactNode }) => {
      const [client, setClient] = useState<any>(null);
      useEffect(() => {
        getQueryClient().then(setClient);
      }, []);
      if (!client) return <>{children}</>;
      return <m.QueryClientProvider client={client}>{children}</m.QueryClientProvider>;
    }
  }))
);

// Lazy load UI chrome that's not needed for first paint
const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
);

// Deferred UI chrome - loads after first paint
function DeferredChrome() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    // Load toasters after first paint
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
  if (!mounted) return null;
  return (
    <Suspense fallback={null}>
      <Toaster />
      <Sonner />
    </Suspense>
  );
}

const App = () => (
  <Suspense fallback={null}>
    <LazyQueryProvider>
      <AuthProvider>
        <DeferredChrome />
        <BrowserRouter>
            <ScrollToTop />
            <Suspense fallback={<PageLoader />}>
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
              
              {/* Dynamic CMS Pages */}
              <Route path="/pages" element={<PagesListing />} />
              <Route path="/page/:slug" element={<CMSPage />} />
              
              {/* SDK Documentation */}
              <Route path="/sdk/docs" element={<SDKDocsOverview />} />
              <Route path="/sdk/docs/whats-new" element={<SDKDocsWhatsNew />} />
              <Route path="/sdk/docs/getting-started" element={<SDKDocsGettingStarted />} />
              <Route path="/sdk/docs/server-discovery" element={<SDKDocsServerDiscovery />} />
              <Route path="/sdk/docs/connection-lifecycle" element={<SDKDocsConnectionLifecycle />} />
              <Route path="/sdk/docs/smart-connect" element={<SDKDocsSmartConnect />} />
              <Route path="/sdk/docs/error-handling" element={<SDKDocsErrorHandling />} />
              <Route path="/sdk/docs/ui-utilities" element={<SDKDocsUIUtilities />} />
              <Route path="/sdk/docs/configuration" element={<SDKDocsConfiguration />} />
              
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
    </AuthProvider>
    </LazyQueryProvider>
  </Suspense>
);

export default App;