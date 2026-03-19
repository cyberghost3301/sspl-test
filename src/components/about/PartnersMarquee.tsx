import { m as motion, useInView } from "framer-motion";
import { useRef } from "react";

const partnersRow1 = [
  { name: "Hikvision", slug: "hikvision", url: "https://upload.wikimedia.org/wikipedia/commons/1/13/Hikvision_logo.svg" },
  { name: "Dahua", slug: "dahua", url: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Dahua_Technology_logo.svg" },
  { name: "CP Plus", slug: "cpplus", url: "https://www.cpplusworld.com/assets/images/logo.png" },
  { name: "Bosch", slug: "bosch" },
  { name: "Panasonic", slug: "panasonic" },
  { name: "Honeywell", slug: "honeywell" },
  { name: "Axis", slug: "axiscommunications" },
  { name: "Pelco", slug: "pelco", url: "https://upload.wikimedia.org/wikipedia/commons/d/de/Pelco_logo.svg" },
  { name: "Vivotek", slug: "vivotek" },
  { name: "Hanwha", slug: "hanwha" },
  { name: "Uniview", slug: "uniview" },
  { name: "Milwaukee", slug: "milwaukeetool" },
  { name: "Makita", slug: "makita" },
  { name: "DeWalt", slug: "dewalt" },
  { name: "Intel", slug: "intel" },
  { name: "AMD", slug: "amd" },
  { name: "NVIDIA", slug: "nvidia" },
];

const partnersRow2 = [
  { name: "Ubiquiti", slug: "ubiquiti" },
  { name: "Aruba", slug: "arubanetworks" },
  { name: "Cisco", slug: "cisco" },
  { name: "Juniper", slug: "junipernetworks" },
  { name: "Fortinet", slug: "fortinet" },
  { name: "Palo Alto", slug: "paloaltonetworks" },
  { name: "Sophos", slug: "sophos" },
  { name: "Lenovo", slug: "lenovo" },
  { name: "IBM", slug: "ibm" },
  { name: "Dell", slug: "dell" },
  { name: "HPE", slug: "hewlettpackardenterprise" },
  { name: "Supermicro", slug: "supermicro" },
  { name: "TP-Link", slug: "tplink" },
  { name: "D-Link", slug: "dlink" },
  { name: "Netgear", slug: "netgear" },
  { name: "MikroTik", slug: "mikrotik" },
  { name: "Zyxel", slug: "zyxel" },
];

export default function PartnersMarquee() {
  const scrollRef = useRef(null);
  const inView = useInView(scrollRef, { once: true, margin: "-100px" });

  const renderRow = (partners: any[], direction: "left" | "right", speed: number) => {
    // Quadruple the array to ensure the screen is always filled
    const duplicatedLogos = [...partners, ...partners, ...partners, ...partners];

    return (
      <div className="flex w-full overflow-hidden relative py-4">
        <motion.div
          animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
          transition={{ repeat: Infinity, ease: "linear", duration: speed }}
          className="flex whitespace-nowrap items-center w-max gap-12 md:gap-24 px-6 md:px-12"
        >
          {duplicatedLogos.map((partner, idx) => (
            <div
              key={`${partner.slug}-${idx}`}
              className="flex-shrink-0 flex items-center gap-3 px-6 py-4 rounded-xl border border-border bg-card hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300 group"
            >
              <img
                src={partner.url || `https://cdn.simpleicons.org/${partner.slug}/f8f9fa`}
                alt={partner.name}
                className="w-7 h-7 object-contain opacity-70 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110"
                loading="lazy"
                onError={(e) => {
                  // Fallback for missing brand icons
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(partner.name)}&background=020617&color=ffffff&bold=true`;
                }}
              />
              <span className="text-sm font-display font-medium text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap">
                {partner.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    );
  };

  return (
    <section className="pb-24 pt-12 bg-background relative overflow-hidden" ref={scrollRef}>
      <div className="section-container mb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-mono text-xs tracking-[0.3em] text-accent uppercase mb-4">Hardware Ecosystem</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold text-foreground">
            Our Enterprise <span className="text-gradient">Hardware Partners</span>
          </h2>
          <p className="mt-6 text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            We collaborate with global OEM leaders to deploy high-resilience infrastructure, from AI-powered surveillance grids to robust core networking.
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col gap-6 md:gap-8 relative z-10">
        {/* Fading Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {renderRow(partnersRow1, "left", 50)}
        {renderRow(partnersRow2, "right", 60)}
      </div>

      {/* Background Decorative Element */}
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
    </section>
  );
}
