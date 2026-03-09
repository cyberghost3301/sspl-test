import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Presentation, TrendingUp, PieChart,
  Wrench, Package, CreditCard, CalendarCheck, GraduationCap,
  ChevronDown, Briefcase, Gem,
} from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import CTASection from "@/components/CTASection";

/* ───────── Bento: Venture & Pitch Studio ───────── */
const ventureItems: BentoItem[] = [
  {
    icon: Presentation,
    title: "Investor-Ready Pitchdeck Creation",
    description:
      "We craft compelling, data-backed pitch decks that tell your story with conviction, designed to convert boardroom skeptics into committed backers.",
    span: "wide",
  },
  {
    icon: TrendingUp,
    title: "VC & Angel Investor Strategy",
    description:
      "End-to-end fundraising strategy: target investor profiling, warm introductions, term-sheet negotiation support, and due-diligence preparation.",
  },
  {
    icon: PieChart,
    title: "Financial & Tech Capability Modeling",
    description:
      "Robust financial projections, unit economics, and technology capability roadmaps that demonstrate scalability and de-risk your venture for investors.",
  },
];

/* ───────── Accordion: Operational Lifecycle Support ───────── */
const lifecycleItems = [
  {
    icon: Wrench,
    title: "Turnkey Technology Solutions",
    description:
      "Ready-to-operate, custom-built infrastructure delivered end-to-end — from procurement and configuration to deployment and handover. Zero gaps, zero guesswork.",
  },
  {
    icon: Package,
    title: "Procurement & Vendor Onboarding",
    description:
      "Expert curation and vetting of hardware and software vendors, contract negotiation, SLA structuring, and seamless onboarding into your existing ecosystem.",
  },
  {
    icon: CreditCard,
    title: "Financing Models",
    description:
      "Strategic guidance on CAPEX vs. OPEX technology subscriptions, leasing structures, and financing options that align with your cash-flow and growth stage.",
  },
  {
    icon: CalendarCheck,
    title: "AMC (Annual Maintenance Contracts)",
    description:
      "Scheduled, preventative systems care with guaranteed response times, proactive health checks, firmware updates, and priority escalation paths.",
  },
  {
    icon: GraduationCap,
    title: "Training & Certification Workshops",
    description:
      "Structured upskilling programs for your staff on new technology platforms, cybersecurity best practices, compliance protocols, and operational workflows.",
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
            From day-zero deployment to year-ten maintenance, we stay with you at every stage of the technology lifecycle.
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
      <ServiceHero
        badge="STRATEGIC LIFECYCLE SUPPORT & VENTURE CONSULTING"
        title="Strategic Lifecycle Partnership &"
        highlight="Venture Consulting."
        description="Beyond technology. We architect growth, secure funding, and guarantee operational continuity."
        stats={[
          { value: "₹50Cr+", label: "Funding Facilitated" },
          { value: "100%", label: "Client Retention" },
          { value: "End-to-End", label: "Lifecycle Coverage" },
        ]}
      />
      <ExecutiveStrip />
      <BentoGrid
        label="THE VENTURE & PITCH STUDIO"
        heading="Your Boardroom Arsenal."
        subheading="High-ticket business consulting that turns ambitious ideas into fundable, scalable ventures."
        items={ventureItems}
      />
      <LifecycleAccordion />
      <CTASection />
    </>
  );
}
