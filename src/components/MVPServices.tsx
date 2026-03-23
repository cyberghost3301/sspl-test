import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Shield, Network, Zap, Globe, ArrowUpRight } from "lucide-react";

const servicePillars = [
  {
    icon: Shield,
    title: "Security & Surveillance Systems",
    description:
      "IP cameras, access control, perimeter detection, and 24/7 remote monitoring engineered for maximum protection.",
    href: "/services/surveillance",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    hoverBorder: "hover:border-cyan-500/30",
  },
  {
    icon: Network,
    title: "IT Infrastructure & Networking",
    description:
      "Structured cabling, enterprise Wi-Fi, server rooms, cloud migration, and managed IT services.",
    href: "/services/networking",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    hoverBorder: "hover:border-blue-500/30",
  },
  {
    icon: Zap,
    title: "Smart Automation & Intelligent Spaces",
    description:
      "Home and office automation, IoT integration, AV systems, and intelligent control environments.",
    href: "/services/automation",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    hoverBorder: "hover:border-amber-500/30",
  },
  {
    icon: Globe,
    title: "Digital & Business Solutions",
    description:
      "Custom web applications, mobile platforms, SaaS products, and end-to-end software delivery.",
    href: "/services/software",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    hoverBorder: "hover:border-violet-500/30",
  },
];

export default function MVPServices() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 lg:py-24 bg-secondary/30" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            Core Service Pillars
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            What we deliver,{" "}
            <span className="text-gradient">end to end.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Four focused verticals. Each purpose-built for a different dimension of your business.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {servicePillars.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Link
                to={service.href}
                className={`group flex flex-col h-full p-6 rounded-2xl border border-border bg-card transition-all duration-300 ${service.hoverBorder} hover:shadow-lg`}
              >
                <div className={`w-11 h-11 rounded-xl ${service.bg} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={`w-5 h-5 ${service.color}`} />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-2 leading-snug">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                  {service.description}
                </p>
                <div className={`mt-5 inline-flex items-center gap-1 text-xs font-semibold ${service.color} opacity-0 group-hover:opacity-100 transition-opacity`}>
                  Learn More
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
