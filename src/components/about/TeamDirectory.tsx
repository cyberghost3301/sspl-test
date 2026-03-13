import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code,
  TrendingUp,
  Brain,
  Linkedin,
} from "lucide-react";

/* ───────── Tier 1 - C-Suite / Leadership ───────── */
const cSuite = [
  {
    name: "Aum Chatterjee",
    role: "Director of Technology",
    domainIcon: Code,
    domain: "Technology",
    bio: "Leads Spirecrest's software engineering and digital product verticals, architecting scalable web platforms and enterprise-grade applications that power modern businesses.",
    initials: "AC",
    imageUrl: "/pp/aum.jpg",
    linkedin: "https://www.linkedin.com/in/aum-chatterjee/",
  },
  {
    name: "Chesta Gangwani",
    role: "Director of Finance",
    domainIcon: TrendingUp,
    domain: "Finance",
    bio: "Steers Spirecrest's financial strategy, budgeting, and fiscal governance, driving sustainable growth while maintaining full regulatory compliance.",
    initials: "CG",
    imageUrl: "/pp/chesta.jpg",
    linkedin: "https://www.linkedin.com/in/chesta-gangwani/",
  },
  {
    name: "Shraddha Dwivedi",
    role: "Director of Operations",
    domainIcon: Brain,
    domain: "Operations",
    bio: "Orchestrates end-to-end project delivery and operational excellence across all verticals, ensuring every engagement meets Spirecrest's exacting quality standards.",
    initials: "SD",
    imageUrl: "/pp/shraddha.jpg",
    linkedin: "https://www.linkedin.com/in/shraddha-dwivedi-1a1936272/",
  },
];

/* ───────── Tier 2 - Management & Operations ───────── */
const managementTeam = [
  {
    name: "Deshesh Agnihotri",
    role: "Director",    
    bio: "Drives organisational strategy, resource planning, and cross-vertical coordination to keep Spirecrest operating at peak efficiency.",
    imageUrl: "/pp/deshesh.jpg",
    linkedin: "https://www.linkedin.com/in/deshesh-agnihotri-906484226/",
  },
  {
    name: "Er. Saurabh",
    role: "Strategic Advisor",
    bio: "Provides high-level technical counsel on infrastructure decisions, aligning engineering roadmaps with long-term business objectives.",
    imageUrl: "/placeholder.svg",
    linkedin: "https://www.linkedin.com/in/saurabhkumarrao/",
  },
  {
    name: "Ar. Laraib",
    role: "Consulting Architect",
    bio: "Bridges architectural design and spatial planning expertise, guiding interior and structural projects from concept through execution.",
    imageUrl: "/pp/laraib.jpg",
    linkedin: "https://www.linkedin.com/in/laraibahmad/",
  },
  {
    name: "Shristi",
    role: "Growth Facilitator",
    bio: "Identifies and accelerates new market opportunities, building strategic partnerships that fuel Spirecrest's expansion across verticals.",
    imageUrl: "/pp/shristi.jpg",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Er. Anshuman",
    role: "Sr. Project Catalyst",
    bio: "Manages complex, multi-disciplinary projects end-to-end, ensuring timelines, budgets, and deliverables stay on track.",
    imageUrl: "/pp/anshuman.jpg",
    linkedin: "https://www.linkedin.com/in/anshuman-singh-full-stack-developer/",
  },
  {
    name: "Prof. Rahul",
    role: "Business Advisor",
    bio: "Brings academic rigour and industry insight to shape Spirecrest's go-to-market strategies and client engagement frameworks.",
    imageUrl: "/pp/rahul.jpg",
    linkedin: "https://linkedin.com/in/",
  },
  {
    name: "Er. Shashank",
    role: "Sr. Project Head",
    bio: "Leads flagship infrastructure and technology rollouts, coordinating engineering teams to deliver enterprise-grade solutions on schedule.",
    imageUrl: "/pp/shashank.jpg",
    linkedin: "https://www.linkedin.com/in/shashank-kumar-rao-160216114/",
  },
  {
    name: "Antara",
    role: "PR & Outreach",
    bio: "Crafts Spirecrest's public narrative, managing media relations, brand communications, and stakeholder outreach campaigns.",
    imageUrl: "/pp/antara.jpg",
    linkedin: "https://www.linkedin.com/in/antaraprofile/",
  },
  {
    name: "Melody Cantillo",
    role: "Strategic Outreach Partner",
    bio: "Bridges Spirecrest to international markets, driving global partnership development and cross-border business initiatives.",
    imageUrl: "/pp/melody.jpg",
    linkedin: "https://www.linkedin.com/in/melody-cantillo-0378641b1/",
  },
];

/* ───────── Tier 3 - Development ───────── */
const developmentTeam = [
  { name: "Vaibhavi Dhenge", role: "Development Associate", imageUrl: "/pp/vaibhavi.jpg", linkedin: "https://linkedin.com/in/" },
  { name: "Isha Gupta", role: "Market Advisor", imageUrl: "/placeholder.svg", linkedin: "https://linkedin.com/in/" },
  { name: "Er. Aakash", role: "External Consultant", imageUrl: "/pp/aakash.jpg", linkedin: "https://linkedin.com/in/" },
  { name: "Sanchita Nath", role: "SMM Coordinator", imageUrl: "/pp/sanchita.jpg", linkedin: "https://linkedin.com/in/" },
  { name: "Astha Dwivedi", role: "BDA", imageUrl: "/pp/astha.jpg", linkedin: "https://linkedin.com/in/" },
  { name: "Krish Sheta", role: "Jr. S/W Developer", imageUrl: "/placeholder.svg", linkedin: "https://linkedin.com/in/" },
  { name: "Neeraj Tetari", role: "Jr. S/W Developer", imageUrl: "/pp/neeraj.jpg", linkedin: "https://linkedin.com/in/" },
  { name: "Anand Verma", role: "Jr. S/W Developer", imageUrl: "/pp/anand.jpg", linkedin: "https://linkedin.com/in/" },
  { name: "Saloni Ojha", role: "Backend Framework", imageUrl: "/pp/saloni.jpg", linkedin: "https://linkedin.com/in/" },
  { name: "Kavya Saini", role: "DS/AI-ML Applications", imageUrl: "/pp/kavya.jpg", linkedin: "https://linkedin.com/in/" },
  { name: "Anushka Singh", role: "Outreach Operations", imageUrl: "/pp/anushka.jpg", linkedin: "https://linkedin.com/in/" },
  { name: "Srishti Saxena", role: "Strategic Growth", imageUrl: "/pp/srishti.jpg", linkedin: "https://linkedin.com/in/" },
  { name: "Janvi Gautam", role: "Business Operations", imageUrl: "/pp/janvi.jpg", linkedin: "https://linkedin.com/in/" },
  { name: "Ekta Singh", role: "Customer Support", imageUrl: "/pp/ekta.jpg", linkedin: "https://linkedin.com/in/" },
];

/* ───────── Tier 4 - Support ───────── */
const supportTeam = [
  { name: "Arjun Mehta", role: "Cloud Architect", imageUrl: "/placeholder.svg"},
  { name: "Priya Sharma", role: "Cybersecurity Lead", imageUrl: "/placeholder.svg"},
  { name: "Rohan Kapoor", role: "Full-Stack Engineer", imageUrl: "/placeholder.svg"},
  { name: "Sneha Patel", role: "UI/UX Designer", imageUrl: "/placeholder.svg"},
  { name: "Vikram Singh", role: "Network Engineer", imageUrl: "/placeholder.svg"},
  { name: "Ananya Reddy", role: "Data Analyst", imageUrl: "/placeholder.svg"},
  { name: "Karan Joshi", role: "IoT Specialist", imageUrl: "/placeholder.svg"},
  { name: "Meera Nair", role: "Project Manager", imageUrl: "/placeholder.svg"},
  { name: "Rahul Verma", role: "DevOps Engineer", imageUrl: "/placeholder.svg"},
  { name: "Divya Gupta", role: "QA Engineer", imageUrl: "/placeholder.svg"},
  { name: "Amit Tiwari", role: "Solar Systems Lead", imageUrl: "/placeholder.svg"},
  { name: "Neha Agarwal", role: "AV Solutions Expert", imageUrl: "/placeholder.svg"},
];

function getInitials(name: string) {
  return name
    .replace(/^(Er\.|Ar\.|Prof\.) ?/, "")
    .split(" ")
    .filter(Boolean)
    .map((n) => n[0])
    .join("")
    .slice(0, 2);
}

/* ═══════════ C-Suite Card (Tier 1) ═══════════ */
function CSuiteCard({ member, index }: { member: (typeof cSuite)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.12 }}
      className="group relative p-8 lg:p-10 rounded-2xl border border-border bg-card hover:border-accent/40 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300"
    >
      <div className="absolute top-6 right-6">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 text-accent text-[10px] font-display font-semibold uppercase tracking-wider">
          <member.domainIcon className="w-3 h-3" />
          {member.domain}
        </span>
      </div>

      <div className="w-24 h-24 rounded-2xl bg-secondary flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors overflow-hidden">
        {member.imageUrl && member.imageUrl !== "/placeholder.svg" ? (
          <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <span className="font-display text-2xl font-bold text-foreground/60 group-hover:text-accent transition-colors">
            {member.initials}
          </span>
        )}
      </div>

      <h3 className="font-display text-2xl font-bold text-foreground mb-0.5">
        {member.name}
      </h3>
      <p className="text-xs font-display font-semibold text-accent uppercase tracking-wider mb-3">
        {member.role}
      </p>
      <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>

      <div className="mt-5 pt-4 border-t border-border">
        {member.linkedin ? (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors">
            <Linkedin className="w-3.5 h-3.5" />
            Connect
          </a>
        ) : (
          <button className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors">
            <Linkedin className="w-3.5 h-3.5" />
            Connect
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════ Management Card (Tier 2 - with bios for all) ═══════════ */
function ManagementCard({
  member,
  index,
  inView,
}: {
  member: (typeof managementTeam)[0];
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className="group relative p-6 rounded-xl border border-border bg-card hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
    >
      {"domainIcon" in member && (member as any).domainIcon && (
        <div className="absolute top-4 right-4">
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[9px] font-display font-semibold uppercase tracking-wider">
            {(() => {
              const Icon = (member as any).domainIcon;
              return <Icon className="w-2.5 h-2.5" />;
            })()}
            {(member as any).domain}
          </span>
        </div>
      )}

      <div className="w-14 h-14 rounded-xl bg-secondary flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors overflow-hidden">
        {member.imageUrl && member.imageUrl !== "/placeholder.svg" ? (
          <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover" />
        ) : (
          <span className="font-display text-base font-bold text-foreground/55 group-hover:text-accent transition-colors">
            {getInitials(member.name)}
          </span>
        )}
      </div>

      <h4 className="font-display text-lg font-bold text-foreground mb-0.5">
        {member.name}
      </h4>
      <p className="text-[11px] font-display font-semibold text-accent uppercase tracking-wider mb-2">
        {member.role}
      </p>
      <p className="text-xs text-muted-foreground leading-relaxed">
        {member.bio}
      </p>

      <div className="mt-4 pt-3 border-t border-border">
        {member.linkedin ? (
          <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors">
            <Linkedin className="w-3.5 h-3.5" />
            Connect
          </a>
        ) : (
          <button className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-accent transition-colors">
            <Linkedin className="w-3.5 h-3.5" />
            Connect
          </button>
        )}
      </div>
    </motion.div>
  );
}

/* ═══════════ Dev Tile (Tier 3 - avatar left, name+role right) ═══════════ */
function DevTile({
  name,
  role,
  imageUrl,
  linkedin,
  index,
  inView,
}: {
  name: string;
  role: string;
  imageUrl?: string;
  linkedin?: string;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.04 }}
      className="group flex items-center gap-4 p-5 rounded-xl border border-border bg-card hover:border-accent/30 hover:shadow-md transition-all duration-200"
    >
      <div className="w-12 h-12 shrink-0 rounded-lg bg-secondary flex items-center justify-center group-hover:bg-accent/10 transition-colors overflow-hidden">
        {imageUrl && imageUrl !== "/placeholder.svg" ? (
          <img src={imageUrl} alt={name} className="w-full h-full object-cover" />
        ) : (
          <span className="font-display text-sm font-bold text-foreground/50 group-hover:text-accent transition-colors">
            {getInitials(name)}
          </span>
        )}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display text-[15px] font-semibold text-foreground leading-tight truncate">
          {name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">{role}</p>
      </div>
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="shrink-0 text-muted-foreground hover:text-accent transition-colors">
          <Linkedin className="w-4 h-4" />
        </a>
      )}
    </motion.div>
  );
}

/* ═══════════ Support Tile (Tier 4 - name + role only, no avatar) ═══════════ */
function SupportTile({
  name,
  role,
  linkedin,
  index,
  inView,
}: {
  name: string;
  role: string;
  linkedin?: string;
  index: number;
  inView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.3, delay: 0.1 + index * 0.04 }}
      className="group text-center py-4 px-4 rounded-xl border border-border bg-card hover:border-accent/30 hover:shadow-sm transition-all duration-200"
    >
      <p className="font-display text-sm font-semibold text-foreground leading-tight">
        {name.split(" ")[0]}
      </p>
      <p className="text-[11px] text-muted-foreground mt-1">{role}</p>
      {linkedin && (
        <a href={linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center mt-2 text-muted-foreground hover:text-accent transition-colors">
          <Linkedin className="w-3.5 h-3.5" />
        </a>
      )}
    </motion.div>
  );
}

/* ═══════════ Main Export ═══════════ */
export default function TeamDirectory() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-secondary/50" ref={sectionRef}>
      <div className="section-container">
        {/* Header */}
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
            Every project is steered by a specialised industry leader, not a
            generic project manager. Meet the minds behind Spirecrest.
          </p>
        </motion.div>

        {/* ── Tier 1: C-Suite / Leadership ── */}
        <div className="mb-16">
          <p className="text-xs font-display uppercase tracking-[0.2em] text-foreground/70 font-bold mb-6 text-center">
            Leadership
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cSuite.map((m, i) => (
              <CSuiteCard key={m.name} member={m} index={i} />
            ))}
          </div>
        </div>

        {/* ── Tier 2: Management & Operations ── */}
        <div className="mb-16">
          <p className="text-xs font-display uppercase tracking-[0.2em] text-foreground/70 font-bold mb-6 text-center">
            Management & Operations
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {managementTeam.map((m, i) => (
              <ManagementCard key={m.name} member={m} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* ── Tier 3: Development ── */}
        <div className="mb-16">
          <p className="text-xs font-display uppercase tracking-[0.2em] text-foreground/70 font-bold mb-6 text-center">
            Development
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {developmentTeam.map((m, i) => (
              <DevTile key={m.name} name={m.name} role={m.role} imageUrl={m.imageUrl} linkedin={m.linkedin} index={i} inView={inView} />
            ))}
          </div>
        </div>

        {/* ── Tier 4: Support ── */}
        <div>
          <p className="text-xs font-display uppercase tracking-[0.2em] text-foreground/70 font-bold mb-6 text-center">
            Support
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {supportTeam.map((m, i) => (
              <SupportTile key={m.name} name={m.name} role={m.role} linkedin={m.linkedin} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
