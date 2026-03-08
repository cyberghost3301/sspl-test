import {
  Code, Smartphone, Globe, Cpu, Workflow, Database,
} from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import ScopingCalculator from "@/components/services/ScopingCalculator";
import CTASection from "@/components/CTASection";

const benefits: BentoItem[] = [
  { icon: Code, title: "Custom Web Applications", description: "Responsive, high-performance web apps built with modern frameworks, optimized for speed, SEO, and seamless user experience.", span: "wide" },
  { icon: Smartphone, title: "Mobile Development", description: "Cross-platform and native mobile apps for iOS and Android, from MVPs to full-scale consumer products." },
  { icon: Globe, title: "SaaS Platforms", description: "Multi-tenant SaaS architecture with subscription management, analytics dashboards, and scalable cloud deployment." },
  { icon: Cpu, title: "AI & ML Integration", description: "Intelligent features powered by machine learning: recommendation engines, NLP chatbots, predictive analytics, and computer vision." },
  { icon: Workflow, title: "API Development", description: "RESTful and GraphQL APIs designed for performance, security, and seamless third-party integrations." },
  { icon: Database, title: "Cloud Infrastructure", description: "Scalable cloud architecture on AWS, GCP, or Azure with CI/CD pipelines, monitoring, and auto-scaling." },
];

const techStack = [
  "React", "Next.js", "TypeScript", "Node.js", "Python",
  "PostgreSQL", "MongoDB", "Redis", "Docker", "Kubernetes",
  "AWS", "Google Cloud", "Vercel", "TailwindCSS", "GraphQL",
  "TensorFlow", "OpenAI", "Stripe", "Firebase", "Supabase",
];

export default function Software() {
  return (
    <>
      <ServiceHero
        badge="SOFTWARE DEVELOPMENT"
        title="Digital Products That"
        highlight="Scale."
        description="Custom web applications, mobile platforms, and software systems built with modern stacks, designed to grow with your ambitions."
        stats={[
          { value: "200+", label: "Apps Shipped" },
          { value: "15+", label: "Tech Stacks" },
          { value: "99%", label: "Client Retention" },
        ]}
      />
      <BentoGrid
        label="CAPABILITIES"
        heading="Full-Spectrum Development"
        subheading="From rapid MVPs to enterprise platforms, we build software that moves as fast as your business."
        items={benefits}
      />
      <TechMarquee label="OUR TECH STACK" items={techStack} />
      <ScopingCalculator variant="software" />
      <CTASection />
    </>
  );
}
