'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { Section, GlassCard, Badge, Button } from '@/components/ui';

const collaborationTypes = [
  { value: 'research', label: 'Research Collaboration' },
  { value: 'academic', label: 'Academic Collaboration' },
  { value: 'industry', label: 'Industry Partnership' },
  { value: 'technology', label: 'Technology Partnership' },
  { value: 'internship', label: 'Internship Program' },
  { value: 'proposal', label: 'Research Proposal' },
  { value: 'scientific', label: 'Scientific Collaboration' },
];

export default function CollaboratePage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Section fullHeight className="pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="cyan" className="mb-6">Partnership</Badge>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Collaborate with{' '}
            <span className="bg-gradient-to-r from-photon-cyan to-quantum-violet bg-clip-text text-transparent">
              SHIELD Quantum
            </span>
          </h1>
          <p className="mt-6 text-lg text-text-secondary max-w-2xl mx-auto">
            We welcome research collaborations, academic partnerships, and industry engagements
            to advance quantum technology together.
          </p>
        </div>
      </Section>

      <div className="section-divider" />

      <Section>
        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <GlassCard className="p-8 text-center">
                <CheckCircle className="w-12 h-12 text-quantum-emerald mx-auto mb-4" />
                <h2 className="text-xl font-semibold text-text-primary">Inquiry Received</h2>
                <p className="mt-2 text-sm text-text-secondary">
                  Thank you for your interest. Our team will review your inquiry and respond.
                </p>
              </GlassCard>
            </motion.div>
          ) : (
            <GlassCard className="p-6 sm:p-8">
              <h2 className="text-lg font-semibold text-text-primary mb-6">Collaboration Inquiry</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-1.5">Name *</label>
                    <input id="name" type="text" required className="w-full px-3 py-2.5 text-sm bg-white/[0.03] border border-white/[0.08] rounded text-text-primary placeholder:text-text-muted/50 focus:border-photon-cyan/40 focus:outline-none transition-colors" placeholder="Full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-1.5">Email *</label>
                    <input id="email" type="email" required className="w-full px-3 py-2.5 text-sm bg-white/[0.03] border border-white/[0.08] rounded text-text-primary placeholder:text-text-muted/50 focus:border-photon-cyan/40 focus:outline-none transition-colors" placeholder="email@institution.edu" />
                  </div>
                </div>
                <div>
                  <label htmlFor="organization" className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-1.5">Organization</label>
                  <input id="organization" type="text" className="w-full px-3 py-2.5 text-sm bg-white/[0.03] border border-white/[0.08] rounded text-text-primary placeholder:text-text-muted/50 focus:border-photon-cyan/40 focus:outline-none transition-colors" placeholder="University / Company" />
                </div>
                <div>
                  <label htmlFor="type" className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-1.5">Collaboration Type *</label>
                  <select id="type" required className="w-full px-3 py-2.5 text-sm bg-white/[0.03] border border-white/[0.08] rounded text-text-primary focus:border-photon-cyan/40 focus:outline-none transition-colors">
                    <option value="">Select type</option>
                    {collaborationTypes.map((t) => (
                      <option key={t.value} value={t.value}>{t.label}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-text-muted uppercase tracking-wider mb-1.5">Message *</label>
                  <textarea id="message" required rows={4} className="w-full px-3 py-2.5 text-sm bg-white/[0.03] border border-white/[0.08] rounded text-text-primary placeholder:text-text-muted/50 focus:border-photon-cyan/40 focus:outline-none transition-colors resize-none" placeholder="Describe your collaboration interest..." />
                </div>
                <Button variant="primary" size="md" icon={<Send className="w-4 h-4" />}>
                  Submit Inquiry
                </Button>
              </form>
            </GlassCard>
          )}
        </div>
      </Section>
    </>
  );
}
