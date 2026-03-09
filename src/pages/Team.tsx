import ServiceHero from "@/components/services/ServiceHero";
import TeamCulture from "@/components/about/TeamCulture";
import TeamDirectory from "@/components/about/TeamDirectory";
import CTASection from "@/components/CTASection";

export default function Team() {
  return (
    <>
      <ServiceHero
        badge="The Collective"
        title="Partner-Led."
        highlight="Expert-Driven."
        description="Every project is steered by a specialised industry leader, not a generic project manager. Meet the minds behind Spirecrest."
        stats={[
          { value: "19+", label: "Expert Partners" },
          { value: "450+", label: "Specialists Network" },
          { value: "4", label: "Core Verticals" },
        ]}
      />
      <TeamCulture />
      <TeamDirectory />
      <CTASection />
    </>
  );
}
