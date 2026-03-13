import SEO from "@/components/SEO";
import LegalPageLayout from "@/components/LegalPageLayout";

const sections = [
  { id: "general", heading: "1. General Disclaimer" },
  { id: "professional", heading: "2. Professional Services Disclaimer" },
  { id: "technical", heading: "3. Technical & Security Disclaimer" },
  { id: "financial", heading: "4. Financial & Investment Disclaimer" },
  { id: "external-links", heading: "5. External Links" },
  { id: "accuracy", heading: "6. Accuracy of Information" },
  { id: "no-warranty", heading: "7. No Warranties" },
  { id: "jurisdiction", heading: "8. Jurisdiction Notice" },
  { id: "contact", heading: "9. Contact" },
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
function Highlight({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-5 rounded-xl border border-accent/20 bg-accent/5 text-sm text-foreground leading-relaxed mb-4">
      {children}
    </div>
  );
}

export default function Disclaimer() {
  return (
    <>
      <SEO
        title="Disclaimer | Spirecrest Solutions"
        description="Important disclaimers regarding the use of information on spirecrest.in and the engagement of Spirecrest Solutions' technology and consulting services."
        path="/disclaimer"
      />

      <LegalPageLayout
        badge="Legal & Compliance"
        title="Legal"
        highlight="Disclaimer."
        subtitle="Important information about the limitations and nature of the content and services provided on spirecrest.in."
        lastUpdated="June 2025"
        sections={sections}
      >
        <S id="general" num="01" heading="General Disclaimer">
          <P>
            The information provided by <strong className="text-foreground">Spirecrest Solutions Private Limited</strong> ("Spirecrest", "we", "us") on <strong className="text-foreground">spirecrest.in</strong> is for general informational and commercial inquiry purposes only. All information is provided in good faith based on conditions known at the time of publication; however, Spirecrest makes no representation or warranty of any kind, express or implied, regarding the completeness, accuracy, reliability, suitability, or availability of the information, services, or related graphics contained on the website.
          </P>
          <Highlight>
            Any reliance you place on such information is strictly at your own risk. For project-specific technical details, pricing, timelines, and commitments, please engage us directly — a formal quotation or SoW governs the actual terms of any engagement.
          </Highlight>
        </S>

        <S id="professional" num="02" heading="Professional Services Disclaimer">
          <P>
            Descriptions of our services — including surveillance systems, software development, IT infrastructure, cybersecurity, and venture consulting — reflect our general capabilities and typical engagement outcomes. They should not be interpreted as guarantees of specific results for any individual project.
          </P>
          <P>
            Outcome metrics (e.g., "28–35% AMC cost reduction," "9000+ projects delivered") are based on historical data and real-world client outcomes. They are illustrative, not contractual guarantees. Actual results vary depending on scope, client infrastructure, third-party variables, and implementation conditions.
          </P>
          <P>
            Our venture consulting and VC advisory content does not constitute financial, investment, or legal advice. Statements about fundraising, valuation, investor strategy, and financial modeling are advisory in nature. Independent legal and financial counsel should be sought before making investment or financing decisions.
          </P>
        </S>

        <S id="technical" num="03" heading="Technical & Security Disclaimer">
          <P>
            While we apply industry-standard security measures to our systems and deliverables, no technology solution — including surveillance systems, software applications, or IT infrastructure — can guarantee 100% security or immunity from unauthorized access, cyberattacks, equipment failure, or environmental events.
          </P>
          <P>
            Hardware and software performance figures quoted on this website (e.g., uptime SLAs, detection accuracy, throughput rates) are based on manufacturer specifications or controlled deployment conditions. Real-world performance may vary.
          </P>
          <P>
            Compliance with specific government, regulatory, or industry standards (ISO 27001, CERT-In, DPDP Act) requires a formal compliance assessment for each client's specific context. Our mentioning of these standards reflects our alignment with their principles, not a blanket certification of every deliverable.
          </P>
        </S>

        <S id="financial" num="04" heading="Financial & Investment Disclaimer">
          <P>
            Content on our Lifecycle & Venture Consulting service page — including guidance on pitch decks, VC strategy, financial modeling, and capital raise advisory — is informational and educational in nature.
          </P>
          <P>
            Spirecrest Solutions is not a registered investment advisor, broker-dealer, financial planner, or legal firm under SEBI, RBI, or any other Indian regulatory authority. Nothing on our website or in our deliverables should be construed as investment advice, a solicitation for securities, or a guarantee of funding outcomes.
          </P>
          <P>
            Past funding facilitation results and client outcomes cited are not indicative of future results. All investment and financing decisions carry risk, and clients should obtain independent professional advice.
          </P>
        </S>

        <S id="external-links" num="05" heading="External Links Disclaimer">
          <P>
            Our website may contain hyperlinks to third-party websites, partner organizations, hardware manufacturer sites, or reference materials. These links are provided for convenience and informational purposes only.
          </P>
          <P>
            Spirecrest does not control, endorse, or take responsibility for the content, privacy practices, accuracy, or availability of any third-party website. Accessing external links is at your own risk. We recommend reviewing the terms and privacy policy of any third-party site you visit.
          </P>
        </S>

        <S id="accuracy" num="06" heading="Accuracy of Information">
          <P>
            We endeavor to keep information on spirecrest.in accurate and current. However, the technology, regulatory, and business landscape evolves rapidly. Specific details — including pricing, product specifications, regulatory requirements, and partnership details — are subject to change without notice.
          </P>
          <P>
            Statistics, project counts, and capacity figures are periodically updated but may not reflect the most recent data at the time of your visit. All figures are provided in good faith based on internal records.
          </P>
        </S>

        <S id="no-warranty" num="07" heading="No Warranties">
          <P>
            To the fullest extent permitted by law, Spirecrest Solutions Private Limited expressly disclaims all warranties of any kind — whether express, implied, or statutory — related to the website and any information or services described therein, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
          </P>
          <P>
            We do not warrant that: (a) the website will be error-free or uninterrupted; (b) defects will be corrected; (c) the website or servers are free of viruses or harmful components; or (d) use of the website will meet your specific requirements or expectations.
          </P>
        </S>

        <S id="jurisdiction" num="08" heading="Jurisdiction Notice">
          <P>
            This website is operated from Lucknow, Uttar Pradesh, India. Spirecrest Solutions makes no representation that materials or services described on this site are appropriate or available for use outside India. Access to our website from jurisdictions where its content may be illegal or restricted is prohibited.
          </P>
          <P>
            This Disclaimer is governed by the laws of India. Any disputes arising from your use of this website shall be subject to the exclusive jurisdiction of courts in Lucknow, Uttar Pradesh, India.
          </P>
        </S>

        <S id="contact" num="09" heading="Contact">
          <P>
            If you have questions about this Disclaimer or wish to report inaccurate information on our website:
          </P>
          <div className="p-5 rounded-xl border border-border bg-card text-sm space-y-1.5">
            <p className="font-display font-semibold text-foreground">Spirecrest Solutions Private Limited</p>
            <p className="text-muted-foreground">41/68, Kali Niwas, Narhi, Hazratganj, Lucknow, UP – 226001</p>
            <p className="text-muted-foreground">Email: <a href="mailto:info@spirecrest.in" className="text-accent hover:underline">info@spirecrest.in</a></p>
            <p className="text-muted-foreground">Phone: <a href="tel:+919250974145" className="text-accent hover:underline">+91 9250974145</a></p>
          </div>
        </S>
      </LegalPageLayout>
    </>
  );
}
