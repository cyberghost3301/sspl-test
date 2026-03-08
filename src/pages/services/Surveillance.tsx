import {
  Camera, Eye, Cloud, Brain, ShieldCheck, Radio,
  Wifi, HardDrive, Bell, MapPin, Cctv, Lock,
  Monitor, Zap, Settings, BarChart3, Layers, Signal,
  Building2, Truck, Warehouse, ShieldAlert, ScanFace, Fingerprint,
  Network, Server, Video, Gauge, LayoutGrid, BatteryCharging,
} from "lucide-react";
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

export default function Surveillance() {
  return (
    <>
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
      <TechMarquee label="HARDWARE & TECH PARTNERS" items={techStack} />
      <CTASection />
    </>
  );
}
