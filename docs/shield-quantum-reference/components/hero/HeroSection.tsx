'use client';

import React from 'react';
import CinematicQuantumHero from './CinematicQuantumHero';

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden"
      aria-label="SHIELD Quantum Research Laboratory Hero"
    >
      {/* Subtle radial laboratory ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(0,212,255,0.07),transparent_70%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_65%,rgba(124,58,237,0.06),transparent_70%)] pointer-events-none" />

      {/* Cinematic Quantum Machine Hero Experience */}
      <CinematicQuantumHero />
    </section>
  );
}
