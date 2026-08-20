import { NavItem } from '@/types';

export const navigationData: NavItem[] = [
  {
    label: 'Home',
    href: '/',
  },
  {
    label: 'About & Leadership',
    href: '/about',
    children: [
      {
        title: 'Organization',
        items: [
          { label: 'Mission & Vision', href: '/about#mission', description: 'Our scientific purpose and direction' },
          { label: 'Founder & Director', href: '/about#founder', description: 'Dipak S. Dahifale — Cyber Security & Quantum Focus', badge: 'ACTIVE' },
          { label: 'Computing Evolution', href: '/about#timeline', description: 'From classical to fault-tolerant quantum machines' },
          { label: 'Scientific Philosophy', href: '/about#philosophy', description: 'Rigorous empirical standards' },
        ],
      },
      {
        title: 'Strategy & Governance',
        items: [
          { label: 'Technology Roadmap', href: '/roadmap', description: 'Multi-phase quantum progression plan', badge: 'ACTIVE' },
          { label: 'Research Ethics', href: '/about#ethics', description: 'Quantum responsibility & zero-trust posture' },
        ],
      },
    ],
  },
  {
    label: 'Quantum Machines',
    href: '/quantum-machines',
    children: [
      {
        title: 'Fundamentals & Physics',
        items: [
          { label: 'Qubits & Gates', href: '/quantum-machines#qubits', description: 'Fundamental units & unitary transformations' },
          { label: 'Superposition & Entanglement', href: '/quantum-machines#superposition', description: 'Quantum mechanical state spaces' },
          { label: 'Measurement & Tomography', href: '/quantum-machines#measurement', description: 'Wavefunction collapse & state verification' },
          { label: 'Error Correction', href: '/quantum-machines#error-correction', description: 'Surface codes & fault-tolerant thresholds', badge: 'RESEARCH' },
        ],
      },
      {
        title: 'Physical Architecture',
        items: [
          { label: 'Superconducting Qubits', href: '/hardware#superconducting', description: 'Josephson junction transmon circuits' },
          { label: 'Cryogenic Processor Chamber', href: '/hardware#cryogenics', description: '15 millikelvin vacuum dilution stages' },
          { label: 'Trapped Ions & Photonics', href: '/hardware#modalities', description: 'Alternative quantum computational modalities' },
          { label: 'Hardware Overview', href: '/hardware', description: 'Comprehensive physical stack specifications' },
        ],
      },
    ],
  },
  {
    label: 'Research Domains',
    href: '/research',
    children: [
      {
        title: 'Publications & Papers',
        items: [
          { label: 'Research Papers & Thesis', href: '/research#papers', description: 'Peer-level monographs, derivations & reports', badge: 'NEW' },
          { label: 'AI + Quantum', href: '/ai-quantum', description: 'Hybrid quantum-classical intelligence & QML', badge: 'ACTIVE' },
          { label: 'Quantum Algorithms', href: '/simulator', description: 'Shor, Grover, VQE, QAOA & HHL formulations' },
          { label: 'HPC Supercomputing', href: '/ai-quantum#hpc', description: 'Classical simulation & co-processing fabrics' },
        ],
      },
      {
        title: 'Distributed Systems',
        items: [
          { label: 'Quantum Network', href: '/network', description: 'Entanglement distribution & quantum internet', badge: 'NEW' },
          { label: 'Quantum Photonics', href: '/labs/photonics', description: 'Single photon sources & waveguide circuits' },
          { label: 'Quantum Sensing', href: '/knowledge', description: 'Precision metrology & magnetometry' },
        ],
      },
    ],
  },
  {
    label: 'Laboratories',
    href: '/labs',
    children: [
      {
        title: 'Interactive Facilities',
        items: [
          { label: 'Cryogenic Quantum Lab', href: '/labs/cryogenic', description: 'Interactive dilution refrigerator inspection', badge: 'NEW' },
          { label: 'Quantum Photonics Lab', href: '/labs/photonics', description: 'Interactive optical table & photon experiments', badge: 'NEW' },
          { label: 'Research Campus Blueprint', href: '/campus', description: '11-Facility virtual research campus map', badge: 'CONCEPT' },
          { label: 'All Laboratory Spaces', href: '/labs', description: 'Cleanroom, RF testing & fabrication bays' },
        ],
      },
    ],
  },
  {
    label: 'Quantum Security',
    href: '/security',
    children: [
      {
        title: 'Defense & Cryptography',
        items: [
          { label: 'Post-Quantum Cryptography', href: '/security#pqc', description: 'Lattice-based ML-KEM & ML-DSA standards', badge: 'ACTIVE' },
          { label: 'Quantum Key Distribution', href: '/security#qkd', description: 'Physics-guaranteed key exchange' },
          { label: 'Interactive QKD BB84 Demo', href: '/cryptography', description: 'Simulated Alice-Bob-Eve photon channel', badge: 'NEW' },
          { label: 'Zero-Trust Architecture', href: '/security#zerotrust', description: 'Quantum-resilient system defense' },
        ],
      },
    ],
  },
  {
    label: 'Simulator',
    href: '/simulator',
    badge: 'NEW',
  },
  {
    label: 'Knowledge Library',
    href: '/knowledge',
  },
  {
    label: 'Roadmap',
    href: '/roadmap',
  },
  {
    label: 'Collaborate',
    href: '/collaborate',
  },
];
