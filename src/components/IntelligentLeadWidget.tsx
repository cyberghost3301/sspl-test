import { useState, useEffect, useRef } from "react";
import { AnimatePresence, m as motion, type Variants } from "framer-motion";
import { X } from "lucide-react";
import { trackWhatsAppClick } from "@/lib/analytics";

/* ── WhatsApp config ── */
const PHONE = "919250974145";
const wa = (msg: string) =>
  `https://wa.me/${PHONE}?text=${msg}`;

const OPTIONS = [
  {
    label: "New system development",
    url: wa("Hi%2C%20I%20want%20to%20build%20a%20new%20system%20for%20my%20business.%20Can%20you%20guide%20me%3F"),
  },
  {
    label: "Improve existing system",
    url: wa("Hi%2C%20I%20need%20help%20improving%20or%20scaling%20my%20existing%20system.%20Can%20we%20discuss%3F"),
  },
  {
    label: "Just exploring",
    url: wa("Hi%2C%20I%E2%80%99m%20just%20exploring%20my%20options%20right%20now.%20Can%20we%20chat%3F"),
  },
] as const;

const SKIP_URL = wa("Hi%2C%20I%20would%20like%20to%20speak%20with%20your%20team.");

/* ── Card animation variants ── */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.93 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.32, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
  },
  exit: {
    opacity: 0,
    y: 10,
    scale: 0.95,
    transition: { duration: 0.2, ease: "easeIn" as const },
  },
};

/* ── Option animation (staggered) ── */
const optionVariants: Variants = {
  hidden: { opacity: 0, x: -8 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.22, delay: 0.06 + i * 0.07, ease: "easeOut" as const },
  }),
};

export function IntelligentLeadWidget() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [ctaClicked, setCtaClicked] = useState(false);
  const reOpenTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /* Auto-expand after 6 s */
  useEffect(() => {
    const t = setTimeout(() => setIsExpanded(true), 6000);
    return () => clearTimeout(t);
  }, []);

  /* Cleanup re-open timer on unmount */
  useEffect(() => {
    return () => {
      if (reOpenTimer.current) clearTimeout(reOpenTimer.current);
    };
  }, []);

  const handleClose = () => {
    setIsExpanded(false);
    if (!ctaClicked) {
      reOpenTimer.current = setTimeout(() => setIsExpanded(true), 60_000);
    }
  };

  const handleOptionClick = (url: string, label: string) => {
    trackWhatsAppClick(label, "floating_widget");
    setCtaClicked(true);
    setIsExpanded(false);
    if (reOpenTimer.current) clearTimeout(reOpenTimer.current);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* ── Expanded qualification card ── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="widget-card"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-black/80 backdrop-blur-xl border border-white/10 shadow-2xl shadow-cyan-900/20 rounded-2xl p-5 w-[300px] origin-bottom-right"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <p className="text-white font-medium text-base leading-snug pr-2">
                What best describes your need?
              </p>
              <button
                onClick={handleClose}
                aria-label="Close widget"
                className="shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-gray-500 hover:text-white hover:bg-white/10 transition-colors mt-0.5"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Qualification options */}
            <div className="flex flex-col gap-2">
              {OPTIONS.map((opt, i) => (
                <motion.button
                  key={opt.label}
                  custom={i}
                  variants={optionVariants}
                  initial="hidden"
                  animate="visible"
                  onClick={() => handleOptionClick(opt.url, opt.label)}
                  className="w-full border border-white/10 bg-white/[0.03] hover:bg-white/5 hover:border-cyan-500/30 transition-colors rounded-lg p-3 text-sm text-left text-gray-200 leading-snug min-h-[44px]"
                >
                  {opt.label}
                </motion.button>
              ))}
            </div>

            {/* Skip link */}
            <button
              onClick={() => handleOptionClick(SKIP_URL, "Skip & chat directly")}
              className="text-xs text-gray-500 hover:text-cyan-400 mt-4 text-center cursor-pointer block w-full transition-colors min-h-[36px] flex items-center justify-center"
            >
              Skip &amp; chat directly
            </button>

            {/* Subtle gradient rule */}
            <div className="mt-3 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating circle trigger ── */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsExpanded((v) => !v)}
        aria-label={isExpanded ? "Close chat widget" : "Open chat widget"}
        className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md hover:bg-emerald-500/30 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_28px_rgba(16,185,129,0.45)] transition-all duration-300"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full animate-ping opacity-20 bg-emerald-400 pointer-events-none" />

        {/* WhatsApp SVG */}
        <WhatsAppIcon className="w-7 h-7 text-emerald-400 relative z-10 drop-shadow-md" />

        {/* Tooltip — hidden when expanded */}
        {!isExpanded && (
          <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 px-3 py-1.5 rounded-lg bg-slate-900 border border-white/10 text-xs font-medium text-white opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all pointer-events-none whitespace-nowrap shadow-xl">
            Chat with a Principal
          </span>
        )}
      </motion.button>
    </div>
  );
}

/* ── Inline WhatsApp SVG (no CDN dependency) ── */
function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 448 512"
      fill="currentColor"
      className={className}
    >
      <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z" />
    </svg>
  );
}
