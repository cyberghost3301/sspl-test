import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const partners = [
  { name: "Google Cloud", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg" },
  { name: "Amazon Web Services", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
  { name: "Microsoft Azure", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/azure/azure-original.svg" },
  { name: "Hikvision", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Hikvision_logo.svg/512px-Hikvision_logo.svg.png" },
  { name: "Dahua", logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5f/Dahua_Technology_logo.svg/512px-Dahua_Technology_logo.svg.png" },
  { name: "DigitalOcean", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/digitalocean/digitalocean-original.svg" },
  { name: "Cloudflare", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/cloudflare.svg" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
  { name: "GitHub", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
  { name: "Figma", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  { name: "Vercel", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/vercel.svg" },
  { name: "Stripe", logo: "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/stripe.svg" },
];

const items = [...partners, ...partners, ...partners, ...partners];

export default function PartnersMarquee() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="py-20 bg-secondary/50 overflow-hidden" ref={ref}>
      <div className="section-container mb-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <p className="text-xs font-display uppercase tracking-widest text-accent mb-3">
            Technology Partners
          </p>
          <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground">
            Powered by Industry Leaders.
          </h2>
          <p className="mt-3 text-muted-foreground text-sm max-w-xl mx-auto">
            We leverage best-in-class platforms and maintain partnerships with leading technology providers to deliver enterprise-grade solutions.
          </p>
        </motion.div>
      </div>

      {/* Marquee Row 1 */}
      <div className="relative mb-4">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-secondary/50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary/50 to-transparent z-10" />
        <div className="marquee-track">
          {items.map((partner, i) => (
            <div
              key={`row1-${i}`}
              className="flex-shrink-0 flex items-center gap-3 mx-4 px-6 py-4 rounded-xl border border-border bg-card hover:border-accent/20 transition-all duration-300 group"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-7 h-7 object-contain opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                loading="lazy"
              />
              <span className="text-sm font-display font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Marquee Row 2 — reverse */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-secondary/50 to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-secondary/50 to-transparent z-10" />
        <div className="marquee-track" style={{ animationDirection: "reverse", animationDuration: "100s" }}>
          {[...items].reverse().map((partner, i) => (
            <div
              key={`row2-${i}`}
              className="flex-shrink-0 flex items-center gap-3 mx-4 px-6 py-4 rounded-xl border border-border bg-card hover:border-accent/20 transition-all duration-300 group"
            >
              <img
                src={partner.logo}
                alt={partner.name}
                className="w-7 h-7 object-contain opacity-60 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                loading="lazy"
              />
              <span className="text-sm font-display font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
