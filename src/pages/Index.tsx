import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import MVPServices from "@/components/MVPServices";
import PartnerModel from "@/components/PartnerModel";
import ServicesMarquee from "@/components/ServicesMarquee";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <>
      <SEO
        title="Spirecrest Solutions | Enterprise IT, Security & Software"
        description="We architect IT infrastructure, deploy surveillance systems, and build scalable software for India's most critical enterprises. Engage our Partner-Led model today."
        path="/"
      />
      <HeroSection />
      <MVPServices />
      <ServicesMarquee />
      <PartnerModel />
      <CTASection />
    </>
  );
};

export default Index;
