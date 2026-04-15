import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { m as motion, AnimatePresence } from "framer-motion";
import {
  Shield, Code, Lock, Network, Cpu, SunMedium, 
  Monitor, Target, RefreshCcw, MonitorPlay, LayoutTemplate,
  Menu, X, ChevronDown, Moon, ArrowRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ContactModal } from "@/components/ContactModal";
import seltLogoLight from "@/assets/selt.png";
import seltLogoDark from "@/assets/seltw.png";

const services = [
  { icon: Shield, title: "Advanced Surveillance", desc: "Zero-blind-spot monitoring & access control", href: "/services/surveillance" },
  { icon: Code, title: "Software & Cloud Systems", desc: "Custom workflow engines & proprietary ecosystems", href: "/services/software" },
  { icon: Lock, title: "Zero-Trust Security", desc: "Military-grade threat mitigation & compliance", href: "/services/cybersecurity" },
  { icon: Network, title: "Enterprise Networking", desc: "High-throughput SD-WAN & resilient architecture", href: "/services/networking" },
  { icon: Cpu, title: "Smart Space Automation", desc: "Facility orchestration & luxury home integrations", href: "/services/automation" },
  { icon: SunMedium, title: "Solar Power Grids", desc: "Commercial arrays & independent battery backups", href: "/services/solar" },
  { icon: Monitor, title: "Workstation Hardware", desc: "High-performance enterprise computing & IT", href: "/services/computers" },
  { icon: Target, title: "Strategic Tech Advisory", desc: "Fractional CTO leadership & scaling roadmaps", href: "/services/consulting" },
  { icon: RefreshCcw, title: "Lifecycle Operations", desc: "Infrastructure audits & MSME grant utilization", href: "/services/lifecycle-consulting" },
  { icon: MonitorPlay, title: "AV & Studio Engineering", desc: "Boardroom orchestration & high-fidelity acoustics", href: "/services/av-studio" },
  { icon: LayoutTemplate, title: "Tech-Driven Interiors", desc: "Aesthetic spaces built around hidden infrastructure", href: "/services/interior" },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "#", hasMega: true },
  { label: "Insights", href: "/insights" },
  { label: "Collective", href: "/collective" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Contact", href: "/contact" },
];

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dark, setDark] = useState(true);
  const [contactModalOpen, setContactModalOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
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
  const hasDarkHero = location.pathname === "/" || location.pathname.startsWith("/services/") || ["/about", "/portfolio", "/testimonials", "/collective", "/contact"].includes(location.pathname);
  const isSolid = isScrolled || mobileOpen;
  const isOverDark = hasDarkHero && !isSolid;

  const currentLogo = (isOverDark || dark) ? seltLogoDark : seltLogoLight;

  // Dynamic text classes based on whether we're over the dark hero
  const navTextClass = isOverDark
    ? "text-white"
    : "text-slate-900 dark:text-slate-100 hover:text-accent font-medium";
  const navActiveClass = "text-accent";
  const logoTextClass = isOverDark ? "text-white" : "text-slate-900 dark:text-slate-100";
  const iconBtnClass = isOverDark
    ? "text-white hover:text-white hover:bg-white/10"
    : "text-slate-900 dark:text-slate-100 hover:bg-secondary";

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-[100] transition-all duration-300"
        animate={{
          background: isScrolled ? 'rgba(5,7,10,0.85)' : 'transparent',
          backdropFilter: isScrolled ? 'blur(20px)' : 'blur(0px)',
          borderBottom: isScrolled ? '1px solid rgba(255,255,255,0.06)' : '1px solid transparent'
        }}
      >
        <div className="section-container flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-display font-bold text-xl tracking-tight">
            <img src={currentLogo} alt="Spirecrest" className="h-9 w-auto" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <div
                key={link.label}
                className={link.hasMega ? "relative inline-block" : "relative"}
                onMouseEnter={() => link.hasMega && setMegaOpen(true)}
                onMouseLeave={() => link.hasMega && setMegaOpen(false)}
              >
                {link.hasMega ? (
                  <>
                    <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium transition-colors ${navTextClass}`}>
                      {link.label}
                      <svg className={`w-4 h-4 opacity-50 transition-transform ${megaOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.98 }}
                          transition={{ ease: "circOut", duration: 0.2 }}
                          className="absolute top-full left-1/2 -translate-x-1/3 pt-6 w-[950px] z-[9999]"
                        >
                          {/* SOLID STATE PANEL - No liquid-glass transparency */}
                          <div className="bg-[#05070A] border border-white/10 rounded-2xl p-6 grid grid-cols-3 gap-x-8 gap-y-6 shadow-[0_40px_100px_rgba(0,0,0,0.8)] relative overflow-hidden">

                            {/* Subtle top edge highlight */}
                            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sc-teal/30 to-transparent" />

                            {services.map((service, idx) => (
                              <a
                                key={idx}
                                href={service.href}
                                className="group flex flex-col p-4 rounded-xl hover:bg-[#0D1117] transition-all duration-300 border border-transparent hover:border-white/5"
                              >
                                <span className="text-white font-semibold text-[15px] group-hover:text-sc-teal transition-colors flex items-center gap-3">
                                  <service.icon className="w-4 h-4 text-white/50 group-hover:text-sc-teal transition-colors" />
                                  {service.title}
                                </span>
                                <span className="text-sc-text-muted text-xs mt-1.5 ml-7 group-hover:text-white/70 transition-colors leading-relaxed">
                                  {service.desc}
                                </span>
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    to={link.href}
                    className={`px-4 py-2 text-sm font-medium transition-colors ${location.pathname === link.href
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
            <AnimatePresence>
              {isScrolled && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ ease: "circOut", duration: 0.3 }}
                  className="rounded-md"
                >
                  <motion.button
                    animate={{ boxShadow: ["0 0 0px rgba(0,212,200,0)", "0 0 15px rgba(0,212,200,0.4)", "0 0 0px rgba(0,212,200,0)"] }}
                    transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                    onClick={() => document.getElementById('scoping-engine')?.scrollIntoView({ behavior: 'smooth' })}
                    className="bg-sc-teal text-[#05070A] border-none px-5 py-2 rounded-md font-bold tracking-wide text-sm hover:scale-105 transition-transform"
                  >
                    Book Discovery Call →
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>

            {/*
            <button
              onClick={() => setDark(!dark)}
              className={`p-2 rounded-md transition-colors ${iconBtnClass}`}
              aria-label="Toggle theme"
            >
              {dark ? <SunMedium className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            */}

            {/*
            <motion.div
              animate={{ boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 20px rgba(6,182,212,0.6)", "0 0 0px rgba(6,182,212,0)"] }}
              transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
              className="hidden sm:block rounded-md"
            >
              <Button onClick={() => setContactModalOpen(true)} size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold gap-1.5 w-full">
                Partner With Us
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </motion.div>
            */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden p-2 relative flex items-center justify-center w-10 h-10 transition-colors group ${isOverDark ? "text-white" : "text-foreground"}`}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 group-hover:text-cyan-500 transition-colors" />
              ) : (
                <div className="flex flex-col justify-between w-5 h-3.5">
                  <span className="h-[1.5px] w-3/4 bg-current rounded-full self-end transition-colors group-hover:bg-cyan-500" />
                  <span className="h-[1.5px] w-full bg-current rounded-full transition-colors group-hover:bg-cyan-500" />
                  <span className="h-[1.5px] w-3/4 bg-current rounded-full self-start transition-colors group-hover:bg-cyan-500" />
                </div>
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu */}
        {/*
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
                      onClick={() => setMegaOpen(false)}
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
        */}
      </motion.header>

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
              <motion.div
                animate={{ boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 20px rgba(6,182,212,0.6)", "0 0 0px rgba(6,182,212,0)"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="w-full mt-6 mb-12 rounded-md"
              >
                <Button onClick={() => { setMobileOpen(false); setContactModalOpen(true); }} className="w-full bg-accent text-accent-foreground font-display font-semibold">
                  Partner With Us
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal isOpen={contactModalOpen} onOpenChange={setContactModalOpen} />
    </>
  );
}
