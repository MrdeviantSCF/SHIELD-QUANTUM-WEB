'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Cpu,
  Shield,
  Atom,
  Zap,
  Lock,
  Lightbulb,
  Microscope,
  Globe,
  Binary,
  FlaskConical,
  Server,
  Layers,
} from 'lucide-react';
import HeroSection from '@/components/hero/HeroSection';
import QuantumProgressionStack from '@/components/quantum/QuantumProgressionStack';
import QuantumVisualizerShowcase from '@/components/quantum/QuantumVisualizerShowcase';
import { Section, SectionHeader, GlassCard, Badge, Button } from '@/components/ui';

/* ═══════════════════════════════════════════════════════
   Home Page — SHIELD Quantum Machine & Technology
   ═══════════════════════════════════════════════════════ */

// Animation variants for staggered reveals
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ———————————————————————————————————————————————————————
   Technology Domains
   ——————————————————————————————————————————————————————— */

const domains = [
  {
    icon: Cpu,
    title: 'Quantum Computing',
    description: 'Gate-based quantum computation, quantum algorithms, and error correction research.',
    color: 'text-photon-cyan',
    href: '/quantum-machines',
  },
  {
    icon: Atom,
    title: 'Quantum Hardware',
    description: 'Superconducting qubits, trapped ions, photonic systems, and cryogenic engineering.',
    color: 'text-quantum-violet',
    href: '/hardware',
  },
  {
    icon: Zap,
    title: 'Quantum AI',
    description: 'Hybrid quantum-classical computing, quantum machine learning, and optimization.',
    color: 'text-quantum-blue',
    href: '/ai-quantum',
  },
  {
    icon: Lock,
    title: 'Quantum Security',
    description: 'Post-quantum cryptography, quantum key distribution, and quantum-safe systems.',
    color: 'text-quantum-emerald',
    href: '/security',
  },
  {
    icon: Lightbulb,
    title: 'Quantum Photonics',
    description: 'Photonic quantum computing, optical communication, and quantum optics research.',
    color: 'text-energy-amber',
    href: '/labs/photonics',
  },
  {
    icon: Microscope,
    title: 'Quantum Materials',
    description: 'Advanced superconducting, topological, and semiconductor materials research.',
    color: 'text-quantum-rose',
    href: '/materials',
  },
  {
    icon: Globe,
    title: 'Quantum Networks',
    description: 'Quantum communication, entanglement distribution, and network architecture.',
    color: 'text-photon-cyan',
    href: '/network',
  },
  {
    icon: Binary,
    title: 'Quantum Software',
    description: 'Quantum programming frameworks, simulators, and algorithm development.',
    color: 'text-quantum-violet',
    href: '/simulator',
  },
  {
    icon: FlaskConical,
    title: 'Quantum Sensing',
    description: 'Precision measurement, quantum magnetometry, gravimetry, and imaging.',
    color: 'text-quantum-blue',
    href: '/sensing',
  },
  {
    icon: Server,
    title: 'High Performance Computing',
    description: 'Classical-quantum hybrid compute, GPU acceleration, and scientific simulation.',
    color: 'text-quantum-emerald',
    href: '/hpc',
  },
  {
    icon: Shield,
    title: 'Cybersecurity',
    description: 'Quantum threat modeling, cryptographic migration, and secure architectures.',
    color: 'text-energy-amber',
    href: '/security',
  },
  {
    icon: Layers,
    title: 'Scientific Research',
    description: 'Fundamental quantum physics, quantum information theory, and applied research.',
    color: 'text-quantum-rose',
    href: '/research',
  },
];

/* ———————————————————————————————————————————————————————
   Interactive Experiences
   ——————————————————————————————————————————————————————— */

const experiences = [
  {
    title: 'Cryogenic Quantum Lab',
    description:
      'Explore a virtual dilution refrigerator system. Interact with quantum hardware components and learn about cryogenic engineering.',
    badge: 'Interactive Lab',
    href: '/labs/cryogenic',
    gradient: 'from-photon-cyan/20 to-quantum-violet/20',
  },
  {
    title: 'Quantum Circuit Simulator',
    description:
      'Build and simulate quantum circuits in your browser. Apply quantum gates, observe state vectors, and measure qubits.',
    badge: 'Browser Simulation',
    href: '/simulator',
    gradient: 'from-quantum-violet/20 to-quantum-blue/20',
  },
  {
    title: 'Research Campus',
    description:
      'Navigate a virtual quantum research facility. Discover laboratories, computing centers, and collaboration spaces.',
    badge: 'Virtual Campus',
    href: '/campus',
    gradient: 'from-quantum-blue/20 to-quantum-emerald/20',
  },
];

/* ═══════════════════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════════════════ */

export default function HomePage() {
  return (
    <>
      {/* Primary Hero: 3D Cryogenic Quantum Machine & Scientific Core */}
      <HeroSection />

      {/* Section divider */}
      <div className="section-divider" />

      {/* 6-Stage Quantum Progression: Machine -> Qubits -> Gates -> Entanglement -> Network -> Applications */}
      <Section id="progression" className="py-16">
        <div className="max-w-6xl mx-auto">
          <QuantumProgressionStack />
        </div>
      </Section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* Interactive Quantum Physics & Hardware Showcase */}
      <Section id="quantum-showcase" className="py-16">
        <div className="max-w-6xl mx-auto">
          <QuantumVisualizerShowcase />
        </div>
      </Section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* Technology Domains */}
      <Section id="domains">
        <SectionHeader
          label="Technology Domains"
          title="Quantum Technology Ecosystem"
          description="A comprehensive approach to quantum technology spanning hardware, software, security, and applied research."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {domains.map((domain) => {
            const IconComponent = domain.icon;
            return (
              <motion.div key={domain.title} variants={itemVariants}>
                <GlassCard hover glow="cyan" className="p-5 h-full group">
                  <a href={domain.href} className="block h-full">
                    <div className="flex items-start gap-4">
                      <div className={`p-2 rounded border border-white/[0.06] ${domain.color}`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-text-primary group-hover:text-photon-cyan transition-colors">
                          {domain.title}
                        </h3>
                        <p className="mt-1.5 text-xs text-text-muted leading-relaxed">
                          {domain.description}
                        </p>
                      </div>
                    </div>
                  </a>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* Interactive Experiences */}
      <Section id="experiences">
        <SectionHeader
          label="Interactive Experiences"
          title="Enter the Quantum Lab"
          description="Unique interactive experiences designed for exploration and education. Grounded in real laboratory physics."
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-6"
        >
          {experiences.map((exp, index) => (
            <motion.div key={exp.title} variants={itemVariants}>
              <a href={exp.href} className="block group">
                <GlassCard hover className="p-0 overflow-hidden h-full">
                  {/* Gradient header */}
                  <div
                    className={`h-40 bg-gradient-to-br ${exp.gradient} flex items-center justify-center relative overflow-hidden`}
                  >
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage:
                          'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    <span className="text-6xl font-bold text-white/5 font-mono">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <Badge variant="cyan" className="mb-3">
                      {exp.badge}
                    </Badge>
                    <h3 className="text-lg font-semibold text-text-primary group-hover:text-photon-cyan transition-colors">
                      {exp.title}
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </GlassCard>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </Section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* Mission Statement */}
      <Section id="mission">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
          >
            <div className="flex items-center gap-3 mb-6 justify-center">
              <div className="h-px w-12 bg-photon-cyan/40" />
              <span className="text-[11px] font-mono font-semibold tracking-[0.2em] uppercase text-photon-cyan">
                Our Mission
              </span>
              <div className="h-px w-12 bg-photon-cyan/40" />
            </div>

            <blockquote className="text-2xl sm:text-3xl lg:text-4xl font-light text-text-primary leading-relaxed tracking-tight">
              To advance quantum science and engineering,
              <span className="text-photon-cyan"> build the machines</span> that define the
              next era of computing, and{' '}
              <span className="text-quantum-violet">secure the digital future</span> through
              quantum technology.
            </blockquote>

            <div className="mt-10 flex items-center justify-center gap-4">
              <Button variant="outline" size="md" href="/about">
                Learn More About SHIELD
              </Button>
              <Button variant="ghost" size="md" href="/collaborate">
                Collaborate With Us
              </Button>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Section divider */}
      <div className="section-divider" />

      {/* Research Stats — DEMO DATA */}
      <Section id="stats">
        <div className="text-center mb-8">
          <Badge variant="amber">Demo Data — Conceptual Dashboard</Badge>
        </div>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {[
            { label: 'Research Domains', value: '12', suffix: '+' },
            { label: 'Technology Areas', value: '30', suffix: '+' },
            { label: 'Interactive Labs', value: '3', suffix: '' },
            { label: 'Knowledge Articles', value: '40', suffix: '+' },
          ].map((stat) => (
            <motion.div key={stat.label} variants={itemVariants}>
              <GlassCard className="p-6 text-center">
                <div className="text-3xl sm:text-4xl font-bold font-mono text-photon-cyan">
                  {stat.value}
                  <span className="text-quantum-violet">{stat.suffix}</span>
                </div>
                <div className="mt-2 text-xs font-mono tracking-wider uppercase text-text-muted">
                  {stat.label}
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </>
  );
}
