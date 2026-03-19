import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Users, Target, Rocket } from "lucide-react";

const pillars = [
  {
    icon: Users,
    title: "Partner-Led Teams",
    desc: "Every project is owned and driven by a specialized domain partner, not a generic project manager.",
  },
  {
    icon: Target,
    title: "Deep Domain Expertise",
    desc: "Our partners bring 10+ years of real-world execution. You get an advisor, not just a vendor.",
  },
  {
    icon: Rocket,
    title: "Scalable Execution",
    desc: "From a 5-camera setup to a 500-node cloud deployment, our model scales with your ambition.",
  },
];

export default function PartnerModel() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-secondary/50" ref={ref}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">OUR MODEL</p>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
              You Work Directly With the Experts
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              At Spirecrest, there are no middlemen. Our partner-led execution model means your project is 
              steered by the same industry leader who built their career solving exactly your type of problem. 
              This is how 9000+ projects have been delivered on time, on budget, and beyond expectation.
            </p>
            <div className="space-y-6">
              {pillars.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <p.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-display font-semibold text-foreground">{p.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{p.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Abstract visual */}
            <div className="aspect-square max-w-md mx-auto relative">
              <div className="absolute inset-0 rounded-3xl bg-accent/5 border border-accent/10" />
              <div className="absolute inset-6 rounded-2xl bg-accent/5 border border-accent/10" />
              <div className="absolute inset-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
                <div className="text-center">
                  <p className="font-display text-5xl font-bold text-accent">19+</p>
                  <p className="text-sm text-muted-foreground mt-2 font-medium">Specialized Partners</p>
                  <p className="text-xs text-muted-foreground mt-1">Across 12 Verticals</p>
                </div>
              </div>
              {/* Corner dots */}
              {[
                "top-0 left-0", "top-0 right-0", "bottom-0 left-0", "bottom-0 right-0"
              ].map((pos, i) => (
                <div key={i} className={`absolute ${pos} w-3 h-3 rounded-full bg-accent/30`} />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
