import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import About from "./pages/About";
import Portfolio from "./pages/Portfolio";
import Contact from "./pages/Contact";
import Surveillance from "./pages/services/Surveillance";
import Software from "./pages/services/Software";
import Consulting from "./pages/services/Consulting";
import LifecycleConsulting from "./pages/services/LifecycleConsulting";
import Automation from "./pages/services/Automation";
import Networking from "./pages/services/Networking";
import Solar from "./pages/services/Solar";
import AVStudio from "./pages/services/AVStudio";
import Computers from "./pages/services/Computers";
import Interior from "./pages/services/Interior";
import Testimonials from "./pages/Testimonials";
import Team from "./pages/Team";
import NotFound from "./pages/NotFound";

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
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/collective" element={<Team />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/services/surveillance" element={<Surveillance />} />
              <Route path="/services/software" element={<Software />} />
              <Route path="/services/consulting" element={<Consulting />} />
              <Route path="/services/lifecycle-consulting" element={<LifecycleConsulting />} />
              <Route path="/services/automation" element={<Automation />} />
              <Route path="/services/networking" element={<Networking />} />
              <Route path="/services/solar" element={<Solar />} />
              <Route path="/services/av-studio" element={<AVStudio />} />
              <Route path="/services/computers" element={<Computers />} />
              <Route path="/services/interior" element={<Interior />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;