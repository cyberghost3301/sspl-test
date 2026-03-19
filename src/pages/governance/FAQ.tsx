import { useState, useRef } from "react";
import { m as motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircle, Search } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";
import CTASection from "@/components/CTASection";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQCategory {
  label: string;
  id: string;
  items: FAQItem[];
}

const faqData: FAQCategory[] = [
  {
    id: "general",
    label: "General",
    items: [
      {
        q: "What is Spirecrest Solutions Private Limited?",
        a: "Spirecrest Solutions Pvt. Ltd. (SSPL) is a DPIIT-recognized, multi-disciplinary technology and infrastructure firm headquartered in Lucknow, Uttar Pradesh. We operate across 12 service verticals — from advanced physical surveillance and enterprise software development to solar power, AV studio setup, and strategic lifecycle consulting. We serve individual consumers, SMBs, and large enterprises across India.",
      },
      {
        q: "Where is Spirecrest based, and do you serve clients outside Lucknow?",
        a: "Our head office is at 41/68, Kali Niwas, Narhi, Hazratganj, Lucknow, UP 226001. However, we operate pan-India through a network of 450+ retained specialists and outsourced experts. Remote engagements, on-site deployments, and hybrid project delivery across India are all standard practice.",
      },
      {
        q: "Is Spirecrest registered and compliant?",
        a: "Yes. Spirecrest Solutions Private Limited is a DPIIT-recognized Startup India entity. We align our processes with ISO standards and applicable GoI compliance frameworks. Our IT infrastructure and software engagements reference ISO 27001 and CERT-In guidelines where applicable.",
      },
      {
        q: "How does the Partner-Led Execution Model work?",
        a: "Unlike traditional agencies that assign account managers post-contract, Spirecrest deploys a named domain specialist — a partner with real-world expertise in your exact problem — to own and drive your project from scoping through delivery. You engage with the decision-maker, not a relay channel. This is how we've delivered 9000+ projects on time and on budget.",
      },
    ],
  },
  {
    id: "surveillance",
    label: "Surveillance & Security",
    items: [
      {
        q: "What security hardware does Spirecrest supply and install?",
        a: "We supply, configure, and install the full spectrum of physical security infrastructure: IP cameras, PTZ systems, NVRs, walkthrough metal detectors, handheld wands, X-ray baggage inspection systems, Under-Vehicle Inspection Systems (UVIS), explosive trace detectors (ETD), biometric access control, ANPR systems, and video analytics platforms. We work with Hikvision, Dahua, Axis, ZKTeco, Suprema, and 30+ other hardware partners.",
      },
      {
        q: "Can you handle large-scale government and enterprise deployments?",
        a: "Yes. We are equipped for bulk procurement and large-footprint deployments — airports, government buildings, corporate campuses, judicial complexes, and industrial zones. Our team is experienced in structured cabling, command center design, multi-site NVR architecture, and compliance documentation required for government tenders.",
      },
      {
        q: "Do you offer Annual Maintenance Contracts (AMC) for surveillance systems?",
        a: "Yes. We offer comprehensive AMC packages that include scheduled preventative inspections, firmware updates, hardware replacement SLAs, 24/7 priority support access, and quarterly compliance health reports. We can also consolidate and manage existing multi-vendor AMC portfolios under a single governance contract.",
      },
      {
        q: "What is the difference between UVIS and a standard CCTV setup?",
        a: "A standard CCTV system monitors above-ground areas in real time. A UVIS (Under-Vehicle Inspection System) uses high-resolution line-scan cameras embedded in road-level hardware to capture and analyze the underside of vehicles — a critical layer for high-security entry points where vehicle-borne threats are a concern. UVIS systems can operate at speeds up to 75 km/h and integrate with ANPR for full vehicle logging.",
      },
    ],
  },
  {
    id: "software",
    label: "Software Development",
    items: [
      {
        q: "What types of software projects does Spirecrest build?",
        a: "We build custom web applications, mobile apps (iOS, Android, cross-platform), SaaS platforms, ERP and CRM systems, e-governance portals, AI/ML integrations, chatbots, data dashboards, APIs, and DevOps pipelines. Our stack includes React, Next.js, Node.js, Python, Flutter, PostgreSQL, MongoDB, AWS, and GCP — and we're framework-agnostic for legacy modernization work.",
      },
      {
        q: "How long does it take to build a web application?",
        a: "Timeline depends on complexity. A simple CRUD application or landing system can be delivered in 4–6 weeks. A moderate web app with custom auth and integrations typically takes 8–12 weeks. Complex SaaS platforms or AI-integrated systems run 3–5 months. Enterprise-grade multi-tenant systems are scoped at 6–12 months. Use the Scoping Calculator on our Software page to get a directional estimate for your project.",
      },
      {
        q: "Do you work with government clients for software development?",
        a: "Yes. We have experience building e-governance portals and public sector software under applicable procurement frameworks. Our development practices align with security and compliance standards relevant to government digital infrastructure in India, including data residency requirements and CERT-In-referenced security protocols.",
      },
      {
        q: "Can you take over and modernize an existing legacy system?",
        a: "Absolutely. Legacy modernization is a core capability. Our approach involves a full architecture audit, data migration planning, phased cutover strategy (to minimize downtime), and re-implementation on a modern stack — with zero data loss as a non-negotiable deliverable. We've migrated systems from ASP.NET, PHP monoliths, and custom Java applications to modern cloud-native architectures.",
      },
    ],
  },
  {
    id: "consulting",
    label: "IT Consulting & Lifecycle",
    items: [
      {
        q: "What does IT Lifecycle Management consulting involve?",
        a: "It involves taking ownership of your technology's entire lifespan: infrastructure architecture and procurement, vendor selection and SLA governance, AMC consolidation, compliance management, staff training, and eventual decommissioning or refresh planning. We work on defined outcome terms — not open-ended retainers — with quarterly performance reviews against agreed KPIs.",
      },
      {
        q: "What is your Venture Consulting service, and who is it for?",
        a: "Our Venture Consulting arm serves founders, growth-stage startups, and enterprise divisions seeking investment or spin-out. We architect investor-grade pitch decks, build defensible financial models (unit economics, CAC/LTV, ARR projections), and map fundraising strategy to the right capital stack — seed, Series A, angels, or government grants. If you're preparing for a boardroom or a term sheet, this is the engagement.",
      },
      {
        q: "How is Spirecrest's consulting different from a standard IT firm?",
        a: "Three differences: (1) Principals, not consultants — your engagement is run by a named domain expert, not delegated to a junior analyst. (2) Outcome-based billing — we scope for defined deliverables, not billable hours. (3) Execution continuity — we don't hand off a report and leave. We stay through implementation and measure the impact of every recommendation we make.",
      },
    ],
  },
  {
    id: "process",
    label: "Process & Engagement",
    items: [
      {
        q: "How do I start an engagement with Spirecrest?",
        a: "The fastest path is through our Contact page or the 'Partner With Us' button anywhere on the site. Submit your inquiry and a principal will respond within 24 hours — no pre-sales SDRs, no auto-responders. For complex or enterprise engagements, we typically begin with a scoping call to establish fit, define the engagement boundary, and agree on a delivery framework before any contract is signed.",
      },
      {
        q: "Do you sign NDAs before project discussions?",
        a: "Yes. For any engagement involving proprietary systems, business data, or investor-sensitive information, we execute a mutual NDA before substantive scoping begins. This is standard practice, not an exception.",
      },
      {
        q: "What does your pricing model look like?",
        a: "Pricing is engagement-specific. We do not publish rate cards because the right model depends on project scope, timeline, and delivery structure. Software projects are typically fixed-price against a defined scope. Consulting and lifecycle engagements are milestone-based or retainer-structured with defined deliverables per period. Surveillance and hardware projects are quoted per site after a physical or remote assessment.",
      },
      {
        q: "Do you offer post-delivery support?",
        a: "Yes — for all categories. Software projects include a minimum 30-day post-launch hypercare window. Surveillance deployments are covered by AMC options. Consulting engagements can be extended to ongoing advisory retainers. All support terms are defined in the engagement contract before work begins.",
      },
    ],
  },
];

function FAQAccordion({ items, categoryId }: { items: FAQItem[]; categoryId: string }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div ref={ref} className="space-y-3">
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <motion.div
            key={`${categoryId}-${i}`}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.07 }}
            className={`rounded-2xl border bg-card transition-all duration-300 ${
              isOpen ? "border-accent/30 shadow-lg shadow-accent/5" : "border-border"
            }`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center gap-4 p-6 text-left group"
            >
              <div
                className={`w-2 h-2 rounded-full shrink-0 transition-colors duration-300 ${
                  isOpen ? "bg-accent" : "bg-border"
                }`}
              />
              <p
                className={`flex-1 font-display font-semibold text-sm md:text-base transition-colors duration-200 ${
                  isOpen ? "text-foreground" : "text-foreground/80 group-hover:text-foreground"
                }`}
              >
                {item.q}
              </p>
              <ChevronDown
                className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-300 ${
                  isOpen ? "rotate-180 text-accent" : ""
                }`}
              />
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
                  <div className="px-6 pb-6 pl-12">
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  const activeData = faqData.find((c) => c.id === activeCategory)!;

  const filteredItems = searchQuery.trim()
    ? faqData
        .flatMap((c) => c.items)
        .filter(
          (item) =>
            item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : activeData.items;

  const totalQuestions = faqData.reduce((acc, c) => acc + c.items.length, 0);

  return (
    <>
      <SEO
        title="FAQ | Spirecrest Solutions — Common Questions Answered"
        description="Answers to the most common questions about Spirecrest's surveillance systems, software development, IT consulting, pricing, and engagement process."
        path="/faq"
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
        <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-accent/5 blur-[120px]" />

        <div className="section-container relative z-10 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-xs font-display uppercase tracking-[0.25em] text-accent mb-6"
          >
            Support & Clarity
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
            className="text-lg leading-relaxed max-w-xl mx-auto mb-10"
            style={{ color: "hsl(var(--on-dark-muted))" }}
          >
            {totalQuestions} questions answered across {faqData.length} topic areas. If yours isn't here, reach out directly.
          </motion.p>

          {/* Search bar */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="relative max-w-lg mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-white/20 bg-white/10 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-accent/50 backdrop-blur-sm text-sm font-body"
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-28 bg-background">
        <div className="section-container">
          {searchQuery.trim() ? (
            <div>
              <p className="text-sm text-muted-foreground mb-8 font-display">
                Showing {filteredItems.length} result{filteredItems.length !== 1 ? "s" : ""} for "{searchQuery}"
              </p>
              {filteredItems.length > 0 ? (
                <FAQAccordion items={filteredItems} categoryId="search" />
              ) : (
                <div className="text-center py-16">
                  <p className="text-muted-foreground mb-4">No results found. Try a different search term or</p>
                  <Link to="/contact" className="text-accent font-display font-semibold hover:underline">
                    contact our team directly →
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
              {/* Category sidebar */}
              <aside className="lg:col-span-1">
                <p className="text-xs font-display uppercase tracking-widest text-muted-foreground mb-4">
                  Topics
                </p>
                <nav className="space-y-1">
                  {faqData.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`w-full text-left px-4 py-3 rounded-xl text-sm font-display font-medium transition-all duration-200 ${
                        activeCategory === cat.id
                          ? "bg-accent/10 text-accent border border-accent/20"
                          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                      }`}
                    >
                      <span>{cat.label}</span>
                      <span
                        className={`float-right text-xs font-normal ${
                          activeCategory === cat.id ? "text-accent" : "text-muted-foreground"
                        }`}
                      >
                        {cat.items.length}
                      </span>
                    </button>
                  ))}
                </nav>

                {/* Still have questions card */}
                <div className="mt-8 p-5 rounded-2xl border border-border bg-card">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                    <MessageCircle className="w-5 h-5 text-accent" />
                  </div>
                  <p className="font-display font-semibold text-sm text-foreground mb-1">
                    Still have questions?
                  </p>
                  <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                    A principal will respond within 24 hours.
                  </p>
                  <Link
                    to="/contact"
                    className="inline-block text-xs font-display font-semibold text-accent hover:underline"
                  >
                    Contact us →
                  </Link>
                </div>
              </aside>

              {/* FAQ list */}
              <div className="lg:col-span-3">
                <div className="flex items-center justify-between mb-8">
                  <h2 className="font-display text-xl font-bold text-foreground">
                    {activeData.label}
                  </h2>
                  <span className="text-xs text-muted-foreground font-display">
                    {activeData.items.length} questions
                  </span>
                </div>
                <FAQAccordion items={activeData.items} categoryId={activeData.id} />
              </div>
            </div>
          )}
        </div>
      </section>

      <CTASection />
    </>
  );
}
