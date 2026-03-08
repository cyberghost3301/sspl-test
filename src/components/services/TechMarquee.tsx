interface TechMarqueeProps {
  label: string;
  items: string[];
}

export default function TechMarquee({ label, items }: TechMarqueeProps) {
  // 4x duplication for seamless infinite loop
  const allItems = [...items, ...items, ...items, ...items];

  return (
    <section className="py-16 bg-secondary/50 border-y border-border overflow-hidden">
      <div className="section-container mb-8">
        <p className="text-xs font-display uppercase tracking-widest text-muted-foreground text-center">
          {label}
        </p>
      </div>
      <div className="relative">
        <div className="marquee-track">
          {allItems.map((item, i) => (
            <div
              key={i}
              className="flex-shrink-0 mx-3 px-5 py-2.5 rounded-full border border-border bg-card text-sm font-display font-medium text-foreground whitespace-nowrap hover:border-accent/30 transition-colors cursor-default"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
