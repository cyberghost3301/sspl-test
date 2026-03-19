import { m as motion, useScroll, useSpring, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Lightbulb,
  Flag,
  Megaphone,
  TrendingUp,
  Heart,
  MapPin,
  Handshake,
  Building2,
  Globe,
  FileCheck,
  Award,
  Rocket,
} from "lucide-react";

const milestones = [
  {
    date: "2013",
    icon: Lightbulb,
    title: "Hello World!",
    description:
      "An idea was worked upon with a vision to revolutionize tech solutions for all.",
  },
  {
    date: "2018",
    icon: Flag,
    title: "Founded",
    description:
      "A start of something new, something fresh, with an aim at making a better tomorrow.",
  },
  {
    date: "2019",
    icon: Megaphone,
    title: "Went Mainstream",
    description:
      "We kickstarted SPIRECREST in Lucknow, establishing a name for itself.",
  },
  {
    date: "2021",
    icon: TrendingUp,
    title: "Expansion 1.0",
    description:
      "Extended few services nationwide with 4000+ successful projects completed.",
  },
  {
    date: "2022",
    icon: Heart,
    title: "Thought for a Cause",
    description:
      "Spread outreach and marketing campaigns in rural areas with no tech provider.",
  },
  {
    date: "2023",
    icon: MapPin,
    title: "Extended Market Reach",
    description:
      "Successfully established our name among certain rural underrated areas with high demand.",
  },
  {
    date: "2024",
    icon: Handshake,
    title: "New Offerings",
    description:
      "Partnered with various distinguished industry experts to diversify our variety.",
  },
  {
    date: "June 6, 2025",
    icon: Building2,
    title: "Official Incorporation",
    description:
      "Spirecrest Solutions Private Limited was officially incorporated, marking the beginning of a mission to redefine multi-disciplinary technology delivery in India.",
    highlight: "Spirecrest Solutions Pvt. Ltd.",
  },
  {
    date: "2025",
    icon: FileCheck,
    title: "Company Registrations & Compliance",
    description:
      "Full regulatory compliance secured with government registrations, establishing Spirecrest as a legally recognized, audit-ready technology firm.",
    highlight: "CIN: U46909UP2025PTC225556 · GSTIN: 09ABQCS4362K1ZM",
  },
  {
    date: "2025",
    icon: Award,
    title: "Startup India Recognition",
    description:
      "Awarded the prestigious DPIIT certification under the Government of India's Startup India initiative, recognizing our innovation-first approach and scalable business model.",
    highlight: "DIPP228807",
  },
  {
    date: "2025",
    icon: Building2,
    title: "Expansion 2.0",
    description:
      "Extended our departments with a separate operation head for various verticals.",
  },
  {
    date: "Ongoing",
    icon: Rocket,
    title: "9000+ Projects Executed",
    description:
      "A combined legacy of 9000+ successful project executions across surveillance, software development, cybersecurity, and infrastructure, delivered by our partner-led teams.",
    highlight: "And counting.",
  },
  {
    date: "2026",
    icon: Globe,
    title: "Overseas Connections",
    description:
      "As the year started so did our initiatives to step a strong foot in abroad markets as well.",
  },
];

function MilestoneCard({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-0 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"
        }`}
    >
      {/* Card */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.1 }}
        className={`w-full md:w-[calc(50%-2rem)] ${isLeft ? "md:text-right" : "md:text-left"
          }`}
      >
        <div className="ml-12 md:ml-0 p-6 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group">
          <span className="inline-block text-[10px] font-display uppercase tracking-widest text-accent font-semibold mb-2">
            {milestone.date}
          </span>
          <h3 className="font-display text-lg font-bold text-foreground mb-2 flex items-center gap-2 md:justify-inherit">
            {!isLeft && (
              <milestone.icon className="w-4 h-4 text-accent flex-shrink-0 md:hidden" />
            )}
            {milestone.title}
            {isLeft && (
              <milestone.icon className="w-4 h-4 text-accent flex-shrink-0 md:hidden" />
            )}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-3">
            {milestone.description}
          </p>
          {milestone.highlight && (
            <p className="text-xs font-mono text-accent/80 bg-accent/5 inline-block px-2.5 py-1 rounded-md">
              {milestone.highlight}
            </p>
          )}
        </div>
      </motion.div>

      {/* Center dot */}
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.05 }}
        className="absolute left-0 md:left-1/2 top-8 md:-translate-x-1/2 z-10 w-8 h-8 rounded-full bg-accent/10 border-2 border-accent flex items-center justify-center"
      >
        <milestone.icon className="w-3.5 h-3.5 text-accent" />
      </motion.div>

      {/* Spacer for opposite side */}
      <div className="hidden md:block w-[calc(50%-2rem)]" />
    </div>
  );
}

export default function CompanyTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.6"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section className="py-24 lg:py-32 bg-background" ref={containerRef}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            OUR JOURNEY
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Built on Compliance. Driven by Innovation.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Every milestone represents a step toward our mission: delivering
            trustworthy, enterprise-grade technology solutions.
          </p>
        </motion.div>

        {/* Timeline wrapper */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-[15px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-border" />
          {/* Animated fill */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="absolute left-[15px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-accent"
          />

          <div className="space-y-12 md:space-y-16">
            {milestones.map((m, i) => (
              <MilestoneCard key={`${m.date}-${m.title}`} milestone={m} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
