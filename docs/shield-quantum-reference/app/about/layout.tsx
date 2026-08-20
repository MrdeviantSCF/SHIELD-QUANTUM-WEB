import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about SHIELD Quantum Machine & Technology — our mission, vision, philosophy, and research strategy for engineering the quantum future.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
