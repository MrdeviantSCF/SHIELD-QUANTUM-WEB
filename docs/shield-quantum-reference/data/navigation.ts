import { NavItem } from '@/types';

export const navigationData: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About',
    href: '/about',
    children: [
      {
        title: 'Organization',
        items: [
          { label: 'Mission & Vision', href: '/about#mission', description: 'Our purpose and direction' },
          { label: 'Philosophy', href: '/about#philosophy', description: 'Scientific principles guiding our work' },
          { label: 'Technology Roadmap', href: '/roadmap', description: 'Multi-phase quantum development plan' },
          { label: 'Team', href: '/team', description: 'Researchers and engineers', badge: 'CONCEPT' },
        ],
      },
      {
        title: 'Metrics',
        items: [
          { label: 'Research Dashboard', href: '/dashboard', description: 'Research activity overview', badge: 'CONCEPT' },
          { label: 'Publications', href: '/publications', description: 'Papers and technical reports' },
        ],
      },
    ],
  },
  {
    label: 'Quantum Machines',
    href: '/quantum-machines',
    children: [
      {
        title: 'Fundamentals',
        items: [
          { label: 'Qubits & Gates', href: '/quantum-machines#qubits', description: 'Building blocks of quantum computing' },
          { label: 'Superposition & Entanglement', href: '/quantum-machines#superposition', description: 'Quantum mechanical principles' },
          { label: 'Quantum Circuits', href: '/quantum-machines#circuits', description: 'Circuit model of computation' },
          { label: 'Error Correction', href: '/quantum-machines#error-correction', description: 'Fault-tolerant quantum computing', badge: 'RESEARCH' },
        ],
      },
      {
        title: 'Hardware',
        items: [
          { label: 'Superconducting Qubits', href: '/hardware#superconducting', description: 'Josephson junction-based systems' },
          { label: 'Trapped Ions', href: '/hardware#trapped-ions', description: 'Electromagnetic ion confinement' },
          { label: 'Photonic Systems', href: '/hardware#photonic', description: 'Light-based quantum processing' },
          { label: 'All Hardware', href: '/hardware', description: 'Complete hardware overview' },
        ],
      },
    ],
  },
  {
    label: 'Research',
    href: '/research',
    children: [
      {
        title: 'Domains',
        items: [
          { label: 'Quantum Hardware', href: '/research#hardware', description: 'Physical quantum systems' },
          { label: 'Quantum Software', href: '/research#software', description: 'Algorithms and frameworks' },
          { label: 'Quantum AI', href: '/ai-quantum', description: 'Hybrid intelligence research' },
          { label: 'Quantum Materials', href: '/materials', description: 'Advanced quantum materials' },
        ],
      },
      {
        title: 'Infrastructure',
        items: [
          { label: 'Quantum Network', href: '/network', description: 'Entanglement distribution & quantum internet', badge: 'NEW' },
          { label: 'High Performance Computing', href: '/hpc', description: 'Classical-quantum hybrid compute' },
          { label: 'Quantum Sensing', href: '/sensing', description: 'Precision measurement systems' },
          { label: 'Applications', href: '/applications', description: 'Real-world quantum applications' },
        ],
      },
    ],
  },
  {
    label: 'Labs',
    href: '/labs',
    children: [
      {
        title: 'Interactive Laboratories',
        items: [
          { label: 'Cryogenic Quantum Lab', href: '/labs/cryogenic', description: 'Explore dilution refrigerator systems', badge: 'NEW' },
          { label: 'Quantum Photonics Lab', href: '/labs/photonics', description: 'Interactive photon experiments', badge: 'NEW' },
          { label: 'Research Campus', href: '/campus', description: 'Virtual quantum research facility' },
        ],
      },
    ],
  },
  {
    label: 'AI + Quantum',
    href: '/ai-quantum',
  },
  {
    label: 'Quantum Security',
    href: '/security',
    children: [
      {
        title: 'Cybersecurity',
        items: [
          { label: 'Post-Quantum Cryptography', href: '/security#pqc', description: 'Quantum-resistant algorithms' },
          { label: 'Quantum Key Distribution', href: '/security#qkd', description: 'Physics-based key exchange' },
          { label: 'Quantum Cryptography', href: '/cryptography', description: 'Interactive Alice-Bob-Eve demo' },
        ],
      },
    ],
  },
  {
    label: 'Simulator',
    href: '/simulator',
  },
  {
    label: 'Knowledge',
    href: '/knowledge',
  },
  {
    label: 'Collaborate',
    href: '/collaborate',
  },
];
