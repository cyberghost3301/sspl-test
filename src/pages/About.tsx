import SEO from "@/components/SEO";
import AboutHero from "@/components/about/AboutHero";
import MissionValues from "@/components/about/MissionValues";
import PartnersMarquee from "@/components/about/PartnersMarquee";
import CompanyTimeline from "@/components/about/CompanyTimeline";
import CTASection from "@/components/CTASection";

export default function About() {
  return (
    <>
      <SEO
        title="About Spirecrest | Partner-Led Execution. Proven at Scale."
        description="Spirecrest deploys industry leaders, not account managers, on every engagement. ISO-aligned, compliance-ready, and built for India's toughest enterprise contracts. Meet the team."
        path="/about"
      />
      <AboutHero />
      <MissionValues />
      <PartnersMarquee />
      <CompanyTimeline />
      <CTASection />
    </>
  );
}
