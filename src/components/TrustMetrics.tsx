import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

interface Metric {
  value: string;
  numericPart: number;
  prefix: string;
  suffix: string;
  label: string;
}

const metrics: Metric[] = [
  { value: "950+", numericPart: 950, prefix: "", suffix: "+", label: "Mission-Critical Deployments" },
  { value: "ISO Aligned", numericPart: 0, prefix: "", suffix: "", label: "Global Compliance Standards" },
  { value: "MSME", numericPart: 0, prefix: "", suffix: "", label: "Recognized by MSME" },
  { value: "DPIIT", numericPart: 0, prefix: "", suffix: "", label: "Startup India Certified" },
];

function CountUp({ target, suffix, decimals = 0, inView }: { target: number; suffix: string; decimals?: number; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView || target === 0) return;
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);

  if (target === 0) return null;

  return (
    <span>
      {decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}
      {suffix}
    </span>
  );
}

export default function TrustMetrics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="w-full py-16 md:py-20 border-t border-b"
      style={{
        background: "linear-gradient(180deg, hsl(220 25% 6%) 0%, hsl(220 25% 10%) 50%, hsl(220 25% 6%) 100%)",
        borderColor: "rgba(255,255,255,0.1)",
      }}
    >
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="text-center space-y-2"
            >
              <p className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white font-display">
                {metric.numericPart > 0 ? (
                  <CountUp
                    target={metric.numericPart}
                    suffix={metric.suffix}
                    decimals={metric.value.includes(".") ? 1 : 0}
                    inView={inView}
                  />
                ) : (
                  <span>{metric.value}</span>
                )}
              </p>
              <p className="text-sm sm:text-base text-white/60 font-medium tracking-wide uppercase">
                {metric.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
