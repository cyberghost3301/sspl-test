import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  ShieldCheck, Lock, Search, FileCheck, Server, AlertTriangle,
  Eye, Users, Wifi, Database, Globe, BarChart3,
  Bug, Fingerprint, Network, Monitor, Cpu, Key,
  RefreshCw, BookOpen, Layers, Shield, Radio, Gauge,
  HardDrive, Cloud, Mail, Smartphone, Zap, Settings,
  LucideIcon, Scale, FileWarning, ScanSearch, UserCheck,
} from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import ScopingCalculator from "@/components/services/ScopingCalculator";
import CTASection from "@/components/CTASection";

const benefits: BentoItem[] = [
  { icon: Search, title: "Penetration Testing", description: "'Ethical hacking' where experts test your systems for weaknesses before real attackers find them. Full OWASP and infrastructure coverage.", span: "wide" },
  { icon: Lock, title: "Zero-Trust Architecture", description: "Implement least-privilege access models, micro-segmentation, and continuous verification across your entire infrastructure." },
  { icon: FileCheck, title: "Compliance & Certification", description: "Navigate ISO 27001, SOC 2, GDPR, DPDP Act, and HIPAA compliance with expert guidance from assessment to certification." },
  { icon: AlertTriangle, title: "Incident Response & Forensics", description: "The technical investigation and recovery process used after a cyber-attack: rapid containment, forensic analysis, and post-incident hardening." },
  { icon: Server, title: "Cloud Security", description: "Secure your cloud workloads with IAM policies, encryption, network segmentation, and continuous monitoring." },
  { icon: ShieldCheck, title: "Staff Training", description: "Customized cybersecurity awareness programs, phishing simulations, and security-first culture workshops for your team." },
  { icon: Bug, title: "Malware Analysis & Removal", description: "Advanced malware detection, reverse engineering, rootkit removal, and endpoint decontamination with forensic evidence preservation.", span: "wide" },
  { icon: Eye, title: "Dark Web Monitoring", description: "Continuous monitoring of dark web forums, paste sites, and breach databases to detect leaked credentials and sensitive data." },
  { icon: Key, title: "Identity & Access Management", description: "Tools like Multi-Factor Authentication (MFA) that ensure only the right people can access sensitive data. SSO, PAM, and directory integration." },
  { icon: Database, title: "Data Loss Prevention", description: "Software that monitors and stops sensitive company info from being accidentally or purposefully shared. Classification, monitoring, and blocking." },
  { icon: Fingerprint, title: "Digital Forensics", description: "Court-admissible digital evidence collection, chain-of-custody management, disk imaging, and expert witness testimony.", span: "wide" },
  { icon: Globe, title: "Web Application Security", description: "OWASP Top 10 testing, code review, WAF configuration, API security testing, and secure development lifecycle consulting." },
  { icon: Network, title: "Network Security Assessment", description: "Firewall configuration audits, network traffic analysis, wireless security testing, and infrastructure vulnerability mapping." },
  { icon: Monitor, title: "Endpoint Detection & Response", description: "Advanced protection for individual devices like laptops and phones: behavioral analysis, automated containment, and centralized management." },
  { icon: Shield, title: "Threat Intelligence", description: "Curated threat feeds, indicator of compromise tracking, adversary profiling, and proactive defense strategy updates." },
  { icon: Cloud, title: "Disaster Recovery Planning", description: "Business continuity strategies, backup validation, RTO/RPO optimization, and automated failover testing for critical systems." },
  { icon: Mail, title: "Email Security", description: "Phishing protection, DMARC/DKIM/SPF configuration, email gateway hardening, and business email compromise prevention." },
  { icon: Smartphone, title: "Mobile Security", description: "Mobile app penetration testing, MDM policy design, BYOD security frameworks, and mobile threat defense deployment." },
  { icon: Radio, title: "SIEM & Log Management", description: "Security event correlation, centralized log aggregation, custom detection rules, and automated alert workflows." },
  { icon: HardDrive, title: "Backup & Encryption", description: "Data encryption: scrambling information so it cannot be read by hackers, even if stolen. Enterprise backup strategies and key management." },
  { icon: Gauge, title: "Vulnerability Management", description: "Continuous vulnerability scanning, risk prioritization, remediation tracking, and SLA-driven patching workflows." },
  { icon: Settings, title: "Security Operations Center", description: "SOC-as-a-Service with 24/7 monitoring, Tier 1-3 analyst coverage, playbook automation, and monthly threat briefings." },
  { icon: Zap, title: "Red Team Operations", description: "Full-scope adversary simulation, physical and digital attack scenarios, stealth persistence testing, and executive debrief reporting." },
  { icon: BookOpen, title: "Compliance Advisory", description: "Expert guidance to make sure your IT systems meet laws like the DPDP Act, GDPR, or international ISO standards." },
];

/* ───────── Compliance Framework Tabs ───────── */
interface ComplianceFramework {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  steps: string[];
  metrics: { label: string; value: string }[];
}

const complianceFrameworks: ComplianceFramework[] = [
  {
    id: "pentest",
    icon: ScanSearch,
    label: "Pen Testing",
    title: "Penetration Testing & Vulnerability Assessment",
    description: "We simulate real-world attack scenarios to expose weaknesses before adversaries exploit them, from network infrastructure to web applications.",
    steps: [
      "Scope definition and rules of engagement agreement",
      "Automated scanning + manual exploitation of discovered vulnerabilities",
      "Privilege escalation, lateral movement, and data exfiltration testing",
      "Detailed remediation report with risk-ranked findings and executive summary",
      "Post-remediation re-test to validate all fixes are effective",
    ],
    metrics: [
      { label: "Assessments Done", value: "500+" },
      { label: "Avg. Findings", value: "23 per audit" },
      { label: "Re-test Pass Rate", value: "98%" },
      { label: "Standards", value: "OWASP / PTES / NIST" },
    ],
  },
  {
    id: "compliance",
    icon: Scale,
    label: "Compliance",
    title: "Regulatory Compliance & Certification",
    description: "Navigate complex regulatory landscapes, from India's DPDP Act to global standards like ISO 27001, SOC 2, and GDPR, with structured advisory and hands-on implementation.",
    steps: [
      "Gap analysis against target framework requirements",
      "Policy and procedure documentation (50+ template library)",
      "Technical control implementation and evidence collection",
      "Internal audit simulation and pre-certification readiness check",
      "Certification body liaison and post-certification maintenance",
    ],
    metrics: [
      { label: "Certifications", value: "100+" },
      { label: "Frameworks", value: "ISO / SOC / GDPR / DPDP" },
      { label: "First-Pass Rate", value: "96%" },
      { label: "Avg. Timeline", value: "8-14 weeks" },
    ],
  },
  {
    id: "incident",
    icon: FileWarning,
    label: "Incident Response",
    title: "Incident Response & Digital Forensics",
    description: "When a breach occurs, speed is everything. Our IR team deploys within hours to contain, investigate, and recover, with court-admissible forensic evidence.",
    steps: [
      "24/7 incident hotline activation and initial triage",
      "Containment: isolate affected systems to stop lateral spread",
      "Forensic investigation: disk imaging, log analysis, and root-cause identification",
      "Eradication and system hardening to prevent recurrence",
      "Post-incident report with lessons learned and security roadmap",
    ],
    metrics: [
      { label: "Response Time", value: "<4 hours" },
      { label: "Cases Handled", value: "200+" },
      { label: "Recovery Rate", value: "100%" },
      { label: "Forensic Standard", value: "Court-admissible" },
    ],
  },
  {
    id: "training",
    icon: UserCheck,
    label: "Staff Training",
    title: "Security Awareness & Phishing Simulation",
    description: "Your people are your first line of defense and your biggest vulnerability. We turn employees into human firewalls with gamified training and live phishing tests.",
    steps: [
      "Baseline phishing simulation to measure current susceptibility",
      "Customized training modules: role-based, industry-specific content",
      "Live social engineering exercises (phishing, vishing, physical)",
      "Monthly micro-learning campaigns with gamification and leaderboards",
      "Quarterly reporting dashboard with risk score trends per department",
    ],
    metrics: [
      { label: "Click Rate ↓", value: "85% reduction" },
      { label: "Staff Trained", value: "10,000+" },
      { label: "Modules", value: "40+" },
      { label: "Languages", value: "EN / HI" },
    ],
  },
];

function ComplianceTabs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState(complianceFrameworks[0].id);
  const active = complianceFrameworks.find((c) => c.id === activeTab)!;

  return (
    <section className="py-24 lg:py-32 bg-secondary/50" ref={ref}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">METHODOLOGY DEEP-DIVE</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">How We Secure Your Digital Sovereignty.</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">Proactive measures to keep your data private and ensure your business follows all legal and technical security standards.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.15 }} className="flex flex-wrap justify-center gap-3 mb-12">
          {complianceFrameworks.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button key={cat.id} onClick={() => setActiveTab(cat.id)} className={`group flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 text-sm font-display font-semibold transition-all duration-300 ${isActive ? "border-accent bg-accent/10 text-accent shadow-md shadow-accent/10" : "border-border bg-card text-muted-foreground hover:border-accent/30 hover:text-foreground"}`}>
                <cat.icon className={`w-4 h-4 transition-colors ${isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground"}`} />
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div key={active.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-display font-semibold uppercase tracking-wider mb-4">
              <active.icon className="w-3.5 h-3.5" />
              {active.label}
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{active.title}</h3>
            <p className="text-muted-foreground leading-relaxed mb-8 max-w-3xl">{active.description}</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
              {active.metrics.map((m) => (
                <div key={m.label} className="p-4 rounded-xl border border-border bg-card text-center">
                  <p className="font-display text-xl font-bold text-accent">{m.value}</p>
                  <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mt-1">{m.label}</p>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              {active.steps.map((step, i) => (
                <motion.div key={step} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }} className="flex items-start gap-3">
                  <div className="w-6 h-6 mt-0.5 shrink-0 rounded-full bg-accent/10 flex items-center justify-center">
                    <span className="text-[10px] font-display font-bold text-accent">{i + 1}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{step}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

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
        badge="CYBERSECURITY & COMPLIANCE: DIGITAL SOVEREIGNTY"
        title="Fortified IT &"
        highlight="Cyber Strategy."
        description="Proactive measures to keep your data private and ensure your business follows all legal and technical security standards."
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
      <ComplianceTabs />
      <TechMarquee label="SECURITY TOOLS & PLATFORMS" items={techStack} />
      <ScopingCalculator variant="consulting" />
      <CTASection />
    </>
  );
}
