import {
  ShieldCheck, Lock, Search, FileCheck, Server, AlertTriangle,
  Eye, Users, Wifi, Database, Globe, BarChart3,
  Bug, Fingerprint, Network, Monitor, Cpu, Key,
  RefreshCw, BookOpen, Layers, Shield, Radio, Gauge,
  HardDrive, Cloud, Mail, Smartphone, Zap, Settings,
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
  { icon: Bug, title: "Malware Analysis & Removal", description: "Advanced malware detection, reverse engineering, rootkit removal, and endpoint decontamination with forensic evidence preservation.", span: "wide" },
  { icon: Eye, title: "Dark Web Monitoring", description: "Continuous monitoring of dark web forums, paste sites, and breach databases to detect leaked credentials and sensitive data exposure." },
  { icon: Network, title: "Network Security Assessment", description: "Firewall configuration audits, network traffic analysis, wireless security testing, and infrastructure vulnerability mapping." },
  { icon: Key, title: "Identity & Access Management", description: "Design and implement IAM frameworks with single sign-on, privileged access management, and directory service integration." },
  { icon: Database, title: "Data Loss Prevention", description: "DLP policy design, sensitive data classification, exfiltration monitoring, and automated blocking of unauthorized data transfers.", span: "wide" },
  { icon: Fingerprint, title: "Digital Forensics", description: "Court-admissible digital evidence collection, chain-of-custody management, disk imaging, and expert witness testimony." },
  { icon: Cloud, title: "Disaster Recovery Planning", description: "Business continuity strategies, backup validation, RTO/RPO optimization, and automated failover testing for critical systems." },
  { icon: Globe, title: "Web Application Security", description: "OWASP Top 10 testing, code review, WAF configuration, API security testing, and secure development lifecycle consulting." },
  { icon: Mail, title: "Email Security", description: "Phishing protection, DMARC/DKIM/SPF configuration, email gateway hardening, and business email compromise prevention." },
  { icon: Smartphone, title: "Mobile Security", description: "Mobile app penetration testing, MDM policy design, BYOD security frameworks, and mobile threat defense deployment." },
  { icon: Monitor, title: "Endpoint Detection & Response", description: "Next-gen EDR deployment, behavioral analysis, automated threat containment, and centralized endpoint management." },
  { icon: Wifi, title: "Wireless Security", description: "Wi-Fi penetration testing, rogue access point detection, WPA3 migration, and wireless intrusion prevention systems." },
  { icon: Shield, title: "Threat Intelligence", description: "Curated threat feeds, indicator of compromise tracking, adversary profiling, and proactive defense strategy updates." },
  { icon: BarChart3, title: "Security Metrics & Reporting", description: "Executive security dashboards, risk scoring models, trend analysis, and board-ready compliance status reports." },
  { icon: Users, title: "Social Engineering Testing", description: "Phishing campaigns, vishing assessments, physical security testing, and tailgating awareness evaluations." },
  { icon: Cpu, title: "IoT Security", description: "IoT device security assessment, firmware analysis, communication protocol testing, and secure IoT architecture design." },
  { icon: RefreshCw, title: "Patch Management", description: "Automated vulnerability patching, change management workflows, rollback procedures, and compliance-driven update schedules." },
  { icon: Layers, title: "Security Architecture Review", description: "End-to-end security architecture assessment, defense-in-depth strategy design, and security technology stack optimization." },
  { icon: BookOpen, title: "Policy & Governance", description: "Information security policy creation, acceptable use policies, data governance frameworks, and regulatory compliance documentation." },
  { icon: Radio, title: "SIEM & Log Management", description: "Security event correlation, centralized log aggregation, custom detection rules, and automated alert workflows." },
  { icon: HardDrive, title: "Backup & Encryption", description: "Enterprise backup strategies, at-rest and in-transit encryption, key management, and secure data destruction protocols." },
  { icon: Gauge, title: "Vulnerability Management", description: "Continuous vulnerability scanning, risk prioritization, remediation tracking, and SLA-driven patching workflows." },
  { icon: Settings, title: "Security Operations Center", description: "SOC-as-a-Service with 24/7 monitoring, Tier 1-3 analyst coverage, playbook automation, and monthly threat briefings." },
  { icon: Zap, title: "Red Team Operations", description: "Full-scope adversary simulation, physical and digital attack scenarios, stealth persistence testing, and executive debrief reporting." },
  { icon: Lock, title: "Supply Chain Security", description: "Third-party vendor risk assessments, software bill of materials analysis, and secure procurement frameworks to protect your supply chain." },
];

const techStack = [
  "Nessus", "Burp Suite", "Metasploit", "Wireshark",
  "CrowdStrike", "Splunk", "SIEM", "Fortinet",
  "Palo Alto", "Cloudflare", "HashiCorp Vault", "Snort",
  "OWASP ZAP", "Qualys", "Carbon Black", "SentinelOne",
  "Tenable.io", "Rapid7", "Kali Linux", "Nmap",
  "Suricata", "Elastic SIEM", "IBM QRadar", "LogRhythm",
  "Darktrace", "Tanium", "Duo Security", "Okta",
  "Microsoft Defender", "Sophos", "Trend Micro", "Kaspersky",
  "Proofpoint", "Mimecast", "KnowBe4", "Cofense",
  "Varonis", "Cybereason", "Recorded Future", "ThreatConnect",
  "Veracode", "Checkmarx", "Snyk", "SonarQube",
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
