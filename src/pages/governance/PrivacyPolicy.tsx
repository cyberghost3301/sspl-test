import { useRef } from "react";
import { m as motion, useInView } from "framer-motion";
import { Shield, Database, Eye, Lock, Mail, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const LAST_UPDATED = "01 July 2025";
const CONTACT_EMAIL = "info@spirecrest.in";

interface Section {
  id: string;
  icon: React.ElementType;
  title: string;
  content: React.ReactNode;
}

function PolicySection({ section, index }: { section: Section; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group p-8 rounded-2xl border border-border bg-card hover:border-accent/20 transition-all duration-300"
      id={section.id}
    >
      <div className="flex items-start gap-5">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
          <section.icon className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1 min-w-0">
          <h2 className="font-display text-lg font-bold text-foreground mb-4">{section.title}</h2>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">
            {section.content}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const sections: Section[] = [
  {
    id: "introduction",
    icon: Shield,
    title: "1. Introduction",
    content: (
      <>
        <p>
          Spirecrest Solutions Private Limited ("Spirecrest", "we", "us", or "our") is committed to protecting the personal data of every individual who interacts with our website, services, or team. This Privacy Policy governs how we collect, process, store, and protect your data in accordance with applicable Indian data protection laws and industry best practices.
        </p>
        <p>
          By accessing <strong className="text-foreground">spirecrest.in</strong> or engaging with any of our services, you consent to the practices described herein. If you do not agree, please discontinue use of our website and contact us to discuss your data preferences.
        </p>
      </>
    ),
  },
  {
    id: "data-collected",
    icon: Database,
    title: "2. Data We Collect",
    content: (
      <>
        <p>We may collect the following categories of personal data:</p>
        <ul className="list-none space-y-2 mt-3">
          {[
            ["Identity Data", "Full name, designation, company name"],
            ["Contact Data", "Email address, phone number, postal address"],
            ["Technical Data", "IP address, browser type, device identifiers, session data"],
            ["Usage Data", "Pages visited, time on site, clicks, referral sources"],
            ["Communication Data", "Messages submitted via contact forms, emails, or inquiry portals"],
            ["Transactional Data", "Project details, service requests, and procurement information shared during engagements"],
          ].map(([type, desc]) => (
            <li key={type} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">◆</span>
              <span><strong className="text-foreground">{type}:</strong> {desc}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">We do not collect sensitive personal data (e.g. biometrics, financial account details, health information) unless explicitly required for a contracted service and agreed in writing.</p>
      </>
    ),
  },
  {
    id: "how-we-use",
    icon: Eye,
    title: "3. How We Use Your Data",
    content: (
      <>
        <p>We process your personal data only where we have a lawful basis to do so. Our primary purposes are:</p>
        <ul className="list-none space-y-2 mt-3">
          {[
            "To respond to inquiries and service requests submitted through our contact channels",
            "To deliver contracted services and manage the project lifecycle",
            "To send transactional communications (project updates, invoices, AMC reminders)",
            "To improve our website, services, and user experience through aggregated analytics",
            "To comply with legal obligations including tax, audit, and regulatory requirements",
            "To protect our legal rights and prevent fraud or unauthorized access",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">◆</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">We will never sell, rent, or trade your personal data to third parties for commercial purposes.</p>
      </>
    ),
  },
  {
    id: "data-security",
    icon: Lock,
    title: "4. Data Security",
    content: (
      <>
        <p>
          We implement appropriate technical and organizational measures to protect your personal data against accidental loss, unauthorized access, alteration, or disclosure. These include:
        </p>
        <ul className="list-none space-y-2 mt-3">
          {[
            "TLS/SSL encryption for all data transmitted through our website and APIs",
            "Access controls limiting data access to authorized personnel on a need-to-know basis",
            "Regular security reviews of our backend infrastructure and third-party integrations",
            "Secure storage practices aligned with ISO 27001 principles",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">◆</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">
          No internet transmission is 100% secure. While we take every reasonable precaution, we cannot guarantee absolute security. In the event of a data breach affecting your personal data, we will notify you in accordance with applicable law.
        </p>
      </>
    ),
  },
  {
    id: "third-parties",
    icon: RefreshCw,
    title: "5. Third-Party Services & Data Sharing",
    content: (
      <>
        <p>We may share your data with trusted service providers who support our operations, including:</p>
        <ul className="list-none space-y-2 mt-3">
          {[
            "Vercel (hosting and serverless infrastructure)",
            "Email service providers for transactional communications",
            "Analytics platforms for aggregated, anonymized website usage data",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">◆</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3">All third-party processors are contractually bound to process your data only for specified purposes and in accordance with applicable data protection law. We do not transfer personal data outside India except where required for contracted cloud infrastructure services.</p>
      </>
    ),
  },
  {
    id: "your-rights",
    icon: Mail,
    title: "6. Your Rights & Contact",
    content: (
      <>
        <p>You have the following rights with respect to your personal data:</p>
        <ul className="list-none space-y-2 mt-3">
          {[
            "Access — Request a copy of the personal data we hold about you",
            "Rectification — Request correction of inaccurate or incomplete data",
            "Erasure — Request deletion of your data where we have no lawful basis to retain it",
            "Objection — Object to processing for direct marketing or analytics purposes",
            "Restriction — Request that we limit processing in certain circumstances",
          ].map((item) => (
            <li key={item} className="flex items-start gap-2">
              <span className="text-accent mt-1 shrink-0">◆</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p className="mt-4">
          To exercise any of these rights, or if you have questions about this policy, contact our Data Officer at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline font-semibold">
            {CONTACT_EMAIL}
          </a>. We will respond within 30 days of receiving your request.
        </p>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Spirecrest Solutions"
        description="How Spirecrest Solutions collects, uses, and protects your personal data. Read our full privacy policy."
        path="/privacy-policy"
      />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-hero-gradient">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="section-container relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-display uppercase tracking-[0.25em] text-accent mb-6"
          >
            Legal & Governance
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            style={{ color: "hsl(var(--on-dark))" }}
          >
            Privacy <span className="text-gradient">Policy.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-base leading-relaxed max-w-xl mx-auto"
            style={{ color: "hsl(var(--on-dark-muted))" }}
          >
            Last updated: <strong className="text-white">{LAST_UPDATED}</strong>
          </motion.p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="section-container max-w-4xl mx-auto">
          {/* Quick nav */}
          <div className="mb-12 p-6 rounded-2xl border border-border bg-card">
            <p className="text-xs font-display uppercase tracking-widest text-muted-foreground mb-4">Contents</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="text-sm text-muted-foreground hover:text-accent transition-colors font-display"
                >
                  {s.title}
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {sections.map((section, i) => (
              <PolicySection key={section.id} section={section} index={i} />
            ))}
          </div>

          <div className="mt-10 p-6 rounded-2xl border border-accent/20 bg-accent/5 text-center">
            <p className="text-sm text-muted-foreground">
              Questions about this policy?{" "}
              <Link to="/contact" className="text-accent font-semibold hover:underline">
                Contact us
              </Link>{" "}
              or email{" "}
              <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent font-semibold hover:underline">
                {CONTACT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
