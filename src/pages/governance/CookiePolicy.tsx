import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Cookie, Settings, BarChart3, Lock, Trash2 } from "lucide-react";
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

const cookieTypes = [
  {
    name: "Strictly Necessary",
    purpose: "Core site functionality — session state, form submissions, security tokens.",
    canDisable: false,
  },
  {
    name: "Analytics & Performance",
    purpose: "Aggregated, anonymized data on page visits and user flows to improve our site.",
    canDisable: true,
  },
  {
    name: "Functional",
    purpose: "Remembering preferences like theme (light/dark mode) and display settings.",
    canDisable: true,
  },
];

export default function CookiePolicy() {
  return (
    <>
      <SEO
        title="Cookie Policy | Spirecrest Solutions"
        description="How Spirecrest Solutions uses cookies on spirecrest.in and how you can manage your preferences."
        path="/cookie-policy"
      />

      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="section-container relative z-10 text-center">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-xs font-display uppercase tracking-[0.25em] text-accent mb-6">
            Legal & Governance
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6" style={{ color: "hsl(var(--on-dark))" }}>
            Cookie <span className="text-gradient">Policy.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="text-base" style={{ color: "hsl(var(--on-dark-muted))" }}>
            Last updated: <strong className="text-white">{LAST_UPDATED}</strong>
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="section-container max-w-4xl mx-auto">
          <div className="space-y-4">
            <Section icon={Cookie} title="1. What Are Cookies" id="what-are-cookies" index={0}>
              <p>Cookies are small text files placed on your device by websites you visit. They serve a range of purposes — from keeping you signed in to understanding how visitors interact with a site so it can be improved over time.</p>
              <p>Spirecrest's website (<strong className="text-foreground">spirecrest.in</strong>) uses a minimal set of cookies. We do not use advertising cookies or cross-site tracking. Our cookie use is limited to functional necessity and anonymized analytics.</p>
            </Section>

            <Section icon={BarChart3} title="2. Types of Cookies We Use" id="cookie-types" index={1}>
              <p>We use the following categories of cookies:</p>
              <div className="mt-4 space-y-3">
                {cookieTypes.map((type) => (
                  <div key={type.name} className="flex items-start gap-4 p-4 rounded-xl border border-border bg-background">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-display font-semibold text-foreground text-sm">{type.name}</span>
                        {!type.canDisable && (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent font-display uppercase tracking-wider">Required</span>
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground">{type.purpose}</p>
                    </div>
                    <div className="text-xs font-display shrink-0 mt-1">
                      {type.canDisable ? (
                        <span className="text-muted-foreground">Optional</span>
                      ) : (
                        <span className="text-accent">Always on</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>

            <Section icon={Settings} title="3. Third-Party Cookies" id="third-party-cookies" index={2}>
              <p>Some functionality on our site may load resources from third-party services (e.g. Google Fonts, analytics platforms). These services may set their own cookies subject to their own privacy policies. We do not control third-party cookies and recommend reviewing each provider's policy directly.</p>
              <p>We do not use Meta Pixel, Google Ads, or any advertising-network cookies on this website.</p>
            </Section>

            <Section icon={Trash2} title="4. Managing & Disabling Cookies" id="managing-cookies" index={3}>
              <p>You can control and manage cookies through your browser settings. Most modern browsers allow you to:</p>
              <ul className="space-y-2 mt-2">
                {[
                  "View and delete cookies already set on your device",
                  "Block third-party cookies by default",
                  "Set cookie preferences per website",
                  "Enable 'Do Not Track' signals",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1 shrink-0">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">
                <strong className="text-foreground">Note:</strong> Disabling strictly necessary cookies may prevent certain features of the website from functioning correctly — in particular, form submissions and session state management.
              </p>
            </Section>

            <Section icon={Lock} title="5. Cookie Data & Privacy" id="cookie-privacy" index={4}>
              <p>Cookies placed by Spirecrest do not contain personally identifiable information on their own. Any data associated with cookie identifiers is handled in accordance with our <Link to="/privacy-policy" className="text-accent hover:underline font-semibold">Privacy Policy</Link>. We do not sell or share cookie data with advertisers.</p>
              <p>This Cookie Policy may be updated periodically. The "Last Updated" date above reflects the most recent revision. Continued use of the site following any update constitutes acceptance of the revised policy.</p>
            </Section>
          </div>

          <div className="mt-10 p-6 rounded-2xl border border-border bg-card text-center">
            <p className="text-sm text-muted-foreground">
              Cookie questions?{" "}
              <Link to="/contact" className="text-accent font-semibold hover:underline">Contact us</Link>{" "}
              or review our{" "}
              <Link to="/privacy-policy" className="text-accent font-semibold hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
