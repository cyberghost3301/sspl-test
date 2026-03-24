import { m as motion } from "framer-motion";
import { Phone, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppCTA from "@/components/WhatsAppCTA";

export default function HeroSection() {
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

      <div className="section-container relative z-10 py-32 lg:py-0">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-medium text-accent tracking-wide">Lucknow's Trusted Technology Partner</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            style={{ color: "hsl(var(--on-dark))" }}
          >
            Infrastructure that doesn't{" "}
            <span className="text-gradient">fail when it matters.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "hsl(var(--on-dark-muted))" }}
          >
            From security systems to enterprise networks and smart automation, we design and deploy solutions tailored to your exact needs.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            {/* Primary CTA: Call Now */}
            <a href="tel:+919250974145" className="w-full sm:w-auto">
              <motion.div
                animate={{ boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 20px rgba(6,182,212,0.6)", "0 0 0px rgba(6,182,212,0)"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="rounded-xl w-full sm:w-auto"
              >
                <Button
                  size="lg"
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold gap-2 px-8 h-12 text-base shadow-xl shadow-accent/20"
                >
                  <Phone className="w-4 h-4" />
                  Call Now
                </Button>
              </motion.div>
            </a>

            {/* Secondary CTA: WhatsApp Now */}
            <motion.div
              animate={{ boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 14px rgba(6,182,212,0.35)", "0 0 0px rgba(6,182,212,0)"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1.25 }}
              className="rounded-xl w-full sm:w-auto"
            >
              <WhatsAppCTA
                context="general"
                section="hero"
                buttonText="Get Expert Advice"
                className="px-8 h-12 text-base w-full sm:w-auto border border-accent/30 bg-transparent hover:bg-accent/10 text-white shadow-none"
              />
            </motion.div>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-20 grid grid-cols-3 gap-8 max-w-lg mx-auto"
          >
            {[
              { value: "9000+", label: "Projects Delivered" },
              { value: "19+", label: "Expert Partners" },
              { value: "12", label: "Service Verticals" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl md:text-3xl font-bold text-accent">{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: "hsl(var(--on-dark-muted))" }}>{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
