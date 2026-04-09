/**
 * src/components/hero/HeroServiceCards.tsx
 *
 * Right-panel service cards — anchor services (top 3) + overflow indicator.
 *
 * Design intent:
 *   - Shows Spirecrest's three highest-credibility verticals immediately
 *   - Each card is clickable, routing to the service's dedicated page
 *   - Cards stagger in with 150ms between each
 *   - Hover state: border brightens to teal, background lifts subtly
 *   - The active/featured card (SOC) has a teal left-border accent
 *   - Overflow row opens the full services page
 *
 * Route assumptions:
 *   /services/cybersecurity  — Managed SOC
 *   /services/networking     — Network Infrastructure
 *   /services/cloud          — Cloud Infrastructure
 *   /services                — All services (overflow link)
 *
 * Update ANCHOR_SERVICES routes if your router uses different slugs.
 */

import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { staggerContainerSlow, slideInRight } from '@/lib/animations';
import { tokens } from '@/lib/tokens';

interface ServiceCard {
  index: string;        // "01" etc.
  label: string;        // "Anchor Service"
  name: string;         // display name
  outcome: string;      // one-line outcome statement
  route: string;        // react-router path
  featured?: boolean;   // shows teal left-border accent
}

const ANCHOR_SERVICES: ServiceCard[] = [
  {
    index: '01',
    label: 'Anchor Service',
    name: 'Managed SOC',
    outcome: '24/7 threat detection & response',
    route: '/services/cybersecurity',
    featured: true,
  },
  {
    index: '02',
    label: 'Anchor Service',
    name: 'Network Infrastructure',
    outcome: 'Enterprise-grade architecture, end-to-end',
    route: '/services/networking',
  },
  {
    index: '03',
    label: 'Anchor Service',
    name: 'Cloud Infrastructure',
    outcome: 'Scalable deployment across any stack',
    route: '/services/cloud',
  },
];

const OVERFLOW_COUNT = 7; // remaining verticals beyond the 3 anchors

export function HeroServiceCards() {
  return (
    <motion.div
      variants={staggerContainerSlow}
      initial="hidden"
      animate="show"
      className="flex flex-col gap-2.5"
      aria-label="Core services preview"
    >
      {ANCHOR_SERVICES.map((svc) => (
        <ServiceCardItem key={svc.route} service={svc} />
      ))}

      {/* Overflow indicator */}
      <motion.div variants={slideInRight}>
        <Link
          to="/services"
          className="
            group flex items-center justify-between
            px-4 py-3
            rounded-lg border border-dashed
            transition-all duration-200
            hover:border-[rgba(0,201,190,0.28)]
            focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00C9BE]
          "
          style={{ borderColor: tokens.color.borderSubtle }}
          aria-label={`View all ${OVERFLOW_COUNT + ANCHOR_SERVICES.length} services`}
        >
          <span
            className="text-xs tracking-widest uppercase transition-colors duration-200 group-hover:text-[#8B98AA]"
            style={{ color: tokens.color.textLow, fontFamily: tokens.font.mono }}
          >
            +{OVERFLOW_COUNT} more verticals
          </span>
          <ArrowRight
            size={13}
            className="transition-all duration-200 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5"
            style={{ color: tokens.color.accentPrimary }}
            aria-hidden="true"
          />
        </Link>
      </motion.div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Individual card — extracted for readability
// ---------------------------------------------------------------------------

function ServiceCardItem({ service }: { service: ServiceCard }) {
  return (
    <motion.div variants={slideInRight}>
      <Link
        to={service.route}
        className="
          group block
          px-4 py-3.5
          rounded-lg
          border
          transition-all duration-[250ms]
          focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00C9BE]
        "
        style={{
          background: tokens.color.surface1,
          borderColor: service.featured
            ? tokens.color.borderSubtle
            : tokens.color.borderSubtle,
          // Featured card gets a teal left-border accent
          borderLeft: service.featured
            ? `2px solid ${tokens.color.accentPrimary}`
            : `1px solid ${tokens.color.borderSubtle}`,
        }}
        // Hover handled via Tailwind (dynamic CSS classes for bg/border changes)
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            'rgba(0, 201, 190, 0.32)';
          (e.currentTarget as HTMLElement).style.background = tokens.color.surface2;
          if (!service.featured) {
            (e.currentTarget as HTMLElement).style.borderLeftColor =
              'rgba(0, 201, 190, 0.32)';
          }
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor =
            tokens.color.borderSubtle;
          (e.currentTarget as HTMLElement).style.background = tokens.color.surface1;
          if (!service.featured) {
            (e.currentTarget as HTMLElement).style.borderLeftColor =
              tokens.color.borderSubtle;
          }
        }}
      >
        {/* Index label */}
        <div
          className="text-[10px] tracking-[0.14em] uppercase mb-1.5"
          style={{ color: tokens.color.textLow, fontFamily: tokens.font.mono }}
        >
          {service.index} · {service.label}
        </div>

        {/* Service name */}
        <div
          className="text-sm font-bold mb-1 transition-colors duration-200 group-hover:text-[#F0F4FF]"
          style={{
            color: tokens.color.textHigh,
            fontFamily: tokens.font.display,
            letterSpacing: '-0.01em',
          }}
        >
          {service.name}
        </div>

        {/* Outcome statement */}
        <div
          className="text-xs leading-relaxed flex items-center justify-between"
          style={{ color: tokens.color.textMid }}
        >
          <span>{service.outcome}</span>
          <ArrowRight
            size={12}
            className="flex-shrink-0 ml-2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0.5"
            style={{ color: tokens.color.accentPrimary }}
            aria-hidden="true"
          />
        </div>
      </Link>
    </motion.div>
  );
}
