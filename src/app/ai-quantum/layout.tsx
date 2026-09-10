import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quantum AI & Hybrid Computing',
  description:
    'Research into quantum machine learning (QML), variational quantum eigensolvers (VQE), parameterized quantum circuits, and high-performance hybrid quantum-classical co-processing.',
  openGraph: {
    title: 'Quantum AI & Hybrid Systems | SHIELD QUANTUM',
    description:
      'Advancing quantum machine learning algorithms and hybrid quantum-classical computing frameworks.',
  },
};

export default function AIQuantumLayout({ children }: { children: React.ReactNode }) {
  return children;
}
