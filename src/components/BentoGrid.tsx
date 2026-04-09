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
    <section className="py-14 relative overflow-hidden" ref={ref}>
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="section-container relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            data-aos="fade-up"
          >
            <p className="font-mono text-xs tracking-[0.2em] text-white/[0.45] uppercase mb-4">Enterprise Architecture</p>
            <h2 className="font-display text-3xl md:text-5xl font-bold text-white">
              Built for{" "}<span className="text-gradient">scale, security, and reliability</span>
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
          <motion.div variants={item} data-aos="fade-up" data-aos-delay="0" className="md:col-span-2 relative rounded-3xl overflow-hidden border border-white/[0.04] bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.03] transition-colors duration-300 group">
            <div className="p-6 md:p-8 h-full flex flex-col z-10 relative">
              <ShieldCheck className="w-10 h-10 text-[#06B6D4] mb-auto" />
              <div>
                <h3 className="font-display text-2xl md:text-3xl !text-white !font-semibold mb-3">Zero-Trust Security</h3>
                <p className="!text-gray-300 !opacity-100 text-sm md:text-base leading-relaxed max-w-lg">Every endpoint authenticated. Every byte encrypted. We deploy military-grade cybersecurity layers that assume breach and verify every access request.</p>
              </div>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={item} data-aos="fade-up" data-aos-delay="150" className="relative rounded-3xl overflow-hidden border border-white/[0.04] bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.03] transition-colors duration-300 group">
            <div className="p-6 md:p-8 h-full flex flex-col z-10 relative">
              <Activity className="w-10 h-10 text-emerald-500 mb-auto" />
              <div>
                <h3 className="font-display text-xl md:text-2xl !text-white !font-semibold mb-2">99.99% Uptime</h3>
                <p className="!text-gray-300 !opacity-100 text-sm md:text-base">Multi-regional failover architecture guaranteeing continuous enterprise operations.</p>
              </div>
            </div>
          </motion.div>

          {/* Card 3 */}
          <motion.div variants={item} data-aos="fade-up" data-aos-delay="150" className="relative rounded-3xl overflow-hidden border border-white/[0.04] bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.03] transition-colors duration-300 group">
            <div className="p-6 md:p-8 h-full flex flex-col z-10 relative">
              <Globe className="w-10 h-10 text-blue-500 mb-auto" />
              <div>
                <h3 className="font-display text-xl md:text-2xl !text-white !font-semibold mb-2">Global Scale</h3>
                <p className="!text-gray-300 !opacity-100 text-sm md:text-base">Deploy across 25+ availability zones effortlessly with our automated IaC patterns.</p>
              </div>
            </div>
          </motion.div>

          {/* Card 4: Spans 2 cols */}
          <motion.div variants={item} data-aos="fade-up" data-aos-delay="300" className="md:col-span-2 relative rounded-3xl overflow-hidden border border-white/[0.04] bg-white/[0.02] backdrop-blur-md hover:bg-white/[0.03] transition-colors duration-300 group">
            <div className="p-6 md:p-8 h-full flex flex-col z-10 relative">
              <Cpu className="w-10 h-10 text-purple-500 mb-auto" />
              <div>
                <h3 className="font-display text-2xl md:text-3xl !text-white !font-semibold mb-3">AI-Driven Monitoring</h3>
                <p className="!text-gray-300 !opacity-100 text-sm md:text-base leading-relaxed max-w-lg">Anomaly detection in real-time. Our machine learning layers instantly identify and isolate threats in both physical surveillance and digital networks.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
