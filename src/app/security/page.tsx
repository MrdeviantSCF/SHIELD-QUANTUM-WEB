'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Key, AlertTriangle, ArrowRight } from 'lucide-react';
import { Section, SectionHeader, GlassCard, Badge, Button } from '@/components/ui';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };

const securityTopics = [
  {
    title: 'Post-Quantum Cryptography',
    description: 'Cryptographic algorithms designed to resist attacks from both classical and quantum computers. Based on lattice problems, hash functions, and other quantum-resistant mathematical structures.',
    status: 'RESEARCH',
    icon: Lock,
    color: 'text-photon-cyan',
  },
  {
    title: 'Quantum Key Distribution',
    description: 'Using quantum mechanical properties to establish shared secret keys between parties. Any interception attempt disturbs the quantum states and is detectable.',
    status: 'RESEARCH',
    icon: Key,
    color: 'text-quantum-violet',
  },
  {
    title: 'Quantum Random Number Generation',
    description: 'True random number generation based on quantum mechanical processes. Unlike pseudo-random generators, quantum randomness is fundamentally unpredictable.',
    status: 'CONCEPT',
    icon: Shield,
    color: 'text-quantum-emerald',
  },
  {
    title: 'Cryptographic Migration',
    description: 'Planning and executing the transition from quantum-vulnerable cryptographic systems to quantum-resistant alternatives. Includes inventory, risk assessment, and phased replacement.',
    status: 'CONCEPT',
    icon: ArrowRight,
    color: 'text-energy-amber',
  },
];

const evolutionPhases = [
  { label: 'Classical Security', desc: 'RSA, ECC, AES — Current cryptographic standards', status: 'current', color: 'text-quantum-emerald' },
  { label: 'Quantum Threat', desc: 'Shor\'s algorithm threatens RSA/ECC. Grover\'s reduces symmetric key strength.', status: 'emerging', color: 'text-quantum-rose' },
  { label: 'Quantum-Resilient Security', desc: 'Post-quantum cryptography, QKD, quantum-safe architecture', status: 'future', color: 'text-photon-cyan' },
];

export default function SecurityPage() {
  return (
    <>
      <Section fullHeight className="pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="cyan" className="mb-6">Quantum Cybersecurity</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Quantum{' '}
            <span className="bg-gradient-to-r from-photon-cyan to-quantum-emerald bg-clip-text text-transparent">
              Security
            </span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
            Preparing for the post-quantum era. Research in quantum-resistant cryptography,
            quantum key distribution, and quantum-safe security architectures.
          </p>
        </div>
      </Section>

      <div className="section-divider" />

      {/* Security Evolution */}
      <Section>
        <SectionHeader label="Security Evolution" title="From Classical to Quantum-Resilient" />

        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-4"
          >
            {evolutionPhases.map((phase, i) => (
              <motion.div key={phase.label} variants={fadeIn}>
                <GlassCard className="p-6 flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full border border-white/10 flex items-center justify-center font-mono text-sm font-bold ${phase.color}`}>
                    {i + 1}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`text-lg font-semibold ${phase.color}`}>{phase.label}</h3>
                    </div>
                    <p className="mt-1 text-sm text-text-secondary">{phase.desc}</p>
                  </div>
                </GlassCard>
                {i < evolutionPhases.length - 1 && (
                  <div className="flex justify-center py-1">
                    <div className="w-px h-4 bg-white/10" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* Security Topics */}
      <Section>
        <SectionHeader label="Research Areas" title="Quantum Security Technologies" />
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto"
        >
          {securityTopics.map((topic) => {
            const IconComponent = topic.icon;
            return (
              <motion.div key={topic.title} variants={fadeIn}>
                <GlassCard hover glow="cyan" className="p-6 h-full">
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded border border-white/[0.06] ${topic.color}`}>
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-base font-semibold text-text-primary">{topic.title}</h3>
                        <Badge variant={topic.status === 'RESEARCH' ? 'violet' : 'muted'}>{topic.status}</Badge>
                      </div>
                      <p className="text-sm text-text-secondary leading-relaxed">{topic.description}</p>
                    </div>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>

      <div className="section-divider" />

      {/* Important Disclaimer */}
      <Section>
        <div className="max-w-2xl mx-auto">
          <GlassCard className="p-6 border-energy-amber/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-energy-amber flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-energy-amber">Scientific Responsibility</h3>
                <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                  SHIELD Quantum does not claim &quot;unbreakable&quot; or &quot;unhackable&quot; security.
                  Quantum security technologies are active research areas with significant engineering
                  challenges. All claims on this website are grounded in established quantum information science.
                </p>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      <div className="section-divider" />

      <Section>
        <div className="text-center">
          <h2 className="text-2xl font-bold">Explore Quantum Cryptography</h2>
          <p className="mt-3 text-text-secondary">Interactive Alice-Bob-Eve demonstration</p>
          <div className="mt-6">
            <Button variant="primary" href="/cryptography" icon={<ArrowRight className="w-4 h-4" />}>
              Quantum Cryptography Demo
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
