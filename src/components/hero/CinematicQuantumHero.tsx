'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Cpu,
  Atom,
  Thermometer,
  Activity,
  Layers,
  Sparkles,
  Maximize2,
  X,
  Radio,
  ShieldCheck,
  Zap,
  ArrowRight,
  FlaskConical,
} from 'lucide-react';
import { Button, Badge, GlassCard } from '@/components/ui';

// Lazy-load the heavy 3D WebGL Bloch Sphere Visualizer
const InteractiveBlochSphere3D = dynamic(
  () => import('@/components/3d/InteractiveBlochSphere3D'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[520px] sm:h-[580px] lg:h-[640px] flex items-center justify-center bg-black/80 rounded-2xl border border-photon-cyan/20">
        <div className="flex flex-col items-center gap-3 text-photon-cyan font-mono text-xs">
          <div className="w-8 h-8 rounded-full border-2 border-photon-cyan border-t-transparent animate-spin" />
          <span>INITIALIZING 3D QUANTUM STATE VECTOR...</span>
        </div>
      </div>
    ),
  }
);

interface HardwarePin {
  id: string;
  title: string;
  temp: string;
  topPercent: number;
  leftPercent: number;
  hardware: string;
  specs: string;
}

const HARDWARE_PINS: HardwarePin[] = [
  {
    id: 'pin-300k',
    title: 'Vacuum Flange & Feedthroughs',
    temp: '300 K',
    topPercent: 8,
    leftPercent: 50,
    hardware: 'Hermetic SMA Coaxial Ports',
    specs: 'Room-temperature atmospheric seal & 128-channel microwave line ingress.',
  },
  {
    id: 'pin-50k',
    title: '50K Radiation Shield',
    temp: '50 K',
    topPercent: 28,
    leftPercent: 62,
    hardware: 'Gold-Plated OFHC Copper Disk',
    specs: 'Blackbody thermal radiation intercept driven by Pulse Tube Stage 1.',
  },
  {
    id: 'pin-4k',
    title: '4K Condenser & RF Amplifiers',
    temp: '4.2 K',
    topPercent: 44,
    leftPercent: 36,
    hardware: '20 dB Cryo Attenuators & HEMT Amps',
    specs: 'Thermalizes incoming microwave control signals and isolates QPU back-action.',
  },
  {
    id: 'pin-still',
    title: 'Still Distillation Stage',
    temp: '800 mK',
    topPercent: 58,
    leftPercent: 64,
    hardware: 'Helium-3 Evaporator',
    specs: 'Continuous ³He vapor extraction driving the closed-cycle dilution process.',
  },
  {
    id: 'pin-100mk',
    title: '100mK Cold Plate',
    temp: '100 mK',
    topPercent: 68,
    leftPercent: 34,
    hardware: 'Silver-Sinter Step Exchangers',
    specs: 'Pre-cools circulating helium mixture via counterflow heat exchange.',
  },
  {
    id: 'pin-15mk',
    title: 'Mixing Chamber & QPU Package',
    temp: '14.8 mK',
    topPercent: 82,
    leftPercent: 50,
    hardware: 'Superconducting QPU Chip in Cryoperm Shield',
    specs: 'Base sub-Kelvin stage where ³He dissolves into ⁴He, cooling 128 transmons near absolute zero.',
  },
];

export default function CinematicQuantumHero() {
  const [heroMode, setHeroMode] = useState<'3D_BLOCH' | 'CRYO_HARDWARE'>('3D_BLOCH');
  const [activePin, setActivePin] = useState<HardwarePin | null>(null);
  const [showQpuMacro, setShowQpuMacro] = useState<boolean>(false);

  return (
    <div className="relative w-full max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* ———————————————————————————————————————————————————
            LEFT COLUMN: Scientific Institutional Positioning
            ——————————————————————————————————————————————————— */}
        <div className="lg:col-span-5 text-left space-y-6 z-10">
          {/* Organization Tag */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <Badge variant="cyan">Physical Hardware &amp; Laboratory</Badge>
            <span className="text-[10px] font-mono text-text-muted">QUANTUM PLATFORM</span>
          </motion.div>

          {/* Primary Institutional Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08]"
          >
            <span className="block text-text-primary">SHIELD QUANTUM</span>
            <span className="block mt-1.5 bg-gradient-to-r from-photon-cyan via-quantum-blue to-quantum-violet bg-clip-text text-transparent">
              MACHINE &amp; TECHNOLOGY
            </span>
          </motion.h1>

          {/* Concise Scientific Mission Statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-sm sm:text-base text-text-secondary leading-relaxed max-w-xl"
          >
            Engineering fault-tolerant superconducting quantum processors, sub-Kelvin dilution
            refrigeration infrastructure, cryogenic microwave interconnects, and global quantum
            network architectures.
          </motion.p>

          {/* Core Technology Pillars */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-2 gap-2 text-xs font-mono"
          >
            <div className="flex items-center gap-2 p-2 rounded bg-white/[0.02] border border-white/[0.06]">
              <Cpu className="w-4 h-4 text-photon-cyan" />
              <span className="text-text-primary font-medium">Quantum Computing</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-white/[0.02] border border-white/[0.06]">
              <Radio className="w-4 h-4 text-quantum-violet" />
              <span className="text-text-primary font-medium">Quantum Networks</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-white/[0.02] border border-white/[0.06]">
              <Activity className="w-4 h-4 text-quantum-blue" />
              <span className="text-text-primary font-medium">Quantum Sensing</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded bg-white/[0.02] border border-white/[0.06]">
              <ShieldCheck className="w-4 h-4 text-quantum-emerald" />
              <span className="text-text-primary font-medium">Quantum Security</span>
            </div>
          </motion.div>

          {/* Call to Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <Button
              variant="primary"
              size="md"
              href="/quantum-machines"
              icon={<Cpu className="w-4 h-4" />}
            >
              Explore Quantum Technology
            </Button>
            <Button
              variant="secondary"
              size="md"
              href="/simulator"
              icon={<Atom className="w-4 h-4" />}
            >
              Quantum Simulator
            </Button>
            <Button
              variant="outline"
              size="md"
              href="/labs/cryogenic"
              icon={<FlaskConical className="w-4 h-4" />}
            >
              Cryogenic Lab
            </Button>
          </motion.div>

          {/* Simulated / Demonstration Telemetry Footer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="pt-4 border-t border-white/[0.08]"
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[9px] font-mono tracking-wider text-text-muted uppercase">
                Simulated / Demonstration Telemetry
              </span>
              <div className="flex items-center gap-1.5 text-[9px] font-mono text-quantum-emerald">
                <span className="w-1.5 h-1.5 rounded-full bg-quantum-emerald animate-pulse" />
                <span>COHERENT QUANTUM STATE</span>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center font-mono text-[10px]">
              <div className="bg-black/50 p-2 rounded border border-white/[0.06]">
                <span className="text-text-muted block text-[8px] uppercase">Base Temp</span>
                <span className="text-photon-cyan font-bold text-xs">14.8 mK</span>
              </div>
              <div className="bg-black/50 p-2 rounded border border-white/[0.06]">
                <span className="text-text-muted block text-[8px] uppercase">Coherence T₂*</span>
                <span className="text-quantum-emerald font-bold text-xs">124 µs</span>
              </div>
              <div className="bg-black/50 p-2 rounded border border-white/[0.06]">
                <span className="text-text-muted block text-[8px] uppercase">1Q Gate Fidelity</span>
                <span className="text-quantum-violet font-bold text-xs">99.98%</span>
              </div>
              <div className="bg-black/50 p-2 rounded border border-white/[0.06]">
                <span className="text-text-muted block text-[8px] uppercase">Qubit Register</span>
                <span className="text-energy-amber font-bold text-xs">128 QPU</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ———————————————————————————————————————————————————
            RIGHT COLUMN: Dominant 3D Quantum State Visualizer
            ——————————————————————————————————————————————————— */}
        <div className="lg:col-span-7 relative">
          {/* Mode Switcher Tabs */}
          <div className="flex items-center justify-end gap-2 mb-3">
            <button
              onClick={() => setHeroMode('3D_BLOCH')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                heroMode === '3D_BLOCH'
                  ? 'bg-photon-cyan/20 text-photon-cyan border border-photon-cyan/50 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                  : 'bg-white/5 text-text-muted hover:text-text-primary border border-white/10'
              }`}
            >
              <Atom className="w-3.5 h-3.5" />
              <span>3D Bloch Sphere</span>
            </button>
            <button
              onClick={() => setHeroMode('CRYO_HARDWARE')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1.5 ${
                heroMode === 'CRYO_HARDWARE'
                  ? 'bg-photon-cyan/20 text-photon-cyan border border-photon-cyan/50 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                  : 'bg-white/5 text-text-muted hover:text-text-primary border border-white/10'
              }`}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>15 mK Cryostat Hardware</span>
            </button>
          </div>

          {/* Mode 1: 3D Three.js Interactive Bloch Sphere */}
          {heroMode === '3D_BLOCH' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full"
            >
              <InteractiveBlochSphere3D />
            </motion.div>
          )}

          {/* Mode 2: Cryogenic Hardware Visualizer with Pinned Stages */}
          {heroMode === 'CRYO_HARDWARE' && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative rounded-2xl overflow-hidden bg-black/80 border border-white/[0.12] shadow-[0_0_60px_rgba(0,212,255,0.12)] group"
            >
              {/* Top Machine Frame HUD */}
              <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 bg-black/80 px-3 py-1.5 rounded-lg border border-white/[0.1] backdrop-blur-md">
                  <div className="w-2 h-2 rounded-full bg-photon-cyan animate-pulse" />
                  <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-text-primary uppercase">
                    MK-IV DILUTION CRYOSTAT // 15 mK QPU CHAMBER
                  </span>
                </div>

                {/* Inspect QPU Macro Button */}
                <button
                  onClick={() => setShowQpuMacro(true)}
                  className="pointer-events-auto flex items-center gap-1.5 bg-photon-cyan/20 hover:bg-photon-cyan/30 text-photon-cyan px-3 py-1.5 rounded-lg border border-photon-cyan/40 backdrop-blur-md text-[10px] sm:text-xs font-mono font-semibold transition-all shadow-[0_0_15px_rgba(0,212,255,0.2)]"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>INSPECT QPU DIE</span>
                </button>
              </div>

              {/* Main High-Resolution Cinematic Cryostat Image */}
              <div className="relative aspect-[16/10] sm:aspect-[16/10] w-full overflow-hidden">
                <Image
                  src="/images/quantum_cryostat_hero.jpg"
                  alt="SHIELD Quantum Cryogenic Dilution Refrigerator and Superconducting QPU System"
                  fill
                  priority
                  className="object-cover object-center scale-[1.02] transition-transform duration-700 group-hover:scale-100"
                />

                {/* Ambient Cryogenic Cyan & Gold Glow Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_50%_80%,rgba(0,212,255,0.18),transparent_70%)] pointer-events-none" />

                {/* Interactive Hardware Inspection Pins */}
                {HARDWARE_PINS.map((pin) => {
                  const isSelected = activePin?.id === pin.id;
                  return (
                    <div
                      key={pin.id}
                      style={{ top: `${pin.topPercent}%`, left: `${pin.leftPercent}%` }}
                      className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                    >
                      <button
                        onClick={() => setActivePin(isSelected ? null : pin)}
                        className={`relative flex items-center justify-center w-6 h-6 rounded-full transition-all duration-300 ${
                          isSelected
                            ? 'bg-photon-cyan text-black scale-125 shadow-[0_0_20px_#00d4ff]'
                            : 'bg-black/75 text-photon-cyan hover:bg-photon-cyan/20 border border-photon-cyan/60 hover:scale-110'
                        }`}
                        title={pin.title}
                      >
                        <span className="w-2 h-2 rounded-full bg-current animate-ping opacity-60 absolute" />
                        <span className="text-[9px] font-mono font-bold">{pin.temp.split(' ')[0]}</span>
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Active Stage Pin Telemetry Popup */}
              <AnimatePresence>
                {activePin && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-3 left-3 right-3 z-30 bg-black/90 p-4 rounded-xl border border-photon-cyan/40 backdrop-blur-md shadow-[0_0_25px_rgba(0,212,255,0.2)]"
                  >
                    <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-photon-cyan" />
                        <h4 className="text-xs sm:text-sm font-bold font-mono text-text-primary">
                          {activePin.title}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-photon-cyan">{activePin.temp}</span>
                        <button
                          onClick={() => setActivePin(null)}
                          className="p-1 text-text-muted hover:text-text-primary"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-text-secondary">
                      <strong className="text-text-primary font-mono">{activePin.hardware}: </strong>
                      {activePin.specs}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </div>

      {/* ———————————————————————————————————————————————————
          MODAL: Microscopic Superconducting QPU Die Inspection
          ——————————————————————————————————————————————————— */}
      <AnimatePresence>
        {showQpuMacro && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative max-w-4xl w-full bg-black/95 rounded-2xl border border-photon-cyan/40 p-6 sm:p-8 overflow-hidden shadow-[0_0_60px_rgba(0,212,255,0.25)]"
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/[0.1] mb-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-photon-cyan/20 text-photon-cyan">
                    <Cpu className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-text-primary font-mono">
                      SUPERCONDUCTING QPU DIE // MICROSCOPIC INSPECTION
                    </h3>
                    <p className="text-xs text-text-muted font-mono">
                      128-Transmon SQUID Lattice inside Gold-Plated Copper Microwave Cavity
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setShowQpuMacro(false)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-text-muted hover:text-text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                {/* Macro Image */}
                <div className="md:col-span-6 relative aspect-square rounded-xl overflow-hidden border border-white/[0.1]">
                  <Image
                    src="/images/quantum_qpu_chip_macro.jpg"
                    alt="Microscopic photograph of superconducting quantum processor chip die"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,212,255,0.15),transparent_65%)] pointer-events-none" />
                  <div className="absolute bottom-2 left-2 bg-black/80 px-2.5 py-1 rounded text-[9px] font-mono text-photon-cyan border border-photon-cyan/30">
                    20 mm × 20 mm Silicon Substrate
                  </div>
                </div>

                {/* Physics & Hardware Specifications */}
                <div className="md:col-span-6 space-y-4 text-xs">
                  <div className="bg-white/[0.02] p-3 rounded-lg border border-white/[0.06]">
                    <span className="text-[10px] font-mono text-text-muted uppercase block mb-1">
                      Qubit Implementation:
                    </span>
                    <p className="text-text-secondary leading-relaxed">
                      Planar cross-shaped transmon capacitors shunted by non-linear Al/AlOx/Al Josephson
                      junction SQUID loops, operating at 4.8 – 5.4 GHz.
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 font-mono text-[10px]">
                    <div className="bg-white/[0.02] p-2.5 rounded border border-white/[0.04]">
                      <span className="text-text-muted block text-[8px] uppercase">Josephson Energy (Ej)</span>
                      <span className="text-photon-cyan font-bold text-xs">18.4 GHz</span>
                    </div>
                    <div className="bg-white/[0.02] p-2.5 rounded border border-white/[0.04]">
                      <span className="text-text-muted block text-[8px] uppercase">Charging Energy (Ec)</span>
                      <span className="text-quantum-violet font-bold text-xs">290 MHz</span>
                    </div>
                    <div className="bg-white/[0.02] p-2.5 rounded border border-white/[0.04]">
                      <span className="text-text-muted block text-[8px] uppercase">Relaxation (T₁)</span>
                      <span className="text-quantum-emerald font-bold text-xs">92 µs</span>
                    </div>
                    <div className="bg-white/[0.02] p-2.5 rounded border border-white/[0.04]">
                      <span className="text-text-muted block text-[8px] uppercase">Dephasing (T₂*)</span>
                      <span className="text-energy-amber font-bold text-xs">124 µs</span>
                    </div>
                  </div>

                  <div className="bg-black/50 p-3 rounded-lg border border-white/[0.08] font-mono text-[11px] text-photon-cyan">
                    <span className="text-[9px] text-text-muted uppercase tracking-wider block mb-0.5">
                      Transmon Hamiltonian:
                    </span>
                    <span>H = 4E_C(n - n_g)² - E_J cos(φ)</span>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <Button
                      variant="primary"
                      size="sm"
                      href="/hardware"
                      icon={<ArrowRight className="w-3.5 h-3.5" />}
                    >
                      Explore Qubit Architectures
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
