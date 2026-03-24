import { m as motion } from "framer-motion";
import { trackWhatsAppClick } from "@/lib/analytics";

interface WhatsAppCTAProps {
  context: 
    | "surveillance" 
    | "software" 
    | "software-case-study"
    | "software-pricing"
    | "software-cta"
    | "consulting" 
    | "lifecycle" 
    | "automation" 
    | "networking" 
    | "solar" 
    | "av-studio" 
    | "computers" 
    | "interior" 
    | "portfolio" 
    | "team" 
    | "general";
  buttonText?: string;
  /** Logical placement used for GA4 tracking: 'hero' | 'pricing' | 'case_study' | 'footer' | any string */
  section?: string;
  className?: string;
}

export default function WhatsAppCTA({
  context,
  buttonText = "Chat on WhatsApp",
  section = context,
  className = "",
}: WhatsAppCTAProps) {
  const phoneNumber = "919250974145";

  // Section-level message overrides — standardized 3-tier CTA system
  const sectionMessages: Record<string, string> = {
    hero:       "Hi, I want guidance on what solution my business needs",
    pricing:    "Hi, I want an estimate for my project",
    case_study: "Hi, I want an estimate for my project",
    footer:     "Hi, I want to discuss my requirements with your team",
  };

  // Dictionary of page-specific enterprise messages
  const messages = {
    // Flagship Services
    surveillance: "Hi Spirecrest. I am looking to secure our infrastructure and would like to discuss a custom Advanced Surveillance & Physical Security deployment.",
    software: "Hi, I want to understand what kind of system my business needs.",
    "software-case-study": "Hi, I\u2019m looking to build something similar to your case study.",
    "software-pricing": "Hi, I saw your system pricing ranges. Can you estimate my project?",
    "software-cta": "Hi, I want to discuss building or improving my business systems.",
    consulting: "Hi, I want to secure my business against cyber threats and discuss your IT compliance & security services. Can we arrange a compliance audit?",
    lifecycle: "Hi Spirecrest. I am interested in your Strategic Lifecycle Partnership and Venture Consulting to scale our operations. Let's discuss a growth strategy.",

    // Core Infrastructure Services
    automation: "Hi, I am looking to implement smart building automation and control systems. Can we estimate my project?",
    networking: "Hi Spirecrest. I need to discuss enterprise Networking, Cloud architecture, or a heavy server migration.",
    solar: "Hi, I'm interested in sustainable energy solutions and solar power infrastructure. Can you provide a cost estimate?",
    "av-studio": "Hi, I need enterprise communication or AV solutions for my setup. Can you estimate the requirements?",
    computers: "Hi, I need custom hardware, servers, or an IT AMC for my business. Can we discuss options?",
    interior: "Hi, I want to discuss luxury interior design or construction for my workspace. Can we schedule a consultation?",

    // General Pages
    portfolio: "Hi Spirecrest. I was reviewing your past deployments in your Portfolio and would like to scope a project of a similar scale.",
    team: "Hi Spirecrest. I was reviewing your Collective directory and would like to speak directly with one of your Directors regarding a partnership.",
    general: "Hi Spirecrest. I would like to connect with your team to discuss an enterprise technology solution."
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(buttonText, section);
    // Section-level override takes priority, then page-specific message, then general fallback
    const message = sectionMessages[section] ?? messages[context] ?? messages.general;
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={handleWhatsAppClick}
      className={`inline-flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold transition-all duration-300 shadow-xl shadow-accent/20 hover:scale-[1.02] active:scale-[0.98] hover:shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:border-cyan-500/50 hover:brightness-110 rounded-xl ${className}`}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 448 512" className="w-5 h-5 flex-shrink-0">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>
      {buttonText}
    </motion.button>
  );
}
