'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, SectionHeader, GlassCard, Badge } from '@/components/ui';

/* ═══════════════════════════════════════════════════════
   Cryogenic Quantum Lab — Interactive Laboratory
   ═══════════════════════════════════════════════════════ */

interface LabComponent {
  id: string;
  name: string;
  purpose: string;
  principle: string;
  challenges: string[];
  researchArea: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

const labComponents: LabComponent[] = [
  {
    id: 'dilution-fridge',
    name: 'Dilution Refrigerator',
    purpose: 'Cool the quantum processor to ~10–20 millikelvin, near absolute zero.',
    principle: 'Uses the mixing of ³He and ⁴He isotopes to achieve continuous cooling below 1K. The enthalpy of mixing provides the cooling power.',
    challenges: ['Maintaining ultra-low temperatures', 'Vibration isolation', 'Thermal radiation shielding', 'Cost and complexity'],
    researchArea: 'Cryogenic Engineering',
    x: 35, y: 15, width: 30, height: 55,
    color: '#06b6d4',
  },
  {
    id: 'quantum-processor',
    name: 'Quantum Processor',
    purpose: 'The chip containing superconducting qubits that performs quantum computation.',
    principle: 'Superconducting circuits using Josephson junctions create anharmonic oscillators that function as qubits. Cooled below the critical temperature to achieve zero electrical resistance.',
    challenges: ['Qubit coherence times', 'Gate fidelity', 'Crosstalk between qubits', 'Scalability'],
    researchArea: 'Quantum Hardware',
    x: 42, y: 55, width: 16, height: 10,
    color: '#00d4ff',
  },
  {
    id: 'microwave-lines',
    name: 'Microwave Control Lines',
    purpose: 'Deliver precisely shaped microwave pulses to control qubit states and execute quantum gates.',
    principle: 'Microwave signals at qubit frequencies (~4–8 GHz) drive transitions between qubit states. Pulse shaping controls gate operations with high fidelity.',
    challenges: ['Signal attenuation across temperature stages', 'Thermal noise filtering', 'Impedance matching', 'Pulse calibration'],
    researchArea: 'Quantum Control',
    x: 10, y: 25, width: 18, height: 40,
    color: '#7c3aed',
  },
  {
    id: 'rf-electronics',
    name: 'RF/Microwave Electronics',
    purpose: 'Generate, modulate, and amplify microwave signals for qubit control and readout.',
    principle: 'Arbitrary waveform generators create baseband signals, upconverted to qubit frequencies. Room-temperature electronics interface with the cryogenic system.',
    challenges: ['Phase stability', 'Channel synchronization', 'Scalable wiring', 'Signal integrity'],
    researchArea: 'Control Systems',
    x: 5, y: 70, width: 25, height: 15,
    color: '#f59e0b',
  },
  {
    id: 'readout',
    name: 'Measurement Electronics',
    purpose: 'Detect the quantum state of qubits through dispersive readout.',
    principle: 'Each qubit is coupled to a resonator. The qubit state shifts the resonator frequency, detected via microwave transmission measurements. Quantum-limited amplifiers (e.g., JPAs) amplify weak signals.',
    challenges: ['Single-shot readout fidelity', 'Quantum-limited amplification', 'Multiplexed readout', 'Speed vs accuracy trade-off'],
    researchArea: 'Quantum Readout',
    x: 70, y: 25, width: 18, height: 40,
    color: '#10b981',
  },
  {
    id: 'vacuum-system',
    name: 'Vacuum System',
    purpose: 'Maintain ultra-high vacuum around the cryogenic system to prevent thermal conduction through gas.',
    principle: 'Turbo-molecular and scroll pumps achieve vacuum levels below 10⁻⁶ mbar. Vacuum eliminates convective heat transfer to the cold stages.',
    challenges: ['Leak detection', 'Outgassing management', 'Vibration from pumps', 'Vacuum feedthroughs'],
    researchArea: 'Cryogenic Engineering',
    x: 70, y: 70, width: 22, height: 15,
    color: '#64748b',
  },
  {
    id: 'magnetic-shield',
    name: 'Magnetic Shielding',
    purpose: 'Protect qubits from external magnetic fields that cause decoherence.',
    principle: 'Mu-metal and superconducting shields redirect external magnetic flux away from the quantum processor. Multiple layers provide increasingly clean magnetic environments.',
    challenges: ['Residual field cancellation', 'Shielding at multiple temperature stages', 'Compatibility with wiring', 'Demagnetization procedures'],
    researchArea: 'Quantum Engineering',
    x: 35, y: 73, width: 30, height: 12,
    color: '#f43f5e',
  },
  {
    id: 'optical-system',
    name: 'Optical Systems',
    purpose: 'Provide optical links for certain quantum technologies and calibration systems.',
    principle: 'Fiber optic connections enable low-noise signal transmission. Used in photonic quantum systems and for optical calibration of cryogenic thermometry.',
    challenges: ['Optical alignment at low temperatures', 'Fiber thermal anchoring', 'Photon loss minimization', 'Integration with electronic systems'],
    researchArea: 'Quantum Photonics',
    x: 5, y: 5, width: 20, height: 15,
    color: '#3b82f6',
  },
];

export default function CryogenicLabPage() {
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);

  const active = labComponents.find((c) => c.id === selectedComponent);

  return (
    <>
      <Section className="pt-24 pb-8">
        <div className="text-center mb-4">
          <Badge variant="cyan" className="mb-4">Interactive Laboratory</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Cryogenic{' '}
            <span className="bg-gradient-to-r from-photon-cyan to-quantum-violet bg-clip-text text-transparent">
              Quantum Lab
            </span>
          </h1>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            Explore the components of a superconducting quantum computing system.
            Click any component to learn about its function, operating principles, and engineering challenges.
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Lab Diagram */}
          <div className="lg:col-span-3">
            <GlassCard className="p-4 aspect-[4/3] relative overflow-hidden">
              {/* Background grid */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage:
                    'linear-gradient(rgba(0,212,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.05) 1px, transparent 1px)',
                  backgroundSize: '20px 20px',
                }}
              />

              {/* Lab title */}
              <div className="absolute top-3 left-4 z-10">
                <span className="text-[10px] font-mono text-text-muted tracking-wider uppercase">
                  Cryogenic Lab — Schematic View
                </span>
              </div>

              {/* SVG Diagram */}
              <svg viewBox="0 0 100 90" className="w-full h-full relative z-10">
                {/* Connection lines */}
                <line x1="28" y1="45" x2="35" y2="45" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" strokeDasharray="1,1" />
                <line x1="65" y1="45" x2="70" y2="45" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" strokeDasharray="1,1" />
                <line x1="50" y1="65" x2="50" y2="73" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" strokeDasharray="1,1" />
                <line x1="17" y1="65" x2="17" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" strokeDasharray="1,1" />
                <line x1="79" y1="65" x2="79" y2="70" stroke="rgba(255,255,255,0.1)" strokeWidth="0.3" strokeDasharray="1,1" />

                {/* Components */}
                {labComponents.map((comp) => {
                  const isSelected = selectedComponent === comp.id;
                  return (
                    <g key={comp.id} className="cursor-pointer" onClick={() => setSelectedComponent(isSelected ? null : comp.id)}>
                      <rect
                        x={comp.x}
                        y={comp.y}
                        width={comp.width}
                        height={comp.height}
                        rx="1"
                        fill={isSelected ? `${comp.color}22` : 'rgba(255,255,255,0.02)'}
                        stroke={isSelected ? comp.color : 'rgba(255,255,255,0.08)'}
                        strokeWidth={isSelected ? '0.5' : '0.3'}
                        className="transition-all duration-300"
                      />
                      <text
                        x={comp.x + comp.width / 2}
                        y={comp.y + comp.height / 2}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={isSelected ? comp.color : 'rgba(255,255,255,0.4)'}
                        fontSize="2.2"
                        fontFamily="monospace"
                        className="pointer-events-none select-none"
                      >
                        {comp.name.length > 20 ? comp.name.substring(0, 18) + '…' : comp.name}
                      </text>
                      {/* Subtle pulse on selected */}
                      {isSelected && (
                        <rect
                          x={comp.x - 0.5}
                          y={comp.y - 0.5}
                          width={comp.width + 1}
                          height={comp.height + 1}
                          rx="1.5"
                          fill="none"
                          stroke={comp.color}
                          strokeWidth="0.2"
                          opacity="0.3"
                          className="animate-pulse-slow"
                        />
                      )}
                    </g>
                  );
                })}
              </svg>
            </GlassCard>
          </div>

          {/* Component Detail Panel */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <GlassCard className="p-6">
                    <div className="flex items-center gap-2 mb-1">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: active.color }}
                      />
                      <Badge variant="cyan">{active.researchArea}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-text-primary mt-3">{active.name}</h3>

                    <div className="mt-4 space-y-4">
                      <div>
                        <h4 className="text-[10px] font-mono tracking-wider uppercase text-text-muted mb-1">Purpose</h4>
                        <p className="text-sm text-text-secondary leading-relaxed">{active.purpose}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-mono tracking-wider uppercase text-text-muted mb-1">Scientific Principle</h4>
                        <p className="text-sm text-text-secondary leading-relaxed">{active.principle}</p>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-mono tracking-wider uppercase text-text-muted mb-1">Engineering Challenges</h4>
                        <ul className="space-y-1">
                          {active.challenges.map((challenge, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-text-muted">
                              <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: active.color }} />
                              {challenge}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex items-center justify-center"
                >
                  <GlassCard className="p-8 text-center">
                    <p className="text-sm text-text-muted">
                      Click a component in the lab diagram to explore its function and scientific principles.
                    </p>
                  </GlassCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>
    </>
  );
}
