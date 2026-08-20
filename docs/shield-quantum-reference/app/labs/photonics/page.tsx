'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, GlassCard, Badge } from '@/components/ui';

interface PhotonicComponent {
  id: string;
  name: string;
  purpose: string;
  principle: string;
  challenges: string[];
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

const photonicsComponents: PhotonicComponent[] = [
  { id: 'laser', name: 'Laser Source', purpose: 'Generate coherent light for quantum experiments. Single-frequency lasers provide the photons used in quantum protocols.', principle: 'Stimulated emission produces coherent, monochromatic light. Mode-locked lasers can produce single photons through spontaneous parametric down-conversion.', challenges: ['Wavelength stability', 'Intensity noise', 'Spectral purity'], x: 5, y: 35, width: 18, height: 15, color: '#f59e0b' },
  { id: 'beam-splitter', name: 'Beam Splitter', purpose: 'Split a single photon beam into two paths, creating superposition of path states.', principle: 'A half-silvered mirror transmits and reflects photons with equal probability. This creates the quantum superposition |ψ⟩ = (|path₁⟩ + |path₂⟩)/√2.', challenges: ['Splitting ratio precision', 'Loss minimization', 'Phase control'], x: 30, y: 20, width: 18, height: 12, color: '#3b82f6' },
  { id: 'interferometer', name: 'Interferometer', purpose: 'Create interference between two photon paths to perform quantum operations and measurements.', principle: 'Mach-Zehnder or Sagnac configurations combine two paths. Constructive/destructive interference depends on relative phase, enabling quantum computation.', challenges: ['Path length stability', 'Phase drift compensation', 'Alignment precision'], x: 30, y: 50, width: 18, height: 12, color: '#7c3aed' },
  { id: 'phase-shifter', name: 'Phase Shifter', purpose: 'Apply controlled phase rotations to photon states — equivalent to quantum gate operations.', principle: 'Electro-optic modulators change the refractive index to shift the phase of light passing through. This implements single-qubit rotations.', challenges: ['Voltage precision', 'Speed vs accuracy', 'Insertion loss'], x: 55, y: 20, width: 18, height: 12, color: '#06b6d4' },
  { id: 'detector', name: 'Single-Photon Detector', purpose: 'Detect individual photons with high efficiency for quantum measurement.', principle: 'Superconducting nanowire detectors (SNSPDs) absorb single photons, breaking superconductivity and creating a detectable voltage pulse.', challenges: ['Detection efficiency', 'Dark count rate', 'Timing jitter', 'Cryogenic requirement'], x: 75, y: 35, width: 18, height: 15, color: '#10b981' },
  { id: 'fiber', name: 'Optical Fiber', purpose: 'Transmit photonic qubits between components with minimal loss.', principle: 'Total internal reflection guides light through a glass fiber core. Specialty fibers preserve polarization or support specific wavelengths.', challenges: ['Transmission loss', 'Polarization drift', 'Dispersion', 'Connector alignment'], x: 55, y: 50, width: 18, height: 12, color: '#64748b' },
  { id: 'polarizer', name: 'Polarization Optics', purpose: 'Prepare and measure photon polarization states — a natural qubit encoding.', principle: 'Wave plates and polarizing beam splitters manipulate photon polarization. Horizontal/vertical or diagonal bases encode qubit states.', challenges: ['Extinction ratio', 'Wavelength dependence', 'Thermal stability'], x: 30, y: 70, width: 18, height: 12, color: '#f43f5e' },
  { id: 'entangle', name: 'Entanglement Source', purpose: 'Generate pairs of entangled photons for quantum protocols.', principle: 'Spontaneous parametric down-conversion (SPDC) in nonlinear crystals converts one pump photon into two entangled signal/idler photons.', challenges: ['Pair generation rate', 'Spectral purity', 'Heralding efficiency', 'Multi-pair contamination'], x: 55, y: 70, width: 18, height: 12, color: '#ec4899' },
];

export default function PhotonicsLabPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = photonicsComponents.find((c) => c.id === selected);

  return (
    <>
      <Section className="pt-24 pb-8">
        <div className="text-center mb-4">
          <Badge variant="amber" className="mb-4">Interactive Laboratory</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Quantum{' '}
            <span className="bg-gradient-to-r from-energy-amber to-quantum-rose bg-clip-text text-transparent">
              Photonics Lab
            </span>
          </h1>
          <p className="mt-4 text-text-secondary max-w-2xl mx-auto">
            Explore the components of a photonic quantum experiment.
            Click any component to learn about its function and physical principles.
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3">
            <GlassCard className="p-4 aspect-[4/3] relative overflow-hidden">
              <div className="absolute top-3 left-4 z-10">
                <span className="text-[10px] font-mono text-text-muted tracking-wider uppercase">
                  Photonics Lab — Optical Table Layout
                </span>
              </div>
              <svg viewBox="0 0 100 90" className="w-full h-full relative z-10">
                {/* Beam path lines */}
                <line x1="23" y1="42" x2="30" y2="26" stroke="rgba(245,158,11,0.2)" strokeWidth="0.3" strokeDasharray="1,1" />
                <line x1="48" y1="26" x2="55" y2="26" stroke="rgba(59,130,246,0.2)" strokeWidth="0.3" strokeDasharray="1,1" />
                <line x1="73" y1="26" x2="75" y2="35" stroke="rgba(6,182,212,0.2)" strokeWidth="0.3" strokeDasharray="1,1" />
                <line x1="23" y1="42" x2="30" y2="56" stroke="rgba(245,158,11,0.2)" strokeWidth="0.3" strokeDasharray="1,1" />
                <line x1="48" y1="56" x2="55" y2="56" stroke="rgba(124,58,237,0.2)" strokeWidth="0.3" strokeDasharray="1,1" />
                <line x1="73" y1="56" x2="75" y2="42" stroke="rgba(100,116,139,0.2)" strokeWidth="0.3" strokeDasharray="1,1" />

                {photonicsComponents.map((comp) => {
                  const isSelected = selected === comp.id;
                  return (
                    <g key={comp.id} className="cursor-pointer" onClick={() => setSelected(isSelected ? null : comp.id)}>
                      <rect
                        x={comp.x} y={comp.y} width={comp.width} height={comp.height}
                        rx="1"
                        fill={isSelected ? `${comp.color}22` : 'rgba(255,255,255,0.02)'}
                        stroke={isSelected ? comp.color : 'rgba(255,255,255,0.08)'}
                        strokeWidth={isSelected ? '0.5' : '0.3'}
                        className="transition-all duration-300"
                      />
                      <text
                        x={comp.x + comp.width / 2} y={comp.y + comp.height / 2}
                        textAnchor="middle" dominantBaseline="central"
                        fill={isSelected ? comp.color : 'rgba(255,255,255,0.4)'}
                        fontSize="2" fontFamily="monospace"
                        className="pointer-events-none select-none"
                      >
                        {comp.name.length > 20 ? comp.name.substring(0, 18) + '…' : comp.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </GlassCard>
          </div>

          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {active ? (
                <motion.div key={active.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
                  <GlassCard className="p-6">
                    <div className="w-2 h-2 rounded-full mb-2" style={{ backgroundColor: active.color }} />
                    <h3 className="text-lg font-semibold text-text-primary">{active.name}</h3>
                    <div className="mt-4 space-y-4">
                      <div><h4 className="text-[10px] font-mono tracking-wider uppercase text-text-muted mb-1">Purpose</h4><p className="text-sm text-text-secondary leading-relaxed">{active.purpose}</p></div>
                      <div><h4 className="text-[10px] font-mono tracking-wider uppercase text-text-muted mb-1">Physical Principle</h4><p className="text-sm text-text-secondary leading-relaxed">{active.principle}</p></div>
                      <div>
                        <h4 className="text-[10px] font-mono tracking-wider uppercase text-text-muted mb-1">Challenges</h4>
                        <ul className="space-y-1">
                          {active.challenges.map((c, i) => (
                            <li key={i} className="flex items-start gap-2 text-xs text-text-muted">
                              <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: active.color }} />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ) : (
                <GlassCard className="p-8 text-center">
                  <p className="text-sm text-text-muted">Click a component on the optical table to explore its function.</p>
                </GlassCard>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Section>
    </>
  );
}
