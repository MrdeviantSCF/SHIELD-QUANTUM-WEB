'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  RotateCcw,
  Play,
  Pause,
  StepForward,
  Plus,
  Minus,
  Info,
  Layers,
  Cpu,
  Zap,
  Sliders,
  BarChart2,
  Atom,
  Flame,
  ArrowRight,
  BookOpen,
  ShieldCheck,
  Undo2,
  Redo2,
  Sparkles,
  Maximize2,
  X,
  Search,
  Eye,
} from 'lucide-react';
import { Section, SectionHeader, GlassCard, Badge, Button } from '@/components/ui';
import { SIMULATOR_VISUAL_ASSETS, SimulatorVisualAsset } from '@/data/simulatorVisualAssets';

/* ═══════════════════════════════════════════════════════
   SHIELD QUANTUM SIMULATOR — MATHEMATICAL KERNEL
   ═══════════════════════════════════════════════════════ */

export type GateType =
  | 'I'
  | 'X'
  | 'Y'
  | 'Z'
  | 'H'
  | 'S'
  | 'T'
  | 'S_DAG'
  | 'T_DAG'
  | 'RX'
  | 'RY'
  | 'RZ'
  | 'CNOT'
  | 'CZ'
  | 'SWAP'
  | 'TOFFOLI'
  | 'RESET'
  | 'MEASURE';

export interface Gate {
  id: string;
  type: GateType;
  qubit: number;
  controlQubit?: number;
  control2Qubit?: number; // For Toffoli
  target2Qubit?: number; // For SWAP
  column: number;
  angle?: number;
}

export interface Complex {
  re: number;
  im: number;
}

function complexMul(a: Complex, b: Complex): Complex {
  return {
    re: a.re * b.re - a.im * b.im,
    im: a.re * b.im + a.im * b.re,
  };
}

function complexAdd(a: Complex, b: Complex): Complex {
  return { re: a.re + b.re, im: a.im + b.im };
}

function complexMag2(a: Complex): number {
  return a.re * a.re + a.im * a.im;
}

function complexPhase(a: Complex): number {
  return Math.atan2(a.im, a.re);
}

const SQRT2_INV = 1 / Math.SQRT2;

// Standard single-qubit matrix definitions
const SINGLE_QUBIT_MATRICES: Record<string, (angle?: number) => Complex[][]> = {
  I: () => [
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: 1, im: 0 }],
  ],
  X: () => [
    [{ re: 0, im: 0 }, { re: 1, im: 0 }],
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
  ],
  Y: () => [
    [{ re: 0, im: 0 }, { re: 0, im: -1 }],
    [{ re: 0, im: 1 }, { re: 0, im: 0 }],
  ],
  Z: () => [
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: -1, im: 0 }],
  ],
  H: () => [
    [{ re: SQRT2_INV, im: 0 }, { re: SQRT2_INV, im: 0 }],
    [{ re: SQRT2_INV, im: 0 }, { re: -SQRT2_INV, im: 0 }],
  ],
  S: () => [
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: 0, im: 1 }],
  ],
  T: () => [
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: SQRT2_INV, im: SQRT2_INV }],
  ],
  S_DAG: () => [
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: 0, im: -1 }],
  ],
  T_DAG: () => [
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: SQRT2_INV, im: -SQRT2_INV }],
  ],
  RX: (theta = Math.PI / 2) => [
    [{ re: Math.cos(theta / 2), im: 0 }, { re: 0, im: -Math.sin(theta / 2) }],
    [{ re: 0, im: -Math.sin(theta / 2) }, { re: Math.cos(theta / 2), im: 0 }],
  ],
  RY: (theta = Math.PI / 2) => [
    [{ re: Math.cos(theta / 2), im: 0 }, { re: -Math.sin(theta / 2), im: 0 }],
    [{ re: Math.sin(theta / 2), im: 0 }, { re: Math.cos(theta / 2), im: 0 }],
  ],
  RZ: (theta = Math.PI / 2) => [
    [{ re: Math.cos(theta / 2), im: -Math.sin(theta / 2) }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: Math.cos(theta / 2), im: Math.sin(theta / 2) }],
  ],
};

function applySingleQubitGate(state: Complex[], qubit: number, numQubits: number, matrix: Complex[][]): Complex[] {
  const dim = 1 << numQubits;
  const nextState: Complex[] = new Array(dim).fill(null).map(() => ({ re: 0, im: 0 }));
  const mask = 1 << (numQubits - 1 - qubit);

  for (let i = 0; i < dim; i++) {
    if ((i & mask) === 0) {
      const i0 = i;
      const i1 = i | mask;
      const a0 = state[i0];
      const a1 = state[i1];

      const out0 = complexAdd(complexMul(matrix[0][0], a0), complexMul(matrix[0][1], a1));
      const out1 = complexAdd(complexMul(matrix[1][0], a0), complexMul(matrix[1][1], a1));

      nextState[i0] = out0;
      nextState[i1] = out1;
    }
  }
  return nextState;
}

function applyCNOTGate(state: Complex[], control: number, target: number, numQubits: number): Complex[] {
  const dim = 1 << numQubits;
  const nextState: Complex[] = [...state];
  const controlMask = 1 << (numQubits - 1 - control);
  const targetMask = 1 << (numQubits - 1 - target);

  for (let i = 0; i < dim; i++) {
    if ((i & controlMask) !== 0 && (i & targetMask) === 0) {
      const paired = i | targetMask;
      const tmp = nextState[i];
      nextState[i] = nextState[paired];
      nextState[paired] = tmp;
    }
  }
  return nextState;
}

function applyCZGate(state: Complex[], control: number, target: number, numQubits: number): Complex[] {
  const dim = 1 << numQubits;
  const nextState: Complex[] = [...state];
  const controlMask = 1 << (numQubits - 1 - control);
  const targetMask = 1 << (numQubits - 1 - target);

  for (let i = 0; i < dim; i++) {
    if ((i & controlMask) !== 0 && (i & targetMask) !== 0) {
      nextState[i] = { re: -nextState[i].re, im: -nextState[i].im };
    }
  }
  return nextState;
}

function applySWAPGate(state: Complex[], q1: number, q2: number, numQubits: number): Complex[] {
  const dim = 1 << numQubits;
  const nextState: Complex[] = [...state];
  const mask1 = 1 << (numQubits - 1 - q1);
  const mask2 = 1 << (numQubits - 1 - q2);

  for (let i = 0; i < dim; i++) {
    const bit1 = (i & mask1) !== 0;
    const bit2 = (i & mask2) !== 0;
    if (bit1 !== bit2 && bit1) {
      const paired = (i & ~mask1) | mask2;
      const tmp = nextState[i];
      nextState[i] = nextState[paired];
      nextState[paired] = tmp;
    }
  }
  return nextState;
}

function applyToffoliGate(state: Complex[], c1: number, c2: number, target: number, numQubits: number): Complex[] {
  const dim = 1 << numQubits;
  const nextState: Complex[] = [...state];
  const maskC1 = 1 << (numQubits - 1 - c1);
  const maskC2 = 1 << (numQubits - 1 - c2);
  const maskT = 1 << (numQubits - 1 - target);

  for (let i = 0; i < dim; i++) {
    if ((i & maskC1) !== 0 && (i & maskC2) !== 0 && (i & maskT) === 0) {
      const paired = i | maskT;
      const tmp = nextState[i];
      nextState[i] = nextState[paired];
      nextState[paired] = tmp;
    }
  }
  return nextState;
}

function simulateCircuitUpTo(gates: Gate[], numQubits: number, maxColumn?: number): Complex[] {
  const dim = 1 << numQubits;
  let state: Complex[] = new Array(dim).fill(null).map((_, i) => (i === 0 ? { re: 1, im: 0 } : { re: 0, im: 0 }));

  const activeGates = gates
    .filter((g) => (maxColumn === undefined ? true : g.column <= maxColumn))
    .sort((a, b) => a.column - b.column);

  for (const gate of activeGates) {
    if (SINGLE_QUBIT_MATRICES[gate.type]) {
      const mat = SINGLE_QUBIT_MATRICES[gate.type](gate.angle);
      state = applySingleQubitGate(state, gate.qubit, numQubits, mat);
    } else if (gate.type === 'CNOT' && gate.controlQubit !== undefined) {
      state = applyCNOTGate(state, gate.controlQubit, gate.qubit, numQubits);
    } else if (gate.type === 'CZ' && gate.controlQubit !== undefined) {
      state = applyCZGate(state, gate.controlQubit, gate.qubit, numQubits);
    } else if (gate.type === 'SWAP' && gate.target2Qubit !== undefined) {
      state = applySWAPGate(state, gate.qubit, gate.target2Qubit, numQubits);
    } else if (gate.type === 'TOFFOLI' && gate.controlQubit !== undefined && gate.control2Qubit !== undefined) {
      state = applyToffoliGate(state, gate.controlQubit, gate.control2Qubit, gate.qubit, numQubits);
    }
  }
  return state;
}

export interface BlochVector {
  x: number;
  y: number;
  z: number;
  theta: number;
  phi: number;
  probZero: number;
  probOne: number;
}

function computeBlochVector(state: Complex[], targetQubit: number, numQubits: number): BlochVector {
  const dim = 1 << numQubits;
  const mask = 1 << (numQubits - 1 - targetQubit);

  let rho00 = 0;
  let rho11 = 0;
  let rho01_re = 0;
  let rho01_im = 0;

  for (let i = 0; i < dim; i++) {
    if ((i & mask) === 0) {
      const i0 = i;
      const i1 = i | mask;
      const a0 = state[i0];
      const a1 = state[i1];

      rho00 += a0.re * a0.re + a0.im * a0.im;
      rho11 += a1.re * a1.re + a1.im * a1.im;

      rho01_re += a0.re * a1.re + a0.im * a1.im;
      rho01_im += a0.im * a1.re - a0.re * a1.im;
    }
  }

  const x = 2 * rho01_re;
  const y = 2 * rho01_im;
  const z = rho00 - rho11;

  const r = Math.sqrt(x * x + y * y + z * z);
  const clampedZ = Math.max(-1, Math.min(1, r > 0 ? z / r : 0));
  const theta = Math.acos(clampedZ);
  const phi = Math.atan2(y, x);

  return {
    x,
    y,
    z,
    theta,
    phi,
    probZero: rho00,
    probOne: rho11,
  };
}

function formatComplex(c: Complex): string {
  const reStr = c.re.toFixed(3);
  const imAbs = Math.abs(c.im).toFixed(3);
  if (Math.abs(c.im) < 0.0001) return reStr;
  if (Math.abs(c.re) < 0.0001) return `${c.im < 0 ? '-' : ''}${imAbs}i`;
  return `${reStr} ${c.im < 0 ? '-' : '+'} ${imAbs}i`;
}

function formatKet(index: number, numQubits: number): string {
  return `|${index.toString(2).padStart(numQubits, '0')}⟩`;
}

/* ═══════════════════════════════════════════════════════
   PRESET QUANTUM ALGORITHMS (Ready-to-run)
   ═══════════════════════════════════════════════════════ */

interface QuantumAlgorithmPreset {
  id: string;
  name: string;
  category: string;
  description: string;
  qubits: number;
  expectedResult: string;
  gates: Gate[];
}

const ALGORITHM_PRESETS: QuantumAlgorithmPreset[] = [
  {
    id: 'bell-state',
    name: 'Bell State (|Φ⁺⟩)',
    category: 'Entanglement',
    description: 'Generates maximal two-qubit entanglement (|00⟩ + |11⟩)/√2 using Hadamard and CNOT.',
    qubits: 2,
    expectedResult: '50% |00⟩, 50% |11⟩ with zero cross-correlation to |01⟩ and |10⟩.',
    gates: [
      { id: 'b1', type: 'H', qubit: 0, column: 0 },
      { id: 'b2', type: 'CNOT', qubit: 1, controlQubit: 0, column: 1 },
    ],
  },
  {
    id: 'ghz-state',
    name: 'GHZ State (3-Qubit)',
    category: 'Entanglement',
    description: 'Creates tripartite Greenberger-Horne-Zeilinger state (|000⟩ + |111⟩)/√2.',
    qubits: 3,
    expectedResult: '50% |000⟩, 50% |111⟩ demonstrating macroscopic quantum non-locality.',
    gates: [
      { id: 'g1', type: 'H', qubit: 0, column: 0 },
      { id: 'g2', type: 'CNOT', qubit: 1, controlQubit: 0, column: 1 },
      { id: 'g3', type: 'CNOT', qubit: 2, controlQubit: 1, column: 2 },
    ],
  },
  {
    id: 'grover-search',
    name: "Grover's Search (Target |11⟩)",
    category: 'Search & Amplitude Amplification',
    description: 'Demonstrates quadratic speedup by inverting target state phase followed by mean diffusion.',
    qubits: 2,
    expectedResult: '100% probability for the marked target state |11⟩ after one Grover iteration.',
    gates: [
      { id: 'gr1', type: 'H', qubit: 0, column: 0 },
      { id: 'gr2', type: 'H', qubit: 1, column: 0 },
      { id: 'gr3', type: 'CZ', qubit: 1, controlQubit: 0, column: 1 },
      { id: 'gr4', type: 'H', qubit: 0, column: 2 },
      { id: 'gr5', type: 'H', qubit: 1, column: 2 },
      { id: 'gr6', type: 'X', qubit: 0, column: 3 },
      { id: 'gr7', type: 'X', qubit: 1, column: 3 },
      { id: 'gr8', type: 'CZ', qubit: 1, controlQubit: 0, column: 4 },
      { id: 'gr9', type: 'X', qubit: 0, column: 5 },
      { id: 'gr10', type: 'X', qubit: 1, column: 5 },
      { id: 'gr11', type: 'H', qubit: 0, column: 6 },
      { id: 'gr12', type: 'H', qubit: 1, column: 6 },
    ],
  },
  {
    id: 'teleportation',
    name: 'Quantum Teleportation Protocol',
    category: 'Communication',
    description: 'Transfers an unknown state |ψ⟩ from Q0 to Q2 via shared Bell pair and classical feedforward.',
    qubits: 3,
    expectedResult: 'State from Q0 faithfully reconstructed on Q2.',
    gates: [
      { id: 't1', type: 'H', qubit: 0, column: 0 },
      { id: 't2', type: 'H', qubit: 1, column: 1 },
      { id: 't3', type: 'CNOT', qubit: 2, controlQubit: 1, column: 2 },
      { id: 't4', type: 'CNOT', qubit: 1, controlQubit: 0, column: 3 },
      { id: 't5', type: 'H', qubit: 0, column: 4 },
    ],
  },
  {
    id: 'qft-3q',
    name: 'Quantum Fourier Transform (QFT-3Q)',
    category: 'Core Algorithms',
    description: 'Discrete Fourier transform mapping state amplitudes to phase frequencies in O(n²) gates.',
    qubits: 3,
    expectedResult: 'Evenly distributed phase spectrum across all computational basis states.',
    gates: [
      { id: 'qft1', type: 'H', qubit: 0, column: 0 },
      { id: 'qft2', type: 'S', qubit: 0, column: 1 },
      { id: 'qft3', type: 'T', qubit: 0, column: 2 },
      { id: 'qft4', type: 'H', qubit: 1, column: 3 },
      { id: 'qft5', type: 'S', qubit: 1, column: 4 },
      { id: 'qft6', type: 'H', qubit: 2, column: 5 },
      { id: 'qft7', type: 'SWAP', qubit: 0, target2Qubit: 2, column: 6 },
    ],
  },
];

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT — SHIELD QUANTUM SIMULATOR
   ═══════════════════════════════════════════════════════ */

export default function SimulatorPage() {
  // Qubit Count: 1 to 5 (2^5 = 32 dimensions)
  const [numQubits, setNumQubits] = useState<number>(3);
  const [selectedGateType, setSelectedGateType] = useState<GateType>('H');
  const [inspectedQubit, setInspectedQubit] = useState<number>(0);

  // Multi-qubit control selection state
  const [cnotControl, setCnotControl] = useState<number | null>(null);
  const [swapFirst, setSwapFirst] = useState<number | null>(null);
  const [toffoliControls, setToffoliControls] = useState<number[]>([]);

  // Default Circuit: Bell State generator
  const [gates, setGates] = useState<Gate[]>([
    { id: 'init-1', type: 'H', qubit: 0, column: 0 },
    { id: 'init-2', type: 'CNOT', qubit: 1, controlQubit: 0, column: 1 },
  ]);

  // Active Playback & Stepping State
  const [activeStepColumn, setActiveStepColumn] = useState<number | undefined>(undefined);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const playbackTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Measurement Shots & Empirical Results
  const [shotCount, setShotCount] = useState<number>(1000);
  const [empiricalCounts, setEmiricalCounts] = useState<Record<string, number> | null>(null);

  // Noise Model Simulation
  const [noiseEnabled, setNoiseEnabled] = useState<boolean>(false);
  const [depolarizingRate, setDepolarizingRate] = useState<number>(0.05);
  const [readoutErrorRate, setReadoutErrorRate] = useState<number>(0.03);

  // View Mode Toggle (5 Tabs)
  const [activeTab, setActiveTab] = useState<'CIRCUIT' | 'BLOCH' | 'PROCESSOR' | 'ALGORITHMS' | 'VISUAL_LIBRARY'>('CIRCUIT');

  // Visual Asset Modal & Filter State
  const [activeVisualModal, setActiveVisualModal] = useState<SimulatorVisualAsset | null>(null);
  const [visualCategoryFilter, setVisualCategoryFilter] = useState<string>('ALL');
  const [visualSearchQuery, setVisualSearchQuery] = useState<string>('');

  // History for Undo / Redo
  const [history, setHistory] = useState<Gate[][]>([]);
  const [future, setFuture] = useState<Gate[][]>([]);

  const pushHistory = (newGates: Gate[]) => {
    setHistory((prev) => [...prev.slice(-15), gates]);
    setFuture([]);
    setGates(newGates);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previous = history[history.length - 1];
    setFuture((prev) => [gates, ...prev]);
    setHistory((prev) => prev.slice(0, -1));
    setGates(previous);
  };

  const handleRedo = () => {
    if (future.length === 0) return;
    const next = future[0];
    setHistory((prev) => [...prev, gates]);
    setFuture((prev) => prev.slice(1));
    setGates(next);
  };

  // Compute Maximum Column
  const maxCol = useMemo(() => (gates.length > 0 ? Math.max(...gates.map((g) => g.column)) : -1), [gates]);
  const numColumns = Math.min(Math.max(maxCol + 2, 6), 14);

  // Compute Full State Vector
  const stateVector = useMemo(
    () => simulateCircuitUpTo(gates, numQubits, activeStepColumn),
    [gates, numQubits, activeStepColumn]
  );

  // Compute Exact Basis Probabilities
  const idealProbabilities = useMemo(() => stateVector.map((c) => complexMag2(c)), [stateVector]);

  // Apply Noise Model to Probabilities if Enabled
  const displayedProbabilities = useMemo(() => {
    if (!noiseEnabled) return idealProbabilities;
    const dim = idealProbabilities.length;
    return idealProbabilities.map((p) => {
      const noisyP = p * (1 - depolarizingRate) + depolarizingRate / dim;
      const measuredP = noisyP * (1 - readoutErrorRate) + ((1 - noisyP) * readoutErrorRate) / (dim - 1);
      return Math.max(0, Math.min(1, measuredP));
    });
  }, [idealProbabilities, noiseEnabled, depolarizingRate, readoutErrorRate]);

  // Compute Single-Qubit Bloch Vector for Inspected Qubit
  const blochVector = useMemo(
    () => computeBlochVector(stateVector, Math.min(inspectedQubit, numQubits - 1), numQubits),
    [stateVector, inspectedQubit, numQubits]
  );

  // Filtered Visual Assets
  const filteredVisualAssets = useMemo(() => {
    return SIMULATOR_VISUAL_ASSETS.filter((asset) => {
      const matchCat = visualCategoryFilter === 'ALL' || asset.category === visualCategoryFilter;
      const matchSearch =
        visualSearchQuery === '' ||
        asset.title.toLowerCase().includes(visualSearchQuery.toLowerCase()) ||
        asset.description.toLowerCase().includes(visualSearchQuery.toLowerCase()) ||
        asset.scientificPrinciple.toLowerCase().includes(visualSearchQuery.toLowerCase()) ||
        asset.relatedQuantumConcept.toLowerCase().includes(visualSearchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [visualCategoryFilter, visualSearchQuery]);

  // Run Empirical Measurement Sampling
  const runMeasurementShots = () => {
    const counts: Record<string, number> = {};
    const dim = displayedProbabilities.length;
    for (let i = 0; i < dim; i++) {
      counts[formatKet(i, numQubits)] = 0;
    }

    for (let s = 0; s < shotCount; s++) {
      const rand = Math.random();
      let cumulative = 0;
      for (let i = 0; i < dim; i++) {
        cumulative += displayedProbabilities[i];
        if (rand <= cumulative || i === dim - 1) {
          const ket = formatKet(i, numQubits);
          counts[ket] = (counts[ket] || 0) + 1;
          break;
        }
      }
    }
    setEmiricalCounts(counts);
  };

  // Gate Management Functions
  const addGate = (qubit: number, column: number) => {
    if (selectedGateType === 'CNOT' || selectedGateType === 'CZ') {
      if (cnotControl === null) {
        setCnotControl(qubit);
        return;
      }
      if (cnotControl === qubit) {
        setCnotControl(null);
        return;
      }
      const newGate: Gate = {
        id: `g-q${qubit}-c${column}-${selectedGateType}-${cnotControl}`,
        type: selectedGateType,
        qubit,
        controlQubit: cnotControl,
        column,
      };
      pushHistory([...gates.filter((g) => !(g.qubit === qubit && g.column === column)), newGate]);
      setCnotControl(null);
    } else if (selectedGateType === 'SWAP') {
      if (swapFirst === null) {
        setSwapFirst(qubit);
        return;
      }
      if (swapFirst === qubit) {
        setSwapFirst(null);
        return;
      }
      const newGate: Gate = {
        id: `g-q${Math.min(swapFirst, qubit)}-c${column}-SWAP-${Math.max(swapFirst, qubit)}`,
        type: 'SWAP',
        qubit: Math.min(swapFirst, qubit),
        target2Qubit: Math.max(swapFirst, qubit),
        column,
      };
      pushHistory([...gates.filter((g) => !(g.qubit === qubit && g.column === column)), newGate]);
      setSwapFirst(null);
    } else if (selectedGateType === 'TOFFOLI') {
      if (toffoliControls.length < 2) {
        if (!toffoliControls.includes(qubit)) {
          setToffoliControls((prev) => [...prev, qubit]);
        }
        return;
      }
      const newGate: Gate = {
        id: `g-q${qubit}-c${column}-TOFFOLI-${toffoliControls[0]}-${toffoliControls[1]}`,
        type: 'TOFFOLI',
        qubit,
        controlQubit: toffoliControls[0],
        control2Qubit: toffoliControls[1],
        column,
      };
      pushHistory([...gates.filter((g) => !(g.qubit === qubit && g.column === column)), newGate]);
      setToffoliControls([]);
    } else {
      const newGate: Gate = {
        id: `g-q${qubit}-c${column}-${selectedGateType}`,
        type: selectedGateType,
        qubit,
        column,
      };
      pushHistory([...gates.filter((g) => !(g.qubit === qubit && g.column === column)), newGate]);
    }
  };

  const removeGate = (id: string) => {
    pushHistory(gates.filter((g) => g.id !== id));
  };

  const resetCircuit = () => {
    pushHistory([]);
    setCnotControl(null);
    setSwapFirst(null);
    setToffoliControls([]);
    setActiveStepColumn(undefined);
    setIsPlaying(false);
    setEmiricalCounts(null);
  };

  const loadAlgorithm = (algo: QuantumAlgorithmPreset) => {
    setNumQubits(algo.qubits);
    pushHistory(algo.gates);
    setCnotControl(null);
    setSwapFirst(null);
    setToffoliControls([]);
    setActiveStepColumn(undefined);
    setIsPlaying(false);
    setEmiricalCounts(null);
    setActiveTab('CIRCUIT');
  };

  // Playback Stepper Engine
  useEffect(() => {
    if (isPlaying) {
      playbackTimerRef.current = setInterval(() => {
        setActiveStepColumn((current) => {
          if (current === undefined) return 0;
          if (current >= maxCol) {
            setIsPlaying(false);
            return undefined;
          }
          return current + 1;
        });
      }, 700);
    } else {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    }
    return () => {
      if (playbackTimerRef.current) clearInterval(playbackTimerRef.current);
    };
  }, [isPlaying, maxCol]);

  return (
    <div className="relative min-h-screen">
      {/* ── Cinematic Quantum Laboratory Environment Video Background ── */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden select-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster="/images/labs/simulator_ambient_hero.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-25 scale-105 filter brightness-90 contrast-125"
        >
          <source src="/videos/coral-desktop.mp4" type="video/mp4" />
          <source src="/videos/coral-mobile.mp4" type="video/mp4" />
        </video>
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-screen"
          style={{ backgroundImage: "url('/images/labs/simulator_ambient_hero.jpg')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#202124]/90 via-[#202124]/80 to-[#202124]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_0%,_#202124_75%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#00d4ff]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#d367c4]/10 blur-3xl pointer-events-none" />
      </div>

      <div className="relative z-10">
        {/* ── Section 1: Hero & Engine Status ── */}
        <Section className="pt-24 pb-8">
          <div className="max-w-5xl mx-auto text-center space-y-5">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-xs font-mono text-[#00d4ff]">
                <span className="w-2 h-2 rounded-full bg-[#00d4ff] animate-ping" />
                <span>SHIELD QUANTUM MACHINE AND TECHNOLOGY</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/30 text-xs font-mono text-[#10b981]">
                <span className="w-2 h-2 rounded-full bg-[#10b981]" />
                <span>SIMULATION ENGINE ONLINE</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#e2e8f0]">
              SHIELD QUANTUM{' '}
              <span className="bg-gradient-to-r from-[#00d4ff] via-[#d367c4] to-[#7c3aed] bg-clip-text text-transparent">
                SIMULATOR
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#94a3b8] max-w-3xl mx-auto leading-relaxed">
              Interactive Quantum Computing &amp; Circuit Simulation Platform. Construct arbitrary gate sequences, simulate complex multi-qubit state vectors, inspect single-qubit Bloch spheres, and explore 20 scientific visual assets.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-xs font-mono text-[#7B7672]">
                <Info className="w-4 h-4 text-[#00d4ff] shrink-0" />
                <span>Conceptual Scientific Visualization • Classical State-Vector Kernel • Rigorous Unitary Algebra</span>
              </div>

              <button
                onClick={() => {
                  const asset01 = SIMULATOR_VISUAL_ASSETS.find((a) => a.id === 'asset-01');
                  if (asset01) setActiveVisualModal(asset01);
                }}
                className="px-3 py-1 rounded-xl bg-[#00d4ff]/10 hover:bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/30 text-xs font-mono transition-colors flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Inspect QPU Packaging (#01)</span>
              </button>
            </div>
          </div>
        </Section>

        <div className="section-divider" />

        {/* ── Section 2: Main Workspace & Interactive Tooling ── */}
        <Section id="workspace" className="pt-4">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Top Control Bar & Tab Switcher (5 Tabs) */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-black/40 border border-white/[0.08] backdrop-blur-md">
              {/* View Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs">
                <button
                  onClick={() => setActiveTab('CIRCUIT')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    activeTab === 'CIRCUIT'
                      ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/40 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                      : 'text-[#94a3b8] hover:text-[#e2e8f0] bg-white/[0.02]'
                  }`}
                >
                  <Layers className="w-4 h-4" />
                  <span>Circuit Canvas</span>
                </button>
                <button
                  onClick={() => setActiveTab('BLOCH')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    activeTab === 'BLOCH'
                      ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/40 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                      : 'text-[#94a3b8] hover:text-[#e2e8f0] bg-white/[0.02]'
                  }`}
                >
                  <Atom className="w-4 h-4" />
                  <span>Bloch Sphere Q{inspectedQubit}</span>
                </button>
                <button
                  onClick={() => setActiveTab('PROCESSOR')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    activeTab === 'PROCESSOR'
                      ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/40 shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                      : 'text-[#94a3b8] hover:text-[#e2e8f0] bg-white/[0.02]'
                  }`}
                >
                  <Cpu className="w-4 h-4" />
                  <span>3D QPU Topology</span>
                </button>
                <button
                  onClick={() => setActiveTab('ALGORITHMS')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    activeTab === 'ALGORITHMS'
                      ? 'bg-[#d367c4]/20 text-[#d367c4] border border-[#d367c4]/40 shadow-[0_0_15px_rgba(211,103,196,0.2)]'
                      : 'text-[#94a3b8] hover:text-[#e2e8f0] bg-white/[0.02]'
                  }`}
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Algorithm Library</span>
                </button>
                <button
                  onClick={() => setActiveTab('VISUAL_LIBRARY')}
                  className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-2 ${
                    activeTab === 'VISUAL_LIBRARY'
                      ? 'bg-[#7c3aed]/25 text-[#7c3aed] border border-[#7c3aed]/40 shadow-[0_0_15px_rgba(124,58,237,0.25)]'
                      : 'text-[#94a3b8] hover:text-[#e2e8f0] bg-white/[0.02]'
                  }`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Visual Library (20)</span>
                </button>
              </div>

              {/* Qubit Count & Playback Stepper Actions */}
              <div className="flex flex-wrap items-center gap-3">
                {/* Qubit Counter */}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.06] font-mono text-xs">
                  <span className="text-[#7B7672] uppercase">Qubits:</span>
                  <button
                    onClick={() => setNumQubits((q) => Math.max(1, q - 1))}
                    disabled={numQubits <= 1}
                    className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 text-[#e2e8f0] flex items-center justify-center"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="font-bold text-[#00d4ff] px-1">{numQubits}</span>
                  <button
                    onClick={() => setNumQubits((q) => Math.min(5, q + 1))}
                    disabled={numQubits >= 5}
                    className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 disabled:opacity-30 text-[#e2e8f0] flex items-center justify-center"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-3 py-1.5 rounded-xl bg-[#00d4ff]/15 hover:bg-[#00d4ff]/25 text-[#00d4ff] border border-[#00d4ff]/30 text-xs font-mono font-semibold flex items-center gap-1.5 transition-all"
                    title="Run through circuit step-by-step"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    <span>{isPlaying ? 'Pause Run' : 'Step Run'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setActiveStepColumn((current) => (current === undefined ? 0 : Math.min(current + 1, maxCol)));
                    }}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#dadce0] border border-white/10 text-xs transition-colors"
                    title="Next step"
                  >
                    <StepForward className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleUndo}
                    disabled={history.length === 0}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-[#7B7672] hover:text-[#e2e8f0] border border-white/10 text-xs font-mono transition-colors"
                    title="Undo gate change"
                  >
                    <Undo2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleRedo}
                    disabled={future.length === 0}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/10 disabled:opacity-30 text-[#7B7672] hover:text-[#e2e8f0] border border-white/10 text-xs font-mono transition-colors"
                    title="Redo gate change"
                  >
                    <Redo2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={resetCircuit}
                    className="px-3 py-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#7B7672] hover:text-[#e2e8f0] border border-white/10 text-xs font-mono transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset</span>
                  </button>
                </div>
              </div>
            </div>

            {/* ── View Mode 1: Circuit Canvas ── */}
            {activeTab === 'CIRCUIT' && (
              <div className="space-y-6">
                {/* Gate Selection Palette */}
                <GlassCard className="p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-[#00d4ff] tracking-wider uppercase flex items-center gap-1.5">
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Select Quantum Gate Palette (18 Gates)</span>
                    </span>
                    <button
                      onClick={() => {
                        const asset11 = SIMULATOR_VISUAL_ASSETS.find((a) => a.id === 'asset-11');
                        if (asset11) setActiveVisualModal(asset11);
                      }}
                      className="text-[11px] font-mono text-[#7B7672] hover:text-[#00d4ff] flex items-center gap-1"
                    >
                      <span>Gate Physics (#11)</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {[
                      { type: 'H', label: 'H', desc: 'Hadamard (Superposition)', color: '#00d4ff' },
                      { type: 'X', label: 'X', desc: 'Pauli-X (NOT)', color: '#f59e0b' },
                      { type: 'Y', label: 'Y', desc: 'Pauli-Y (π rotation)', color: '#f59e0b' },
                      { type: 'Z', label: 'Z', desc: 'Pauli-Z (Phase flip)', color: '#f59e0b' },
                      { type: 'S', label: 'S', desc: 'Phase (π/2)', color: '#06b6d4' },
                      { type: 'T', label: 'T', desc: 'T-Gate (π/4)', color: '#06b6d4' },
                      { type: 'S_DAG', label: 'S†', desc: 'S-Dagger (-π/2)', color: '#06b6d4' },
                      { type: 'T_DAG', label: 'T†', desc: 'T-Dagger (-π/4)', color: '#06b6d4' },
                      { type: 'RX', label: 'RX', desc: 'X-Rotation (π/2)', color: '#10b981' },
                      { type: 'RY', label: 'RY', desc: 'Y-Rotation (π/2)', color: '#10b981' },
                      { type: 'RZ', label: 'RZ', desc: 'Z-Rotation (π/2)', color: '#10b981' },
                      { type: 'CNOT', label: 'CNOT', desc: 'Controlled-NOT (2Q)', color: '#ec4899' },
                      { type: 'CZ', label: 'CZ', desc: 'Controlled-Z (2Q)', color: '#ec4899' },
                      { type: 'SWAP', label: 'SWAP', desc: 'State Swap (2Q)', color: '#ec4899' },
                      { type: 'TOFFOLI', label: 'CCX', desc: 'Toffoli (3Q)', color: '#8b5cf6' },
                      { type: 'RESET', label: '|0⟩', desc: 'Reset Qubit', color: '#64748b' },
                      { type: 'MEASURE', label: 'M', desc: 'Measurement', color: '#34d399' },
                    ].map((g) => {
                      const isSelected = selectedGateType === g.type;
                      return (
                        <button
                          key={g.type}
                          onClick={() => setSelectedGateType(g.type as GateType)}
                          className={`px-3 py-1.5 rounded-xl font-mono text-xs font-bold transition-all ${
                            isSelected
                              ? 'bg-[#00d4ff] text-black shadow-[0_0_12px_rgba(0,212,255,0.4)] scale-105'
                              : 'bg-white/5 hover:bg-white/10 text-[#dadce0] border border-white/5'
                          }`}
                          title={g.desc}
                        >
                          {g.label}
                        </button>
                      );
                    })}
                  </div>
                </GlassCard>

                {/* Circuit Grid Wire Area */}
                <GlassCard className="p-6 overflow-x-auto space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#7B7672]">
                    <span>Click on any grid intersection to place selected gate ({selectedGateType})</span>
                    <span>Click placed gate to delete</span>
                  </div>

                  <div className="min-w-[650px] space-y-4 py-2">
                    {Array.from({ length: numQubits }).map((_, qIdx) => (
                      <div key={qIdx} className="flex items-center gap-3">
                        {/* Qubit Wire Header */}
                        <div
                          onClick={() => setInspectedQubit(qIdx)}
                          className={`w-28 py-2 px-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                            inspectedQubit === qIdx
                              ? 'bg-[#00d4ff]/15 border-[#00d4ff] text-[#00d4ff]'
                              : 'bg-white/[0.02] border-white/5 text-[#dadce0] hover:border-white/20'
                          }`}
                        >
                          <span className="font-mono text-xs font-bold">Q[{qIdx}]</span>
                          <span className="text-[10px] font-mono text-[#7B7672]">|0⟩</span>
                        </div>

                        {/* Wire Timeline Columns */}
                        <div className="relative flex-1 flex items-center h-12">
                          <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-[#00d4ff]/30 via-white/10 to-[#d367c4]/30" />

                          <div className="relative z-10 grid grid-flow-col auto-cols-fr w-full gap-2 px-2">
                            {Array.from({ length: numColumns }).map((_, cIdx) => {
                              const existingGate = gates.find((g) => g.qubit === qIdx && g.column === cIdx);
                              const isStepActive = activeStepColumn === cIdx;

                              return (
                                <div
                                  key={cIdx}
                                  onClick={() => {
                                    if (existingGate) removeGate(existingGate.id);
                                    else addGate(qIdx, cIdx);
                                  }}
                                  className={`h-10 rounded-xl border flex items-center justify-center cursor-pointer transition-all ${
                                    isStepActive ? 'ring-2 ring-[#00d4ff] bg-[#00d4ff]/10' : ''
                                  } ${
                                    existingGate
                                      ? 'bg-gradient-to-br from-[#00d4ff]/30 to-[#d367c4]/30 border-[#00d4ff]/50 text-[#e2e8f0] font-bold shadow-sm'
                                      : 'bg-black/30 border-white/5 hover:border-white/20 hover:bg-white/[0.03]'
                                  }`}
                                >
                                  {existingGate ? (
                                    <span className="font-mono text-xs">{existingGate.type}</span>
                                  ) : (
                                    <span className="text-[9px] font-mono text-[#7B7672] opacity-0 hover:opacity-100">+</span>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </div>
            )}

            {/* ── View Mode 2: Interactive 3D Bloch Sphere ── */}
            {activeTab === 'BLOCH' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <GlassCard className="lg:col-span-7 p-6 flex flex-col items-center justify-center space-y-4">
                  <div className="w-full flex items-center justify-between">
                    <span className="text-xs font-mono text-[#00d4ff] uppercase tracking-wider">
                      Bloch Sphere — Qubit Q[{inspectedQubit}]
                    </span>
                    <button
                      onClick={() => {
                        const asset07 = SIMULATOR_VISUAL_ASSETS.find((a) => a.id === 'asset-07');
                        if (asset07) setActiveVisualModal(asset07);
                      }}
                      className="text-[11px] font-mono text-[#7B7672] hover:text-[#00d4ff] flex items-center gap-1"
                    >
                      <span>Bloch Physics (#07)</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>

                  {/* 3D SVG Sphere */}
                  <div className="relative w-64 h-64 sm:w-72 sm:h-72">
                    <svg viewBox="-120 -120 240 240" className="w-full h-full">
                      <circle cx="0" cy="0" r="90" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
                      <ellipse cx="0" cy="0" rx="90" ry="30" fill="none" stroke="rgba(0,212,255,0.25)" strokeWidth="1" strokeDasharray="3,3" />
                      <line x1="0" y1="95" x2="0" y2="-95" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
                      <text x="0" y="-102" fill="#34d399" fontSize="11" textAnchor="middle" fontFamily="monospace" fontWeight="bold">|0⟩ (+Z)</text>
                      <text x="0" y="112" fill="#ec4899" fontSize="11" textAnchor="middle" fontFamily="monospace" fontWeight="bold">|1⟩ (-Z)</text>
                      <line x1="-95" y1="0" x2="95" y2="0" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
                      <text x="105" y="4" fill="#00d4ff" fontSize="9" fontFamily="monospace">+X</text>

                      {/* State Vector */}
                      <line
                        x1="0"
                        y1="0"
                        x2={blochVector.x * 70 - blochVector.y * 20}
                        y2={-blochVector.z * 85 + blochVector.y * 10}
                        stroke="#00d4ff"
                        strokeWidth="3"
                      />
                      <circle
                        cx={blochVector.x * 70 - blochVector.y * 20}
                        cy={-blochVector.z * 85 + blochVector.y * 10}
                        r="5"
                        fill="#d367c4"
                        stroke="#ffffff"
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>
                </GlassCard>

                {/* State Vector Metrics */}
                <GlassCard className="lg:col-span-5 p-6 space-y-4 font-mono text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                    <h3 className="text-sm font-bold text-[#e2e8f0] uppercase tracking-wider">Density Matrix Analysis</h3>
                    <span className="text-[10px] text-[#00d4ff]">Tr_¬k(|ψ⟩⟨ψ|)</span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-[#7B7672]">Bloch Vector (x, y, z):</span>
                      <span className="text-[#e2e8f0] font-bold">({blochVector.x.toFixed(2)}, {blochVector.y.toFixed(2)}, {blochVector.z.toFixed(2)})</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-[#7B7672]">Purity |r⃗|:</span>
                      <span className="text-[#10b981] font-bold">{Math.sqrt(blochVector.x ** 2 + blochVector.y ** 2 + blochVector.z ** 2).toFixed(3)}</span>
                    </div>
                    <div className="flex justify-between p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04]">
                      <span className="text-[#7B7672]">P(|0⟩) / P(|1⟩):</span>
                      <span className="text-[#34d399] font-bold">{(blochVector.probZero * 100).toFixed(1)}% / {(blochVector.probOne * 100).toFixed(1)}%</span>
                    </div>
                  </div>
                </GlassCard>
              </div>
            )}

            {/* ── View Mode 3: 3D QPU Topology ── */}
            {activeTab === 'PROCESSOR' && (
              <GlassCard className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-mono text-[#00d4ff] uppercase tracking-wider block mb-1">
                      PHYSICAL CHIP LAYOUT
                    </span>
                    <h3 className="text-xl font-bold text-[#e2e8f0]">Superconducting Transmon Topology</h3>
                  </div>
                  <button
                    onClick={() => {
                      const asset03 = SIMULATOR_VISUAL_ASSETS.find((a) => a.id === 'asset-03');
                      if (asset03) setActiveVisualModal(asset03);
                    }}
                    className="text-xs font-mono text-[#7B7672] hover:text-[#00d4ff] flex items-center gap-1"
                  >
                    <span>Transmon Physics (#03)</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Array.from({ length: numQubits }).map((_, qIdx) => {
                    const bVec = computeBlochVector(stateVector, qIdx, numQubits);
                    return (
                      <button
                        key={qIdx}
                        onClick={() => setInspectedQubit(qIdx)}
                        className={`p-4 rounded-xl border text-left space-y-3 transition-all ${
                          inspectedQubit === qIdx
                            ? 'bg-[#00d4ff]/10 border-[#00d4ff] ring-2 ring-[#00d4ff]/30'
                            : 'bg-black/40 border-white/[0.08] hover:border-white/[0.2]'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-mono font-bold text-[#00d4ff]">TRANSMON Q{qIdx}</span>
                          <div className="w-2.5 h-2.5 rounded-full bg-[#10b981] animate-pulse" />
                        </div>

                        <div className="space-y-1 font-mono text-[11px]">
                          <div className="flex justify-between text-[#7B7672]">
                            <span>P(|0⟩):</span>
                            <span className="text-[#e2e8f0]">{(bVec.probZero * 100).toFixed(0)}%</span>
                          </div>
                          <div className="flex justify-between text-[#7B7672]">
                            <span>P(|1⟩):</span>
                            <span className="text-[#d367c4]">{(bVec.probOne * 100).toFixed(0)}%</span>
                          </div>
                        </div>

                        <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#00d4ff] to-[#d367c4] transition-all duration-500"
                            style={{ width: `${bVec.probOne * 100}%` }}
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>
              </GlassCard>
            )}

            {/* ── View Mode 4: Quantum Algorithm Library ── */}
            {activeTab === 'ALGORITHMS' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {ALGORITHM_PRESETS.map((algo) => (
                  <GlassCard key={algo.id} className="p-6 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <Badge variant="violet">{algo.category}</Badge>
                        <span className="text-xs font-mono text-[#00d4ff]">{algo.qubits} Qubits</span>
                      </div>
                      <h4 className="text-base font-bold text-[#e2e8f0] mb-2">{algo.name}</h4>
                      <p className="text-xs text-[#94a3b8] leading-relaxed mb-3">{algo.description}</p>
                      <div className="p-2.5 rounded bg-white/[0.02] border border-white/[0.06] text-[11px] font-mono text-[#34d399]">
                        <span className="text-[#7B7672] block text-[9px] uppercase mb-0.5">Expected Result:</span>
                        {algo.expectedResult}
                      </div>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => loadAlgorithm(algo)}
                      icon={<Play className="w-3.5 h-3.5" />}
                    >
                      Load into Circuit
                    </Button>
                  </GlassCard>
                ))}
              </div>
            )}

            {/* ── View Mode 5: Visual Asset Library (20 Assets) ── */}
            {activeTab === 'VISUAL_LIBRARY' && (
              <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-2xl bg-black/40 border border-white/10">
                  <div>
                    <span className="text-[11px] font-mono text-[#00d4ff] uppercase tracking-wider block mb-1">
                      SHIELD QUANTUM SCIENTIFIC VISUAL ASSET REGISTRY
                    </span>
                    <h3 className="text-xl font-bold text-[#e2e8f0]">20 Original Quantum Visual Assets</h3>
                    <p className="text-xs text-[#94a3b8]">
                      Click any visual asset to inspect high-resolution render, scientific principles, mathematical formulations, and connected simulator features.
                    </p>
                  </div>

                  <div className="relative w-full md:w-64">
                    <Search className="w-4 h-4 text-[#7B7672] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Filter visual assets..."
                      value={visualSearchQuery}
                      onChange={(e) => setVisualSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 text-xs font-mono text-[#e2e8f0] placeholder-[#7B7672] focus:outline-none focus:border-[#00d4ff]/50"
                    />
                  </div>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-1.5">
                  {[
                    'ALL',
                    'Hardware & Packaging',
                    'Cryogenics & Environment',
                    'Qubit Physics',
                    'Circuit & Unitary Math',
                    'Quantum Information',
                    'Noise & Error Correction',
                    'Algorithms & Protocols',
                    'Control & Readout',
                  ].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setVisualCategoryFilter(cat)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                        visualCategoryFilter === cat
                          ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/40 shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                          : 'bg-white/[0.02] text-[#7B7672] hover:text-[#e2e8f0] border border-white/[0.04]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* 20 Visual Asset Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {filteredVisualAssets.map((asset) => (
                    <GlassCard
                      key={asset.id}
                      hover
                      onClick={() => setActiveVisualModal(asset)}
                      className="p-4 border-white/[0.08] hover:border-[#00d4ff]/40 cursor-pointer space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2.5">
                        <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black/60 group">
                          <Image
                            src={asset.imageUrl}
                            alt={asset.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                          <div className="absolute top-2 left-2">
                            <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono font-bold text-[#00d4ff]">
                              #{asset.number}
                            </span>
                          </div>
                          <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-[#dadce0] truncate max-w-[80%]">{asset.category}</span>
                            <Maximize2 className="w-3.5 h-3.5 text-[#dadce0] group-hover:text-[#00d4ff]" />
                          </div>
                        </div>

                        <div>
                          <h4 className="text-sm font-bold text-[#e2e8f0] group-hover:text-[#00d4ff] transition-colors">{asset.title}</h4>
                          <p className="text-[11px] text-[#94a3b8] line-clamp-2 leading-relaxed mt-0.5">{asset.description}</p>
                        </div>
                      </div>

                      <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-[#00d4ff]">
                        <span>{asset.relatedSimulatorFeature.split('&')[0]}</span>
                        <ArrowRight className="w-3 h-3" />
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            )}

            {/* ── Section 3: Dual Output Dashboards (State Vector & Measurement Sampling) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Full Computational Basis Amplitudes & State Vector */}
              <GlassCard className="lg:col-span-6 p-6 space-y-4 font-mono text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#00d4ff]" />
                    <h3 className="text-sm font-bold text-[#e2e8f0] uppercase tracking-wider">
                      Full State Vector (|ψ⟩)
                    </h3>
                  </div>
                  <span className="text-[10px] text-[#7B7672]">Dim: {1 << numQubits}</span>
                </div>

                <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
                  {stateVector.map((amp, idx) => {
                    const prob = complexMag2(amp);
                    const phase = complexPhase(amp);
                    return (
                      <div
                        key={idx}
                        className="p-2.5 rounded-lg bg-white/[0.02] border border-white/[0.04] flex items-center justify-between hover:bg-white/[0.05] transition-colors"
                      >
                        <span className="font-bold text-[#00d4ff]">{formatKet(idx, numQubits)}</span>
                        <span className="text-[#dadce0]">{formatComplex(amp)}</span>
                        <span className="text-[#d367c4]">φ: {(phase * (180 / Math.PI)).toFixed(0)}°</span>
                        <span className="text-[#34d399] font-bold">{(prob * 100).toFixed(1)}%</span>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>

              {/* Measurement Probabilities & Empirical Shot Histogram */}
              <GlassCard className="lg:col-span-6 p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
                  <div className="flex items-center gap-2">
                    <BarChart2 className="w-4 h-4 text-[#d367c4]" />
                    <h3 className="text-sm font-bold font-mono text-[#e2e8f0] uppercase tracking-wider">
                      Measurement Probabilities
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 font-mono text-xs">
                    <div className="flex rounded bg-white/5 p-0.5 border border-white/10">
                      {[100, 1000, 10000].map((s) => (
                        <button
                          key={s}
                          onClick={() => setShotCount(s)}
                          className={`px-2 py-0.5 rounded text-[10px] ${
                            shotCount === s ? 'bg-[#d367c4] text-black font-bold' : 'text-[#7B7672]'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                    <button
                      onClick={runMeasurementShots}
                      className="px-2.5 py-1 rounded bg-[#10b981]/20 hover:bg-[#10b981]/30 text-[#10b981] border border-[#10b981]/40 font-bold text-[10px] transition-all"
                    >
                      Sample
                    </button>
                  </div>
                </div>

                <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                  {displayedProbabilities.map((prob, idx) => {
                    const ket = formatKet(idx, numQubits);
                    const empirical = empiricalCounts ? (empiricalCounts[ket] || 0) / shotCount : undefined;

                    return (
                      <div key={idx} className="space-y-1">
                        <div className="flex justify-between text-xs font-mono">
                          <span className="text-[#e2e8f0] font-bold">{ket}</span>
                          <div className="flex gap-3">
                            {empirical !== undefined && (
                              <span className="text-[#34d399]">Emp: {(empirical * 100).toFixed(1)}%</span>
                            )}
                            <span className="text-[#00d4ff]">{(prob * 100).toFixed(1)}%</span>
                          </div>
                        </div>
                        <div className="h-2 bg-white/5 rounded-full overflow-hidden flex">
                          <div
                            className="h-full bg-gradient-to-r from-[#00d4ff] to-[#d367c4] transition-all duration-300"
                            style={{ width: `${prob * 100}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </GlassCard>
            </div>

            {/* ── Section 4: Noise Model Configuration ── */}
            <GlassCard className="p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-white/[0.08]">
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-[#f59e0b]" />
                  <h3 className="text-sm font-bold font-mono text-[#e2e8f0] uppercase tracking-wider">
                    Physical Noise &amp; Decoherence Model
                  </h3>
                </div>
                <button
                  onClick={() => setNoiseEnabled(!noiseEnabled)}
                  className={`px-3 py-1 rounded-xl text-xs font-mono font-bold transition-all ${
                    noiseEnabled
                      ? 'bg-[#f59e0b] text-black shadow-[0_0_10px_rgba(245,158,11,0.3)]'
                      : 'bg-white/5 text-[#7B7672] border border-white/10'
                  }`}
                >
                  {noiseEnabled ? 'Noise Active' : 'Ideal Simulation'}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2 font-mono text-xs">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#94a3b8]">Depolarizing Noise Rate:</span>
                    <span className="text-[#00d4ff]">{(depolarizingRate * 100).toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.25"
                    step="0.01"
                    value={depolarizingRate}
                    onChange={(e) => setDepolarizingRate(parseFloat(e.target.value))}
                    disabled={!noiseEnabled}
                    className="w-full accent-[#00d4ff]"
                  />
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-[#94a3b8]">Readout Measurement Error:</span>
                    <span className="text-[#d367c4]">{(readoutErrorRate * 100).toFixed(1)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.20"
                    step="0.01"
                    value={readoutErrorRate}
                    onChange={(e) => setReadoutErrorRate(parseFloat(e.target.value))}
                    disabled={!noiseEnabled}
                    className="w-full accent-[#d367c4]"
                  />
                </div>
              </div>
            </GlassCard>
          </div>
        </Section>

        <div className="section-divider" />

        {/* ── Section 5: From Simulation to Physical Quantum Hardware ── */}
        <Section className="py-12">
          <SectionHeader
            label="RESEARCH CONNECTION"
            title="From Simulation to Quantum Hardware"
            description="How mathematical state-vector simulations translate into physical microwave pulses, millikelvin refrigeration, and surface code error correction."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            <GlassCard className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center text-[#00d4ff]">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#e2e8f0]">Pulse Synthesis &amp; Microwave Control</h4>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                In physical hardware, gates like Hadamard or CNOT are continuous 15–30 ns microwave bursts synthesized by AWGs at 5 GHz to drive Rabi transitions between transmon energy levels.
              </p>
              <Link href="/hardware" className="text-xs font-mono text-[#00d4ff] hover:text-[#e2e8f0] flex items-center gap-1">
                <span>View Hardware Specs</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </GlassCard>

            <GlassCard className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#d367c4]/10 border border-[#d367c4]/30 flex items-center justify-center text-[#d367c4]">
                <Flame className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#e2e8f0]">Cryogenic Millikelvin Environment</h4>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                While classical state vectors compute in ambient conditions, physical superconducting transmon qubits require 15 mK dilution refrigeration to freeze out ambient thermal photons.
              </p>
              <Link href="/labs/cryogenic" className="text-xs font-mono text-[#00d4ff] hover:text-[#e2e8f0] flex items-center gap-1">
                <span>Explore Cryogenic Lab</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </GlassCard>

            <GlassCard className="p-6 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#7c3aed]/10 border border-[#7c3aed]/30 flex items-center justify-center text-[#7c3aed]">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="text-base font-bold text-[#e2e8f0]">Surface Codes &amp; Fault Tolerance</h4>
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                Physical qubits experience continuous noise. Real hardware deploys planar surface codes where multiple physical transmons form a single error-corrected logical qubit with active syndrome extraction.
              </p>
              <Link href="/quantum-machines#error-correction" className="text-xs font-mono text-[#00d4ff] hover:text-[#e2e8f0] flex items-center gap-1">
                <span>Error Correction Research</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </GlassCard>
          </div>
        </Section>
      </div>

      {/* ── Visual Asset Lightbox Modal ── */}
      <AnimatePresence>
        {activeVisualModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#18191b] border border-[#00d4ff]/30 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 custom-scrollbar"
            >
              {/* Modal Header */}
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#00d4ff]/15 border border-[#00d4ff]/30 text-[10px] font-mono font-bold text-[#00d4ff]">
                      ASSET #{activeVisualModal.number}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#dadce0]">
                      {activeVisualModal.category}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e2e8f0]">{activeVisualModal.title}</h2>
                  <p className="text-xs font-mono text-[#7B7672]">{activeVisualModal.caption}</p>
                </div>
                <button
                  onClick={() => setActiveVisualModal(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#dadce0] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Visual Render */}
              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black">
                <Image
                  src={activeVisualModal.imageUrl}
                  alt={activeVisualModal.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-[#00d4ff]">
                  Conceptual Scientific Visualization
                </div>
              </div>

              {/* Description & Principles */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-[#00d4ff] uppercase tracking-wider">Scientific Description</h4>
                <p className="text-xs sm:text-sm text-[#dadce0] leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
                  {activeVisualModal.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono text-[#d367c4] uppercase tracking-wider">Scientific &amp; Quantum Physics Principle</h4>
                <p className="text-xs sm:text-sm text-[#94a3b8] leading-relaxed bg-white/[0.02] p-4 rounded-xl border border-white/5">
                  {activeVisualModal.scientificPrinciple}
                </p>
              </div>

              {/* Formula if available */}
              {activeVisualModal.formula && (
                <div className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1">
                  <span className="text-[10px] font-mono text-[#7B7672] block">Mathematical Formulation:</span>
                  <div className="p-2 rounded bg-black/60 border border-white/5 font-mono text-xs sm:text-sm text-[#00d4ff] overflow-x-auto">
                    <code>{activeVisualModal.formula}</code>
                  </div>
                </div>
              )}

              {/* Specifications if available */}
              {activeVisualModal.specifications && activeVisualModal.specifications.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-[#10b981] uppercase tracking-wider">Technical Hardware Metrics</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {activeVisualModal.specifications.map((spec, idx) => (
                      <div key={idx} className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-white/[0.02] border border-white/5 font-mono">
                        <span className="text-[#7B7672]">{spec.label}</span>
                        <span className="text-[#e2e8f0] font-bold">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-1.5 text-[#7B7672]">
                    <span>Related Concept:</span>
                    <span className="text-[#00d4ff]">{activeVisualModal.relatedQuantumConcept}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[#7B7672]">
                    <span>Simulator Feature:</span>
                    <span className="text-[#34d399]">{activeVisualModal.relatedSimulatorFeature}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setActiveVisualModal(null);
                      if (activeVisualModal.id === 'asset-07') setActiveTab('BLOCH');
                      else if (activeVisualModal.id === 'asset-01' || activeVisualModal.id === 'asset-03' || activeVisualModal.id === 'asset-05') setActiveTab('PROCESSOR');
                      else if (activeVisualModal.id === 'asset-09' || activeVisualModal.id === 'asset-14' || activeVisualModal.id === 'asset-15' || activeVisualModal.id === 'asset-16') setActiveTab('ALGORITHMS');
                      else setActiveTab('CIRCUIT');
                    }}
                    className="px-4 py-2 rounded-xl bg-[#00d4ff]/15 hover:bg-[#00d4ff]/25 text-[#00d4ff] border border-[#00d4ff]/30 transition-colors"
                  >
                    Open in Simulator
                  </button>
                  <button
                    onClick={() => setActiveVisualModal(null)}
                    className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#dadce0] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
