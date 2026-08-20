'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FlaskConical, Radio, Cpu, Building2, ArrowRight, ShieldCheck, Sparkles, Layers, Activity } from 'lucide-react';
import { Section, SectionHeader, GlassCard, Badge, Button } from '@/components/ui';

const primaryLabs = [
  {
    title: 'Cryogenic Quantum Lab',
    description: 'Interactive dilution refrigerator visualizer. Inspect microwave control lines, 15 mK mixing chamber, Josephson junctions, and Mu-metal magnetic shielding.',
    badge: '3D Interactive',
    href: '/labs/cryogenic',
    icon: FlaskConical,
    color: 'text-[#00d4ff]',
    gradient: 'from-[#00d4ff]/10 to-[#3b82f6]/10',
    tags: ['Dilution Fridge (15 mK)', 'RF Shielding', 'Microwave Lines'],
  },
  {
    title: 'Quantum Photonics Lab',
    description: 'Interactive optical table exploration. Examine single-photon laser sources, beam splitters, Mach-Zehnder interferometers, and SNSPD detector arrays.',
    badge: 'Interactive Simulator',
    href: '/labs/photonics',
    icon: Radio,
    color: 'text-[#f59e0b]',
    gradient: 'from-[#f59e0b]/10 to-[#f43f5e]/10',
    tags: ['Single Photon Sources', 'SNSPDs', 'Interferometry'],
  },
];

const facilitySpaces = [
  {
    title: 'ISO 4 / Class 10 Cleanroom Facility',
    desc: 'Equipped with 100 keV electron-beam lithography, ultra-high vacuum e-beam evaporators, and in-situ oxidation chambers for sub-20 nm Josephson junction fabrication.',
    status: 'PROPOSED / PLANNED',
    icon: Cpu,
  },
  {
    title: 'RF & Microwave Metrology Suite',
    desc: 'Features vector network analyzers (VNA up to 50 GHz), real-time spectrum analyzers, and multi-channel arbitrary waveform generators (AWGs) for qubit pulse shaping.',
    status: 'ACTIVE RESEARCH',
    icon: Activity,
  },
  {
    title: 'Quantum Research Campus Blueprint',
    desc: 'Conceptual 11-facility masterplan featuring specialized Cryo-Bays, AI+HPC Supercomputing Datacenter, and isolated Electromagnetic Anechoic Chambers.',
    status: 'CONCEPTUAL DESIGN',
    icon: Building2,
    href: '/campus',
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function LabsPage() {
  return (
    <>
      <Section className="pt-24 pb-12">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="cyan" className="mb-4">Interactive Environments &amp; Facilities</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#e2e8f0]">
            Laboratories &amp;{' '}
            <span className="bg-gradient-to-r from-[#00d4ff] via-[#d367c4] to-[#7c3aed] bg-clip-text text-transparent">
              Physical Infrastructure
            </span>
          </h1>
          <p className="mt-6 text-lg text-[#94a3b8] max-w-3xl mx-auto leading-relaxed">
            Explore our interactive virtual laboratories and facility blueprints designed for hands-on investigation of quantum computing hardware, cryogenics, and photonic systems.
          </p>
        </div>
      </Section>

      <div className="section-divider" />

      {/* 2 Primary Interactive Labs */}
      <Section id="interactive-labs">
        <SectionHeader
          label="Virtual Exploration"
          title="Interactive Laboratories"
          description="Click into any virtual laboratory space to interact with live physical components."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {primaryLabs.map((lab) => {
            const Icon = lab.icon;
            return (
              <motion.div key={lab.title} variants={fadeIn}>
                <Link href={lab.href} className="block group h-full">
                  <GlassCard hover glow="cyan" className="p-0 overflow-hidden h-full flex flex-col justify-between">
                    <div>
                      <div className={`h-48 bg-gradient-to-br ${lab.gradient} flex items-center justify-center relative overflow-hidden`}>
                        <div
                          className="absolute inset-0"
                          style={{
                            backgroundImage:
                              'linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
                            backgroundSize: '30px 30px',
                          }}
                        />
                        <Icon className={`w-16 h-16 ${lab.color} opacity-40 group-hover:opacity-75 group-hover:scale-110 transition-all duration-300`} />
                      </div>
                      <div className="p-6">
                        <Badge variant="cyan" className="mb-3">{lab.badge}</Badge>
                        <h3 className="text-xl font-bold text-[#e2e8f0] group-hover:text-[#00d4ff] transition-colors">
                          {lab.title}
                        </h3>
                        <p className="mt-2 text-xs sm:text-sm text-[#94a3b8] leading-relaxed">
                          {lab.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {lab.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.04] text-[#7B7672]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-[#00d4ff] font-medium group-hover:translate-x-1 transition-transform">
                        <span>Launch Laboratory</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </GlassCard>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Section>

      <div className="section-divider" />

      {/* Physical Facilities & Masterplan */}
      <Section id="facilities">
        <SectionHeader
          label="Physical Infrastructure"
          title="Facility Architecture & Masterplan"
          description="Cleanroom environments, RF characterization suites, and conceptual campus blueprints."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {facilitySpaces.map((fac) => {
            const Icon = fac.icon;
            return (
              <GlassCard key={fac.title} className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#00d4ff]/10 border border-[#00d4ff]/30 flex items-center justify-center text-[#00d4ff]">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant="muted">{fac.status}</Badge>
                  </div>
                  <h4 className="text-base font-bold text-[#e2e8f0] mb-2">{fac.title}</h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">{fac.desc}</p>
                </div>
                {fac.href && (
                  <Link
                    href={fac.href}
                    className="text-xs font-mono text-[#00d4ff] hover:text-[#e2e8f0] flex items-center gap-1 mt-2 transition-colors"
                  >
                    <span>View Campus Map</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                )}
              </GlassCard>
            );
          })}
        </div>
      </Section>
    </>
  );
}
