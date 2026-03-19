import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";
import { LucideIcon } from "lucide-react";

export interface BentoItem {
  icon: LucideIcon;
  title: string;
  description: string;
  span?: "wide" | "tall" | "normal";
}

interface BentoGridProps {
  label: string;
  heading: string;
  subheading: string;
  items: BentoItem[];
}

export default function BentoGrid({ label, heading, subheading, items }: BentoGridProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">{label}</p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {heading}
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">{subheading}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className={`group p-7 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 ${
                item.span === "wide" ? "md:col-span-2" : item.span === "tall" ? "md:row-span-2" : ""
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                <item.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
