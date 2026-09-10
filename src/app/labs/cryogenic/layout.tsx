import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cryogenic Systems Laboratory',
  description:
    'Interactive 3D laboratory environment inspecting dilution refrigerator stages, helium mixture cycle, microwave attenuators, and 15 mK transmon operation.',
  openGraph: {
    title: 'Cryogenic Quantum Lab | SHIELD QUANTUM',
    description:
      'Inspect ultra-low temperature cryogenic dilution refrigerators and superconducting qubit chambers.',
  },
};

export default function CryogenicLabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
