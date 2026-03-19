import { useState, useRef } from "react";
import { m as motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import SEO from "@/components/SEO";

const faqCategories = [
  {
    id: "company",
    label: "Company & Model",
    faqs: [
      {
        q: "What is Spirecrest's Partner-Led Execution Model?",
        a: "Unlike traditional IT firms that assign junior staff after you sign, Spirecrest's Partner-Led model means your project is owned and executed by a named senior principal — an industry expert with 10+ years of real-world experience in exactly your problem domain. There are no middlemen, no delegation chains, no surprises. You speak directly to the person doing the work.",
      },
      {
        q: "Is Spirecrest Solutions Pvt. Ltd. a registered company?",
        a: "Yes. Spirecrest Solutions Private Limited was officially incorporated on June 6, 2025, under the Ministry of Corporate Affairs, Government of India. Our CIN is U46909UP2025PTC225556, our GSTIN is 09ABQCS4362K1ZM, and we hold the prestigious DPIIT Startup India certification (DIPP228807), making us a legally recognized, audit-ready enterprise technology firm.",
      },
      {
        q: "Where is Spirecrest headquartered and do you serve clients outside Lucknow?",
        a: "Our Head Office is at 41/68, Kali Niwas, Narhi, Hazratganj, Lucknow, Uttar Pradesh — 226001. We serve clients pan-India through a robust network of 450+ retained specialists and outsourced partners. For large enterprise contracts and government projects, we are fully capable of on-site deployment anywhere in India. We are also initiating overseas connections from 2026.",
      },
      {
        q: "What industries and client types does Spirecrest work with?",
        a: "We serve individual consumers, SMEs, corporates, and government/public sector bodies across 12 service verticals. Our enterprise focus is on surveillance & security, software & digital products, IT infrastructure, smart automation, networking, and lifecycle/venture consulting. Notable verticals include education, healthcare, logistics, manufacturing, real estate, hospitality, and government infrastructure.",
      },
      {
        q: "Do you take on small projects, or only large enterprise contracts?",
        a: "Both. While our infrastructure and partner model is optimized for enterprise-scale engagements, we pride ourselves on bespoke solutions for every client size — from a 5-camera residential setup to a 500-node cloud deployment. If your requirements are real and your expectations are clear, we have a model that works for you.",
      },
    ],
  },
  {
    id: "surveillance",
    label: "Surveillance & Security",
    faqs: [
      {
        q: "What surveillance hardware brands does Spirecrest supply and install?",
        a: "We work with a curated selection of enterprise-grade manufacturers including Hikvision, Dahua, Axis Communications, Bosch Security, Honeywell, Pelco, Samsung Hanwha, Avigilon, and Genetec for software platforms. For physical security hardware, we supply walkthrough metal detectors, X-ray baggage scanners (dual-energy with AI threat detection), UVIS under-vehicle inspection systems, and explosive trace detectors (ETD). All hardware is sourced from CE/FCC/ROHS-compliant suppliers.",
      },
      {
        q: "Can Spirecrest handle government procurement projects for surveillance systems?",
        a: "Yes. We have direct experience with large-scale procurement and installation for government buildings, public sector campuses, and municipal infrastructure. Our compliance documentation, audit-ready reporting, and DPIIT certification make us a qualified vendor for government tenders. We support GeM (Government e-Marketplace) procurement processes and can supply detailed technical specifications for tendering purposes.",
      },
      {
        q: "Do you offer Annual Maintenance Contracts (AMC) for installed systems?",
        a: "Absolutely. AMC is a core part of our operational lifecycle offering. Our contracts include scheduled preventive maintenance visits, firmware and software updates, hardware health checks, prioritized incident response (with defined SLA response times), and compliance documentation. We also offer centralized AMC consolidation for enterprises with fragmented multi-vendor maintenance contracts — typically yielding 28–35% cost reduction.",
      },
      {
        q: "Can you integrate new surveillance systems with our existing IT infrastructure?",
        a: "Yes — this is standard for us. Our engineers assess your existing network topology, access control systems, and NVR/DVR setups before recommending an integration strategy. We use IP-based camera systems that connect over existing LAN/WAN infrastructure, and our cloud-hybrid storage solutions can work alongside on-premise setups. We avoid requiring a full infrastructure overhaul unless absolutely necessary.",
      },
    ],
  },
  {
    id: "software",
    label: "Software & Development",
    faqs: [
      {
        q: "What is the typical timeline for a custom software project?",
        a: "It depends on scope. A simple web application or landing portal: 4–6 weeks. A mid-complexity dashboard or integrated web app: 8–12 weeks. A full SaaS platform, e-commerce system, or ERP integration: 3–5 months. Enterprise-scale platforms with AI/ML features or microservices architecture: 6–12 months. We use our interactive Scoping Calculator on the Software page to give you a realistic estimate before any commercial conversation.",
      },
      {
        q: "What tech stacks does your team work with?",
        a: "Our primary stacks are React, Next.js, and Node.js for web; Flutter and React Native for mobile; Python (FastAPI, Django) for AI/ML and backend services; PostgreSQL, MongoDB, and Redis for data; Docker, Kubernetes, and AWS/GCP for infrastructure; and TensorFlow/OpenAI APIs for AI integration. We work across 15+ stacks — if it's production-grade, we've likely shipped it.",
      },
      {
        q: "Can you modernize or migrate a legacy system without disrupting operations?",
        a: "Yes. Legacy modernization is one of our declared specializations. Our approach follows a phased migration strategy — we audit the existing codebase, identify critical dependencies, establish a parallel deployment, and migrate incrementally with zero data loss. We've successfully modernized systems ranging from desktop ERP applications to government CRUD databases to mobile-first platforms.",
      },
    ],
  },
  {
    id: "lifecycle",
    label: "IT Consulting & Lifecycle",
    faqs: [
      {
        q: "What does the Lifecycle & Venture Consulting service actually include?",
        a: "It covers two tracks. The Operational Lifecycle track includes turnkey IT architecture, centralized AMC management, vendor governance, procurement advisory, financing model structuring (CAPEX vs. OPEX), and staff training programs. The Venture Studio track covers investor-grade pitch deck creation, VC and angel investor strategy, capital stack mapping, and tech financial modeling (unit economics, ARR projections, burn analysis). Both tracks are delivered by senior principals, not consultants.",
      },
      {
        q: "How do you approach IT infrastructure design for a new enterprise deployment?",
        a: "We begin with a full infrastructure audit (for existing setups) or requirements gathering (for greenfield deployments). Our principals then produce an architecture blueprint — covering network topology, cloud/on-premise split, security layers, zero-trust access design, and a phased deployment roadmap with vendor selection criteria. We design for a 5-year growth horizon, not just the current load. Target outcome: zero unplanned downtime within 90 days of commissioning.",
      },
      {
        q: "What makes your pitch deck and VC advisory different from a typical consultant?",
        a: "Our principals have sat on both sides of the term sheet — as founders and as evaluators. We don't produce slide templates. We construct narrative-locked decks built on verified traction signals, defensible TAM triangulation, and unit economics that survive CFO-level due diligence. We then map your raise to the correct capital stack: right investors, right stage, right terms. Most VC rejections are structural, not product-related — we fix the structure.",
      },
    ],
  },
  {
    id: "engagement",
    label: "Engagement & Support",
    faqs: [
      {
        q: "How do I start an engagement with Spirecrest?",
        a: "Click 'Partner With Us' in the navigation or visit our Contact page. For enterprise and government inquiries, we recommend using the contact form and selecting the relevant service — a principal will respond within 24 business hours with a scoping call invitation. There's no SDR filter, no canned deck. First contact goes directly to a decision-maker.",
      },
      {
        q: "What post-deployment support do you offer?",
        a: "Our support structure depends on the engagement type. For surveillance and infrastructure deployments, we offer tiered AMC packages (Basic, Standard, Priority) with defined SLA response times. For software projects, we offer a standard 30-day warranty period post-launch with bug fixes at no cost, followed by optional retainer-based maintenance and feature development. All support is managed through a centralized ticketing system with your assigned principal as the escalation point.",
      },
      {
        q: "Is my data and project information kept confidential?",
        a: "Yes. We operate under strict NDAs as standard for all engagements. Technical details, business data, financial models, and procurement information shared with Spirecrest are treated as confidential and are not shared with third parties without explicit written consent. Our data handling is aligned with the Information Technology Act, 2000 and applicable DPDP (Digital Personal Data Protection) Act provisions. For more details, see our Privacy Policy.",
      },
      {
        q: "Does Spirecrest offer financing or deferred payment options for large projects?",
        a: "Yes, for qualifying enterprise and government contracts. We advise on CAPEX vs. OPEX structuring, technology leasing options, and milestone-based payment schedules that align project billing to delivery phases. For startups working with us on venture consulting, we're open to discussing equity or success-fee arrangements on a case-by-case basis during initial scoping.",
      },
    ],
  },
];

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
  parentInView,
}: {
  faq: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
  parentInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={parentInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      className={`rounded-2xl border bg-card transition-all duration-300 ${
        isOpen ? "border-accent/30 shadow-lg shadow-accent/5" : "border-border"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-start gap-4 p-6 text-left group"
        aria-expanded={isOpen}
      >
        <div
          className={`mt-0.5 w-6 h-6 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${
            isOpen
              ? "border-accent bg-accent/10 text-accent"
              : "border-border text-muted-foreground group-hover:border-accent/40"
          }`}
        >
          <ChevronDown
            className={`w-3.5 h-3.5 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
        <h3
          className={`font-display text-base font-semibold leading-snug transition-colors ${
            isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
          }`}
        >
          {faq.q}
        </h3>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 pl-16">
              <p className="text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function FAQCategory({
  category,
  isActive,
  onClick,
}: {
  category: (typeof faqCategories)[0];
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div ref={ref} className="mb-14">
      <motion.div
        initial={{ opacity: 0, x: -16 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-3 mb-6"
      >
        <div className="h-px flex-1 bg-border" />
        <span className="text-xs font-display uppercase tracking-widest text-accent font-semibold px-3 py-1.5 rounded-full border border-accent/20 bg-accent/5">
          {category.label}
        </span>
        <div className="h-px flex-1 bg-border" />
      </motion.div>

      <div className="space-y-3">
        {category.faqs.map((faq, i) => (
          <FAQItem
            key={i}
            faq={faq}
            index={i}
            isOpen={openIndex === i}
            onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            parentInView={inView}
          />
        ))}
      </div>
    </div>
  );
}

export default function FAQ() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <>
      <SEO
        title="Frequently Asked Questions | Spirecrest Solutions"
        description="Find answers to common questions about Spirecrest's services, Partner-Led model, surveillance hardware, software development, IT consulting, and engagement process."
        path="/faq"
      />

      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden bg-hero-gradient">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
        <div className="absolute top-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[120px]" />

        <div className="section-container relative z-10 py-32 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-display uppercase tracking-[0.25em] text-accent mb-6"
          >
            Support & Knowledge Base
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6"
            style={{ color: "hsl(var(--on-dark))" }}
          >
            Frequently Asked{" "}
            <span className="text-gradient">Questions.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-lg max-w-xl mx-auto leading-relaxed"
            style={{ color: "hsl(var(--on-dark-muted))" }}
          >
            Everything you need to know about working with Spirecrest — our model, services, and how we engage.
          </motion.p>

          {/* Quick category jump pills */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-8 flex flex-wrap justify-center gap-2"
          >
            {faqCategories.map((cat) => (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="text-xs font-display font-semibold px-4 py-2 rounded-full border border-accent/20 bg-accent/5 text-accent hover:bg-accent/10 transition-colors"
              >
                {cat.label}
              </a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Strip */}
      <section
        ref={statsRef}
        className="py-12 border-b border-border"
        style={{
          background: "linear-gradient(180deg, hsl(220 25% 6%) 0%, hsl(220 25% 10%) 50%, hsl(220 25% 6%) 100%)",
          borderColor: "rgba(255,255,255,0.08)",
        }}
      >
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "9000+", label: "Projects Delivered" },
              { value: "12", label: "Service Verticals" },
              { value: "450+", label: "Specialist Network" },
              { value: "24hr", label: "Response Commitment" },
            ].map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <p className="font-display text-3xl font-bold text-accent">{s.value}</p>
                <p className="text-xs text-white/50 mt-1 font-medium uppercase tracking-wide">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-24 lg:py-32 bg-background">
        <div className="section-container max-w-4xl mx-auto">
          {faqCategories.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-24">
              <FAQCategory category={cat} isActive={false} onClick={() => {}} />
            </div>
          ))}
        </div>
      </section>

      {/* Still Have Questions CTA */}
      <section className="py-20 bg-secondary/50 border-t border-border">
        <div className="section-container">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-6">
                <MessageCircle className="w-7 h-7 text-accent" />
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
                Still Have Questions?
              </h2>
              <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
                If you didn't find what you were looking for, our principals are a message away.
                No pre-sales filters — just a direct conversation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact">
                  <Button
                    size="lg"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold gap-2 px-8"
                  >
                    <Mail className="w-4 h-4" />
                    Contact Our Team
                  </Button>
                </Link>
                <a href="tel:+919250974145">
                  <Button
                    size="lg"
                    variant="outline"
                    className="font-display font-semibold gap-2 px-8 border-border"
                  >
                    <Phone className="w-4 h-4" />
                    +91 9250974145
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
