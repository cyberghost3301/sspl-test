import { useState, useMemo } from "react";
import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Slider } from "@/components/ui/slider";
import { Calculator, Clock, Users, Layers } from "lucide-react";

interface ScopingCalculatorProps {
  variant: "software" | "consulting";
}

const softwareLevels = [
  { label: "Simple", timeline: "4 - 6 weeks", model: "Single Developer Sprint", description: "Landing pages, portfolios, basic CRUD apps with standard features." },
  { label: "Moderate", timeline: "8 - 12 weeks", model: "Small Agile Team", description: "Multi-page web apps, custom dashboards, API integrations, and user auth." },
  { label: "Complex", timeline: "3 - 5 months", model: "Full-Stack Squad", description: "SaaS platforms, real-time systems, payment integrations, and advanced APIs." },
  { label: "Enterprise", timeline: "6 - 12 months", model: "Dedicated Product Team", description: "Large-scale platforms, microservices architecture, AI/ML features, multi-tenant systems." },
];

const consultingLevels = [
  { label: "1 - 50 Users", timeline: "2 - 4 weeks", model: "Security Assessment", description: "Basic vulnerability scanning, policy review, and compliance gap analysis." },
  { label: "50 - 200 Users", timeline: "4 - 8 weeks", model: "Managed Security Ops", description: "Network hardening, endpoint protection, staff training, and incident response planning." },
  { label: "200 - 1000 Users", timeline: "2 - 4 months", model: "Enterprise Security Suite", description: "Full SIEM deployment, zero-trust architecture, 24/7 monitoring, and compliance certification." },
  { label: "1000+ Users", timeline: "6 - 12 months", model: "Chief Security Partnership", description: "Virtual CISO services, custom security frameworks, red team exercises, and continuous audit." },
];

export default function ScopingCalculator({ variant }: ScopingCalculatorProps) {
  const [value, setValue] = useState([1]);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const levels = variant === "software" ? softwareLevels : consultingLevels;
  const current = levels[value[0]];

  const sliderLabel = variant === "software" ? "Project Complexity" : "Estimated Users";

  return (
    <section className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            SCOPE YOUR PROJECT
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Interactive Scoping Calculator
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Drag the slider to explore estimated timelines and recommended engagement models for your project.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="max-w-3xl mx-auto"
        >
          {/* Slider Card */}
          <div className="p-8 md:p-10 rounded-2xl border border-border bg-card">
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm font-display font-semibold text-foreground">{sliderLabel}</p>
                <span className="text-sm font-display font-bold text-accent px-3 py-1 rounded-full bg-accent/10">
                  {current.label}
                </span>
              </div>
              <Slider
                value={value}
                onValueChange={setValue}
                max={levels.length - 1}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-2">
                {levels.map((l, i) => (
                  <span
                    key={l.label}
                    className={`text-[10px] font-display ${
                      i === value[0] ? "text-accent font-semibold" : "text-muted-foreground"
                    }`}
                  >
                    {l.label}
                  </span>
                ))}
              </div>
            </div>

            {/* Dynamic Result */}
            <motion.div
              key={value[0]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border"
            >
              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                <Clock className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-display uppercase tracking-wider text-muted-foreground mb-1">Timeline</p>
                  <p className="font-display text-sm font-bold text-foreground">{current.timeline}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50">
                <Users className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-display uppercase tracking-wider text-muted-foreground mb-1">Model</p>
                  <p className="font-display text-sm font-bold text-foreground">{current.model}</p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 rounded-xl bg-secondary/50 sm:col-span-1">
                <Layers className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                <div>
                  <p className="text-[10px] font-display uppercase tracking-wider text-muted-foreground mb-1">Scope</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">{current.description}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
