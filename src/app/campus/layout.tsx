import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quantum Research Campus',
  description:
    'Explore the scientific facilities, laboratories, computing datacenters, and collaboration centers across the SHIELD Quantum Machine & Technology campus.',
  openGraph: {
    title: 'Research Campus Map | SHIELD QUANTUM',
    description:
      'Explore research laboratories and facilities across the SHIELD Quantum campus.',
  },
};

export default function CampusLayout({ children }: { children: React.ReactNode }) {
  return children;
}
