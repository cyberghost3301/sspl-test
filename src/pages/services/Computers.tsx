import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { m as motion, useInView, AnimatePresence } from "framer-motion";
import {
  Monitor, Cpu, HardDrive, MemoryStick, Fan,
  Printer, Laptop, Server, Wifi, ShieldCheck,
  Wrench, Gauge, LucideIcon, Headphones, Gamepad2,
} from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import CTASection from "@/components/CTASection";

const benefits: BentoItem[] = [
  { icon: Cpu, title: "Custom PC Builds", description: "Purpose-built workstations, gaming rigs, and enterprise desktops, hand-assembled with premium components, stress-tested, and benchmarked for peak performance.", span: "wide" },
  { icon: Laptop, title: "Laptop & Desktop Sales", description: "Curated selection of business laptops, ultrabooks, and desktop systems from Dell, HP, Lenovo, and Apple with enterprise licensing and warranty." },
  { icon: HardDrive, title: "Storage & NAS Solutions", description: "High-capacity storage systems including NAS, SAN, and DAS configurations for small offices to enterprise data centers with RAID and hot-swap support." },
  { icon: Printer, title: "Printers & Peripherals", description: "Enterprise-grade printers, scanners, UPS systems, and peripherals with managed print services and toner subscription programs." },
  { icon: Server, title: "Server & Rack Infrastructure", description: "Tower and rack-mount server deployments with hypervisor configuration, remote management (iDRAC/iLO), and hardware RAID setup.", span: "wide" },
  { icon: MemoryStick, title: "RAM & Component Upgrades", description: "Memory upgrades, SSD migrations, GPU installations, and component-level repairs to extend the life and performance of existing hardware." },
  { icon: Fan, title: "Cooling & Thermal Solutions", description: "Custom liquid cooling loops, thermal paste reapplication, and airflow optimization for high-performance and server environments." },
  { icon: Wifi, title: "Networking Hardware", description: "Routers, switches, access points, and network interface cards, from small office setups to enterprise campus deployments." },
  { icon: Wrench, title: "Hardware Repair & AMC", description: "Component-level laptop and desktop repairs, annual maintenance contracts with guaranteed response times, and on-site support." },
  { icon: Gauge, title: "Performance Benchmarking", description: "Comprehensive system benchmarks, bottleneck analysis, and optimization recommendations for workstations and servers." },
  { icon: Headphones, title: "AV & Conferencing Hardware", description: "Webcams, headsets, speakerphones, and conferencing equipment for hybrid work setups: Poly, Jabra, Logitech, and more." },
  { icon: Gamepad2, title: "Gaming & Creator Builds", description: "High-end gaming PCs and content creation workstations with custom RGB, water cooling, and boutique case modifications." },
];

/* ───────── Computer Solutions Tabs ───────── */
interface CompCategory {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  image: string;
}

const compCategories: CompCategory[] = [
  {
    id: "custom-builds",
    icon: Cpu,
    label: "Custom Builds",
    title: "Bespoke PC & Workstation Builds",
    description: "From silent productivity workstations to liquid-cooled gaming beasts, every build is hand-assembled, cable-managed, stress-tested, and delivered with a full benchmark report.",
    features: [
      "Component selection optimized for your exact workload (CAD, video editing, gaming, AI)",
      "Custom liquid cooling loops with hardline tubing and RGB integration",
      "Cable management and airflow optimization for thermal efficiency",
      "48-hour burn-in testing with thermal, memory, and GPU stress tests",
      "Post-delivery support with 1-year hardware warranty and remote diagnostics",
    ],
    specs: [
      { label: "Builds Delivered", value: "800+" },
      { label: "Failure Rate", value: "<0.5%" },
      { label: "Avg. Build Time", value: "5-7 days" },
      { label: "Warranty", value: "1-3 years" },
    ],
    image: "https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "enterprise-it",
    icon: Server,
    label: "Enterprise IT",
    title: "Enterprise Hardware & Server Infrastructure",
    description: "Rack-mount servers, blade systems, and hyper-converged infrastructure: procurement, configuration, deployment, and ongoing management for businesses of all sizes.",
    features: [
      "Server procurement from Dell, HPE, Lenovo, and Supermicro",
      "Hypervisor installation: VMware ESXi, Proxmox, Hyper-V",
      "RAID configuration with hot-spare and auto-rebuild policies",
      "Remote management setup (iDRAC, iLO, IPMI) for lights-out operations",
      "Rack layout design, PDU planning, and structured cabling within cabinets",
    ],
    specs: [
      { label: "Servers Deployed", value: "500+" },
      { label: "Uptime Achieved", value: "99.99%" },
      { label: "Brands", value: "Dell / HPE / Lenovo" },
      { label: "Support", value: "24/7 on-site" },
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "repair-amc",
    icon: Wrench,
    label: "Repair & AMC",
    title: "Hardware Repair & Maintenance Contracts",
    description: "Component-level diagnostics, board-level repairs, and annual maintenance contracts with guaranteed SLA response times, keeping your fleet running without surprises.",
    features: [
      "Component-level motherboard and laptop repairs with micro-soldering",
      "SSD data recovery and secure data destruction services",
      "Managed fleet lifecycle: procurement, deployment, refresh, and disposal",
      "On-site and remote support with 4-hour / next-business-day SLA options",
      "Quarterly health reports with asset inventory and replacement forecasting",
    ],
    specs: [
      { label: "Devices Serviced", value: "10,000+" },
      { label: "First-Fix Rate", value: "92%" },
      { label: "SLA Options", value: "4hr / NBD / 48hr" },
      { label: "AMC Clients", value: "150+" },
    ],
    image: "https://images.unsplash.com/photo-1597872200969-2b65d56bd16b?q=80&w=600&auto=format&fit=crop",
  },
];

function ComputerTabs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState(compCategories[0].id);
  const active = compCategories.find((c) => c.id === activeTab)!;

  return (
    <section className="py-24 lg:py-32 bg-secondary/50" ref={ref}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">SOLUTION DEEP-DIVE</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">Hardware, Engineered.</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">From boutique PC builds to enterprise server rooms: precision hardware solutions at every scale.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.15 }} className="flex flex-wrap justify-center gap-3 mb-12">
          {compCategories.map((cat) => {
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
          <motion.div key={active.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35 }} className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-display font-semibold uppercase tracking-wider mb-4"><active.icon className="w-3.5 h-3.5" />{active.label}</div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{active.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{active.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {active.specs.map((s) => (<div key={s.label} className="p-4 rounded-xl border border-border bg-card"><p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-1">{s.label}</p><p className="font-display text-lg font-bold text-foreground">{s.value}</p></div>))}
              </div>
              <div className="space-y-3">
                {active.features.map((f, i) => (
                  <motion.div key={f} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: i * 0.06 }} className="flex items-start gap-3">
                    <div className="w-5 h-5 mt-0.5 shrink-0 rounded-full bg-accent/10 flex items-center justify-center"><ShieldCheck className="w-3 h-3 text-accent" /></div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{f}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-muted">
              <motion.img key={active.image} initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} src={active.image} alt={active.title} className="w-full h-full object-cover" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4"><div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm"><active.icon className="w-4 h-4 text-accent" /><span className="text-xs font-display font-semibold text-white">{active.label}</span></div></div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

const techStack = [
  "Intel", "AMD", "NVIDIA", "Corsair", "G.Skill",
  "Samsung", "Western Digital", "Seagate", "Kingston",
  "ASUS", "MSI", "Gigabyte", "ASRock", "NZXT",
  "Cooler Master", "Lian Li", "be quiet!", "Noctua",
  "Dell", "HP", "Lenovo", "Apple",
  "Logitech", "Razer", "SteelSeries", "HyperX",
  "APC", "CyberPower", "Epson", "Brother",
  "Poly", "Jabra", "Elgato", "Wacom",
];

export default function Computers() {
  return (
    <>
      <ServiceHero
        badge="COMPUTER SOLUTIONS & HARDWARE"
        title="Hardware That"
        highlight="Performs."
        description="Custom PC builds, enterprise IT procurement, server infrastructure, and hardware maintenance: precision-engineered solutions for every computing need. System failures, downtime, or poor infrastructure directly impact productivity and revenue."
        stats={[
          { value: "800+", label: "Custom Builds" },
          { value: "10,000+", label: "Devices Serviced" },
          { value: "150+", label: "AMC Clients" },
        ]}
        primaryCTA="Get Expert Advice"
        secondaryCTA="Talk to an Expert"
        showCallCTA={true}
      />
      <BentoGrid
        label="CAPABILITIES"
        heading="Complete Computer Solutions."
        subheading="From boutique gaming rigs to enterprise server rooms, we handle every layer of the hardware stack. Every solution is engineered for performance, scalability, and long-term reliability."
        items={benefits}
      />
      <ComputerTabs />
      <TechMarquee label="HARDWARE PARTNERS & BRANDS" items={techStack} />
      <div className="section-container pb-2 text-sm text-muted-foreground">
        Need networking and infrastructure?{" "}
        <Link to="/services/networking" className="text-cyan-400 hover:underline">Explore our IT infrastructure solutions.</Link>
      </div>
      <CTASection heading="Tell us what you're trying to achieve. We'll tell you exactly what you need — no upselling, no guesswork." />
    </>
  );
}
