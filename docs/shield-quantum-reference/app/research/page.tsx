'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Section, SectionHeader, GlassCard, Badge, Button } from '@/components/ui';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const areas = [
  { title: 'Quantum Algorithms', desc: 'Designing quantum algorithms for optimization, simulation, and machine learning. Exploring variational methods, quantum walks, and hybrid approaches.', status: 'ACTIVE' },
  { title: 'Quantum Error Correction', desc: 'Implementing and improving quantum error correcting codes — surface codes, color codes, and beyond.', status: 'RESEARCH' },
  { title: 'Quantum Information Theory', desc: 'Fundamental research on quantum entanglement, channel capacities, and quantum complexity.', status: 'RESEARCH' },
  { title: 'Quantum Control & Calibration', desc: 'Optimal control theory, pulse engineering, and automated calibration for high-fidelity quantum operations.', status: 'RESEARCH' },
  { title: 'Cryogenic Engineering', desc: 'Low-temperature physics, thermal management, and cryogenic system design for quantum computing.', status: 'CONCEPT' },
  { title: 'Quantum Networking', desc: 'Quantum repeaters, entanglement distribution, and quantum internet protocols.', status: 'CONCEPT' },
  { title: 'Quantum Sensing', desc: 'Leveraging quantum effects for precision measurements in magnetic fields, gravity, and time.', status: 'CONCEPT' },
  { title: 'Quantum Photonics', desc: 'Single-photon sources, photonic circuits, and integrated optical quantum technology.', status: 'CONCEPT' },
];

export default function ResearchPage() {
  return (
    <>
      <Section fullHeight className="pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="violet" className="mb-6">Scientific Research</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Research{' '}
            <span className="bg-gradient-to-r from-quantum-violet to-photon-cyan bg-clip-text text-transparent">
              Areas
            </span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
            Our research spans fundamental quantum science to applied quantum engineering,
            with a focus on building practical quantum technology.
          </p>
        </div>
      </Section>
      <div className="section-divider" />
      <Section>
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {areas.map((area) => (
            <motion.div key={area.title} variants={fadeIn}>
              <GlassCard hover className="p-6 h-full">
                <div className="flex items-center gap-2 mb-3">
                  <h3 className="text-base font-semibold text-text-primary">{area.title}</h3>
                  <Badge variant={area.status === 'ACTIVE' ? 'emerald' : area.status === 'RESEARCH' ? 'violet' : 'muted'}>{area.status}</Badge>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{area.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </>
  );
}
