/**
 * SETUP REFERENCE — READ BEFORE INTEGRATING
 * ==========================================
 *
 * Two things need updating in your existing files.
 * This file documents exactly what to add where.
 * Do NOT copy this file into the repo — apply the changes manually.
 */


// ============================================================
// 1. tailwind.config.ts — ADD to theme.extend
// ============================================================

/*
  fontFamily: {
    display: ['Syne', 'sans-serif'],
    body:    ['Geist', 'system-ui', 'sans-serif'],
    mono:    ['JetBrains Mono', 'Courier New', 'monospace'],
  },
*/

// Full diff for tailwind.config.ts:
// Find your `extend: {}` block and add fontFamily inside it.
// Example:
//
//   extend: {
//     fontFamily: {
//       display: ['Syne', 'sans-serif'],
//       body:    ['Geist', 'system-ui', 'sans-serif'],
//       mono:    ['JetBrains Mono', 'Courier New', 'monospace'],
//     },
//     // ... rest of your existing extend
//   }
//
// After adding, you can use:
//   font-display  → Syne
//   font-body     → Geist
//   font-mono     → JetBrains Mono


// ============================================================
// 2. src/index.css — ADD at the top (before any Tailwind directives)
// ============================================================

/*
:root {
  --surface-0:          #07090E;
  --surface-1:          #0D1117;
  --surface-2:          #131920;
  --surface-3:          #1C2530;
  --accent-primary:     #00C9BE;
  --accent-glow:        rgba(0, 201, 190, 0.18);
  --accent-glow-faint:  rgba(0, 201, 190, 0.06);
  --accent-warm:        #E8C87A;
  --text-high:          #F0F4FF;
  --text-mid:           #8B98AA;
  --text-low:           #4A5568;
  --border-subtle:      #1E2D3D;
  --border-accent:      rgba(0, 201, 190, 0.28);
}

html, body, #root {
  background-color: var(--surface-0);
  color: var(--text-high);
}
*/


// ============================================================
// 3. Package installs — run in project root
// ============================================================

/*
  # Lenis smooth scroll (4KB, no deps)
  npm install @studio-freight/lenis

  # Fonts via fontsource (optional — already loaded via Google Fonts in index.html)
  # Only add these if you want self-hosted fonts for offline/performance:
  npm install @fontsource/syne @fontsource/geist @fontsource/jetbrains-mono
*/


// ============================================================
// 4. src/main.tsx — ADD LazyMotion provider (if not already present)
// ============================================================

/*
  import { LazyMotion, domAnimation } from 'framer-motion';

  // Wrap your app:
  <LazyMotion features={domAnimation} strict>
    <App />
  </LazyMotion>

  This enables the `m` alias (already used in existing HeroSection)
  and tree-shakes unused Framer Motion features (~30KB savings).
*/


// ============================================================
// 5. Lenis setup — src/main.tsx or src/App.tsx
// ============================================================

/*
  import Lenis from '@studio-freight/lenis';
  import { useEffect } from 'react';

  function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
    useEffect(() => {
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      function raf(time: number) {
        lenis.raf(time);
        requestAnimationFrame(raf);
      }

      const rafId = requestAnimationFrame(raf);
      return () => cancelAnimationFrame(rafId);
    }, []);

    return <>{children}</>;
  }

  // Then wrap your Router:
  <SmoothScrollProvider>
    <RouterProvider ... />
  </SmoothScrollProvider>
*/
