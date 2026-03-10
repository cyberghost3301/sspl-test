import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Camera, Eye, Cloud, Brain, ShieldCheck, Radio,
  Wifi, HardDrive, Bell, MapPin, Cctv, Lock,
  Monitor, Zap, Settings, BarChart3, Layers, Signal,
  Building2, Truck, Warehouse, ShieldAlert, ScanFace, Fingerprint,
  Network, Server, Video, Gauge, LayoutGrid, BatteryCharging,
  ScanLine, Package, CarFront, FlaskConical, LucideIcon,
} from "lucide-react";
import SEO from "@/components/SEO";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import CTASection from "@/components/CTASection";

const benefits: BentoItem[] = [
  { icon: Camera, title: "24/7 Monitoring", description: "Round-the-clock surveillance with real-time alerts, remote access, and automated incident logging across all connected devices.", span: "wide" },
  { icon: Brain, title: "AI Threat Detection", description: "Machine learning powered analytics that identify unusual activity patterns, intrusion attempts, and potential threats before they escalate." },
  { icon: Cloud, title: "Cloud Backup & Storage", description: "Secure, redundant cloud storage for all footage with configurable retention policies and instant retrieval capabilities." },
  { icon: ShieldCheck, title: "Access Control Systems", description: "Biometric readers, smart card systems, and multi-factor authentication for physical premises and restricted zones." },
  { icon: Eye, title: "Remote Viewing", description: "Monitor your entire infrastructure from any device, anywhere in the world with encrypted live feeds and multi-site dashboards." },
  { icon: Radio, title: "Network Integration", description: "Seamless integration with existing IT infrastructure, PoE switches, NVRs, and enterprise network management systems." },
  { icon: ScanFace, title: "Facial Recognition", description: "Advanced facial recognition technology for visitor management, employee attendance tracking, and VIP/blacklist alerts in real time.", span: "wide" },
  { icon: Fingerprint, title: "Biometric Authentication", description: "Multi-modal biometric systems including fingerprint, iris scan, and palm vein recognition for high-security zones." },
  { icon: MapPin, title: "Geofencing & GPS Tracking", description: "Virtual perimeter alerts and GPS-enabled asset tracking for fleet management, logistics, and campus-wide security coverage." },
  { icon: Bell, title: "Smart Alert Systems", description: "Configurable notification workflows via SMS, email, and push notifications with escalation hierarchies and automated incident ticketing." },
  { icon: Video, title: "Video Analytics Dashboard", description: "Centralized analytics with heatmaps, people counting, dwell time analysis, and crowd density monitoring for operational insights.", span: "wide" },
  { icon: Gauge, title: "Performance Monitoring", description: "Real-time health monitoring of all cameras, NVRs, and network components with proactive maintenance alerts and uptime reporting." },
  { icon: LayoutGrid, title: "Multi-Site Management", description: "Unified command center for managing surveillance across multiple locations with role-based access and centralized policy enforcement." },
  { icon: Warehouse, title: "Warehouse & Industrial Security", description: "Specialized solutions for warehouses, factories, and industrial zones including explosion-proof cameras and hazardous area monitoring." },
  { icon: Building2, title: "Smart Building Integration", description: "Integrate surveillance with building management systems for fire alarms, HVAC, elevators, and emergency evacuation protocols." },
  { icon: Truck, title: "Fleet & Vehicle Monitoring", description: "ANPR-based vehicle tracking, parking management, speed detection, and automated entry/exit logging for gated premises." },
  { icon: Lock, title: "Cybersecurity for CCTV", description: "End-to-end encryption, firmware hardening, and network segmentation to protect your surveillance infrastructure from cyber threats." },
  { icon: ShieldAlert, title: "Intrusion Detection", description: "Perimeter intrusion detection systems with laser barriers, motion sensors, vibration detection, and instant alarm triggering." },
  { icon: BatteryCharging, title: "UPS & Power Backup", description: "Uninterruptible power supply solutions ensuring zero downtime during outages with automatic switchover and battery health monitoring." },
  { icon: Network, title: "Structured Cabling", description: "Professional structured cabling for surveillance networks including Cat6/Cat6a, fiber optic runs, and cable management systems." },
  { icon: Server, title: "On-Premise NVR Solutions", description: "High-capacity on-premise NVR deployments with RAID storage, hot-swappable drives, and redundant recording for mission-critical environments." },
  { icon: Settings, title: "AMC & Maintenance", description: "Annual maintenance contracts with scheduled inspections, firmware updates, hardware replacement, and 24/7 priority support." },
  { icon: BarChart3, title: "Compliance Reporting", description: "Automated compliance reports for insurance, regulatory audits, and legal proceedings with tamper-proof evidence chain management." },
  { icon: Signal, title: "Wireless Surveillance", description: "Wire-free camera deployments using solar-powered, battery-backed, and mesh-networked systems for remote and hard-to-wire locations." },
  { icon: Monitor, title: "Command Center Design", description: "Purpose-built monitoring rooms with video walls, ergonomic operator stations, and redundant display systems for 24/7 security operations." },
  { icon: Layers, title: "Scalable Architecture", description: "Modular surveillance frameworks that grow with your organization, from a single site to nationwide deployments without infrastructure overhauls." },
];

const techStack = [
  "Ubiquiti UniFi", "Hikvision", "Dahua", "Axis Communications",
  "IP Cameras", "PTZ Systems", "NVR/DVR", "PoE Switches",
  "Biometric Scanners", "RFID Access", "Cloud NVR", "AI Analytics",
  "Thermal Imaging", "LiDAR Sensors", "ANPR Systems",
  "Honeywell", "Bosch Security", "Pelco", "Samsung Hanwha",
  "Genetec", "Milestone XProtect", "FLIR Systems", "Avigilon",
  "ZKTeco", "Suprema", "Vivotek", "Mobotix",
  "Synology NAS", "Western Digital Purple", "Seagate SkyHawk",
  "TP-Link VIGI", "Reolink", "Amcrest", "Lorex",
  "Verkada", "Eagle Eye Networks", "Rhombus", "OpenEye",
  "Commscope", "Panduit", "Leviton", "Belden Cabling",
];

/* ───────── Defense Hardware Tabs ───────── */
interface HardwareCategory {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  specs: { label: string; value: string }[];
  features: string[];
  image: string;
}

const hardwareCategories: HardwareCategory[] = [
  {
    id: "metal-detectors",
    icon: ScanLine,
    label: "Metal Detectors",
    title: "Walk-Through & Handheld Metal Detectors",
    description:
      "High-sensitivity multi-zone detection systems for airports, government buildings, event venues, and high-security campuses. Configurable sensitivity zones with visual and audio pinpointing.",
    specs: [
      { label: "Detection Zones", value: "Up to 33 zones" },
      { label: "Sensitivity", value: "Adjustable 0-999" },
      { label: "Throughput", value: "60+ persons/min" },
      { label: "Compliance", value: "CE / FCC / ROHS" },
    ],
    features: [
      "Multi-zone pinpoint detection with LCD zone indication",
      "Weatherproof options for outdoor deployment (IP65)",
      "Handheld wands for secondary screening with vibration alert",
      "Network-connected models with central logging & analytics",
      "Battery backup for uninterrupted checkpoint operation",
    ],
    image: "https://images.unsplash.com/photo-1585432959361-e45878e45518?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "xray-scanners",
    icon: Package,
    label: "X-Ray Baggage Scanners",
    title: "X-Ray Baggage Inspection Systems",
    description:
      "Dual-energy X-ray scanners with organic/inorganic material differentiation for screening luggage, parcels, and cargo at entry points. Color-coded threat imaging with operator-assist AI.",
    specs: [
      { label: "Tunnel Size", value: "Up to 100×80 cm" },
      { label: "Penetration", value: "34mm steel" },
      { label: "Wire Resolution", value: "AWG 38 (0.1mm)" },
      { label: "Detection", value: "Organic / Inorganic / Mixed" },
    ],
    features: [
      "Dual-energy imaging with automatic color-coded material classification",
      "Threat-image projection (TIP) for operator alertness testing",
      "AI-assisted auto-detection of explosives, weapons, and contraband",
      "Conveyor speeds configurable for high-throughput or detailed inspection",
      "Network integration with centralized monitoring and image archival",
    ],
    image: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "uvis",
    icon: CarFront,
    label: "Under-Vehicle (UVIS)",
    title: "Under-Vehicle Inspection Systems",
    description:
      "Automated under-vehicle surveillance systems capable of scanning vehicles moving at up to 75 km/h. High-resolution imaging with ANPR integration for comprehensive vehicular security.",
    specs: [
      { label: "Max Speed", value: "75 km/h" },
      { label: "Resolution", value: "4K line-scan" },
      { label: "ANPR", value: "Integrated" },
      { label: "Operation", value: "24/7 all-weather" },
    ],
    features: [
      "Real-time under-chassis scanning without stopping vehicles",
      "Automatic comparison with baseline images, flagging anomalies instantly",
      "Integrated ANPR for license plate capture and database cross-referencing",
      "All-weather operation with flush-mounted or portable deployment options",
      "Centralized archive with searchable vehicle history and alert tagging",
    ],
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0220?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "etd",
    icon: FlaskConical,
    label: "Explosive Trace (ETD)",
    title: "Explosive Trace Detection Systems",
    description:
      "Ion Mobility Spectrometry (IMS) based trace detectors for identifying explosive residues and narcotics at security checkpoints, mail rooms, and VIP protection details.",
    specs: [
      { label: "Analysis Time", value: "< 8 seconds" },
      { label: "Detection", value: "Military & commercial explosives" },
      { label: "Substances", value: "40+ threat compounds" },
      { label: "Sampling", value: "Swab & vapor" },
    ],
    features: [
      "Detects trace amounts of TATP, RDX, TNT, PETN, and 40+ compounds",
      "Dual-mode: swab sampling for surfaces and vapor mode for proximity detection",
      "Portable and desktop variants for flexible deployment scenarios",
      "Auto-calibrating with minimal maintenance and low consumable costs",
      "Networked reporting with audit-ready chain-of-custody logging",
    ],
    image: "https://images.unsplash.com/photo-1582560475093-ba66accbc953?q=80&w=600&auto=format&fit=crop",
  },
];

function DefenseHardwareTabs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState(hardwareCategories[0].id);
  const active = hardwareCategories.find((c) => c.id === activeTab)!;

  return (
    <section className="py-24 lg:py-32 bg-secondary/50" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            ADVANCED DEFENSE HARDWARE
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Beyond Cameras. Full-Spectrum Security.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            We deploy military-grade detection and inspection hardware for facilities that demand zero compromise.
          </p>
        </motion.div>

        {/* Tab Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {hardwareCategories.map((cat) => {
            const isActive = cat.id === activeTab;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`group flex items-center gap-2.5 px-5 py-3 rounded-xl border-2 text-sm font-display font-semibold transition-all duration-300 ${
                  isActive
                    ? "border-accent bg-accent/10 text-accent shadow-md shadow-accent/10"
                    : "border-border bg-card text-muted-foreground hover:border-accent/30 hover:text-foreground"
                }`}
              >
                <cat.icon className={`w-4 h-4 transition-colors ${isActive ? "text-accent" : "text-muted-foreground group-hover:text-foreground"}`} />
                {cat.label}
              </button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start"
          >
            {/* Left */}
            <div className="space-y-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-[11px] font-display font-semibold uppercase tracking-wider mb-4">
                  <active.icon className="w-3.5 h-3.5" />
                  {active.label}
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {active.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {active.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {active.specs.map((spec) => (
                  <div key={spec.label} className="p-4 rounded-xl border border-border bg-card">
                    <p className="text-xs text-muted-foreground font-display uppercase tracking-wider mb-1">{spec.label}</p>
                    <p className="font-display text-lg font-bold text-foreground">{spec.value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                {active.features.map((feature, i) => (
                  <motion.div
                    key={feature}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.06 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-5 h-5 mt-0.5 shrink-0 rounded-full bg-accent/10 flex items-center justify-center">
                      <ShieldCheck className="w-3 h-3 text-accent" />
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right */}
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-muted">
              <motion.img
                key={active.image}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src={active.image}
                alt={active.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm">
                  <active.icon className="w-4 h-4 text-accent" />
                  <span className="text-xs font-display font-semibold text-white">{active.label}</span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

export default function Surveillance() {
  return (
    <>
      <SEO
        title="X-Ray, UVIS & Metal Detector Systems | Enterprise Security"
        description="Supplying X-ray baggage scanners, UVIS under-vehicle systems & walkthrough detectors for government buildings and corporate campuses across India. Request a procurement quote."
        path="/services/enterprise-surveillance-physical-security"
      />
      <ServiceHero
        badge="SURVEILLANCE & SECURITY"
        title="Uncompromising Security"
        highlight="Infrastructure."
        description="Enterprise-grade surveillance systems, access control, and 24/7 monitoring solutions engineered for maximum protection and peace of mind."
        stats={[
          { value: "3000+", label: "Cameras Deployed" },
          { value: "99.9%", label: "Uptime SLA" },
          { value: "24/7", label: "Monitoring" },
        ]}
      />
      <BentoGrid
        label="KEY BENEFITS"
        heading="Why Spirecrest Surveillance"
        subheading="Battle-tested security infrastructure that scales from small offices to enterprise campuses."
        items={benefits}
      />
      <DefenseHardwareTabs />
      <TechMarquee label="HARDWARE & TECH PARTNERS" items={techStack} />
      <CTASection />
    </>
  );
}
