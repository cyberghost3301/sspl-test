import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield, Code, ShieldCheck, Zap, Network, Monitor,
  Sun as SunIcon, Palette, Headphones, Menu, X, ChevronDown,
  Moon, SunMedium, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ContactModal";
import seltLogo from "@/assets/selt.png";

const services = [
  { icon: Shield, title: "Advanced Surveillance", desc: "Enterprise-grade security infrastructure", href: "/services/surveillance" },
  { icon: Code, title: "Web-App & Software Dev", desc: "Custom digital products at scale", href: "/services/software" },
  { icon: ShieldCheck, title: "IT Consulting & Cybersecurity", desc: "Protect, optimize, and future-proof", href: "/services/consulting" },
  { icon: Zap, title: "Smart Automation", desc: "IoT and intelligent systems", href: "/services/automation" },
  { icon: Network, title: "Networking & Cloud", desc: "Scalable cloud infrastructure", href: "/services/networking" },
  { icon: Monitor, title: "Computer Solutions", desc: "Hardware and enterprise IT", href: "/services/computers" },
  { icon: SunIcon, title: "Solar Power Systems", desc: "Clean energy solutions", href: "/services/solar" },
  { icon: Headphones, title: "AV Studio", desc: "Professional audiovisual services", href: "/services/av-studio" },
  { icon: Palette, title: "Interior Design", desc: "Modern workspace design", href: "/services/interior" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "#", hasMega: true },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMegaOpen(false);
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  // Pages with dark hero backgrounds where nav text needs to be light when not scrolled
  const hasDarkHero = ["/", "/about", "/services/surveillance", "/services/software", "/services/consulting"].includes(location.pathname);
  const isOverDark = hasDarkHero && !scrolled;

  // Dynamic text classes based on whether we're over the dark hero
  const navTextClass = isOverDark
    ? "text-white/70 hover:text-white"
    : "text-muted-foreground hover:text-foreground";
  const navActiveClass = "text-accent";
  const logoTextClass = isOverDark ? "text-white" : "text-foreground";
  const iconBtnClass = isOverDark
    ? "text-white/70 hover:text-white hover:bg-white/10"
    : "text-muted-foreground hover:text-foreground hover:bg-secondary";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-sm"
            : "bg-transparent"
        }`}
      >
        <div className="section-container flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl tracking-tight">
            <img src={seltLogo} alt="Spirecrest" className="h-9 w-auto" style={{ filter: isOverDark ? "invert(1)" : "none" }} />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className="relative"
                onMouseEnter={() => link.hasMega && setMegaOpen(true)}
                onMouseLeave={() => link.hasMega && setMegaOpen(false)}
              >
                {link.hasMega ? (
                  <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${navTextClass}`}>
                    {link.label}
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform ${megaOpen ? "rotate-180" : ""}`} />
                  </button>
                ) : (
                  <Link
                    to={link.href}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${
                      location.pathname === link.href
                        ? navActiveClass
                        : navTextClass
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className={`p-2 rounded-md transition-colors ${iconBtnClass}`}
              aria-label="Toggle theme"
            >
              {dark ? <SunMedium className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <Button onClick={() => setContactModalOpen(true)} size="sm" className="hidden sm:flex bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold gap-1.5">
              Partner With Us
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 transition-colors ${isOverDark ? "text-white" : "text-foreground"}`}
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        <AnimatePresence>
          {megaOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="hidden lg:block absolute top-full left-0 right-0 bg-card/95 backdrop-blur-xl border-b border-border shadow-xl"
              onMouseEnter={() => setMegaOpen(true)}
              onMouseLeave={() => setMegaOpen(false)}
            >
              <div className="section-container py-8">
                <p className="text-xs font-display uppercase tracking-widest text-muted-foreground mb-6">Our Solutions</p>
                <div className="grid grid-cols-3 gap-3">
                  {services.map((s) => (
                    <Link
                      key={s.title}
                      to={s.href}
                      className="group flex items-start gap-4 p-4 rounded-lg hover:bg-secondary transition-colors"
                    >
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <s.icon className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="font-display font-semibold text-sm text-foreground">{s.title}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-background pt-20 px-6 overflow-y-auto lg:hidden"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.filter(l => !l.hasMega).map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-lg font-display font-semibold text-foreground py-3 border-b border-border"
                >
                  {link.label}
                </Link>
              ))}
              <p className="text-xs font-display uppercase tracking-widest text-muted-foreground mt-6 mb-3">Services</p>
              {services.map((s) => (
                <Link key={s.title} to={s.href} className="flex items-center gap-3 py-2.5">
                  <s.icon className="w-4 h-4 text-accent" />
                  <span className="text-sm text-foreground">{s.title}</span>
                </Link>
              ))}
              <Link to="/contact" className="mt-6">
                <Button className="w-full bg-accent text-accent-foreground font-display font-semibold">
                  Partner With Us
                </Button>
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
