'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Section, GlassCard, Badge } from '@/components/ui';

/* ═══════════════════════════════════════════════════════
   Quantum Cryptography — Alice, Bob & Eve
   Interactive educational visualization
   ═══════════════════════════════════════════════════════ */

type Channel = 'idle' | 'sending' | 'intercepted' | 'received';

export default function CryptographyPage() {
  const [evePresent, setEvePresent] = useState(false);
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: 'Step 1: Alice Prepares Qubits',
      description: 'Alice encodes random bits by preparing qubits in randomly chosen bases (rectilinear + or diagonal ×). Each qubit carries one bit of information.',
      alice: 'Prepares |0⟩, |1⟩, |+⟩, or |−⟩',
      channel: 'idle' as Channel,
    },
    {
      title: 'Step 2: Quantum Transmission',
      description: 'Alice sends qubits through the quantum channel to Bob. If no eavesdropper is present, qubits arrive undisturbed.',
      alice: 'Sends qubits →',
      channel: 'sending' as Channel,
    },
    {
      title: 'Step 3: Bob Measures',
      description: 'Bob measures each qubit in a randomly chosen basis. When his basis matches Alice\'s, he gets the correct bit. When mismatched, the result is random.',
      bob: 'Measures in random basis',
      channel: 'received' as Channel,
    },
    {
      title: 'Step 4: Basis Reconciliation',
      description: 'Alice and Bob publicly compare their basis choices (not the measurement results). They keep only the bits where they used the same basis — this becomes the shared key.',
      alice: 'Announces bases',
      bob: 'Compares bases',
      channel: 'idle' as Channel,
    },
    {
      title: 'Step 5: Error Detection',
      description: 'They sacrifice a subset of matching bits to check the error rate. If the error rate is abnormally high, an eavesdropper (Eve) may have intercepted and disturbed the quantum states.',
      channel: evePresent ? 'intercepted' as Channel : 'idle' as Channel,
    },
  ];

  const currentStep = steps[step];

  return (
    <>
      <Section className="pt-24 pb-8">
        <div className="text-center mb-8">
          <Badge variant="cyan" className="mb-4">Educational Demonstration</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Quantum{' '}
            <span className="bg-gradient-to-r from-photon-cyan to-quantum-violet bg-clip-text text-transparent">
              Cryptography
            </span>
          </h1>
          <p className="mt-4 text-text-secondary max-w-xl mx-auto">
            A simplified visualization of quantum key distribution (BB84 protocol concept).
          </p>
        </div>
      </Section>

      <Section>
        <div className="max-w-4xl mx-auto">
          {/* Alice — Channel — Bob Visualization */}
          <GlassCard className="p-8 mb-8">
            <div className="flex items-center justify-between gap-4">
              {/* Alice */}
              <div className="text-center flex-1">
                <div className="w-16 h-16 rounded-full border-2 border-photon-cyan/40 bg-photon-cyan/5 flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-photon-cyan">A</span>
                </div>
                <h3 className="text-sm font-semibold text-photon-cyan">Alice</h3>
                <p className="text-[10px] font-mono text-text-muted mt-1">Sender</p>
              </div>

              {/* Quantum Channel */}
              <div className="flex-[2] relative py-4">
                <div className="h-px bg-white/10 relative">
                  {/* Photon animation */}
                  {step === 1 && (
                    <motion.div
                      className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-photon-cyan"
                      animate={{ x: [0, 300] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                      style={{ boxShadow: '0 0 10px rgba(0,212,255,0.5)' }}
                    />
                  )}
                </div>
                <div className="text-center mt-2">
                  <span className="text-[10px] font-mono text-text-muted">QUANTUM CHANNEL</span>
                </div>

                {/* Eve */}
                {evePresent && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-full"
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full border-2 border-quantum-rose/40 bg-quantum-rose/5 flex items-center justify-center mx-auto mb-1">
                        <span className="text-sm font-bold text-quantum-rose">E</span>
                      </div>
                      <span className="text-[10px] font-mono text-quantum-rose">Eve (Eavesdropper)</span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Bob */}
              <div className="text-center flex-1">
                <div className="w-16 h-16 rounded-full border-2 border-quantum-violet/40 bg-quantum-violet/5 flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg font-bold text-quantum-violet">B</span>
                </div>
                <h3 className="text-sm font-semibold text-quantum-violet">Bob</h3>
                <p className="text-[10px] font-mono text-text-muted mt-1">Receiver</p>
              </div>
            </div>
          </GlassCard>

          {/* Eve toggle */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <button
              onClick={() => setEvePresent(!evePresent)}
              className={`px-4 py-2 text-xs font-mono uppercase tracking-wider border rounded transition-all ${
                evePresent
                  ? 'bg-quantum-rose/10 text-quantum-rose border-quantum-rose/30'
                  : 'bg-transparent text-text-muted border-white/10 hover:border-white/20'
              }`}
            >
              {evePresent ? '🔴 Eve Active' : 'Add Eve (Eavesdropper)'}
            </button>
          </div>

          {/* Step content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <GlassCard className="p-6 mb-6">
                <h3 className="text-lg font-semibold text-text-primary">{currentStep.title}</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">{currentStep.description}</p>

                {evePresent && step === 4 && (
                  <div className="mt-4 p-3 border border-quantum-rose/20 rounded bg-quantum-rose/5">
                    <p className="text-sm text-quantum-rose">
                      ⚠ High error rate detected! Eve&apos;s measurements have disturbed the quantum states.
                      In a real QKD system, Alice and Bob would abort and start over.
                    </p>
                  </div>
                )}
              </GlassCard>
            </motion.div>
          </AnimatePresence>

          {/* Step navigation */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="px-4 py-2 text-xs font-mono uppercase border border-white/10 rounded hover:bg-white/5 disabled:opacity-30 transition-colors"
            >
              ← Previous
            </button>
            <div className="flex gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStep(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === step ? 'bg-photon-cyan' : 'bg-white/10'
                  }`}
                  aria-label={`Step ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
              disabled={step === steps.length - 1}
              className="px-4 py-2 text-xs font-mono uppercase border border-white/10 rounded hover:bg-white/5 disabled:opacity-30 transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      </Section>
    </>
  );
}
