import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Building2, ShieldCheck, Home, Rocket } from "lucide-react";
import WhatsAppCTA from "@/components/WhatsAppCTA";

const useCases = [
  {
    icon: Building2,
    label: "Setting up a new office",
    context: "networking" as const,
    description: "IT, networking, security & AV — all in one deployment.",
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    hoverBorder: "hover:border-cyan-500/30",
  },
  {
    icon: ShieldCheck,
    label: "Upgrading security systems",
    context: "surveillance" as const,
    description: "IP cameras, access control, and 24/7 monitoring.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    hoverBorder: "hover:border-amber-500/30",
  },
  {
    icon: Home,
    label: "Building a smart home",
    context: "automation" as const,
    description: "Automation, AV, climate, and intelligent control.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    hoverBorder: "hover:border-violet-500/30",
  },
  {
    icon: Rocket,
    label: "Launching a digital product",
    context: "software" as const,
    description: "Web apps, mobile platforms, and SaaS infrastructure.",
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    hoverBorder: "hover:border-blue-500/30",
  },
];

export default function UseCaseEntryPoints() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 lg:py-24 bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            Find Your Path
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            What are you trying to achieve?
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Tell us your goal — we'll map the exact solution.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div
                className={`group relative flex flex-col h-full p-6 rounded-2xl border border-border bg-card transition-all duration-300 ${uc.hoverBorder} hover:shadow-lg cursor-pointer`}
              >
                <div className={`w-11 h-11 rounded-xl ${uc.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <uc.icon className={`w-5 h-5 ${uc.color}`} />
                </div>
                <h3 className="font-display text-base font-bold text-foreground mb-1.5 leading-snug">
                  {uc.label}
                </h3>
                <p className="text-xs text-muted-foreground leading-relaxed flex-1 mb-5">
                  {uc.description}
                </p>
                <WhatsAppCTA
                  context={uc.context}
                  section="hero"
                  buttonText="Get Expert Advice"
                  className={`w-full h-9 text-xs px-4 rounded-lg border border-border bg-transparent text-foreground hover:bg-accent/10 hover:border-accent/30 hover:text-accent transition-all shadow-none font-semibold`}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
