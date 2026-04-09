/**
 * src/lib/tokens.ts
 *
 * Spirecrest design token system — Obsidian + Cold Teal palette.
 * Single source of truth for all brand values used in JS/TS contexts
 * (Framer Motion style props, canvas, inline style overrides).
 *
 * CSS custom properties version lives in src/index.css.
 * Tailwind extension lives in tailwind.config.ts.
 */

export const tokens = {
  color: {
    // Surface layers (deepest → elevated)
    surface0:  '#07090E', // root background
    surface1:  '#0D1117', // primary surfaces
    surface2:  '#131920', // elevated cards
    surface3:  '#1C2530', // hover states, active borders

    // Brand accent
    accentPrimary:  '#00C9BE',
    accentGlow:     'rgba(0, 201, 190, 0.18)',
    accentGlowFaint: 'rgba(0, 201, 190, 0.06)',
    accentWarm:     '#E8C87A', // gold — premium moments only, use sparingly

    // WhatsApp brand (never substitute)
    whatsapp: '#25D366',

    // Typography
    textHigh: '#F0F4FF',  // primary — almost-white with cool bias
    textMid:  '#8B98AA',  // secondary copy
    textLow:  '#4A5568',  // muted labels, placeholders

    // Structural
    borderSubtle: '#1E2D3D',
    borderAccent: 'rgba(0, 201, 190, 0.28)',
  },

  font: {
    display: "'Syne', sans-serif",
    body:    "'Geist', system-ui, sans-serif",
    mono:    "'JetBrains Mono', 'Courier New', monospace",
  },

  // Framer Motion transition presets
  ease: {
    // Snappy entry with spring-feel overshoot
    enter:  { type: 'spring', stiffness: 380, damping: 32 },
    // Smooth exit
    exit:   { duration: 0.22, ease: [0.4, 0, 1, 0.6] },
    // Slow cinematic (headline)
    hero:   { duration: 0.85, ease: [0.16, 1, 0.3, 1] },
    // Standard UI interaction
    ui:     { duration: 0.2, ease: [0.2, 0, 0, 1] },
  },
} as const;

export type Tokens = typeof tokens;
