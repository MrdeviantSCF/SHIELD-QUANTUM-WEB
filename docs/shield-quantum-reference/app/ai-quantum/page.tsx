'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Zap, FlaskConical, Database, ArrowRight } from 'lucide-react';
import { Section, SectionHeader, GlassCard, Badge, Button } from '@/components/ui';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const topics = [
  { title: 'Quantum Machine Learning', desc: 'Variational quantum algorithms, quantum neural networks, quantum kernel methods for classification and regression.', status: 'RESEARCH' },
  { title: 'Optimization', desc: 'QAOA, VQE, and quantum annealing approaches for combinatorial optimization problems.', status: 'RESEARCH' },
  { title: 'Scientific Simulation', desc: 'Quantum simulation of molecular systems, materials, and physical phenomena beyond classical tractability.', status: 'CONCEPT' },
  { title: 'Materials Discovery', desc: 'Using quantum computing to model molecular interactions and predict novel material properties.', status: 'FUTURE' },
  { title: 'Drug Discovery', desc: 'Quantum chemistry simulation for understanding protein folding, binding affinities, and drug-target interactions.', status: 'FUTURE' },
  { title: 'AI-Assisted Quantum Research', desc: 'Using classical AI to optimize quantum circuits, error correction codes, and control pulses.', status: 'RESEARCH' },
];

const architectureLayers = [
  { label: 'Classical Computing', desc: 'CPU/GPU compute, data preprocessing, classical optimization', color: 'text-text-muted', bg: 'bg-white/5' },
  { label: 'AI / Machine Learning', desc: 'Neural networks, reinforcement learning, generative models', color: 'text-quantum-blue', bg: 'bg-quantum-blue/5' },
  { label: 'Quantum Processing', desc: 'Quantum circuits, variational algorithms, error correction', color: 'text-photon-cyan', bg: 'bg-photon-cyan/5' },
  { label: 'Hybrid Orchestration', desc: 'Classical-quantum co-processing, iterative optimization loops', color: 'text-quantum-violet', bg: 'bg-quantum-violet/5' },
];

export default function AIQuantumPage() {
  return (
    <>
      <Section fullHeight className="pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="violet" className="mb-6">Hybrid Intelligence</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            AI +{' '}
            <span className="bg-gradient-to-r from-quantum-violet to-photon-cyan bg-clip-text text-transparent">
              Quantum
            </span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
            Combining artificial intelligence, high performance computing, and quantum processing
            to solve problems beyond the reach of any single technology.
          </p>
        </div>
      </Section>

      <div className="section-divider" />

      {/* Architecture Diagram */}
      <Section>
        <SectionHeader label="Architecture" title="Hybrid Computing Stack" description="How classical, AI, and quantum systems work together." />
        <div className="max-w-2xl mx-auto space-y-3">
          {architectureLayers.map((layer, i) => (
            <motion.div
              key={layer.label}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <GlassCard className={`p-5 ${layer.bg} border-l-2`} style={{ borderLeftColor: layer.color.includes('text-') ? undefined : layer.color }}>
                <div className="flex items-center gap-3">
                  <span className={`text-sm font-semibold ${layer.color}`}>{layer.label}</span>
                </div>
                <p className="mt-1 text-xs text-text-muted">{layer.desc}</p>
              </GlassCard>
              {i < architectureLayers.length - 1 && (
                <div className="flex justify-center py-1">
                  <div className="w-px h-3 bg-white/10" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Section>

      <div className="section-divider" />

      {/* Research Topics */}
      <Section>
        <SectionHeader label="Research" title="AI + Quantum Research Areas" />
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {topics.map((topic) => (
            <motion.div key={topic.title} variants={fadeIn}>
              <GlassCard hover className="p-5 h-full">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-text-primary">{topic.title}</h3>
                  <Badge variant={topic.status === 'RESEARCH' ? 'violet' : topic.status === 'CONCEPT' ? 'muted' : 'amber'}>
                    {topic.status}
                  </Badge>
                </div>
                <p className="text-xs text-text-muted leading-relaxed">{topic.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </>
  );
}
