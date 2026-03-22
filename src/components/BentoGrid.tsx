import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Activity, Globe, Cpu } from "lucide-react";

export default function BentoGrid() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden" ref={ref}>
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <p className="font-mono text-xs tracking-[0.2em] text-accent uppercase mb-4">Enterprise Architecture</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
              Engineered for <span className="text-gradient">Resilience</span>
            </h2>
          </motion.div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate={inView ? "show" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[250px] md:auto-rows-[300px]"
        >
          {/* Card 1: Spans 2 cols */}
          <motion.div variants={item} className="md:col-span-2 relative rounded-3xl overflow-hidden bg-card border border-border group hover:border-accent/40 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-6 md:p-8 h-full flex flex-col z-10 relative">
              <ShieldCheck className="w-10 h-10 text-cyan-500 mb-auto" />
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">Zero-Trust Security</h3>
                <p className="text-muted-foreground leading-relaxed max-w-lg">Every endpoint authenticated. Every byte encrypted. We deploy military-grade cybersecurity layers that assume breach and verify every access request.</p>
              </div>
            </div>
            {/* Decorative BG element */}
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-cyan-500/10 rounded-tl-[100px] rounded-br-3xl -z-10 group-hover:scale-110 transition-transform duration-700" />
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={item} className="relative rounded-3xl overflow-hidden bg-card border border-border group hover:border-emerald-500/40 transition-colors duration-500">
            <div className="p-6 md:p-8 h-full flex flex-col z-10 relative">
              <Activity className="w-10 h-10 text-emerald-500 mb-auto" />
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">99.99% Uptime</h3>
                <p className="text-sm text-muted-foreground">Multi-regional failover architecture guaranteeing continuous enterprise operations.</p>
              </div>
            </div>
            {/* Animated Graph visual */}
            <div className="absolute top-6 right-6 flex items-end gap-1.5 h-16">
               <div className="w-2 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/80 transition-all duration-300 h-4 group-hover:h-8 delay-75" />
               <div className="w-2 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/80 transition-all duration-300 h-8 group-hover:h-12 delay-150" />
               <div className="w-2 rounded-full bg-emerald-500/20 group-hover:bg-emerald-500/80 transition-all duration-300 h-6 group-hover:h-16 delay-200" />
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={item} className="relative rounded-3xl overflow-hidden bg-card border border-border group hover:border-blue-500/40 transition-colors duration-500">
            <div className="p-6 md:p-8 h-full flex flex-col z-10 relative">
              <Globe className="w-10 h-10 text-blue-500 mb-auto" />
              <div>
                <h3 className="font-display text-xl md:text-2xl font-bold text-foreground mb-2">Global Scale</h3>
                <p className="text-sm text-muted-foreground">Deploy across 25+ availability zones effortlessly with our automated IaC patterns.</p>
              </div>
            </div>
            {/* Spinning globe aesthetic */}
            <div className="absolute -right-12 -bottom-12 w-40 h-40 border-[1.5px] border-blue-500/20 rounded-full group-hover:border-blue-500/40 transition-colors duration-700">
              <div className="absolute inset-4 border-[1.5px] border-dashed border-blue-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-8 border-[1.5px] border-blue-500/20 rounded-full" />
            </div>
          </motion.div>

          {/* Card 4: Spans 2 cols */}
          <motion.div variants={item} className="md:col-span-2 relative rounded-3xl overflow-hidden bg-card border border-border group hover:border-purple-500/40 transition-colors duration-500">
            <div className="absolute inset-0 bg-gradient-to-tl from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-6 md:p-8 h-full flex flex-col z-10 relative">
              <Cpu className="w-10 h-10 text-purple-500 mb-auto" />
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-3">AI-Driven Monitoring</h3>
                <p className="text-muted-foreground leading-relaxed max-w-lg">Anomaly detection in real-time. Our machine learning layers instantly identify and isolate threats in both physical surveillance and digital networks.</p>
              </div>
            </div>
            {/* Scanner aesthetic */}
            <div className="absolute right-0 bottom-0 top-0 w-1/3 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
               <div className="absolute left-0 right-0 h-[2px] bg-purple-500/80 shadow-[0_0_15px_rgba(168,85,247,0.8)] top-0 group-hover:top-full transition-all duration-[3000ms] ease-in-out will-change-transform" />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
