'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  Cpu,
  Layers,
  Thermometer,
  Zap,
  Activity,
  ShieldCheck,
  Radio,
  Sparkles,
  ArrowRight,
  FlaskConical,
  Gauge,
  CheckCircle2,
} from 'lucide-react';
import { Section, SectionHeader, GlassCard, Badge, Button, StatusBadge } from '@/components/ui';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };

const hardwareModalities = [
  {
    name: 'Superconducting Transmon Qubits',
    desc: 'Planar superconducting LC oscillators with Josephson junction non-linear inductors. High gate speeds (10–30 ns), scalable 2D grid coupling, and mature lithographic fabrication.',
    status: 'ACTIVE',
    temp: '14.8 mK',
    coherence: '80–140 μs',
    gateSpeed: '10–30 ns',
    fidelity1Q: '99.94%',
    fidelity2Q: '99.50%',
    connectivity: 'Nearest Neighbor (Square / Hexagonal)',
  },
  {
    name: 'Trapped-Ion Processors',
    desc: 'Individual ytterbium or calcium ions trapped in RF Paul traps, manipulated with focused UV laser pulses. All-to-all connectivity with near-zero idle decoherence.',
    status: 'RESEARCH',
    temp: '~10 μK / Room Base',
    coherence: '1–10 s',
    gateSpeed: '10–100 μs',
    fidelity1Q: '99.99%',
    fidelity2Q: '99.80%',
    connectivity: 'All-to-All (Shuttle-based)',
  },
  {
    name: 'Neutral Atom Arrays',
    desc: 'Rubidium or cesium atoms held in reconfigurable optical tweezer arrays. Strong Rydberg state interactions provide dynamic multi-qubit entanglement.',
    status: 'RESEARCH',
    temp: '~1–10 μK',
    coherence: '~1–3 s',
    gateSpeed: '100–500 ns',
    fidelity1Q: '99.90%',
    fidelity2Q: '99.20%',
    connectivity: 'Reconfigurable 2D/3D',
  },
  {
    name: 'Integrated Quantum Photonics',
    desc: 'Qubits encoded into polarization, path, or time-bin states of single photons. Room-temperature operation with natural quantum network interconnect capabilities.',
    status: 'RESEARCH',
    temp: 'Room / 4K Detectors',
    coherence: 'Flying Qubits',
    gateSpeed: 'Sub-nanosecond',
    fidelity1Q: '99.80%',
    fidelity2Q: '98.50%',
    connectivity: 'Waveguide Mesh (Interferometer)',
  },
  {
    name: 'Silicon Spin Qubits',
    desc: 'Individual electron or hole spins trapped in silicon-germanium (Si/SiGe) quantum dots. Ultra-compact footprint leveraging existing semiconductor foundry tooling.',
    status: 'CONCEPT',
    temp: '~100 mK',
    coherence: '~1–10 ms',
    gateSpeed: '10–50 ns',
    fidelity1Q: '99.85%',
    fidelity2Q: '98.80%',
    connectivity: 'Nearest Neighbor',
  },
];

const cryogenicChamberStages = [
  {
    stage: 'Vacuum Flange (300 K)',
    temp: '295 K',
    pressure: '10⁻⁸ mbar',
    components: 'Hermetic SMA microwave feedthroughs, optical vacuum windows, pre-pump manifold.',
    purpose: 'Atmospheric seal and ambient signal routing.',
  },
  {
    stage: '50K Radiation Shield',
    temp: '50 K',
    pressure: 'Cryopumped',
    components: 'Gold-plated OFHC copper heat shield, Pulse Tube Stage 1 heat exchanger.',
    purpose: 'Intercepts room-temperature blackbody thermal radiation.',
  },
  {
    stage: '4K Condenser Stage',
    temp: '3.8 K',
    pressure: 'Ultra-High Vacuum',
    components: '20 dB Cryo Attenuators, HEMT low-noise amplifiers, superconducting NbTi coax lines.',
    purpose: 'Thermalizes incoming microwave control signals and isolates QPU back-action.',
  },
  {
    stage: 'Still Distillation Chamber',
    temp: '800 mK',
    pressure: 'Closed Cycle',
    components: 'Helium-3 vapor extraction evaporator and radiation baffle.',
    purpose: 'Drives continuous ³He distillation in the dilution refrigeration loop.',
  },
  {
    stage: '100mK Cold Plate',
    temp: '100 mK',
    pressure: 'Step Exchangers',
    components: 'Silver-sinter heat exchangers, 10 dB attenuators, copper-powder filters.',
    purpose: 'Pre-cools circulating helium mixture via counterflow heat exchange.',
  },
  {
    stage: 'Mixing Chamber & QPU Core',
    temp: '14.8 mK',
    pressure: 'Base Temperature',
    components: 'Mu-metal magnetic shield, superconducting Al shield, Josephson Parametric Amplifiers (JPA).',
    purpose: 'Houses the quantum processor chip in absolute thermal and electromagnetic isolation.',
  },
];

export default function HardwarePage() {
  return (
    <>
      {/* Hero Header */}
      <Section className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="cyan" className="mb-4">Physical Quantum Stack</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#e2e8f0]">
            Quantum{' '}
            <span className="bg-gradient-to-r from-[#00d4ff] via-[#d367c4] to-[#7c3aed] bg-clip-text text-transparent">
              Hardware Architecture
            </span>
          </h1>
          <p className="mt-6 text-lg text-[#94a3b8] max-w-3xl mx-auto leading-relaxed">
            The physical realization of quantum advantage requires extreme precision across cryogenic physics, microwave engineering, low-noise amplification, and microfabricated superconducting planar circuits.
          </p>
        </div>
      </Section>

      <div className="section-divider" />

      {/* Hardware Modalities Comparison */}
      <Section id="modalities">
        <SectionHeader
          label="Qubit Physics"
          title="Hardware Modalities & Benchmarks"
          description="Detailed technical comparison of contemporary quantum computational platforms."
        />

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto mb-12"
        >
          {hardwareModalities.map((mod) => (
            <motion.div key={mod.name} variants={fadeIn}>
              <GlassCard hover glow="cyan" className="p-7 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <h3 className="text-lg font-bold text-[#e2e8f0]">{mod.name}</h3>
                    <StatusBadge status={mod.status} />
                  </div>
                  <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed mb-6">
                    {mod.desc}
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/[0.06] text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] text-[#7B7672] uppercase block">Operating Temp</span>
                    <span className="text-[#00d4ff] font-semibold">{mod.temp}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] text-[#7B7672] uppercase block">Coherence T₂</span>
                    <span className="text-[#d367c4] font-semibold">{mod.coherence}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] text-[#7B7672] uppercase block">Gate Speed</span>
                    <span className="text-[#34d399] font-semibold">{mod.gateSpeed}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] text-[#7B7672] uppercase block">1Q Fidelity</span>
                    <span className="text-[#00d4ff] font-semibold">{mod.fidelity1Q}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] text-[#7B7672] uppercase block">2Q Fidelity</span>
                    <span className="text-[#fbbf24] font-semibold">{mod.fidelity2Q}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                    <span className="text-[10px] text-[#7B7672] uppercase block">Connectivity</span>
                    <span className="text-[#dadce0] font-semibold truncate">{mod.connectivity}</span>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      <div className="section-divider" />

      {/* Cryogenic Processor Chamber & Dilution Staging */}
      <Section id="cryogenics">
        <SectionHeader
          label="Thermal Architecture"
          title="Cryogenic Dilution Chamber Stages"
          description="Thermodynamic staging in the dilution refrigerator from room temperature down to 15 millikelvin."
        />

        <div className="max-w-5xl mx-auto space-y-4">
          {cryogenicChamberStages.map((stg, idx) => (
            <GlassCard key={stg.stage} className="p-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center font-mono text-xs font-bold text-[#00d4ff]">
                    0{idx + 1}
                  </div>
                  <h4 className="text-base font-semibold text-[#e2e8f0]">{stg.stage}</h4>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs">
                  <span className="px-2.5 py-1 rounded bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/20">
                    {stg.temp}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-white/5 text-[#7B7672] border border-white/10">
                    {stg.pressure}
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#94a3b8] pt-3 border-t border-white/[0.06]">
                <div>
                  <span className="text-[#7B7672] font-mono uppercase block mb-1">Key Components:</span>
                  <span>{stg.components}</span>
                </div>
                <div>
                  <span className="text-[#7B7672] font-mono uppercase block mb-1">Engineering Purpose:</span>
                  <span>{stg.purpose}</span>
                </div>
              </div>
            </GlassCard>
          ))}
        </div>
      </Section>

      <div className="section-divider" />

      {/* Callouts to Interactive Lab Tools */}
      <Section className="py-20 text-center">
        <div className="max-w-3xl mx-auto">
          <Badge variant="cyan" className="mb-4">Interactive Laboratory Suite</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#e2e8f0]">
            Inspect Physical Hardware in 3D
          </h2>
          <p className="mt-4 text-base text-[#94a3b8] leading-relaxed">
            Tour the dilution refrigerator in our 3D Cryogenic Lab or build and test quantum circuits in the browser simulator.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" href="/labs/cryogenic" icon={<FlaskConical className="w-4 h-4" />}>
              Open Cryogenic Lab
            </Button>
            <Button variant="secondary" href="/labs/photonics" icon={<Radio className="w-4 h-4" />}>
              Quantum Photonics Lab
            </Button>
            <Button variant="outline" href="/simulator">
              Circuit Simulator
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
