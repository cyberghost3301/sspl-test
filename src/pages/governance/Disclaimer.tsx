import { useRef } from "react";
import { m as motion, useInView } from "framer-motion";
import { AlertTriangle, Globe, BarChart3, Wrench, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const LAST_UPDATED = "01 July 2025";

function Section({ icon: Icon, title, id, children, index }: {
  icon: React.ElementType; title: string; id: string; children: React.ReactNode; index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      id={id}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group p-8 rounded-2xl border border-border bg-card hover:border-accent/20 transition-all duration-300"
    >
      <div className="flex items-start gap-5">
        <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
          <Icon className="w-5 h-5 text-accent" />
        </div>
        <div className="flex-1">
          <h2 className="font-display text-lg font-bold text-foreground mb-4">{title}</h2>
          <div className="text-sm text-muted-foreground leading-relaxed space-y-3">{children}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Disclaimer() {
  return (
    <>
      <SEO
        title="Disclaimer | Spirecrest Solutions"
        description="Important disclaimers regarding information provided on the Spirecrest Solutions website and our services."
        path="/disclaimer"
      />

      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="section-container relative z-10 text-center">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-xs font-display uppercase tracking-[0.25em] text-accent mb-6">
            Legal & Governance
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6" style={{ color: "hsl(var(--on-dark))" }}>
            <span className="text-gradient">Disclaimer.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="text-base" style={{ color: "hsl(var(--on-dark-muted))" }}>
            Last updated: <strong className="text-white">{LAST_UPDATED}</strong>
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="section-container max-w-4xl mx-auto">
          <div className="mb-10 p-5 rounded-2xl border border-accent/20 bg-accent/5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Important:</strong> The information on spirecrest.in is provided in good faith for general reference. It does not constitute professional, legal, financial, or technical advice for your specific circumstances. Always engage a qualified professional for decisions with significant consequences.
            </p>
          </div>

          <div className="space-y-4">
            <Section icon={AlertTriangle} title="1. General Information Disclaimer" id="general" index={0}>
              <p>All content published on <strong className="text-foreground">spirecrest.in</strong> — including service descriptions, capability overviews, case study metrics, and technical specifications — is provided for general informational purposes only. While we take reasonable steps to ensure accuracy, Spirecrest Solutions makes no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, or suitability of the information for any purpose.</p>
              <p>Service capabilities, pricing, timelines, and technical specifications described on this site are indicative only. Actual engagement terms are defined exclusively in formal project agreements signed between Spirecrest and the client.</p>
            </Section>

            <Section icon={BarChart3} title="2. Performance Metrics & Statistics" id="metrics" index={1}>
              <p>Metrics cited on this website (e.g., "9000+ projects delivered", "99.9% uptime SLAs", "₹50Cr+ funding facilitated") reflect the collective experience and historical track record of Spirecrest's partner network and do not constitute guarantees of identical outcomes for future engagements.</p>
              <p>Past performance is not indicative of future results. Individual project outcomes depend on client-specific requirements, market conditions, technical constraints, and other variables beyond Spirecrest's control.</p>
            </Section>

            <Section icon={Globe} title="3. External Links Disclaimer" id="external-links" index={2}>
              <p>Our website may reference or link to third-party websites, vendor pages, product datasheets, or external resources. These links are provided for reference and convenience only.</p>
              <p>Spirecrest does not investigate, monitor, or endorse third-party content and assumes no liability for:</p>
              <ul className="space-y-2 mt-2">
                {[
                  "Accuracy or completeness of information on linked external sites",
                  "Products or services offered by third-party vendors referenced on this site",
                  "Any loss or damage incurred from reliance on third-party content",
                  "Privacy practices or security posture of external websites",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1 shrink-0">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section icon={Wrench} title="4. Technical & Professional Advice" id="technical-advice" index={3}>
              <p>Nothing on this website constitutes professional technical, legal, financial, or security advice. Content describing technical methodologies, architecture approaches, or security frameworks is intended to communicate Spirecrest's general capabilities — not to serve as a substitute for a formal technical assessment tailored to your specific environment.</p>
              <p>For decisions involving significant infrastructure investment, legal compliance, or security architecture, we strongly recommend a formal scoped engagement with our principals before any implementation begins.</p>
            </Section>

            <Section icon={MessageCircle} title="5. Contact for Clarifications" id="contact" index={4}>
              <p>If any content on this site is unclear, factually disputed, or requires correction, please notify us immediately at <a href="mailto:info@spirecrest.in" className="text-accent hover:underline font-semibold">info@spirecrest.in</a>. We are committed to maintaining accurate and current information and will address legitimate corrections promptly.</p>
              <p>This disclaimer may be revised periodically. The "Last Updated" date reflects the most recent version.</p>
            </Section>
          </div>

          <div className="mt-10 p-6 rounded-2xl border border-border bg-card text-center">
            <p className="text-sm text-muted-foreground">
              Questions?{" "}
              <Link to="/contact" className="text-accent font-semibold hover:underline">Contact us directly</Link>{" "}
              or review our{" "}
              <Link to="/terms-of-service" className="text-accent font-semibold hover:underline">Terms of Service</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
