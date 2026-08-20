'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, GraduationCap, Atom, ArrowRight } from 'lucide-react';
import { Section, SectionHeader, GlassCard, Badge, Button } from '@/components/ui';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };

type Level = 'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

interface Article {
  title: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  readTime: string;
}

const articles: Article[] = [
  { title: 'What is Quantum Computing?', description: 'An introduction to quantum computing and how it differs from classical computing.', level: 'BEGINNER', category: 'Fundamentals', readTime: '5 min' },
  { title: 'What is a Qubit?', description: 'Understanding the quantum bit — the fundamental unit of quantum information.', level: 'BEGINNER', category: 'Fundamentals', readTime: '4 min' },
  { title: 'Superposition Explained', description: 'How quantum objects can exist in multiple states simultaneously.', level: 'BEGINNER', category: 'Fundamentals', readTime: '6 min' },
  { title: 'Quantum Entanglement', description: 'The phenomenon Einstein called "spooky action at a distance."', level: 'BEGINNER', category: 'Fundamentals', readTime: '7 min' },
  { title: 'Quantum Gates & Circuits', description: 'Building blocks of quantum algorithms — how gates manipulate qubits.', level: 'INTERMEDIATE', category: 'Computing', readTime: '10 min' },
  { title: 'Quantum Algorithms Overview', description: 'Key algorithms: Shor\'s, Grover\'s, VQE, QAOA, and their applications.', level: 'INTERMEDIATE', category: 'Computing', readTime: '12 min' },
  { title: 'Quantum Machine Learning', description: 'Where quantum computing meets AI — variational algorithms and quantum kernels.', level: 'INTERMEDIATE', category: 'AI', readTime: '10 min' },
  { title: 'Quantum Cryptography Basics', description: 'How quantum mechanics enables fundamentally new approaches to secure communication.', level: 'INTERMEDIATE', category: 'Security', readTime: '8 min' },
  { title: 'Post-Quantum Cryptography', description: 'Algorithms designed to withstand quantum attacks — lattice-based, hash-based, and code-based.', level: 'INTERMEDIATE', category: 'Security', readTime: '12 min' },
  { title: 'Quantum Error Correction', description: 'Protecting quantum information from noise through redundancy and syndrome measurements.', level: 'ADVANCED', category: 'Hardware', readTime: '15 min' },
  { title: 'Fault-Tolerant Quantum Computing', description: 'The theoretical and engineering requirements for reliable large-scale quantum computation.', level: 'ADVANCED', category: 'Hardware', readTime: '18 min' },
  { title: 'Cryogenic Engineering for Quantum', description: 'How dilution refrigerators cool quantum processors to millikelvin temperatures.', level: 'ADVANCED', category: 'Engineering', readTime: '14 min' },
  { title: 'Quantum Control & Calibration', description: 'Microwave pulse engineering, gate calibration, and system characterization.', level: 'ADVANCED', category: 'Engineering', readTime: '16 min' },
  { title: 'Quantum Information Theory', description: 'Entropy, channel capacity, and the mathematical foundations of quantum information.', level: 'ADVANCED', category: 'Theory', readTime: '20 min' },
];

const levelColors: Record<string, { badge: 'emerald' | 'cyan' | 'violet'; text: string }> = {
  BEGINNER: { badge: 'emerald', text: 'text-quantum-emerald' },
  INTERMEDIATE: { badge: 'cyan', text: 'text-photon-cyan' },
  ADVANCED: { badge: 'violet', text: 'text-quantum-violet' },
};

export default function KnowledgePage() {
  const [selectedLevel, setSelectedLevel] = useState<Level>('ALL');

  const filtered = selectedLevel === 'ALL' ? articles : articles.filter((a) => a.level === selectedLevel);

  return (
    <>
      <Section fullHeight className="pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="cyan" className="mb-6">Education</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Knowledge{' '}
            <span className="bg-gradient-to-r from-photon-cyan to-quantum-violet bg-clip-text text-transparent">
              Center
            </span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
            Educational resources spanning quantum computing fundamentals to advanced
            engineering topics. Content organized by expertise level.
          </p>
        </div>
      </Section>

      <div className="section-divider" />

      <Section>
        {/* Level filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {(['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as Level[]).map((level) => (
            <button
              key={level}
              onClick={() => setSelectedLevel(level)}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase border rounded transition-all ${
                selectedLevel === level
                  ? 'bg-photon-cyan/10 text-photon-cyan border-photon-cyan/30'
                  : 'bg-transparent text-text-muted border-white/[0.06] hover:border-white/10'
              }`}
            >
              {level}
            </button>
          ))}
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          animate="visible"
          key={selectedLevel}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-6xl mx-auto"
        >
          {filtered.map((article) => {
            const lc = levelColors[article.level];
            return (
              <motion.div key={article.title} variants={fadeIn}>
                <GlassCard hover className="p-5 h-full group cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant={lc.badge}>{article.level}</Badge>
                    <span className="text-[10px] font-mono text-text-muted">{article.category}</span>
                  </div>
                  <h3 className="text-sm font-semibold text-text-primary group-hover:text-photon-cyan transition-colors">
                    {article.title}
                  </h3>
                  <p className="mt-2 text-xs text-text-muted leading-relaxed">{article.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-text-muted">{article.readTime} read</span>
                    <ArrowRight className="w-3 h-3 text-text-muted group-hover:text-photon-cyan transition-colors" />
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>
    </>
  );
}
