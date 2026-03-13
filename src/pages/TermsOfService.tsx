import SEO from "@/components/SEO";
import LegalPageLayout from "@/components/LegalPageLayout";
import CTASection from "@/components/CTASection";

const sections = [
  { id: "agreement", heading: "1. Agreement to Terms" },
  { id: "services", heading: "2. Description of Services" },
  { id: "eligibility", heading: "3. Eligibility & Account Use" },
  { id: "ip", heading: "4. Intellectual Property" },
  { id: "confidentiality", heading: "5. Confidentiality" },
  { id: "payment", heading: "6. Payment Terms" },
  { id: "warranties", heading: "7. Warranties & Representations" },
  { id: "liability", heading: "8. Limitation of Liability" },
  { id: "indemnification", heading: "9. Indemnification" },
  { id: "termination", heading: "10. Termination" },
  { id: "governing-law", heading: "11. Governing Law & Disputes" },
  { id: "modifications", heading: "12. Modifications" },
  { id: "contact", heading: "13. Contact" },
];

function S({ id, num, heading, children }: { id: string; num: string; heading: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28 mb-12">
      <span className="text-xs font-display uppercase tracking-widest text-accent font-semibold">{num} /</span>
      <h2 className="font-display text-xl md:text-2xl font-bold text-foreground mt-1 mb-4">{heading}</h2>
      {children}
      <div className="border-t border-border mt-10" />
    </section>
  );
}
function P({ children }: { children: React.ReactNode }) {
  return <p className="text-muted-foreground text-sm leading-relaxed mb-4">{children}</p>;
}
function H3({ children }: { children: React.ReactNode }) {
  return <h3 className="font-display text-base font-semibold text-foreground mt-6 mb-2">{children}</h3>;
}
function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 mb-4">
      {items.map((item, i) => (
        <li key={i} className="flex gap-2.5 text-sm text-muted-foreground">
          <span className="text-accent mt-0.5 shrink-0 text-xs">◆</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-xl border border-accent/20 bg-accent/5 text-sm text-foreground leading-relaxed mb-4">
      {children}
    </div>
  );
}

export default function TermsOfService() {
  return (
    <>
      <SEO
        title="Terms of Service | Spirecrest Solutions"
        description="Review the Terms of Service governing your use of Spirecrest Solutions' website and enterprise technology services. Jurisdiction: India."
        path="/terms-of-service"
      />

      <LegalPageLayout
        badge="Legal & Compliance"
        title="Terms of"
        highlight="Service."
        subtitle="The terms and conditions that govern your use of our website and engagement with our services."
        lastUpdated="June 2025"
        sections={sections}
      >
        <S id="agreement" num="01" heading="Agreement to Terms">
          <P>
            By accessing or using the website at <strong className="text-foreground">spirecrest.in</strong> or engaging any services provided by <strong className="text-foreground">Spirecrest Solutions Private Limited</strong> (CIN: U46909UP2025PTC225556), you agree to be bound by these Terms of Service ("Terms") and all applicable laws and regulations of India.
          </P>
          <P>
            If you do not agree with any part of these Terms, you must not use our website or services. These Terms constitute a legally binding agreement between you (or your organization) and Spirecrest Solutions Private Limited.
          </P>
          <Highlight>
            For enterprise and B2B engagements, these Terms operate alongside any separately executed Master Service Agreement (MSA), Statement of Work (SoW), or Non-Disclosure Agreement (NDA). In case of conflict, the executed contract prevails.
          </Highlight>
        </S>

        <S id="services" num="02" heading="Description of Services">
          <P>Spirecrest Solutions provides the following categories of enterprise technology services:</P>
          <Bullets items={[
            "Advanced Surveillance & Physical Security (CCTV, access control, X-ray scanners, UVIS, biometric systems)",
            "Custom Web, Mobile & Software Development (React, Node.js, AI/ML integration, SaaS platforms)",
            "IT Infrastructure Consulting & Cybersecurity",
            "Smart Automation & IoT Systems",
            "Networking, Cloud Infrastructure & Managed Services",
            "Computer Hardware Solutions & AMC",
            "Solar Power Systems",
            "AV Studio Design & Installation",
            "Interior Design & Workspace Solutions",
            "Strategic Lifecycle Partnership & Venture Consulting",
          ]} />
          <P>
            Service scope, deliverables, timelines, and pricing are defined in individual Statements of Work (SoW) or quotation documents issued per engagement. These Terms govern the general use of our website and the framework of any service relationship.
          </P>
        </S>

        <S id="eligibility" num="03" heading="Eligibility & Acceptable Use">
          <P>You represent that you are at least 18 years of age and legally authorized to enter into contracts under Indian law, or are acting on behalf of a legally registered organization with full authority to bind that organization.</P>
          <H3>Prohibited Uses</H3>
          <P>You agree not to:</P>
          <Bullets items={[
            "Use our website or services for any unlawful purpose or in violation of any applicable regulation",
            "Transmit any malicious code, spam, or content that is defamatory, obscene, or fraudulent",
            "Attempt to gain unauthorized access to our systems, servers, or networks",
            "Use our services to develop competing products or reverse engineer our proprietary solutions",
            "Misrepresent your identity or organizational authority when engaging our services",
          ]} />
        </S>

        <S id="ip" num="04" heading="Intellectual Property">
          <H3>Our Intellectual Property</H3>
          <P>
            All content on spirecrest.in — including text, graphics, logos, icons, images, code, and design — is the exclusive property of Spirecrest Solutions Private Limited and is protected under applicable Indian copyright, trademark, and intellectual property laws. Unauthorized reproduction or commercial use is strictly prohibited.
          </P>
          <H3>Client-Owned Deliverables</H3>
          <P>
            Unless explicitly stated otherwise in a signed SoW, upon full and final payment, Spirecrest assigns ownership of custom-developed software, code, designs, and deliverables created specifically for a client to that client. Spirecrest retains the right to use general-purpose frameworks, libraries, methodologies, and know-how developed during the engagement.
          </P>
          <H3>Pre-existing IP & Third-Party Components</H3>
          <P>
            Spirecrest may incorporate third-party open-source libraries or licensed components into deliverables. These components remain subject to their respective licenses (e.g., MIT, Apache 2.0), which will be disclosed upon request.
          </P>
        </S>

        <S id="confidentiality" num="05" heading="Confidentiality">
          <P>
            Both parties agree to treat as confidential any non-public, proprietary, or sensitive information shared during the course of an engagement ("Confidential Information"). This includes, but is not limited to, business strategies, financial data, technical architectures, client lists, pitch decks, and project requirements.
          </P>
          <P>
            Confidential Information shall not be disclosed to third parties without written consent and shall be protected using at least the same level of care each party uses to protect its own confidential information. A separate NDA is executed for all enterprise and government engagements.
          </P>
          <P>Confidentiality obligations survive the termination of any engagement for a period of <strong className="text-foreground">3 years</strong> unless extended by mutual agreement.</P>
        </S>

        <S id="payment" num="06" heading="Payment Terms">
          <P>
            Unless otherwise agreed in writing, the following payment terms apply to all Spirecrest service engagements:
          </P>
          <Bullets items={[
            "An initial advance payment (typically 30–50% of project value) is required before work commences",
            "Milestone-based payments are due within 7 business days of milestone completion and approval",
            "Final balance is due prior to handover of completed deliverables, source code, or hardware",
            "All prices are exclusive of applicable GST unless otherwise stated",
            "Late payments beyond 15 days from due date may attract interest at 1.5% per month",
          ]} />
          <P>
            For AMC contracts, annual fees are invoiced at the start of each contract year and are due within 14 days of invoice.
          </P>
        </S>

        <S id="warranties" num="07" heading="Warranties & Representations">
          <H3>What We Warrant</H3>
          <Bullets items={[
            "Services will be performed with reasonable skill and care by qualified personnel",
            "Software deliverables will conform to agreed specifications at point of handover",
            "Hardware supplied will be new, genuine, and sourced from authorized distributors",
            "We hold all necessary business registrations and GST compliance required to deliver contracted services",
          ]} />
          <H3>What We Do Not Warrant</H3>
          <P>
            Our website is provided on an "as-is" basis. We make no warranty that our website will be uninterrupted, error-free, or free of viruses. We do not warrant specific business outcomes, revenue results, or investment returns from venture or consulting engagements.
          </P>
        </S>

        <S id="liability" num="08" heading="Limitation of Liability">
          <P>
            To the maximum extent permitted by applicable Indian law, Spirecrest Solutions Private Limited shall not be liable for any indirect, incidental, consequential, special, or punitive damages — including loss of profits, data, goodwill, or business interruption — arising from your use of our services or website, even if we have been advised of the possibility of such damages.
          </P>
          <P>
            Our total aggregate liability for any claim arising out of or relating to these Terms or a service engagement shall not exceed the total fees paid by you to Spirecrest in the 3 months preceding the event giving rise to the claim.
          </P>
          <Highlight>
            Nothing in these Terms excludes or limits liability for death or personal injury caused by negligence, fraud, or any other liability that cannot be limited under Indian law.
          </Highlight>
        </S>

        <S id="indemnification" num="09" heading="Indemnification">
          <P>
            You agree to indemnify, defend, and hold harmless Spirecrest Solutions Private Limited and its directors, partners, employees, and agents from any claims, losses, liabilities, damages, costs, or expenses (including reasonable legal fees) arising from: (a) your use of our services in violation of these Terms; (b) your violation of any applicable law; or (c) content or data you provide to us that infringes any third-party rights.
          </P>
        </S>

        <S id="termination" num="10" heading="Termination">
          <P>
            Either party may terminate a service engagement by providing written notice as specified in the executed SoW or contract. In the absence of a specific notice period, 30 days' written notice is required.
          </P>
          <P>
            Spirecrest reserves the right to suspend or terminate access to our website or services immediately, without notice, if you breach these Terms or engage in conduct that is harmful to our business, clients, or reputation.
          </P>
          <P>
            Upon termination: all outstanding fees for work completed become immediately due; Spirecrest shall deliver all completed work product to you upon receipt of full payment; obligations of confidentiality, IP ownership, and indemnification survive termination.
          </P>
        </S>

        <S id="governing-law" num="11" heading="Governing Law & Dispute Resolution">
          <P>
            These Terms shall be governed by and construed in accordance with the laws of India, without regard to conflict of law principles.
          </P>
          <P>
            Any dispute, controversy, or claim arising out of or relating to these Terms or the services provided by Spirecrest shall first be attempted to be resolved through good-faith negotiation between authorized representatives of both parties.
          </P>
          <P>
            If negotiation fails within 30 days, disputes shall be submitted to binding arbitration under the Arbitration and Conciliation Act, 1996 (India), with the seat of arbitration in <strong className="text-foreground">Lucknow, Uttar Pradesh</strong>. The language of arbitration shall be English. The courts of Lucknow, UP shall have exclusive jurisdiction for enforcement of any arbitral award.
          </P>
        </S>

        <S id="modifications" num="12" heading="Modifications to Terms">
          <P>
            Spirecrest reserves the right to modify these Terms at any time. Changes will be posted on this page with an updated date. Continued use of our website or services after changes constitutes acceptance of the revised Terms. For active contractual engagements, the Terms in effect at the time of contract execution govern that engagement unless both parties agree in writing to adopt the revised Terms.
          </P>
        </S>

        <S id="contact" num="13" heading="Contact">
          <P>For questions regarding these Terms of Service:</P>
          <div className="p-5 rounded-xl border border-border bg-card text-sm space-y-1.5">
            <p className="font-display font-semibold text-foreground">Spirecrest Solutions Private Limited</p>
            <p className="text-muted-foreground">41/68, Kali Niwas, Narhi, Hazratganj, Lucknow, UP – 226001</p>
            <p className="text-muted-foreground">Email: <a href="mailto:info@spirecrest.in" className="text-accent hover:underline">info@spirecrest.in</a></p>
            <p className="text-muted-foreground">Phone: <a href="tel:+919250974145" className="text-accent hover:underline">+91 9250974145</a></p>
          </div>
        </S>
      </LegalPageLayout>

      <CTASection />
    </>
  );
}
