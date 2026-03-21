import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";

// Safe robust tech stack slugs verified on simpleicons
const row1Logos = [
  'cisco', 'cloudflare', 'intel', 'github', 'gitlab', 
  'docker', 'linux', 'ubuntu', 'nginx', 'vercel'
];

// Reusing for the second row as per safe list
const row2Logos = [
  'cisco', 'cloudflare', 'intel', 'github', 'gitlab', 
  'docker', 'linux', 'ubuntu', 'nginx', 'vercel'
];

export default function TechMarquee() {
  const scrollRef = useRef(null);
  const inView = useInView(scrollRef, { once: true, margin: "-100px" });

  // Helper function to render a continuous row
  const renderRow = (logos: string[], direction: "left" | "right", speed: number) => {
    // Quadruple the array to ensure the screen is always filled during infinite scroll
    const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

    return (
      <div
        className="flex w-full overflow-hidden relative py-4"
        style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
      >
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-card to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-card to-transparent z-10 pointer-events-none" />
        <motion.div
          animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: speed }}
          className="flex whitespace-nowrap items-center w-max gap-12 md:gap-24 px-6 md:px-12"
        >
          {duplicatedLogos.map((slug, idx) => (
            <div key={`${slug}-${idx}`} className="relative group shrink-0 flex items-center justify-center">
              {/* Native colored SVGs with a neon drop-shadow that intensifies on hover */}
              <img
                src={`https://cdn.simpleicons.org/${slug}`}
                alt={`${slug} logo`}
                loading="lazy"
                className="w-8 h-8 md:w-10 md:h-10 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section className="pt-24 pb-12 bg-background relative overflow-hidden" ref={scrollRef}>

      {/* Sleek, Enterprise-Grade Header */}
      <div className="section-container mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase mb-4">Software Ecosystem</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Our Enterprise <span className="text-gradient">Tech Stack</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            We architect zero-trust cloud infrastructure and deploy robust, high-performance software applications using industry-leading technologies.
          </p>
        </motion.div>
      </div>

      {/* The Dual Marquees */}
      <div className="flex flex-col gap-6 md:gap-10">
        {/* Top Row moves Left */}
        {renderRow(row1Logos, "left", 45)}

        {/* Bottom Row moves Right (slightly slower for visual depth) */}
        {renderRow(row2Logos, "right", 55)}
      </div>

    </section>
  );
}