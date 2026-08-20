'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Atom, Lightbulb, ArrowRight } from 'lucide-react';
import { Section, SectionHeader, GlassCard, Badge, Button } from '@/components/ui';

const labs = [
  {
    title: 'Cryogenic Quantum Lab',
    description: 'Explore a virtual dilution refrigerator system. Interact with quantum hardware components — from the quantum processor to microwave control lines.',
    badge: 'Interactive',
    href: '/labs/cryogenic',
    icon: FlaskConical,
    color: 'text-photon-cyan',
    gradient: 'from-photon-cyan/10 to-quantum-blue/10',
  },
  {
    title: 'Quantum Photonics Lab',
    description: 'Navigate an optical quantum experiment. Explore lasers, beam splitters, interferometers, and single-photon detectors.',
    badge: 'Interactive',
    href: '/labs/photonics',
    icon: Lightbulb,
    color: 'text-energy-amber',
    gradient: 'from-energy-amber/10 to-quantum-rose/10',
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function LabsPage() {
  return (
    <>
      <Section fullHeight className="pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="cyan" className="mb-6">Interactive Laboratories</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Quantum{' '}
            <span className="bg-gradient-to-r from-photon-cyan to-quantum-violet bg-clip-text text-transparent">
              Labs
            </span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
            Virtual interactive laboratories designed for exploration and education.
            Each lab provides hands-on experience with quantum hardware concepts.
          </p>
        </div>
      </Section>

      <div className="section-divider" />

      <Section>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {labs.map((lab) => {
            const IconComponent = lab.icon;
            return (
              <motion.div key={lab.title} variants={fadeIn}>
                <a href={lab.href} className="block group">
                  <GlassCard hover glow="cyan" className="p-0 overflow-hidden h-full">
                    <div className={`h-48 bg-gradient-to-br ${lab.gradient} flex items-center justify-center relative`}>
                      <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
                        backgroundSize: '30px 30px',
                      }} />
                      <IconComponent className={`w-16 h-16 ${lab.color} opacity-30 group-hover:opacity-50 transition-opacity`} />
                    </div>
                    <div className="p-6">
                      <Badge variant="cyan" className="mb-3">{lab.badge}</Badge>
                      <h3 className="text-xl font-semibold text-text-primary group-hover:text-photon-cyan transition-colors">
                        {lab.title}
                      </h3>
                      <p className="mt-2 text-sm text-text-secondary leading-relaxed">
                        {lab.description}
                      </p>
                      <div className="mt-4 flex items-center gap-2 text-xs text-photon-cyan font-medium">
                        Enter Lab <ArrowRight className="w-3 h-3" />
                      </div>
                    </div>
                  </GlassCard>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </Section>
    </>
  );
}
