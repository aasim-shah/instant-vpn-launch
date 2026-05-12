import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { ScrollToTop } from "@/components/ScrollToTop";
import { lazy, Suspense, useEffect, useState, createContext, useContext } from "react";
import type { ReactElement } from "react";
import { SEO, organizationSchema, productSchema } from "@/components/SEO";

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

// Lazy-load QueryClientProvider to keep @tanstack/react-query off critical path
// QueryClient is created synchronously once the module loads — no race condition
const LazyQueryProvider = lazy(() =>
  import("@tanstack/react-query").then(m => {
    const client = new m.QueryClient();
    return {
      default: ({ children }: { children: React.ReactNode }) => (
        <m.QueryClientProvider client={client}>{children}</m.QueryClientProvider>
      )
    };
  })
);

// Lazy load UI chrome that's not needed for first paint
const Toaster = lazy(() => import("@/components/ui/toaster").then(m => ({ default: m.Toaster })));
const Sonner = lazy(() => import("@/components/ui/sonner").then(m => ({ default: m.Toaster })));

type SEOConfig = Parameters<typeof SEO>[0];

const withSEO = (seo: SEOConfig, element: ReactElement) => (
  <>
    <SEO {...seo} />
    {element}
  </>
);

const noIndex = 'noindex, nofollow';

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
              <Route
                path="/"
                element={withSEO({
                  title: "Launch VPN Infrastructure in Minutes",
                  description: "Deploy production-ready VPN servers instantly with FyreWay. Pre-configured VPN infrastructure, global locations, SDKs, and monitoring for SaaS and app teams.",
                  canonical: "/",
                  keywords: ["VPN infrastructure", "VPN server platform", "VPN backend", "WireGuard hosting", "OpenVPN hosting", "VPN SDK"],
                  jsonLd: {
                    '@graph': [organizationSchema, productSchema],
                  },
                }, <Index />)}
              />
              <Route 
                path="/infrastructure" 
                element={withSEO({
                  title: "Infrastructure Dashboard",
                  description: "Protected FyreWay infrastructure dashboard.",
                  canonical: "/infrastructure",
                  robots: noIndex,
                }, (
                  <ProtectedRoute>
                    <Infrastructure />
                  </ProtectedRoute>
                ))} 
              />
              <Route path="/detailed-logs" element={withSEO({
                title: "Detailed Logs",
                description: "Internal FyreWay infrastructure logs.",
                canonical: "/detailed-logs",
                robots: noIndex,
              }, <ShowDetails/>)} />
              <Route path="/about" element={withSEO({
                title: "About FyreWay",
                description: "Learn about FyreWay and the team helping developers launch scalable VPN infrastructure, mobile experiences, and secure connectivity products.",
                canonical: "/about",
                keywords: ["FyreWay about", "VPN infrastructure company", "VPN platform team"],
                jsonLd: organizationSchema,
              }, <AboutUs />)} />
              <Route path="/contact" element={withSEO({
                title: "Contact FyreWay Sales",
                description: "Contact the FyreWay team to discuss VPN infrastructure, SDK integration, pricing, or a production-ready deployment for your app or SaaS product.",
                canonical: "/contact",
                keywords: ["contact FyreWay", "VPN infrastructure sales", "VPN platform consultation"],
              }, <Contact />)} />
              <Route path="/verify-email" element={withSEO({
                title: "Verify Email",
                description: "Verify your FyreWay account email address.",
                canonical: "/verify-email",
                robots: noIndex,
              }, <VerifyEmail />)} />
              
              {/* Platform */}
              <Route path="/platform" element={withSEO({
                title: "VPN Backend Platform",
                description: "Explore FyreWay's developer-first VPN backend platform with global servers, WireGuard and OpenVPN support, analytics, and automated scaling.",
                canonical: "/platform",
                keywords: ["VPN backend platform", "VPN API", "global VPN infrastructure", "VPN analytics", "VPN control plane"],
                jsonLd: productSchema,
              }, <Platform />)} />
              
              {/* Content & Knowledge */}
              <Route path="/content" element={withSEO({
                title: "VPN Infrastructure Content Hub",
                description: "Browse FyreWay blogs, newsletters, case studies, and technical resources for building and scaling VPN products.",
                canonical: "/content",
                keywords: ["VPN resources", "VPN infrastructure blog", "VPN case studies", "VPN product updates"],
              }, <ContentHub />)} />
              <Route path="/blog" element={withSEO({
                title: "VPN Infrastructure Blog",
                description: "Technical articles, best practices, and engineering insights about VPN infrastructure, security, performance, and app integration.",
                canonical: "/blog",
                keywords: ["VPN blog", "VPN infrastructure articles", "WireGuard", "OpenVPN", "VPN security"],
              }, <BlogListing />)} />
              <Route path="/blog/:slug" element={<BlogDetail />} />
              <Route path="/newsletter" element={withSEO({
                title: "FyreWay Newsletter",
                description: "Read FyreWay product updates, release notes, security news, and infrastructure insights for VPN builders.",
                canonical: "/newsletter",
                keywords: ["FyreWay newsletter", "VPN product updates", "VPN release notes"],
              }, <NewsletterListing />)} />
              <Route path="/newsletter/:slug" element={<NewsletterDetail />} />
              <Route path="/newsletter/subscribe" element={withSEO({
                title: "Subscribe to the FyreWay Newsletter",
                description: "Subscribe to FyreWay updates for VPN infrastructure releases, product news, and technical guidance.",
                canonical: "/newsletter/subscribe",
                keywords: ["subscribe FyreWay newsletter", "VPN updates", "VPN infrastructure news"],
              }, <NewsletterSubscribe />)} />
              <Route path="/case-studies" element={withSEO({
                title: "VPN Infrastructure Case Studies",
                description: "See how startups, SaaS companies, IoT teams, and gaming platforms use FyreWay to launch and scale VPN infrastructure.",
                canonical: "/case-studies",
                keywords: ["VPN case studies", "VPN customer stories", "VPN app launch", "VPN SaaS"],
              }, <CaseStudiesListing />)} />
              <Route path="/case-studies/:slug" element={<CaseStudyDetail />} />
              
              {/* Community */}
              <Route path="/community" element={withSEO({
                title: "FyreWay Community",
                description: "Join the FyreWay community for VPN infrastructure discussions, developer support, and product updates.",
                canonical: "/community",
                keywords: ["FyreWay community", "VPN developer community", "VPN infrastructure support"],
              }, <CommunityHub />)} />
              <Route path="/community/discord" element={withSEO({
                title: "FyreWay Discord Community",
                description: "Connect with FyreWay developers and VPN builders in the community Discord.",
                canonical: "/community/discord",
                keywords: ["FyreWay Discord", "VPN Discord", "VPN developer community"],
              }, <DiscordCommunity />)} />
              <Route path="/community/team" element={withSEO({
                title: "FyreWay Team",
                description: "Meet the team behind FyreWay's VPN infrastructure platform and developer tools.",
                canonical: "/community/team",
                keywords: ["FyreWay team", "VPN infrastructure team", "VPN platform developers"],
              }, <TeamPage />)} />
              
              {/* Partners */}
              <Route path="/partners" element={withSEO({
                title: "FyreWay Partners",
                description: "Explore FyreWay partner programs, affiliate opportunities, and trusted customer reviews.",
                canonical: "/partners",
                keywords: ["FyreWay partners", "VPN affiliate program", "VPN platform partners"],
              }, <PartnersHub />)} />
              <Route path="/partners/affiliate" element={withSEO({
                title: "FyreWay Affiliate Program",
                description: "Join the FyreWay affiliate program and earn recurring commissions by recommending VPN infrastructure to developers and SaaS teams.",
                canonical: "/partners/affiliate",
                keywords: ["VPN affiliate program", "FyreWay affiliate", "VPN partner program"],
              }, <AffiliateProgram />)} />
              <Route path="/partners/reviews" element={withSEO({
                title: "FyreWay Partner Reviews",
                description: "Read partner and customer reviews about building VPN products with FyreWay infrastructure.",
                canonical: "/partners/reviews",
                keywords: ["FyreWay reviews", "VPN infrastructure reviews", "VPN partner reviews"],
              }, <PartnerReviews />)} />
              
              {/* Dynamic CMS Pages */}
              <Route path="/pages" element={withSEO({
                title: "FyreWay Pages",
                description: "Browse public FyreWay resources, guides, and platform pages.",
                canonical: "/pages",
                keywords: ["FyreWay resources", "VPN guides", "VPN platform pages"],
              }, <PagesListing />)} />
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
              
              <Route path="*" element={withSEO({
                title: "Page Not Found",
                description: "The requested FyreWay page could not be found.",
                canonical: "/404",
                robots: noIndex,
              }, <NotFound />)} />
            </Routes>
          </Suspense>
        </BrowserRouter>
    </AuthProvider>
    </LazyQueryProvider>
  </Suspense>
);

export default App;
