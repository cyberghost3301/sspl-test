import { m as motion } from "framer-motion";

export default function AboutHero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Grid bg */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />
      <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-accent/5 blur-[140px]" />

      <div className="section-container relative z-10 py-32 lg:py-40">
        <div className="max-w-3xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-display uppercase tracking-[0.25em] text-accent mb-6"
          >
            About Spirecrest
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1]"
            style={{ color: "hsl(var(--on-dark))" }}
          >
            Engineering the Future of{" "}
            <span className="text-gradient">Infrastructure & Code.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-6 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto"
            style={{ color: "hsl(var(--on-dark-muted))" }}
          >
            Spirecrest Solutions is a multi-disciplinary technology company headquartered in India.
            We combine deep domain expertise with modern engineering to deliver surveillance,
            software, cybersecurity, and infrastructure solutions that don't just work, they scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="mt-12 flex flex-wrap justify-center gap-x-10 gap-y-4"
          >
            {[
              { value: "2025", label: "PLC Formed" },
              { value: "12", label: "Service Verticals" },
              { value: "9000+", label: "Projects Delivered" },
              { value: "19+", label: "Expert Partners" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-display text-2xl font-bold text-accent">{stat.value}</p>
                <p className="text-xs mt-1" style={{ color: "hsl(var(--on-dark-muted))" }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
