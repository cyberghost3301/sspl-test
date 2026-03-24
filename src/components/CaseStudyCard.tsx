import { useRef } from "react";
import { m as motion, useInView } from "framer-motion";
import { X, Check } from "lucide-react";

export interface CaseStudyMetrics {
  value: string;
  label: string;
}

export interface CaseStudyCardProps {
  sectionTitle?: string;
  industryTag?: string;
  headline?: string;
  problemSubheading?: string;
  problemText?: string;
  solutionSubheading?: string;
  solutionText?: string;
  beforeItems?: string[];
  afterItems?: string[];
  metrics?: CaseStudyMetrics[];
  closingLine?: string;
  children?: React.ReactNode;
}

export default function CaseStudyCard({
  sectionTitle = "Real Systems. Real Results.",
  industryTag = "RETAIL / MANUFACTURING / HEALTHCARE",
  headline = "Multi-location operations system for a retail business",
  problemSubheading = "The Problem",
  problemText = "Short paragraph explaining the chaos, disconnected tools, and manual bottlenecks.",
  solutionSubheading = "What We Built",
  solutionText = "Clear, simple explanation of the centralized system, automation, and real-time infrastructure.",
  beforeItems = ["Manual processes", "Fragmented tools", "Delayed reporting"],
  afterItems = ["Centralized system", "Automation", "Real-time insights"],
  metrics = [
    { value: "40%", label: "Efficiency improvement" },
    { value: "20hrs", label: "Time saved weekly" },
    { value: "30%", label: "Cost reduction" },
  ],
  closingLine = "Built for scale \u2014 continues to support business growth without operational bottlenecks.",
  children,
}: CaseStudyCardProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-20 bg-background" ref={ref}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 1. SECTION TITLE */}
        {sectionTitle && (
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-3xl font-bold text-white mb-12 text-center font-display"
          >
            {sectionTitle}
          </motion.h2>
        )}

        {/* 2. THE GLASS CARD CONTAINER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl rounded-2xl p-6 md:p-10"
        >
          
          {/* 3. HEADER PORTION */}
          {industryTag && (
            <p className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-3 font-display">
              {industryTag}
            </p>
          )}
          {headline && (
            <h3 className="text-2xl md:text-3xl font-semibold text-white mb-8 font-display leading-tight">
              {headline}
            </h3>
          )}

          {/* 4. CONTEXT GRID (Problem & Solution) */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* COLUMN 1 (Problem) */}
            <div>
              <p className="text-sm font-medium text-red-400/80 uppercase tracking-wide mb-2 font-display">
                {problemSubheading}
              </p>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {problemText}
              </p>
            </div>
            
            {/* COLUMN 2 (Solution) */}
            <div>
              <p className="text-sm font-medium text-cyan-400 uppercase tracking-wide mb-2 font-display">
                {solutionSubheading}
              </p>
              <p className="text-gray-300 text-sm md:text-base leading-relaxed">
                {solutionText}
              </p>
            </div>
          </div>

          {/* 5. BEFORE VS AFTER SECTION */}
          <div className="bg-black/40 border border-white/5 rounded-xl p-6 mb-8">
            <div className="grid grid-cols-2 gap-6">
              
              {/* BEFORE COLUMN */}
              <div>
                <p className="text-gray-400 font-medium mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-red-400/10 flex items-center justify-center shrink-0">
                    <X className="w-3 h-3 text-red-400" />
                  </span>
                  Before
                </p>
                <ul className="text-sm text-gray-500 space-y-2">
                  {beforeItems.map((item, idx) => (
                    <li key={`before-${idx}`} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-gray-600 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* AFTER COLUMN */}
              <div>
                <p className="text-white font-medium mb-3 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-cyan-400/10 flex items-center justify-center shrink-0">
                    <Check className="w-3 h-3 text-cyan-400" />
                  </span>
                  After
                </p>
                <ul className="text-sm text-cyan-100 space-y-2">
                  {afterItems.map((item, idx) => (
                    <li key={`after-${idx}`} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400/60 mt-1.5 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
            </div>
          </div>

          {/* 6. METRICS STRIP */}
          {metrics && metrics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-y border-white/10 py-6 mb-6">
              {metrics.map((metric, idx) => (
                <div key={`metric-${idx}`} className="text-center md:text-left">
                  <p className="font-display text-3xl font-bold text-cyan-400 mb-1">
                    {metric.value}
                  </p>
                  <p className="text-xs uppercase tracking-wider text-gray-500 font-display">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* 7. CLOSING LINE */}
          {closingLine && (
            <p className="text-center text-sm italic text-gray-400 mt-2 mb-4">
              {closingLine}
            </p>
          )}

          {/* 8. EXTENSIBLE CONTENT / CTA */}
          {children}

        </motion.div>
      </div>
    </section>
  );
}
