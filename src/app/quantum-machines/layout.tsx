import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quantum Machines & Architecture',
  description:
    'Engineering scalable quantum machine architectures, planar superconducting transmon arrays, cryogenic control electronics, and fault-tolerant processor designs.',
  openGraph: {
    title: 'Quantum Machines & Architecture | SHIELD QUANTUM',
    description:
      'Explore scalable quantum machines, dilution refrigeration systems, and advanced quantum processors.',
  },
};

export default function QuantumMachinesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
