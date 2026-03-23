import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Ban, PiggyBank, ScanLine } from "lucide-react";

const differentiators = [
  {
    icon: Ban,
    headline: "We don't push products.",
    body: "We start with your exact operational requirements, not a vendor catalog.",
    accent: "from-cyan-500/10 to-transparent",
    border: "hover:border-cyan-500/30",
    iconColor: "text-cyan-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.08)]",
  },
  {
    icon: PiggyBank,
    headline: "We protect your capital.",
    body: "We actively advise you on what NOT to spend money on to maximize ROI.",
    accent: "from-amber-500/10 to-transparent",
    border: "hover:border-amber-500/30",
    iconColor: "text-amber-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]",
  },
  {
    icon: ScanLine,
    headline: "We tailor every detail.",
    body: "Every cable, camera, and server is mapped to your specific business reality.",
    accent: "from-violet-500/10 to-transparent",
    border: "hover:border-violet-500/30",
    iconColor: "text-violet-400",
    glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.08)]",
  },
];

export default function DifferentiationBlock() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 lg:py-24 bg-background" ref={ref}>
      {/* Subtle midpoint glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
      </div>

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            Our Philosophy
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Most vendors install.{" "}
            <span className="text-gradient">We design.</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {differentiators.map((d, i) => (
            <motion.div
              key={d.headline}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className={`group relative p-8 rounded-2xl border border-border bg-card transition-all duration-300 ${d.border} ${d.glow}`}
            >
              {/* Gradient sheen on hover */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${d.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="w-11 h-11 rounded-xl bg-accent/5 border border-border flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
                  <d.icon className={`w-5 h-5 ${d.iconColor}`} />
                </div>
                <h3 className="font-display text-xl font-bold text-foreground mb-3 leading-snug">
                  {d.headline}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {d.body}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
