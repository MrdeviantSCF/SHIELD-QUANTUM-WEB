import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quantum Network & Entanglement Distribution | SHIELD Quantum',
  description:
    'Explore SHIELD Quantum Network architecture — quantum repeaters, entanglement routing, distributed QPU clustering, and quantum internet infrastructure.',
  keywords: [
    'Quantum Network',
    'Entanglement Distribution',
    'Quantum Repeaters',
    'Quantum Internet',
    'Distributed Quantum Computing',
    'Quantum Teleportation',
    'QKD Network',
    'Quantum Memory',
  ],
};

export default function NetworkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
