import { m as motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Activity, Server, ShieldCheck, Zap } from "lucide-react";

const metrics = [
  {
    id: 1,
    icon: Activity,
    value: "100%",
    label: "Active Redundancy",
    description: "Fully redundant failover clusters ensuring continuous service availability.",
    color: "from-emerald-500/20 to-transparent",
    iconColor: "text-emerald-500",
  },
  {
    id: 2,
    icon: Server,
    value: "1,200+",
    label: "Nodes Deployed",
    description: "Enterprise hardware and surveillance nodes actively managed.",
    color: "from-blue-500/20 to-transparent",
    iconColor: "text-blue-500",
  },
  {
    id: 3,
    icon: ShieldCheck,
    value: "24/7",
    label: "Zero-Trust Security",
    description: "Continuous threat monitoring and active mitigation systems.",
    color: "from-indigo-500/20 to-transparent",
    iconColor: "text-indigo-500",
  },
  {
    id: 4,
    icon: Zap,
    value: "<50ms",
    label: "Edge Latency",
    description: "Lightning-fast core routing and edge computing responses.",
    color: "from-rose-500/20 to-transparent",
    iconColor: "text-rose-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function ImpactMetrics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="relative w-full py-24 bg-card border-y border-border"
    >
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase mb-4">Live Telemetry</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-card-foreground mb-6">
            Operational <span className="text-gradient">Excellence.</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
            Our systems run India's most demanding enterprise workloads. We back our infrastructure with hard data and zero-compromise engineering.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8"
        >
          {metrics.map((metric) => (
            <motion.div
              key={metric.id}
              variants={itemVariants}
              className="text-center group"
            >
              <div className="relative mb-6 inline-flex items-center justify-center">
                <div className={`p-4 rounded-2xl bg-secondary/50 border border-border group-hover:border-accent/40 group-hover:bg-accent/5 transition-all duration-500`}>
                  <metric.icon className={`w-8 h-8 ${metric.iconColor}`} />
                </div>
              </div>

              <h3 className="font-display text-4xl font-bold text-card-foreground mb-2 tracking-tight">
                {metric.value}
              </h3>
              <h4 className="text-sm font-semibold text-accent mb-3 uppercase tracking-wider">
                {metric.label}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed max-w-[180px] mx-auto group-hover:text-muted-foreground/80 transition-colors">
                {metric.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
