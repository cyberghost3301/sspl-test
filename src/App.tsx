import { useEffect, Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalLoader from "./components/GlobalLoader";
import { LazyMotion, domAnimation } from "framer-motion";
import { CommandMenu } from "@/components/CommandMenu";
import ScrollToTop from "@/components/ScrollToTop";

const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Contact = lazy(() => import("./pages/Contact"));
const Surveillance = lazy(() => import("./pages/services/Surveillance"));
const Software = lazy(() => import("./pages/services/Software"));
const Consulting = lazy(() => import("./pages/services/Consulting"));
const LifecycleConsulting = lazy(() => import("./pages/services/LifecycleConsulting"));
const Automation = lazy(() => import("./pages/services/Automation"));
const Networking = lazy(() => import("./pages/services/Networking"));
const Solar = lazy(() => import("./pages/services/Solar"));
const AVStudio = lazy(() => import("./pages/services/AVStudio"));
const Computers = lazy(() => import("./pages/services/Computers"));
const Interior = lazy(() => import("./pages/services/Interior"));
const Testimonials = lazy(() => import("./pages/Testimonials"));
const Team = lazy(() => import("./pages/Team"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Governance pages
const FAQ = lazy(() => import("./pages/governance/FAQ"));
const PrivacyPolicy = lazy(() => import("./pages/governance/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./pages/governance/TermsOfService"));
const CookiePolicy = lazy(() => import("./pages/governance/CookiePolicy"));
const Disclaimer = lazy(() => import("./pages/governance/Disclaimer"));

// Vanguard OS pages
const Login = lazy(() => import("./pages/os/Login"));
const Overview = lazy(() => import("./pages/os/Overview"));
const KanbanBoard = lazy(() => import("./pages/os/KanbanBoard"));
const Intel = lazy(() => import("./pages/os/Intel"));
const Vault = lazy(() => import("./pages/os/Vault"));
const Directory = lazy(() => import("./pages/os/Directory"));
const SettingsHub = lazy(() => import("./pages/os/Settings"));
const WebContent = lazy(() => import("./pages/os/WebContent"));

// Public Intelligence
const Insights = lazy(() => import("./pages/Insights"));
const InsightDetail = lazy(() => import("./pages/InsightDetail"));

// Layouts
const Layout = lazy(() => import("./components/Layout"));
const VanguardLayout = lazy(() => import("./components/os/VanguardLayout"));
const AuthGuard = lazy(() => import("./components/os/AuthGuard"));

import { Navigate } from "react-router-dom";

const queryClient = new QueryClient();

const App = () => {
  // This physically forces the "dark" class onto the HTML document 
  // the moment React starts up, overriding any default light mode.
  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <LazyMotion features={domAnimation}>
          <BrowserRouter>
            <ScrollToTop />
            <CommandMenu />
            <Suspense fallback={<GlobalLoader />}>
              <Routes>
                {/* ── Vanguard OS Routes (no public Layout) ── */}
                <Route path="/vanguard/auth" element={<Login />} />

                {/* AuthGuard is the parent guard; VanguardLayout's <Outlet /> renders child routes */}
                <Route
                  path="/vanguard"
                  element={
                    <AuthGuard>
                      <VanguardLayout />
                    </AuthGuard>
                  }
                >
                  <Route index element={<Navigate to="/vanguard/overview" replace />} />
                  <Route path="overview" element={<Overview />} />
                  <Route path="boards" element={<KanbanBoard />} />
                  <Route path="intel" element={<Intel />} />
                  <Route path="vault" element={<Vault />} />
                  <Route path="directory" element={<Directory />} />
                  <Route path="settings" element={<SettingsHub />} />
                  <Route path="web-content" element={<WebContent />} />
                  <Route path="*" element={<Navigate to="/vanguard/overview" replace />} />
                </Route>

                {/* ── Public Website Routes ── */}
                <Route path="/" element={<Layout />}>
                  <Route index element={<Index />} />
                  <Route path="about" element={<About />} />
                  <Route path="portfolio" element={<Portfolio />} />
                  <Route path="testimonials" element={<Testimonials />} />
                  <Route path="collective" element={<Team />} />
                  <Route path="contact" element={<Contact />} />
                  
                  {/* Public Intel Bridge */}
                  <Route path="insights" element={<Insights />} />
                  <Route path="insights/:id" element={<InsightDetail />} />

                  <Route path="services/surveillance" element={<Surveillance />} />
                  <Route path="services/software" element={<Software />} />
                  <Route path="services/consulting" element={<Consulting />} />
                  <Route path="services/lifecycle-consulting" element={<LifecycleConsulting />} />
                  <Route path="services/automation" element={<Automation />} />
                  <Route path="services/networking" element={<Networking />} />
                  <Route path="services/solar" element={<Solar />} />
                  <Route path="services/av-studio" element={<AVStudio />} />
                  <Route path="services/computers" element={<Computers />} />
                  <Route path="services/interior" element={<Interior />} />

                  <Route path="faq" element={<FAQ />} />
                  <Route path="privacy-policy" element={<PrivacyPolicy />} />
                  <Route path="terms-of-service" element={<TermsOfService />} />
                  <Route path="cookie-policy" element={<CookiePolicy />} />
                  <Route path="disclaimer" element={<Disclaimer />} />

                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </Suspense>
          </BrowserRouter>
        </LazyMotion>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;