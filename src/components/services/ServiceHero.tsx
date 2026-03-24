import { m as motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppCTA from "@/components/WhatsAppCTA";

interface ServiceHeroProps {
  badge: string;
  title: string;
  highlight: string;
  description: string;
  stats: { value: string; label: string }[];
  primaryCTA?: string;
  secondaryCTA?: string;
  trustLine?: string;
  showCallCTA?: boolean;
}

export default function ServiceHero({
  badge,
  title,
  highlight,
  description,
  stats,
  primaryCTA = "Get Expert Advice",
  secondaryCTA = "Talk to an Expert",
  trustLine,
  showCallCTA = false,
}: ServiceHeroProps) {
  const location = useLocation();
  const getContext = () => {
    const p = location.pathname;
    if (p.includes("surveillance")) return "surveillance";
    if (p.includes("software")) return "software";
    if (p.includes("consulting")) return "consulting";
    if (p.includes("lifecycle")) return "lifecycle";
    if (p.includes("automation")) return "automation";
    if (p.includes("networking")) return "networking";
    if (p.includes("solar")) return "solar";
    if (p.includes("av-studio")) return "av-studio";
    if (p.includes("computers")) return "computers";
    if (p.includes("interior")) return "interior";
    if (p.includes("portfolio")) return "portfolio";
    return "general";
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Animated CSS Geometric Mesh / Orbs */}
      <div
        className="absolute top-[10%] left-[10%] w-[90vw] h-[90vw] md:w-[60vw] md:h-[60vw] lg:w-[35vw] lg:h-[35vw] rounded-full mix-blend-screen pointer-events-none opacity-20 blur-[80px] md:blur-[100px] bg-gradient-to-tr from-cyan-500 to-blue-600 animate-float"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="absolute bottom-[10%] right-[5%] w-[100vw] h-[100vw] md:w-[65vw] md:h-[65vw] lg:w-[40vw] lg:h-[40vw] rounded-full mix-blend-screen pointer-events-none opacity-20 blur-[90px] md:blur-[120px] bg-gradient-to-tl from-yellow-500 to-amber-600 animate-float-reverse"
        style={{ animationDelay: '-5s' }}
      />
      <div
        className="absolute top-[40%] left-[30%] w-[80vw] h-[80vw] md:w-[50vw] md:h-[50vw] lg:w-[30vw] lg:h-[30vw] rounded-full mix-blend-screen pointer-events-none opacity-15 blur-[80px] md:blur-[120px] bg-gradient-to-r from-blue-600 to-indigo-600 animate-float"
        style={{ animationDelay: '-10s' }}
      />

      <div className="section-container relative z-10 py-32 lg:py-40">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-display uppercase tracking-[0.25em] text-accent mb-6"
          >
            {badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
            style={{ color: "hsl(var(--on-dark))" }}
          >
            {title}{" "}
            <span className="text-gradient">{highlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "hsl(var(--on-dark-muted))" }}
          >
            {description}
          </motion.p>

          {trustLine && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="mt-3 text-sm italic"
              style={{ color: "hsl(var(--on-dark-muted))" }}
            >
              {trustLine}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary: WhatsApp CTA */}
            <motion.div
              animate={{ boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 20px rgba(6,182,212,0.6)", "0 0 0px rgba(6,182,212,0)"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="rounded-xl w-full sm:w-auto"
            >
              <WhatsAppCTA
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                context={getContext() as any}
                section="hero"
                buttonText={primaryCTA}
                className="px-8 h-12 text-base w-full sm:w-auto shadow-xl shadow-accent/20 rounded-xl"
              />
            </motion.div>

            {/* Secondary: Call Now */}
            {showCallCTA && (
              <a href="tel:+919250974145" className="w-full sm:w-auto">
                <motion.div
                  animate={{ boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 14px rgba(6,182,212,0.35)", "0 0 0px rgba(6,182,212,0)"] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1.25 }}
                  className="rounded-xl w-full"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full font-display font-semibold gap-2 px-8 h-12 text-base border-accent/30 text-white hover:bg-accent/10"
                  >
                    <Phone className="w-4 h-4" />
                    {secondaryCTA}
                  </Button>
                </motion.div>
              </a>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-4"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl font-bold text-accent">{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: "hsl(var(--on-dark-muted))" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* Micro-Proof Trust Marker */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="w-full flex justify-center mt-12"
          >
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase">
              Trusted by 50+ growing businesses
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
