import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import ImpactMetrics from "@/components/ImpactMetrics";
import TrustMetrics from "@/components/TrustMetrics";
import MVPServices from "@/components/MVPServices";
import PartnerModel from "@/components/PartnerModel";
import ServicesMarquee from "@/components/ServicesMarquee";
import BentoGrid from "@/components/BentoGrid";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <main className="relative overflow-x-hidden w-full">
      <SEO
        title="Spirecrest Solutions | Enterprise IT, Security & Software"
        description="We architect IT infrastructure, deploy surveillance systems, and build scalable software for India's most critical enterprises. Engage our Partner-Led model today."
        path="/"
      />
      <HeroSection />
      <TrustMetrics />
      <MVPServices />
      <ImpactMetrics />
      <BentoGrid />
      <PartnerModel />
      <CTASection />
    </main>
  );
};

export default Index;
