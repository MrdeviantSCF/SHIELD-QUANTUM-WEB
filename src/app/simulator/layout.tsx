import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Interactive Quantum Simulator & Bloch Sphere',
  description:
    'Simulate multi-qubit quantum circuits, apply unitary quantum gates (H, X, Y, Z, CNOT, SWAP, Toffoli), visualize 3D Bloch sphere state vectors, and measure Born-rule quantum collapse.',
  openGraph: {
    title: 'Quantum Circuit Simulator & 3D Bloch Sphere | SHIELD QUANTUM',
    description:
      'Interactive quantum state simulation, unitary gate operations, and live Bloch sphere visualization.',
  },
};

export default function SimulatorLayout({ children }: { children: React.ReactNode }) {
  return children;
}
