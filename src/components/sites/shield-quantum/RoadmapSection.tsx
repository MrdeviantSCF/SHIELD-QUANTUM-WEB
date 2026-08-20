"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Layers, Cpu, ShieldCheck, Sparkles } from "lucide-react";

interface Milestone {
  id: number;
  year?: string;
  milestoneNumber: string;
  cardTitle: string;
  physicalQubits: string;
  errorRate: string;
  image: string;
  eyebrow: string;
  detailTitle: string;
  body: React.ReactNode;
  ctas?: { label: string; href: string; isPrimary?: boolean }[];
}

const milestones: Milestone[] = [
  {
    id: 0,
    year: "2019",
    milestoneNumber: "MILESTONE 1",
    cardTitle: "Beyond classical",
    physicalQubits: "54",
    errorRate: "-",
    image: "/images/quantum_qpu_chip_macro.jpg",
    eyebrow: "Milestone one",
    detailTitle: "Beyond-classical computation",
    body: (
      <>
        A quantum computer&apos;s ability to perform computations that can&apos;t reasonably be emulated on a classical computer opens an entirely new frontier of computational physics. Demonstrating beyond-classical computation on superconducting planar architectures marks the initial transition into intermediate-scale quantum devices.
        <br />
        <br />
        Our research synthesizes the computational scaling dynamics that enable synthetic benchmarking far exceeding classical supercomputing capacities.
      </>
    ),
    ctas: [
      {
        label: "Quantum Algorithms",
        href: "/quantum-machines#algorithms",
        isPrimary: true,
      },
      {
        label: "Hardware Specs",
        href: "/hardware",
      },
    ],
  },
  {
    id: 1,
    year: "2023",
    milestoneNumber: "MILESTONE 2",
    cardTitle: "Quantum error correction",
    physicalQubits: "10²",
    errorRate: "10⁻²",
    image: "/images/quantum_cryostat_hero.jpg",
    eyebrow: "Milestone two",
    detailTitle: "Quantum error correction & surface codes",
    body: (
      <>
        The construction of a truly useful quantum computer requires{" "}
        <span className="text-[#D367C4] font-medium underline underline-offset-2 cursor-help group relative inline-block">
          error-corrected qubits
          <span className="hidden sm:group-hover:block absolute bottom-full left-0 mb-2 w-72 p-3 bg-[#292a2d] border border-[#D367C4] text-xs text-[#F9F7EF] rounded-lg shadow-xl z-30 font-normal">
            Qubits are inherently sensitive to environmental noise. Quantum error correction utilizes multi-qubit surface codes to protect quantum information.
          </span>
        </span>
        , known as a logical qubit. Demonstrating that physical qubit error suppression scales favorably below the fault-tolerance threshold is the core imperative of modern quantum engineering.
        <br />
        <br />
        Through this work, quantum error correction moves from theoretical models to practical laboratory validation.
      </>
    ),
    ctas: [
      {
        label: "Error Correction Paper",
        href: "/knowledge",
        isPrimary: true,
      },
      {
        label: "Circuit Simulator",
        href: "/simulator",
      },
    ],
  },
  {
    id: 2,
    milestoneNumber: "MILESTONE 3",
    cardTitle: "Building a long-lived logical qubit",
    physicalQubits: "10³",
    errorRate: "10⁻⁶",
    image: "/images/quantum_qpu_chip_macro.jpg",
    eyebrow: "Milestone three",
    detailTitle: "Building a long-lived logical qubit",
    body: (
      <>
        A long-lived logical qubit is engineered to perform over one million computational gate cycles with less than one uncorrectable error.
        <br />
        <br />
        Achieving this milestone requires continuous cryogenic stability at 15 mK, high-isolation coaxial filtering, and real-time FPGA syndrome decoding loops.
      </>
    ),
    ctas: [
      {
        label: "Cryogenic Lab",
        href: "/labs/cryogenic",
        isPrimary: true,
      },
    ],
  },
  {
    id: 3,
    milestoneNumber: "MILESTONE 4",
    cardTitle: "Creating a logical gate",
    physicalQubits: "10⁴",
    errorRate: "10⁻⁶",
    image: "/images/quantum_cryostat_hero.jpg",
    eyebrow: "Milestone four",
    detailTitle: "Fault-tolerant logical gate operations",
    body: (
      <>
        The roadmap to large-scale computation requires universal, fault-tolerant logic gates (Hadamard, CNOT, T-gate / magic state distillation) operating directly on encoded logical qubits.
        <br />
        <br />
        Demonstrating transversal and lattice-surgery logical gates enables the first practical quantum chemistry and material simulation algorithms.
      </>
    ),
    ctas: [
      {
        label: "Quantum Machines",
        href: "/quantum-machines",
        isPrimary: true,
      },
    ],
  },
  {
    id: 4,
    milestoneNumber: "MILESTONE 5",
    cardTitle: "Engineering scale up",
    physicalQubits: "10⁵",
    errorRate: "10⁻⁶",
    image: "/images/quantum_qpu_chip_macro.jpg",
    eyebrow: "Milestone five",
    detailTitle: "100+ Logical Qubit Scaling & Hybrid HPC",
    body: (
      <>
        Scaling up to 100 logical qubits interconnected via cryogenic RF backplanes and optical quantum transducers unlocks commercial-grade quantum utility.
        <br />
        <br />
        Enables hybrid quantum-classical co-processing alongside petascale HPC supercomputers for intractable optimization and cryptanalysis defense.
      </>
    ),
    ctas: [
      {
        label: "AI + HPC Supercomputing",
        href: "/ai-quantum",
        isPrimary: true,
      },
    ],
  },
  {
    id: 5,
    milestoneNumber: "MILESTONE 6",
    cardTitle: "Large error-corrected quantum computer",
    physicalQubits: "10⁶",
    errorRate: "10⁻¹³",
    image: "/images/quantum_cryostat_hero.jpg",
    eyebrow: "Milestone six",
    detailTitle: "1,000,000 Qubit Fault-Tolerant Platform",
    body: (
      <>
        The ultimate milestone: a modular, networked quantum computer controlling 1,000,000 physical qubits across multi-dilution refrigerator clusters.
        <br />
        <br />
        Engineered to solve revolutionary challenges in catalytic chemistry, molecular drug discovery, and provably secure post-quantum cryptography networks.
      </>
    ),
    ctas: [
      {
        label: "Full Roadmap Details",
        href: "/roadmap",
        isPrimary: true,
      },
    ],
  },
];

export function RoadmapSection() {
  const [activeMilestoneIndex, setActiveMilestoneIndex] = useState(1);
  const activeMilestone = milestones[activeMilestoneIndex];

  return (
    <section id="roadmap" className="w-full bg-[#202124] text-[#F9F7EF] py-20 sm:py-32 px-4 sm:px-8 lg:px-12 border-t border-[#3c4043]/30">
      <div className="max-w-[1296px] mx-auto">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#7B7672] block mb-3 font-medium">
            Multi-Phase Progression
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal uppercase tracking-tight text-[#F9F7EF] mb-4">
            Our Quantum Roadmap
          </h2>
          <p className="text-sm sm:text-base text-[#dadce0] leading-relaxed">
            Our 6-milestone technological roadmap charts the methodical journey from early beyond-classical demonstrations to large-scale, fault-tolerant error-corrected quantum computing architectures.
          </p>
        </div>

        {/* Milestone Selector Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
          {milestones.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => setActiveMilestoneIndex(idx)}
              className={`text-left p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between min-h-[140px] ${
                activeMilestoneIndex === idx
                  ? "bg-[#292a2d] border-[#D367C4] shadow-lg shadow-[#D367C4]/10"
                  : "bg-[#292a2d]/40 border-[#3c4043] hover:border-[#7B7672] hover:bg-[#292a2d]"
              }`}
            >
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#D367C4] block mb-1">
                  {m.milestoneNumber}
                </span>
                <h4 className="text-xs sm:text-sm font-medium text-[#F9F7EF] line-clamp-2">
                  {m.cardTitle}
                </h4>
              </div>
              <div className="text-[10px] font-mono text-[#7B7672] pt-2 border-t border-[#3c4043]/60 flex items-center justify-between">
                <span>{m.physicalQubits} Qubits</span>
                {m.year && <span>{m.year}</span>}
              </div>
            </button>
          ))}
        </div>

        {/* Active Milestone Detail Panel */}
        <div className="bg-[#292a2d] border border-[#3c4043] rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Visual Side */}
            <div className="lg:col-span-6 relative aspect-video rounded-2xl overflow-hidden border border-[#3c4043] bg-[#18191c]">
              <Image
                src={activeMilestone.image}
                alt={activeMilestone.detailTitle}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#202124]/70 via-transparent to-transparent" />
            </div>

            {/* Description & CTAs */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#D367C4] block mb-2 font-medium">
                  {activeMilestone.eyebrow}
                </span>
                <h3 className="text-2xl sm:text-3xl font-normal text-[#F9F7EF] tracking-tight mb-4">
                  {activeMilestone.detailTitle}
                </h3>
                <div className="text-sm sm:text-base text-[#dadce0] font-light leading-relaxed">
                  {activeMilestone.body}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-3 pt-4 border-t border-[#3c4043]/60">
                {activeMilestone.ctas?.map((cta, index) => (
                  <Link
                    key={index}
                    href={cta.href}
                    className={
                      cta.isPrimary
                        ? "btn-primary text-xs flex items-center gap-1.5"
                        : "btn-secondary text-xs flex items-center gap-1.5"
                    }
                  >
                    <span>{cta.label}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
