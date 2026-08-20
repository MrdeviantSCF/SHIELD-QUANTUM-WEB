'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Shield, Sparkles } from 'lucide-react';
import { Badge } from '@/components/ui';

export function Footer() {
  return (
    <footer className="w-full bg-[#18191c] text-[#dadce0] border-t border-white/[0.08] pt-16 pb-12 px-4 sm:px-8 lg:px-12 relative overflow-hidden">
      {/* Subtle ambient gradient overlay */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-[#00d4ff]/3 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#d367c4]/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto flex flex-col gap-14 relative z-10">
        {/* Top Grid: Categorized Research & Knowledge Directory */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 text-xs">
          {/* Col 1: Foundation & Leadership */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase tracking-[0.18em] text-[#00d4ff] font-semibold text-[11px]">
              Foundation
            </h4>
            <ul className="space-y-2 text-[#94a3b8]">
              <li>
                <Link href="/about" className="hover:text-[#F9F7EF] transition-colors">
                  About SHIELD
                </Link>
              </li>
              <li>
                <Link href="/about#founder" className="hover:text-[#00d4ff] text-[#e2e8f0] font-medium transition-colors flex items-center gap-1">
                  <span>Dipak S. Dahifale</span>
                  <span className="text-[9px] px-1 py-0.2 bg-[#00d4ff]/10 text-[#00d4ff] rounded">DIR</span>
                </Link>
              </li>
              <li>
                <Link href="/about#mission" className="hover:text-[#F9F7EF] transition-colors">
                  Mission &amp; Vision
                </Link>
              </li>
              <li>
                <Link href="/about#timeline" className="hover:text-[#F9F7EF] transition-colors">
                  Computing Evolution
                </Link>
              </li>
              <li>
                <Link href="/about#philosophy" className="hover:text-[#F9F7EF] transition-colors">
                  Scientific Philosophy
                </Link>
              </li>
              <li>
                <Link href="/collaborate" className="hover:text-[#F9F7EF] transition-colors">
                  Research Collaboration
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Quantum Machines & Hardware */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase tracking-[0.18em] text-[#00d4ff] font-semibold text-[11px]">
              Quantum Machines
            </h4>
            <ul className="space-y-2 text-[#94a3b8]">
              <li>
                <Link href="/quantum-machines" className="hover:text-[#F9F7EF] transition-colors">
                  Qubits &amp; Quantum States
                </Link>
              </li>
              <li>
                <Link href="/quantum-machines#gates" className="hover:text-[#F9F7EF] transition-colors">
                  Quantum Logic Gates
                </Link>
              </li>
              <li>
                <Link href="/quantum-machines#superposition" className="hover:text-[#F9F7EF] transition-colors">
                  Superposition &amp; Entanglement
                </Link>
              </li>
              <li>
                <Link href="/hardware" className="hover:text-[#F9F7EF] transition-colors">
                  Quantum Processors (QPU)
                </Link>
              </li>
              <li>
                <Link href="/hardware#superconducting" className="hover:text-[#F9F7EF] transition-colors">
                  Superconducting Circuits
                </Link>
              </li>
              <li>
                <Link href="/quantum-machines#error-correction" className="hover:text-[#F9F7EF] transition-colors">
                  Quantum Error Correction
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Labs & Physics */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase tracking-[0.18em] text-[#00d4ff] font-semibold text-[11px]">
              Labs &amp; Physics
            </h4>
            <ul className="space-y-2 text-[#94a3b8]">
              <li>
                <Link href="/labs/cryogenic" className="hover:text-[#00d4ff] text-[#e2e8f0] font-medium transition-colors">
                  Cryogenic Quantum Lab
                </Link>
              </li>
              <li>
                <Link href="/labs/photonics" className="hover:text-[#F9F7EF] transition-colors">
                  Quantum Photonics Lab
                </Link>
              </li>
              <li>
                <Link href="/labs/cryogenic#dilution-fridge" className="hover:text-[#F9F7EF] transition-colors">
                  Dilution Refrigeration
                </Link>
              </li>
              <li>
                <Link href="/labs/cryogenic#magnetic-shield" className="hover:text-[#F9F7EF] transition-colors">
                  EMI &amp; RF Shielding
                </Link>
              </li>
              <li>
                <Link href="/labs/cryogenic#vacuum-system" className="hover:text-[#F9F7EF] transition-colors">
                  Vacuum Vessel Chambers
                </Link>
              </li>
              <li>
                <Link href="/campus" className="hover:text-[#F9F7EF] transition-colors">
                  Research Campus Blueprint
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Network & Security */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase tracking-[0.18em] text-[#00d4ff] font-semibold text-[11px]">
              Network &amp; Security
            </h4>
            <ul className="space-y-2 text-[#94a3b8]">
              <li>
                <Link href="/network" className="hover:text-[#00d4ff] text-[#e2e8f0] font-medium transition-colors">
                  Quantum Network (QNet)
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-[#F9F7EF] transition-colors">
                  Quantum Cybersecurity
                </Link>
              </li>
              <li>
                <Link href="/security#pqc" className="hover:text-[#F9F7EF] transition-colors">
                  Post-Quantum Crypto (PQC)
                </Link>
              </li>
              <li>
                <Link href="/cryptography" className="hover:text-[#00d4ff] transition-colors">
                  QKD BB84 Interactive Demo
                </Link>
              </li>
              <li>
                <Link href="/network#satellite" className="hover:text-[#F9F7EF] transition-colors">
                  Satellite Downlinks
                </Link>
              </li>
              <li>
                <Link href="/security#zerotrust" className="hover:text-[#F9F7EF] transition-colors">
                  Zero-Trust Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Advanced Computation */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase tracking-[0.18em] text-[#00d4ff] font-semibold text-[11px]">
              AI &amp; Computation
            </h4>
            <ul className="space-y-2 text-[#94a3b8]">
              <li>
                <Link href="/ai-quantum" className="hover:text-[#00d4ff] text-[#e2e8f0] font-medium transition-colors">
                  AI + Quantum Synthesis
                </Link>
              </li>
              <li>
                <Link href="/ai-quantum#hpc" className="hover:text-[#F9F7EF] transition-colors">
                  AI + HPC Supercomputing
                </Link>
              </li>
              <li>
                <Link href="/ai-quantum#qml" className="hover:text-[#F9F7EF] transition-colors">
                  Quantum Machine Learning
                </Link>
              </li>
              <li>
                <Link href="/simulator" className="hover:text-[#00d4ff] font-medium transition-colors">
                  Circuit Simulator
                </Link>
              </li>
              <li>
                <Link href="/research#semiconductor" className="hover:text-[#F9F7EF] transition-colors">
                  Semiconductor Research
                </Link>
              </li>
              <li>
                <Link href="/roadmap" className="hover:text-[#F9F7EF] transition-colors">
                  Multi-Phase Roadmap
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 6: Knowledge & Platform Status */}
          <div className="space-y-3">
            <h4 className="font-mono uppercase tracking-[0.18em] text-[#00d4ff] font-semibold text-[11px]">
              Knowledge Center
            </h4>
            <ul className="space-y-2 text-[#94a3b8]">
              <li>
                <Link href="/knowledge" className="hover:text-[#F9F7EF] transition-colors">
                  All 14+ Articles
                </Link>
              </li>
              <li>
                <Link href="/knowledge?level=BEGINNER" className="hover:text-[#F9F7EF] transition-colors">
                  Beginner Guides
                </Link>
              </li>
              <li>
                <Link href="/knowledge?level=INTERMEDIATE" className="hover:text-[#F9F7EF] transition-colors">
                  Intermediate Papers
                </Link>
              </li>
              <li>
                <Link href="/knowledge?level=ADVANCED" className="hover:text-[#F9F7EF] transition-colors">
                  Advanced Engineering
                </Link>
              </li>
              <li>
                <Link href="/collaborate#contact" className="hover:text-[#F9F7EF] transition-colors">
                  Contact &amp; Inquiries
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Content Status & Verification Legend */}
        <div className="bg-[#202124]/60 border border-white/[0.06] rounded-2xl p-5 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-[#94a3b8]">
            <Sparkles className="w-4 h-4 text-[#00d4ff]" />
            <span className="font-mono uppercase text-[11px] text-[#e2e8f0]">Platform Content Classification:</span>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-mono">
            <span className="flex items-center gap-1.5 text-[#34d399]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
              ACTIVE / DEPLOYED
            </span>
            <span className="flex items-center gap-1.5 text-[#00d4ff]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff]" />
              RESEARCH &amp; LAB
            </span>
            <span className="flex items-center gap-1.5 text-[#fbbf24]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]" />
              SIMULATION / PROTOTYPE
            </span>
            <span className="flex items-center gap-1.5 text-[#94a3b8]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#64748b]" />
              CONCEPTUAL / FUTURE
            </span>
          </div>
        </div>

        {/* Corporate Brand Lockup */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-t border-white/[0.06] pt-8">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-lg overflow-hidden border border-[#D367C4]/50 group-hover:border-[#D367C4] transition-all duration-300 shadow-[0_0_10px_rgba(211,103,196,0.2)] shrink-0 bg-black">
              <Image
                src="/images/shield-quantum-ai-logo.jpg"
                alt="SHIELD QUANTUM AI Official Logo"
                width={36}
                height={36}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold tracking-[0.1em] text-[#F9F7EF] uppercase group-hover:text-[#D367C4] transition-colors">
                SHIELD QUANTUM MACHINE AND TECHNOLOGY
              </span>
              <span className="text-[10px] text-[#7B7672]">
                An Authoritative Quantum Computing &amp; Technology Platform
              </span>
            </div>
          </Link>

          <div className="text-[11px] text-[#7B7672] text-center sm:text-right">
            © {new Date().getFullYear()} SHIELD QUANTUM MACHINE AND TECHNOLOGY. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
