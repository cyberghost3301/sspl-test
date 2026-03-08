import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Shield, Code, ShieldCheck, ArrowUpRight } from "lucide-react";

const flagshipServices = [
  {
    icon: Shield,
    title: "Uncompromising Security Infrastructure",
    description: "Enterprise-grade surveillance systems, access control, and 24/7 monitoring solutions engineered for maximum protection and peace of mind.",
    href: "/services/surveillance",
    features: ["CCTV & IP Cameras", "Access Control", "Remote Monitoring", "Threat Analytics"],
  },
  {
    icon: Code,
    title: "Digital Products That Scale",
    description: "Custom web applications, mobile platforms, and software systems built with modern stacks, designed to grow with your ambitions.",
    href: "/services/software",
    features: ["Web Applications", "Mobile Apps", "SaaS Platforms", "API Development"],
  },
  {
    icon: ShieldCheck,
    title: "Fortified IT & Cyber Strategy",
    description: "Comprehensive cybersecurity audits, IT consulting, and infrastructure optimization to keep your operations bullet-proof and future-ready.",
    href: "/services/consulting",
    features: ["Security Audits", "Cloud Strategy", "Compliance", "Incident Response"],
  },
];

export default function MVPServices() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">FLAGSHIP SOLUTIONS</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Three Pillars of Excellence
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Our core verticals, each led by specialized industry partners who bring decades of real-world expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {flagshipServices.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              <Link
                to={service.href}
                className="group block h-full p-8 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <service.icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 flex items-center gap-2">
                  {service.title}
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((f) => (
                    <span key={f} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground font-medium">
                      {f}
                    </span>
                  ))}
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
