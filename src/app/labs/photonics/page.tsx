'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Radio,
  Zap,
  Maximize2,
  ArrowRight,
  Activity,
  Info,
  X,
  Sparkles,
  Sliders,
  Workflow,
} from 'lucide-react';
import { Section, SectionHeader, GlassCard } from '@/components/ui';

interface OpticalComponent {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  caption: string;
  purpose: string;
  physicsPrinciple: string;
  equations?: string;
  specifications: { label: string; value: string }[];
  challenges: string[];
  x: number; // percentage coordinates on breadboard schematic
  y: number;
}

const OPTICAL_COMPONENTS: OpticalComponent[] = [
  {
    id: 'laser-source',
    name: 'Coherent Laser & Optical Frequency Comb',
    category: 'Photon Generation',
    imageUrl: '/images/photonics/optical_table_breadboard.jpg',
    caption: 'Ultra-Narrow Linewidth Laser & Frequency-Referenced Optical Source',
    purpose:
      'Provides high-coherence, single-frequency continuous-wave and mode-locked pump photons to drive non-linear quantum optics experiments.',
    physicsPrinciple:
      'Stimulated emission in an optical cavity with Pound-Drever-Hall (PDH) frequency stabilization to an ultra-low expansion (ULE) reference cavity yields sub-Hz linewidths and attosecond timing synchronization.',
    equations: 'E(t) = E_0 e^{i(\\omega_0 t + \\phi(t))}, \\quad \\Delta \\nu < 1\\text{ Hz}',
    specifications: [
      { label: 'Operating Wavelengths', value: '375 nm, 405 nm, 780 nm, 810 nm, 1550 nm' },
      { label: 'Linewidth (Optical Lock)', value: '< 1 Hz with ULE Cavity Reference' },
      { label: 'Relative Intensity Noise (RIN)', value: '< -130 dB/Hz @ 100 kHz' },
      { label: 'Spatial Mode', value: 'TEM₀₀ Single Transverse Mode (M² < 1.1)' },
    ],
    challenges: ['Thermal frequency drift', 'Phase noise suppression', 'Cavity acoustic isolation'],
    x: 8,
    y: 65,
  },
  {
    id: 'bbo-crystal',
    name: 'BBO Non-Linear Entanglement Crystal',
    category: 'Entanglement Synthesis',
    imageUrl: '/images/photonics/photonic_quantum_experiment.jpg',
    caption: 'Spontaneous Parametric Down-Conversion (SPDC) Crystal Stage',
    purpose:
      'Converts high-energy pump photons into pairs of time-energy and polarization-entangled signal and idler photons.',
    physicsPrinciple:
      'Second-order optical non-linearity χ⁽²⁾ in Beta-Barium Borate (β-BaB₂O₄) satisfies energy conservation (ω_p = ω_s + ω_i) and phase-matching momentum conditions (k_p = k_s + k_i) to emit non-classical Bell states.',
    equations: '|\\Psi^+\\rangle = \\frac{1}{\\sqrt{2}}(|H\\rangle_s |V\\rangle_i + |V\\rangle_s |H\\rangle_i)',
    specifications: [
      { label: 'Phase Matching Type', value: 'Type-II Non-Collinear SPDC' },
      { label: 'Pair Generation Rate', value: '> 10⁶ pairs / second / mW' },
      { label: 'Entanglement Bell Fidelity', value: 'F > 0.985' },
      { label: 'Signal / Idler Wavelength', value: '810 nm / 810 nm (from 405 nm pump)' },
    ],
    challenges: ['Spatial walk-off compensation', 'Spectral filtering bandwidth', 'Multi-pair emission suppression'],
    x: 25,
    y: 50,
  },
  {
    id: 'beam-splitter',
    name: 'Polarizing & Non-Polarizing Beam Splitters',
    category: 'Beam Control & Superposition',
    imageUrl: '/images/photonics/laser_beam_splitter.jpg',
    caption: 'Precision Dielectric Polarizing Beam Splitter (PBS) Cube',
    purpose:
      'Splits coherent beams and single-photon wavepackets into spatial superposition paths or separates orthogonal polarization modes (H/V).',
    physicsPrinciple:
      'Multi-layer dielectric interference coatings transmit p-polarized light (T_p > 99%) while reflecting s-polarized light (R_s > 99.5%), creating unitary path transformations: |H⟩ → |path₁⟩, |V⟩ → |path₂⟩.',
    equations: 'U_{BS} = \\frac{1}{\\sqrt{2}} \\begin{pmatrix} 1 & i \\\\ i & 1 \\end{pmatrix}',
    specifications: [
      { label: 'Extinction Ratio', value: 'T_p : T_s > 1000:1' },
      { label: 'Wavefront Distortion', value: '< λ/10 @ 633 nm' },
      { label: 'Surface Quality', value: '10-5 Scratch-Dig Laser Grade' },
      { label: 'Insertion Loss', value: '< 0.2%' },
    ],
    challenges: ['Polarization leakage', 'Thermal birefringence', 'Dielectric coating damage threshold'],
    x: 45,
    y: 42,
  },
  {
    id: 'interferometer',
    name: 'Mach-Zehnder Interferometer & EOM',
    category: 'Quantum Interference & Phase Modulation',
    imageUrl: '/images/photonics/optical_interferometer.jpg',
    caption: 'Mach-Zehnder Interferometer with Electro-Optic Phase Modulator (EOM)',
    purpose:
      'Creates quantum interference between coherent optical paths and applies programmable phase shifts φ(V) corresponding to single-qubit unitary rotations.',
    physicsPrinciple:
      'Pockels electro-optic effect in Lithium Niobate (LiNbO₃) alters the refractive index Δn ∝ E, shifting the relative phase between paths to modulate constructive and destructive interference probabilities.',
    equations: 'I(\\Delta\\phi) = I_0 \\cos^2\\left(\\frac{\\Delta\\phi}{2}\\right), \\quad \\Delta\\phi = \\frac{\\pi V}{V_\\pi}',
    specifications: [
      { label: 'Modulation Bandwidth', value: 'DC to 20 GHz' },
      { label: 'Half-Wave Voltage (V_π)', value: '3.2 V @ 1550 nm' },
      { label: 'Interference Fringe Visibility', value: 'V > 99.2%' },
      { label: 'Phase Stability', value: '< 1 mrad / hour (Active Feedback Locked)' },
    ],
    challenges: ['Active path-length drift', 'Vibration phase jitter', 'Thermal stabilization of EOM'],
    x: 62,
    y: 35,
  },
  {
    id: 'optical-fiber',
    name: 'Polarization-Maintaining Quantum Optical Fiber',
    category: 'Waveguide & Mode Transport',
    imageUrl: '/images/photonics/quantum_optical_fiber.jpg',
    caption: 'Single-Mode Polarization-Maintaining (PM) Optical Fiber Interconnect',
    purpose:
      'Guides single-photon wavepackets between table components and external quantum communication channels without spatial mode degradation.',
    physicsPrinciple:
      'Total internal reflection within a single-mode silica core (MFD ≈ 5 µm) combined with stress-induced birefringence preserves orthogonal polarization axes (slow/fast) over tens of meters.',
    equations: 'NA = \\sqrt{n_{core}^2 - n_{cladding}^2}, \\quad L_b = \\frac{\\lambda}{\\Delta n_{eff}}',
    specifications: [
      { label: 'Attenuation @ 1550 nm', value: '< 0.18 dB / km' },
      { label: 'Polarization Crosstalk', value: '< -30 dB per 100 m' },
      { label: 'Numerical Aperture (NA)', value: '0.12 ± 0.01' },
      { label: 'Connector Termination', value: 'FC/APC (Angle Polished, Return Loss > 65 dB)' },
    ],
    challenges: ['Polarization mode dispersion (PMD)', 'Fiber coupling insertion loss', 'Temperature-induced phase shifts'],
    x: 75,
    y: 55,
  },
  {
    id: 'spad-detector',
    name: 'Single-Photon Avalanche Diodes & SNSPDs',
    category: 'Photon Detection & Counting',
    imageUrl: '/images/photonics/single_photon_detector.jpg',
    caption: 'Single-Photon Avalanche Diode (SPAD) & TCSPC Counting Electronics',
    purpose:
      'Detects individual incident photons with picosecond timing resolution and outputs discrete digital TTL/NIM pulses for coincidence analysis.',
    physicsPrinciple:
      'Reverse-biased p-n junction operating above breakdown voltage (Geiger mode) or Superconducting Nanowire (SNSPD at 2 K) creates an avalanche cascade upon absorbing a single photon, breaking superconductivity to generate a measurable voltage spike.',
    equations: 'G_{avalanche} > 10^6, \\quad \\text{Jitter } \\sigma_t < 15\\text{ ps}',
    specifications: [
      { label: 'Single-Photon Detection Efficiency (SDE)', value: '> 85% @ 810 nm / > 90% @ 1550 nm (SNSPD)' },
      { label: 'Dark Count Rate (DCR)', value: '< 10 counts / second (Cryo Cooled)' },
      { label: 'Timing Jitter (FWHM)', value: '< 15 ps (SNSPD) / < 150 ps (SPAD)' },
      { label: 'Afterpulsing Probability', value: '< 0.1%' },
    ],
    challenges: ['Dead time saturation at high rates', 'Cryogenic cooling requirements for SNSPDs', 'Dark count minimization'],
    x: 88,
    y: 40,
  },
];

const PHOTONICS_GALLERY = [
  {
    id: 'gal-1',
    title: 'Quantum Photonics Research Laboratory Complex',
    category: 'Laboratory Architecture',
    imageUrl: '/images/photonics/photonics_lab_wide.jpg',
    caption: 'Cleanroom Optical Table Array & Precision Instrumentation Racks',
    description:
      'Panoramic view of the quantum photonics research cleanroom, housing vibration-isolated optical tables, laser frequency stabilization electronics, and fiber management bays.',
  },
  {
    id: 'gal-2',
    title: 'Precision Optical Breadboard & Mount Array',
    category: 'Optomechanical Assembly',
    imageUrl: '/images/photonics/optical_table_breadboard.jpg',
    caption: 'Precision Stainless Steel Kinematic Mounts & Dielectric Mirrors',
    description:
      'High-density optical breadboard layout featuring half-wave plate rotators, iris diaphragms, and BBO non-linear crystal mounts illuminated by coherent laser paths.',
  },
  {
    id: 'gal-3',
    title: 'Laser Beam Division at Polarizing Beam Splitter',
    category: 'Beam Dynamics',
    imageUrl: '/images/photonics/laser_beam_splitter.jpg',
    caption: 'Coherent Beam Splitting at Dielectric 45° Interface',
    description:
      'Close-up photograph of a laser beam entering a polarizing beam splitter cube, dividing cleanly into transmitted horizontal and reflected vertical components.',
  },
  {
    id: 'gal-4',
    title: 'Mach-Zehnder Interferometer & EOM Phase Control',
    category: 'Quantum Interference',
    imageUrl: '/images/photonics/optical_interferometer.jpg',
    caption: 'Dual-Arm Interferometer Loop with High-Speed Electro-Optic Modulator',
    description:
      'Experimental interferometer testbed demonstrating spatial path recombination and fringe visibility optimization via electro-optic phase modulation.',
  },
  {
    id: 'gal-5',
    title: 'Single-Photon Avalanche Detector & TCSPC Station',
    category: 'Measurement Electronics',
    imageUrl: '/images/photonics/single_photon_detector.jpg',
    caption: 'Time-Correlated Single-Photon Counting & Oscilloscope Diagnostics',
    description:
      'Single-photon detection station displaying nanosecond voltage pulses generated from discrete photon absorption events over fiber-optic feedthroughs.',
  },
  {
    id: 'gal-6',
    title: 'Quantum Optical Fiber Photon Transport',
    category: 'Photonic Waveguides',
    imageUrl: '/images/photonics/quantum_optical_fiber.jpg',
    caption: 'Single-Mode Wavepacket Propagation via Total Internal Reflection',
    description:
      'Conceptual macro visualization of photonic qubits propagating through a low-loss single-mode silica fiber core with preserved polarization fidelity.',
  },
  {
    id: 'gal-7',
    title: 'Complete Entangled Photon Experiment Architecture',
    category: 'Experimental Workflow',
    imageUrl: '/images/photonics/photonic_quantum_experiment.jpg',
    caption: 'SPDC Entangled Pair Source, Dual-Arm Interferometer & Twin APD Detectors',
    description:
      'End-to-end experimental setup illustrating pump beam propagation, BBO parametric down-conversion into signal/idler pairs, and coincidence detection.',
  },
];

export default function PhotonicsLabPage() {
  const [selectedComponent, setSelectedComponent] = useState<OpticalComponent>(OPTICAL_COMPONENTS[0]);
  const [activeModalImage, setActiveModalImage] = useState<typeof PHOTONICS_GALLERY[0] | null>(null);

  return (
    <div className="relative min-h-screen">
      {/* ── Ambient Laboratory Backdrop ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 filter brightness-75 contrast-125"
          style={{ backgroundImage: "url('/images/photonics/photonics_lab_wide.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#202124]/95 via-[#202124]/85 to-[#202124]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#202124_75%)]" />
        <div className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full bg-[#00d4ff]/10 blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-[#d367c4]/10 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* ── Section 1: Hero & Engine Status ── */}
        <Section className="pt-24 pb-8">
          <div className="max-w-5xl mx-auto text-center space-y-5">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-xs font-mono text-[#00d4ff]">
                <Radio className="w-4 h-4 text-[#00d4ff] animate-pulse" />
                <span>SHIELD QUANTUM MACHINE AND TECHNOLOGY</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-xs font-mono text-[#10b981]">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span>OPTICAL BENCH ONLINE</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#e2e8f0]">
              Quantum Photonics &amp;{' '}
              <span className="bg-gradient-to-r from-[#00d4ff] via-[#d367c4] to-[#7c3aed] bg-clip-text text-transparent">
                Optical Bench Lab
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#94a3b8] max-w-3xl mx-auto leading-relaxed">
              Interactive precision quantum optics laboratory. Explore spontaneous parametric down-conversion (SPDC), polarization-state manipulation, Mach-Zehnder interferometry, and single-photon avalanche detection.
            </p>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#7B7672]">
              <Info className="w-4 h-4 text-[#00d4ff] shrink-0" />
              <span>Conceptual Scientific Visualization • Precision Optomechanics &amp; Quantum Optics</span>
            </div>
          </div>
        </Section>

        <div className="section-divider" />

        {/* ── Section 2: Interactive Optical Breadboard Workbench ── */}
        <Section className="py-12">
          <div className="max-w-7xl mx-auto space-y-8">
            <SectionHeader
              label="INTERACTIVE VIRTUAL TESTBED"
              title="Optical Breadboard &amp; Experiment Explorer"
              description="Click on any optical component in the schematic below to inspect its operational principles, physical equations, and laboratory specifications."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Interactive Schematic Canvas */}
              <div className="lg:col-span-7 space-y-4">
                <GlassCard className="p-6 relative overflow-hidden border-white/[0.08]">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono text-[#00d4ff] tracking-wider uppercase flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Optical Table Layout (SPDC &amp; Interferometer)</span>
                    </span>
                    <span className="text-[11px] font-mono text-[#7B7672]">Select component to inspect</span>
                  </div>

                  {/* SVG Breadboard Schematic */}
                  <div className="relative aspect-[16/10] w-full rounded-xl bg-black/60 border border-white/10 overflow-hidden p-2">
                    {/* Grid Pattern */}
                    <div
                      className="absolute inset-0 opacity-20 pointer-events-none"
                      style={{
                        backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                    />

                    {/* Beam Paths (SVG) */}
                    <svg viewBox="0 0 100 80" className="w-full h-full relative z-10">
                      {/* Laser pump beam (Purple UV) */}
                      <line x1="14" y1="65" x2="25" y2="50" stroke="#a855f7" strokeWidth="0.8" strokeDasharray="2,1" className="animate-pulse" />
                      {/* Signal Beam (Cyan) */}
                      <line x1="25" y1="50" x2="45" y2="42" stroke="#00d4ff" strokeWidth="0.8" />
                      <line x1="45" y1="42" x2="62" y2="35" stroke="#00d4ff" strokeWidth="0.8" />
                      <line x1="62" y1="35" x2="75" y2="55" stroke="#00d4ff" strokeWidth="0.8" />
                      <line x1="75" y1="55" x2="88" y2="40" stroke="#00d4ff" strokeWidth="0.8" />

                      {/* Idler Beam (Magenta) */}
                      <line x1="25" y1="50" x2="45" y2="55" stroke="#d367c4" strokeWidth="0.8" strokeDasharray="1.5,1.5" />
                      <line x1="45" y1="55" x2="75" y2="65" stroke="#d367c4" strokeWidth="0.8" strokeDasharray="1.5,1.5" />
                      <line x1="75" y1="65" x2="88" y2="45" stroke="#d367c4" strokeWidth="0.8" strokeDasharray="1.5,1.5" />

                      {/* Component Nodes */}
                      {OPTICAL_COMPONENTS.map((comp) => {
                        const isSelected = selectedComponent.id === comp.id;
                        return (
                          <g
                            key={comp.id}
                            className="cursor-pointer group"
                            onClick={() => setSelectedComponent(comp)}
                          >
                            <circle
                              cx={comp.x}
                              cy={comp.y}
                              r={isSelected ? 5.5 : 4.5}
                              className={`transition-all duration-300 ${
                                isSelected
                                  ? 'fill-[#00d4ff]/30 stroke-[#00d4ff] stroke-[1.2]'
                                  : 'fill-black/80 stroke-white/30 hover:stroke-[#00d4ff]/70 stroke-[0.8]'
                              }`}
                            />
                            <circle
                              cx={comp.x}
                              cy={comp.y}
                              r="1.8"
                              className={isSelected ? 'fill-[#00d4ff]' : 'fill-[#94a3b8]'}
                            />
                            <text
                              x={comp.x}
                              y={comp.y - 7}
                              textAnchor="middle"
                              className={`text-[3.2px] font-mono select-none pointer-events-none transition-colors ${
                                isSelected ? 'fill-[#00d4ff] font-bold' : 'fill-[#dadce0]'
                              }`}
                            >
                              {comp.name.split(' ')[0]}
                            </text>
                          </g>
                        );
                      })}
                    </svg>
                  </div>

                  {/* Component Quick Selector Pills */}
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                    {OPTICAL_COMPONENTS.map((comp) => {
                      const isSelected = selectedComponent.id === comp.id;
                      return (
                        <button
                          key={comp.id}
                          onClick={() => setSelectedComponent(comp)}
                          className={`px-3 py-1 rounded-xl text-xs font-mono transition-all ${
                            isSelected
                              ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                              : 'bg-white/[0.03] text-[#7B7672] hover:text-[#e2e8f0] border border-white/[0.06]'
                          }`}
                        >
                          {comp.name.split(' ')[0]}
                        </button>
                      );
                    })}
                  </div>
                </GlassCard>
              </div>

              {/* Right Column: Live Component Inspector */}
              <div className="lg:col-span-5">
                <GlassCard className="p-6 border-white/[0.08] space-y-5 h-full flex flex-col justify-between">
                  <div className="space-y-4">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="px-2 py-0.5 rounded bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-[10px] font-mono text-[#00d4ff]">
                          {selectedComponent.category}
                        </span>
                        <h3 className="text-xl font-bold text-[#e2e8f0] mt-1.5">{selectedComponent.name}</h3>
                      </div>
                      <span className="text-xs font-mono text-[#7B7672]">Node ID: {selectedComponent.id}</span>
                    </div>

                    {/* Component Image */}
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black/60 group">
                      <Image
                        src={selectedComponent.imageUrl}
                        alt={selectedComponent.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#e2e8f0] truncate">{selectedComponent.caption}</span>
                        <span className="px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-mono text-[#00d4ff]">Conceptual Visualization</span>
                      </div>
                    </div>

                    {/* Purpose & Physics */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono text-[#00d4ff] uppercase tracking-wider">Functional Role</h4>
                      <p className="text-xs text-[#94a3b8] leading-relaxed">{selectedComponent.purpose}</p>
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xs font-mono text-[#d367c4] uppercase tracking-wider">Quantum Physics Principle</h4>
                      <p className="text-xs text-[#dadce0] leading-relaxed">{selectedComponent.physicsPrinciple}</p>
                    </div>

                    {/* Formula */}
                    {selectedComponent.equations && (
                      <div className="p-3 rounded-xl bg-black/50 border border-white/5 font-mono text-xs text-[#00d4ff] overflow-x-auto">
                        <span className="text-[10px] text-[#7B7672] block mb-1">Mathematical Relation:</span>
                        <code>{selectedComponent.equations}</code>
                      </div>
                    )}

                    {/* Specifications */}
                    <div className="space-y-2">
                      <h4 className="text-xs font-mono text-[#10b981] uppercase tracking-wider">Technical Specifications</h4>
                      <div className="space-y-1.5">
                        {selectedComponent.specifications.map((spec, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs p-2 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                            <span className="text-[#7B7672]">{spec.label}</span>
                            <span className="font-mono text-[#e2e8f0] font-semibold">{spec.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Research Link Footer */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                    <Link href="/research" className="text-[#00d4ff] hover:text-[#e2e8f0] flex items-center gap-1">
                      <span>Related Research Papers</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                    <Link href="/cryptography" className="text-[#7B7672] hover:text-[#dadce0]">
                      QKD BB84 Testbed →
                    </Link>
                  </div>
                </GlassCard>
              </div>
            </div>
          </div>
        </Section>

        <div className="section-divider" />

        {/* ── Section 3: High-Resolution Scientific Image Gallery ── */}
        <Section className="py-12">
          <div className="max-w-7xl mx-auto space-y-8">
            <SectionHeader
              label="ORIGINAL VISUAL ASSETS"
              title="Quantum Photonics Laboratory Gallery"
              description="High-fidelity scientific visualizations illustrating laser beam splitting, interferometers, single-photon detection, and optical fiber waveguides."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {PHOTONICS_GALLERY.map((item) => (
                <GlassCard
                  key={item.id}
                  hover
                  onClick={() => setActiveModalImage(item)}
                  className="p-5 border-white/[0.08] hover:border-[#00d4ff]/40 cursor-pointer space-y-3.5 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black/60 group">
                      <Image
                        src={item.imageUrl}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#00d4ff]">
                          {item.category}
                        </span>
                        <span className="p-1.5 rounded-lg bg-black/70 backdrop-blur-md text-[#dadce0] group-hover:text-[#00d4ff]">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-base font-bold text-[#e2e8f0]">{item.title}</h4>
                      <p className="text-xs text-[#94a3b8] mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  <div className="pt-2.5 border-t border-white/5 flex items-center justify-between text-xs font-mono text-[#00d4ff]">
                    <span>Inspect Visual Asset</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </Section>

        <div className="section-divider" />

        {/* ── Section 4: Experimental Quantum Photonics Workflow ── */}
        <Section className="py-12">
          <div className="max-w-7xl mx-auto space-y-8">
            <SectionHeader
              label="METHODOLOGY &amp; WORKFLOW"
              title="Photonic Quantum Experiment Lifecycle"
              description="The step-by-step experimental pipeline connecting coherent optical emission, non-linear entanglement generation, unitary manipulation, and single-photon detection."
            />

            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                {
                  step: '01',
                  title: 'Pump Laser & Frequency Lock',
                  desc: 'A continuous-wave UV laser (405 nm) is stabilized via Pound-Drever-Hall cavity locking for sub-Hz linewidth.',
                  icon: Zap,
                },
                {
                  step: '02',
                  title: 'SPDC Entanglement Generation',
                  desc: 'BBO non-linear crystal splits pump photons into energy-conserved entangled signal and idler pairs (810 nm).',
                  icon: Sparkles,
                },
                {
                  step: '03',
                  title: 'Unitary State Manipulation',
                  desc: 'Half-wave plates and electro-optic modulators rotate polarization states and apply programmable phase shifts φ(V).',
                  icon: Sliders,
                },
                {
                  step: '04',
                  title: 'Mach-Zehnder Interference',
                  desc: 'Non-polarizing beam splitters recombine spatial paths, exhibiting quantum interference fringes.',
                  icon: Workflow,
                },
                {
                  step: '05',
                  title: 'TCSPC Single-Photon Detection',
                  desc: 'Twin avalanche photodiodes and time-correlated counters record coincidence events with picosecond precision.',
                  icon: Activity,
                },
              ].map((st) => {
                const Icon = st.icon;
                return (
                  <GlassCard key={st.step} className="p-5 border-white/[0.08] space-y-3 flex flex-col justify-between">
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono font-bold text-[#00d4ff] bg-[#00d4ff]/10 px-2 py-0.5 rounded border border-[#00d4ff]/30">
                          STAGE {st.step}
                        </span>
                        <Icon className="w-4 h-4 text-[#dadce0]" />
                      </div>
                      <h4 className="text-sm font-bold text-[#e2e8f0]">{st.title}</h4>
                      <p className="text-xs text-[#94a3b8] leading-relaxed">{st.desc}</p>
                    </div>
                  </GlassCard>
                );
              })}
            </div>
          </div>
        </Section>
      </div>

      {/* ── Image Lightbox Modal ── */}
      <AnimatePresence>
        {activeModalImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#18191b] border border-[#00d4ff]/30 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 custom-scrollbar"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded bg-[#00d4ff]/15 border border-[#00d4ff]/30 text-[10px] font-mono text-[#00d4ff]">
                    {activeModalImage.category}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e2e8f0]">{activeModalImage.title}</h2>
                  <p className="text-xs font-mono text-[#7B7672]">{activeModalImage.caption}</p>
                </div>
                <button
                  onClick={() => setActiveModalImage(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#dadce0] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black">
                <Image
                  src={activeModalImage.imageUrl}
                  alt={activeModalImage.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono text-[#00d4ff] uppercase tracking-wider">Scientific Visualization Description</h4>
                <p className="text-xs sm:text-sm text-[#dadce0] leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
                  {activeModalImage.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs font-mono">
                <span className="text-[#7B7672]">SHIELD QUANTUM MACHINE AND TECHNOLOGY • LAB REPOSITORY</span>
                <button
                  onClick={() => setActiveModalImage(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#dadce0] transition-colors"
                >
                  Close Viewer
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
