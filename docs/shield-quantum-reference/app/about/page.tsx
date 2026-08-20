'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Target,
  Eye,
  Compass,
  BookOpen,
  ArrowRight,
  Cpu,
  Zap,
  Atom,
  Layers,
  Shield,
  Rocket,
} from 'lucide-react';
import { Section, SectionHeader, GlassCard, Badge, Button } from '@/components/ui';

/* ═══════════════════════════════════════════════════════
   About — SHIELD Quantum Machine & Technology
   ═══════════════════════════════════════════════════════ */

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

/* ———————————————————————————————————————————————————————
   Computing Evolution Timeline
   ——————————————————————————————————————————————————————— */

const timeline = [
  {
    era: 'Classical Computing',
    period: '1940s–Present',
    description: 'Binary logic, transistors, von Neumann architecture. The foundation of all modern computation.',
    icon: Cpu,
    color: 'text-text-muted',
    lineColor: 'bg-white/10',
  },
  {
    era: 'High Performance Computing',
    period: '1960s–Present',
    description: 'Supercomputers, parallel processing, cluster computing. Enabling large-scale scientific simulation.',
    icon: Layers,
    color: 'text-quantum-blue',
    lineColor: 'bg-quantum-blue/30',
  },
  {
    era: 'Artificial Intelligence',
    period: '2010s–Present',
    description: 'Deep learning, neural networks, GPU acceleration. Pattern recognition at unprecedented scale.',
    icon: Zap,
    color: 'text-quantum-violet',
    lineColor: 'bg-quantum-violet/30',
  },
  {
    era: 'Quantum Computing',
    period: '2020s–Present',
    description: 'Superposition, entanglement, quantum gates. Computation leveraging quantum mechanical phenomena.',
    icon: Atom,
    color: 'text-photon-cyan',
    lineColor: 'bg-photon-cyan/30',
  },
  {
    era: 'Hybrid AI + Quantum',
    period: 'Emerging',
    description: 'Classical-quantum co-processing, quantum machine learning, hybrid optimization architectures.',
    icon: Rocket,
    color: 'text-energy-amber',
    lineColor: 'bg-energy-amber/30',
    badge: 'RESEARCH',
  },
  {
    era: 'Fault-Tolerant Quantum Machines',
    period: 'Future',
    description: 'Logical qubits, quantum error correction at scale, universal quantum computation.',
    icon: Shield,
    color: 'text-quantum-emerald',
    lineColor: 'bg-quantum-emerald/30',
    badge: 'FUTURE',
  },
  {
    era: 'Quantum Technology Ecosystem',
    period: 'Vision',
    description: 'Quantum internet, distributed quantum computing, quantum-secured global infrastructure.',
    icon: Target,
    color: 'text-quantum-rose',
    lineColor: 'bg-quantum-rose/30',
    badge: 'CONCEPT',
  },
];

/* ═══════════════════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════════════════ */

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <Section fullHeight className="pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeIn}>
              <Badge variant="cyan" className="mb-6">About SHIELD Quantum</Badge>
            </motion.div>
            <motion.h1 variants={fadeIn} className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Engineering the{' '}
              <span className="bg-gradient-to-r from-photon-cyan to-quantum-violet bg-clip-text text-transparent">
                Quantum Future
              </span>
            </motion.h1>
            <motion.p variants={fadeIn} className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto leading-relaxed">
              SHIELD Quantum Machine & Technology is dedicated to advancing quantum science,
              building quantum machines, and creating the technology infrastructure for the
              quantum computing era.
            </motion.p>
          </motion.div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* Mission / Vision / Philosophy */}
      <Section id="mission">
        <SectionHeader
          label="Foundation"
          title="Mission, Vision & Philosophy"
        />

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {[
            {
              icon: Target,
              title: 'Mission',
              description:
                'To develop advanced quantum machines and technology that push the boundaries of computation, security, and scientific discovery. We pursue rigorous research, responsible engineering, and open collaboration.',
              color: 'text-photon-cyan',
            },
            {
              icon: Eye,
              title: 'Vision',
              description:
                'A future where quantum technology is a practical, accessible, and transformative tool — enabling breakthroughs in materials science, drug discovery, cybersecurity, artificial intelligence, and fundamental physics.',
              color: 'text-quantum-violet',
            },
            {
              icon: Compass,
              title: 'Philosophy',
              description:
                'Scientific rigor over marketing. Honest communication about what quantum technology can and cannot do today. Systematic engineering. Long-term thinking. Every claim grounded in physics.',
              color: 'text-quantum-emerald',
            },
          ].map((item) => {
            const IconComponent = item.icon;
            return (
              <motion.div key={item.title} variants={fadeIn}>
                <GlassCard className="p-8 h-full">
                  <div className={`p-3 rounded-lg border border-white/[0.06] w-fit ${item.color}`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-semibold text-text-primary">{item.title}</h3>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">{item.description}</p>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>

      <div className="section-divider" />

      {/* Research Strategy */}
      <Section id="strategy">
        <SectionHeader
          label="Research Strategy"
          title="From Classical to Quantum"
          description="Our approach follows the natural evolution of computing technology — building on decades of classical, HPC, and AI expertise to develop quantum systems."
        />

        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
          >
            {/* Timeline line */}
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-white/10 via-photon-cyan/30 to-quantum-violet/30" />

            {timeline.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.era}
                  variants={fadeIn}
                  className="relative flex gap-6 pb-10 last:pb-0"
                >
                  {/* Node */}
                  <div className={`relative z-10 flex-shrink-0 w-12 h-12 rounded-full border border-white/10 bg-deep-space flex items-center justify-center ${item.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 pt-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-lg font-semibold text-text-primary">{item.era}</h3>
                      <span className="text-xs font-mono text-text-muted">{item.period}</span>
                      {item.badge && <Badge variant={item.badge === 'RESEARCH' ? 'violet' : item.badge === 'FUTURE' ? 'amber' : 'muted'}>{item.badge}</Badge>}
                    </div>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* Future Objectives */}
      <Section id="objectives">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeIn}>
              <Badge variant="violet" className="mb-6">Future Objectives</Badge>
            </motion.div>
            <motion.h2 variants={fadeIn} className="text-3xl sm:text-4xl font-bold tracking-tight">
              Building Toward Quantum Advantage
            </motion.h2>
            <motion.p variants={fadeIn} className="mt-4 text-text-secondary leading-relaxed">
              Our long-term objective is to build quantum machines capable of solving
              problems beyond the reach of classical computers — in materials science,
              cryptography, optimization, and scientific simulation. This requires
              advances across hardware, software, error correction, and cryogenic
              engineering.
            </motion.p>
            <motion.div variants={fadeIn} className="mt-8 flex items-center justify-center gap-4">
              <Button variant="primary" href="/roadmap" icon={<ArrowRight className="w-4 h-4" />}>
                View Technology Roadmap
              </Button>
              <Button variant="outline" href="/research">
                Research Areas
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
