import { useRef } from "react";
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

/* ════════════════════════════════════
   SECTION 2 — Trust Strip
════════════════════════════════════ */
const trustMarkers = [
  { icon: MapPin,      label: "Trusted across Lucknow & UP" },
  { icon: ShieldCheck, label: "24/7 Zero-Downtime Support" },
  { icon: Settings,    label: "100% Custom-Designed Setups" },
  { icon: FileText,    label: "Transparent Pricing & Audits" },
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
            Security isn't about cameras. It's about{" "}
            <span className="text-gradient">coverage, clarity, and control.</span>
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
                Most CCTV setups fail the moment you actually need them.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Blind spots, poor night footage, unstable recording, and zero real monitoring when something actually happens.
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
              <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">The Spirecrest Way</p>
              <p className="text-foreground font-display font-semibold text-lg mb-3 leading-snug">
                We design. Not just install.
              </p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We don't install cameras randomly. We design your entire system around your layout, risk areas, and real-world usage so nothing important is ever missed.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ════════════════════════════════════
   SECTION 4 — Capabilities (4 cards)
════════════════════════════════════ */
const capabilities: BentoItem[] = [
  {
    icon: Smartphone,
    title: "Remote Monitoring",
    description: "Access live and recorded footage anytime, anywhere from your phone or system.",
    span: "wide",
  },
  {
    icon: KeySquare,
    title: "Smart Access Control",
    description: "Secure entry with biometric, RFID, and controlled access systems for homes and offices.",
  },
  {
    icon: Bell,
    title: "Instant Active Alerts",
    description: "Get notified instantly when something unusual happens, not hours later.",
  },
  {
    icon: Monitor,
    title: "Centralized Command",
    description: "Monitor multiple cameras, locations, and systems from a single interface.",
    span: "wide",
  },
];

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
                buttonText="Get a Quick Estimate on WhatsApp"
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
                    buttonText="Get a Free Estimate"
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
  return (
    <>
      <SEO
        title="CCTV & Security Systems in Lucknow | Spirecrest Solutions"
        description="Custom-engineered CCTV, surveillance, and access control systems for homes, offices, and factories across Lucknow and U.P. Zero-blind-spot coverage, 24/7 support, transparent pricing."
        path="/services/surveillance"
      />

      {/* ── 1. Hero ── */}
      <ServiceHero
        badge="Security & Surveillance"
        title="CCTV & Security Systems That Actually"
        highlight="Protect What Matters"
        description="Custom-designed surveillance and access control systems built for your exact space, ensuring complete coverage, reliable recording, and peace of mind when it matters most."
        stats={[
          { value: "3000+", label: "Cameras Deployed" },
          { value: "24/7", label: "Live Monitoring" },
          { value: "100%", label: "Custom Designed" },
        ]}
        primaryCTA="Get a Quick Estimate"
        secondaryCTA="Talk to an Expert"
        trustLine="Installed across homes, offices, and commercial spaces in Lucknow with reliable, long-term support. Reliable even during power and network fluctuations. Serving Lucknow & surrounding areas."
        showCallCTA={true}
      />

      {/* ── 2. Trust Strip ── */}
      <TrustStrip />

      {/* ── 3. Problem → Solution ── */}
      <ProblemSolution />

      {/* ── 4. Capabilities ── */}
      <BentoGrid
        label="What You Get"
        heading="Built around outcomes, not spec sheets"
        subheading="Everything we deploy is designed to work seamlessly in your environment, not just look good on paper."
        items={capabilities}
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
        heading="Tell us what you're trying to protect"
        subtext="We'll tell you exactly what you need. No upselling. Just what actually works."
      />
    </>
  );
}
