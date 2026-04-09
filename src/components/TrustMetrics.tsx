import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Settings, CheckCircle } from "lucide-react";

const trustMarkers = [
  {
    icon: MapPin,
    label: "Serving Lucknow & U.P.",
  },
  {
    icon: Clock,
    label: "24/7 Zero Downtime Support",
  },
  {
    icon: Settings,
    label: "100% Custom-Built Solutions",
  },
  {
    icon: CheckCircle,
    label: "Trusted Infrastructure Partner",
  },
];

export default function TrustMetrics() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      ref={ref}
      className="relative w-full py-5 bg-transparent"
    >
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustMarkers.map((marker, i) => (
            <motion.div
              key={marker.label}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="flex items-center justify-center gap-2.5 py-3 px-4 text-center lg:text-left"
            >
              <marker.icon className="w-4 h-4 text-cyan-400/90 flex-shrink-0" />
              <span className="text-xs sm:text-sm font-medium text-white/50 leading-tight">
                {marker.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
