/**
 * src/lib/animations.ts
 *
 * Spirecrest animation system — centralized Framer Motion variants.
 */

import type { Variants } from 'framer-motion';

// CONTAINERS
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0,
    },
  },
};

export const staggerContainerSlow: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0,
    },
  },
};

// ELEMENTS
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  },
};

export const blurReveal: Variants = {
  hidden: { opacity: 0, y: 32, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.94 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  },
};

export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 28 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: 0.7, ease: 'easeOut' },
  },
};

// REDUCED MOTION FALLBACK
export function reducedVariant(variants: Variants): Variants {
  return {
    hidden: variants.hidden,
    show: {
      ...(variants.show as object),
      transition: { duration: 0 },
    },
  };
}

// KEYFRAME ANIMATIONS
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

export const liveDotKeyframes = {
  opacity: [0.3, 1, 0.3],
};

export const liveDotTransition = {
  repeat: Infinity,
  duration: 1.8,
  ease: 'easeInOut' as const,
};

export const scrollNubKeyframes = {
  y: [0, 7, 0],
};

export const scrollNubTransition = {
  repeat: Infinity,
  duration: 2.0,
  ease: 'easeInOut' as const,
};
