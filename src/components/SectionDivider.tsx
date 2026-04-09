import { m as motion } from "framer-motion";

export default function SectionDivider({ variant = 'neutral' }: { variant?: 'teal' | 'amber' | 'neutral' }) {
  const glowColor = variant === 'teal' ? 'var(--sc-teal-glow)' : variant === 'amber' ? 'var(--sc-amber-glow)' : 'transparent';
  const lineColor = variant === 'teal' ? 'var(--sc-teal)' : variant === 'amber' ? 'var(--sc-amber)' : 'transparent';

  return (
    <div className="relative h-32 w-full overflow-hidden pointer-events-none" data-aos="fade-in" data-aos-duration="800">
      {/* Radial Depth Glow */}
      <div 
        className="absolute inset-0 z-0" 
        style={{ background: `radial-gradient(ellipse 50% 100% at 50% 50%, ${glowColor}, transparent)` }} 
      />
      
      {/* Subtle SVG Wave */}
      <div className="absolute inset-0 z-10 flex items-center justify-center opacity-15">
        <svg viewBox="0 0 1440 100" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0,50 C320,100 420,0 720,50 C1020,100 1120,0 1440,50" fill="none" stroke={lineColor} strokeWidth="1" />
        </svg>
      </div>

      {/* Razor Edge Line */}
      {variant !== 'neutral' && (
        <div 
          className="absolute top-1/2 left-0 w-full h-[1px] -translate-y-1/2 z-20"
          style={{ background: `linear-gradient(90deg, transparent, ${lineColor} 30%, ${lineColor} 70%, transparent)` }}
        />
      )}
    </div>
  );
}
