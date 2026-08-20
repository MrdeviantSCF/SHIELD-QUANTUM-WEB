'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Section, SectionHeader, GlassCard, Badge } from '@/components/ui';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

const hardwareTypes = [
  { name: 'Superconducting Qubits', desc: 'Josephson junction-based circuits cooled to millikelvin temperatures. Leading platform for near-term quantum computing.', status: 'RESEARCH', temp: '~15 mK', coherence: '~100 μs' },
  { name: 'Trapped Ions', desc: 'Individual ions confined by electromagnetic fields, manipulated with laser pulses. High-fidelity gates and long coherence times.', status: 'RESEARCH', temp: 'Near ground state', coherence: '~1-10 s' },
  { name: 'Neutral Atoms', desc: 'Atoms trapped in optical tweezers or lattices. Promising for scalability with reconfigurable geometries.', status: 'CONCEPT', temp: '~μK', coherence: '~1 s' },
  { name: 'Photonic Systems', desc: 'Qubits encoded in photons. Operate at room temperature with intrinsic connectivity.', status: 'CONCEPT', temp: 'Room temp', coherence: 'N/A (flying qubits)' },
  { name: 'Spin Qubits', desc: 'Electron or nuclear spins in semiconductor quantum dots. Compatible with existing fabrication.', status: 'CONCEPT', temp: '~100 mK', coherence: '~1 ms' },
  { name: 'Quantum Dots', desc: 'Nanoscale semiconductor structures confining individual electrons. Potential for CMOS integration.', status: 'CONCEPT', temp: '~100 mK', coherence: '~100 μs' },
];

const infrastructure = [
  { name: 'Cryogenic Systems', desc: 'Dilution refrigerators, pulse tube coolers, and thermal management systems.' },
  { name: 'RF/Microwave Control', desc: 'Arbitrary waveform generators, mixers, amplifiers, and signal routing.' },
  { name: 'Quantum Readout', desc: 'Dispersive readout, quantum-limited amplifiers, and high-speed digitizers.' },
  { name: 'Quantum Sensors', desc: 'Precision measurement devices based on quantum mechanical phenomena.' },
];

export default function HardwarePage() {
  return (
    <>
      <Section fullHeight className="pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="violet" className="mb-6">Qubit Technologies</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Quantum{' '}
            <span className="bg-gradient-to-r from-quantum-violet to-photon-cyan bg-clip-text text-transparent">
              Hardware
            </span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
            An overview of physical qubit technologies, cryogenic systems, and quantum control infrastructure.
          </p>
        </div>
      </Section>
      <div className="section-divider" />
      <Section>
        <SectionHeader label="Qubit Technologies" title="Hardware Platforms" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.08 } } }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto">
          {hardwareTypes.map((hw) => (
            <motion.div key={hw.name} variants={fadeIn}>
              <GlassCard hover className="p-5 h-full">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-sm font-semibold text-text-primary">{hw.name}</h3>
                  <Badge variant={hw.status === 'RESEARCH' ? 'violet' : 'muted'}>{hw.status}</Badge>
                </div>
                <p className="text-xs text-text-muted leading-relaxed mb-3">{hw.desc}</p>
                <div className="grid grid-cols-2 gap-2">
                  <div className="text-[10px] font-mono"><span className="text-text-muted">Temp: </span><span className="text-photon-cyan">{hw.temp}</span></div>
                  <div className="text-[10px] font-mono"><span className="text-text-muted">T₂: </span><span className="text-quantum-violet">{hw.coherence}</span></div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Section>
      <div className="section-divider" />
      <Section>
        <SectionHeader label="Infrastructure" title="Supporting Systems" />
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={{ visible: { transition: { staggerChildren: 0.1 } } }} className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {infrastructure.map((inf) => (
            <motion.div key={inf.name} variants={fadeIn}>
              <GlassCard hover className="p-5">
                <h3 className="text-sm font-semibold text-text-primary">{inf.name}</h3>
                <p className="mt-1.5 text-xs text-text-muted leading-relaxed">{inf.desc}</p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </>
  );
}
