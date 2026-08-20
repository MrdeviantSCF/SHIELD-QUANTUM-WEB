'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Atom, Cpu, CircuitBoard, GitBranch, BarChart3, Wrench, ArrowRight, type LucideIcon } from 'lucide-react';
import { Section, SectionHeader, GlassCard, Badge, Button } from '@/components/ui';

/* ═══════════════════════════════════════════════════════
   Quantum Machines — Core Concepts
   ═══════════════════════════════════════════════════════ */

type ContentLevel = 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

interface QuantumConcept {
  id: string;
  title: string;
  icon: LucideIcon;
  color: string;
  beginner: string;
  intermediate: string;
  advanced: string;
  keyPoints: string[];
}

const concepts: QuantumConcept[] = [
  {
    id: 'qubits',
    title: 'Qubits',
    icon: Atom,
    color: 'text-photon-cyan',
    beginner:
      'A qubit is the quantum equivalent of a classical bit. While a bit is either 0 or 1, a qubit can exist in a combination of both states simultaneously — a property called superposition.',
    intermediate:
      'A qubit is a two-level quantum system described by a state vector |ψ⟩ = α|0⟩ + β|1⟩, where α and β are complex amplitudes satisfying |α|² + |β|² = 1. Physical implementations include superconducting circuits, trapped ions, and photonic systems.',
    advanced:
      'Qubits are realized as the computational subspace of a physical quantum system. Decoherence times (T₁, T₂) limit gate fidelity. State tomography and randomized benchmarking quantify qubit quality. Multi-qubit systems require careful consideration of crosstalk, spectral crowding, and connectivity constraints.',
    keyPoints: [
      'Fundamental unit of quantum information',
      'Exists in superposition of |0⟩ and |1⟩',
      'Physical implementations vary by technology',
      'Quality measured by coherence times and gate fidelity',
    ],
  },
  {
    id: 'gates',
    title: 'Quantum Gates',
    icon: CircuitBoard,
    color: 'text-quantum-violet',
    beginner:
      'Quantum gates are operations that change the state of qubits. Just as classical logic gates (AND, OR, NOT) transform bits, quantum gates transform qubits using the rules of quantum mechanics.',
    intermediate:
      'Quantum gates are unitary operations acting on qubits. Single-qubit gates (X, Y, Z, H, S, T) rotate the qubit state on the Bloch sphere. Two-qubit gates like CNOT create entanglement. A universal gate set (e.g., {H, T, CNOT}) can approximate any unitary operation.',
    advanced:
      'Gate synthesis decomposes arbitrary unitaries into sequences from a finite gate set. The Solovay-Kitaev theorem guarantees efficient approximation. Physical gate implementations involve calibrated microwave pulses (superconducting), laser pulses (ions), or beam splitters (photonic). Gate fidelities above 99.9% are required for fault-tolerant operation.',
    keyPoints: [
      'Unitary operations on qubit states',
      'Single-qubit: X, Y, Z, H, S, T',
      'Two-qubit: CNOT, CZ, SWAP',
      'Universal gate sets enable arbitrary computation',
    ],
  },
  {
    id: 'superposition',
    title: 'Superposition',
    icon: GitBranch,
    color: 'text-quantum-blue',
    beginner:
      'Superposition allows a qubit to be in a combination of 0 and 1 at the same time. This is fundamentally different from classical computing where a bit must be exactly 0 or exactly 1.',
    intermediate:
      'A qubit in superposition is described by |ψ⟩ = α|0⟩ + β|1⟩. The Hadamard gate H creates an equal superposition: H|0⟩ = (|0⟩ + |1⟩)/√2. Multiple qubits in superposition can represent 2ⁿ states simultaneously, enabling quantum parallelism.',
    advanced:
      'Superposition is a consequence of the linearity of quantum mechanics. Quantum algorithms exploit constructive and destructive interference between superposed states to amplify correct answers. Maintaining coherent superposition is the central engineering challenge — environmental decoherence continuously degrades quantum states.',
    keyPoints: [
      'Qubits exist in combinations of |0⟩ and |1⟩',
      'Created by gates like Hadamard (H)',
      'Enables quantum parallelism',
      'Fragile — destroyed by decoherence',
    ],
  },
  {
    id: 'entanglement',
    title: 'Entanglement',
    icon: Cpu,
    color: 'text-quantum-emerald',
    beginner:
      'Entanglement is a connection between two or more qubits where the state of one instantly influences the other, regardless of distance. Einstein called it "spooky action at a distance."',
    intermediate:
      'An entangled state like |Φ⁺⟩ = (|00⟩ + |11⟩)/√2 cannot be written as a product of individual qubit states. Measuring one qubit immediately determines the other. CNOT gates applied to superposed qubits create entanglement. Bell states are maximally entangled two-qubit states.',
    advanced:
      'Entanglement is quantified by measures such as concurrence, entanglement entropy, and negativity. Multi-partite entanglement (GHZ, W states) is essential for quantum error correction and quantum communication. Entanglement distillation protocols purify noisy entangled states for use in quantum networks.',
    keyPoints: [
      'Quantum correlation between qubits',
      'Cannot be described as independent states',
      'Essential for quantum computing and communication',
      'Created by two-qubit gates like CNOT',
    ],
  },
  {
    id: 'measurement',
    title: 'Measurement',
    icon: BarChart3,
    color: 'text-energy-amber',
    beginner:
      'Measurement reads the value of a qubit, collapsing it from superposition into a definite 0 or 1. The result is probabilistic — running the same quantum circuit many times gives a distribution of outcomes.',
    intermediate:
      'Measurement in the computational basis projects |ψ⟩ = α|0⟩ + β|1⟩ onto |0⟩ with probability |α|² or |1⟩ with probability |β|². This is irreversible — the superposition is destroyed. Repeated measurements (shots) build statistics to estimate probabilities.',
    advanced:
      'Projective measurements are described by a set of orthogonal projectors. Generalized measurements (POVMs) allow non-orthogonal discrimination. Mid-circuit measurement enables feed-forward control and is essential for quantum error correction syndrome extraction. Measurement-based quantum computing uses entangled cluster states with adaptive measurements.',
    keyPoints: [
      'Collapses superposition to definite outcome',
      'Result is probabilistic',
      'Irreversible — destroys quantum state',
      'Multiple shots needed for statistics',
    ],
  },
  {
    id: 'error-correction',
    title: 'Error Correction',
    icon: Wrench,
    color: 'text-quantum-rose',
    beginner:
      'Quantum error correction protects quantum information from errors caused by noise and decoherence. It encodes one logical qubit across many physical qubits so errors can be detected and fixed.',
    intermediate:
      'Quantum error correcting codes (e.g., surface code, Steane code) encode logical qubits in entangled states of many physical qubits. Syndrome measurements detect errors without disturbing the encoded information. The threshold theorem guarantees fault-tolerant computation if physical error rates are below a threshold (~1%).',
    advanced:
      'The surface code is the leading candidate for fault-tolerant quantum computing, with a threshold of ~1% per gate. It requires O(d²) physical qubits per logical qubit at code distance d. Logical error rates decrease exponentially with d below threshold. Magic state distillation enables universal computation within the surface code framework but is resource-intensive.',
    keyPoints: [
      'Encodes logical qubits in many physical qubits',
      'Detects and corrects errors from decoherence',
      'Requires physical error rates below threshold',
      'Surface code is the leading approach',
    ],
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function QuantumMachinesPage() {
  const [selectedConcept, setSelectedConcept] = useState<string | null>(null);
  const [contentLevel, setContentLevel] = useState<ContentLevel>('BEGINNER');

  const activeConcept = concepts.find((c) => c.id === selectedConcept);

  return (
    <>
      {/* Hero */}
      <Section fullHeight className="pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="cyan" className="mb-6">Core Technology</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Quantum{' '}
            <span className="bg-gradient-to-r from-photon-cyan to-quantum-violet bg-clip-text text-transparent">
              Machines
            </span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
            The fundamental concepts behind quantum computing — from qubits and gates
            to error correction and fault-tolerant systems.
          </p>
        </div>
      </Section>

      <div className="section-divider" />

      {/* Content Level Selector */}
      <Section>
        <div className="flex items-center justify-center gap-2 mb-12">
          {(['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as ContentLevel[]).map((level) => (
            <button
              key={level}
              onClick={() => setContentLevel(level)}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase border rounded transition-all duration-200 ${
                contentLevel === level
                  ? 'bg-photon-cyan/10 text-photon-cyan border-photon-cyan/30'
                  : 'bg-transparent text-text-muted border-white/[0.06] hover:text-text-secondary hover:border-white/10'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <SectionHeader
          label="Fundamentals"
          title="Quantum Computing Concepts"
          description="Select a concept to explore. Content adapts to your selected knowledge level."
        />

        {/* Concept Grid */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {concepts.map((concept) => {
            const IconComponent = concept.icon;
            const isSelected = selectedConcept === concept.id;
            return (
              <motion.div key={concept.id} variants={fadeIn}>
                <button
                  onClick={() => setSelectedConcept(isSelected ? null : concept.id)}
                  className="w-full text-left"
                  aria-expanded={isSelected}
                >
                  <GlassCard
                    hover
                    glow={isSelected ? 'cyan' : 'none'}
                    className={`p-5 transition-all duration-300 ${
                      isSelected ? 'border-photon-cyan/30 bg-photon-cyan/[0.03]' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded border border-white/[0.06] ${concept.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-text-primary">{concept.title}</h3>
                        <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider mt-0.5">
                          {concept.keyPoints[0]}
                        </p>
                      </div>
                    </div>
                  </GlassCard>
                </button>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Expanded Concept Detail */}
        <AnimatePresence mode="wait">
          {activeConcept && (
            <motion.div
              key={activeConcept.id}
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-8 overflow-hidden"
            >
              <GlassCard className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <h3 className="text-xl font-semibold text-text-primary">{activeConcept.title}</h3>
                  <Badge variant={
                    (contentLevel === 'BEGINNER' ? 'emerald' :
                    contentLevel === 'INTERMEDIATE' ? 'cyan' : 'violet') as 'emerald' | 'cyan' | 'violet'
                  }>
                    {contentLevel}
                  </Badge>
                </div>

                <p className="text-sm text-text-secondary leading-relaxed">
                  {contentLevel === 'BEGINNER' && activeConcept.beginner}
                  {contentLevel === 'INTERMEDIATE' && activeConcept.intermediate}
                  {contentLevel === 'ADVANCED' && activeConcept.advanced}
                </p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeConcept.keyPoints.map((point, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-text-muted">
                      <div className="w-1 h-1 rounded-full bg-photon-cyan mt-1.5 flex-shrink-0" />
                      {point}
                    </div>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          )}
        </AnimatePresence>
      </Section>

      <div className="section-divider" />

      {/* CTA */}
      <Section>
        <div className="text-center">
          <h2 className="text-2xl font-bold text-text-primary">Ready to build quantum circuits?</h2>
          <p className="mt-3 text-text-secondary">
            Try our browser-based quantum circuit simulator.
          </p>
          <div className="mt-6">
            <Button variant="primary" size="lg" href="/simulator" icon={<ArrowRight className="w-4 h-4" />}>
              Open Quantum Simulator
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
