import {
  Camera, Eye, Cloud, Brain, ShieldCheck, Radio,
} from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import CTASection from "@/components/CTASection";

const benefits: BentoItem[] = [
  { icon: Camera, title: "24/7 Monitoring", description: "Round-the-clock surveillance with real-time alerts, remote access, and automated incident logging across all connected devices.", span: "wide" },
  { icon: Brain, title: "AI Threat Detection", description: "Machine learning powered analytics that identify unusual activity patterns, intrusion attempts, and potential threats before they escalate." },
  { icon: Cloud, title: "Cloud Backup & Storage", description: "Secure, redundant cloud storage for all footage with configurable retention policies and instant retrieval capabilities." },
  { icon: ShieldCheck, title: "Access Control Systems", description: "Biometric readers, smart card systems, and multi-factor authentication for physical premises and restricted zones." },
  { icon: Eye, title: "Remote Viewing", description: "Monitor your entire infrastructure from any device, anywhere in the world with encrypted live feeds and multi-site dashboards." },
  { icon: Radio, title: "Network Integration", description: "Seamless integration with existing IT infrastructure, PoE switches, NVRs, and enterprise network management systems." },
];

const techStack = [
  "Ubiquiti UniFi", "Hikvision", "Dahua", "Axis Communications",
  "IP Cameras", "PTZ Systems", "NVR/DVR", "PoE Switches",
  "Biometric Scanners", "RFID Access", "Cloud NVR", "AI Analytics",
  "Thermal Imaging", "LiDAR Sensors", "ANPR Systems",
];

export default function Surveillance() {
  return (
    <>
      <ServiceHero
        badge="SURVEILLANCE & SECURITY"
        title="Uncompromising Security"
        highlight="Infrastructure."
        description="Enterprise-grade surveillance systems, access control, and 24/7 monitoring solutions engineered for maximum protection and peace of mind."
        stats={[
          { value: "3000+", label: "Cameras Deployed" },
          { value: "99.9%", label: "Uptime SLA" },
          { value: "24/7", label: "Monitoring" },
        ]}
      />
      <BentoGrid
        label="KEY BENEFITS"
        heading="Why Spirecrest Surveillance"
        subheading="Battle-tested security infrastructure that scales from small offices to enterprise campuses."
        items={benefits}
      />
      <TechMarquee label="HARDWARE & TECH PARTNERS" items={techStack} />
      <CTASection />
    </>
  );
}
