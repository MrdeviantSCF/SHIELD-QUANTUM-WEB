import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Research Laboratories',
  description:
    'Overview of specialized research facilities: Cryogenic Quantum Systems Lab, Quantum Photonics Lab, and Materials Fabrication facilities at SHIELD Quantum.',
  openGraph: {
    title: 'Quantum Laboratories | SHIELD QUANTUM',
    description:
      'Explore our cutting-edge cryogenic and photonic quantum experimental facilities.',
  },
};

export default function LabsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
