import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Zap, Thermometer, Lightbulb, Blinds, Cpu,
  Gauge, Home, Building2, Smartphone, Speaker,
  LucideIcon, ShieldCheck, Tv, Wind, PlugZap,
} from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import CTASection from "@/components/CTASection";

const benefits: BentoItem[] = [
  { icon: Building2, title: "Building Management Systems (BMS)", description: "A single digital platform to control all a building's electrical and mechanical systems: HVAC, lighting, fire safety, and access control from one dashboard.", span: "wide" },
  { icon: Thermometer, title: "HVAC & Energy Management", description: "Automated systems that adjust heating, cooling, and ventilation based on occupancy and time-of-day, lowering utility bills by up to 40%." },
  { icon: Lightbulb, title: "Smart Lighting", description: "Intelligent lights that turn off or dim automatically based on daylight levels or occupancy. Tunable color temperature for circadian comfort." },
  { icon: Blinds, title: "Motorized Curtains & Blinds", description: "Automated window coverings that adjust to the sun's position to keep rooms cool, reduce glare, and enhance privacy, controllable via app or voice." },
  { icon: Cpu, title: "IoT-Based Monitoring", description: "Small sensors tracking equipment health, environmental conditions, air quality, and energy consumption around the clock with real-time alerts." },
  { icon: Gauge, title: "PLC & SCADA Systems", description: "Specialized industrial computer systems to automate and monitor complex manufacturing, water treatment, or large-scale utility processes.", span: "wide" },
  { icon: Home, title: "Smart Home Automation", description: "One-touch control of music, temperature, lighting, curtains, and security via a single app, voice command, or wall-mounted panel." },
  { icon: Smartphone, title: "Central App Control", description: "Unified mobile and tablet interface to manage every connected device: create scenes, set schedules, and monitor from anywhere in the world." },
  { icon: Speaker, title: "Voice Integration", description: "Seamless integration with Alexa, Google Home, and Apple HomeKit for hands-free control of your entire smart environment." },
  { icon: Tv, title: "Home Theatre Automation", description: "Cinematic experiences with automated projection screens, ambient lighting scenes, motorized seating, and immersive Dolby Atmos sound." },
  { icon: Wind, title: "Climate Zoning", description: "Individual room-by-room temperature and humidity control for maximum comfort and energy efficiency across large properties." },
  { icon: PlugZap, title: "Energy Metering & Analytics", description: "Real-time dashboards showing per-device energy consumption, enabling informed decisions to reduce carbon footprint and costs." },
];

/* ───────── Automation Showcase Tabs ───────── */
interface AutomationCategory {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  image: string;
}

const automationCategories: AutomationCategory[] = [
  {
    id: "smart-home",
    icon: Home,
    label: "Smart Home",
    title: "Residential Smart Home Ecosystems",
    description: "Complete IoT integration turning your home into an intelligent environment, from lighting and climate to security and entertainment, all unified under one ecosystem.",
    features: [
      "Scene-based automation: 'Good Morning', 'Movie Night', 'Away' modes",
      "Motorized curtains, blinds, and projection screens with sun-tracking",
      "Multi-room audio with zone-independent streaming and intercom",
      "Smart locks, video doorbells, and panic button integration",
      "Energy monitoring with per-circuit consumption analytics",
    ],
    specs: [
      { label: "Devices Supported", value: "500+ per home" },
      { label: "Protocols", value: "Zigbee / Z-Wave / WiFi" },
      { label: "Voice Assistants", value: "Alexa / Google / Siri" },
      { label: "Response Time", value: "<200ms" },
    ],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "commercial",
    icon: Building2,
    label: "Commercial BMS",
    title: "Commercial Building Management Systems",
    description: "Enterprise-grade BMS solutions for offices, malls, hotels, and hospitals, centralizing control of HVAC, lighting, fire safety, lifts, and access control into a single pane of glass.",
    features: [
      "Occupancy-based HVAC and lighting optimization across floors",
      "Fire alarm and suppression system integration with auto-evacuation protocols",
      "Elevator and escalator monitoring with predictive maintenance alerts",
      "Role-based access for facility managers, tenants, and security staff",
      "Energy dashboards with green building certification (LEED/IGBC) tracking",
    ],
    specs: [
      { label: "Energy Savings", value: "Up to 40%" },
      { label: "Buildings Managed", value: "100+" },
      { label: "Integration", value: "BACnet / Modbus / KNX" },
      { label: "Uptime SLA", value: "99.9%" },
    ],
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "industrial",
    icon: Gauge,
    label: "Industrial SCADA",
    title: "PLC, SCADA & Industrial Automation",
    description: "Mission-critical automation for manufacturing plants, water treatment facilities, and power distribution: real-time monitoring, process control, and safety interlocking.",
    features: [
      "PLC programming (Siemens, Allen-Bradley, Schneider) for process control",
      "SCADA dashboards with real-time process visualization and alarm management",
      "Safety interlock systems (SIL-rated) for hazardous environments",
      "OPC-UA connectivity for IT-OT convergence and IIoT integration",
      "Historian databases for trend analysis and regulatory compliance reporting",
    ],
    specs: [
      { label: "Plants Automated", value: "50+" },
      { label: "I/O Points", value: "Up to 100K" },
      { label: "Protocols", value: "Modbus / Profinet / EtherCAT" },
      { label: "Safety", value: "SIL 2/3 rated" },
    ],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
  },
];

function AutomationShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState(automationCategories[0].id);
  const active = automationCategories.find((c) => c.id === activeTab)!;

  return (
    <section className="py-24 lg:py-32 bg-secondary/50" ref={ref}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">SOLUTION DEEP-DIVE</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">The Intelligent Environment.</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">From luxury homes to industrial plants, explore how we engineer automation at every scale.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.15 }} className="flex flex-wrap justify-center gap-3 mb-12">
          {automationCategories.map((cat) => {
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
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-display font-semibold uppercase tracking-wider mb-4">
                  <active.icon className="w-3.5 h-3.5" />
                  {active.label}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">{active.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{active.description}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {active.specs.map((s) => (
                  <div key={s.label} className="p-4 rounded-xl border border-border bg-card">
                    <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-1">{s.label}</p>
                    <p className="font-display text-lg font-bold text-foreground">{s.value}</p>
                  </div>
                ))}
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
  "KNX", "Zigbee", "Z-Wave", "BACnet", "Modbus",
  "Crestron", "Control4", "Savant", "Lutron", "Sonos",
  "Siemens", "Schneider Electric", "Allen-Bradley", "ABB",
  "Honeywell", "Johnson Controls", "Bosch", "Delta Controls",
  "Arduino", "Raspberry Pi", "ESP32", "MQTT",
  "Node-RED", "Home Assistant", "OPC-UA", "Profinet",
  "Alexa", "Google Home", "Apple HomeKit", "SmartThings",
];

export default function Automation() {
  return (
    <>
      <ServiceHero
        badge="AUTOMATION & CONTROL SYSTEMS"
        title="The Intelligent"
        highlight="Environment."
        description="Using smart technology to connect building systems into one dashboard: save energy, increase comfort, and improve efficiency at every scale."
        stats={[
          { value: "500+", label: "Homes Automated" },
          { value: "40%", label: "Avg. Energy Savings" },
          { value: "100+", label: "Buildings Managed" },
        ]}
      />
      <BentoGrid
        label="CAPABILITIES"
        heading="Control Everything. Intelligently."
        subheading="From smart homes to industrial SCADA systems: seamless automation that adapts to your environment."
        items={benefits}
      />
      <AutomationShowcase />
      <TechMarquee label="AUTOMATION PLATFORMS & PROTOCOLS" items={techStack} />
      <CTASection />
    </>
  );
}
