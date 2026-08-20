'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  BookOpen,
  GraduationCap,
  Atom,
  ArrowRight,
  Search,
  Layers,
  FileText,
  Sliders,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronRight,
  Zap,
  Info,
  Maximize2,
  Cpu,
  Radio,
  FlaskConical,
} from 'lucide-react';
import { Section, SectionHeader, GlassCard, Badge, Button, StatusBadge } from '@/components/ui';
import {
  RESEARCH_DOCUMENTS,
  SCIENTIFIC_DIAGRAMS,
  ResearchDocument,
  ScientificDiagram,
  ResearchDomain,
  DocumentType,
} from '@/data/researchKnowledgeBase';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.05 } } };

type Level = 'ALL' | 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';

interface StudyTrackArticle {
  title: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  readTime: string;
  equations?: string;
  href: string;
}

const studyArticles: StudyTrackArticle[] = [
  {
    title: 'What is Quantum Computing?',
    description: 'An introduction to quantum computational complexity, superposition, and quantum state spaces vs. classical bits.',
    level: 'BEGINNER',
    category: 'Fundamentals',
    readTime: '5 min',
    equations: '|ψ⟩ = α|0⟩ + β|1⟩, |α|² + |β|² = 1',
    href: '/quantum-machines',
  },
  {
    title: 'What is a Qubit?',
    description: 'Understanding physical quantum two-level systems, Hilbert space ℂ², and Bloch sphere geometric representation.',
    level: 'BEGINNER',
    category: 'Fundamentals',
    readTime: '4 min',
    equations: '|ψ⟩ = cos(θ/2)|0⟩ + e^{iφ}sin(θ/2)|1⟩',
    href: '/simulator',
  },
  {
    title: 'Quantum Superposition & Wave Functions',
    description: 'How quantum objects exist in linear combinations of orthogonal basis states until measurement collapse.',
    level: 'BEGINNER',
    category: 'Fundamentals',
    readTime: '6 min',
    equations: 'P(i) = |⟨i|ψ⟩|²',
    href: '/simulator',
  },
  {
    title: 'Quantum Entanglement & Non-Locality',
    description: 'The Einstein-Podolsky-Rosen paradox, Bell state generation, and violation of local realism via Bell inequalities.',
    level: 'BEGINNER',
    category: 'Fundamentals',
    readTime: '7 min',
    equations: '|Φ⁺⟩ = (|00⟩ + |11⟩)/√2',
    href: '/quantum-machines',
  },
  {
    title: 'Universal Quantum Gates & Unitary Matrices',
    description: 'Single-qubit Pauli rotations (X, Y, Z, H, S, T) and multi-qubit entangling operations (CNOT, CZ, SWAP, Toffoli).',
    level: 'INTERMEDIATE',
    category: 'Computing',
    readTime: '10 min',
    equations: 'U†U = I,  H = (X + Z)/√2',
    href: '/simulator',
  },
  {
    title: 'Quantum Algorithms: Shor, Grover, VQE & QAOA',
    description: 'Algorithmic speedups: polynomial period-finding, O(√N) database search, and hybrid variational eigensolvers.',
    level: 'INTERMEDIATE',
    category: 'Computing',
    readTime: '12 min',
    equations: '⟨H⟩_θ = ⟨0|U†(θ) H U(θ)|0⟩',
    href: '/simulator',
  },
  {
    title: 'Quantum Machine Learning & Parameterized Circuits',
    description: 'Variational quantum classifiers, Hilbert space kernel methods, and analytical gradient calculation via Parameter-Shift Rules.',
    level: 'INTERMEDIATE',
    category: 'AI & ML',
    readTime: '10 min',
    equations: '∂⟨H⟩/∂θ = ½ [⟨H⟩_{θ+π/2} - ⟨H⟩_{θ-π/2}]',
    href: '/ai-quantum',
  },
  {
    title: 'Quantum Cryptography & BB84 QKD Protocol',
    description: 'Physics-based information security using conjugate photon polarization bases and eavesdropping detection via QBER.',
    level: 'INTERMEDIATE',
    category: 'Security',
    readTime: '8 min',
    equations: 'QBER = N_{error} / N_{sifted} < 11%',
    href: '/cryptography',
  },
  {
    title: 'Post-Quantum Cryptography (NIST Standards)',
    description: 'Quantum-resistant algorithms: Module-LWE based ML-KEM (Kyber) and ML-DSA (Dilithium) to mitigate Harvest Now Decrypt Later.',
    level: 'INTERMEDIATE',
    category: 'Security',
    readTime: '12 min',
    equations: 'b = A s + e (mod q)',
    href: '/security',
  },
  {
    title: 'Topological Surface Codes & Quantum Error Correction',
    description: 'Planar rotated surface codes, stabilizer measurements (star and plaquette operators), and real-time syndrome graph decoding.',
    level: 'ADVANCED',
    category: 'Hardware',
    readTime: '15 min',
    equations: 'A_s = ∏ X_i,  B_p = ∏ Z_j',
    href: '/quantum-machines',
  },
  {
    title: 'Superconducting Transmon Physics & cQED',
    description: 'Josephson junction non-linear inductance, EJ/EC energy ratios, anharmonicity, and dispersive readout in microwave resonators.',
    level: 'ADVANCED',
    category: 'Hardware',
    readTime: '18 min',
    equations: 'H = 4E_C(n - n_g)² - E_J cos(φ)',
    href: '/hardware',
  },
  {
    title: 'Dilution Refrigeration & Millikelvin Cryogenics',
    description: 'Thermodynamics of ³He/⁴He mixture phase separation, multi-stage radiation shielding, and thermal anchoring from 300 K to 15 mK.',
    level: 'ADVANCED',
    category: 'Engineering',
    readTime: '14 min',
    equations: 'Q̇ = 84 ṅ_3 T_{MC}²',
    href: '/labs/cryogenic',
  },
  {
    title: 'AWG Microwave Control & DRAG Pulse Engineering',
    description: 'High-speed 5–7 GHz pulse synthesis, IQ modulation calibration, and Derivative Removal by Adiabatic Gate to eliminate leakage.',
    level: 'ADVANCED',
    category: 'Engineering',
    readTime: '16 min',
    equations: 'Ω_y(t) = -dΩ_x/dt / α',
    href: '/hardware',
  },
  {
    title: 'Quantum Information Theory & Channel Capacity',
    description: 'Von Neumann entropy S(ρ) = -Tr(ρ log₂ ρ), quantum discord, and quantum channel fidelity benchmarks.',
    level: 'ADVANCED',
    category: 'Theory',
    readTime: '20 min',
    equations: 'S(ρ) = -∑ λ_i log₂ λ_i',
    href: '/knowledge',
  },
];

const levelColors: Record<string, { badge: 'emerald' | 'cyan' | 'violet'; text: string }> = {
  BEGINNER: { badge: 'emerald', text: 'text-emerald-400' },
  INTERMEDIATE: { badge: 'cyan', text: 'text-[#00d4ff]' },
  ADVANCED: { badge: 'violet', text: 'text-[#d367c4]' },
};

export default function KnowledgePage() {
  const [activeTab, setActiveTab] = useState<'STUDY' | 'DIAGRAMS' | 'PAPERS'>('STUDY');
  const [selectedLevel, setSelectedLevel] = useState<Level>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDiagram, setActiveDiagram] = useState<ScientificDiagram | null>(null);
  const [activeDoc, setActiveDoc] = useState<ResearchDocument | null>(null);

  // Filtered study articles
  const filteredArticles = useMemo(() => {
    return studyArticles.filter((article) => {
      const matchLevel = selectedLevel === 'ALL' || article.level === selectedLevel;
      const matchSearch =
        searchQuery === '' ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.category.toLowerCase().includes(searchQuery.toLowerCase());
      return matchLevel && matchSearch;
    });
  }, [selectedLevel, searchQuery]);

  // Filtered diagrams
  const filteredDiagrams = useMemo(() => {
    return SCIENTIFIC_DIAGRAMS.filter((diag) => {
      return (
        searchQuery === '' ||
        diag.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        diag.domain.toLowerCase().includes(searchQuery.toLowerCase()) ||
        diag.caption.toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  }, [searchQuery]);

  return (
    <>
      {/* ── Section 1: Hero ── */}
      <Section fullHeight className="pt-24 pb-12">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-xs font-mono text-[#00d4ff]">
            <BookOpen className="w-4 h-4 text-[#00d4ff]" />
            <span>SHIELD QUANTUM KNOWLEDGE &amp; EDUCATION PLATFORM</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#e2e8f0]">
            Quantum Knowledge{' '}
            <span className="bg-gradient-to-r from-[#00d4ff] via-[#d367c4] to-[#7c3aed] bg-clip-text text-transparent">
              &amp; Research Library
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#94a3b8] max-w-3xl mx-auto leading-relaxed">
            A comprehensive, scientifically structured repository of quantum technology research, educational study modules, technical hardware schematics, and academic monographs.
          </p>

          {/* Top Search Bar */}
          <div className="max-w-xl mx-auto relative pt-2">
            <Search className="w-4 h-4 text-[#7B7672] absolute left-4 top-1/2 -translate-y-1/2 mt-1" />
            <input
              type="text"
              placeholder="Search concepts, formulas, cryogenics, algorithms, PQC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-black/40 border border-white/10 text-xs sm:text-sm font-mono text-[#e2e8f0] placeholder-[#7B7672] focus:outline-none focus:border-[#00d4ff]/50 transition-colors shadow-xl"
            />
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── Section 2: Main Knowledge Navigation ── */}
      <Section className="py-12">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Main View Tabs */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setActiveTab('STUDY')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'STUDY'
                    ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/40 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                    : 'text-[#94a3b8] hover:text-[#e2e8f0] bg-white/[0.02]'
                }`}
              >
                <GraduationCap className="w-4 h-4" />
                <span>Study Tracks &amp; Modules ({studyArticles.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('DIAGRAMS')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'DIAGRAMS'
                    ? 'bg-[#d367c4]/20 text-[#d367c4] border border-[#d367c4]/40 shadow-[0_0_12px_rgba(211,103,196,0.2)]'
                    : 'text-[#94a3b8] hover:text-[#e2e8f0] bg-white/[0.02]'
                }`}
              >
                <Layers className="w-4 h-4" />
                <span>Technical Schematics &amp; Media ({SCIENTIFIC_DIAGRAMS.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('PAPERS')}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all flex items-center gap-2 ${
                  activeTab === 'PAPERS'
                    ? 'bg-[#7c3aed]/20 text-[#7c3aed] border border-[#7c3aed]/40 shadow-[0_0_12px_rgba(124,58,237,0.2)]'
                    : 'text-[#94a3b8] hover:text-[#e2e8f0] bg-white/[0.02]'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Academic Monograph Repository ({RESEARCH_DOCUMENTS.length})</span>
              </button>
            </div>

            {/* Level Filter (Active on Study Tab) */}
            {activeTab === 'STUDY' && (
              <div className="flex flex-wrap items-center gap-1.5">
                {(['ALL', 'BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as Level[]).map((lvl) => (
                  <button
                    key={lvl}
                    onClick={() => setSelectedLevel(lvl)}
                    className={`px-3 py-1 text-[11px] font-mono rounded-lg transition-all ${
                      selectedLevel === lvl
                        ? 'bg-white/15 text-[#e2e8f0] border border-white/20'
                        : 'text-[#7B7672] hover:text-[#e2e8f0] bg-white/[0.02]'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── TAB 1: STUDY MODULES ── */}
          {activeTab === 'STUDY' && (
            <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((art) => {
                const lc = levelColors[art.level];
                return (
                  <motion.div key={art.title} variants={fadeIn}>
                    <GlassCard hover className="p-6 h-full flex flex-col justify-between space-y-4 border-white/[0.08] hover:border-[#00d4ff]/30">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between gap-2">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-white/5 border border-white/10 ${lc.text}`}>
                            {art.level}
                          </span>
                          <span className="text-[11px] font-mono text-[#7B7672]">{art.readTime} read</span>
                        </div>

                        <h3 className="text-base font-bold text-[#e2e8f0] leading-snug">{art.title}</h3>
                        <p className="text-xs text-[#94a3b8] leading-relaxed">{art.description}</p>

                        {art.equations && (
                          <div className="p-2.5 rounded-lg bg-black/50 border border-white/5 font-mono text-xs text-[#00d4ff] overflow-x-auto">
                            <code>{art.equations}</code>
                          </div>
                        )}
                      </div>

                      <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                        <span className="text-[11px] font-mono text-[#7B7672]">{art.category}</span>
                        <Link href={art.href} className="text-xs font-mono text-[#00d4ff] hover:text-[#e2e8f0] flex items-center gap-1">
                          <span>Explore Track</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </GlassCard>
                  </motion.div>
                );
              })}
            </motion.div>
          )}

          {/* ── TAB 2: TECHNICAL SCHEMATICS & DIAGRAMS ── */}
          {activeTab === 'DIAGRAMS' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {filteredDiagrams.map((diag) => (
                <GlassCard
                  key={diag.id}
                  hover
                  onClick={() => setActiveDiagram(diag)}
                  className="p-6 border-white/[0.08] hover:border-[#d367c4]/40 cursor-pointer space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black/60 group">
                      <Image
                        src={diag.imageUrl}
                        alt={diag.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#00d4ff]">
                          {diag.status}
                        </span>
                        <span className="p-1.5 rounded-lg bg-black/70 backdrop-blur-md text-[#dadce0] group-hover:text-[#00d4ff]">
                          <Maximize2 className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono text-[#d367c4]">{diag.domain}</span>
                      </div>
                      <h3 className="text-base font-bold text-[#e2e8f0]">{diag.title}</h3>
                      <p className="text-xs text-[#94a3b8] leading-relaxed line-clamp-2">{diag.description}</p>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/5 space-y-2">
                    <div className="flex flex-wrap gap-1.5">
                      {diag.keyFeatures.slice(0, 2).map((feat, idx) => (
                        <div key={idx} className="text-[11px] text-[#7B7672] flex items-center gap-1.5 w-full truncate">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10b981] shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-[#00d4ff] pt-1">
                      <span>View Technical Specs</span>
                      <ArrowRight className="w-3 h-3" />
                    </div>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}

          {/* ── TAB 3: ACADEMIC MONOGRAPHS ── */}
          {activeTab === 'PAPERS' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {RESEARCH_DOCUMENTS.map((doc) => (
                <GlassCard
                  key={doc.id}
                  hover
                  onClick={() => setActiveDoc(doc)}
                  className="p-6 cursor-pointer border-white/[0.08] hover:border-[#7c3aed]/40 transition-all space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#7c3aed]">
                        {doc.type.replace('_', ' ')}
                      </span>
                      <span className="px-2 py-0.5 rounded bg-[#10b981]/10 border border-[#10b981]/30 text-[10px] font-mono text-[#10b981]">
                        {doc.status}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-[#e2e8f0] hover:text-[#00d4ff] transition-colors leading-snug">
                      {doc.title}
                    </h3>

                    <p className="text-xs text-[#94a3b8] leading-relaxed line-clamp-3">
                      {doc.summary}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-[#7B7672] font-mono">
                    <span>{doc.author.split('—')[0]}</span>
                    <span className="text-[#00d4ff] flex items-center gap-1">
                      <span>Read Monograph</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </GlassCard>
              ))}
            </div>
          )}
        </div>
      </Section>

      {/* ── Diagram Lightbox Modal ── */}
      <AnimatePresence>
        {activeDiagram && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#18191b] border border-[#d367c4]/30 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 custom-scrollbar"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div className="space-y-1">
                  <span className="px-2 py-0.5 rounded bg-[#d367c4]/15 border border-[#d367c4]/30 text-[10px] font-mono text-[#d367c4]">
                    {activeDiagram.status}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e2e8f0]">{activeDiagram.title}</h2>
                  <p className="text-xs font-mono text-[#7B7672]">{activeDiagram.caption}</p>
                </div>
                <button
                  onClick={() => setActiveDiagram(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#dadce0] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 bg-black">
                <Image
                  src={activeDiagram.imageUrl}
                  alt={activeDiagram.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono text-[#00d4ff] uppercase tracking-wider">Technical Description</h4>
                <p className="text-xs sm:text-sm text-[#dadce0] leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
                  {activeDiagram.description}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono text-[#10b981] uppercase tracking-wider">Subsystem Specifications</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {activeDiagram.keyFeatures.map((feat, idx) => (
                    <div key={idx} className="p-3 rounded-lg bg-white/[0.02] border border-white/5 text-xs text-[#94a3b8] flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                      <span className="leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <Link
                  href="/labs/cryogenic"
                  className="px-4 py-2 rounded-xl bg-[#00d4ff]/15 hover:bg-[#00d4ff]/25 text-[#00d4ff] border border-[#00d4ff]/30 text-xs font-mono transition-colors"
                >
                  Explore Cryogenic Laboratory
                </Link>
                <button
                  onClick={() => setActiveDiagram(null)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#dadce0] text-xs font-mono transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Document Reader Modal ── */}
      <AnimatePresence>
        {activeDoc && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#18191b] border border-[#00d4ff]/30 rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 custom-scrollbar"
            >
              <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-4">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-[#00d4ff]/15 border border-[#00d4ff]/30 text-[11px] font-mono text-[#00d4ff]">
                      {activeDoc.type.replace('_', ' ')}
                    </span>
                    <span className="px-2 py-0.5 rounded bg-[#10b981]/15 border border-[#10b981]/30 text-[11px] font-mono text-[#10b981]">
                      {activeDoc.status}
                    </span>
                    <span className="text-xs font-mono text-[#7B7672]">{activeDoc.date} • {activeDoc.version}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-bold text-[#e2e8f0]">{activeDoc.title}</h2>
                  <p className="text-xs font-mono text-[#94a3b8]">Author: {activeDoc.author}</p>
                </div>
                <button
                  onClick={() => setActiveDoc(null)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-[#dadce0] transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono text-[#00d4ff] uppercase tracking-wider">Executive Summary</h4>
                <p className="text-xs sm:text-sm text-[#dadce0] leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
                  {activeDoc.summary}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-mono text-[#10b981] uppercase tracking-wider">Key Research Findings &amp; Metrics</h4>
                <ul className="space-y-2">
                  {activeDoc.keyFindings.map((finding, idx) => (
                    <li key={idx} className="text-xs text-[#94a3b8] flex items-start gap-2 bg-white/[0.02] p-3 rounded-lg border border-white/[0.04]">
                      <CheckCircle2 className="w-4 h-4 text-[#10b981] shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{finding}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {activeDoc.equations && activeDoc.equations.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs font-mono text-[#d367c4] uppercase tracking-wider">Mathematical Formulations &amp; Derivations</h4>
                  <div className="space-y-2.5">
                    {activeDoc.equations.map((eq, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-1.5">
                        <span className="text-xs font-mono text-[#e2e8f0] font-semibold">{eq.label}</span>
                        <div className="p-2.5 rounded bg-black/60 border border-white/5 font-mono text-xs sm:text-sm text-[#00d4ff] overflow-x-auto">
                          <code>{eq.latex}</code>
                        </div>
                        <p className="text-[11px] text-[#7B7672] leading-relaxed">{eq.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center gap-2">
                  <span className="text-[#7B7672]">Domain:</span>
                  <span className="text-[#00d4ff]">{activeDoc.domain}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Link
                    href="/simulator"
                    className="px-4 py-2 rounded-xl bg-[#00d4ff]/15 hover:bg-[#00d4ff]/25 text-[#00d4ff] border border-[#00d4ff]/30 transition-colors"
                  >
                    Simulate in Quantum Engine
                  </Link>
                  <button
                    onClick={() => setActiveDoc(null)}
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
    </>
  );
}
