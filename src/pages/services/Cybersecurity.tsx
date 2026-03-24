import { useRef } from "react";
import { m as motion, useInView } from "framer-motion";
import {
  ShieldCheck, Eye, Lock, Database,
  AlertTriangle, CheckCircle2,
  ScanSearch, Network, Monitor, HardDrive,
  ClipboardList, Compass, Rocket, HeadphonesIcon,
  Building2, Store, GraduationCap,
  Phone,
} from "lucide-react";
import SEO from "@/components/SEO";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import CTASection from "@/components/CTASection";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { Button } from "@/components/ui/button";

/* ════════════════════════════════════
   SECTION 2 — Trust Strip
════════════════════════════════════ */
const trustMarkers = [
  { icon: ShieldCheck, label: "Proactive Threat Protection" },
  { icon: Eye, label: "24/7 Monitoring Capability" },
  { icon: Lock, label: "Business-Focused Security" },
  { icon: Database, label: "Confidential & Secure Handling" },
];

function TrustStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="relative w-full py-5 border-y border-border/50 bg-card/80 backdrop-blur-sm">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-border/40">
          {trustMarkers.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center justify-center gap-2.5 py-3 px-4"
            >
              <m.icon className="w-4 h-4 text-accent/70 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-muted-foreground leading-tight">
                {m.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SECTION 3 — Problem → Solution
════════════════════════════════════ */
function ProblemSolution() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-24 bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14 max-w-3xl mx-auto"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            The Real Problem
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Most businesses think they're secure…{" "}
            <span className="text-gradient">until something goes wrong</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Problem column */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.15 }}
            className="relative flex flex-col p-8 rounded-2xl border border-border bg-card overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center mb-5">
                <AlertTriangle className="w-5 h-5 text-red-400" />
              </div>
              <p className="text-xs font-display uppercase tracking-widest text-red-400/80 mb-3">The Problem</p>
              <p className="text-foreground font-display font-semibold text-lg mb-3 leading-snug">
                Weak passwords, outdated systems, unsecured networks.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Lack of monitoring leaves silent vulnerabilities that build up over time — invisible until they aren't.
              </p>
            </div>
          </motion.div>

          {/* Solution column */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="relative flex flex-col p-8 rounded-2xl border border-accent/20 bg-card overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent pointer-events-none" />
            <div className="relative z-10">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                <CheckCircle2 className="w-5 h-5 text-accent" />
              </div>
              <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">The Reality</p>
              <p className="text-foreground font-display font-semibold text-lg mb-3 leading-snug">
                These issues don't show up daily.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                These issues stay invisible… until they result in data loss, unauthorized access, or complete system disruption.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SECTION 4 — Authority Block
════════════════════════════════════ */
function AuthorityBlock() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 lg:py-20 bg-secondary/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-4">
            Our Approach
          </p>
          <h2 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-6 leading-tight">
            Security isn't a product.{" "}
            <span className="text-gradient">It's an ongoing system.</span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            Installing antivirus or firewalls is not enough. Real security requires{" "}
            <span className="text-foreground font-semibold">continuous monitoring</span>,{" "}
            <span className="text-foreground font-semibold">structured access control</span>, and{" "}
            <span className="text-foreground font-semibold">proactive risk management</span> — not a one-time setup that gets forgotten.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SECTION 5 — Capabilities (4 cards)
════════════════════════════════════ */
const capabilities: BentoItem[] = [
  {
    icon: ScanSearch,
    title: "Vulnerability Assessment",
    description: "Identify weaknesses before they are exploited — across your network, systems, and access points.",
    span: "wide",
  },
  {
    icon: Network,
    title: "Network & Access Security",
    description: "Control and secure access across systems with firewalls, segmentation, and access policies.",
  },
  {
    icon: Monitor,
    title: "Monitoring & Threat Detection",
    description: "Detect suspicious activity early before it turns into a serious incident.",
  },
  {
    icon: HardDrive,
    title: "Data Protection & Backup",
    description: "Ensure data safety and recovery with encryption, controlled access, and reliable backups.",
    span: "wide",
  },
];

/* ════════════════════════════════════
   SECTION 6 — Process
════════════════════════════════════ */
const processSteps = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Assessment",
    body: "We review your current systems, access controls, and vulnerabilities to understand your actual security posture.",
  },
  {
    step: "02",
    icon: Compass,
    title: "Planning",
    body: "We map the right security approach based on your business size, data sensitivity, and operational risk.",
  },
  {
    step: "03",
    icon: Rocket,
    title: "Implementation",
    body: "Clean, structured deployment of security measures with minimal disruption to your daily operations.",
  },
  {
    step: "04",
    icon: HeadphonesIcon,
    title: "Ongoing Monitoring",
    body: "Continuous oversight so threats are caught early — before they become costly incidents.",
  },
];

function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 lg:py-24 bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">Our Process</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            How we{" "}
            <span className="text-gradient">secure your business</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Every engagement is tailored to your risk profile, infrastructure, and operational priorities.
          </p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="hidden lg:block absolute top-10 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

          {processSteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className="group relative flex flex-col p-6 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="absolute -top-3 left-6 px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-[10px] font-display font-bold text-accent tracking-widest">
                {s.step}
              </div>
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4 mt-3 group-hover:bg-accent/20 transition-colors">
                <s.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-base font-bold text-foreground mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SECTION 7 — Mid-Page CTA
════════════════════════════════════ */
function MidPageCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 lg:py-14 bg-secondary/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl border border-accent/15 bg-card px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-transparent pointer-events-none" />
          <div className="relative z-10">
            <p className="font-display text-lg md:text-xl font-bold text-foreground mb-1">
              Not sure if your business is actually secure… or just assuming it is?
            </p>
            <p className="text-sm text-muted-foreground">
              Tell us what you're running — we'll tell you where the real risks are.
            </p>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <motion.div
              animate={{ boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 20px rgba(6,182,212,0.5)", "0 0 0px rgba(6,182,212,0)"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="rounded-xl"
            >
              <WhatsAppCTA
                context="consulting"
                section="pricing"
                buttonText="Get My Project Estimate"
                className="px-7 h-11 text-sm font-semibold rounded-xl shadow-lg shadow-accent/20"
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SECTION 8 — Reality Block (Use Cases)
════════════════════════════════════ */
const realityCases = [
  {
    icon: Building2,
    title: "For Offices",
    body: "Employee access, network security, and data protection for everyday business operations.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/30",
  },
  {
    icon: Store,
    title: "For Small Businesses",
    body: "Foundational security that protects customer data, payments, and operational continuity.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "hover:border-amber-500/30",
  },
  {
    icon: GraduationCap,
    title: "For Institutions",
    body: "Secure data management, network segmentation, and access control for campuses and departments.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "hover:border-blue-500/30",
  },
];

function RealitySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-24 bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">Who This Is For</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-5">
            Security issues{" "}
            <span className="text-gradient">don't start big</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Most problems begin with small gaps — weak passwords, outdated systems, or unmonitored networks. Over time, these gaps turn into serious risks. By the time they’re visible, the damage is already done.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {realityCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              className={`group flex flex-col p-8 rounded-2xl border border-border bg-card transition-all duration-300 ${uc.border} hover:shadow-lg`}
            >
              <div className={`w-12 h-12 rounded-xl ${uc.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                <uc.icon className={`w-6 h-6 ${uc.color}`} />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-3">{uc.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{uc.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   Tech Marquee data
════════════════════════════════════ */
const techStack = [
  "Nessus", "Burp Suite", "Metasploit", "Wireshark",
  "CrowdStrike", "Splunk", "Fortinet", "Palo Alto",
  "Cloudflare", "HashiCorp Vault", "OWASP ZAP", "Qualys",
  "SentinelOne", "Tenable.io", "Rapid7", "Kali Linux",
  "Microsoft Defender", "Sophos", "Darktrace", "Okta",
  "Proofpoint", "KnowBe4", "Varonis", "SonarQube",
];

/* ════════════════════════════════════
   PAGE EXPORT
════════════════════════════════════ */
export default function Cybersecurity() {
  return (
    <>
      <SEO
        title="Cybersecurity Services in Lucknow | Spirecrest Solutions"
        description="Proactive cybersecurity — vulnerability assessments, network security, threat monitoring, and data protection for businesses across Lucknow. Protect your operations before problems happen."
        path="/services/cybersecurity"
      />

      {/* ── 1. Hero ── */}
      <ServiceHero
        badge="Cybersecurity"
        title="Cybersecurity That Protects Your Business"
        highlight="Before Problems Happen"
        description="A single breach, data loss, or system compromise can disrupt operations instantly. We identify vulnerabilities, secure your systems, and prevent threats before they impact your business."
        trustLine="Supporting businesses across Lucknow with proactive security and long-term protection."
        stats={[
          { value: "500+", label: "Audits Completed" },
          { value: "24/7", label: "Monitoring Capability" },
          { value: "0", label: "Breaches Post-Audit" },
        ]}
        primaryCTA="Get Expert Advice"
        secondaryCTA="Talk to an Expert"
        showCallCTA={true}
      />

      {/* ── 2. Trust Strip ── */}
      <TrustStrip />

      {/* ── 3. Problem → Reality ── */}
      <ProblemSolution />

      {/* ── 4. Authority Block ── */}
      <AuthorityBlock />

      {/* ── 5. Capabilities ── */}
      <BentoGrid
        label="What We Do"
        heading="Built around your actual risk"
        subheading="Every measure we implement is chosen based on your business environment, not a generic security checklist. Every layer is designed to reduce risk, not just tick security checkboxes."
        items={capabilities}
      />

      {/* ── 6. Process ── */}
      <ProcessSection />

      {/* ── 7. Mid-Page CTA ── */}
      <MidPageCTA />

      {/* ── 8. Reality / Use Cases ── */}
      <RealitySection />

      {/* Tech Marquee */}
      <TechMarquee label="Security Tools & Platforms" items={techStack} />

      {/* ── 9. Final CTA ── */}
      <CTASection
        heading="Tell us what you want to protect"
        subtext="We'll assess your setup and guide you on what actually needs to be secured."
      />
    </>
  );
}
