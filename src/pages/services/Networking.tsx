import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  Network, Server, Cloud, Wifi, HardDrive, Shield,
  Globe, Cpu, Cable, Radio, Database, Gauge,
  LucideIcon, ShieldCheck, RefreshCw, Layers,
} from "lucide-react";
import ServiceHero from "@/components/services/ServiceHero";
import BentoGrid, { BentoItem } from "@/components/services/BentoGrid";
import TechMarquee from "@/components/services/TechMarquee";
import CTASection from "@/components/CTASection";

const benefits: BentoItem[] = [
  { icon: Cable, title: "Structured Cabling", description: "The physical wiring — fiber optics, Cat6/6a, and cable management systems — that connects all office hardware to each other and the internet.", span: "wide" },
  { icon: Wifi, title: "Mesh & Enterprise Wi-Fi", description: "High-performance wireless networks designed to cover large buildings without dead zones, supporting thousands of simultaneous devices." },
  { icon: Network, title: "Switches, Routers & Firewalls", description: "Core hardware that directs internet traffic and acts as the first line of defense against online threats. Managed and unmanaged options." },
  { icon: Server, title: "Servers & Storage Solutions", description: "Powerful compute and large-capacity drives — NAS, SAN, and hyper-converged infrastructure for running applications and storing data safely." },
  { icon: Database, title: "Data Center Design", description: "The design and management of secure, cooled facilities to house critical IT equipment — from micro data centers to enterprise-scale builds.", span: "wide" },
  { icon: RefreshCw, title: "Backup & Disaster Recovery", description: "Automated systems that save copies of your data so it can be restored instantly if hardware fails or a disaster strikes." },
  { icon: Shield, title: "Business Continuity Planning", description: "Strategies to keep essential business functions running even during a major technical or natural disaster — RTO/RPO planning and failover testing." },
  { icon: Cloud, title: "Cloud & Virtualization", description: "Moving data and applications to remote cloud servers so you can scale resources up or down without buying more physical hardware. Virtualization lets one physical server act like many.", span: "wide" },
  { icon: Radio, title: "Edge & 5G Solutions", description: "Placing processing power closer to where data is created (Edge Computing) and setting up dedicated high-speed Private 5G cellular networks." },
  { icon: Gauge, title: "Network Monitoring & NOC", description: "24/7 network operations center with real-time health monitoring, alerting, capacity planning, and proactive incident management." },
  { icon: Globe, title: "SD-WAN & MPLS", description: "Software-defined wide area networking for multi-site connectivity with intelligent traffic routing and centralized policy management." },
  { icon: Layers, title: "Hybrid Cloud Architecture", description: "Best-of-both-worlds infrastructure combining on-premise control with cloud elasticity — seamless workload migration and unified management." },
];

/* ───────── Infrastructure Tabs ───────── */
interface InfraCategory {
  id: string;
  icon: LucideIcon;
  label: string;
  title: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  image: string;
}

const infraCategories: InfraCategory[] = [
  {
    id: "cabling",
    icon: Cable,
    label: "Structured Cabling",
    title: "Enterprise Structured Cabling & Fiber Optics",
    description: "We design and install the physical backbone of your network — from Cat6a copper runs to single-mode fiber optic infrastructure that supports 10/25/100GbE.",
    features: [
      "TIA-568 compliant installation with certification and documentation",
      "Fiber optic backbone with fusion splicing and OTDR testing",
      "Cable management systems — trays, ladders, and containment",
      "Floor-box and ceiling-mounted access point provisioning",
      "Future-proof design supporting 25GbE and 100GbE upgrades",
    ],
    specs: [
      { label: "Runs Installed", value: "50,000+" },
      { label: "Standards", value: "TIA-568 / ISO 11801" },
      { label: "Speed Support", value: "Up to 100GbE" },
      { label: "Warranty", value: "25 years" },
    ],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "cloud",
    icon: Cloud,
    label: "Cloud & Virtualization",
    title: "Cloud Migration & Virtualization",
    description: "Seamless migration to AWS, Azure, or GCP — or build hybrid architectures that combine the security of on-premise with the elasticity of cloud.",
    features: [
      "Cloud readiness assessment and workload migration planning",
      "VMware, Hyper-V, and KVM virtualization deployment",
      "Containerized microservices with Docker and Kubernetes orchestration",
      "Auto-scaling, load balancing, and cost optimization strategies",
      "Hybrid cloud connectivity with VPN, Direct Connect, or ExpressRoute",
    ],
    specs: [
      { label: "Migrations Done", value: "200+" },
      { label: "Cloud Partners", value: "AWS / Azure / GCP" },
      { label: "Cost Savings", value: "Up to 60%" },
      { label: "Uptime SLA", value: "99.99%" },
    ],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=600&auto=format&fit=crop",
  },
  {
    id: "datacenter",
    icon: Server,
    label: "Data Centers",
    title: "Data Center Design & Management",
    description: "From micro data centers to tier-3 facilities — we handle everything from rack layout and cooling to redundant power and physical security.",
    features: [
      "Hot/cold aisle containment and precision cooling design",
      "Redundant power with N+1 UPS and generator backup",
      "Rack-level power metering and environmental monitoring",
      "Physical security with biometric access and CCTV integration",
      "DCIM software deployment for capacity planning and asset management",
    ],
    specs: [
      { label: "DCs Designed", value: "30+" },
      { label: "PUE Target", value: "<1.5" },
      { label: "Uptime Tier", value: "Up to Tier III" },
      { label: "Power Capacity", value: "Up to 5MW" },
    ],
    image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?q=80&w=600&auto=format&fit=crop",
  },
];

function InfraTabs() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState(infraCategories[0].id);
  const active = infraCategories.find((c) => c.id === activeTab)!;

  return (
    <section className="py-24 lg:py-32 bg-secondary/50" ref={ref}>
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5 }} className="text-center mb-14">
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">INFRASTRUCTURE DEEP-DIVE</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">The Digital Nervous System.</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">The backbone of every modern business — high-speed connections, scalable storage, and rock-solid uptime.</p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.4, delay: 0.15 }} className="flex flex-wrap justify-center gap-3 mb-12">
          {infraCategories.map((cat) => {
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
  "Cisco", "Juniper", "Aruba", "Fortinet", "Ubiquiti",
  "AWS", "Microsoft Azure", "Google Cloud", "DigitalOcean",
  "VMware", "Hyper-V", "Proxmox", "Docker", "Kubernetes",
  "Dell PowerEdge", "HPE ProLiant", "Lenovo ThinkSystem",
  "Synology", "QNAP", "NetApp", "Pure Storage",
  "Commscope", "Panduit", "Belden", "Corning Fiber",
  "SolarWinds", "PRTG", "Nagios", "Zabbix", "Datadog",
  "Veeam", "Acronis", "Veritas", "Datto",
];

export default function Networking() {
  return (
    <>
      <ServiceHero
        badge="IT INFRASTRUCTURE & NETWORKING"
        title="The Digital"
        highlight="Nervous System."
        description="The digital backbone of your business — high-speed connections, scalable storage, and rock-solid infrastructure that never sleeps."
        stats={[
          { value: "50,000+", label: "Cable Runs" },
          { value: "200+", label: "Cloud Migrations" },
          { value: "99.99%", label: "Uptime SLA" },
        ]}
      />
      <BentoGrid
        label="CAPABILITIES"
        heading="Build. Connect. Scale."
        subheading="From structured cabling to hybrid cloud — the complete infrastructure stack under one roof."
        items={benefits}
      />
      <InfraTabs />
      <TechMarquee label="INFRASTRUCTURE PARTNERS" items={techStack} />
      <CTASection />
    </>
  );
}
