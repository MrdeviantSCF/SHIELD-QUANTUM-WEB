import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quantum Photonics Laboratory',
  description:
    'Interactive optical breadboard simulator featuring laser sources, beam splitters, Mach-Zehnder interferometers, and superconducting single-photon detectors (SNSPD).',
  openGraph: {
    title: 'Quantum Photonics Lab | SHIELD QUANTUM',
    description:
      'Explore photonic quantum computing, optical interference, and quantum entanglement experiments.',
  },
};

export default function PhotonicsLabLayout({ children }: { children: React.ReactNode }) {
  return children;
}
