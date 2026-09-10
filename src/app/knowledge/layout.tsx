import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quantum Knowledge Base & Technical Briefs',
  description:
    'Comprehensive reference library covering quantum computing fundamentals, circuit synthesis, error mitigation, dilution thermodynamics, and mathematical definitions.',
  openGraph: {
    title: 'Knowledge Base & Technical Briefs | SHIELD QUANTUM',
    description:
      'Curated quantum computing documentation, architectural diagrams, and educational resources.',
  },
};

export default function KnowledgeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
