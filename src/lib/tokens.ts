/**
 * src/lib/tokens.ts
 *
 * Spirecrest design token system — Obsidian + Cold Teal palette.
 */

export const tokens = {
  color: {
    surface0:  '#07090E',
    surface1:  '#0D1117',
    surface2:  '#131920',
    surface3:  '#1C2530',

    accentPrimary:  '#00C9BE',
    accentGlow:     'rgba(0, 201, 190, 0.18)',
    accentGlowFaint: 'rgba(0, 201, 190, 0.06)',
    accentWarm:     '#E8C87A',

    whatsapp: '#25D366',

    textHigh: '#F0F4FF',
    textMid:  '#8B98AA',
    textLow:  '#4A5568',

    borderSubtle: '#1E2D3D',
    borderAccent: 'rgba(0, 201, 190, 0.28)',
  },

  font: {
    display: "'Syne', sans-serif",
    body:    "'Geist', system-ui, sans-serif",
    mono:    "'JetBrains Mono', 'Courier New', monospace",
  },

  ease: {
    enter:  { type: 'spring' as const, stiffness: 380, damping: 32 },
    exit:   { duration: 0.22, ease: [0.4, 0, 1, 0.6] as [number, number, number, number] },
    hero:   { duration: 0.85, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    ui:     { duration: 0.2, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
  },
} as const;

export type Tokens = typeof tokens;
