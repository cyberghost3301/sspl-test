import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-24 lg:py-32 bg-background" ref={ref}>
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
          <div className="relative z-10">
            <h2
              className="font-display text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
              style={{ color: "hsl(var(--on-dark))" }}
            >
              Ready to Build Something Extraordinary?
            </h2>
            <p
              className="max-w-xl mx-auto mb-8 text-lg"
              style={{ color: "hsl(var(--on-dark-muted))" }}
            >
              Let's discuss how Spirecrest can architect the perfect solution for your business.
            </p>
            <Link to="/contact">
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-display font-semibold gap-2 px-12 h-14 text-lg"
              >
                Partner With Us
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
