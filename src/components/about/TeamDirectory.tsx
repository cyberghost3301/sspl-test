import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Shield,
  Code,
  Globe,
  TrendingUp,
  Users,
  Linkedin,
} from "lucide-react";

const coreTeam = [
  {
    name: "Aum Chatterjee",
    role: "Director",
    domain: "Technology & Software",
    domainIcon: Code,
    bio: "Leads Spirecrest's software engineering and digital product verticals, architecting scalable web platforms and enterprise applications.",
  },
  {
    name: "Deshesh Agnihotri",
    role: "Director",
    domain: "Infrastructure & Operations",
    domainIcon: Shield,
    bio: "Drives the surveillance, networking, and physical infrastructure verticals with deep expertise in enterprise security systems.",
  },
  {
    name: "Shraddha Dwivedi",
    role: "Director",
    domain: "Strategy & Growth",
    domainIcon: TrendingUp,
    bio: "Oversees corporate strategy, partnerships, and business development — ensuring every vertical aligns with Spirecrest's long-term vision.",
  },
  {
    name: "Chesta Gangwani",
    role: "Director",
    domain: "Design & Experience",
    domainIcon: Users,
    bio: "Champions user-centric design across all Spirecrest verticals, from interior design projects to digital product interfaces.",
  },
  {
    name: "Melody Cantillo",
    role: "Strategic Outreach Partner",
    domain: "Global Outreach",
    domainIcon: Globe,
    bio: "Bridges Spirecrest to international markets, driving global partnership development and cross-border business initiatives.",
  },
];

const engineTeam = [
  { name: "Arjun Mehta", specialty: "Cloud Architect" },
  { name: "Priya Sharma", specialty: "Cybersecurity Lead" },
  { name: "Rohan Kapoor", specialty: "Full-Stack Engineer" },
  { name: "Sneha Patel", specialty: "UI/UX Designer" },
  { name: "Vikram Singh", specialty: "Network Engineer" },
  { name: "Ananya Reddy", specialty: "Data Analyst" },
  { name: "Karan Joshi", specialty: "IoT Specialist" },
  { name: "Meera Nair", specialty: "Project Manager" },
  { name: "Rahul Verma", specialty: "DevOps Engineer" },
  { name: "Divya Gupta", specialty: "QA Engineer" },
  { name: "Amit Tiwari", specialty: "Solar Systems Lead" },
  { name: "Neha Agarwal", specialty: "AV Solutions Expert" },
];

function CoreCard({
  member,
  index,
}: {
  member: (typeof coreTeam)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group relative p-8 rounded-2xl border border-border bg-card hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
    >
      {/* Domain badge */}
      <div className="absolute top-6 right-6">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-display font-semibold uppercase tracking-wider">
          <member.domainIcon className="w-3 h-3" />
          {member.domain}
        </span>
      </div>

      {/* Avatar placeholder */}
      <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors">
        <span className="font-display text-xl font-bold text-foreground/60 group-hover:text-accent transition-colors">
          {member.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </span>
      </div>

      <h3 className="font-display text-xl font-bold text-foreground mb-0.5">
        {member.name}
      </h3>
      <p className="text-xs font-display font-semibold text-accent uppercase tracking-wider mb-3">
        {member.role}
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed">
        {member.bio}
      </p>

      {/* Social hint */}
      <div className="mt-5 pt-4 border-t border-border">
        <button className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors">
          <Linkedin className="w-3.5 h-3.5" />
          Connect
        </button>
      </div>
    </motion.div>
  );
}

export default function TeamDirectory() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-secondary/50" ref={sectionRef}>
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            OUR PEOPLE
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Partner-Led. Expert-Driven.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Every project is steered by a specialized industry leader — not a
            generic project manager. Meet the minds behind Spirecrest.
          </p>
        </motion.div>

        {/* Tier 1 — The Core */}
        <div className="mb-8">
          <p className="text-[10px] font-display uppercase tracking-[0.2em] text-muted-foreground mb-6 text-center">
            Tier 1 — The Core
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreTeam.slice(0, 3).map((member, i) => (
              <CoreCard key={member.name} member={member} index={i} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-3xl mx-auto">
            {coreTeam.slice(3).map((member, i) => (
              <CoreCard key={member.name} member={member} index={i + 3} />
            ))}
          </div>
        </div>

        {/* Tier 2 — The Engine */}
        <div className="mt-20">
          <p className="text-[10px] font-display uppercase tracking-[0.2em] text-muted-foreground mb-6 text-center">
            Tier 2 — The Engine
          </p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            {engineTeam.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.4 + i * 0.04 }}
                className="group text-center p-4 rounded-xl border border-border bg-card hover:border-accent/30 hover:shadow-md transition-all duration-200"
              >
                <div className="w-10 h-10 mx-auto rounded-lg bg-secondary flex items-center justify-center mb-3 group-hover:bg-accent/10 transition-colors">
                  <span className="font-display text-xs font-bold text-foreground/50 group-hover:text-accent transition-colors">
                    {member.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <p className="font-display text-xs font-semibold text-foreground leading-tight">
                  {member.name}
                </p>
                <p className="text-[10px] text-muted-foreground mt-1">
                  {member.specialty}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
