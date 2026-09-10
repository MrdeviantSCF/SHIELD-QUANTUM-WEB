import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Technological Quantum Roadmap',
  description:
    'Our 6-milestone technological roadmap charting the progression from early beyond-classical demonstrations to million-qubit, fault-tolerant error-corrected quantum machines.',
  openGraph: {
    title: 'Quantum Technology Roadmap | SHIELD QUANTUM',
    description:
      'Milestones, coherence benchmarks, and hardware scaling trajectories for fault-tolerant quantum computing.',
  },
};

export default function RoadmapLayout({ children }: { children: React.ReactNode }) {
  return children;
}
