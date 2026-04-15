import React, { useRef } from "react";
import { m as motion, useScroll, useTransform } from "framer-motion";

const pillars = [
  {
    id: "01",
    title: "Physical Infrastructure & Security",
    tagline: "Unyielding Physical Security & Automation.",
    desc: "Enterprise-grade surveillance, biometric access control, and smart-environment automation. We build the physical layer of your operations with military-grade precision and zero blind spots.",
  },
  {
    id: "02",
    title: "Digital Systems & Cloud Architecture",
    tagline: "Scalable Software & Cloud Environments.",
    desc: "Stop relying on fragmented SaaS. We engineer proprietary workflow engines, custom ERPs, and resilient cloud architectures (AWS/Azure) designed specifically for your operational bottlenecks.",
  },
  {
    id: "03",
    title: "Strategic Consulting & Energy",
    tagline: "Tech Leadership & Sustainable Power.",
    desc: "Fractional CTO advisory, MSME tech-grant utilization, and commercial solar grid deployments. We align your infrastructure with long-term financial scaling and energy independence.",
  }
];

function PillarCard({
  pillar,
  index,
  scrollYProgress,
}: {
  pillar: (typeof pillars)[number];
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  let opacityInput: number[], opacityOutput: number[];
  let scaleInput: number[], scaleOutput: number[];
  let yInput: number[], yOutput: number[];

  // Explicit, hardcoded domain mapping to prevent any Framer math crashes.
  // All input arrays are strictly ascending with no negatives — WAAPI safe.
  if (index === 0) {
    opacityInput  = [0,    0.25, 0.33];
    opacityOutput = [1,    1,    0   ];
    scaleInput    = [0,    0.25, 0.33];
    scaleOutput   = [1,    1,    0.9 ];
    yInput        = [0,    0.25, 0.33];
    yOutput       = [0,    0,    -50 ];
  } else if (index === 1) {
    opacityInput  = [0.25, 0.33, 0.58, 0.66];
    opacityOutput = [0,    1,    1,    0   ];
    scaleInput    = [0.25, 0.33, 0.58, 0.66];
    scaleOutput   = [0.9,  1,    1,    0.9 ];
    yInput        = [0.25, 0.33, 0.58, 0.66];
    yOutput       = [50,   0,    0,    -50 ];
  } else {
    opacityInput  = [0.58, 0.66, 1];
    opacityOutput = [0,    1,    1];
    scaleInput    = [0.58, 0.66, 1];
    scaleOutput   = [0.9,  1,    1];
    yInput        = [0.58, 0.66, 1];
    yOutput       = [50,   0,    0];
  }

  const opacity      = useTransform(scrollYProgress, opacityInput,  opacityOutput);
  const scale        = useTransform(scrollYProgress, scaleInput,     scaleOutput);
  const y            = useTransform(scrollYProgress, yInput,         yOutput);
  const pointerEvents = useTransform(opacity, (val) => (val > 0.5 ? "auto" : "none"));

  return (
    <motion.div
      style={{ opacity, scale, y, pointerEvents }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="bg-[#05070A]/90 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sc-teal/40 to-transparent" />
        <span className="text-sc-text-muted text-7xl font-display font-black opacity-10 absolute -top-4 -right-2 pointer-events-none select-none">
          {pillar.id}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 pr-12 relative z-10">{pillar.title}</h3>
        <h4 className="text-sc-teal text-sm md:text-base font-semibold mb-6 relative z-10">{pillar.tagline}</h4>
        <p className="text-sc-text-muted leading-relaxed text-sm md:text-base relative z-10">{pillar.desc}</p>
      </div>
    </motion.div>
  );
}

export default function StickyShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // HARDWARE PINNING: Total height is 300vh. Scroll window is 100vh.
  // Translating exactly 200vh down perfectly cancels the user's scroll,
  // achieving a sticky viewport pin without relying on CSS position:sticky
  // (which is broken by the global overflow-x-hidden on the page wrapper).
  const stickyY = useTransform(scrollYProgress, [0, 1], ["0vh", "200vh"]);

  return (
    <section ref={containerRef} className="relative w-full bg-[#05070A] h-[300vh]">
      <motion.div
        style={{ y: stickyY }}
        className="h-screen w-full flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 md:px-12 gap-12"
      >
        {/* Left: Static Context (Hardware pinned via transform) */}
        <div className="w-full md:w-1/2 flex flex-col justify-center h-[30vh] md:h-full z-20">
          <span className="text-sc-teal text-sm tracking-[0.2em] uppercase font-mono mb-6 block">
            The Spirecrest Stack
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight">
            Three Pillars.<br />
            <span className="text-white/40">Infinite Scale.</span>
          </h2>
        </div>

        {/* Right: Crossfading Cards */}
        <div className="w-full md:w-1/2 relative h-[60vh] md:h-[80vh] flex flex-col justify-center perspective-[1000px] z-30">
          {pillars.map((pillar, index) => (
            <PillarCard
              key={pillar.id}
              pillar={pillar}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
