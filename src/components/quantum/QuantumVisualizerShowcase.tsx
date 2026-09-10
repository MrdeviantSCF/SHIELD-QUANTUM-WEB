'use client';

import React, { useState, useMemo } from 'react';
import {
  Atom,
  Cpu,
  Share2,
  Waves,
  Sparkles,
  Compass,
} from 'lucide-react';
import { GlassCard, Badge, Button } from '@/components/ui';

/* ═══════════════════════════════════════════════════════
   QUANTUM VISUALIZER SHOWCASE
   Interactive Quantum Physics & Computing Demonstration
   ═══════════════════════════════════════════════════════ */

export default function QuantumVisualizerShowcase() {
  const [activeTab, setActiveTab] = useState<'BLOCH' | 'CHIP' | 'ENTANGLEMENT' | 'WAVE'>('BLOCH');

  /* ———————————————————————————————————————————————————————
     TAB 1: BLOCH SPHERE SIMULATION STATE
     ——————————————————————————————————————————————————————— */
  const [theta, setTheta] = useState<number>(Math.PI / 2); // Polar angle (0 to π)
  const [phi, setPhi] = useState<number>(0); // Azimuthal angle (0 to 2π)
  const [measurementHistory, setMeasurementHistory] = useState<number[]>([]);
  const [collapsedState, setCollapsedState] = useState<'0' | '1' | null>(null);

  // Probability amplitudes
  const prob0 = useMemo(() => Math.cos(theta / 2) ** 2, [theta]);
  const prob1 = useMemo(() => Math.sin(theta / 2) ** 2, [theta]);
  const amp0 = useMemo(() => Math.cos(theta / 2), [theta]);
  const amp1Re = useMemo(() => Math.sin(theta / 2) * Math.cos(phi), [theta, phi]);
  const amp1Im = useMemo(() => Math.sin(theta / 2) * Math.sin(phi), [theta, phi]);

  // Coordinates on 2D projection of Bloch Sphere (Radius R=80)
  const R = 85;
  const sphereCenterX = 130;
  const sphereCenterY = 130;

  const vecX = sphereCenterX + R * Math.sin(theta) * Math.cos(phi);
  const vecY = sphereCenterY - R * Math.cos(theta) + (R * 0.28 * Math.sin(theta) * Math.sin(phi));

  // Quick Gate Actions
  const applyGate = (gate: 'X' | 'H' | 'Z' | 'S' | 'T' | 'RESET') => {
    setCollapsedState(null);
    if (gate === 'RESET') {
      setTheta(0);
      setPhi(0);
    } else if (gate === 'X') {
      // Flip theta: θ -> π - θ, φ -> -φ
      setTheta((prev) => Math.PI - prev);
    } else if (gate === 'H') {
      // Hadamard: |0⟩ -> |+⟩, |1⟩ -> |-⟩
      if (Math.abs(theta) < 0.1) {
        setTheta(Math.PI / 2);
        setPhi(0);
      } else if (Math.abs(theta - Math.PI) < 0.1) {
        setTheta(Math.PI / 2);
        setPhi(Math.PI);
      } else {
        setTheta(Math.PI / 2);
        setPhi(0);
      }
    } else if (gate === 'Z') {
      setPhi((prev) => (prev + Math.PI) % (2 * Math.PI));
    } else if (gate === 'S') {
      setPhi((prev) => (prev + Math.PI / 2) % (2 * Math.PI));
    } else if (gate === 'T') {
      setPhi((prev) => (prev + Math.PI / 4) % (2 * Math.PI));
    }
  };

  const measureQubit = () => {
    const outcome = Math.random() < prob0 ? 0 : 1;
    setCollapsedState(outcome === 0 ? '0' : '1');
    setTheta(outcome === 0 ? 0 : Math.PI);
    setPhi(0);
    setMeasurementHistory((prev) => [outcome, ...prev].slice(0, 16));
  };

  /* ———————————————————————————————————————————————————————
     TAB 2: SUPERCONDUCTING CHIP ARCHITECTURE
     ——————————————————————————————————————————————————————— */
  const [selectedChipComponent, setSelectedChipComponent] = useState<string>('transmon-q1');

  const chipComponents = [
    {
      id: 'transmon-q1',
      name: 'Transmon Qubit Island (Q1)',
      category: 'Qubit Element',
      desc: 'Cross-shaped superconducting niobium capacitor coupled to an Al/AlOx/Al Josephson junction loop. Non-linear LC oscillator with engineered anharmonicity (α = -290 MHz).',
      operatingTemp: '15 mK',
      t1Time: '92 µs',
      t2Time: '124 µs',
      frequency: '5.140 GHz',
      color: '#00d4ff',
    },
    {
      id: 'cpw-bus',
      name: 'Coplanar Waveguide (CPW) Bus Resonator',
      category: 'Inter-Qubit Coupler',
      desc: 'High-Q superconducting transmission line resonant at 6.4 GHz. Mediates virtual photon exchange to execute fast two-qubit CZ and iSWAP entangling gates.',
      operatingTemp: '15 mK',
      t1Time: 'N/A (Passive)',
      t2Time: 'Q-Factor: 1.2M',
      frequency: '6.420 GHz',
      color: '#7c3aed',
    },
    {
      id: 'josephson-junction',
      name: 'Al/AlOx/Al Josephson Junction',
      category: 'Non-linear Inductor',
      desc: 'Nanoscale tunnel barrier (1.2 nm aluminum oxide) where Cooper pairs tunnel without dissipation. Creates the non-equidistant energy level spacing required to isolate the |0⟩ and |1⟩ computational subspace.',
      operatingTemp: '15 mK',
      t1Time: 'Critical Current: 28 nA',
      t2Time: 'Josephson Energy: 18.2 GHz',
      frequency: 'Non-linear Inductance: 1.8 nH',
      color: '#f59e0b',
    },
    {
      id: 'readout-resonator',
      name: 'Dispersive Readout Resonator & Purcell Filter',
      category: 'Measurement Line',
      desc: 'Dedicated quarter-wave resonator frequency-shifted by qubit state (dispersive shift χ = 2.4 MHz). Integrated with a bandpass Purcell filter to protect qubit lifetime from radiative decay.',
      operatingTemp: '15 mK',
      t1Time: 'Fidelity: 99.4%',
      t2Time: 'Readout Speed: 180 ns',
      frequency: '7.120 GHz',
      color: '#10b981',
    },
    {
      id: 'flux-line',
      name: 'Fast Flux & Microwave XY Control Lines',
      category: 'Control Electronics',
      desc: 'Cryogenic coaxial lines carrying high-speed shaped microwave pulses (for single-qubit rotations) and DC/flux pulses (to rapidly tune qubit transition frequency into resonance for 2-qubit gates).',
      operatingTemp: '15 mK to 4K',
      t1Time: 'Pulse Width: 12 ns',
      t2Time: 'Crosstalk: < -38 dB',
      frequency: 'DC to 8.5 GHz',
      color: '#38bdf8',
    },
  ];

  const activeChipComp = chipComponents.find((c) => c.id === selectedChipComponent) || chipComponents[0];

  /* ———————————————————————————————————————————————————————
     TAB 3: BELL ENTANGLEMENT STATE
     ——————————————————————————————————————————————————————— */
  const [selectedBellState, setSelectedBellState] = useState<'PHI_PLUS' | 'PHI_MINUS' | 'PSI_PLUS' | 'PSI_MINUS'>('PHI_PLUS');

  const bellStates = {
    PHI_PLUS: { name: '|Φ⁺⟩', formula: '(|00⟩ + |11⟩) / √2', desc: 'Even parity, symmetric phase. Maximum correlation: measuring Qubit 1 yields identical outcome on Qubit 2 in any basis.' },
    PHI_MINUS: { name: '|Φ⁻⟩', formula: '(|00⟩ − |11⟩) / √2', desc: 'Even parity, anti-phase. Measurements match in Z-basis; complementary phase in X-basis.' },
    PSI_PLUS: { name: '|Ψ⁺⟩', formula: '(|01⟩ + |10⟩) / √2', desc: 'Odd parity, symmetric phase. Measurements yield opposite states in Z-basis (|01⟩ or |10⟩).' },
    PSI_MINUS: { name: '|Ψ⁻⟩', formula: '(|01⟩ − |10⟩) / √2', desc: 'The Singlet state. Rotational invariant in all measurement bases. Foundation for Ekert91 QKD protocol.' },
  };

  /* ———————————————————————————————————————————————————————
     TAB 4: QUANTUM WAVEFUNCTION & TUNNELING
     ——————————————————————————————————————————————————————— */
  const [barrierHeight, setBarrierHeight] = useState<number>(65); // 0 to 100
  const [particleEnergy, setParticleEnergy] = useState<number>(45); // 0 to 100

  const tunnelingProbability = useMemo(() => {
    if (particleEnergy >= barrierHeight) {
      return Math.min(99.9, 85 + (particleEnergy - barrierHeight) * 0.5);
    }
    const diff = barrierHeight - particleEnergy;
    // Transmission T ≈ exp(-2 * kappa * a)
    const prob = 100 * Math.exp(-diff * 0.08);
    return Math.max(0.1, prob);
  }, [barrierHeight, particleEnergy]);

  return (
    <GlassCard className="p-6 sm:p-8 relative overflow-hidden border-photon-cyan/20">
      {/* Background scientific grid pattern */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0, 212, 255, 0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 212, 255, 0.15) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Header bar */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-photon-cyan animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest uppercase text-photon-cyan font-bold">
              QUANTUM PHENOMENA &amp; HARDWARE VISUALIZER
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-text-primary">
            Interactive Quantum Physics Lab
          </h2>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap gap-1.5 bg-deep-space/80 p-1 rounded-lg border border-white/[0.08]">
          {[
            { id: 'BLOCH', label: 'Bloch Sphere', icon: Compass },
            { id: 'CHIP', label: 'Superconducting QPU', icon: Cpu },
            { id: 'ENTANGLEMENT', label: 'Bell Entanglement', icon: Share2 },
            { id: 'WAVE', label: 'Wave Tunneling', icon: Waves },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-md transition-all ${
                  isCurrent
                    ? 'bg-photon-cyan/20 text-photon-cyan font-bold shadow-[0_0_10px_rgba(0,212,255,0.2)] border border-photon-cyan/40'
                    : 'text-text-muted hover:text-text-primary hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: BLOCH SPHERE INTERACTIVE SYSTEM */}
      {activeTab === 'BLOCH' && (
        <div className="relative z-10 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* 2.5D Interactive Bloch Sphere SVG Canvas */}
            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="relative w-[260px] h-[260px] sm:w-[280px] sm:h-[280px]">
                <svg viewBox="0 0 260 260" className="w-full h-full">
                  <defs>
                    <radialGradient id="sphereShade" cx="35%" cy="30%" r="70%">
                      <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.08" />
                      <stop offset="70%" stopColor="#000000" stopOpacity="0.7" />
                      <stop offset="100%" stopColor="#000000" stopOpacity="0.9" />
                    </radialGradient>
                    <linearGradient id="vectorGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00d4ff" />
                      <stop offset="100%" stopColor="#7c3aed" />
                    </linearGradient>
                  </defs>

                  {/* Outer Sphere Background */}
                  <circle cx={sphereCenterX} cy={sphereCenterY} r={R} fill="url(#sphereShade)" stroke="rgba(0, 212, 255, 0.25)" strokeWidth="1" />

                  {/* Equator Ellipse (X-Y Plane) */}
                  <ellipse
                    cx={sphereCenterX}
                    cy={sphereCenterY}
                    rx={R}
                    ry={R * 0.28}
                    fill="none"
                    stroke="rgba(0, 212, 255, 0.4)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />

                  {/* Meridian Ellipse (Z-Y Plane) */}
                  <ellipse
                    cx={sphereCenterX}
                    cy={sphereCenterY}
                    rx={R * 0.28}
                    ry={R}
                    fill="none"
                    stroke="rgba(124, 58, 237, 0.3)"
                    strokeWidth="0.8"
                    strokeDasharray="2 2"
                  />

                  {/* Z-Axis Line (|0⟩ to |1⟩) */}
                  <line
                    x1={sphereCenterX}
                    y1={sphereCenterY - R - 15}
                    x2={sphereCenterX}
                    y2={sphereCenterY + R + 15}
                    stroke="rgba(255, 255, 255, 0.3)"
                    strokeWidth="1.2"
                  />

                  {/* X-Axis Line */}
                  <line
                    x1={sphereCenterX - R - 10}
                    y1={sphereCenterY}
                    x2={sphereCenterX + R + 10}
                    y2={sphereCenterY}
                    stroke="rgba(0, 212, 255, 0.2)"
                    strokeWidth="0.8"
                  />

                  {/* Pole Labels */}
                  <text x={sphereCenterX} y={sphereCenterY - R - 20} textAnchor="middle" fill="#00d4ff" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    |0⟩ (+Z)
                  </text>
                  <text x={sphereCenterX} y={sphereCenterY + R + 25} textAnchor="middle" fill="#7c3aed" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    |1⟩ (−Z)
                  </text>
                  <text x={sphereCenterX + R + 18} y={sphereCenterY + 4} textAnchor="start" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">
                    |+⟩ (+X)
                  </text>
                  <text x={sphereCenterX - R - 18} y={sphereCenterY + 4} textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="9" fontFamily="monospace">
                    |−⟩ (−X)
                  </text>

                  {/* Projection trace to XY plane */}
                  <line
                    x1={vecX}
                    y1={vecY}
                    x2={vecX}
                    y2={sphereCenterY + (R * 0.28 * Math.sin(theta) * Math.sin(phi))}
                    stroke="rgba(0, 212, 255, 0.25)"
                    strokeWidth="1"
                    strokeDasharray="2 2"
                  />

                  {/* Dynamic Quantum State Vector |ψ⟩ */}
                  <line
                    x1={sphereCenterX}
                    y1={sphereCenterY}
                    x2={vecX}
                    y2={vecY}
                    stroke="url(#vectorGrad)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />

                  {/* Origin point */}
                  <circle cx={sphereCenterX} cy={sphereCenterY} r="2.5" fill="#ffffff" />

                  {/* State Vector Tip */}
                  <circle cx={vecX} cy={vecY} r="5" fill="#00d4ff" stroke="#ffffff" strokeWidth="1.5" />
                  <circle cx={vecX} cy={vecY} r="9" fill="none" stroke="#00d4ff" strokeWidth="0.8" opacity="0.6" />

                  {/* |ψ⟩ Label at tip */}
                  <text x={vecX + 8} y={vecY - 8} fill="#00d4ff" fontSize="11" fontFamily="monospace" fontWeight="bold">
                    |ψ⟩
                  </text>
                </svg>

                {collapsedState && (
                  <div className="absolute top-2 right-2 bg-photon-cyan/20 border border-photon-cyan text-photon-cyan text-xs font-mono px-2 py-1 rounded">
                    Collapsed: |{collapsedState}⟩
                  </div>
                )}
              </div>

              {/* Measurement outcome history strip */}
              <div className="mt-4 flex items-center gap-2">
                <span className="text-[10px] font-mono text-text-muted">Shot History:</span>
                <div className="flex gap-1">
                  {measurementHistory.length === 0 ? (
                    <span className="text-[10px] font-mono text-text-muted italic">Click &quot;Measure Qubit&quot; below</span>
                  ) : (
                    measurementHistory.map((bit, idx) => (
                      <span
                        key={idx}
                        className={`w-4 h-4 rounded text-[10px] font-mono flex items-center justify-center font-bold ${
                          bit === 0
                            ? 'bg-photon-cyan/20 text-photon-cyan border border-photon-cyan/40'
                            : 'bg-quantum-violet/20 text-quantum-violet border border-quantum-violet/40'
                        }`}
                      >
                        {bit}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Right Controls & Quantum Mathematics */}
            <div className="lg:col-span-6 space-y-5">
              {/* Formula & Amplitudes Box */}
              <div className="bg-black/50 p-4 rounded-lg border border-white/[0.08] font-mono">
                <span className="text-[10px] text-text-muted uppercase tracking-wider block mb-1">
                  Mathematical State Vector
                </span>
                <div className="text-sm sm:text-base text-photon-cyan font-bold">
                  |ψ⟩ = {amp0.toFixed(3)}|0⟩ + ({amp1Re.toFixed(3)} {amp1Im >= 0 ? '+' : '-'} {Math.abs(amp1Im).toFixed(3)}i)|1⟩
                </div>

                <div className="mt-3 grid grid-cols-2 gap-3 pt-3 border-t border-white/[0.06] text-xs">
                  <div>
                    <span className="text-text-muted block text-[10px]">P(|0⟩) = cos²(θ/2)</span>
                    <span className="text-photon-cyan font-bold text-sm">{(prob0 * 100).toFixed(1)}%</span>
                  </div>
                  <div>
                    <span className="text-text-muted block text-[10px]">P(|1⟩) = sin²(θ/2)</span>
                    <span className="text-quantum-violet font-bold text-sm">{(prob1 * 100).toFixed(1)}%</span>
                  </div>
                </div>

                {/* Probability Bar */}
                <div className="mt-3 h-2 bg-white/5 rounded-full overflow-hidden flex">
                  <div className="bg-photon-cyan transition-all duration-200" style={{ width: `${prob0 * 100}%` }} />
                  <div className="bg-quantum-violet transition-all duration-200" style={{ width: `${prob1 * 100}%` }} />
                </div>
              </div>

              {/* Angle Sliders */}
              <div className="space-y-3 text-xs font-mono">
                <div>
                  <div className="flex justify-between text-text-muted mb-1">
                    <span>Polar Angle (θ): {(theta * (180 / Math.PI)).toFixed(1)}°</span>
                    <span className="text-photon-cyan">[{theta.toFixed(2)} rad]</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={Math.PI}
                    step="0.01"
                    value={theta}
                    onChange={(e) => {
                      setTheta(parseFloat(e.target.value));
                      setCollapsedState(null);
                    }}
                    className="w-full accent-photon-cyan h-1.5 bg-white/10 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-text-muted mb-1">
                    <span>Azimuthal Phase (φ): {(phi * (180 / Math.PI)).toFixed(1)}°</span>
                    <span className="text-quantum-violet">[{phi.toFixed(2)} rad]</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max={2 * Math.PI}
                    step="0.01"
                    value={phi}
                    onChange={(e) => {
                      setPhi(parseFloat(e.target.value));
                      setCollapsedState(null);
                    }}
                    className="w-full accent-quantum-violet h-1.5 bg-white/10 rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Quantum Gate Buttons */}
              <div>
                <span className="text-[10px] font-mono text-text-muted uppercase tracking-wider block mb-2">
                  Execute Quantum Gate Transformations:
                </span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { label: 'H (Hadamard)', gate: 'H' as const, desc: 'Equal Superposition' },
                    { label: 'X (Pauli-X)', gate: 'X' as const, desc: 'Bit Flip' },
                    { label: 'Z (Pauli-Z)', gate: 'Z' as const, desc: 'Phase Flip' },
                    { label: 'S Gate', gate: 'S' as const, desc: 'π/2 Phase' },
                    { label: 'T Gate', gate: 'T' as const, desc: 'π/4 Phase' },
                    { label: '|0⟩ Reset', gate: 'RESET' as const, desc: 'Ground State' },
                  ].map((btn) => (
                    <button
                      key={btn.label}
                      onClick={() => applyGate(btn.gate)}
                      className="px-2.5 py-1.5 text-xs font-mono bg-white/[0.04] hover:bg-photon-cyan/20 hover:text-photon-cyan border border-white/[0.08] rounded transition-all"
                      title={btn.desc}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button variant="primary" size="sm" onClick={measureQubit} icon={<Sparkles className="w-4 h-4" />}>
                  Measure Qubit (Born Collapse)
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: SUPERCONDUCTING QUANTUM CHIP ARCHITECTURE */}
      {activeTab === 'CHIP' && (
        <div className="relative z-10 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Nanoscale Circuit Layout Graphic */}
            <div className="lg:col-span-7">
              <div className="aspect-[16/10] bg-black/80 rounded-lg p-4 border border-white/[0.08] relative overflow-hidden">
                <svg viewBox="0 0 400 240" className="w-full h-full">
                  <defs>
                    <linearGradient id="chipSubstrate" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#050b14" />
                      <stop offset="100%" stopColor="#0a1525" />
                    </linearGradient>
                    <pattern id="siliconGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(0, 212, 255, 0.05)" strokeWidth="0.5" />
                    </pattern>
                  </defs>

                  {/* Silicon/Sapphire Substrate */}
                  <rect width="400" height="240" rx="6" fill="url(#chipSubstrate)" />
                  <rect width="400" height="240" fill="url(#siliconGrid)" />

                  {/* Ground Plane (Dark Metallic) */}
                  <rect x="20" y="20" width="360" height="200" rx="4" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1.5" />

                  {/* CPW Inter-Qubit Bus Resonator (Meandering Line) */}
                  <path
                    d="M 120 120 L 160 120 L 160 70 L 240 70 L 240 120 L 280 120"
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="cursor-pointer hover:stroke-white transition-colors"
                    onClick={() => setSelectedChipComponent('cpw-bus')}
                  />
                  <text x="200" y="60" textAnchor="middle" fill="#7c3aed" fontSize="9" fontFamily="monospace">
                    CPW BUS RESONATOR (6.4 GHz)
                  </text>

                  {/* Transmon Q1 (Cross-shaped Capacitor) */}
                  <g className="cursor-pointer group" onClick={() => setSelectedChipComponent('transmon-q1')}>
                    <rect x="80" y="95" width="50" height="50" rx="2" fill="rgba(0, 212, 255, 0.1)" stroke="#00d4ff" strokeWidth="1.5" />
                    <line x1="105" y1="90" x2="105" y2="150" stroke="#00d4ff" strokeWidth="4" />
                    <line x1="80" y1="120" x2="130" y2="120" stroke="#00d4ff" strokeWidth="4" />
                    <circle cx="105" cy="120" r="4" fill="#f59e0b" />
                    <text x="105" y="165" textAnchor="middle" fill="#00d4ff" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      QUBIT 1
                    </text>
                  </g>

                  {/* Transmon Q2 (Cross-shaped Capacitor) */}
                  <g className="cursor-pointer group" onClick={() => setSelectedChipComponent('transmon-q1')}>
                    <rect x="270" y="95" width="50" height="50" rx="2" fill="rgba(0, 212, 255, 0.1)" stroke="#00d4ff" strokeWidth="1.5" />
                    <line x1="295" y1="90" x2="295" y2="150" stroke="#00d4ff" strokeWidth="4" />
                    <line x1="270" y1="120" x2="320" y2="120" stroke="#00d4ff" strokeWidth="4" />
                    <circle cx="295" cy="120" r="4" fill="#f59e0b" />
                    <text x="295" y="165" textAnchor="middle" fill="#00d4ff" fontSize="10" fontFamily="monospace" fontWeight="bold">
                      QUBIT 2
                    </text>
                  </g>

                  {/* Josephson Junction SQUID Loops (Magnified Inset) */}
                  <g className="cursor-pointer" onClick={() => setSelectedChipComponent('josephson-junction')}>
                    <rect x="98" y="113" width="14" height="14" rx="1" fill="none" stroke="#f59e0b" strokeWidth="1.2" />
                    <path d="M 100 115 L 110 125 M 100 125 L 110 115" stroke="#f59e0b" strokeWidth="1.5" />
                  </g>

                  {/* Readout Resonators */}
                  <path
                    d="M 105 90 L 105 40 L 40 40"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeDasharray="3 2"
                    className="cursor-pointer hover:stroke-white"
                    onClick={() => setSelectedChipComponent('readout-resonator')}
                  />
                  <text x="50" y="32" fill="#10b981" fontSize="8" fontFamily="monospace">
                    READOUT 1
                  </text>

                  {/* Fast Flux Control Lines */}
                  <path
                    d="M 105 150 L 105 200 L 40 200"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="2"
                    className="cursor-pointer hover:stroke-white"
                    onClick={() => setSelectedChipComponent('flux-line')}
                  />
                  <text x="50" y="215" fill="#38bdf8" fontSize="8" fontFamily="monospace">
                    FLUX LINE Q1
                  </text>
                </svg>
              </div>

              <span className="text-[10px] font-mono text-text-muted mt-2 block text-center">
                Click any circuit element on the QPU die to inspect physical quantum parameters.
              </span>
            </div>

            {/* Component Detail Card */}
            <div className="lg:col-span-5">
              <div className="bg-black/60 p-5 rounded-lg border border-white/[0.08]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: activeChipComp.color }} />
                  <Badge variant="cyan">{activeChipComp.category}</Badge>
                </div>
                <h3 className="text-lg font-bold text-text-primary mt-2">{activeChipComp.name}</h3>

                <p className="mt-3 text-xs text-text-secondary leading-relaxed">{activeChipComp.desc}</p>

                <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-text-muted">Operating Temperature:</span>
                    <span className="text-photon-cyan font-bold">{activeChipComp.operatingTemp}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Relaxation Time (T₁):</span>
                    <span className="text-quantum-emerald font-bold">{activeChipComp.t1Time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Dephasing Time (T₂*):</span>
                    <span className="text-quantum-violet font-bold">{activeChipComp.t2Time}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-muted">Resonance Frequency:</span>
                    <span className="text-text-primary font-bold">{activeChipComp.frequency}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: BELL ENTANGLEMENT CORRELATOR */}
      {activeTab === 'ENTANGLEMENT' && (
        <div className="relative z-10 pt-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Bell State Selector Buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(['PHI_PLUS', 'PHI_MINUS', 'PSI_PLUS', 'PSI_MINUS'] as const).map((key) => {
                const b = bellStates[key];
                const isSelected = selectedBellState === key;
                return (
                  <button
                    key={key}
                    onClick={() => setSelectedBellState(key)}
                    className={`p-3 rounded-lg border text-left transition-all ${
                      isSelected
                        ? 'border-photon-cyan/40 bg-photon-cyan/15 text-photon-cyan shadow-[0_0_15px_rgba(0,212,255,0.15)]'
                        : 'border-white/[0.08] bg-white/[0.02] text-text-muted hover:border-white/20 hover:text-text-primary'
                    }`}
                  >
                    <span className="text-base font-bold font-mono block">{b.name}</span>
                    <span className="text-[10px] font-mono text-text-muted block mt-0.5">{b.formula}</span>
                  </button>
                );
              })}
            </div>

            {/* Visual Twin-Qubit Entanglement Bridge */}
            <div className="bg-black/60 p-6 rounded-lg border border-white/[0.08]">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                {/* Qubit A */}
                <div className="text-center flex-1">
                  <div className="w-16 h-16 rounded-full border-2 border-photon-cyan bg-photon-cyan/10 flex items-center justify-center mx-auto mb-2 shadow-[0_0_15px_rgba(0,212,255,0.3)]">
                    <Atom className="w-8 h-8 text-photon-cyan animate-spin-slow" />
                  </div>
                  <h4 className="text-sm font-bold font-mono text-photon-cyan">Qubit A (Particle 1)</h4>
                  <span className="text-[10px] font-mono text-text-muted">Observable: σ_z(A)</span>
                </div>

                {/* Pulsing Quantum EPR Entanglement Bridge */}
                <div className="flex-1 text-center py-2">
                  <div className="relative flex items-center justify-center">
                    <div className="h-0.5 w-full bg-gradient-to-r from-photon-cyan via-quantum-violet to-photon-cyan animate-pulse" />
                    <span className="absolute bg-deep-space px-3 py-1 text-[11px] font-mono text-quantum-violet border border-quantum-violet/40 rounded-full font-bold">
                      EPR Bridge: {bellStates[selectedBellState].name}
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-text-muted block mt-3">
                    CHSH S-Parameter = 2√2 ≈ 2.828 &gt; 2.0 (Bell Inequality Violated)
                  </span>
                </div>

                {/* Qubit B */}
                <div className="text-center flex-1">
                  <div className="w-16 h-16 rounded-full border-2 border-quantum-violet bg-quantum-violet/10 flex items-center justify-center mx-auto mb-2 shadow-[0_0_15px_rgba(124,58,237,0.3)]">
                    <Atom className="w-8 h-8 text-quantum-violet animate-spin-slow" />
                  </div>
                  <h4 className="text-sm font-bold font-mono text-quantum-violet">Qubit B (Particle 2)</h4>
                  <span className="text-[10px] font-mono text-text-muted">Observable: σ_z(B)</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] text-xs text-text-secondary leading-relaxed">
                <strong>Physical Meaning:</strong> {bellStates[selectedBellState].desc}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: QUANTUM WAVEFUNCTION & TUNNELING */}
      {activeTab === 'WAVE' && (
        <div className="relative z-10 pt-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Wavefunction SVG Plot */}
            <div className="lg:col-span-7">
              <div className="aspect-[16/9] bg-black/80 rounded-lg p-4 border border-white/[0.08] relative">
                <svg viewBox="0 0 360 180" className="w-full h-full">
                  {/* Grid Lines */}
                  <line x1="20" y1="90" x2="340" y2="90" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                  <line x1="160" y1="20" x2="160" y2="160" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 2" />
                  <line x1="200" y1="20" x2="200" y2="160" stroke="rgba(255,255,255,0.1)" strokeDasharray="2 2" />

                  {/* Potential Barrier Rect */}
                  <rect
                    x="160"
                    y={160 - barrierHeight * 1.3}
                    width="40"
                    height={barrierHeight * 1.3}
                    fill="rgba(245, 158, 11, 0.15)"
                    stroke="#f59e0b"
                    strokeWidth="1.5"
                  />
                  <text x="180" y="30" textAnchor="middle" fill="#f59e0b" fontSize="9" fontFamily="monospace">
                    Barrier V₀ ({barrierHeight} eV)
                  </text>

                  {/* Incident Particle Energy Line */}
                  <line
                    x1="20"
                    y1={160 - particleEnergy * 1.3}
                    x2="160"
                    y2={160 - particleEnergy * 1.3}
                    stroke="#00d4ff"
                    strokeWidth="1"
                    strokeDasharray="3 3"
                  />
                  <text x="30" y={150 - particleEnergy * 1.3} fill="#00d4ff" fontSize="8" fontFamily="monospace">
                    Energy E ({particleEnergy} eV)
                  </text>

                  {/* Incident Sine Waveform */}
                  <path
                    d="M 20 90 Q 37.5 50, 55 90 T 90 90 T 125 90 T 160 90"
                    fill="none"
                    stroke="#00d4ff"
                    strokeWidth="2"
                  />

                  {/* Exponential Decay inside barrier (if E < V0) */}
                  <path
                    d={`M 160 90 Q 180 ${particleEnergy < barrierHeight ? 100 : 85}, 200 90`}
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="2"
                  />

                  {/* Transmitted Waveform (Attenuated Amplitude) */}
                  <path
                    d={`M 200 90 Q 217.5 ${90 - (tunnelingProbability / 100) * 35}, 235 90 T 270 90 T 305 90 T 340 90`}
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="1.8"
                  />
                </svg>

                <div className="absolute top-2 right-2 text-[10px] font-mono text-quantum-emerald bg-quantum-emerald/10 border border-quantum-emerald/30 px-2 py-1 rounded">
                  Transmission Probability T: {tunnelingProbability.toFixed(1)}%
                </div>
              </div>
            </div>

            {/* Controls */}
            <div className="lg:col-span-5 space-y-4 font-mono text-xs">
              <div>
                <div className="flex justify-between text-text-muted mb-1">
                  <span>Potential Barrier Height (V₀): {barrierHeight} eV</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={barrierHeight}
                  onChange={(e) => setBarrierHeight(parseInt(e.target.value))}
                  className="w-full accent-energy-amber h-1.5 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-text-muted mb-1">
                  <span>Incident Wave Packet Energy (E): {particleEnergy} eV</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="100"
                  value={particleEnergy}
                  onChange={(e) => setParticleEnergy(parseInt(e.target.value))}
                  className="w-full accent-photon-cyan h-1.5 bg-white/10 rounded-lg cursor-pointer"
                />
              </div>

              <div className="p-3 bg-black/40 rounded border border-white/[0.06] text-[11px] text-text-secondary leading-relaxed">
                {particleEnergy < barrierHeight ? (
                  <p>
                    <strong className="text-energy-amber">Quantum Tunneling Regime (E &lt; V₀):</strong> Classically, a particle cannot cross a barrier higher than its kinetic energy. In quantum mechanics, the wavefunction decay inside the barrier leaves a non-zero probability amplitude on the other side.
                  </p>
                ) : (
                  <p>
                    <strong className="text-quantum-emerald">Transmission Regime (E &ge; V₀):</strong> The particle energy exceeds the barrier height, allowing transmission with quantum interference reflections at the boundary edges.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </GlassCard>
  );
}
