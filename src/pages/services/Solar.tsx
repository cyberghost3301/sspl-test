import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Sun, BatteryCharging, Gauge, Leaf, BarChart3,
  Zap, Building2, ShieldCheck, Factory, Plug, LucideIcon,
  CloudSun, TrendingDown, Award, Sparkles,
} from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import CTASection from "@/components/CTASection";

const benefits: BentoItem[] = [
  { icon: Sun, title: "Solar Energy Solutions", description: "Design and setup of solar panel arrays for rooftops, ground-mounted systems, or fully off-grid power, reducing reliance on the traditional power grid.", span: "wide" },
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

/* ───────── Interactive Solar ROI Calculator Visual ───────── */
function SolarROIShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [activeSystem, setActiveSystem] = useState<"residential" | "commercial" | "industrial">("commercial");

  const systems = {
    residential: {
      icon: Sun,
      label: "Residential Solar",
      capacity: "5 kW",
      panels: "15 panels",
      savings: "₹35,000/year",
      payback: "4-5 years",
      image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=600&auto=format&fit=crop",
    },
    commercial: {
      icon: Building2,
      label: "Commercial Solar",
      capacity: "100 kW",
      panels: "300 panels",
      savings: "₹12L/year",
      payback: "3-4 years",
      image: "https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=600&auto=format&fit=crop",
    },
    industrial: {
      icon: Factory,
      label: "Industrial Solar",
      capacity: "1 MW",
      panels: "3000 panels",
      savings: "₹1.2Cr/year",
      payback: "2-3 years",
      image: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?q=80&w=600&auto=format&fit=crop",
    },
  };

  const active = systems[activeSystem];
  const Icon = active.icon;

  return (
    <section className="relative py-32 lg:py-40 overflow-hidden bg-gradient-to-br from-accent/5 via-background to-accent/5" ref={ref}>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent rounded-full blur-[120px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="section-container relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-16">
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">SOLAR ROI CALCULATOR</p>
          <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold text-foreground mb-4">
            Your Power.<br />Your <span className="text-gradient">Savings</span>.
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">See how solar pays for itself — faster than you think.</p>
        </motion.div>

        {/* System Type Selector */}
        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.2 }} className="flex flex-wrap justify-center gap-4 mb-16">
          {(Object.keys(systems) as Array<keyof typeof systems>).map((key) => {
            const isActive = key === activeSystem;
            const sys = systems[key];
            const SysIcon = sys.icon;
            return (
              <button
                key={key}
                onClick={() => setActiveSystem(key)}
                className={`group flex items-center gap-3 px-6 py-4 rounded-2xl border-2 text-sm font-display font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-accent bg-gradient-to-br from-accent/20 to-accent/5 text-accent shadow-xl shadow-accent/20 scale-105"
                    : "border-border bg-card text-muted-foreground hover:border-accent/30 hover:text-foreground hover:scale-105"
                }`}
              >
                <SysIcon className={`w-5 h-5 transition-colors ${isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground"}`} />
                {sys.label}
              </button>
            );
          })}
        </motion.div>

        {/* System Details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSystem}
            initial={{ opacity: 0, y: 24, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -24, scale: 0.95 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto"
          >
            {/* Left: Image */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-accent/20 to-accent/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] shadow-2xl">
                <motion.img
                  key={active.image}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  src={active.image}
                  alt={active.label}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-6 right-6">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                    <Icon className="w-5 h-5 text-accent" />
                    <span className="text-sm font-display font-semibold text-white">{active.label}</span>
                  </div>
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-accent/20 backdrop-blur-md border border-accent/30">
                    <Sparkles className="w-4 h-4 text-accent" />
                    <span className="text-xs font-display font-semibold text-white">Active Generation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Stats Grid */}
            <div className="space-y-6">
              <div>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">{active.label}</h3>
                <p className="text-muted-foreground leading-relaxed">High-efficiency solar installation with smart monitoring, net-metering, and 25-year performance warranty.</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.1 }}
                  className="group p-6 rounded-2xl border-2 border-border bg-gradient-to-br from-card to-secondary/30 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
                >
                  <CloudSun className="w-8 h-8 text-accent mb-3" />
                  <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-1">System Capacity</p>
                  <p className="font-display text-2xl font-bold text-foreground">{active.capacity}</p>
                  <p className="text-xs text-muted-foreground mt-1">{active.panels}</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 }}
                  className="group p-6 rounded-2xl border-2 border-border bg-gradient-to-br from-card to-secondary/30 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
                >
                  <TrendingDown className="w-8 h-8 text-accent mb-3" />
                  <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-1">Annual Savings</p>
                  <p className="font-display text-2xl font-bold text-accent">{active.savings}</p>
                  <p className="text-xs text-muted-foreground mt-1">Avg. electricity cost</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  className="group p-6 rounded-2xl border-2 border-border bg-gradient-to-br from-card to-secondary/30 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
                >
                  <BarChart3 className="w-8 h-8 text-accent mb-3" />
                  <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-1">Payback Period</p>
                  <p className="font-display text-2xl font-bold text-foreground">{active.payback}</p>
                  <p className="text-xs text-muted-foreground mt-1">With govt. subsidies</p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 }}
                  className="group p-6 rounded-2xl border-2 border-border bg-gradient-to-br from-card to-secondary/30 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
                >
                  <Award className="w-8 h-8 text-accent mb-3" />
                  <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-1">Warranty</p>
                  <p className="font-display text-2xl font-bold text-foreground">25 years</p>
                  <p className="text-xs text-muted-foreground mt-1">Performance guarantee</p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="pt-4"
              >
                <div className="p-5 rounded-xl bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20">
                  <div className="flex items-start gap-3">
                    <Leaf className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="font-display font-semibold text-foreground mb-1">Environmental Impact</p>
                      <p className="text-sm text-muted-foreground">Equivalent to planting 200+ trees annually. Reduce your carbon footprint by 80%.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ───────── Impact Stats Strip ───────── */
function SolarImpact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const stats = [
    { value: "5MW+", label: "Total Capacity Installed", icon: Zap },
    { value: "30%", label: "Avg. Cost Reduction", icon: TrendingDown },
    { value: "₹12Cr+", label: "Client Savings Generated", icon: BarChart3 },
    { value: "100%", label: "Renewable Projects", icon: Leaf },
  ];

  return (
    <section className="py-20 bg-secondary/50" ref={ref}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-12">
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">IMPACT METRICS</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">Sustainable Resilience, Measured.</h2>
        </motion.div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="group p-6 rounded-2xl border border-border bg-card text-center hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
              >
                <Icon className="w-8 h-8 text-accent mx-auto mb-3" />
                <p className="font-display text-2xl md:text-3xl font-bold text-accent">{s.value}</p>
                <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mt-2">{s.label}</p>
              </motion.div>
            );
          })}
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
      <SolarROIShowcase />
      <SolarImpact />
      <TechMarquee label="ENERGY PARTNERS & HARDWARE" items={techStack} />
      <CTASection />
    </>
  );
}
