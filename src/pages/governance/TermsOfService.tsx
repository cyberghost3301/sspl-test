import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FileText, Scale, UserCheck, AlertTriangle, Globe, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/SEO";

const LAST_UPDATED = "01 July 2025";
const CONTACT_EMAIL = "info@spirecrest.in";

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

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service | Spirecrest Solutions"
        description="Terms and conditions governing use of the Spirecrest Solutions website and services."
        path="/terms-of-service"
      />

      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-hero-gradient">
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)", backgroundSize: "50px 50px" }} />
        <div className="section-container relative z-10 text-center">
          <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-xs font-display uppercase tracking-[0.25em] text-accent mb-6">
            Legal & Governance
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="font-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6" style={{ color: "hsl(var(--on-dark))" }}>
            Terms of <span className="text-gradient">Service.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.25 }} className="text-base" style={{ color: "hsl(var(--on-dark-muted))" }}>
            Last updated: <strong className="text-white">{LAST_UPDATED}</strong>
          </motion.p>
        </div>
      </section>

      <section className="py-20 lg:py-28 bg-background">
        <div className="section-container max-w-4xl mx-auto">
          <div className="mb-12 p-5 rounded-2xl border border-accent/20 bg-accent/5">
            <p className="text-sm text-muted-foreground leading-relaxed">
              <strong className="text-foreground">Please read these Terms carefully.</strong> By accessing <strong className="text-foreground">spirecrest.in</strong> or engaging with any Spirecrest service, you agree to be bound by these Terms of Service. If you disagree with any part, please discontinue use of the site and contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a>.
            </p>
          </div>

          <div className="space-y-4">
            <Section icon={FileText} title="1. Agreement to Terms" id="agreement" index={0}>
              <p>These Terms of Service ("Terms") constitute a legally binding agreement between you ("User") and Spirecrest Solutions Private Limited ("Spirecrest", "Company", "we") governing your access to and use of spirecrest.in and all associated services.</p>
              <p>We reserve the right to update these Terms at any time. Changes will be indicated by the "Last Updated" date above. Continued use of the site after changes constitutes acceptance of the revised Terms.</p>
            </Section>

            <Section icon={Scale} title="2. Intellectual Property Rights" id="ip" index={1}>
              <p>All content on spirecrest.in — including but not limited to text, graphics, logos, icons, images, component designs, and software — is the exclusive property of Spirecrest Solutions Private Limited and is protected under Indian copyright law and international intellectual property conventions.</p>
              <ul className="space-y-2 mt-2">
                {[
                  "You may not reproduce, distribute, or commercially exploit any content from this site without express written permission.",
                  "The Spirecrest name, logo, and brand marks are registered trademarks. Unauthorized use is strictly prohibited.",
                  "Source code, software deliverables, and technical documentation created as part of a contracted engagement are governed by the applicable project agreement, not these general Terms.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1 shrink-0">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Section>

            <Section icon={UserCheck} title="3. User Responsibilities & Acceptable Use" id="user-responsibilities" index={2}>
              <p>By using this site and our services, you agree to:</p>
              <ul className="space-y-2 mt-2">
                {[
                  "Provide accurate and truthful information when submitting inquiries, forms, or project briefs",
                  "Not attempt to gain unauthorized access to any part of our systems, infrastructure, or backend services",
                  "Not use this website to transmit malicious code, spam, or any content intended to harm or deceive",
                  "Not impersonate Spirecrest personnel or misrepresent your affiliation with the company",
                  "Comply with all applicable Indian laws and regulations in your use of our services",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1 shrink-0">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">Violation of these responsibilities may result in immediate termination of access and may be reported to appropriate authorities.</p>
            </Section>

            <Section icon={AlertTriangle} title="4. Limitation of Liability & Warranties" id="liability" index={3}>
              <p>This website and its content are provided on an <strong className="text-foreground">"as is" and "as available"</strong> basis. Spirecrest makes no representations or warranties of any kind, express or implied, including warranties of merchantability, fitness for a particular purpose, or non-infringement.</p>
              <p>To the maximum extent permitted by applicable law, Spirecrest shall not be liable for:</p>
              <ul className="space-y-2 mt-2">
                {[
                  "Any indirect, incidental, or consequential damages arising from use of this website",
                  "Loss of data, revenue, or business opportunities resulting from reliance on information published on this site",
                  "Service interruptions, technical errors, or downtime of the website",
                  "Actions or omissions of third-party service providers linked from this site",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1 shrink-0">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">Our total liability for claims arising out of these Terms shall not exceed the amount paid by you (if any) for the specific service giving rise to the claim in the 3 months preceding the event.</p>
            </Section>

            <Section icon={Globe} title="5. Third-Party Links & External Content" id="third-party" index={4}>
              <p>Our website may contain links to third-party websites, resources, or vendor pages for reference. These links are provided for convenience only. Spirecrest does not:</p>
              <ul className="space-y-2 mt-2">
                {[
                  "Control or endorse any third-party content, products, or services",
                  "Accept responsibility for the accuracy, legality, or appropriateness of external sites",
                  "Guarantee the security or privacy practices of any linked third-party service",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-accent mt-1 shrink-0">◆</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-3">Accessing third-party links is at your own risk and subject to the terms and policies of those respective sites.</p>
            </Section>

            <Section icon={RefreshCw} title="6. Governing Law & Dispute Resolution" id="governing-law" index={5}>
              <p>These Terms shall be governed by and construed in accordance with the laws of India. Any disputes arising out of or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of <strong className="text-foreground">Lucknow, Uttar Pradesh, India</strong>.</p>
              <p>Before initiating formal proceedings, both parties agree to attempt good-faith resolution of any dispute through direct communication. Please contact us at <a href={`mailto:${CONTACT_EMAIL}`} className="text-accent hover:underline">{CONTACT_EMAIL}</a> to initiate resolution discussions.</p>
            </Section>
          </div>

          <div className="mt-10 p-6 rounded-2xl border border-border bg-card text-center">
            <p className="text-sm text-muted-foreground">
              Questions about these Terms?{" "}
              <Link to="/contact" className="text-accent font-semibold hover:underline">Contact our team</Link>{" "}
              or review our{" "}
              <Link to="/privacy-policy" className="text-accent font-semibold hover:underline">Privacy Policy</Link>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
