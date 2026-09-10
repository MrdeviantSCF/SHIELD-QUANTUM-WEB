import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Collaborate & Partnerships',
  description:
    'Partner with SHIELD Quantum Machine & Technology for academic research, industrial co-development, technology licensing, and internships at the quantum frontier.',
  openGraph: {
    title: 'Collaborate with SHIELD QUANTUM',
    description:
      'Academic research collaborations, industry partnerships, and technology development initiatives.',
  },
};

export default function CollaborateLayout({ children }: { children: React.ReactNode }) {
  return children;
}
