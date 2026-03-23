import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhatsAppCTA from "@/components/WhatsAppCTA";

interface CTASectionProps {
  heading?: string;
  subtext?: string;
}

export default function CTASection({
  heading = "Tell us what you're trying to achieve.",
  subtext = "We'll tell you exactly what you need. No upselling, just engineering.",
}: CTASectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 lg:py-24 bg-background" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-hero-gradient p-12 md:p-16 lg:p-20 text-center"
        >
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: "linear-gradient(hsl(var(--accent)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--accent)) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }} />
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-accent/5 blur-[100px]" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-amber-500/5 blur-[80px]" />

          <div className="relative z-10">
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: "hsl(var(--on-dark))" }}
            >
              {heading}
            </h2>
            <p
              className="max-w-xl mx-auto mb-10 text-lg"
              style={{ color: "hsl(var(--on-dark-muted))" }}
            >
              {subtext}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              {/* Primary: WhatsApp Us */}
              <motion.div
                animate={{ boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 20px rgba(6,182,212,0.6)", "0 0 0px rgba(6,182,212,0)"] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="rounded-xl w-full sm:w-auto"
              >
                <WhatsAppCTA
                  context="general"
                  buttonText="WhatsApp Us"
                  className="px-10 h-[52px] text-base w-full sm:w-auto shadow-xl shadow-accent/20 rounded-xl"
                />
              </motion.div>

              {/* Secondary: Call Now */}
              <a href="tel:+919250974145" className="w-full sm:w-auto">
                <motion.div
                  animate={{ boxShadow: ["0 0 0px rgba(6,182,212,0)", "0 0 14px rgba(6,182,212,0.35)", "0 0 0px rgba(6,182,212,0)"] }}
                  transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut", delay: 1.25 }}
                  className="rounded-xl w-full sm:w-auto"
                >
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full font-display font-semibold gap-2 px-10 h-[52px] text-base border-accent/30 text-accent hover:bg-accent/10"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </Button>
                </motion.div>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
