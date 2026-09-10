import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quantum Research & Publications',
  description:
    'Comprehensive repository of academic monographs, peer-level research papers, theses, and technical reports on quantum computing, error correction, and post-quantum defense.',
  openGraph: {
    title: 'Research & Publications | SHIELD QUANTUM',
    description:
      'Explore theoretical foundations, experimental protocols, and technical papers from SHIELD Quantum.',
  },
};

export default function ResearchLayout({ children }: { children: React.ReactNode }) {
  return children;
}
