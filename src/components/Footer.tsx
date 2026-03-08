import { Link } from "react-router-dom";
import { Linkedin, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";

const footerLinks = {
  Solutions: [
    { label: "Surveillance", href: "/services/surveillance" },
    { label: "Software Dev", href: "/services/software" },
    { label: "IT Consulting", href: "/services/consulting" },
    { label: "Smart Automation", href: "/services/automation" },
    { label: "Cloud & Networking", href: "/services/networking" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 font-display font-bold text-xl mb-4">
              <div className="w-8 h-8 rounded-md bg-accent flex items-center justify-center">
                <span className="text-accent-foreground font-bold text-sm">S</span>
              </div>
              Spirecrest Solutions
            </div>
            <p className="text-primary-foreground/70 text-sm leading-relaxed max-w-sm mb-6">
              Smart Ideas. Solid Executions. Scalable Results. A multi-disciplinary technology firm delivering enterprise-grade solutions across security, software, and infrastructure.
            </p>
            <div className="flex items-center gap-3">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <p className="font-display font-semibold text-sm mb-4">{heading}</p>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.href} className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact strip */}
        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex flex-wrap gap-6 text-sm text-primary-foreground/50">
            <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5" /> contact@spirecrest.in</span>
            <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5" /> +91 XXXXX XXXXX</span>
            <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" /> India</span>
          </div>
          <p className="text-xs text-primary-foreground/40">
            © {new Date().getFullYear()} Spirecrest Solutions Pvt. Ltd. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
