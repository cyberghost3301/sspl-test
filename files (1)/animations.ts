/**
 * src/lib/animations.ts
 *
 * Spirecrest animation system — centralized Framer Motion variants.
 *
 * RULES:
 * - No inline variant objects in JSX. Import from here.
 * - All durations in seconds. All distances in pixels.
 * - Every variant set respects prefers-reduced-motion via the
 *   useReducedMotion hook at the consumer level (see HeroSection.tsx).
 *
 * Variant naming convention:
 *   fadeUp       → opacity + Y translate (most common)
 *   blurReveal   → opacity + blur (headline text)
 *   scaleIn      → opacity + scale
 *   container    → stagger wrapper (no visual change itself)
 */

import type { Variants } from 'framer-motion';

// ---------------------------------------------------------------------------
// CONTAINERS (orchestrators — apply to wrapper elements)
// ---------------------------------------------------------------------------

/** Staggers children with 0.08s between each */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
};

/** Staggers children with 0.12s between each (slower, for card groups) */
export const staggerContainerSlow: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0,
    },
  },
};

// ---------------------------------------------------------------------------
// ELEMENTS
// ---------------------------------------------------------------------------

/** Standard fade + slide up — body copy, chips, stat rows */
export const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 22,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.2, 0, 0, 1],
    },
  },
};

/** Cinematic blur-then-sharp reveal — hero headline lines */
export const blurReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 32,
    filter: 'blur(8px)',
  },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.85,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Scale + fade — buttons, badges */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.94,
  },
  show: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.2, 0, 0, 1],
    },
  },
};

/** Slide in from right — service cards panel */
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 28,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

/** Fade only — subtle ambient elements */
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

// ---------------------------------------------------------------------------
// REDUCED MOTION FALLBACK
// Helper to flatten variants to instant show when prefers-reduced-motion
// ---------------------------------------------------------------------------

/**
 * Returns show state from any variant set, flattening all transitions to
 * duration: 0. Use this to replace variant objects when useReducedMotion() = true.
 *
 * Usage:
 *   const prefersReduced = useReducedMotion();
 *   const headline = prefersReduced ? reducedVariant(blurReveal) : blurReveal;
 */
export function reducedVariant(variants: Variants): Variants {
  return {
    hidden: variants.hidden,
    show: {
      ...(variants.show as object),
      transition: { duration: 0 },
    },
  };
}

// ---------------------------------------------------------------------------
// KEYFRAME ANIMATIONS (for motion.animate / keyframes API)
// ---------------------------------------------------------------------------

/** Call button glow pulse — loops infinitely */
export const callPulseKeyframes = {
  boxShadow: [
    '0 0 0px rgba(0, 201, 190, 0)',
    '0 0 22px rgba(0, 201, 190, 0.55)',
    '0 0 0px rgba(0, 201, 190, 0)',
  ],
};

export const callPulseTransition = {
  repeat: Infinity,
  duration: 2.8,
  ease: 'easeInOut' as const,
  delay: 2.2,
};

/** Live indicator dot pulse */
export const liveDotKeyframes = {
  opacity: [0.3, 1, 0.3],
};

export const liveDotTransition = {
  repeat: Infinity,
  duration: 1.8,
  ease: 'easeInOut' as const,
};

/** Scroll indicator nub bounce */
export const scrollNubKeyframes = {
  y: [0, 7, 0],
};

export const scrollNubTransition = {
  repeat: Infinity,
  duration: 2.0,
  ease: 'easeInOut' as const,
};
