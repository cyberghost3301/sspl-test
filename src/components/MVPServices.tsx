import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Shield, Network, Zap, Globe, ArrowUpRight } from "lucide-react";
import SystemBlueprintTooltip from "@/components/SystemBlueprintTooltip";

/** Tooltip blueprint data: Cybersecurity, Software, IT Infra, Automation */
const servicePillars = [
  {
    icon: Shield,
    label: "Secure my business",
    description: "Audit, harden, and monitor your IT environment - from CCTV and access control to cyber threat management",
    href: "/services/cybersecurity",
    color: "text-cyan-400",
    title: "Security Architecture",
    specs: ["Zero-Trust Framework", "AES-256 Encryption", "Real-time Threat Monitoring", "DDoS Mitigation"],
  },
  {
    icon: Globe,
    label: "Build or scale systems",
    description: "CRMs, ERPs, SaaS products, and custom business software built to run real operations reliably",
    href: "/services/software",
    color: "text-violet-400",
    title: "Software Stack",
    specs: ["React / Next.js", "Node.js / Python", "Microservices Arch", "PostgreSQL / Redis"],
  },
  {
    icon: Network,
    label: "Set up infrastructure",
    description: "Enterprise networking, structured cabling, server rooms, cloud migration, and long-term IT support",
    href: "/services/networking",
    color: "text-blue-400",
    title: "Infra Topology",
    specs: ["Ubiquiti / Cisco routing", "Multi-WAN Failover", "VLAN Segmentation", "Cloud Hybrid Active Directory"],
  },
  {
    icon: Zap,
    label: "Automate operations",
    description: "Smart home and office automation, IoT integration, AV systems, and energy-efficient intelligent spaces",
    href: "/services/automation",
    color: "text-amber-400",
    title: "Workflow Engine",
    specs: ["API-First Integration", "Zapier / Make.com", "Custom Webhooks", "Automated Error Handling"],
  },
];

export default function MVPServices() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 lg:py-24" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-display uppercase tracking-widest text-white/90 mb-3">
            Service Paths
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-white font-bold">
            Where are things starting to break?
          </h2>
          <p className="mt-4 max-w-xl mx-auto !text-gray-300 !opacity-100 text-base leading-relaxed">
            Select the path that matches your goal - we'll map the exact solution
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicePillars.map((service, i) => (
            <motion.div
              key={service.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="min-w-0"
            >
              <SystemBlueprintTooltip title={service.title} specs={service.specs}>
                <motion.div 
                  className="liquid-glass p-6 md:p-8 flex flex-col gap-4 cursor-crosshair h-full"
                  whileHover={{ scale: 1.02, boxShadow: '0 0 60px var(--sc-teal-glow)' }}
                  transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
                >
                  <motion.div 
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 0.8 }}
                    className="absolute top-0 left-[20%] w-[60%] h-[1px]"
                    style={{ background: 'linear-gradient(90deg, transparent, var(--sc-teal), transparent)' }}
                  />
                  <Link
                    to={service.href}
                    className="group flex flex-col h-full min-w-0 transition-opacity duration-300 hover:opacity-95"
                  >
                    <div className="mb-5 flex items-center text-cyan-400 drop-shadow-[0_0_12px_rgba(6,182,212,0.6)]">
                      <service.icon className="h-5 w-5 shrink-0" />
                    </div>
                    <h3 className="!text-white !font-semibold text-lg mb-2 leading-snug">
                      {service.label}
                    </h3>
                    <p className="!text-gray-300 !opacity-100 text-sm leading-relaxed flex-1">
                      {service.description}
                    </p>
                    <div className={`mt-5 inline-flex items-center gap-1 text-xs font-semibold ${service.color}`}>
                      Explore
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                    </div>
                  </Link>
                </motion.div>
              </SystemBlueprintTooltip>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
