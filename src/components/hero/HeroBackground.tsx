import { m as motion } from 'framer-motion';
import { fadeIn } from '@/lib/animations';

export function HeroBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        variants={fadeIn}
        className="absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(0,201,190,0.18) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
          maskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-15%', left: '-10%', width: '65%', height: '75%',
          background: 'radial-gradient(ellipse at 38% 42%, rgba(0,201,190,0.07) 0%, transparent 62%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-20%', right: '-8%', width: '55%', height: '65%',
          background: 'radial-gradient(ellipse at 68% 65%, rgba(0,201,190,0.035) 0%, transparent 60%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 90% 90% at 50% 50%, transparent 40%, rgba(7,9,14,0.6) 100%)',
        }}
      />
    </div>
  );
}
