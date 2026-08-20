"use client";

import React from "react";
import Image from "next/image";
import {
  ShieldCheck,
  Search,
  Cpu,
  Atom,
  Binary,
  Brain,
  Lock,
  Sparkles,
  BookOpen,
  ArrowUpRight,
  Lightbulb,
} from "lucide-react";

interface FocusArea {
  title: string;
  category: string;
  description: string;
  icon: React.ReactNode;
  tags: string[];
}

const focusAreas: FocusArea[] = [
  {
    title: "Cyber Security",
    category: "Foundation & Professional Discipline",
    description:
      "Extensive background in enterprise security posture, threat modeling, systems resilience, and proactive defense architectures designed to safeguard mission-critical systems against sophisticated cyber threats.",
    icon: <ShieldCheck className="w-5 h-5 text-[#D367C4]" />,
    tags: ["Threat Modeling", "Systems Defense", "Security Posture"],
  },
  {
    title: "Digital Forensics",
    category: "Specialized Investigation",
    description:
      "Expertise in digital evidence acquisition, deep forensic artifact analysis, reverse analysis of breach vectors, and systemic integrity verification across complex networked environments.",
    icon: <Search className="w-5 h-5 text-[#D367C4]" />,
    tags: ["Evidence Analysis", "Incident Investigation", "System Integrity"],
  },
  {
    title: "Quantum Computing",
    category: "Research & Advanced Study",
    description:
      "Dedicated exploration of quantum computational principles, superposition, entanglement, circuit design, and quantum algorithmic logic operating beyond classical bounds.",
    icon: <Atom className="w-5 h-5 text-[#D367C4]" />,
    tags: ["Quantum Circuits", "Superposition", "Algorithmic Logic"],
  },
  {
    title: "Quantum Machine Technology",
    category: "Hardware & Machine Research",
    description:
      "Research focus into the physical implementation of quantum machines, superconducting qubit architectures, cryogenic control systems, and precision hardware orchestration.",
    icon: <Cpu className="w-5 h-5 text-[#D367C4]" />,
    tags: ["Cryogenic Systems", "Processor Architecture", "Machine Engineering"],
  },
  {
    title: "Quantum Technology Research",
    category: "Active Inquiry & Literature Synthesis",
    description:
      "Continuous exploration and academic inquiry into quantum error correction benchmarks, topological models, quantum simulation methodologies, and next-generation device physics.",
    icon: <BookOpen className="w-5 h-5 text-[#D367C4]" />,
    tags: ["Error Correction", "Continuous Inquiry", "Quantum Benchmarking"],
  },
  {
    title: "Quantum AI",
    category: "Intelligent Synthesis",
    description:
      "Investigating the convergence of artificial intelligence and quantum computing, including parameterized quantum circuits, quantum machine learning (QML), and quantum tensor networks.",
    icon: <Brain className="w-5 h-5 text-[#D367C4]" />,
    tags: ["Quantum ML", "Hybrid Networks", "Tensor Optimization"],
  },
  {
    title: "Quantum Cybersecurity",
    category: "Frontier Defense & Post-Quantum",
    description:
      "Pioneering research into post-quantum cryptography (PQC), lattice-based encryption algorithms, quantum key distribution (QKD) principles, and preparing classical defense architectures for the post-RSA era.",
    icon: <Lock className="w-5 h-5 text-[#D367C4]" />,
    tags: ["Post-Quantum Cryptography", "QKD", "Lattice Encryption"],
  },
  {
    title: "Advanced Computing",
    category: "Next-Generation Architectures",
    description:
      "Pursuing high-performance computing (HPC) models, distributed hybrid quantum-classical co-processing, and scalable computational fabrics designed for intractable real-world problem sets.",
    icon: <Binary className="w-5 h-5 text-[#D367C4]" />,
    tags: ["Hybrid Computing", "HPC Integration", "Co-Processing"],
  },
];

export function FounderSection() {
  return (
    <section
      id="founder"
      className="w-full bg-[#202124] text-[#F9F7EF] py-20 sm:py-32 px-4 sm:px-8 lg:px-12 border-t border-[#3c4043]/30 relative overflow-hidden"
    >
      {/* Ambient background glow accents */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#D367C4]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-[400px] h-[400px] bg-[#D367C4]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1296px] mx-auto relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#7B7672] block mb-3 font-medium">
            Leadership &amp; Vision
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal uppercase tracking-tight text-[#F9F7EF] mb-4">
            Founder &amp; Director
          </h2>
          <p className="text-sm sm:text-base text-[#dadce0] leading-relaxed">
            Guiding SHIELD QUANTUM MACHINE AND TECHNOLOGY with deep roots in cybersecurity and digital forensics, driven by an active research frontier in quantum machines, quantum AI, and advanced computing paradigms.
          </p>
        </div>

        {/* Founder Hero Card */}
        <div className="bg-[#292a2d]/70 border border-[#3c4043] rounded-3xl p-6 sm:p-10 lg:p-12 mb-16 backdrop-blur-md shadow-2xl relative overflow-hidden">
          {/* Subtle gradient line accent */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#D367C4] to-transparent opacity-80" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left: Founder Official Portrait */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-start text-center lg:text-left">
              {/* Photo Frame with subtle futuristic quantum glow */}
              <div className="relative w-64 sm:w-72 lg:w-80 aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#D367C4]/40 hover:border-[#D367C4] transition-all duration-500 shadow-[0_0_30px_rgba(211,103,196,0.2)] bg-[#202124] group mb-6 shrink-0">
                <Image
                  src="/images/dipak-s-dahifale.jpg"
                  alt="Dipak S. Dahifale — Founder & Director, SHIELD QUANTUM MACHINE AND TECHNOLOGY"
                  fill
                  priority
                  sizes="(max-width: 640px) 256px, (max-width: 1024px) 288px, 320px"
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
                />
                {/* Subtle gradient scrim at bottom */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#202124]/70 via-transparent to-transparent opacity-60 pointer-events-none" />

                {/* Quantum border highlight */}
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-md bg-[#202124]/80 backdrop-blur-md border border-[#D367C4]/50 text-[10px] font-mono text-[#D367C4] uppercase tracking-wider">
                  SHIELD Official
                </div>
              </div>

              {/* Status / Role Tag */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#D367C4]/10 border border-[#D367C4]/30 text-xs font-mono text-[#D367C4] mb-3">
                <span className="w-2 h-2 rounded-full bg-[#D367C4] animate-pulse" />
                <span>Founder &amp; Director</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-medium text-[#F9F7EF] tracking-tight mb-1.5">
                Dipak S. Dahifale
              </h3>

              <div className="text-xs sm:text-sm font-mono text-[#D367C4] uppercase tracking-wider leading-snug mb-2">
                Cyber Security Expert &amp; Digital Forensic Investigator
              </div>

              <div className="inline-block text-[11px] font-mono text-[#7B7672] uppercase tracking-widest border-t border-[#3c4043]/60 pt-2 w-full">
                Quantum Technology Research &amp; Development Focus
              </div>
            </div>

            {/* Right: Executive Summary & Technical Vision */}
            <div className="lg:col-span-7 flex flex-col justify-center border-t lg:border-t-0 lg:border-l border-[#3c4043]/60 pt-6 lg:pt-0 lg:pl-10">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D367C4] mb-2 font-medium">
                Executive Leadership
              </span>

              <h4 className="text-xl sm:text-2xl font-normal text-[#F9F7EF] mb-4 leading-snug">
                Bridging Critical Systems Defense with Quantum Computing Horizons
              </h4>

              <div className="space-y-4 text-sm sm:text-base text-[#dadce0] font-light leading-relaxed">
                <p>
                  As the Founder &amp; Director of SHIELD QUANTUM MACHINE AND TECHNOLOGY, Dipak S. Dahifale combines established professional expertise in cybersecurity defense and digital forensics with an active research trajectory into quantum computing paradigms.
                </p>
                <p>
                  His research and development focus is anchored at the strategic crossroads where cybersecurity, artificial intelligence, quantum computing, quantum machine systems, and advanced computing technologies converge—building the foundation for resilient, verifiable, and next-generation computational architectures.
                </p>
              </div>

              {/* Core Skill Pills */}
              <div className="flex flex-wrap gap-2 mt-8">
                {[
                  "Cyber Security",
                  "Digital Forensics",
                  "Quantum Computing",
                  "Quantum Machine Technology",
                  "Quantum Technology Research",
                  "Quantum AI",
                  "Quantum Cybersecurity",
                  "Advanced Computing",
                ].map((item, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#202124] border border-[#3c4043] rounded-md text-xs font-mono text-[#dadce0] hover:border-[#D367C4] hover:text-[#F9F7EF] transition-colors"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Dedicated Subsection: Education & Quantum Technology Focus */}
        <div className="mt-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#D367C4] mb-2 font-medium">
                <Sparkles className="w-4 h-4" />
                <span>Academic Foundations &amp; Research Trajectory</span>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal uppercase text-[#F9F7EF] tracking-tight">
                Education &amp; Quantum Technology Focus
              </h3>
            </div>

            <p className="text-xs sm:text-sm text-[#7B7672] max-w-md">
              Focused on advanced knowledge acquisition, applied research, and technology development at the frontier of post-classical computation.
            </p>
          </div>

          {/* Research & Education Focus Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {focusAreas.map((area, idx) => (
              <div
                key={idx}
                className="group flex flex-col bg-[#292a2d]/40 border border-[#3c4043] hover:border-[#7B7672] hover:bg-[#292a2d] rounded-2xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-[#D367C4]/5"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[#202124] border border-[#3c4043] flex items-center justify-center group-hover:border-[#D367C4] group-hover:scale-105 transition-all">
                    {area.icon}
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-[#7B7672]">
                    0{idx + 1}
                  </span>
                </div>

                <span className="text-[11px] font-mono uppercase tracking-wider text-[#D367C4] mb-1">
                  {area.category}
                </span>

                <h4 className="text-base sm:text-lg font-medium text-[#F9F7EF] mb-2.5 group-hover:text-[#D367C4] transition-colors">
                  {area.title}
                </h4>

                <p className="text-xs sm:text-sm text-[#dadce0] font-light leading-relaxed mb-6 flex-1">
                  {area.description}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-[#3c4043]/40 mt-auto">
                  {area.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#202124] text-[#7B7672] group-hover:text-[#dadce0] transition-colors"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Research Synthesis Callout */}
          <div className="mt-12 bg-gradient-to-r from-[#292a2d]/90 via-[#202124] to-[#292a2d]/90 border border-[#3c4043] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-xl bg-[#D367C4]/10 border border-[#D367C4]/30 text-[#D367C4] shrink-0 mt-1">
                <Lightbulb className="w-6 h-6" />
              </div>
              <div>
                <h5 className="text-base sm:text-lg font-medium text-[#F9F7EF] mb-1">
                  Interdisciplinary Research &amp; Technology Development
                </h5>
                <p className="text-xs sm:text-sm text-[#dadce0] font-light leading-relaxed max-w-3xl">
                  Pursuing deep technical synthesis across quantum simulation, post-quantum cryptographic primitives, and intelligent machine control to engineer future-proof computational architectures.
                </p>
              </div>
            </div>

            <a
              href="#roadmap"
              className="btn-secondary whitespace-nowrap text-xs flex items-center gap-1.5 shrink-0"
            >
              <span>Explore Quantum Roadmap</span>
              <ArrowUpRight className="w-4 h-4 text-[#D367C4]" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
