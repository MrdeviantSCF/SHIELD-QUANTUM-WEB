'use client';

import React from 'react';
import Link from 'next/link';
import { Shield, Globe, Users, MessageCircle, Mail, ExternalLink } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   Footer — Global site footer
   ═══════════════════════════════════════════════════════ */

const footerLinks = {
  technology: {
    title: 'Technology',
    links: [
      { label: 'Quantum Machines', href: '/quantum-machines' },
      { label: 'Quantum Hardware', href: '/hardware' },
      { label: 'AI + Quantum', href: '/ai-quantum' },
      { label: 'Quantum Security', href: '/security' },
      { label: 'HPC', href: '/hpc' },
    ],
  },
  research: {
    title: 'Research',
    links: [
      { label: 'Research Areas', href: '/research' },
      { label: 'Publications', href: '/publications' },
      { label: 'Quantum Materials', href: '/materials' },
      { label: 'Quantum Sensing', href: '/sensing' },
      { label: 'Applications', href: '/applications' },
    ],
  },
  explore: {
    title: 'Explore',
    links: [
      { label: 'Cryogenic Lab', href: '/labs/cryogenic' },
      { label: 'Photonics Lab', href: '/labs/photonics' },
      { label: 'Quantum Simulator', href: '/simulator' },
      { label: 'Research Campus', href: '/campus' },
      { label: 'Quantum Network', href: '/network' },
    ],
  },
  organization: {
    title: 'Organization',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Knowledge Center', href: '/knowledge' },
      { label: 'Technology Roadmap', href: '/roadmap' },
      { label: 'Team', href: '/team' },
      { label: 'Collaborate', href: '/collaborate' },
    ],
  },
};

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-white/[0.06] bg-void" role="contentinfo">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-3 group mb-6">
              <Shield className="w-7 h-7 text-photon-cyan transition-all duration-300 group-hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.4)]" />
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-[0.15em] text-text-primary">
                  SHIELD QUANTUM
                </span>
                <span className="text-[9px] font-mono tracking-[0.3em] text-text-muted uppercase">
                  Machine & Technology
                </span>
              </div>
            </Link>
            <p className="text-sm text-text-secondary leading-relaxed max-w-xs mb-6">
              Engineering the quantum future through advanced quantum machines,
              computing, AI, and cybersecurity research.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {[
                { icon: Mail, label: 'Email', href: 'mailto:contact@shieldquantum.com' },
                { icon: Users, label: 'LinkedIn', href: '#' },
                { icon: MessageCircle, label: 'X/Twitter', href: '#' },
                { icon: Globe, label: 'GitHub', href: '#' },
              ].map(({ icon: Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="p-2 text-text-muted hover:text-photon-cyan transition-colors border border-white/[0.06] rounded hover:border-photon-cyan/20"
                  aria-label={label}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.values(footerLinks).map((section) => (
            <div key={section.title}>
              <h3 className="text-[10px] font-mono font-semibold tracking-[0.25em] uppercase text-text-muted mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-text-secondary hover:text-photon-cyan transition-colors inline-flex items-center gap-1 group"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-text-muted">
              © {currentYear} SHIELD Quantum Machine & Technology. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {['Privacy Policy', 'Terms of Use', 'Cookie Policy'].map((label) => (
                <Link
                  key={label}
                  href="#"
                  className="text-xs text-text-muted hover:text-text-secondary transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
