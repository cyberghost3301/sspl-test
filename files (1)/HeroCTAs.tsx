/**
 * src/components/hero/HeroCTAs.tsx
 *
 * Hero conversion buttons.
 *
 * Call Now    — solid teal fill, phone icon, glow pulse loop (starts at 2.2s)
 * WhatsApp Us — ghost outline teal, WhatsApp SVG icon, opens pre-filled chat
 *
 * Both buttons wrap in MagneticButton for cursor attraction.
 * Pulse loop is suppressed when prefers-reduced-motion is true.
 */

import { m as motion, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { MagneticButton } from './MagneticButton';
import { callPulseKeyframes, callPulseTransition, scaleIn } from '@/lib/animations';
import { tokens } from '@/lib/tokens';

// Pre-filled WhatsApp message (URI encoded)
const WA_NUMBER = '919250974145';
const WA_MESSAGE = encodeURIComponent(
  "Hi Spirecrest, I'd like to explore what you can build for us."
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;
const CALL_URL = 'tel:+919250974145';

// WhatsApp SVG — official brand icon, hardcoded #25D366 per brand spec
function WhatsAppIcon({ size = 16 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={tokens.color.whatsapp}
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function HeroCTAs() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      variants={scaleIn}
      className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
    >
      {/* --- Call Now --- */}
      <MagneticButton strength={0.25} radius={72}>
        <motion.a
          href={CALL_URL}
          animate={prefersReduced ? {} : callPulseKeyframes}
          transition={prefersReduced ? {} : callPulseTransition}
          aria-label="Call Spirecrest Solutions"
          className="
            group inline-flex items-center justify-center gap-2.5
            px-7 py-3.5
            rounded-lg
            font-display font-bold text-sm tracking-wide
            transition-transform duration-200
            hover:scale-[1.025] active:scale-[0.98]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            focus-visible:ring-[#00C9BE] focus-visible:ring-offset-[#07090E]
            select-none
          "
          style={{
            background: tokens.color.accentPrimary,
            color: tokens.color.surface0,
            fontFamily: tokens.font.display,
          }}
        >
          <Phone
            size={15}
            strokeWidth={2.5}
            className="transition-transform duration-300 group-hover:rotate-12"
            aria-hidden="true"
          />
          Call Now
        </motion.a>
      </MagneticButton>

      {/* --- WhatsApp Us --- */}
      <MagneticButton strength={0.22} radius={72}>
        <a
          href={WA_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with Spirecrest on WhatsApp"
          className="
            group inline-flex items-center justify-center gap-2.5
            px-7 py-3.5
            rounded-lg
            font-display font-bold text-sm tracking-wide
            border
            transition-all duration-200
            hover:bg-[rgba(0,201,190,0.07)] active:scale-[0.98]
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            focus-visible:ring-[#00C9BE] focus-visible:ring-offset-[#07090E]
            select-none
          "
          style={{
            color: tokens.color.accentPrimary,
            borderColor: tokens.color.borderAccent,
            fontFamily: tokens.font.display,
          }}
        >
          <span className="transition-transform duration-300 group-hover:scale-110">
            <WhatsAppIcon size={15} />
          </span>
          WhatsApp Us
        </a>
      </MagneticButton>
    </motion.div>
  );
}
