import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram, Mail, MapPin, Phone, Facebook } from "lucide-react";
import sfiltLogo from "@/assets/sfilt.png";

const footerLinks = {
  Navigation: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Testimonials", href: "/testimonials" },
    { label: "Collective", href: "/collective" },
    { label: "Contact Us", href: "/contact" },
  ],
  Governance: [
    { label: "FAQ", href: "/faq" },
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms of Service", href: "/terms-of-service" },
    { label: "Cookie Policy", href: "/cookie-policy" },
    { label: "Disclaimer", href: "/disclaimer" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-hero-gradient" style={{ color: "hsl(var(--on-dark))" }}>
      <div className="section-container py-12 md:py-16 lg:py-20">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-6 md:gap-8 lg:gap-12">
          
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-12 lg:col-span-4 mb-4 lg:mb-0">
            <div className="mb-4">
              <img src={sfiltLogo} alt="Spirecrest Solutions Pvt. Ltd." className="h-10 w-auto invert" />
            </div>
            <p className="text-sm leading-relaxed max-w-sm mb-6" style={{ color: "hsl(var(--on-dark-muted))" }}>
              Smart Ideas. Solid Executions. Scalable Results. A multi-disciplinary technology firm delivering enterprise-grade solutions across security, software, and infrastructure.
            </p>
            <div className="flex items-center gap-3">
              <a href="https://www.instagram.com/spirecrest/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.linkedin.com/company/spirecrest/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="https://www.facebook.com/ssplbharat/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://x.com/spirecrestindia/" target="_blank" rel="noreferrer" className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading} className="col-span-1 md:col-span-3 lg:col-span-2">
              <p className="font-display font-semibold text-sm mb-3">{heading}</p>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm hover:text-accent transition-colors" style={{ color: "hsl(var(--on-dark-muted))" }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact Column */}
          <div className="col-span-2 md:col-span-6 lg:col-span-4">
            <p className="font-display font-semibold text-sm mb-3">Contact Us</p>
            <div className="space-y-3 text-sm" style={{ color: "hsl(var(--on-dark-muted))" }}>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium text-white mb-1">Head Office</p>
                  <p>41/68, Kali Niwas, Narhi,<br />Hazratganj, Lucknow,<br />Uttar Pradesh, India, 226001</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+919250974145" className="hover:text-accent transition-colors">+91 9250974145</a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:info@spirecrest.in" className="hover:text-accent transition-colors">info@spirecrest.in</a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom strip */}
        <div className="mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "hsl(var(--on-dark-muted) / 0.6)" }}>
            © {new Date().getFullYear()} Spirecrest Solutions Pvt. Ltd. All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}
