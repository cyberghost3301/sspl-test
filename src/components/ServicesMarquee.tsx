import { m as motion } from "framer-motion";

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
  // Helper function to render a continuous row
  const renderRow = (logos: string[], direction: "left" | "right", speed: number) => {
    // Quadruple the array to ensure the screen is always filled during infinite scroll
    const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

    return (
      <div
        className="flex w-full overflow-hidden relative py-4"
        style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
      >
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
                className="w-12 h-12 md:w-16 md:h-16 object-contain drop-shadow-[0_0_8px_rgba(255,255,255,0.15)] group-hover:drop-shadow-[0_0_20px_rgba(255,255,255,0.4)] transition-all duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section className="py-12 md:py-20 bg-secondary/30 relative overflow-hidden border-y border-border">

      {/* Sleek, Enterprise-Grade Header */}
      <div className="text-center mb-12">
        <p className="font-mono text-[10px] md:text-xs tracking-[0.3em] text-accent flex items-center justify-center gap-4">
          <span className="hidden md:block w-16 h-[1px] bg-gradient-to-r from-transparent to-accent/50"></span>
          // Core Infrastructure & Deployment Stack
          <span className="hidden md:block w-16 h-[1px] bg-gradient-to-l from-transparent to-accent/50"></span>
        </p>
      </div>

      {/* The Dual Marquees */}
      <div className="flex flex-col gap-6 md:gap-10">
        {/* Top Row moves Left - Increased duration to 90s for smooth scroll with 30 items */}
        {renderRow(row1Logos, "left", 90)}

        {/* Bottom Row moves Right - Increased duration to 110s */}
        {renderRow(row2Logos, "right", 110)}
      </div>

    </section>
  );
}