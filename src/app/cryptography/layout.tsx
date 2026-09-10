import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quantum Cryptography & BB84 Protocol',
  description:
    'Interactive visualization of quantum key distribution (QKD) using the BB84 protocol: explore Alice, Bob, and Eve quantum eavesdropping detection via wavefunction collapse.',
  openGraph: {
    title: 'BB84 Quantum Cryptography Simulation | SHIELD QUANTUM',
    description:
      'Interactive quantum key distribution protocol showing eavesdropping detection and qubit basis preparation.',
  },
};

export default function CryptographyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
