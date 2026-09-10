'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Atom,
  CircuitBoard,
  Share2,
  Network,
  Rocket,
} from 'lucide-react';
import { GlassCard, Badge } from '@/components/ui';

/* ═══════════════════════════════════════════════════════
   QUANTUM PROGRESSION STACK (Hardware to Applications)
   Stage 1: Quantum Machine (Cryogenics & QPU Die)
   Stage 2: Qubits (Bloch Sphere Superposition)
   Stage 3: Quantum Gates (Unitary Circuit Execution)
   Stage 4: Entanglement (Bell States & EPR Correlation)
   Stage 5: Quantum Network (Photonic Interconnects & Repeaters)
   Stage 6: Quantum Applications (Scientific Discovery)
   ═══════════════════════════════════════════════════════ */

interface ProgressionStage {
  id: string;
  step: string;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  badge: string;
  description: string;
  technicalDetails: {
    principle: string;
    metrics: string[];
    hardwareFormula: string;
  };
  visualType: 'CRYO' | 'BLOCH' | 'CIRCUIT' | 'ENTANGLE' | 'NETWORK' | 'APP';
}

const STAGES: ProgressionStage[] = [
  {
    id: 'stage-machine',
    step: '01',
    title: 'Quantum Machines',
    subtitle: 'Cryogenic Dilution Infrastructure & Superconducting QPU',
    icon: Cpu,
    accentColor: '#00d4ff',
    badge: 'HARDWARE PLATFORM',
    description:
      'Engineered multi-stage dilution refrigerators cooling superconducting circuits to 15 millikelvin. Isolates transmon qubits from thermal phonon noise to preserve delicate quantum superposition states.',
    technicalDetails: {
      principle: 'Josephson non-linear inductance creating an artificial two-level atom.',
      metrics: ['Base Temp: 14.8 mK', 'Anharmonicity: α = -290 MHz', 'T₁ Lifetime: > 90 µs'],
      hardwareFormula: 'H = 4E_C(n - n_g)^2 - E_J cos(φ)',
    },
    visualType: 'CRYO',
  },
  {
    id: 'stage-qubit',
    step: '02',
    title: 'Qubits & State Vectors',
    subtitle: 'Coherent Superposition on the Bloch Sphere',
    icon: Atom,
    accentColor: '#38bdf8',
    badge: 'QUANTUM STATE',
    description:
      'Unlike classical bits restricted to 0 or 1, a qubit exists in a continuous linear superposition |ψ⟩ = α|0⟩ + β|1⟩. Geometrically mapped on the surface of a three-dimensional Bloch sphere.',
    technicalDetails: {
      principle: 'Normalized state vector |ψ⟩ where total measurement probability |α|² + |β|² = 1.',
      metrics: ['Single-Qubit Fidelity: 99.98%', 'Dephasing T₂*: 124 µs', 'Readout χ: 2.4 MHz'],
      hardwareFormula: '|ψ⟩ = cos(θ/2)|0⟩ + e^{iφ}sin(θ/2)|1⟩',
    },
    visualType: 'BLOCH',
  },
  {
    id: 'stage-gate',
    step: '03',
    title: 'Quantum Gates & Circuits',
    subtitle: 'Unitary Hamiltonian Microwave Control',
    icon: CircuitBoard,
    accentColor: '#7c3aed',
    badge: 'LOGIC & ALGORITHMS',
    description:
      'Calibrated microwave pulses (12–40 ns) rotate the qubit state vector across the Bloch sphere. Reversible unitary matrices (H, X, Z, CNOT, CZ) form universal gate sets capable of quantum interference.',
    technicalDetails: {
      principle: 'Unitary operator U satisfying U†U = I, preserving state vector normalization.',
      metrics: ['Single-Qubit Gate Time: 12 ns', 'Two-Qubit CZ Time: 42 ns', 'Crosstalk: < -38 dB'],
      hardwareFormula: 'H = 1/√2 [[1, 1], [1, -1]], CNOT = [[1,0,0,0],[0,1,0,0],[0,0,0,1],[0,0,1,0]]',
    },
    visualType: 'CIRCUIT',
  },
  {
    id: 'stage-entangle',
    step: '04',
    title: 'Quantum Entanglement',
    subtitle: 'Non-Local Bell States & EPR Correlation',
    icon: Share2,
    accentColor: '#f59e0b',
    badge: 'QUANTUM CORRELATION',
    description:
      'Generating maximal two-qubit entangled states where the joint state cannot be factored into individual qubit states. Measuring one qubit instantaneously determines the state of its paired twin.',
    technicalDetails: {
      principle: 'CHSH inequality violation proving non-local correlations beyond classical physics.',
      metrics: ['Bell State Fidelity: > 99.2%', 'CHSH S-Parameter: 2.828', 'Pair Generation: 14.2 kHz'],
      hardwareFormula: '|Φ⁺⟩ = (|00⟩ + |11⟩) / √2',
    },
    visualType: 'ENTANGLE',
  },
  {
    id: 'stage-network',
    step: '05',
    title: 'Quantum Networks',
    subtitle: 'Multi-Hop Entanglement Routing & Repeaters',
    icon: Network,
    accentColor: '#10b981',
    badge: 'DISTRIBUTED SYSTEMS',
    description:
      'Transducing cryogenic microwave qubits into 1550 nm telecom optical photons. Entanglement swapping at intermediate repeater stations distributes Bell pairs across continents without cloning photons.',
    technicalDetails: {
      principle: 'Bell-State Measurement (BSM) swapping at repeaters overcoming 0.18 dB/km fiber loss.',
      metrics: ['Telecom Band: 1550 nm', 'BSM Fidelity: 98.5%', 'Transduction: 47.2%'],
      hardwareFormula: 'BSM(A_2, B_1) → Teleport(|ψ⟩_{A_1} → B_2)',
    },
    visualType: 'NETWORK',
  },
  {
    id: 'stage-apps',
    step: '06',
    title: 'Quantum Applications',
    subtitle: 'Fault-Tolerant Computation & Physical Discovery',
    icon: Rocket,
    accentColor: '#ec4899',
    badge: 'IMPACT & DEPLOYMENT',
    description:
      'Transforming computational chemistry (catalysis, nitrogen fixation), materials science (high-Tc superconductors), post-quantum cryptography, and blind cloud computing.',
    technicalDetails: {
      principle: 'Exponential state-space scaling N qubits = 2^N simultaneous basis states.',
      metrics: ['Computational Space: 2¹²⁸ States', 'PQC Migration: ML-KEM / ML-DSA', 'VQE Energy Precision: 10⁻⁴ Ha'],
      hardwareFormula: 'E_0 = min_θ ⟨ψ(θ)| H_molecular |ψ(θ)⟩',
    },
    visualType: 'APP',
  },
];

export default function QuantumProgressionStack() {
  const [activeStageId, setActiveStageId] = useState<string>('stage-machine');
  const activeStage = STAGES.find((s) => s.id === activeStageId) || STAGES[0];

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="flex items-center gap-2 justify-center mb-3">
          <span className="w-2 h-2 rounded-full bg-photon-cyan animate-pulse" />
          <span className="text-[11px] font-mono font-bold tracking-[0.2em] uppercase text-photon-cyan">
            COMPLETE SCIENTIFIC PIPELINE
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary">
          From Cryogenic Hardware to Quantum Networks
        </h2>
        <p className="mt-4 text-base text-text-secondary max-w-2xl mx-auto leading-relaxed">
          How SHIELD Quantum engineers physical quantum systems from sub-Kelvin microwave processors to
          intercontinental entanglement networks.
        </p>
      </div>

      {/* 6-Stage Progress Tab Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
        {STAGES.map((stage) => {
          const Icon = stage.icon;
          const isSelected = activeStageId === stage.id;
          return (
            <button
              key={stage.id}
              onClick={() => setActiveStageId(stage.id)}
              className={`p-3 rounded-lg border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-white/[0.06] border-photon-cyan/50 shadow-[0_0_20px_rgba(0,212,255,0.12)]'
                  : 'bg-white/[0.02] border-white/[0.06] hover:bg-white/[0.04] hover:border-white/15'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-text-muted font-bold">
                    STEP {stage.step}
                  </span>
                  <div
                    className="p-1 rounded"
                    style={{ color: stage.accentColor, backgroundColor: `${stage.accentColor}15` }}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                </div>
                <h3 className={`text-xs font-bold font-mono ${isSelected ? 'text-photon-cyan' : 'text-text-primary'}`}>
                  {stage.title}
                </h3>
              </div>

              {isSelected && (
                <div
                  className="h-0.5 w-full mt-3 rounded-full"
                  style={{ backgroundColor: stage.accentColor }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Stage Detail Card with Recognizable Visuals */}
      <GlassCard className="p-6 sm:p-8 relative overflow-hidden border-photon-cyan/20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Visual Area */}
          <div className="lg:col-span-6 aspect-[16/11] bg-black/85 rounded-lg p-5 border border-white/[0.08] relative flex items-center justify-center overflow-hidden">
            {/* Visual 1: Quantum Machine / Cryo Chandelier */}
            {activeStage.visualType === 'CRYO' && (
              <svg viewBox="0 0 320 220" className="w-full h-full">
                <defs>
                  <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fbbf24" />
                    <stop offset="100%" stopColor="#d97706" />
                  </linearGradient>
                </defs>
                {/* 300K Flange */}
                <rect x="60" y="20" width="200" height="12" rx="3" fill="#64748b" />
                <text x="160" y="29" textAnchor="middle" fill="#ffffff" fontSize="7" fontFamily="monospace">
                  300 K VACUUM FLANGE
                </text>
                {/* 50K Plate */}
                <rect x="80" y="55" width="160" height="9" rx="2" fill="url(#goldGrad)" />
                <text x="160" y="62" textAnchor="middle" fill="#000000" fontSize="6" fontFamily="monospace" fontWeight="bold">
                  50 K RADIATION SHIELD
                </text>
                {/* 4K Plate */}
                <rect x="100" y="90" width="120" height="9" rx="2" fill="url(#goldGrad)" />
                <text x="160" y="97" textAnchor="middle" fill="#000000" fontSize="6" fontFamily="monospace" fontWeight="bold">
                  4.2 K CONDENSER
                </text>
                {/* 100mK Plate */}
                <rect x="115" y="125" width="90" height="8" rx="2" fill="url(#goldGrad)" />
                {/* 15mK Mixing Chamber & QPU */}
                <rect x="130" y="160" width="60" height="24" rx="3" fill="#00d4ff" fillOpacity="0.2" stroke="#00d4ff" strokeWidth="1.5" />
                <circle cx="160" cy="172" r="6" fill="#00d4ff" />
                <text x="160" y="198" textAnchor="middle" fill="#00d4ff" fontSize="8" fontFamily="monospace" fontWeight="bold">
                  15 mK SUPERCONDUCTING QPU
                </text>

                {/* Coaxial Lines */}
                <path d="M 80 32 L 80 160" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                <path d="M 240 32 L 240 160" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3 2" />
                <path d="M 120 32 L 120 160" stroke="#00d4ff" strokeWidth="1.5" />
                <path d="M 200 32 L 200 160" stroke="#00d4ff" strokeWidth="1.5" />
              </svg>
            )}

            {/* Visual 2: Qubit Bloch Sphere */}
            {activeStage.visualType === 'BLOCH' && (
              <svg viewBox="0 0 260 200" className="w-full h-full">
                <circle cx="130" cy="100" r="70" fill="none" stroke="rgba(0, 212, 255, 0.4)" strokeWidth="1.2" />
                <ellipse cx="130" cy="100" rx="70" ry="20" fill="none" stroke="#00d4ff" strokeWidth="0.8" strokeDasharray="2 2" />
                <line x1="130" y1="15" x2="130" y2="185" stroke="#ffffff" strokeWidth="1" />
                <line x1="130" y1="100" x2="185" y2="60" stroke="#00d4ff" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="185" cy="60" r="5" fill="#00d4ff" />
                <text x="130" y="12" textAnchor="middle" fill="#00d4ff" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  |0⟩
                </text>
                <text x="130" y="196" textAnchor="middle" fill="#7c3aed" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  |1⟩
                </text>
                <text x="198" y="60" fill="#00d4ff" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  |ψ⟩
                </text>
              </svg>
            )}

            {/* Visual 3: Quantum Circuit */}
            {activeStage.visualType === 'CIRCUIT' && (
              <svg viewBox="0 0 300 180" className="w-full h-full font-mono">
                {/* Qubit wire q0 */}
                <text x="20" y="65" fill="#00d4ff" fontSize="10">q₀ |0⟩</text>
                <line x1="60" y1="60" x2="280" y2="60" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                {/* Qubit wire q1 */}
                <text x="20" y="125" fill="#00d4ff" fontSize="10">q₁ |0⟩</text>
                <line x1="60" y1="120" x2="280" y2="120" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

                {/* Hadamard Gate */}
                <rect x="90" y="45" width="30" height="30" rx="3" fill="#00d4ff" fillOpacity="0.2" stroke="#00d4ff" strokeWidth="1.5" />
                <text x="105" y="65" textAnchor="middle" fill="#00d4ff" fontSize="12" fontWeight="bold">H</text>

                {/* CNOT Gate */}
                <circle cx="170" cy="60" r="5" fill="#7c3aed" />
                <line x1="170" y1="60" x2="170" y2="120" stroke="#7c3aed" strokeWidth="2" />
                <circle cx="170" cy="120" r="10" fill="none" stroke="#7c3aed" strokeWidth="2" />
                <line x1="170" y1="112" x2="170" y2="128" stroke="#7c3aed" strokeWidth="2" />
                <line x1="162" y1="120" x2="178" y2="120" stroke="#7c3aed" strokeWidth="2" />

                {/* Measurement Gate */}
                <rect x="230" y="45" width="28" height="30" rx="3" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
                <text x="244" y="65" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">M</text>
                <rect x="230" y="105" width="28" height="30" rx="3" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
                <text x="244" y="125" textAnchor="middle" fill="#10b981" fontSize="11" fontWeight="bold">M</text>
              </svg>
            )}

            {/* Visual 4: Entangled Bell State */}
            {activeStage.visualType === 'ENTANGLE' && (
              <svg viewBox="0 0 300 180" className="w-full h-full">
                <circle cx="70" cy="90" r="28" fill="rgba(0, 212, 255, 0.15)" stroke="#00d4ff" strokeWidth="2" />
                <text x="70" y="95" textAnchor="middle" fill="#00d4ff" fontSize="12" fontFamily="monospace" fontWeight="bold">Q₁</text>
                <circle cx="230" cy="90" r="28" fill="rgba(124, 58, 237, 0.15)" stroke="#7c3aed" strokeWidth="2" />
                <text x="230" y="95" textAnchor="middle" fill="#7c3aed" fontSize="12" fontFamily="monospace" fontWeight="bold">Q₂</text>
                {/* Entanglement bridge */}
                <line x1="98" y1="90" x2="202" y2="90" stroke="#f59e0b" strokeWidth="3" strokeDasharray="4 2" />
                <circle cx="150" cy="90" r="10" fill="#f59e0b" />
                <text x="150" y="65" textAnchor="middle" fill="#f59e0b" fontSize="10" fontFamily="monospace" fontWeight="bold">
                  |Φ⁺⟩ = (|00⟩ + |11⟩)/√2
                </text>
                <text x="150" y="130" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="8" fontFamily="monospace">
                  NON-LOCAL CORRELATION (EPR)
                </text>
              </svg>
            )}

            {/* Visual 5: Quantum Network */}
            {activeStage.visualType === 'NETWORK' && (
              <svg viewBox="0 0 300 180" className="w-full h-full font-mono">
                {/* Node 1 */}
                <circle cx="60" cy="60" r="14" fill="#00d4ff" fillOpacity="0.2" stroke="#00d4ff" strokeWidth="1.5" />
                <text x="60" y="64" textAnchor="middle" fill="#00d4ff" fontSize="7" fontWeight="bold">BOS</text>
                {/* Repeater */}
                <circle cx="150" cy="110" r="14" fill="#10b981" fillOpacity="0.2" stroke="#10b981" strokeWidth="1.5" />
                <text x="150" y="114" textAnchor="middle" fill="#10b981" fontSize="7" fontWeight="bold">REP</text>
                {/* Node 2 */}
                <circle cx="240" cy="60" r="14" fill="#7c3aed" fillOpacity="0.2" stroke="#7c3aed" strokeWidth="1.5" />
                <text x="240" y="64" textAnchor="middle" fill="#7c3aed" fontSize="7" fontWeight="bold">ZUR</text>
                {/* Links */}
                <line x1="74" y1="65" x2="136" y2="105" stroke="#00d4ff" strokeWidth="2" strokeDasharray="3 2" />
                <line x1="164" y1="105" x2="226" y2="65" stroke="#7c3aed" strokeWidth="2" strokeDasharray="3 2" />
                <text x="150" y="150" textAnchor="middle" fill="#10b981" fontSize="8">
                  ENTANGLEMENT SWAPPING (1550 nm C-Band)
                </text>
              </svg>
            )}

            {/* Visual 6: Applications */}
            {activeStage.visualType === 'APP' && (
              <svg viewBox="0 0 300 180" className="w-full h-full font-mono">
                <rect x="30" y="30" width="110" height="50" rx="4" fill="rgba(0, 212, 255, 0.1)" stroke="#00d4ff" strokeWidth="1" />
                <text x="85" y="52" textAnchor="middle" fill="#00d4ff" fontSize="9" fontWeight="bold">MATERIALS</text>
                <text x="85" y="66" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7">Superconductors</text>

                <rect x="160" y="30" width="110" height="50" rx="4" fill="rgba(124, 58, 237, 0.1)" stroke="#7c3aed" strokeWidth="1" />
                <text x="215" y="52" textAnchor="middle" fill="#7c3aed" fontSize="9" fontWeight="bold">CHEMISTRY</text>
                <text x="215" y="66" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7">Nitrogenase VQE</text>

                <rect x="30" y="100" width="110" height="50" rx="4" fill="rgba(245, 158, 11, 0.1)" stroke="#f59e0b" strokeWidth="1" />
                <text x="85" y="122" textAnchor="middle" fill="#f59e0b" fontSize="9" fontWeight="bold">SECURITY</text>
                <text x="85" y="136" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7">PQC Post-Quantum</text>

                <rect x="160" y="100" width="110" height="50" rx="4" fill="rgba(16, 185, 129, 0.1)" stroke="#10b981" strokeWidth="1" />
                <text x="215" y="122" textAnchor="middle" fill="#10b981" fontSize="9" fontWeight="bold">OPTIMIZATION</text>
                <text x="215" y="136" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7">QAOA Complex Grid</text>
              </svg>
            )}
          </div>

          {/* Right Text / Physical Telemetry */}
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="cyan">{activeStage.badge}</Badge>
              <span className="text-[10px] font-mono text-text-muted">STAGE {activeStage.step} OF 06</span>
            </div>

            <h3 className="text-2xl font-bold text-text-primary">{activeStage.title}</h3>
            <p className="text-sm font-mono text-photon-cyan">{activeStage.subtitle}</p>

            <p className="text-sm text-text-secondary leading-relaxed">{activeStage.description}</p>

            {/* Formula Block */}
            <div className="bg-black/50 p-3 rounded-lg border border-white/[0.08] font-mono text-xs text-photon-cyan">
              <span className="text-[9px] text-text-muted uppercase tracking-wider block mb-1">
                Governing Equation:
              </span>
              <span className="font-bold">{activeStage.technicalDetails.hardwareFormula}</span>
            </div>

            {/* Metric Pills */}
            <div className="flex flex-wrap gap-2 pt-2">
              {activeStage.technicalDetails.metrics.map((metric, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-white/[0.03] text-[11px] font-mono text-text-primary rounded border border-white/[0.06]"
                >
                  {metric}
                </span>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
