import { useRef } from "react";
import { m as motion, useInView } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Cpu,
  Network,
  Shield,
  CheckCircle2,
} from "lucide-react";
import SEO from "@/components/SEO";
import HeroSection from "@/components/HeroSection";
import TrustMetrics from "@/components/TrustMetrics";
import MVPServices from "@/components/MVPServices";
import PartnerModel from "@/components/PartnerModel";
import BentoGrid from "@/components/BentoGrid";
import WhatsAppCTA from "@/components/WhatsAppCTA";
import SystemDiagnosticScan from "@/components/SystemDiagnosticScan";
import InteractiveROITracker from "@/components/InteractiveROITracker";
import SectionDivider from "@/components/SectionDivider";

/* ───────────────────────────────────────────────
   TIER 2 — Authority Spike
─────────────────────────────────────────────── */
const authorityBlocks = [
  {
    icon: Cpu,
    title: "We design, not just deploy",
    text: "Every solution is engineered to handle real-world operational stress - not a generic setup",
  },
  {
    icon: Network,
    title: "We think in systems, not components",
    text: "Disconnected tools are liabilities. We build unified infrastructure that operates as one whole",
  },
  {
    icon: Shield,
    title: "We build for long-term stability",
    text: "Not quick fixes - systems that perform under pressure as your business scales and evolves",
  },
];

function AuthoritySpikeSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section className="relative py-32" ref={ref}>
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          data-aos="fade-up"
          className="text-center mb-12 max-w-2xl mx-auto"
        >
          <p className="text-xs font-display uppercase tracking-widest text-white/90 mb-3">Our Philosophy</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-bold">
            Most vendors install components. We take responsibility for systems.
          </h2>
          <p className="mt-4 max-w-xl mx-auto !text-gray-300 !opacity-100 text-base leading-relaxed">
            We design complete systems that support operations, scale with your business, and prevent failures before they happen
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-20 md:gap-24 lg:gap-32">
          {authorityBlocks.map((block, i) => (
            <motion.div
              key={block.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              data-aos="fade-up"
              data-aos-delay={i * 150}
              className="border-l border-white/20 pl-6 py-2"
            >
              <div className="mb-6">
                <block.icon className="h-5 w-5 text-cyan-400" />
              </div>
              <h3 className="!text-white !font-bold text-xl mb-3 leading-snug">
                {block.title}
              </h3>
              <p className="!text-gray-300 !opacity-100 text-base leading-relaxed">{block.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────
   TIER 1 — Flagship Case Study
─────────────────────────────────────────────── */
const flagshipMetrics = [
  { value: "60%", label: "Faster issue resolution" },
  { value: "2x", label: "Operational efficiency" },
  { value: "99.9%", label: "Uptime achieved" },
];
const flagshipImplemented = [
  "Centralized infrastructure control",
  "Real-time monitoring system",
  "Automated alerts and failover",
  "Secure access architecture",
];

function FlagshipCaseStudy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section className="relative py-32" ref={ref}>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 80% 50% at 70% 50%, rgba(0,180,255,0.05), transparent)" }}
      />
      <div className="section-container relative z-10">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-10"
        >
          <p className="text-xs font-display uppercase tracking-widest text-white/[0.45] mb-2">Case Study</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Built for real business operations
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          data-aos="fade-up"
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-0 rounded-2xl border border-white/[0.04] bg-white/[0.02] backdrop-blur-md overflow-hidden md:scale-[1.02]"
        >
          {/* LEFT: Context */}
          <div className="relative z-10 p-10 md:p-16 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/[0.04]">
            <div>
              <span className="text-xs font-bold tracking-widest text-cyan-500 uppercase mb-4 block">
                FLAGSHIP IMPLEMENTATION
              </span>
              <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                Multi-location Operations Management System
              </h3>
              <p className="!text-gray-300 !opacity-100 text-sm leading-relaxed mb-8 max-w-md">
                Designed to keep operations running without interruption across multiple high-traffic locations
              </p>
              <p className="text-[10px] uppercase tracking-widest font-bold text-white/[0.45] mb-4">
                What we implemented
              </p>
              <ul className="space-y-3">
                {flagshipImplemented.map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="!text-gray-300 !opacity-100 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mt-10">
              <WhatsAppCTA
                context="general"
                section="case_study"
                buttonText="Build Something Similar"
                className="px-7 h-11 text-sm"
              />
            </div>
          </div>

          {/* RIGHT: Metrics */}
          <div className="relative z-10 p-10 md:p-16 bg-white/[0.01] flex flex-col justify-center gap-10">
            <p className="text-[10px] uppercase tracking-widest font-bold text-white/[0.45]">Results</p>
            {flagshipMetrics.map((m) => (
              <div key={m.label} className="border-b border-white/[0.04] pb-8 last:border-0 last:pb-0">
                <p
                  className="font-display text-5xl md:text-6xl font-extrabold text-cyan-400 leading-none mb-2"
                  style={{ filter: "drop-shadow(0 0 15px rgba(0,180,255,0.4))" }}
                >
                  {m.value}
                </p>
                <p className="!text-gray-300 !opacity-100 text-sm">{m.label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="flex justify-center mt-8"
        >
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-white/[0.40] hover:text-white transition-colors"
          >
            View more case studies
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────
   Brand Signature Line
─────────────────────────────────────────────── */
function BrandSignatureLine() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section className="relative" ref={ref}>
      <div className="section-container py-32 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <p className="text-2xl md:text-3xl font-medium text-white mb-4 max-w-2xl mx-auto leading-snug">
            We step in where systems can't afford to fail.
          </p>
          <span className="text-sm text-white/40 tracking-wide">
            Trusted across infrastructure, security, and digital systems
          </span>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────
   TIER 3 — Secondary Case Studies
─────────────────────────────────────────────── */
const caseStudies = [
  {
    tag: "RETAIL OPERATIONS",
    headline: "Inventory & Order Management System",
    problem: "Multiple locations, no centralized tracking, stock errors, manual reconciliation",
    built: "Custom inventory platform with real-time sync, automated reorder triggers, unified dashboard",
    metrics: [{ value: "60%", label: "Fewer errors" }, { value: "3x", label: "Faster orders" }, { value: "Zero", label: "Manual work" }],
  },
  {
    tag: "SERVICES / B2B SALES",
    headline: "Custom CRM & Lead Management System",
    problem: "Leads scattered across WhatsApp, calls, and spreadsheets - lost follow-ups, zero visibility",
    built: "Centralized CRM with automated capture, follow-up sequences, pipeline tracking",
    metrics: [{ value: "40%", label: "More conversions" }, { value: "Zero", label: "Dropped leads" }, { value: "100%", label: "Visibility" }],
  },
  {
    tag: "ENTERPRISE OPERATIONS",
    headline: "Automated Workflow & Approval System",
    problem: "Manual approvals and key-person dependency created execution delays across the board",
    built: "Automated approval chains, instant notifications, real-time executive tracking",
    metrics: [{ value: "40%", label: "Faster execution" }, { value: "Zero", label: "Bottlenecks" }, { value: "100%", label: "Accountability" }],
  },
];

function MetricBentoSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section className="relative py-32" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <p className="text-xs font-display uppercase tracking-widest text-sc-teal mb-2">Validated Metrics</p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white/[0.80]">
            Operational impact delivered
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {[
            { title: "MANAGED SOC DEPLOYMENT", before: "14 hrs/wk", beforeSub: "manual monitoring", after: "2 hrs/wk", afterSub: "automated alerts", outcome: "85% reduction in threat response time." },
            { title: "NETWORK INFRASTRUCTURE", before: "3 vendors", beforeSub: "fragmented billing", after: "1 SLA", afterSub: "unified management", outcome: "₹40k/mo operational capital saved." },
            { title: "SMART OFFICE AUTOMATION", before: "6 weeks", beforeSub: "average install", after: "9 days", afterSub: "spirecrest deployment", outcome: "Zero disruption to daily operations." },
            { title: "CLOUD MIGRATION", before: "4 days", beforeSub: "yearly downtime", after: "99.9%", afterSub: "guaranteed uptime", outcome: "Enterprise-grade reliability achieved." }
          ].map((metric, i) => (
            <div key={i} className="liquid-glass p-8 flex flex-col justify-between h-full" data-aos="fade-up" data-aos-delay={i * 100}>
              <span className="text-sc-text-muted text-xs uppercase tracking-widest font-mono mb-8">{metric.title}</span>
              
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                  <span className="text-[10px] text-sc-red-alert tracking-widest uppercase mb-1">Before</span>
                  <span className="text-3xl font-display font-bold text-white mb-1">{metric.before}</span>
                  <span className="text-xs text-sc-text-muted">{metric.beforeSub}</span>
                </div>
                
                <svg className="w-6 h-6 text-sc-text-muted/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>

                <div className="flex flex-col text-right">
                  <span className="text-[10px] text-sc-teal tracking-widest uppercase mb-1">After</span>
                  <span className="text-3xl font-display font-bold text-sc-teal mb-1">{metric.after}</span>
                  <span className="text-xs text-sc-text-muted">{metric.afterSub}</span>
                </div>
              </div>
              
              <p className="text-sm text-sc-text-muted border-t border-white/5 pt-4">{metric.outcome}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-sc-text-muted text-sm italic mt-12">
          Numbers derived from active client engagements across 10 service verticals. Full case studies available during consultation.
        </p>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────
   TIER 3 — How We Work
─────────────────────────────────────────────── */
const steps = [
  { number: "01", title: "Understand your business", body: "Audit setup, map requirements, define scope - before anything is touched" },
  { number: "02", title: "Design system architecture", body: "Blueprint the full solution - stack, layout, integrations, and future scale" },
  { number: "03", title: "Implement and integrate", body: "Precise deployment, zero disruption, tested end-to-end before handover" },
  { number: "04", title: "Support and optimize", body: "Ongoing monitoring and refinement as your business grows" },
];

function HowWeWorkSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section className="relative py-32" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          data-aos="fade-up"
          className="text-center mb-10 max-w-xl mx-auto"
        >
          <p className="text-xs font-display uppercase tracking-widest text-white/90 mb-2">Our Process</p>
          <h2 className="font-display text-3xl md:text-4xl text-white font-bold">
            How we approach every project
          </h2>
        </motion.div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className="relative flex flex-col p-6 rounded-2xl border border-white/[0.04] bg-white/[0.02] backdrop-blur-md transition-colors duration-300 hover:bg-white/[0.03] min-w-0 overflow-hidden"
            >
              <div className="flex flex-col gap-3 items-start w-full">
                <span className="text-cyan-500 font-mono text-sm tracking-widest">{step.number}</span>
                <h3 className="font-display text-xs font-bold text-white uppercase tracking-wide">{step.title}</h3>
                <p className="!text-gray-300 !opacity-100 text-sm md:text-base leading-relaxed">{step.body}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────
   TIER 3 — Pricing Signal
─────────────────────────────────────────────── */
function PricingSignalSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section className="relative py-32" ref={ref}>
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-lg mx-auto text-center"
        >
          <p className="text-xs font-display uppercase tracking-widest text-white/[0.35] mb-3">Investment Range</p>
          <h2 className="font-display text-2xl md:text-3xl font-medium text-white/[0.65] mb-3">
            Typical investment for serious business systems
          </h2>
          <p className="text-white/[0.45] mb-2">
            We typically work with businesses where system reliability directly impacts operations and revenue. Most serious systems fall between{" "}
            <span className="text-cyan-400/90 font-semibold">₹2L and ₹10L</span>
          </p>
          <p className="text-xs text-white/[0.30]">
            No commitment - just clarity on scope, cost, and approach
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────
   Decision Trigger Strip
─────────────────────────────────────────────── */
function DecisionTriggerSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section className="relative" ref={ref}>
      <div className="max-w-2xl mx-auto py-14 px-6 text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-lg md:text-xl font-medium text-white/[0.75] mb-3">
            Most businesses wait until systems break. By then, the cost is already higher.
          </h3>
          <p className="text-sm text-white/[0.45]">
            The right time to fix infrastructure, security, or systems is before they fail - not after.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────
   TIER 1 — Final CTA
─────────────────────────────────────────────── */
function HomeFinalCTA() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  return (
    <section className="relative" ref={ref}>
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at top, rgba(0,180,255,0.09), transparent 70%)" }}
      />
      <div className="section-container py-32 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl border border-white/[0.04] bg-white/[0.02] backdrop-blur-md p-12 md:p-16 text-center"
        >
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top right, rgba(0,180,255,0.06), transparent 50%)" }}
          />
          <div className="relative z-10">
            {/* Eyebrow */}
            <span className="text-xs font-bold tracking-widest text-cyan-500 uppercase mb-4 block">
              NO OBLIGATION. NO GENERIC SOLUTIONS.
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-4">
              Let's figure out what your business actually needs
            </h2>
            <p className="max-w-xl mx-auto mb-10 !text-gray-300 !opacity-100 text-sm md:text-base">
              If you're unsure what your systems can handle - it's better to find out before they're tested.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <motion.div
                animate={{ boxShadow: ["0 0 0px rgba(0,180,255,0)", "0 0 40px rgba(0,180,255,0.4)", "0 0 0px rgba(0,180,255,0)"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="rounded-xl w-full sm:w-auto"
              >
                <WhatsAppCTA
                  context="general"
                  section="footer"
                  buttonText="Get Expert Advice"
                  className="px-10 h-[52px] text-base w-full sm:w-auto rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-semibold shadow-[0_0_30px_rgba(0,180,255,0.3)]"
                />
              </motion.div>
              <WhatsAppCTA
                context="general"
                section="footer"
                buttonText="Talk to an Expert"
                className="px-10 h-[52px] text-base w-full sm:w-auto bg-transparent border-0 text-white/50 hover:text-white shadow-none transition-colors rounded-xl"
              />
            </div>
            {/* Trust line */}
            <span className="text-xs text-white/40 tracking-wide mt-6 block">
              Direct access to engineers. Clear answers. No unnecessary upsell.
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────────
   Page Assembly
─────────────────────────────────────────────── */
const Index = () => {
  return (
    <main className="relative overflow-x-hidden w-full scroll-smooth bg-[#05070A]">
      <SEO
        title="Spirecrest Solutions | IT Infrastructure, Security & Smart Technology"
        description="We engineer reliable, scalable digital infrastructure that drives operational efficiency and protects your bottom line - serving businesses across Lucknow and U.P."
        path="/"
      />

      {/* TIER 1 — Hero */}
      <HeroSection />

      <SectionDivider variant="teal" />

      {/* credibility strip */}
      <TrustMetrics />

      {/* ROI Tracker Section */}
      <section className="relative w-full py-32" data-aos="fade-up">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-bold tracking-[0.2em] text-cyan-500 uppercase mb-4 block">
              THE MATHEMATICS OF INACTION
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Calculate Your Operational Leakage
            </h2>
            <p className="text-white/60 text-sm md:text-base max-w-2xl mx-auto">
              Don't guess what inefficient systems are costing you. Adjust the parameters below to see the exact financial impact of delaying your infrastructure upgrade over the next 12 months.
            </p>
          </div>
          
          <div className="w-full">
            <InteractiveROITracker />
          </div>
        </div>
      </section>

      {/* Metric Bento Grid (Replaces Secondary Proof) */}
      <MetricBentoSection />

      {/* TIER 2 — Problem (Where are things starting to break?) */}
      <SystemDiagnosticScan />

      {/* TIER 2 — Service Paths (Services) */}
      <MVPServices />

      {/* TIER 2 — Authority (Most Vendors Install Components) */}
      <AuthoritySpikeSection />

      <SectionDivider variant="amber" />

      {/* TIER 1 — Flagship Case Study (Built for real business operations) */}
      <FlagshipCaseStudy />

      {/* TIER 3 — Process (How we approach every project) */}
      <HowWeWorkSection />

      {/* capability bento (Built for scale, security, and reliability) */}
      <BentoGrid />

      {/* partner model (Your team) */}
      <PartnerModel />

      {/* TIER 1 — Final CTA */}
      <HomeFinalCTA />
    </main>
  );
};

export default Index;
