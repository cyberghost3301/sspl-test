import React from 'react';

const problems = [
  {
    title: 'Fragmented Infrastructure',
    description: 'Disconnected tools quietly bleeding operational speed.',
    aosAttr: { 'data-aos': 'fade-up' },
  },
  {
    title: 'Manual Bottlenecks',
    description: 'Human-dependent workflows capping your ability to scale.',
    aosAttr: { 'data-aos': 'fade-up', 'data-aos-delay': '150' },
  },
  {
    title: 'Blind Operations',
    description: 'Zero real-time visibility into system health or performance drops.',
    aosAttr: { 'data-aos': 'fade-up', 'data-aos-delay': '300' },
  },
];

const SystemDiagnosticScan: React.FC = () => {
  return (
    <section className="relative w-full py-32 overflow-hidden">
      <div className="section-container">
        <p className="text-sm font-bold tracking-widest text-white/90 uppercase text-center mb-16">
          SYSTEM DIAGNOSTIC: THE COST OF SILENT FAILURES
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {problems.map((problem) => (
            <div
              key={problem.title}
              className="rounded-xl border border-white/[0.04] bg-white/[0.02] backdrop-blur-md p-6 sm:p-8 relative"
              {...problem.aosAttr}
            >
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse absolute top-6 right-6" />

              <h3 className="text-white font-semibold text-lg mb-3 leading-snug">
                {problem.title}
              </h3>
              <p className="!text-gray-300 !opacity-100 text-sm leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemDiagnosticScan;
