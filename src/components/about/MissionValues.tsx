import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Lightbulb, Shield, Zap, Target, Users, Globe } from "lucide-react";

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Constantly pushing boundaries to deliver cutting-edge solutions.",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Building trust through transparent and ethical business conduct.",
  },
  {
    icon: Zap,
    title: "Impact",
    description: "Creating meaningful change for our clients and community.",
  },
];

export default function MissionValues() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 lg:py-32 bg-background" ref={ref}>
      <div className="section-container">
        {/* Mission Block */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center mb-20"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            Our Mission
          </p>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Technology That Reaches <span className="text-gradient">Everyone, Everywhere.</span>
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed max-w-3xl mx-auto mb-8">
            Based in the heart of Lucknow, Uttar Pradesh, SPIRECREST operates as a diversified technology solutions provider, serving individual consumers and businesses nationwide. Our mission is to deliver cutting-edge technology and unparalleled service right to your doorstep, or digitally, wherever you are.
          </p>
          <motion.blockquote
            initial={{ opacity: 0, scale: 0.96 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="relative mx-auto max-w-2xl px-8 py-6 rounded-2xl border border-accent/20 bg-accent/5"
          >
            <span className="absolute -top-3 left-8 text-4xl text-accent font-display leading-none">"</span>
            <p className="text-foreground font-display text-base md:text-lg italic leading-relaxed">
              We pride ourselves on providing bespoke solutions to cater the demands from every individual to Large MNC and everyone in between!
            </p>
          </motion.blockquote>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-24">
          {values.map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
              className="group relative p-8 rounded-2xl border border-border bg-card hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-5 group-hover:bg-accent/20 transition-colors">
                <value.icon className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground mb-2">{value.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{value.description}</p>
            </motion.div>
          ))}
        </div>

        {/* Scalability & Expertise */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          <div className="p-8 lg:p-10 rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Target className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Scalability & Expertise</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              Our offerings in niche areas but not limited to advanced surveillance, intricate home automation, sophisticated motorized systems, unique custom PC builds, professional studio setups, cinematic home theatres, and premium solar projects.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              We also occasionally engage in works related to interior design/decor and construction/civil, adapting to the diversified needs of our clientele.
            </p>
          </div>

          <div className="p-8 lg:p-10 rounded-2xl border border-border bg-card">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <h3 className="font-display text-xl font-bold text-foreground">Nationwide Reach</h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              While maintaining a lean core team of experts, we ensure nationwide service capability and flexible scaling through our robust network of <span className="text-accent font-semibold">450+ trusted freelance and outsourced retained specialists</span>.
            </p>
            <div className="flex items-center gap-6 pt-4 border-t border-border">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-accent">450+</p>
                <p className="text-xs text-muted-foreground mt-1">Specialists</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-accent">Pan-India</p>
                <p className="text-xs text-muted-foreground mt-1">Service Coverage</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-accent">12</p>
                <p className="text-xs text-muted-foreground mt-1">Verticals</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
