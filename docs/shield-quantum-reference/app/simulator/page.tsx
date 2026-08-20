'use client';

import React, { useState, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Play, Plus, Minus, Info } from 'lucide-react';
import { Section, Badge, GlassCard, Button } from '@/components/ui';

/* ═══════════════════════════════════════════════════════
   Quantum Circuit Simulator
   Browser-based educational quantum simulation
   ═══════════════════════════════════════════════════════ */

type GateType = 'H' | 'X' | 'Y' | 'Z' | 'S' | 'T' | 'CNOT' | 'MEASURE';

interface Gate {
  type: GateType;
  qubit: number;
  controlQubit?: number;
  column: number;
}

interface Complex {
  re: number;
  im: number;
}

/* ———————————————————————————————————————————————————————
   Quantum Math Utilities
   ——————————————————————————————————————————————————————— */

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

function complexScale(a: Complex, s: number): Complex {
  return { re: a.re * s, im: a.im * s };
}

const SQRT2_INV = 1 / Math.sqrt(2);

// Single-qubit gate matrices
const GATE_MATRICES: Record<string, Complex[][]> = {
  H: [
    [{ re: SQRT2_INV, im: 0 }, { re: SQRT2_INV, im: 0 }],
    [{ re: SQRT2_INV, im: 0 }, { re: -SQRT2_INV, im: 0 }],
  ],
  X: [
    [{ re: 0, im: 0 }, { re: 1, im: 0 }],
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
  ],
  Y: [
    [{ re: 0, im: 0 }, { re: 0, im: -1 }],
    [{ re: 0, im: 1 }, { re: 0, im: 0 }],
  ],
  Z: [
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: -1, im: 0 }],
  ],
  S: [
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: 0, im: 1 }],
  ],
  T: [
    [{ re: 1, im: 0 }, { re: 0, im: 0 }],
    [{ re: 0, im: 0 }, { re: Math.cos(Math.PI / 4), im: Math.sin(Math.PI / 4) }],
  ],
};

function simulateCircuit(gates: Gate[], numQubits: number): Complex[] {
  const dim = 1 << numQubits;
  let state: Complex[] = new Array(dim).fill(null).map(() => ({ re: 0, im: 0 }));
  state[0] = { re: 1, im: 0 }; // |00...0⟩

  // Sort gates by column
  const sorted = [...gates].filter((g) => g.type !== 'MEASURE').sort((a, b) => a.column - b.column);

  for (const gate of sorted) {
    if (gate.type === 'CNOT' && gate.controlQubit !== undefined) {
      // CNOT gate
      const newState = [...state.map((c) => ({ ...c }))];
      for (let i = 0; i < dim; i++) {
        const controlBit = (i >> (numQubits - 1 - gate.controlQubit)) & 1;
        const targetBit = (i >> (numQubits - 1 - gate.qubit)) & 1;
        if (controlBit === 1) {
          const flipped = i ^ (1 << (numQubits - 1 - gate.qubit));
          newState[i] = state[flipped];
        }
      }
      state = newState;
    } else {
      // Single-qubit gate
      const matrix = GATE_MATRICES[gate.type];
      if (!matrix) continue;

      const newState = state.map((c) => ({ ...c }));
      for (let i = 0; i < dim; i++) {
        const bit = (i >> (numQubits - 1 - gate.qubit)) & 1;
        const pair = i ^ (1 << (numQubits - 1 - gate.qubit));

        if (bit === 0) {
          newState[i] = complexAdd(
            complexMul(matrix[0][0], state[i]),
            complexMul(matrix[0][1], state[pair])
          );
          newState[pair] = complexAdd(
            complexMul(matrix[1][0], state[i]),
            complexMul(matrix[1][1], state[pair])
          );
        }
      }
      state = newState;
    }
  }

  return state;
}

function formatComplex(c: Complex): string {
  const re = Math.abs(c.re) < 1e-10 ? 0 : c.re;
  const im = Math.abs(c.im) < 1e-10 ? 0 : c.im;

  if (im === 0) return re.toFixed(3);
  if (re === 0) return `${im.toFixed(3)}i`;
  return `${re.toFixed(3)}${im >= 0 ? '+' : ''}${im.toFixed(3)}i`;
}

function formatKet(index: number, numQubits: number): string {
  return `|${index.toString(2).padStart(numQubits, '0')}⟩`;
}

/* ═══════════════════════════════════════════════════════
   Simulator Component
   ═══════════════════════════════════════════════════════ */

const GATE_INFO: Record<GateType, { name: string; desc: string; color: string }> = {
  H: { name: 'Hadamard', desc: 'Creates equal superposition', color: 'bg-photon-cyan/20 text-photon-cyan border-photon-cyan/30' },
  X: { name: 'Pauli-X', desc: 'Bit flip (NOT gate)', color: 'bg-quantum-rose/20 text-quantum-rose border-quantum-rose/30' },
  Y: { name: 'Pauli-Y', desc: 'Bit + phase flip', color: 'bg-quantum-violet/20 text-quantum-violet border-quantum-violet/30' },
  Z: { name: 'Pauli-Z', desc: 'Phase flip', color: 'bg-quantum-blue/20 text-quantum-blue border-quantum-blue/30' },
  S: { name: 'S Gate', desc: 'π/2 phase rotation', color: 'bg-quantum-emerald/20 text-quantum-emerald border-quantum-emerald/30' },
  T: { name: 'T Gate', desc: 'π/4 phase rotation', color: 'bg-energy-amber/20 text-energy-amber border-energy-amber/30' },
  CNOT: { name: 'CNOT', desc: 'Controlled-NOT', color: 'bg-quantum-violet/20 text-quantum-violet border-quantum-violet/30' },
  MEASURE: { name: 'Measure', desc: 'Measurement', color: 'bg-text-muted/20 text-text-secondary border-white/10' },
};

const MAX_QUBITS = 4;
const MAX_COLUMNS = 8;

export default function SimulatorPage() {
  const [numQubits, setNumQubits] = useState(2);
  const [gates, setGates] = useState<Gate[]>([]);
  const [selectedGate, setSelectedGate] = useState<GateType>('H');
  const [cnotControl, setCnotControl] = useState<number | null>(null);
  const [showInfo, setShowInfo] = useState(true);

  // Compute state vector
  const stateVector = useMemo(() => simulateCircuit(gates, numQubits), [gates, numQubits]);

  // Probabilities
  const probabilities = useMemo(
    () => stateVector.map((c) => complexMag2(c)),
    [stateVector]
  );

  // Get max column used
  const maxCol = useMemo(
    () => (gates.length > 0 ? Math.max(...gates.map((g) => g.column)) : -1),
    [gates]
  );

  const numColumns = Math.min(Math.max(maxCol + 2, 4), MAX_COLUMNS);

  const addGate = useCallback(
    (qubit: number, column: number) => {
      if (selectedGate === 'CNOT') {
        if (cnotControl === null) {
          setCnotControl(qubit);
          return;
        }
        if (cnotControl === qubit) {
          setCnotControl(null);
          return;
        }
        setGates((prev) => [
          ...prev,
          { type: 'CNOT', qubit, controlQubit: cnotControl, column },
        ]);
        setCnotControl(null);
      } else {
        setGates((prev) => [...prev, { type: selectedGate, qubit, column }]);
      }
    },
    [selectedGate, cnotControl]
  );

  const removeGate = useCallback((index: number) => {
    setGates((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const reset = useCallback(() => {
    setGates([]);
    setCnotControl(null);
  }, []);

  return (
    <>
      {/* Header */}
      <Section className="pt-24 pb-8">
        <div className="text-center mb-8">
          <Badge variant="amber" className="mb-4">Browser-Based Quantum Simulation</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Quantum Circuit{' '}
            <span className="bg-gradient-to-r from-photon-cyan to-quantum-violet bg-clip-text text-transparent">
              Simulator
            </span>
          </h1>
          <p className="mt-4 text-text-secondary max-w-xl mx-auto">
            Build quantum circuits, apply gates, and observe state vectors and measurement
            probabilities. Educational simulation only.
          </p>
        </div>

        {/* Info Banner */}
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mb-8"
          >
            <GlassCard className="p-4 flex items-start gap-3">
              <Info className="w-5 h-5 text-energy-amber flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <p className="text-sm text-text-secondary">
                  This is a <strong className="text-energy-amber">browser-based educational simulator</strong>.
                  It computes exact state vectors for small circuits (up to {MAX_QUBITS} qubits).
                  It is not connected to a physical quantum processor.
                </p>
              </div>
              <button
                onClick={() => setShowInfo(false)}
                className="text-text-muted hover:text-text-secondary text-xs"
                aria-label="Dismiss"
              >
                ✕
              </button>
            </GlassCard>
          </motion.div>
        )}

        {/* Controls */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            {/* Qubit count */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-text-muted uppercase tracking-wider">Qubits:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setNumQubits((n) => Math.max(1, n - 1));
                    reset();
                  }}
                  disabled={numQubits <= 1}
                  className="p-1.5 border border-white/10 rounded hover:bg-white/5 disabled:opacity-30 text-text-secondary"
                  aria-label="Remove qubit"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-8 text-center font-mono text-photon-cyan font-bold">{numQubits}</span>
                <button
                  onClick={() => {
                    setNumQubits((n) => Math.min(MAX_QUBITS, n + 1));
                    reset();
                  }}
                  disabled={numQubits >= MAX_QUBITS}
                  className="p-1.5 border border-white/10 rounded hover:bg-white/5 disabled:opacity-30 text-text-secondary"
                  aria-label="Add qubit"
                >
                  <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>

            {/* Reset */}
            <button
              onClick={reset}
              className="flex items-center gap-2 px-3 py-2 text-xs font-mono uppercase tracking-wider text-text-muted border border-white/10 rounded hover:text-text-secondary hover:border-white/20 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset
            </button>
          </div>

          {/* Gate Palette */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(Object.keys(GATE_INFO) as GateType[]).map((gate) => {
              const info = GATE_INFO[gate];
              const isActive = selectedGate === gate;
              return (
                <button
                  key={gate}
                  onClick={() => {
                    setSelectedGate(gate);
                    setCnotControl(null);
                  }}
                  className={`px-3 py-2 text-xs font-mono font-bold rounded border transition-all duration-200 ${
                    isActive
                      ? info.color
                      : 'bg-transparent text-text-muted border-white/[0.06] hover:border-white/10'
                  }`}
                  title={`${info.name}: ${info.desc}`}
                >
                  {gate}
                </button>
              );
            })}
          </div>

          {/* CNOT instruction */}
          {selectedGate === 'CNOT' && (
            <div className="mb-4 text-xs font-mono text-quantum-violet">
              {cnotControl !== null
                ? `Control qubit: q${cnotControl}. Click target qubit position.`
                : 'Click control qubit position first, then target qubit.'}
            </div>
          )}

          {/* Circuit Grid */}
          <GlassCard className="p-4 sm:p-6 overflow-x-auto mb-8">
            <div className="min-w-[500px]">
              {/* Column headers */}
              <div className="flex items-center mb-2 pl-16">
                {Array.from({ length: numColumns }).map((_, col) => (
                  <div
                    key={col}
                    className="w-16 text-center text-[10px] font-mono text-text-muted"
                  >
                    t{col}
                  </div>
                ))}
              </div>

              {/* Qubit rows */}
              {Array.from({ length: numQubits }).map((_, qubit) => (
                <div key={qubit} className="flex items-center h-14 group">
                  {/* Qubit label */}
                  <div className="w-16 flex-shrink-0 text-xs font-mono text-text-muted pr-2 text-right">
                    q{qubit}: |0⟩
                  </div>

                  {/* Wire */}
                  <div className="flex-1 relative flex items-center">
                    {/* Wire line */}
                    <div className="absolute inset-y-[50%] left-0 right-0 h-px bg-white/10" />

                    {/* Gate slots */}
                    {Array.from({ length: numColumns }).map((_, col) => {
                      const gateHere = gates.find(
                        (g) => g.qubit === qubit && g.column === col
                      );
                      const controlHere = gates.find(
                        (g) => g.type === 'CNOT' && g.controlQubit === qubit && g.column === col
                      );

                      return (
                        <div
                          key={col}
                          className="w-16 h-14 flex items-center justify-center relative z-10"
                        >
                          {gateHere ? (
                            <button
                              onClick={() => removeGate(gates.indexOf(gateHere))}
                              className={`w-10 h-10 rounded border font-mono text-xs font-bold flex items-center justify-center transition-all hover:scale-110 ${GATE_INFO[gateHere.type].color}`}
                              title={`${GATE_INFO[gateHere.type].name} — click to remove`}
                            >
                              {gateHere.type === 'MEASURE' ? 'M' : gateHere.type}
                            </button>
                          ) : controlHere ? (
                            <button
                              onClick={() => removeGate(gates.indexOf(controlHere))}
                              className="w-4 h-4 rounded-full bg-quantum-violet border border-quantum-violet/50"
                              title="CNOT control — click to remove"
                            />
                          ) : (
                            <button
                              onClick={() => addGate(qubit, col)}
                              className="w-10 h-10 rounded border border-dashed border-white/[0.06] hover:border-white/20 hover:bg-white/[0.02] transition-colors flex items-center justify-center"
                              aria-label={`Add ${selectedGate} gate at qubit ${qubit}, time ${col}`}
                            >
                              <Plus className="w-3 h-3 text-white/10" />
                            </button>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Results */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* State Vector */}
            <GlassCard className="p-6">
              <h3 className="text-sm font-mono font-semibold tracking-wider uppercase text-photon-cyan mb-4">
                State Vector
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {stateVector.map((amplitude, index) => {
                  const prob = complexMag2(amplitude);
                  if (prob < 1e-10) return null;
                  return (
                    <div key={index} className="flex items-center gap-3 text-sm font-mono">
                      <span className="text-text-muted w-12">{formatKet(index, numQubits)}</span>
                      <span className="text-photon-cyan">{formatComplex(amplitude)}</span>
                    </div>
                  );
                })}
                {stateVector.every((a) => complexMag2(a) < 1e-10) && (
                  <p className="text-xs text-text-muted">No state — add gates to the circuit.</p>
                )}
              </div>
            </GlassCard>

            {/* Probability Distribution */}
            <GlassCard className="p-6">
              <h3 className="text-sm font-mono font-semibold tracking-wider uppercase text-quantum-violet mb-4">
                Measurement Probabilities
              </h3>
              <div className="space-y-3">
                {probabilities.map((prob, index) => {
                  if (prob < 1e-10) return null;
                  return (
                    <div key={index}>
                      <div className="flex items-center justify-between text-xs font-mono mb-1">
                        <span className="text-text-muted">{formatKet(index, numQubits)}</span>
                        <span className="text-text-primary">{(prob * 100).toFixed(1)}%</span>
                      </div>
                      <div className="h-2 bg-white/[0.03] rounded-full overflow-hidden">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-photon-cyan to-quantum-violet"
                          initial={{ width: 0 }}
                          animate={{ width: `${prob * 100}%` }}
                          transition={{ duration: 0.4, ease: 'easeOut' }}
                        />
                      </div>
                    </div>
                  );
                })}
                {probabilities.every((p) => p < 1e-10 || (p > 0.999 && probabilities.indexOf(p) === 0)) && gates.length === 0 && (
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono mb-1">
                      <span className="text-text-muted">{formatKet(0, numQubits)}</span>
                      <span className="text-text-primary">100.0%</span>
                    </div>
                    <div className="h-2 bg-white/[0.03] rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-photon-cyan to-quantum-violet w-full" />
                    </div>
                  </div>
                )}
              </div>
            </GlassCard>
          </div>

          {/* Example circuits */}
          <div className="mt-8">
            <h3 className="text-sm font-mono font-semibold tracking-wider uppercase text-text-muted mb-4">
              Quick Examples
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                {
                  name: 'Superposition',
                  desc: 'H|0⟩ = (|0⟩+|1⟩)/√2',
                  qubits: 1,
                  gates: [{ type: 'H' as GateType, qubit: 0, column: 0 }],
                },
                {
                  name: 'Bell State',
                  desc: '(|00⟩+|11⟩)/√2',
                  qubits: 2,
                  gates: [
                    { type: 'H' as GateType, qubit: 0, column: 0 },
                    { type: 'CNOT' as GateType, qubit: 1, controlQubit: 0, column: 1 },
                  ],
                },
                {
                  name: 'GHZ State',
                  desc: '(|000⟩+|111⟩)/√2',
                  qubits: 3,
                  gates: [
                    { type: 'H' as GateType, qubit: 0, column: 0 },
                    { type: 'CNOT' as GateType, qubit: 1, controlQubit: 0, column: 1 },
                    { type: 'CNOT' as GateType, qubit: 2, controlQubit: 1, column: 2 },
                  ],
                },
              ].map((example) => (
                <button
                  key={example.name}
                  onClick={() => {
                    setNumQubits(example.qubits);
                    setGates(example.gates);
                    setCnotControl(null);
                  }}
                  className="px-4 py-2 text-xs border border-white/10 rounded hover:bg-white/5 hover:border-white/20 transition-colors"
                >
                  <span className="text-text-primary font-medium">{example.name}</span>
                  <span className="text-text-muted ml-2 font-mono">{example.desc}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
