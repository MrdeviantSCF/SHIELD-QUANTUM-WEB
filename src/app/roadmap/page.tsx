'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section, SectionHeader, GlassCard, Badge } from '@/components/ui';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };

const phases = [
  { phase: 1, title: 'Quantum Research Foundation', desc: 'Establishing research teams, theoretical foundations, and computational infrastructure.', status: 'COMPLETED' as const, milestones: ['Research team formation', 'Literature survey', 'Classical simulation capability'] },
  { phase: 2, title: 'Quantum Simulation', desc: 'Building classical simulation tools for quantum circuits and algorithms.', status: 'ACTIVE' as const, milestones: ['Quantum circuit simulator', 'Algorithm benchmarking', 'Educational platform'] },
  { phase: 3, title: 'Quantum Software', desc: 'Developing quantum programming tools, compilers, and optimization frameworks.', status: 'PLANNED' as const, milestones: ['Quantum SDK', 'Circuit optimization', 'Hybrid algorithm library'] },
  { phase: 4, title: 'Quantum Hardware Research', desc: 'Investigating qubit technologies, control systems, and readout methods.', status: 'PLANNED' as const, milestones: ['Qubit technology evaluation', 'Control electronics design', 'Readout system prototyping'] },
  { phase: 5, title: 'Cryogenic Infrastructure', desc: 'Building cryogenic facilities and developing ultra-low temperature engineering capabilities.', status: 'CONCEPTUAL' as const, milestones: ['Cryostat procurement', 'Lab construction', 'Temperature validation'] },
  { phase: 6, title: 'Prototype Quantum Systems', desc: 'Assembling and testing prototype quantum processing units.', status: 'CONCEPTUAL' as const, milestones: ['First qubit characterization', 'Multi-qubit gates', 'System integration'] },
  { phase: 7, title: 'Hybrid AI + Quantum Systems', desc: 'Integrating quantum processing with classical AI and HPC infrastructure.', status: 'CONCEPTUAL' as const, milestones: ['Hybrid workflows', 'Quantum-classical interface', 'Application benchmarks'] },
  { phase: 8, title: 'Advanced Quantum Machines', desc: 'Scaling toward fault-tolerant quantum computation with error correction.', status: 'CONCEPTUAL' as const, milestones: ['Error correction implementation', 'Logical qubit demonstration', 'Application-scale systems'] },
];

const statusConfig: Record<string, { color: string; badge: 'emerald' | 'cyan' | 'amber' | 'muted' }> = {
  COMPLETED: { color: 'border-quantum-emerald/30', badge: 'emerald' },
  ACTIVE: { color: 'border-photon-cyan/30', badge: 'cyan' },
  PLANNED: { color: 'border-energy-amber/30', badge: 'amber' },
  CONCEPTUAL: { color: 'border-white/[0.06]', badge: 'muted' },
};

export default function RoadmapPage() {
  return (
    <>
      <Section fullHeight className="pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="cyan" className="mb-6">Strategic Planning</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Technology{' '}
            <span className="bg-gradient-to-r from-photon-cyan to-quantum-violet bg-clip-text text-transparent">
              Roadmap
            </span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
            A multi-phase approach to quantum technology development.
            Each phase builds on the foundation of previous work.
          </p>
        </div>
      </Section>

      <div className="section-divider" />

      <Section>
        <div className="max-w-3xl mx-auto relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-quantum-emerald/30 via-photon-cyan/30 via-energy-amber/30 to-white/10" />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
          >
            {phases.map((phase) => {
              const config = statusConfig[phase.status];
              return (
                <motion.div key={phase.phase} variants={fadeIn} className="relative flex gap-6 pb-8 last:pb-0">
                  <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full border bg-deep-space flex items-center justify-center font-mono text-sm font-bold ${
                    phase.status === 'COMPLETED' ? 'border-quantum-emerald/40 text-quantum-emerald' :
                    phase.status === 'ACTIVE' ? 'border-photon-cyan/40 text-photon-cyan' :
                    phase.status === 'PLANNED' ? 'border-energy-amber/40 text-energy-amber' :
                    'border-white/10 text-text-muted'
                  }`}>
                    {phase.phase}
                  </div>
                  <div className="flex-1">
                    <GlassCard className={`p-5 ${config.color}`}>
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h3 className="text-base font-semibold text-text-primary">{phase.title}</h3>
                        <Badge variant={config.badge}>{phase.status}</Badge>
                      </div>
                      <p className="text-sm text-text-secondary mb-3">{phase.desc}</p>
                      <div className="space-y-1">
                        {phase.milestones.map((m, i) => (
                          <div key={i} className="flex items-center gap-2 text-xs text-text-muted">
                            <div className={`w-1.5 h-1.5 rounded-full ${
                              phase.status === 'COMPLETED' ? 'bg-quantum-emerald' :
                              phase.status === 'ACTIVE' ? 'bg-photon-cyan' :
                              'bg-white/10'
                            }`} />
                            {m}
                          </div>
                        ))}
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>
    </>
  );
}
