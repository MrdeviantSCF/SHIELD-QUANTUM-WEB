'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Atom,
  Cpu,
  Binary,
  Layers,
  Network,
  ShieldCheck,
  Brain,
  Radio,
  ArrowRight,
  FlaskConical,
  Microscope,
  BookOpen,
  FileText,
  GraduationCap,
  Sparkles,
  Search,
  CheckCircle2,
  X,
  ExternalLink,
  ChevronRight,
  Flame,
  Zap,
} from 'lucide-react';
import { Section, SectionHeader, GlassCard, Badge, Button, StatusBadge } from '@/components/ui';
import {
  RESEARCH_DOCUMENTS,
  ResearchDocument,
  DocumentType,
  ResearchDomain,
  ContentStatus,
} from '@/data/researchKnowledgeBase';

const fadeIn = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.08 } } };

const researchDomains = [
  {
    title: 'Quantum Algorithms & Complexity',
    desc: 'Designing variational quantum algorithms (VQE, QAOA), quantum walks, phase estimation, and quantum matrix solvers (HHL) to establish provable computational speedups.',
    status: 'ACTIVE',
    icon: Binary,
    href: '/simulator',
    tags: ['VQE', 'QAOA', 'Shor & Grover', 'HHL'],
  },
  {
    title: 'Quantum Error Correction',
    desc: 'Engineering planar surface codes, subsystem codes, and stabilizer circuits to drive logical qubit error rates below the physical fault-tolerance threshold (~1%).',
    status: 'RESEARCH',
    icon: Layers,
    href: '/quantum-machines',
    tags: ['Surface Codes', 'Syndrome Extraction', 'Logical Qubits'],
  },
  {
    title: 'Superconducting QPU Fabrication',
    desc: 'Nanoscale cleanroom processing, electron-beam lithography, Dolan-bridge Josephson junction deposition, and high-coherence superconducting planar resonators.',
    status: 'RESEARCH',
    icon: Cpu,
    href: '/hardware',
    tags: ['Al/AlOx/Al Junctions', 'E-Beam Lithography', 'T1/T2 Coherence'],
  },
  {
    title: 'Quantum AI & Machine Learning',
    desc: 'Investigating parameterized quantum circuits (PQCs), quantum neural networks, quantum kernel estimation, and reinforcement learning for automated gate calibration.',
    status: 'ACTIVE',
    icon: Brain,
    href: '/ai-quantum',
    tags: ['QML', 'Quantum Kernels', 'Pulse RL'],
  },
  {
    title: 'Cryogenic Physics & Instrumentation',
    desc: 'Ultra-low temperature dilution refrigeration thermodynamics, microwave coaxial attenuation staging, and 15 millikelvin quantum thermal anchors.',
    status: 'ACTIVE',
    icon: FlaskConical,
    href: '/labs/cryogenic',
    tags: ['Dilution Stage (15 mK)', '³He/⁴He Mixing', 'Cryo-Attenuators'],
  },
  {
    title: 'Distributed Quantum Networking',
    desc: 'Entanglement swapping repeaters, dark fiber telecom transduction (1550 nm), atomic quantum memories, and satellite-to-ground downlink protocols.',
    status: 'NEW',
    icon: Network,
    href: '/network',
    tags: ['Quantum Repeaters', 'Entanglement Swapping', 'Dark Fiber'],
  },
  {
    title: 'Post-Quantum & Quantum Cybersecurity',
    desc: 'Transitioning infrastructure to NIST-standardized lattice-based cryptography (ML-KEM, ML-DSA) and developing physics-guaranteed Quantum Key Distribution (QKD).',
    status: 'ACTIVE',
    icon: ShieldCheck,
    href: '/security',
    tags: ['ML-KEM (Kyber)', 'ML-DSA (Dilithium)', 'BB84 Protocol'],
  },
  {
    title: 'Quantum Photonics & Optical Interconnects',
    desc: 'Deterministic single-photon sources, low-loss silicon nitride waveguides, fast beam splitters, and superconducting nanowire single-photon detectors (SNSPDs).',
    status: 'NEW',
    icon: Radio,
    href: '/labs/photonics',
    tags: ['SNSPDs', 'Integrated Photonics', 'Single Photon Sources'],
  },
  {
    title: 'Quantum Sensing & Precision Metrology',
    desc: 'High-sensitivity diamond NV-center magnetometry, atomic clock gravimetry, and quantum-enhanced sensing surpassing the standard quantum limit.',
    status: 'CONCEPT',
    icon: Microscope,
    href: '/knowledge',
    tags: ['NV Centers', 'Magnetometry', 'Standard Quantum Limit'],
  },
];

export default function ResearchPage() {
  const [selectedType, setSelectedType] = useState<string>('ALL');
  const [selectedDomain, setSelectedDomain] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDoc, setActiveDoc] = useState<ResearchDocument | null>(null);

  // Filtered documents
  const filteredDocs = useMemo(() => {
    return RESEARCH_DOCUMENTS.filter((doc) => {
      const matchType = selectedType === 'ALL' || doc.type === selectedType;
      const matchDomain = selectedDomain === 'ALL' || doc.domain === selectedDomain;
      const matchSearch =
        searchQuery === '' ||
        doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
        doc.author.toLowerCase().includes(searchQuery.toLowerCase());
      return matchType && matchDomain && matchSearch;
    });
  }, [selectedType, selectedDomain, searchQuery]);

  return (
    <>
      {/* ── Section 1: Hero ── */}
      <Section fullHeight className="pt-24 pb-12">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#00d4ff]/10 border border-[#00d4ff]/30 text-xs font-mono text-[#00d4ff]">
            <Atom className="w-4 h-4 animate-spin text-[#00d4ff]" style={{ animationDuration: '10s' }} />
            <span>SHIELD QUANTUM MACHINE AND TECHNOLOGY</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#e2e8f0]">
            Quantum Research &amp;{' '}
            <span className="bg-gradient-to-r from-[#00d4ff] via-[#d367c4] to-[#7c3aed] bg-clip-text text-transparent">
              Academic Monograph Portal
            </span>
          </h1>

          <p className="text-base sm:text-lg text-[#94a3b8] max-w-3xl mx-auto leading-relaxed">
            Exploring the frontiers of quantum information science: superconducting transmon physics, fault-tolerant topological surface codes, cryogenic thermodynamics, quantum machine learning, and post-quantum cybersecurity.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <a
              href="#papers"
              className="px-5 py-2.5 rounded-xl bg-[#00d4ff]/15 hover:bg-[#00d4ff]/25 text-[#00d4ff] border border-[#00d4ff]/40 text-xs font-mono font-semibold transition-all flex items-center gap-2"
            >
              <FileText className="w-4 h-4" />
              <span>Browse Research Papers ({RESEARCH_DOCUMENTS.length})</span>
            </a>
            <Link
              href="/simulator"
              className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-[#dadce0] border border-white/10 text-xs font-mono transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-[#00d4ff]" />
              <span>Launch Simulator</span>
            </Link>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── Section 2: Research Papers & Monograph Repository ── */}
      <Section id="papers" className="py-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#7c3aed]/10 border border-[#7c3aed]/30 text-xs font-mono text-[#7c3aed] mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>KNOWLEDGE REPOSITORY</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-[#e2e8f0]">Research Papers, Thesis &amp; Technical Reports</h2>
              <p className="text-sm text-[#94a3b8] mt-1">
                Peer-level theoretical derivations, mathematical models, experimental protocols, and technical reports.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <Search className="w-4 h-4 text-[#7B7672] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search papers, formulas, tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 rounded-xl bg-black/40 border border-white/10 text-xs font-mono text-[#e2e8f0] placeholder-[#7B7672] focus:outline-none focus:border-[#00d4ff]/50 transition-colors"
              />
            </div>
          </div>

          {/* Type Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: 'ALL', label: 'All Documents' },
              { id: 'THESIS', label: 'Thesis & Academic Work' },
              { id: 'PAPER', label: 'Research Papers' },
              { id: 'TECHNICAL_REPORT', label: 'Technical Reports' },
              { id: 'STUDY_GUIDE', label: 'Study Guides' },
              { id: 'RESEARCH_NOTE', label: 'Research Notes' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedType(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all ${
                  selectedType === tab.id
                    ? 'bg-[#00d4ff]/20 text-[#00d4ff] border border-[#00d4ff]/40 shadow-[0_0_12px_rgba(0,212,255,0.2)]'
                    : 'bg-white/[0.03] text-[#7B7672] hover:text-[#e2e8f0] border border-white/[0.06]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Document Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDocs.map((doc) => (
              <GlassCard
                key={doc.id}
                hover
                onClick={() => setActiveDoc(doc)}
                className="p-6 cursor-pointer border-white/[0.08] hover:border-[#00d4ff]/40 transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[10px] font-mono text-[#00d4ff]">
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

                  {doc.equations && doc.equations.length > 0 && (
                    <div className="p-2.5 rounded-lg bg-black/50 border border-white/5 font-mono text-xs text-[#00d4ff]/90 overflow-x-auto">
                      <span className="text-[10px] text-[#7B7672] block mb-1">{doc.equations[0].label}:</span>
                      <code>{doc.equations[0].latex}</code>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-white/5 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {doc.tags.slice(0, 3).map((tag) => (
                      <span key={tag} className="text-[10px] font-mono text-[#7B7672] bg-white/[0.02] px-2 py-0.5 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex items-center justify-between text-xs text-[#7B7672] font-mono pt-1">
                    <span>{doc.author.split('—')[0]}</span>
                    <span className="text-[#00d4ff] flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Read Document</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>

          {filteredDocs.length === 0 && (
            <div className="text-center py-12 border border-dashed border-white/10 rounded-2xl">
              <p className="text-sm font-mono text-[#7B7672]">No research documents match the selected filters.</p>
            </div>
          )}
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── Section 3: Strategic Research Programs (9 Pillars) ── */}
      <Section className="py-16">
        <div className="max-w-7xl mx-auto space-y-8">
          <SectionHeader
            label="STRATEGIC INITIATIVES"
            title="Core Quantum Research Programs"
            description="Nine pillars of multidisciplinary scientific investigation uniting theoretical quantum physics, advanced semiconductor materials, cryogenic engineering, and cyber defense."
          />

          <motion.div variants={stagger} initial="hidden" animate="visible" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {researchDomains.map((domain) => {
              const Icon = domain.icon;
              return (
                <motion.div key={domain.title} variants={fadeIn}>
                  <GlassCard hover className="p-6 h-full flex flex-col justify-between space-y-4 border-white/[0.08] hover:border-[#00d4ff]/30">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center text-[#00d4ff]">
                          <Icon className="w-5 h-5" />
                        </div>
                        <StatusBadge status={domain.status as 'ACTIVE' | 'RESEARCH' | 'NEW' | 'CONCEPT'} />
                      </div>

                      <h3 className="text-base font-bold text-[#e2e8f0]">{domain.title}</h3>
                      <p className="text-xs text-[#94a3b8] leading-relaxed">{domain.desc}</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {domain.tags.map((tag) => (
                          <span key={tag} className="text-[10px] font-mono text-[#7B7672] bg-white/[0.02] px-2 py-0.5 rounded">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <Link href={domain.href} className="text-xs font-mono text-[#00d4ff] hover:text-[#e2e8f0] flex items-center gap-1.5">
                        <span>Explore Program</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </Section>

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
              {/* Modal Header */}
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

              {/* Executive Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-[#00d4ff] uppercase tracking-wider">Executive Summary</h4>
                <p className="text-xs sm:text-sm text-[#dadce0] leading-relaxed bg-black/30 p-4 rounded-xl border border-white/5">
                  {activeDoc.summary}
                </p>
              </div>

              {/* Key Findings */}
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

              {/* Mathematical Formulas */}
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

              {/* Chapters if available */}
              {activeDoc.chapters && activeDoc.chapters.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-mono text-[#7c3aed] uppercase tracking-wider">Monograph Chapters &amp; Structure</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {activeDoc.chapters.map((ch, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
                        <span className="text-[10px] font-mono text-[#7c3aed] font-bold">{ch.number}</span>
                        <h5 className="text-xs font-bold text-[#e2e8f0]">{ch.title}</h5>
                        <p className="text-[11px] text-[#94a3b8] leading-snug">{ch.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Full Text Preview */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono text-[#94a3b8] uppercase tracking-wider">Full Research Text</h4>
                <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-sans text-xs text-[#94a3b8] leading-relaxed space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
                  <div className="whitespace-pre-line">{activeDoc.fullText}</div>
                </div>
              </div>

              {/* Modal Footer */}
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
