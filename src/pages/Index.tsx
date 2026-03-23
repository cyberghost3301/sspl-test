import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import TrustMetrics from "@/components/TrustMetrics";
import DifferentiationBlock from "@/components/DifferentiationBlock";
import MVPServices from "@/components/MVPServices";
import UseCaseEntryPoints from "@/components/UseCaseEntryPoints";
import PartnerModel from "@/components/PartnerModel";
import BentoGrid from "@/components/BentoGrid";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <main className="relative overflow-x-hidden w-full scroll-smooth">
      <SEO
        title="Spirecrest Solutions | IT Infrastructure, Security & Smart Technology"
        description="Infrastructure that doesn't fail when it matters. From security systems to enterprise networks and smart automation — Spirecrest designs and deploys solutions tailored to your exact needs in Lucknow and U.P."
        path="/"
      />

      {/* Section 1: Hero */}
      <HeroSection />

      {/* Section 2: Trust Snap — credibility strip */}
      <TrustMetrics />

      {/* Section 3: Differentiation — break skepticism */}
      <DifferentiationBlock />

      {/* Section 4: Core Service Pillars */}
      <MVPServices />

      {/* Section 5: Use-Case Entry Points */}
      <UseCaseEntryPoints />

      {/* Section 6: Social Proof / Authenticity */}
      <PartnerModel />

      {/* Section 6b: Technology showcase */}
      <BentoGrid />

      {/* Section 7: Final CTA Block */}
      <CTASection />
    </main>
  );
};

export default Index;
