import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quantum Hardware & Physics',
  description:
    'Deep physical specifications of superconducting transmon qubits, 15 mK cryogenic dilution refrigerators, coaxial microwave routing, and Mu-metal magnetic shielding.',
  openGraph: {
    title: 'Quantum Hardware Stack | SHIELD QUANTUM',
    description:
      'Physical implementation of superconducting qubits and ultra-low temperature cryogenic environments.',
  },
};

export default function HardwareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
