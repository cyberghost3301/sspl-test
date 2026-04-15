import React, { useRef, useState } from "react";
import { m as motion, useInView } from "framer-motion";
import {
  MapPin, ShieldCheck, Settings, FileText,
  ClipboardList, SearchCheck, LayoutGrid, Wrench,
  Home, Building2, Warehouse,
  Smartphone, KeySquare, Bell, Monitor,
  Phone, AlertTriangle, CheckCircle2,
} from "lucide-react";
import SEO from "@/components/SEO";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import CTASection from "@/components/CTASection";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import { Button } from "@/components/ui/button";
import ContextToggle, { ContextMode } from "@/components/ContextToggle";

/* ════════════════════════════════════
   SECTION 2 — Trust Strip (prop-driven)
════════════════════════════════════ */
type TrustMarker = { icon: React.ElementType; label: string };

function TrustStrip({ markers }: { markers: TrustMarker[] }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <section ref={ref} className="relative w-full py-5 border-y border-border/50 bg-card/80 backdrop-blur-sm">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 lg:divide-x lg:divide-border/40">
          {markers.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-center justify-center gap-2.5 py-3 px-4"
              >
                <Icon className="w-4 h-4 text-accent/70 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-muted-foreground leading-tight">
                  {m.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SECTION 3 — Problem → Solution
════════════════════════════════════ */
function ProblemSolution({ mode }: { mode: ContextMode }) {
  const content = {
    enterprise: {
      problemLabel: "The Enterprise Blind Spot",
      problemTitle: "Fragmented systems create liabilities.",
      problemDesc: "Relying on disparate CCTV, separate access control, and manual logs leaves facility managers reacting to breaches rather than preventing them. Security gaps cost millions in liabilities and operational downtime.",
      solutionLabel: "The Spirecrest Standard",
      solutionTitle: "Unified SOC Architecture.",
      solutionDesc: "We deploy unified Video Management Systems (VMS) tied directly to biometric access. Every door swipe, perimeter breach, and loitering event is logged, AI-analyzed, and pushed to your admin dashboard in real-time."
    },
    residential: {
      problemLabel: "The Residential Compromise",
      problemTitle: "Consumer cameras are easily bypassed.",
      problemDesc: "Off-the-shelf Wi-Fi cameras drop connection, get easily jammed, and share your private family footage with third-party cloud servers. They offer the illusion of security without the reality.",
      solutionLabel: "The Spirecrest Standard",
      solutionTitle: "Hardwired & Locally Secured.",
      solutionDesc: "We deploy hardwired, 4K night-vision cameras with local NVR storage. Your property is protected by enterprise-grade hardware that never drops offline, while your family's data remains 100% private and under your physical control."
    }
  };

  const data = content[mode];

  return (
    <section className="py-24 bg-[#05070A] relative z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-8 md:gap-12">
        {/* Problem Card */}
        <div className="bg-[#0D1117]/80 backdrop-blur-2xl border border-white/5 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-red-500/20 transition-colors duration-500 shadow-2xl">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-red-500/80 to-transparent" />
          <span className="text-red-400 font-mono text-sm tracking-wider uppercase mb-5 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-red-500/50 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            {data.problemLabel}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-5 leading-snug">{data.problemTitle}</h3>
          <p className="text-white/60 leading-relaxed text-base md:text-lg">{data.problemDesc}</p>
        </div>

        {/* Solution Card */}
        <div className="bg-[#0D1117]/80 backdrop-blur-2xl border border-white/5 p-8 md:p-12 rounded-3xl relative overflow-hidden group hover:border-sc-teal/30 transition-colors duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-sc-teal/80 to-transparent" />
          <span className="text-sc-teal font-mono text-sm tracking-wider uppercase mb-5 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-sc-teal/50 shadow-[0_0_10px_rgba(0,212,200,0.8)]" />
            {data.solutionLabel}
          </span>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-5 leading-snug">{data.solutionTitle}</h3>
          <p className="text-white/60 leading-relaxed text-base md:text-lg">{data.solutionDesc}</p>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SECTION 4 — Capabilities
   (dynamic — defined inside component)
════════════════════════════════════ */

/* ════════════════════════════════════
   SECTION 5 — Process
════════════════════════════════════ */
const processSteps = [
  {
    step: "01",
    icon: ClipboardList,
    title: "Site Assessment",
    body: "We evaluate your space, layout, and risk points in detail.",
  },
  {
    step: "02",
    icon: SearchCheck,
    title: "Risk Analysis",
    body: "We identify where security actually matters, not just where cameras can be placed.",
  },
  {
    step: "03",
    icon: LayoutGrid,
    title: "Custom System Design",
    body: "Every camera angle, wiring route, and backup system is planned before installation.",
  },
  {
    step: "04",
    icon: Wrench,
    title: "Installation & AMC",
    body: "Clean execution with ongoing support so your system keeps working long after setup.",
  },
];

function ProcessSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 lg:py-24 bg-secondary/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">Our Process</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            How we design your{" "}
            <span className="text-gradient">security system</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">Every setup is planned before it's installed. No guesswork. No generic packages.</p>
        </motion.div>

        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Connecting line — desktop only */}
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
   SECTION 6 — Mid-Page CTA
════════════════════════════════════ */
function MidPageCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-12 lg:py-14 bg-background" ref={ref}>
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
              Not sure what you need? Send us photos or a video of your space.
            </p>
            <p className="text-sm text-muted-foreground">
              We'll guide you on exactly what setup makes sense.
            </p>
          </div>
          <div className="relative z-10 flex-shrink-0">
            <motion.div
              animate={{ boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 20px rgba(6,182,212,0.5)", "0 0 0px rgba(6,182,212,0)"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="rounded-xl"
            >
              <WhatsAppCTA
                context="surveillance"
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
   SECTION 7 — Use Cases
════════════════════════════════════ */
const useCases = [
  {
    icon: Home,
    title: "For Homes",
    body: "Keep your family, entry points, and surroundings secure with simple, reliable monitoring.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "hover:border-cyan-500/30",
  },
  {
    icon: Building2,
    title: "For Offices",
    body: "Track operations, monitor access, and maintain visibility across your workspace.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "hover:border-blue-500/30",
  },
  {
    icon: Warehouse,
    title: "For Factories & Warehouses",
    body: "Monitor large areas, prevent theft, and maintain control over inventory and movement.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    border: "hover:border-amber-500/30",
  },
];

function UseCaseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-24 bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">Who We Build For</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Engineered for your{" "}
            <span className="text-gradient">exact environment</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {useCases.map((uc, i) => (
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
   SECTION 8 — Pricing Guidance
════════════════════════════════════ */
function PricingGuidance() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 lg:py-24 bg-secondary/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-10 md:p-14">
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">No Surprises, Ever</p>
              <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-5">
                Honest Pricing Guidance
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-3 text-base md:text-lg">
                Most basic home CCTV setups typically start between{" "}
                <span className="text-foreground font-semibold">₹15,000 to ₹40,000</span>{" "}
                depending on coverage and requirements. Larger commercial and industrial setups are custom-designed based on your space and needs.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8 text-base md:text-lg">
                We explain everything clearly before installation.{" "}
                <span className="text-foreground font-semibold">No hidden costs. No unnecessary upgrades.</span>{" "}
                You'll know exactly what you're paying for before we begin.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div
                  animate={{ boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 20px rgba(6,182,212,0.55)", "0 0 0px rgba(6,182,212,0)"] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                  className="rounded-xl"
                >
                  <WhatsAppCTA
                    context="surveillance"
                    section="footer"
                    buttonText="Talk to an Expert"
                    className="px-7 h-11 text-sm font-semibold rounded-xl shadow-lg shadow-accent/20 w-full sm:w-auto"
                  />
                </motion.div>
                <a href="tel:+919250974145">
                  <Button
                    variant="outline"
                    className="h-11 px-7 text-sm font-semibold border-accent/30 text-white hover:bg-accent/10 w-full sm:w-auto rounded-xl gap-2"
                  >
                    <Phone className="w-4 h-4" />
                    Speak to an Engineer
                  </Button>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   Tech Marquee data
════════════════════════════════════ */
const techStack = [
  "Hikvision", "Dahua", "Axis Communications", "Ubiquiti UniFi",
  "IP Cameras", "PTZ Systems", "NVR/DVR", "PoE Switches",
  "Biometric Scanners", "RFID Access", "Cloud NVR", "ZKTeco",
  "Suprema", "Honeywell", "Bosch Security", "Genetec",
  "FLIR Systems", "Samsung Hanwha", "TP-Link VIGI", "Reolink",
];

/* ════════════════════════════════════
   PAGE EXPORT
════════════════════════════════════ */
export default function Surveillance() {
  const [contextMode, setContextMode] = useState<ContextMode>("enterprise");

  // ── DYNAMIC CONTENT DICTIONARIES ──
  const heroContent = {
    enterprise: {
      description: "Military-grade active monitoring, biometric access control, and AI-driven threat detection for operations that cannot afford physical blind spots.",
      trustLine: "Deployed across commercial facilities, server rooms, and corporate headquarters. SLA-backed uptime.",
    },
    residential: {
      description: "Discreet, high-fidelity perimeter defense and smart-home integration. Protect your family and property with zero privacy compromises.",
      trustLine: "Clean, wire-free installations for high-end residential properties. Total control from your phone.",
    },
  };

  const dynamicCapabilities: Record<ContextMode, BentoItem[]> = {
    enterprise: [
      { icon: Monitor,     title: "Active SOC Monitoring",   description: "Integration with local authorities and 24/7 active threat response centers.", span: "wide" },
      { icon: ShieldCheck, title: "Biometric Access Control", description: "Multi-factor physical authentication for restricted server and executive areas." },
      { icon: SearchCheck, title: "AI Behavior Analytics",   description: "Automated alerts for loitering, unauthorized vehicles, and perimeter breaches." },
      { icon: LayoutGrid,  title: "Multi-Site Topologies",   description: "Centralized VMS (Video Management System) to monitor branches nationwide.", span: "wide" },
    ],
    residential: [
      { icon: Smartphone, title: "Unified Mobile Control",      description: "View live feeds, unlock doors, and arm perimeters instantly from your iOS or Android device.", span: "wide" },
      { icon: KeySquare,  title: "Smart Lock Integration",      description: "Keyless entry for family and temporary digital passes for staff/guests." },
      { icon: Bell,       title: "Nanny & Pet Monitoring",      description: "Crystal clear two-way audio and indoor coverage with privacy shutter controls." },
      { icon: Home,       title: "Perimeter Defense Matrix",    description: "Night-vision enabled boundary cameras with floodlight and siren deterrents.", span: "wide" },
    ],
  };

  const dynamicTrustMarkers: Record<ContextMode, { icon: React.ElementType; label: string }[]> = {
    enterprise: [
      { icon: MapPin,      label: "Commercial Coverage" },
      { icon: ShieldCheck, label: "24/7 Active Response" },
      { icon: Settings,    label: "VLAN Network Isolation" },
      { icon: FileText,    label: "Compliance Audits" },
    ],
    residential: [
      { icon: Home,        label: "High-End Residential" },
      { icon: Smartphone,  label: "App-First Control" },
      { icon: ShieldCheck, label: "Strict Data Privacy" },
      { icon: Wrench,      label: "Clean Installation" },
    ],
  };

  return (
    <>
      <SEO
        title={`Advanced Surveillance | Spirecrest ${
          contextMode === "enterprise" ? "Commercial" : "Home"
        }`}
        description={heroContent[contextMode].description}
        path="/services/surveillance"
      />

      {/* ── 1. Hero ── */}
      <ServiceHero
        badge="Security & Surveillance"
        title={contextMode === "enterprise"
          ? "Enterprise Security That"
          : "Home Security That"}
        highlight={contextMode === "enterprise"
          ? "Eliminates Blind Spots"
          : "Protects What Matters"}
        description={heroContent[contextMode].description}
        stats={[
          { value: "3000+", label: "Cameras Deployed" },
          { value: "24/7",  label: "Live Monitoring" },
          { value: "100%",  label: "Custom Designed" },
        ]}
        primaryCTA="Get Expert Advice"
        secondaryCTA="Talk to an Expert"
        trustLine={heroContent[contextMode].trustLine}
        showCallCTA={true}
      />

      {/* ── Context Toggle ── */}
      <ContextToggle mode={contextMode} onChange={setContextMode} />

      {/* ── 2. Dynamic Trust Strip ── */}
      <TrustStrip markers={dynamicTrustMarkers[contextMode]} />

      {/* ── 3. Problem → Solution ── */}
      <ProblemSolution mode={contextMode} />

      {/* ── 4. Dynamic Capabilities Bento ── */}
      <BentoGrid
        label={contextMode === "enterprise" ? "Enterprise Architecture" : "Residential Deployment"}
        heading={contextMode === "enterprise"
          ? "Built for compliance and threat mitigation"
          : "Built for peace of mind and convenience"}
        subheading="Everything we deploy is designed to work seamlessly in your environment, not just look good on paper."
        items={dynamicCapabilities[contextMode]}
      />

      {/* ── 5. Process ── */}
      <ProcessSection />

      {/* ── 6. Mid-Page CTA ── */}
      <MidPageCTA />

      {/* ── 7. Use Cases ── */}
      <UseCaseSection />

      {/* ── 8. Pricing Guidance ── */}
      <PricingGuidance />

      {/* Tech Marquee */}
      <TechMarquee label="Certified Hardware Partners" items={techStack} />

      {/* ── 9. Final CTA ── */}
      <CTASection
        heading={contextMode === "enterprise"
          ? "Secure your operations"
          : "Protect your home"}
        subtext="Talk to our engineers about your exact security requirements. No upselling."
      />
    </>
  );
}
