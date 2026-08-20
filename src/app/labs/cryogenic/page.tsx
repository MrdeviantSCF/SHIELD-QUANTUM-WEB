'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Thermometer,
  Cpu,
  Radio,
  Activity,
  Layers,
  ShieldCheck,
  Zap,
  ArrowRight,
  FlaskConical,
  Maximize2,
  X,
  Workflow,
  Sparkles,
  Info,
  type LucideIcon,
} from 'lucide-react';
import { Section, SectionHeader, GlassCard, Badge, Button, StatusBadge } from '@/components/ui';

/* ═══════════════════════════════════════════════════════
   INTERACTIVE DILUTION REFRIGERATOR SUBSYSTEMS DATA
   ═══════════════════════════════════════════════════════ */

interface CryoComponent {
  id: string;
  name: string;
  category: string;
  stageTemp: string;
  purpose: string;
  principle: string;
  importance: string;
  specs: { label: string; value: string }[];
  status: 'CURRENT' | 'PROPOSED' | 'PLANNED' | 'FUTURE';
  icon: LucideIcon;
}

const CRYO_COMPONENTS: CryoComponent[] = [
  {
    id: 'cryo-cooling',
    name: 'Pulse Tube & Multi-Stage Cryogenic Cooling',
    category: 'Pre-Cooling Subsystem',
    stageTemp: '300 K → 50 K → 3.8 K',
    purpose: 'Condense circulating helium-3 gas and intercept blackbody thermal radiation from the room-temperature laboratory.',
    principle: 'A closed-cycle helium pulse tube compressor utilizes acoustic pressure oscillations to achieve multi-stage pre-cooling down to 3.8 Kelvin without liquid cryogen replenishment.',
    importance: 'Without pre-cooling, room-temperature thermal conduction and radiation would overpower the sub-Kelvin dilution cooling process instantly.',
    specs: [
      { label: 'Cooling Power at 50K', value: '35 W' },
      { label: 'Cooling Power at 4K', value: '1.5 W' },
      { label: 'Compressor Cycle', value: 'Closed-Loop Helium-4' },
      { label: 'Radiation Shielding', value: 'Gold-Plated OFHC Copper' },
    ],
    status: 'CURRENT',
    icon: Thermometer,
  },
  {
    id: 'mixing-chamber',
    name: 'Dilution Mixing Chamber & Heat Exchangers',
    category: 'Sub-Kelvin Thermodynamic Core',
    stageTemp: '14.8 mK Base',
    purpose: 'Provide continuous cooling power below 100 millikelvin to freeze out thermal noise and maintain superconducting transmon coherence.',
    principle: 'Relies on the endothermic enthalpy of mixing when helium-3 atoms cross the phase boundary from a concentrated ³He phase into a dilute ³He/⁴He mixture.',
    importance: 'Superconducting circuits require $k_B T \\ll h\\nu$ ($T < 20\\text{ mK}$) so that thermal excitations do not destroy the delicate ground $|0\\rangle$ and excited $|1\\rangle$ quantum states.',
    specs: [
      { label: 'Base Temperature', value: '14.8 mK (Continuous)' },
      { label: 'Cooling Power at 100 mK', value: '> 450 μW' },
      { label: 'Cooling Power at 20 mK', value: '> 14 μW' },
      { label: 'Isotope Charge', value: '³He/⁴He High-Purity Mixture' },
    ],
    status: 'CURRENT',
    icon: FlaskConical,
  },
  {
    id: 'quantum-processor',
    name: 'Superconducting Quantum Processor (QPU Package)',
    category: 'Computational Core',
    stageTemp: '14.8 mK',
    purpose: 'Execute quantum gates, algorithms, and multi-qubit entanglement across a microfabricated planar transmon lattice.',
    principle: 'Non-linear Josephson tunnel junctions shunted by thin-film coplanar capacitors create an artificial two-level atom with distinct anharmonic energy levels (4.8–5.4 GHz).',
    importance: 'The physical device where quantum algorithms are computed; requires absolute isolation from stray magnetic fields, infrared photons, and mechanical vibrations.',
    specs: [
      { label: 'Qubit Architecture', value: 'Planar Cross-Transmons' },
      { label: 'Substrate Material', value: 'Float-Zone Silicon (>10 kΩ·cm)' },
      { label: 'Anharmonicity (α)', value: '-240 MHz' },
      { label: 'Operating Frequency', value: '4.8 – 5.4 GHz' },
    ],
    status: 'CURRENT',
    icon: Cpu,
  },
  {
    id: 'superconducting-wiring',
    name: 'Semi-Rigid Microwave Coaxial Wiring & Attenuators',
    category: 'Signal Transport & Thermal Staging',
    stageTemp: '300 K → 15 mK',
    purpose: 'Deliver high-frequency microwave control pulses and readout tones from room-temperature electronics down to the QPU with minimal thermal load.',
    principle: 'Utilizes low-thermal-conductivity stainless steel and CuNi coaxial cables down to 4K, transitioning to zero-loss superconducting NbTi cables below 4K, paired with distributed cryogenic attenuators.',
    importance: 'Thermal photons traveling down coaxial cables from 300K would dephase qubits within nanoseconds; 60 dB of distributed attenuation ensures thermal photon noise is suppressed below $10^{-3}$ photons/mode.',
    specs: [
      { label: 'Attenuation at 4K Stage', value: '20 dB Cryo Attenuators' },
      { label: 'Attenuation at 100mK Stage', value: '10 dB Cryo Attenuators' },
      { label: 'Attenuation at Base (15mK)', value: '30 dB Cryo Attenuators' },
      { label: 'Coaxial Cable Alloy', value: 'NbTi Superconducting (Sub-4K)' },
    ],
    status: 'CURRENT',
    icon: Zap,
  },
  {
    id: 'microwave-control',
    name: 'Microwave Pulse Synthesizers & IQ Modulation',
    category: 'Control Electronics',
    stageTemp: 'Room Temp (300 K Rack)',
    purpose: 'Synthesize nanosecond-scale arbitrary microwave pulses with DRAG (Derivative Removal by Adiabatic Gate) envelope shaping to drive single- and two-qubit quantum gates.',
    principle: 'Multi-gigasample arbitrary waveform generators (AWGs) synthesize baseband I and Q waveforms, which are upconverted via analog mixers to the specific qubit transition frequency (~5 GHz).',
    importance: 'Gate fidelity is directly governed by pulse amplitude precision, phase stability, and spectral purity; sub-nanosecond timing alignment is required for fault-tolerant operation.',
    specs: [
      { label: 'DAC Sampling Rate', value: '5.0 GSPS (16-bit Resolution)' },
      { label: 'Pulse Timing Precision', value: '< 10 ps Channel-to-Channel' },
      { label: 'Pulse Duration', value: '15 – 30 ns (Single-Qubit Gate)' },
      { label: 'Phase Noise', value: '< -130 dBc/Hz at 10 kHz Offset' },
    ],
    status: 'CURRENT',
    icon: Radio,
  },
  {
    id: 'readout-electronics',
    name: 'Dispersive Readout & Quantum-Limited Amplifiers',
    category: 'Measurement Instrumentation',
    stageTemp: '15 mK → 4 K → 300 K',
    purpose: 'Measure the delicate quantum state of each qubit without inducing destructive state collapse during computational gate execution.',
    principle: 'Readout resonators coupled to qubits experience a state-dependent frequency shift ($\chi$). Reflected microwave readout tones are pre-amplified by quantum-limited Traveling Wave Parametric Amplifiers (TWPA) at 15 mK and High Electron Mobility Transistors (HEMT) at 4K.',
    importance: 'The outgoing microwave signal contains only a few single photons (~-130 dBm); quantum-limited parametric amplification is mandatory to achieve >99% single-shot readout fidelity.',
    specs: [
      { label: 'Parametric Amplifier', value: 'TWPA / JPA (>20 dB Gain at 15 mK)' },
      { label: 'HEMT Amplifier Noise', value: '< 2.0 K Noise Temp at 4K' },
      { label: 'Readout Integration Time', value: '250 – 500 ns' },
      { label: 'Readout Fidelity', value: '> 99.2% Single-Shot' },
    ],
    status: 'CURRENT',
    icon: Activity,
  },
  {
    id: 'magnetic-rf-shielding',
    name: 'Multi-Layer Magnetic & EMI/RF Shielding',
    category: 'Environmental Isolation',
    stageTemp: 'Room Temp & 15 mK Enclosures',
    purpose: 'Isolate the quantum processor from the Earth’s geomagnetic field, stray microwave EMI, and environmental infrared radiation.',
    principle: 'Employs high-permeability Mu-metal outer cylinders to deflect low-frequency magnetic flux, coupled with superconducting aluminum/lead inner canisters that achieve the Meissner effect ($B=0$) at cryogenic temperatures.',
    importance: 'External magnetic flux vortices threading the superconducting qubit SQUID loop create phase noise, which degrades the $T_2^*$ dephasing time exponentially.',
    specs: [
      { label: 'Outer Shielding', value: 'Double-Layer High-Perm Mu-Metal' },
      { label: 'Cryogenic Shielding', value: 'Superconducting Al / Cryoperm' },
      { label: 'Magnetic Attenuation', value: '> 100 dB (Flux Attenuation)' },
      { label: 'Infrared Absorbers', value: 'Ecosorb / Silicon Carbide Baffles' },
    ],
    status: 'CURRENT',
    icon: ShieldCheck,
  },
  {
    id: 'vibration-isolation',
    name: 'Active Pneumatic & Spring Vibration Isolation',
    category: 'Mechanical Decoupling',
    stageTemp: 'Structural Gantry (300 K)',
    purpose: 'Decouple the dilution refrigerator and quantum processor from seismic building rumble, pump acoustic vibrations, and pulse-tube mechanical oscillations.',
    principle: 'The cryostat is suspended from rigid structural aluminum gantries supported on active pneumatic self-leveling air isolators, with soft bellows connecting vacuum lines and spring-damped cold-finger anchors.',
    importance: 'Mechanical micro-vibrations generate piezoelectric charge fluctuations and inductive noise in bond wires, causing severe qubit decoherence and gate infidelity.',
    specs: [
      { label: 'Isolator Type', value: 'Active Pneumatic Air Springs' },
      { label: 'Resonant Frequency', value: '< 1.2 Hz (Horizontal & Vertical)' },
      { label: 'Pulse Tube Decoupling', value: 'Flexible Bellows & Heavy Mass Blocks' },
      { label: 'Vibration Attenuation', value: '> 95% Isolation above 5 Hz' },
    ],
    status: 'CURRENT',
    icon: Layers,
  },
];

/* ═══════════════════════════════════════════════════════
   14 COMPREHENSIVE SECTIONS METADATA & CONTENT
   ═══════════════════════════════════════════════════════ */

const LAB_WORKFLOW_STEPS = [
  {
    step: '01',
    title: 'Vacuum Evacuation & Cryogenic Cooldown',
    duration: '24–36 Hours',
    desc: 'The outer vacuum chamber is pumped down to 10⁻⁸ mbar using turbo-molecular pumps. The pulse tube compressor pre-cools the system to 4K, followed by ³He/⁴He mixture condensation to reach the 14.8 mK base plate.',
  },
  {
    step: '02',
    title: 'Microwave Instrumentation Calibration',
    duration: '2–3 Hours',
    desc: 'Room-temperature AWG and vector signal generators are time-aligned with picosecond precision. Mixer local oscillator (LO) leakage and sideband phase imbalances are automatically calibrated out.',
  },
  {
    step: '03',
    title: 'Qubit Spectroscopy & Frequency Mapping',
    duration: '1–2 Hours',
    desc: 'Continuous-wave (CW) microwave spectroscopy identifies readout resonator dips and qubit transition frequencies (f₀₁). Flux-bias lines are swept to determine symmetric sweet spots.',
  },
  {
    step: '04',
    title: 'Rabi Oscillations & Gate Pulse Optimization',
    duration: '2 Hours',
    desc: 'Coherent Rabi oscillations are driven to calibrate exact π and π/2 pulse amplitudes. DRAG derivative corrections are applied to eliminate leakage into the |2⟩ state.',
  },
  {
    step: '05',
    title: 'Coherence Characterization (T₁ & T₂*)',
    duration: '1 Hour',
    desc: 'Energy relaxation (T₁) is measured via inversion recovery, while pure dephasing (T₂*) and Hahn-echo coherence (T₂_echo) are measured to benchmark dielectric loss and flux noise.',
  },
  {
    step: '06',
    title: 'Randomized Benchmarking & Algorithm Execution',
    duration: 'Active Run',
    desc: 'Clifford randomized benchmarking quantifies average single- and two-qubit error rates. Fault-tolerant surface code syndrome cycles and quantum algorithms are executed at cryogenic speed.',
  },
];

const TECHNICAL_SPEC_MATRIX = [
  {
    system: 'Thermodynamics & Cooling',
    metric: 'Base Operating Temperature',
    value: '14.8 mK (0.0148 Kelvin)',
    status: 'CURRENT SPEC',
  },
  {
    system: 'Thermodynamics & Cooling',
    metric: 'Helium Dilution Power at 100 mK',
    value: '> 450 μW (Micro-Watts)',
    status: 'CURRENT SPEC',
  },
  {
    system: 'Vacuum Integrity',
    metric: 'Cryostat Outer Vacuum Vessel',
    value: '< 5.0 × 10⁻⁸ mbar',
    status: 'CURRENT SPEC',
  },
  {
    system: 'Microwave Transmission',
    metric: 'Distributed Line Attenuation',
    value: '60 dB Total (20dB at 4K, 10dB at 100mK, 30dB at 15mK)',
    status: 'CURRENT SPEC',
  },
  {
    system: 'Signal Routing',
    metric: 'Coaxial Line Count (Per Cryostat)',
    value: '128 Low-Loss Semi-Rigid Coaxial Channels',
    status: 'PROPOSED UPGRADE',
  },
  {
    system: 'Low-Noise Readout',
    metric: 'Quantum-Limited Amplifier Gain',
    value: '+22 dB Flat Gain over 4.5–7.5 GHz Bandwidth',
    status: 'CURRENT SPEC',
  },
  {
    system: 'Environmental Shielding',
    metric: 'Residual Magnetic Field at QPU',
    value: '< 0.5 μT (Micro-Tesla)',
    status: 'CURRENT SPEC',
  },
  {
    system: 'Mechanical Stability',
    metric: 'Vibration Isolation Efficiency',
    value: '> 95% Decoupling Above 5.0 Hz',
    status: 'CURRENT SPEC',
  },
  {
    system: 'Qubit Coherence Targets',
    metric: 'Relaxation Time (T₁)',
    value: '80 – 140 μs (Microseconds)',
    status: 'RESEARCH TARGET',
  },
  {
    system: 'Qubit Coherence Targets',
    metric: 'Hahn-Echo Dephasing Time (T₂)',
    value: '100 – 180 μs (Microseconds)',
    status: 'RESEARCH TARGET',
  },
  {
    system: 'Gate Fidelities',
    metric: 'Single-Qubit Gate Fidelity (1Q)',
    value: '99.94% (Clifford Randomized Benchmarking)',
    status: 'RESEARCH TARGET',
  },
  {
    system: 'Gate Fidelities',
    metric: 'Two-Qubit CZ / iSWAP Fidelity (2Q)',
    value: '99.50% (Interleaved Benchmarking)',
    status: 'RESEARCH TARGET',
  },
];

export default function CryogenicLabPage() {
  const [selectedSubsystem, setSelectedSubsystem] = useState<CryoComponent>(CRYO_COMPONENTS[0]);
  const [activeModalImage, setActiveModalImage] = useState<{ src: string; title: string; desc: string } | null>(null);

  return (
    <>
      {/* ── Section 1: Hero & Environmental Atmosphere ── */}
      <Section className="pt-24 pb-12">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-xs font-mono text-[#00d4ff]">
            <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-ping" />
            <span>SHIELD QUANTUM MACHINE AND TECHNOLOGY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#e2e8f0]">
            Cryogenic{' '}
            <span className="bg-gradient-to-r from-[#00d4ff] via-[#d367c4] to-[#7c3aed] bg-clip-text text-transparent">
              Quantum Lab
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#94a3b8] max-w-3xl mx-auto leading-relaxed">
            An advanced research environment dedicated to sub-Kelvin thermodynamics, multi-stage dilution refrigeration, precision microwave pulse synthesis, and fault-tolerant superconducting quantum processors.
          </p>

          {/* Scientific Disclaimer Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#7B7672]">
            <Info className="w-4 h-4 text-[#00d4ff] shrink-0" />
            <span>Illustrative Scientific Visualizations &amp; Engineering Specifications</span>
          </div>
        </div>

        {/* Panoramic Laboratory Showcase Banner */}
        <div className="max-w-6xl mx-auto mt-10">
          <GlassCard className="p-2 sm:p-3 overflow-hidden group relative">
            <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full rounded-xl overflow-hidden border border-white/[0.1]">
              <Image
                src="/images/labs/cryogenic_quantum_lab.jpg"
                alt="Complete cryogenic quantum computing research laboratory environment with dilution refrigerator and control racks"
                fill
                priority
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#202124] via-transparent to-transparent pointer-events-none" />

              {/* Live Simulated HUD Telemetry Overlay */}
              <div className="absolute top-4 left-4 right-4 flex flex-wrap items-center justify-between gap-3 pointer-events-none">
                <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/[0.1] text-[11px] font-mono text-[#e2e8f0]">
                  <span className="w-2 h-2 rounded-full bg-[#10b981] animate-pulse" />
                  <span>DILUTION CRYOSTAT CLUSTER // FACILITY RUNNING</span>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-[#00d4ff]/30 text-[11px] font-mono text-[#00d4ff]">
                  <Thermometer className="w-3.5 h-3.5" />
                  <span>MIXING CHAMBER: 14.8 mK</span>
                </div>
              </div>

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <span className="text-[10px] font-mono text-[#7B7672] uppercase tracking-wider bg-black/75 px-2.5 py-1 rounded border border-white/5 backdrop-blur-md">
                  Cleanroom ISO 6 Environment • Automated Helium Recovery
                </span>
                <button
                  onClick={() =>
                    setActiveModalImage({
                      src: '/images/labs/cryogenic_quantum_lab.jpg',
                      title: 'Cryogenic Quantum Computing Laboratory',
                      desc: 'Full panoramic perspective showing the suspended dilution refrigerator cryostat, multi-channel microwave synthesizer racks, RF signal routing harnesses, and isolated gantry system.',
                    })
                  }
                  className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00d4ff]/20 hover:bg-[#00d4ff]/30 text-[#00d4ff] border border-[#00d4ff]/40 text-xs font-mono backdrop-blur-md transition-all shadow-[0_0_15px_rgba(0,212,255,0.2)]"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Expand Visualizer</span>
                </button>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── Section 2: Interactive Dilution Refrigerator Diagram & Subsystem Explorer ── */}
      <Section id="interactive-diagram">
        <SectionHeader
          label="Interactive Schematic"
          title="Dilution Refrigerator Subsystem Explorer"
          description="Click any component in the cryogenic architecture below to inspect its operational physics, functional purpose, and engineering specifications."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-7xl mx-auto items-start">
          {/* Left Column: Interactive Subsystem Navigation List */}
          <div className="lg:col-span-5 space-y-2.5">
            <span className="text-xs font-mono text-[#7B7672] uppercase tracking-wider block mb-2">
              Select Architecture Component:
            </span>
            {CRYO_COMPONENTS.map((comp) => {
              const Icon = comp.icon;
              const isSelected = selectedSubsystem.id === comp.id;
              return (
                <button
                  key={comp.id}
                  onClick={() => setSelectedSubsystem(comp)}
                  className={`w-full p-4 rounded-xl text-left transition-all duration-200 flex items-start gap-3 border ${
                    isSelected
                      ? 'bg-[#00d4ff]/10 border-[#00d4ff]/50 shadow-[0_0_20px_rgba(0,212,255,0.15)] translate-x-1.5'
                      : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.05] hover:border-white/[0.15]'
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${
                      isSelected
                        ? 'bg-[#00d4ff] text-black shadow-[0_0_12px_#00d4ff]'
                        : 'bg-white/[0.05] text-[#94a3b8]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4
                        className={`text-sm font-semibold truncate ${
                          isSelected ? 'text-[#00d4ff]' : 'text-[#e2e8f0]'
                        }`}
                      >
                        {comp.name}
                      </h4>
                      <span className="text-[10px] font-mono text-[#7B7672] shrink-0">
                        {comp.stageTemp.split(' ')[0]}
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-[#7B7672] block mt-0.5 truncate">
                      {comp.category}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Scientific Subsystem Inspection Panel */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSubsystem.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
              >
                <GlassCard className="p-7 sm:p-8 space-y-6 border border-[#00d4ff]/30 shadow-[0_0_40px_rgba(0,212,255,0.1)]">
                  {/* Header */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/[0.08]">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="cyan">{selectedSubsystem.category}</Badge>
                        <span className="text-xs font-mono text-[#00d4ff] font-semibold">
                          {selectedSubsystem.stageTemp}
                        </span>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold text-[#e2e8f0]">
                        {selectedSubsystem.name}
                      </h3>
                    </div>
                    <StatusBadge status={selectedSubsystem.status} />
                  </div>

                  {/* Purpose & Principle */}
                  <div className="space-y-4 text-xs sm:text-sm">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B7672] block mb-1">
                        Engineering Purpose:
                      </span>
                      <p className="text-[#e2e8f0] leading-relaxed">
                        {selectedSubsystem.purpose}
                      </p>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B7672] block mb-1">
                        Scientific Operating Principle:
                      </span>
                      <p className="text-[#94a3b8] leading-relaxed">
                        {selectedSubsystem.principle}
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-[#d367c4] block mb-1">
                        Why It Is Critical for Quantum Computing:
                      </span>
                      <p className="text-[#dadce0] leading-relaxed">
                        {selectedSubsystem.importance}
                      </p>
                    </div>
                  </div>

                  {/* Engineering Specifications Grid */}
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#7B7672] block mb-3">
                      Subsystem Technical Specifications:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {selectedSubsystem.specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="p-3 rounded-lg bg-black/40 border border-white/[0.06] font-mono text-xs"
                        >
                          <span className="text-[10px] text-[#7B7672] block uppercase mb-0.5">
                            {spec.label}
                          </span>
                          <span className="text-[#00d4ff] font-semibold">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── Section 3: Deep Technical Visual Gallery ── */}
      <Section id="visual-architecture">
        <SectionHeader
          label="Physical Realization"
          title="Cryogenic Hardware & Instrumentation Visualizer"
          description="Inspect high-fidelity illustrative visualizations of core laboratory subsystems."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {/* Card 1: Dilution Refrigerator Core */}
          <GlassCard className="p-5 flex flex-col justify-between group">
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 border border-white/[0.08]">
              <Image
                src="/images/labs/dilution_refrigerator.jpg"
                alt="Research-grade dilution refrigerator with golden OFHC copper stages and cryogenic coaxial lines"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded text-[10px] font-mono text-[#00d4ff] border border-[#00d4ff]/30">
                15 mK Dilution Column
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#e2e8f0] mb-1">
                Multi-Stage Dilution Refrigerator
              </h4>
              <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">
                Gold-plated OFHC copper stages interconnected with silver-sintered heat exchangers and semi-rigid coaxial looms, sustaining sub-Kelvin operation.
              </p>
              <button
                onClick={() =>
                  setActiveModalImage({
                    src: '/images/labs/dilution_refrigerator.jpg',
                    title: 'Multi-Stage Dilution Refrigerator',
                    desc: 'Detailed view of the open dilution refrigerator column showcasing gold-plated thermal radiation baffles, continuous helium condensation coils, and microwave attenuator mounts.',
                  })
                }
                className="text-xs font-mono text-[#00d4ff] hover:text-[#e2e8f0] flex items-center gap-1 transition-colors"
              >
                <span>Inspect High-Res Cryostat</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </GlassCard>

          {/* Card 2: Quantum Processor Chamber */}
          <GlassCard className="p-5 flex flex-col justify-between group">
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 border border-white/[0.08]">
              <Image
                src="/images/labs/quantum_processor_chamber.jpg"
                alt="Superconducting quantum processor chip mounted in gold-plated microwave cavity package"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded text-[10px] font-mono text-[#d367c4] border border-[#d367c4]/30">
                Planar QPU Die Package
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#e2e8f0] mb-1">
                Quantum Processor Chamber &amp; Cavity
              </h4>
              <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">
                Microfabricated superconducting transmon circuit mounted inside a sealed microwave cavity designed to suppress purcell decay and spurious resonant modes.
              </p>
              <button
                onClick={() =>
                  setActiveModalImage({
                    src: '/images/labs/quantum_processor_chamber.jpg',
                    title: 'Quantum Processor Chamber & Cavity',
                    desc: 'Microscopic inspection of the superconducting qubit package with wire-bonded coplanar waveguide feedlines, Josephson junction loops, and gold cavity walls.',
                  })
                }
                className="text-xs font-mono text-[#00d4ff] hover:text-[#e2e8f0] flex items-center gap-1 transition-colors"
              >
                <span>Inspect QPU Package</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </GlassCard>

          {/* Card 3: Control Electronics Suite */}
          <GlassCard className="p-5 flex flex-col justify-between group">
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 border border-white/[0.08]">
              <Image
                src="/images/labs/quantum_control_electronics.jpg"
                alt="19-inch laboratory server racks with multi-channel arbitrary waveform generators and microwave synthesizers"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded text-[10px] font-mono text-[#34d399] border border-[#34d399]/30">
                5 GSPS AWG Control Racks
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#e2e8f0] mb-1">
                Microwave &amp; RF Control Systems
              </h4>
              <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">
                High-speed digital-to-analog converters and vector signal generators delivering synchronized nanosecond pulses for single-qubit rotations and flux tuning.
              </p>
              <button
                onClick={() =>
                  setActiveModalImage({
                    src: '/images/labs/quantum_control_electronics.jpg',
                    title: 'Microwave & RF Control Systems',
                    desc: 'Precision 19-inch instrumentation racks housing multi-channel AWGs, phase-locked synthesizers, and real-time FPGA controllers with sub-10 ps synchronization.',
                  })
                }
                className="text-xs font-mono text-[#00d4ff] hover:text-[#e2e8f0] flex items-center gap-1 transition-colors"
              >
                <span>Inspect Control Racks</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </GlassCard>

          {/* Card 4: Vibration & RF Shielding */}
          <GlassCard className="p-5 flex flex-col justify-between group">
            <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden mb-4 border border-white/[0.08]">
              <Image
                src="/images/labs/vibration_rf_shielding.jpg"
                alt="Cutaway visualization of multi-layer Mu-metal magnetic shield, superconducting can, and active vibration isolation table"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute top-2 left-2 bg-black/80 px-2 py-1 rounded text-[10px] font-mono text-[#f59e0b] border border-[#f59e0b]/30">
                Multi-Layer Mu-Metal Isolation
              </div>
            </div>
            <div>
              <h4 className="text-base font-bold text-[#e2e8f0] mb-1">
                Vibration Isolation &amp; Magnetic Shielding
              </h4>
              <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">
                Active pneumatic optical tables and concentric Mu-metal / superconducting lead shielding deflect magnetic flux and seismic vibrations away from the qubits.
              </p>
              <button
                onClick={() =>
                  setActiveModalImage({
                    src: '/images/labs/vibration_rf_shielding.jpg',
                    title: 'Vibration Isolation & Magnetic Shielding',
                    desc: 'Cutaway technical schematic showing outer high-permeability Mu-metal cylinders, inner cryogenic superconducting shield, and pneumatic self-leveling air springs.',
                  })
                }
                className="text-xs font-mono text-[#00d4ff] hover:text-[#e2e8f0] flex items-center gap-1 transition-colors"
              >
                <span>Inspect Shielding Model</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </GlassCard>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── Section 4: 6-Step Quantum Laboratory Workflow ── */}
      <Section id="workflow">
        <SectionHeader
          label="Experimental Protocol"
          title="Daily Quantum Laboratory Research Workflow"
          description="The systematic experimental cycle required to cool, calibrate, and execute algorithms on a physical quantum processor."
        />

        <div className="max-w-5xl mx-auto space-y-4">
          {LAB_WORKFLOW_STEPS.map((wf) => (
            <GlassCard key={wf.step} className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-12 h-12 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center font-mono text-base font-bold text-[#00d4ff] shrink-0">
                {wf.step}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                  <h4 className="text-base font-bold text-[#e2e8f0]">{wf.title}</h4>
                  <span className="text-xs font-mono text-[#00d4ff] px-2 py-0.5 rounded bg-[#00d4ff]/10 border border-[#00d4ff]/20">
                    {wf.duration}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">{wf.desc}</p>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── Section 5: Full Engineering Specification Matrix ── */}
      <Section id="specifications">
        <SectionHeader
          label="Engineering Metrics"
          title="Laboratory Technical Specification Matrix"
          description="Detailed operational parameters, thermal limits, and fidelity benchmarks."
        />

        <div className="max-w-5xl mx-auto overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-white/[0.04] border-b border-white/[0.08] text-[#7B7672] uppercase text-[10px]">
                <tr>
                  <th className="p-4">Subsystem Domain</th>
                  <th className="p-4">Engineering Parameter</th>
                  <th className="p-4">Operating Value</th>
                  <th className="p-4 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.04] text-[#e2e8f0]">
                {TECHNICAL_SPEC_MATRIX.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="p-4 text-[#00d4ff] font-semibold">{item.system}</td>
                    <td className="p-4 text-[#dadce0]">{item.metric}</td>
                    <td className="p-4 text-[#34d399] font-medium">{item.value}</td>
                    <td className="p-4 text-right">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-white/[0.05] text-[#7B7672] border border-white/[0.08]">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── Section 6: Future Cryogenic Scaling Infrastructure ── */}
      <Section id="future-scaling">
        <SectionHeader
          label="Next-Gen Architecture"
          title="Future Scaling &amp; Modular Cryogenic Infrastructure"
          description="Engineering solutions for scaling superconducting quantum systems from hundreds to thousands of physical qubits."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <GlassCard className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center text-[#00d4ff]">
              <Cpu className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#e2e8f0]">Cryo-CMOS On-Chip Controllers</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Replacing thousands of coaxial wires with custom silicon CMOS control chips operating directly at the 4K and 100mK stages to synthesize pulses on-chip and eliminate heat load bottlenecks.
            </p>
            <Badge variant="muted">FUTURE RESEARCH</Badge>
          </GlassCard>

          <GlassCard className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#d367c4]/10 border border-[#d367c4]/30 flex items-center justify-center text-[#d367c4]">
              <Workflow className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#e2e8f0]">Cryogenic Microwave Waveguide Links</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Low-loss superconducting microwave waveguide links operating at 15 mK to interconnect separate dilution refrigerators, enabling modular multi-QPU distributed quantum architectures.
            </p>
            <Badge variant="muted">PLANNED CONCEPT</Badge>
          </GlassCard>

          <GlassCard className="p-6 space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/10 border border-[#7c3aed]/30 flex items-center justify-center text-[#7c3aed]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-[#e2e8f0]">Automated Multi-Wafer Cryo-Probers</h4>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Robotic 4K wafer-scale probe stations for high-throughput screening of Josephson junction critical currents, resonance frequencies, and dielectric quality before full 15 mK packaging.
            </p>
            <Badge variant="muted">PROPOSED ROADMAP</Badge>
          </GlassCard>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── Section 7: Action CTA to Other Interactive Areas ── */}
      <Section className="py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <Badge variant="cyan">Explore Other Environments</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#e2e8f0]">
            Continue Exploring the SHIELD Quantum Platform
          </h2>
          <p className="text-base text-[#94a3b8] leading-relaxed">
            Test quantum gate sequences in the circuit simulator, tour the quantum photonics laboratory, or read technical articles in the Knowledge Library.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Button variant="primary" href="/simulator" icon={<Cpu className="w-4 h-4" />}>
              Open Circuit Simulator
            </Button>
            <Button variant="secondary" href="/labs/photonics" icon={<Radio className="w-4 h-4" />}>
              Quantum Photonics Lab
            </Button>
            <Button variant="outline" href="/knowledge">
              Knowledge Library
            </Button>
          </div>
        </div>
      </Section>

      {/* ── Modal for High-Resolution Image Inspection ── */}
      <AnimatePresence>
        {activeModalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl"
            onClick={() => setActiveModalImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full bg-[#202124] rounded-2xl border border-[#00d4ff]/40 p-6 overflow-hidden shadow-[0_0_80px_rgba(0,212,255,0.25)]"
            >
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.1] mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00d4ff] animate-pulse" />
                  <h3 className="text-lg font-bold text-[#e2e8f0] font-mono">
                    {activeModalImage.title}
                  </h3>
                </div>
                <button
                  onClick={() => setActiveModalImage(null)}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#7B7672] hover:text-[#e2e8f0] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/[0.08] mb-4">
                <Image
                  src={activeModalImage.src}
                  alt={activeModalImage.title}
                  fill
                  className="object-cover"
                />
              </div>

              <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                {activeModalImage.desc}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
