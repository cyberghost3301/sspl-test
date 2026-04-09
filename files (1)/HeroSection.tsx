/**
 * src/components/HeroSection.tsx
 *
 * Spirecrest Hero — production-ready, full replacement.
 *
 * Layout: Two-column grid (60/40 split on lg+, stacked on mobile)
 *   Left  — Chip, Headline, Body copy, CTAs, Stats row, Scroll indicator
 *   Right — Service cards panel (3 anchor + overflow)
 *
 * Animation sequence (cumulative delays from page load):
 *   T+0ms    Background grid + blooms (instant)
 *   T+100ms  Chip label
 *   T+280ms  Headline line 1 (blurReveal)
 *   T+430ms  Headline line 2
 *   T+580ms  Headline line 3 (teal)
 *   T+680ms  Body copy
 *   T+780ms  CTAs
 *   T+880ms  Stats row
 *   T+1050ms Service cards (stagger 150ms)
 *   T+1250ms Scroll indicator
 *   T+2200ms Call button glow pulse (loops)
 *
 * Motion:
 *   - All variants imported from @/lib/animations (never inline)
 *   - useReducedMotion() flattens transitions for accessibility
 *   - LazyMotion provider expected at App level (m alias in use)
 *
 * Dependencies (already in package.json):
 *   framer-motion, react-router-dom, lucide-react
 *
 * Fonts loaded via index.html:
 *   Syne (700, 800), Geist (400, 500), JetBrains Mono (400, 500)
 */

import { m as motion, useReducedMotion } from 'framer-motion';
import { tokens } from '@/lib/tokens';
import {
  staggerContainer,
  fadeUp,
  blurReveal,
  fadeIn,
  reducedVariant,
  scrollNubKeyframes,
  scrollNubTransition,
  liveDotKeyframes,
  liveDotTransition,
} from '@/lib/animations';

import { HeroBackground } from '@/components/hero/HeroBackground';
import { HeroCTAs } from '@/components/hero/HeroCTAs';
import { HeroServiceCards } from '@/components/hero/HeroServiceCards';

// ---------------------------------------------------------------------------
// Stat data — update as Spirecrest grows. Keep honest (no vanity numbers).
// ---------------------------------------------------------------------------
const STATS = [
  { value: '10', label: 'Service\nVerticals' },
  { value: '●', label: 'Live\nSOC', isLive: true },
  { value: 'LKO', label: 'Headquarters' },
] as const;

// ---------------------------------------------------------------------------
// Headline lines — each animates independently with stagger
// ---------------------------------------------------------------------------
const HEADLINE_LINES = [
  { text: 'Infrastructure', teal: false },
  { text: 'That Outlives', teal: false },
  { text: 'Your Strategy.', teal: true },
] as const;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export default function HeroSection() {
  const prefersReduced = useReducedMotion();

  // Collapse all animations to instant if user prefers reduced motion
  const chipVariant     = prefersReduced ? reducedVariant(fadeUp)      : fadeUp;
  const headlineVariant = prefersReduced ? reducedVariant(blurReveal)  : blurReveal;
  const bodyVariant     = prefersReduced ? reducedVariant(fadeUp)      : fadeUp;
  const statsVariant    = prefersReduced ? reducedVariant(fadeIn)      : fadeIn;

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: tokens.color.surface0 }}
      aria-label="Spirecrest — Hero"
    >
      {/* Ambient background — absolute, below all content */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="show"
        className="absolute inset-0"
      >
        <HeroBackground />
      </motion.div>

      {/* ------------------------------------------------------------------ */}
      {/* Main content grid                                                   */}
      {/* ------------------------------------------------------------------ */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-14 py-28 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-12 lg:gap-16 items-center">

            {/* ============================================================ */}
            {/* LEFT — Headline, CTAs, Stats                                  */}
            {/* ============================================================ */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="flex flex-col items-start"
            >
              {/* -- Chip label -- */}
              <motion.div
                variants={chipVariant}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 mb-7"
              >
                <div
                  className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border"
                  style={{ borderColor: tokens.color.borderAccent }}
                >
                  {/* Live dot */}
                  <motion.div
                    animate={prefersReduced ? {} : liveDotKeyframes}
                    transition={prefersReduced ? {} : liveDotTransition}
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: tokens.color.accentPrimary }}
                    aria-hidden="true"
                  />
                  <span
                    className="text-[10px] font-bold tracking-[0.14em] uppercase"
                    style={{
                      color: tokens.color.accentPrimary,
                      fontFamily: tokens.font.mono,
                    }}
                  >
                    Ground Zero · Est. 2024 · Lucknow
                  </span>
                </div>
              </motion.div>

              {/* -- Headline -- */}
              <h1
                className="mb-5"
                style={{
                  fontFamily: tokens.font.display,
                  fontWeight: 800,
                  fontSize: 'clamp(42px, 6vw, 72px)',
                  lineHeight: 1.0,
                  letterSpacing: '-0.025em',
                }}
              >
                {HEADLINE_LINES.map((line, i) => (
                  <motion.span
                    key={line.text}
                    variants={headlineVariant}
                    transition={{ delay: 0.28 + i * 0.15 }}
                    className="block"
                    style={{
                      color: line.teal
                        ? tokens.color.accentPrimary
                        : tokens.color.textHigh,
                    }}
                  >
                    {line.text}
                  </motion.span>
                ))}
              </h1>

              {/* -- Body copy -- */}
              <motion.p
                variants={bodyVariant}
                transition={{ delay: 0.68 }}
                className="mb-8 max-w-md leading-relaxed"
                style={{
                  fontFamily: tokens.font.body,
                  fontSize: '15px',
                  color: tokens.color.textMid,
                  lineHeight: 1.72,
                }}
              >
                Enterprise IT, security and automation deployed across ten verticals.
                Built to last. Operated by partners who own the outcome.
              </motion.p>

              {/* -- CTAs -- */}
              <motion.div
                variants={bodyVariant}
                transition={{ delay: 0.78 }}
                className="mb-10"
              >
                <HeroCTAs />
              </motion.div>

              {/* -- Stats row -- */}
              <motion.div
                variants={statsVariant}
                transition={{ delay: 0.88 }}
                className="flex items-center gap-0"
                role="list"
                aria-label="Key metrics"
              >
                {STATS.map((stat, i) => (
                  <div
                    key={stat.label}
                    role="listitem"
                    className="flex items-center"
                  >
                    <div className="flex items-center gap-2.5 px-4 first:pl-0">
                      {/* Stat value */}
                      {stat.isLive ? (
                        <div className="flex items-center gap-1.5">
                          <motion.div
                            animate={prefersReduced ? {} : liveDotKeyframes}
                            transition={
                              prefersReduced
                                ? {}
                                : { ...liveDotTransition, delay: 0.4 }
                            }
                            className="w-1.5 h-1.5 rounded-full"
                            style={{ background: tokens.color.accentPrimary }}
                            aria-hidden="true"
                          />
                          <span
                            className="text-xs tracking-[0.1em] uppercase"
                            style={{
                              color: tokens.color.textLow,
                              fontFamily: tokens.font.mono,
                            }}
                          >
                            {stat.label.replace('\n', ' ')}
                          </span>
                        </div>
                      ) : (
                        <>
                          <span
                            className="font-bold leading-none"
                            style={{
                              fontFamily: tokens.font.display,
                              fontSize: '22px',
                              color: tokens.color.textHigh,
                            }}
                          >
                            {stat.value}
                          </span>
                          <span
                            className="text-[10px] tracking-[0.1em] uppercase leading-tight whitespace-pre-line"
                            style={{
                              color: tokens.color.textLow,
                              fontFamily: tokens.font.mono,
                            }}
                          >
                            {stat.label}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Divider — not after last item */}
                    {i < STATS.length - 1 && (
                      <div
                        className="h-7 w-px flex-shrink-0"
                        style={{ background: tokens.color.borderSubtle }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* ============================================================ */}
            {/* RIGHT — Service cards (hidden on mobile, shown lg+)           */}
            {/* ============================================================ */}
            <div className="hidden lg:block w-72 xl:w-80">
              <HeroServiceCards />
            </div>

          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Scroll indicator — bottom-left, disappears on scroll via CSS        */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        animate="show"
        transition={{ delay: 1.25, duration: 0.6 }}
        className="
          absolute bottom-8 left-6 sm:left-10 lg:left-14
          flex items-center gap-3
          z-10
        "
        aria-hidden="true"
      >
        {/* Mouse frame */}
        <div
          className="flex justify-center items-start pt-1.5 w-[18px] h-[28px] rounded-[9px] border"
          style={{ borderColor: tokens.color.borderAccent }}
        >
          <motion.div
            animate={prefersReduced ? {} : scrollNubKeyframes}
            transition={prefersReduced ? {} : scrollNubTransition}
            className="w-[3px] h-[7px] rounded-full"
            style={{ background: tokens.color.accentPrimary }}
          />
        </div>
        <span
          className="text-[9px] tracking-[0.16em] uppercase"
          style={{ color: tokens.color.textLow, fontFamily: tokens.font.mono }}
        >
          Scroll to Explore
        </span>
      </motion.div>

    </section>
  );
}
