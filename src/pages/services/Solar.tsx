import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Sun, BatteryCharging, Gauge, Leaf, BarChart3,
  Zap, Building2, ShieldCheck, Factory, Plug,
} from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import CTASection from "@/components/CTASection";

const benefits: BentoItem[] = [
  { icon: Sun, title: "Solar Energy Solutions", description: "Design and setup of solar panel arrays for rooftops, ground-mounted systems, or fully off-grid power — reducing reliance on the traditional power grid.", span: "wide" },
  { icon: BatteryCharging, title: "UPS & Backup Power", description: "Battery and conditioning systems that provide instant, clean power during outages to protect sensitive equipment with automatic switchover." },
  { icon: Gauge, title: "Energy Monitoring Dashboards", description: "Software that shows real-time energy use per circuit, per floor, or per building — helping you identify where you can cut costs and waste." },
  { icon: Leaf, title: "Green Building Automation", description: "Technology designed specifically to help buildings earn environmental certifications like LEED and IGBC — automated compliance tracking.", span: "wide" },
  { icon: BarChart3, title: "Carbon Footprint Tracking", description: "Tools that measure and report an organization's total environmental impact for regulatory compliance or CSR purposes with audit-ready reports." },
  { icon: Zap, title: "Smart Grid Integration", description: "Advanced monitoring systems for community-wide solar energy distribution, battery storage, and net-metering configuration." },
  { icon: Building2, title: "Commercial Solar Projects", description: "Large-scale commercial and industrial solar installations with ROI modeling, subsidy optimization, and grid-tie engineering." },
  { icon: Factory, title: "Industrial Power Solutions", description: "Heavy-duty power conditioning, harmonic filtering, and power factor correction for manufacturing and industrial facilities." },
  { icon: Plug, title: "EV Charging Infrastructure", description: "Electric vehicle charging station installation for residential complexes, commercial buildings, and fleet depots." },
  { icon: ShieldCheck, title: "Energy Audits & Compliance", description: "Comprehensive energy audits per BEE standards with actionable recommendations and regulatory compliance documentation." },
];

/* ───────── Impact Stats Strip ───────── */
function SolarImpact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const stats = [
    { value: "5MW+", label: "Total Capacity Installed" },
    { value: "30%", label: "Avg. Cost Reduction" },
    { value: "₹12Cr+", label: "Client Savings Generated" },
    { value: "100%", label: "Renewable Projects" },
  ];

  return (
    <section className="py-20 bg-secondary/50" ref={ref}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">IMPACT METRICS</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Sustainable Resilience, Measured.</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: i * 0.1 }} className="p-6 rounded-2xl border border-border bg-card text-center">
              <p className="font-display text-2xl md:text-3xl font-bold text-accent">{s.value}</p>
              <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const techStack = [
  "Tata Power Solar", "Adani Solar", "Havells", "Luminous",
  "Schneider Electric", "SMA Inverters", "Fronius", "Growatt",
  "Enphase", "SolarEdge", "Jinko Solar", "Canadian Solar",
  "LONGi", "Trina Solar", "ABB", "Delta Inverters",
  "Exide", "Amaron", "Livguard", "Microtek",
  "APC", "Vertiv", "Eaton", "Riello UPS",
];

export default function Solar() {
  return (
    <>
      <ServiceHero
        badge="ENERGY & SUSTAINABILITY"
        title="Sustainable"
        highlight="Resilience."
        description="Eco-friendly technology focused on reducing your carbon footprint and providing reliable green power — from rooftop solar to grid-scale energy solutions."
        stats={[
          { value: "5MW+", label: "Capacity Installed" },
          { value: "30%", label: "Avg. Cost Reduction" },
          { value: "Pan-India", label: "Service Coverage" },
        ]}
      />
      <BentoGrid
        label="CAPABILITIES"
        heading="Clean Energy. Smart Power."
        subheading="From residential rooftop panels to industrial power conditioning — green energy solutions that pay for themselves."
        items={benefits}
      />
      <SolarImpact />
      <TechMarquee label="ENERGY PARTNERS & HARDWARE" items={techStack} />
      <CTASection />
    </>
  );
}
