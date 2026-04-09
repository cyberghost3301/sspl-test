import { m as motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { staggerContainerSlow, slideInRight } from '@/lib/animations';
import { tokens } from '@/lib/tokens';

interface ServiceCard {
  index: string;
  label: string;
  name: string;
  outcome: string;
  route: string;
  featured?: boolean;
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
    route: '/services/software',
  },
];

const OVERFLOW_COUNT = 7;

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

      <motion.div variants={slideInRight}>
        <Link
          to="/services/consulting"
          className="group flex items-center justify-between px-4 py-3 rounded-lg border border-dashed transition-all duration-200 hover:border-[rgba(0,201,190,0.28)] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00C9BE]"
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

function ServiceCardItem({ service }: { service: ServiceCard }) {
  return (
    <motion.div variants={slideInRight}>
      <Link
        to={service.route}
        className="group block px-4 py-3.5 rounded-lg border transition-all duration-[250ms] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00C9BE]"
        style={{
          background: tokens.color.surface1,
          borderColor: tokens.color.borderSubtle,
          borderLeft: service.featured
            ? `2px solid ${tokens.color.accentPrimary}`
            : `1px solid ${tokens.color.borderSubtle}`,
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0, 201, 190, 0.32)';
          (e.currentTarget as HTMLElement).style.background = tokens.color.surface2;
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.borderColor = tokens.color.borderSubtle;
          (e.currentTarget as HTMLElement).style.background = tokens.color.surface1;
        }}
      >
        <div
          className="text-[10px] tracking-[0.14em] uppercase mb-1.5"
          style={{ color: tokens.color.textLow, fontFamily: tokens.font.mono }}
        >
          {service.index} · {service.label}
        </div>
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
        <div className="text-xs leading-relaxed flex items-center justify-between" style={{ color: tokens.color.textMid }}>
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
