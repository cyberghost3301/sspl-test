import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Flame, Heart, Compass, Handshake, Eye, Rocket } from "lucide-react";

const philosophyPillars = [
  {
    icon: Flame,
    title: "Ownership Mentality",
    description: "Every member treats every project as their own — no hand-offs, no finger-pointing.",
  },
  {
    icon: Eye,
    title: "Radical Transparency",
    description: "Clients see real progress, real numbers, and real timelines. No sugarcoating.",
  },
  {
    icon: Compass,
    title: "Domain-First Thinking",
    description: "We don't just write code — we understand the industry context before the first line ships.",
  },
  {
    icon: Handshake,
    title: "Partner, Not Vendor",
    description: "We embed ourselves in your goals. Your growth is our KPI.",
  },
  {
    icon: Heart,
    title: "People Over Process",
    description: "Frameworks help, but empowered individuals build extraordinary things.",
  },
  {
    icon: Rocket,
    title: "Ship, Learn, Iterate",
    description: "Perfect is the enemy of deployed. We ship fast, gather feedback, and refine relentlessly.",
  },
];

const culturePhotos = [
  {
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=600&auto=format&fit=crop",
    alt: "Team collaboration",
    span: "col-span-2 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=600&auto=format&fit=crop",
    alt: "Brainstorming session",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600&auto=format&fit=crop",
    alt: "Team meeting",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=600&auto=format&fit=crop",
    alt: "Working together",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=600&auto=format&fit=crop",
    alt: "Office culture",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=600&auto=format&fit=crop",
    alt: "Tech workspace",
    span: "col-span-2 row-span-1",
  },
];

export default function TeamCulture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            Our Philosophy
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            How We <span className="text-gradient">Think & Work.</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Culture isn't a poster on the wall — it's how we make decisions when no one's watching. These six principles define everything we build.
          </p>
        </motion.div>

        {/* Philosophy Pillars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-24">
          {philosophyPillars.map((pillar, i) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: 0.1 + i * 0.08 }}
              className="group relative p-7 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="w-11 h-11 rounded-xl bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <pillar.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-lg font-bold text-foreground mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Culture Photo Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mb-10"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            Life at Spirecrest
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Building Together.
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 auto-rows-[160px] md:auto-rows-[180px]"
        >
          {culturePhotos.map((photo, i) => (
            <div
              key={i}
              className={`${photo.span} rounded-2xl overflow-hidden group relative`}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-300" />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
