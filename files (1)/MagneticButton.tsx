/**
 * src/components/hero/MagneticButton.tsx
 *
 * Magnetic cursor attraction effect.
 * The element gently pulls toward the cursor when the mouse enters its
 * bounding box (within RADIUS px of the center).
 *
 * Implementation:
 *   - Tracks mouse position relative to element center via onMouseMove
 *   - Applies framer-motion x/y spring to create physical pull feel
 *   - Resets smoothly on mouse leave via spring
 *   - Zero effect when prefers-reduced-motion is true
 *
 * Props:
 *   strength  — attraction multiplier (0–1). Default 0.28.
 *               Higher = more dramatic pull. Keep ≤ 0.35 for subtlety.
 *   radius    — pixel radius within which magnet activates. Default 80.
 */

import { useRef } from 'react';
import { m as motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  strength?: number;
  radius?: number;
  className?: string;
}

export function MagneticButton({
  children,
  strength = 0.28,
  radius = 80,
  className,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  // Spring physics: stiff enough to feel responsive, damped enough to feel premium
  const x = useSpring(rawX, { stiffness: 280, damping: 22, mass: 0.6 });
  const y = useSpring(rawY, { stiffness: 280, damping: 22, mass: 0.6 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distX = e.clientX - centerX;
    const distY = e.clientY - centerY;
    const dist = Math.sqrt(distX ** 2 + distY ** 2);

    if (dist < radius) {
      rawX.set(distX * strength);
      rawY.set(distY * strength);
    }
  }

  function handleMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
    >
      {children}
    </motion.div>
  );
}
