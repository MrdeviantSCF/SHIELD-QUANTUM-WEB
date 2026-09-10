'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Section, GlassCard, Badge } from '@/components/ui';

const facilities = [
  { id: 'qrc', name: 'Quantum Research Center', purpose: 'Central facility for fundamental quantum computing research, algorithm development, and theoretical physics.', x: 35, y: 10, w: 30, h: 15, color: '#00d4ff' },
  { id: 'cryo', name: 'Cryogenic Quantum Lab', purpose: 'Houses dilution refrigerators, quantum processors, and low-temperature measurement systems.', x: 10, y: 30, w: 25, h: 15, color: '#06b6d4' },
  { id: 'qcl', name: 'Quantum Computing Lab', purpose: 'Software development, quantum circuit design, compilation, and classical simulation.', x: 65, y: 30, w: 25, h: 15, color: '#7c3aed' },
  { id: 'photonics', name: 'Quantum Photonics Lab', purpose: 'Optical quantum experiments, single photon sources, and photonic circuit development.', x: 10, y: 50, w: 25, h: 15, color: '#f59e0b' },
  { id: 'materials', name: 'Quantum Materials Lab', purpose: 'Research on superconducting materials, quantum dots, 2D materials, and device fabrication.', x: 65, y: 50, w: 25, h: 15, color: '#10b981' },
  { id: 'ai', name: 'AI Research Lab', purpose: 'Machine learning research, quantum-classical hybrid algorithms, and AI-assisted quantum control.', x: 38, y: 35, w: 24, h: 12, color: '#3b82f6' },
  { id: 'security', name: 'Quantum Cybersecurity Lab', purpose: 'Post-quantum cryptography research, QKD experiments, and quantum-safe protocol development.', x: 10, y: 70, w: 25, h: 15, color: '#f43f5e' },
  { id: 'hpc', name: 'HPC Datacenter', purpose: 'High-performance computing infrastructure for quantum simulation, data processing, and AI training.', x: 65, y: 70, w: 25, h: 15, color: '#64748b' },
  { id: 'control', name: 'Control Systems Lab', purpose: 'Development of quantum control electronics, pulse engineering, and measurement systems.', x: 38, y: 55, w: 24, h: 10, color: '#94a3b8' },
  { id: 'education', name: 'Education Center', purpose: 'Training programs, workshops, and educational resources for quantum technology.', x: 25, y: 88, w: 22, h: 10, color: '#a855f7' },
  { id: 'collab', name: 'Collaboration Center', purpose: 'Meeting spaces, conference facilities, and visitor labs for industry and academic partnerships.', x: 53, y: 88, w: 22, h: 10, color: '#ec4899' },
];

export default function CampusPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = facilities.find((f) => f.id === selected);

  return (
    <>
      <Section className="pt-24 pb-8">
        <div className="text-center">
          <Badge variant="cyan" className="mb-4">Virtual Facility</Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            Research{' '}
            <span className="bg-gradient-to-r from-photon-cyan to-quantum-violet bg-clip-text text-transparent">
              Campus
            </span>
          </h1>
          <p className="mt-4 text-text-secondary max-w-xl mx-auto">
            A conceptual quantum research campus. Click any facility to learn about its purpose.
          </p>
          <Badge variant="amber" className="mt-4">Conceptual — Not a Physical Facility</Badge>
        </div>
      </Section>

      <Section>
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GlassCard className="p-4 aspect-[4/3] relative overflow-hidden">
              <div className="absolute top-3 left-4 z-10">
                <span className="text-[10px] font-mono text-text-muted tracking-wider uppercase">
                  SHIELD Quantum Research Campus — Floor Plan
                </span>
              </div>
              <svg viewBox="0 0 100 100" className="w-full h-full">
                {facilities.map((f) => {
                  const isActive = selected === f.id;
                  return (
                    <g key={f.id} className="cursor-pointer" onClick={() => setSelected(isActive ? null : f.id)}>
                      <rect
                        x={f.x} y={f.y} width={f.w} height={f.h}
                        rx="1"
                        fill={isActive ? `${f.color}22` : 'rgba(255,255,255,0.02)'}
                        stroke={isActive ? f.color : 'rgba(255,255,255,0.08)'}
                        strokeWidth={isActive ? '0.5' : '0.3'}
                        className="transition-all duration-300"
                      />
                      <text
                        x={f.x + f.w / 2} y={f.y + f.h / 2}
                        textAnchor="middle" dominantBaseline="central"
                        fill={isActive ? f.color : 'rgba(255,255,255,0.35)'}
                        fontSize="2" fontFamily="monospace"
                        className="pointer-events-none select-none"
                      >
                        {f.name.length > 22 ? f.name.substring(0, 20) + '…' : f.name}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </GlassCard>
          </div>

          <div>
            {active ? (
              <motion.div key={active.id} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }}>
                <GlassCard className="p-6">
                  <div className="w-3 h-3 rounded-full mb-3" style={{ backgroundColor: active.color }} />
                  <h3 className="text-lg font-semibold text-text-primary">{active.name}</h3>
                  <p className="mt-3 text-sm text-text-secondary leading-relaxed">{active.purpose}</p>
                </GlassCard>
              </motion.div>
            ) : (
              <GlassCard className="p-6 text-center">
                <p className="text-sm text-text-muted">Click a facility on the campus map to explore its purpose.</p>
              </GlassCard>
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
