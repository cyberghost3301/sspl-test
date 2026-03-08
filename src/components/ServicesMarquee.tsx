import { Zap, Network, Monitor, Sun, Headphones, Palette } from "lucide-react";

const secondaryServices = [
  { icon: Zap, label: "Smart Automation" },
  { icon: Network, label: "Networking & Cloud" },
  { icon: Monitor, label: "Computer Solutions" },
  { icon: Sun, label: "Solar Power Systems" },
  { icon: Headphones, label: "AV Studio" },
  { icon: Palette, label: "Interior Design" },
];

// Duplicate for seamless loop
// Duplicate enough for seamless infinite loop
const items = [...secondaryServices, ...secondaryServices, ...secondaryServices, ...secondaryServices];

export default function ServicesMarquee() {
  return (
    <section className="py-16 bg-background border-y border-border overflow-hidden">
      <div className="section-container mb-8">
        <p className="text-xs font-display uppercase tracking-widest text-muted-foreground text-center">
          AND MANY MORE VERTICALS
        </p>
      </div>
      <div className="relative">
        <div className="marquee-track">
          {items.map((s, i) => (
            <div
              key={i}
              className="flex-shrink-0 flex items-center gap-3 mx-6 px-6 py-3 rounded-full border border-border bg-card hover:border-accent/30 transition-colors cursor-default"
            >
              <s.icon className="w-4 h-4 text-accent" />
              <span className="text-sm font-display font-medium text-foreground whitespace-nowrap">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
