import AboutHero from "@/components/about/AboutHero";
import MissionValues from "@/components/about/MissionValues";
import PartnersMarquee from "@/components/about/PartnersMarquee";
import CompanyTimeline from "@/components/about/CompanyTimeline";
import CTASection from "@/components/CTASection";

export default function About() {
  return (
    <>
      <AboutHero />
      <MissionValues />
      <PartnersMarquee />
      <CompanyTimeline />
      <CTASection />
    </>
  );
}
