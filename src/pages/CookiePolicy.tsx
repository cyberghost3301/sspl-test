import SEO from "@/components/SEO";
import LegalPageLayout from "@/components/LegalPageLayout";

const sections = [
  { id: "what-are-cookies", heading: "1. What Are Cookies" },
  { id: "how-we-use", heading: "2. How We Use Cookies" },
  { id: "cookie-types", heading: "3. Types of Cookies We Use" },
  { id: "third-party", heading: "4. Third-Party Cookies" },
  { id: "managing", heading: "5. Managing Your Cookie Preferences" },
  { id: "changes", heading: "6. Changes to This Policy" },
  { id: "contact", heading: "7. Contact" },
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

function CookieTable({ rows }: { rows: { name: string; type: string; purpose: string; duration: string }[] }) {
  return (
    <div className="overflow-x-auto mb-6 rounded-xl border border-border">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-secondary/50">
            <th className="text-left p-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Cookie / Provider</th>
            <th className="text-left p-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Type</th>
            <th className="text-left p-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Purpose</th>
            <th className="text-left p-4 font-display text-xs uppercase tracking-widest text-muted-foreground">Duration</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className={`border-b border-border last:border-0 ${i % 2 === 0 ? "bg-card" : "bg-background"}`}>
              <td className="p-4 font-mono text-xs text-foreground">{r.name}</td>
              <td className="p-4 text-xs text-muted-foreground">{r.type}</td>
              <td className="p-4 text-xs text-muted-foreground">{r.purpose}</td>
              <td className="p-4 text-xs text-muted-foreground">{r.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function CookiePolicy() {
  return (
    <>
      <SEO
        title="Cookie Policy | Spirecrest Solutions"
        description="Understand how Spirecrest Solutions uses cookies and similar tracking technologies on spirecrest.in and how to manage your cookie preferences."
        path="/cookie-policy"
      />

      <LegalPageLayout
        badge="Legal & Compliance"
        title="Cookie"
        highlight="Policy."
        subtitle="How we use cookies and tracking technologies on spirecrest.in — and how you control them."
        lastUpdated="June 2025"
        sections={sections}
      >
        <S id="what-are-cookies" num="01" heading="What Are Cookies">
          <P>
            Cookies are small text files placed on your device (computer, tablet, or mobile) when you visit a website. They are widely used to make websites function correctly, remember your preferences, and provide analytical data to site owners.
          </P>
          <P>
            Similar technologies — including web beacons, pixel tags, and local storage — may also be used and are collectively referred to as "cookies" in this policy.
          </P>
        </S>

        <S id="how-we-use" num="02" heading="How We Use Cookies">
          <P>Spirecrest Solutions uses cookies on spirecrest.in for the following purposes:</P>
          <Bullets items={[
            "Ensuring the website functions correctly and securely",
            "Remembering your preferences (e.g., dark/light mode selection)",
            "Analyzing how visitors use our site to improve its structure and content",
            "Understanding which pages, services, and content are most relevant to our visitors",
            "Measuring the effectiveness of any future marketing campaigns",
          ]} />
          <P>We do not use cookies to serve third-party advertising or to track you across other websites.</P>
        </S>

        <S id="cookie-types" num="03" heading="Types of Cookies We Use">
          <CookieTable rows={[
            { name: "Session Cookie", type: "Strictly Necessary", purpose: "Maintains your session state and security across page navigations", duration: "Session (deleted on browser close)" },
            { name: "theme-preference", type: "Functional", purpose: "Stores your selected light/dark mode preference", duration: "12 months" },
            { name: "_ga / _gid", type: "Analytics (if enabled)", purpose: "Google Analytics: distinguishes unique users, tracks session duration and page views", duration: "2 years / 24 hours" },
            { name: "Vercel Analytics", type: "Analytics", purpose: "Anonymous performance and visitor metrics collected by our hosting platform", duration: "Session" },
          ]} />
          <P>We currently do not use marketing or advertising cookies. If this changes, this policy will be updated with prior notice.</P>
        </S>

        <S id="third-party" num="04" heading="Third-Party Cookies">
          <P>
            Our website is hosted on <strong className="text-foreground">Vercel</strong>, which may set its own technical cookies for CDN performance and security purposes. We embed <strong className="text-foreground">Google Maps</strong> on our Contact page — Google may set cookies when you interact with the embedded map, subject to Google's Privacy Policy.
          </P>
          <P>
            We do not control third-party cookies and recommend reviewing the privacy policies of those providers if you have concerns.
          </P>
        </S>

        <S id="managing" num="05" heading="Managing Your Cookie Preferences">
          <P>
            You can control and manage cookies in several ways. Note that restricting certain cookies may impact the functionality of our website.
          </P>
          <P>
            <strong className="text-foreground">Browser settings:</strong> Most browsers allow you to view, block, or delete cookies through their privacy or settings menus. Common browsers:
          </P>
          <Bullets items={[
            "Chrome: Settings → Privacy and security → Cookies and other site data",
            "Firefox: Settings → Privacy & Security → Cookies and Site Data",
            "Safari: Preferences → Privacy → Manage Website Data",
            "Edge: Settings → Cookies and site permissions",
          ]} />
          <P>
            <strong className="text-foreground">Google Analytics opt-out:</strong> You can prevent Google Analytics from collecting data by installing the{" "}
            <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noreferrer" className="text-accent hover:underline">
              Google Analytics Opt-out Browser Add-on
            </a>.
          </P>
          <P>Blocking strictly necessary cookies may prevent essential site functions from working correctly. Functional cookies (theme preference) can be safely disabled without loss of core functionality.</P>
        </S>

        <S id="changes" num="06" heading="Changes to This Policy">
          <P>
            We may update this Cookie Policy as our use of cookies changes or as regulations evolve. Material changes will be reflected with an updated "Last Updated" date. We recommend reviewing this page periodically.
          </P>
        </S>

        <S id="contact" num="07" heading="Contact">
          <P>For cookie-related questions or preferences:</P>
          <div className="p-5 rounded-xl border border-border bg-card text-sm space-y-1.5">
            <p className="font-display font-semibold text-foreground">Spirecrest Solutions Private Limited</p>
            <p className="text-muted-foreground">Email: <a href="mailto:info@spirecrest.in" className="text-accent hover:underline">info@spirecrest.in</a></p>
            <p className="text-muted-foreground">Phone: <a href="tel:+919250974145" className="text-accent hover:underline">+91 9250974145</a></p>
          </div>
        </S>
      </LegalPageLayout>
    </>
  );
}
