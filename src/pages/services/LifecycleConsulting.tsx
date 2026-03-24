import { Link } from "react-router-dom";
import { m as motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Presentation, TrendingUp, PieChart,
  Wrench, Package, CreditCard, CalendarCheck, GraduationCap,
  ChevronDown, Briefcase, Gem,
} from "lucide-react";
import SEO from "@/components/SEO";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import CTASection from "@/components/CTASection";

/* ───────── Bento: Venture & Pitch Studio ───────── */
const ventureItems: BentoItem[] = [
  {
    icon: Presentation,
    title: "Investor-Ready Pitchdeck Creation",
    description:
      "Structure your business narrative with clarity, backed by data, financial logic, and a compelling investment story.",
    span: "wide",
  },
  {
    icon: TrendingUp,
    title: "VC & Angel Investor Strategy",
    description:
      "Approach the right investors with a clear strategy, improving positioning, negotiation strength, and funding outcomes.",
  },
  {
    icon: PieChart,
    title: "Financial & Tech Capability Modeling",
    description:
      "Gain a clear understanding of scalability, cost structures, and operational readiness before committing to growth decisions.",
  },
];

/* ───────── Accordion: Operational Lifecycle Support ───────── */
const lifecycleItems = [
  {
    icon: Wrench,
    title: "Turnkey Technology Solutions",
    description:
      "Design, implement, and manage complete systems that support daily operations, scalability, and long-term efficiency.",
  },
  {
    icon: Package,
    title: "Procurement & Vendor Onboarding",
    description:
      "Select and integrate reliable partners that align with your operational and growth requirements.",
  },
  {
    icon: CreditCard,
    title: "Financing Models",
    description:
      "Align capital allocation and funding structures with long-term business objectives.",
  },
  {
    icon: CalendarCheck,
    title: "AMC (Annual Maintenance Contracts)",
    description:
      "Maintain system reliability, reduce operational risks, and ensure continuity across all critical infrastructure.",
  },
  {
    icon: GraduationCap,
    title: "Training & Certification Workshops",
    description:
      "Enable your team to operate efficiently, adapt quickly, and support long-term business scaling.",
  },
];

/* ═══════════ Accordion Section ═══════════ */
function LifecycleAccordion() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 lg:py-32 bg-secondary/50" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            OPERATIONAL EXCELLENCE
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Full Lifecycle Support.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Strategic support combined with execution capability — ensuring your business can scale, adapt, and operate efficiently at every stage.
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {lifecycleItems.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className={`rounded-2xl border bg-card transition-all duration-300 ${
                  isOpen ? "border-accent/30 shadow-lg shadow-accent/5" : "border-border"
                }`}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 p-6 text-left"
                >
                  <div
                    className={`w-11 h-11 shrink-0 rounded-xl flex items-center justify-center transition-colors ${
                      isOpen ? "bg-accent/20" : "bg-accent/10"
                    }`}
                  >
                    <item.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display text-base font-bold text-foreground">
                      {item.title}
                    </h3>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: isOpen ? "auto" : 0,
                    opacity: isOpen ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 pl-[4.75rem]">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════ Executive Differentiator Strip ═══════════ */
function ExecutiveStrip() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const points = [
    { icon: Briefcase, label: "Board-Level Advisory" },
    { icon: Gem, label: "White-Glove Delivery" },
    { icon: TrendingUp, label: "Growth-Stage Focus" },
    { icon: Presentation, label: "Investor Relations" },
  ];

  return (
    <section className="py-16 bg-background border-y border-border" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap justify-center gap-6 md:gap-12"
        >
          {points.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <p.icon className="w-5 h-5 text-accent" />
              </div>
              <span className="font-display text-sm font-semibold text-foreground">
                {p.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════ Page Export ═══════════ */
export default function LifecycleConsulting() {
  return (
    <>
      <SEO
        title="IT Lifecycle & VC Strategy Consulting | Spirecrest India"
        description="From strategic IT procurement advisory and AMC management to investor-grade pitch decks and VC positioning: full-lifecycle consulting for India's growth-stage enterprises. Talk to a Principal."
        path="/services/lifecycle-consulting"
      />
      <ServiceHero
        badge="STRATEGIC LIFECYCLE SUPPORT & VENTURE CONSULTING"
        title="Strategic Guidance for Businesses at"
        highlight="Critical Growth Stages"
        description="When your business is scaling, restructuring, or making high-stakes decisions, the right strategy matters. We help you navigate growth, optimize operations, secure the right opportunities, and build systems that sustain long-term success."
        stats={[
          { value: "₹50Cr+", label: "Funding Facilitated" },
          { value: "100%", label: "Client Retention" },
          { value: "End-to-End", label: "Lifecycle Coverage" },
        ]}
        primaryCTA="Get Expert Advice"
        secondaryCTA="Talk to an Expert"
        showCallCTA={true}
      />
      <ExecutiveStrip />
      <BentoGrid
        label="THE VENTURE & PITCH STUDIO"
        heading="Your Boardroom Arsenal."
        subheading="Strategic capabilities designed to support critical business decisions across growth, funding, operations, and long-term planning."
        items={ventureItems}
      />
      <LifecycleAccordion />
      <div className="section-container pb-2 text-sm text-muted-foreground">
        Need execution support?{" "}
        <Link to="/services/networking" className="text-cyan-400 hover:underline">Explore our infrastructure and technology solutions.</Link>
      </div>
      <p className="text-center text-sm text-muted-foreground max-w-xl mx-auto px-4 pb-2">
        Strategy without execution creates plans. Execution without strategy creates inefficiencies. We ensure both work together.
      </p>
      <CTASection
        heading="Planning your next move, scaling operations, or preparing for growth?"
        subtext="We'll help you make the right decisions with clarity, structure, and execution support."
      />
    </>
  );
}
