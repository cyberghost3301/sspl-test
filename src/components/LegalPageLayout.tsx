import { m as motion } from "framer-motion";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";

interface Section {
  id: string;
  heading: string;
}

interface LegalPageLayoutProps {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  lastUpdated: string;
  sections: Section[];
  children: ReactNode;
}

export default function LegalPageLayout({
  badge,
  title,
  highlight,
  subtitle,
  lastUpdated,
  sections,
  children,
}: LegalPageLayoutProps) {
  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-center justify-center overflow-hidden bg-hero-gradient">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />

        <div className="section-container relative z-10 py-28 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-display uppercase tracking-[0.25em] text-accent mb-6"
          >
            {badge}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-5"
            style={{ color: "hsl(var(--on-dark))" }}
          >
            {title}{" "}
            <span className="text-gradient">{highlight}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-base max-w-lg mx-auto leading-relaxed mb-6"
            style={{ color: "hsl(var(--on-dark-muted))" }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5"
          >
            <Calendar className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs text-white/60 font-display">
              Last updated: {lastUpdated}
            </span>
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="section-container">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 items-start">

            {/* Sticky ToC — desktop */}
            <aside className="hidden lg:block sticky top-28 self-start">
              <div className="p-6 rounded-2xl border border-border bg-card">
                <p className="text-xs font-display uppercase tracking-widest text-accent mb-4 font-semibold">
                  Contents
                </p>
                <nav className="space-y-1.5">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="block text-sm text-muted-foreground hover:text-accent transition-colors py-1 pl-3 border-l-2 border-transparent hover:border-accent"
                    >
                      {s.heading}
                    </a>
                  ))}
                </nav>

                <div className="mt-6 pt-5 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    Questions about this policy?
                  </p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-1.5 text-xs font-display font-semibold text-accent hover:text-accent/80 transition-colors"
                  >
                    Contact Us <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </aside>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="min-w-0"
            >
              {/* Company info strip */}
              <div className="flex flex-wrap gap-4 mb-10 p-5 rounded-xl border border-border bg-card">
                <div>
                  <p className="text-[10px] font-display uppercase tracking-widest text-muted-foreground mb-0.5">Company</p>
                  <p className="text-sm font-semibold text-foreground font-display">Spirecrest Solutions Private Limited</p>
                </div>
                <div>
                  <p className="text-[10px] font-display uppercase tracking-widest text-muted-foreground mb-0.5">CIN</p>
                  <p className="text-sm font-mono text-foreground">U46909UP2025PTC225556</p>
                </div>
                <div>
                  <p className="text-[10px] font-display uppercase tracking-widest text-muted-foreground mb-0.5">GSTIN</p>
                  <p className="text-sm font-mono text-foreground">09ABQCS4362K1ZM</p>
                </div>
              </div>

              {children}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
