import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quantum Security & Post-Quantum Cryptography',
  description:
    'Protecting mission-critical digital infrastructure against quantum threats with post-quantum cryptography (PQC), lattice-based algorithms, and quantum key distribution (QKD).',
  openGraph: {
    title: 'Quantum Security & PQC | SHIELD QUANTUM',
    description:
      'Lattice cryptography, quantum-resilient protocols, and threat mitigation for the post-RSA era.',
  },
};

export default function SecurityLayout({ children }: { children: React.ReactNode }) {
  return children;
}
