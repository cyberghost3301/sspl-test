/**
 * src/components/hero/HeroBackground.tsx
 *
 * Ambient background layer for the hero section.
 * Three layers:
 *   1. CSS dot grid (radial-gradient repeat)
 *   2. Primary teal bloom — top-left, most visible
 *   3. Secondary teal bloom — bottom-right, faint depth
 *
 * All layers are pointer-events:none and aria-hidden.
 * Uses CSS animations only — no JS, zero runtime cost.
 */

import { m as motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Layer 1 — dot grid */}
      <motion.div
        variants={fadeIn}
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,201,190,0.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />

      {/* Layer 2 — primary teal bloom (top-left quadrant) */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-15%',
          left: '-10%',
          width: '65%',
          height: '75%',
          background:
            'radial-gradient(ellipse at 38% 42%, rgba(0,201,190,0.07) 0%, transparent 62%)',
        }}
      />

      {/* Layer 3 — secondary bloom (bottom-right, depth layer) */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-20%',
          right: '-8%',
          width: '55%',
          height: '65%',
          background:
            'radial-gradient(ellipse at 68% 65%, rgba(0,201,190,0.035) 0%, transparent 60%)',
        }}
      />

      {/* Layer 4 — subtle vignette (pulls focus to center) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(7,9,14,0.6) 100%)',
        }}
      />
    </div>
  );
}
