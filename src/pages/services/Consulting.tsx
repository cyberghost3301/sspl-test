import {
  ShieldCheck, Lock, Search, FileCheck, Server, AlertTriangle,
} from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import ScopingCalculator from "@/components/services/ScopingCalculator";
import CTASection from "@/components/CTASection";

const benefits: BentoItem[] = [
  { icon: Search, title: "Security Audits & Pen Testing", description: "Comprehensive vulnerability assessments, penetration testing, and threat modeling to identify and eliminate security gaps.", span: "wide" },
  { icon: Lock, title: "Zero-Trust Architecture", description: "Implement least-privilege access models, micro-segmentation, and continuous verification across your entire infrastructure." },
  { icon: FileCheck, title: "Compliance & Certification", description: "Navigate ISO 27001, SOC 2, GDPR, and HIPAA compliance with expert guidance from assessment to certification." },
  { icon: AlertTriangle, title: "Incident Response", description: "24/7 incident detection, rapid response protocols, forensic analysis, and post-incident hardening strategies." },
  { icon: Server, title: "Cloud Security", description: "Secure your cloud workloads with IAM policies, encryption, network segmentation, and continuous monitoring." },
  { icon: ShieldCheck, title: "Staff Training", description: "Customized cybersecurity awareness programs, phishing simulations, and security-first culture workshops for your team." },
];

const techStack = [
  "Nessus", "Burp Suite", "Metasploit", "Wireshark",
  "CrowdStrike", "Splunk", "SIEM", "Fortinet",
  "Palo Alto", "Cloudflare", "HashiCorp Vault", "Snort",
  "OWASP ZAP", "Qualys", "Carbon Black", "SentinelOne",
];

export default function Consulting() {
  return (
    <>
      <ServiceHero
        badge="IT CONSULTING & CYBERSECURITY"
        title="Fortified IT &"
        highlight="Cyber Strategy."
        description="Comprehensive cybersecurity audits, IT consulting, and infrastructure optimization to keep your operations bullet-proof and future-ready."
        stats={[
          { value: "500+", label: "Audits Completed" },
          { value: "0", label: "Breaches Post-Audit" },
          { value: "100%", label: "Compliance Rate" },
        ]}
      />
      <BentoGrid
        label="CAPABILITIES"
        heading="Defense in Depth"
        subheading="Multi-layered security strategies that protect your business from every angle."
        items={benefits}
      />
      <TechMarquee label="SECURITY TOOLS & PLATFORMS" items={techStack} />
      <ScopingCalculator variant="consulting" />
      <CTASection />
    </>
  );
}
