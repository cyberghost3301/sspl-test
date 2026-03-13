import SEO from "@/components/SEO";
import LegalPageLayout from "@/components/LegalPageLayout";
import CTASection from "@/components/CTASection";

const sections = [
  { id: "introduction", heading: "1. Introduction" },
  { id: "data-controller", heading: "2. Data Controller" },
  { id: "data-we-collect", heading: "3. Data We Collect" },
  { id: "how-we-use", heading: "4. How We Use Your Data" },
  { id: "legal-basis", heading: "5. Legal Basis for Processing" },
  { id: "data-sharing", heading: "6. Data Sharing & Disclosure" },
  { id: "data-security", heading: "7. Data Security" },
  { id: "data-retention", heading: "8. Data Retention" },
  { id: "your-rights", heading: "9. Your Rights" },
  { id: "cookies", heading: "10. Cookies" },
  { id: "third-party", heading: "11. Third-Party Links" },
  { id: "children", heading: "12. Children's Privacy" },
  { id: "changes", heading: "13. Changes to This Policy" },
  { id: "contact", heading: "14. Contact & Grievance" },
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

export default function PrivacyPolicy() {
  return (
    <>
      <SEO
        title="Privacy Policy | Spirecrest Solutions"
        description="Learn how Spirecrest Solutions Private Limited collects, uses, and protects your personal data in compliance with India's DPDP Act and IT Act 2000."
        path="/privacy-policy"
        noIndex={false}
      />

      <LegalPageLayout
        badge="Legal & Compliance"
        title="Privacy"
        highlight="Policy."
        subtitle="We are committed to protecting your personal information and your right to privacy."
        lastUpdated="June 2025"
        sections={sections}
      >
        <S id="introduction" num="01" heading="Introduction">
          <P>
            Spirecrest Solutions Private Limited ("Spirecrest," "we," "us," or "our") operates the website at <strong className="text-foreground">spirecrest.in</strong> and provides enterprise technology, surveillance, software development, IT consulting, and venture advisory services. This Privacy Policy explains how we collect, use, store, and protect your personal data when you interact with our website or engage our services.
          </P>
          <P>
            This policy is compliant with India's <strong className="text-foreground">Information Technology Act, 2000</strong>, the <strong className="text-foreground">IT (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011</strong>, and the provisions of the <strong className="text-foreground">Digital Personal Data Protection (DPDP) Act, 2023</strong> as applicable.
          </P>
          <Highlight>
            By using our website or engaging our services, you acknowledge that you have read, understood, and consent to the data practices described in this Privacy Policy.
          </Highlight>
        </S>

        <S id="data-controller" num="02" heading="Data Controller">
          <P>The data controller responsible for your personal data is:</P>
          <div className="p-5 rounded-xl border border-border bg-card text-sm space-y-1.5 mb-4">
            <p className="font-display font-semibold text-foreground">Spirecrest Solutions Private Limited</p>
            <p className="text-muted-foreground">41/68, Kali Niwas, Narhi, Hazratganj, Lucknow, UP – 226001, India</p>
            <p className="text-muted-foreground">Email: <a href="mailto:info@spirecrest.in" className="text-accent hover:underline">info@spirecrest.in</a></p>
            <p className="text-muted-foreground">Phone: <a href="tel:+919250974145" className="text-accent hover:underline">+91 9250974145</a></p>
            <p className="font-mono text-xs text-muted-foreground mt-2">CIN: U46909UP2025PTC225556 · GSTIN: 09ABQCS4362K1ZM</p>
          </div>
        </S>

        <S id="data-we-collect" num="03" heading="Data We Collect">
          <P>We collect the following categories of personal data through our website contact forms, email communication, and direct service engagements:</P>
          <H3>Identity & Contact Data</H3>
          <Bullets items={[
            "Full name, company name, and job title",
            "Email address and phone number",
            "Postal address (for physical deployments and contractual purposes)",
          ]} />
          <H3>Technical Data</H3>
          <Bullets items={[
            "IP address, browser type and version",
            "Device type, operating system, and referral source",
            "Pages visited, time on site, and click patterns (via cookies — see Section 10)",
          ]} />
          <H3>Transaction & Project Data</H3>
          <Bullets items={[
            "Project requirements, scope documents, and technical briefs shared with us",
            "Financial data shared for procurement or invoice processing (no card numbers stored)",
            "Communication records (emails, form submissions)",
          ]} />
          <H3>Sensitive Personal Data (SPDI)</H3>
          <P>
            We do not routinely collect Sensitive Personal Data or Information (SPDI) as defined under the IT Rules 2011 (passwords, biometric data, financial information, health data) unless strictly required for a specific service engagement, in which case explicit written consent will be obtained separately.
          </P>
        </S>

        <S id="how-we-use" num="04" heading="How We Use Your Data">
          <P>We use your personal data for the following purposes:</P>
          <Bullets items={[
            "Responding to inquiry and contact form submissions",
            "Providing, performing, and managing service engagements under a signed contract",
            "Sending service-related communications, project updates, and invoices",
            "Improving our website experience and understanding how visitors interact with our services",
            "Complying with legal obligations under Indian law (tax filings, regulatory compliance)",
            "Preventing fraud and ensuring the security of our systems",
            "Sending marketing or informational communications about our services — only with your prior consent, which you may withdraw at any time",
          ]} />
        </S>

        <S id="legal-basis" num="05" heading="Legal Basis for Processing">
          <P>We process your personal data under one or more of the following bases:</P>
          <Bullets items={[
            "Consent — where you have given clear consent for us to process your data for a specific purpose",
            "Contract performance — where processing is necessary to fulfill a service agreement with you",
            "Legal obligation — where we must process your data to comply with applicable Indian law",
            "Legitimate interests — where processing is necessary for our legitimate business interests (e.g., improving services, preventing fraud), provided these are not overridden by your rights",
          ]} />
        </S>

        <S id="data-sharing" num="06" heading="Data Sharing & Disclosure">
          <P>Spirecrest does not sell, trade, or rent your personal data to third parties. We may share your data only in the following circumstances:</P>
          <H3>Service Partners & Sub-contractors</H3>
          <P>Where project delivery requires our network of specialist partners, relevant project data (not sensitive personal data) may be shared under strict confidentiality agreements.</P>
          <H3>Legal Requirements</H3>
          <P>We may disclose your data where required by law, court order, or government/regulatory authority under Indian law, including the IT Act 2000 and DPDP Act 2023.</P>
          <H3>Business Transfers</H3>
          <P>In the event of a merger, acquisition, or asset sale, personal data may be transferred as part of that transaction, subject to equivalent privacy protections.</P>
          <Highlight>
            We never share your project data, financial models, pitch decks, or business information with any third party without your explicit written consent.
          </Highlight>
        </S>

        <S id="data-security" num="07" heading="Data Security">
          <P>
            We implement appropriate technical and organizational security measures to protect your personal data from unauthorized access, accidental loss, alteration, disclosure, or destruction. These include:
          </P>
          <Bullets items={[
            "TLS/SSL encryption for all data transmitted over our website and contact forms",
            "Access controls ensuring personal data is accessible only to authorized personnel",
            "Regular security reviews of our systems and data handling practices",
            "Contractual confidentiality obligations on all staff and engaged partners",
          ]} />
          <P>
            However, no method of internet transmission is completely secure. While we strive to use commercially acceptable means to protect your data, we cannot guarantee its absolute security.
          </P>
        </S>

        <S id="data-retention" num="08" heading="Data Retention">
          <P>We retain personal data only as long as necessary for the purpose it was collected:</P>
          <Bullets items={[
            "Contact inquiry data: retained for up to 12 months unless an engagement commences",
            "Active client project data: retained for the duration of the engagement plus 3 years for audit and legal purposes",
            "Invoice and financial records: retained for 7 years in accordance with Indian tax regulations",
            "Marketing consent data: retained until you withdraw consent or request deletion",
          ]} />
          <P>When retention periods expire, data is securely deleted or anonymized.</P>
        </S>

        <S id="your-rights" num="09" heading="Your Rights">
          <P>Under the DPDP Act 2023 and applicable Indian law, you have the right to:</P>
          <Bullets items={[
            "Access — request a copy of the personal data we hold about you",
            "Correction — request correction of inaccurate or incomplete personal data",
            "Erasure — request deletion of your personal data where we no longer have a lawful basis to process it",
            "Withdraw consent — withdraw any consent you have given for marketing or non-essential data processing",
            "Grievance redressal — raise a complaint with our designated Grievance Officer (see Section 14)",
          ]} />
          <P>To exercise any of these rights, contact us at <a href="mailto:info@spirecrest.in" className="text-accent hover:underline">info@spirecrest.in</a>. We will respond within 30 days.</P>
        </S>

        <S id="cookies" num="10" heading="Cookies">
          <P>Our website uses cookies and similar technologies to improve functionality and analyze usage. For full details, see our <a href="/cookie-policy" className="text-accent hover:underline">Cookie Policy</a>.</P>
        </S>

        <S id="third-party" num="11" heading="Third-Party Links">
          <P>Our website may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies. This Privacy Policy applies solely to information collected by spirecrest.in.</P>
        </S>

        <S id="children" num="12" heading="Children's Privacy">
          <P>Our services and website are not directed at individuals under the age of 18. We do not knowingly collect personal data from minors. If we become aware that we have inadvertently collected such data, we will take immediate steps to delete it.</P>
        </S>

        <S id="changes" num="13" heading="Changes to This Policy">
          <P>We may update this Privacy Policy from time to time to reflect changes in law, technology, or our business practices. We will post the revised policy on this page with an updated "Last Updated" date. For material changes, we will notify active clients via email. Continued use of our website after changes constitutes acceptance of the revised policy.</P>
        </S>

        <S id="contact" num="14" heading="Contact & Grievance Redressal">
          <P>For any privacy-related questions, data requests, or complaints, please contact our designated Grievance Officer:</P>
          <div className="p-5 rounded-xl border border-border bg-card text-sm space-y-1.5">
            <p className="font-display font-semibold text-foreground">Grievance Officer — Spirecrest Solutions Pvt. Ltd.</p>
            <p className="text-muted-foreground">41/68, Kali Niwas, Narhi, Hazratganj, Lucknow, UP – 226001</p>
            <p className="text-muted-foreground">Email: <a href="mailto:info@spirecrest.in" className="text-accent hover:underline">info@spirecrest.in</a></p>
            <p className="text-muted-foreground">Response time: Within 30 days of receipt</p>
          </div>
        </S>
      </LegalPageLayout>

      <CTASection />
    </>
  );
}
