import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)",
        backgroundSize: "60px 60px",
      }} />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-accent/8 blur-[100px]" />

      <div className="section-container relative z-10 py-32 lg:py-0">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/20 bg-accent/5 mb-8"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-medium text-accent tracking-wide">MULTI-DISCIPLINARY TECHNOLOGY FIRM</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]"
            style={{ color: "hsl(var(--on-dark))" }}
          >
            Smart Ideas.
            <br />
            <span className="text-gradient">Solid Executions.</span>
            <br />
            Scalable Results.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
            style={{ color: "hsl(var(--on-dark-muted))" }}
          >
            From advanced surveillance systems to custom software and cloud infrastructure, 
            we architect solutions that protect, perform, and scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link to="/portfolio">
              <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold gap-2 px-8 h-12 text-base">
                Explore Solutions
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/about">
              <Button
                size="lg"
                variant="outline"
                className="font-display font-semibold gap-2 px-8 h-12 text-base border-accent/30 text-accent hover:bg-accent/10"
              >
                Our Story
              </Button>
            </Link>
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
