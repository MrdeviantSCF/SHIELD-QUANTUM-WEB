'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import {
  Network,
  Share2,
  Radio,
  Layers,
  ShieldCheck,
  Zap,
  Globe,
  ArrowRight,
  Activity,
  Server,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Section, SectionHeader, GlassCard, Badge, Button } from '@/components/ui';

/* ═══════════════════════════════════════════════════════
   SHIELD QUANTUM NETWORK ARCHITECTURE
   Distributed Entanglement & Quantum Internet Infrastructure
   ═══════════════════════════════════════════════════════ */

interface QuantumNode {
  id: string;
  name: string;
  code: string;
  type: 'CORE_QPU' | 'REPEATER' | 'SATELLITE_DOWNLINK' | 'OPTICAL_GATEWAY' | 'CRYOGENIC_HUB';
  x: number; // SVG coordinate %
  y: number;
  memoryType: string;
  coherenceTime: string;
  fidelity: number;
  pairsPerSec: number;
  connectedTo: string[];
  status: 'ONLINE' | 'SYNCHRONIZING' | 'SWAPPING' | 'CALIBRATING';
  description: string;
  specifications: {
    transduction: string;
    operatingTemp: string;
    qubitCapacity: number;
    errorRate: string;
  };
}

interface QuantumLink {
  id: string;
  source: string;
  target: string;
  medium: 'FIBER_DARK' | 'FREE_SPACE_LASER' | 'SATELLITE_LINK';
  distanceKm: number;
  attenuationDb: number;
  bellFidelity: number;
  activeRate: string;
}

const networkNodes: QuantumNode[] = [
  {
    id: 'node-shield-core',
    name: 'SHIELD Core QPU Cluster',
    code: 'QNET-BOS-01',
    type: 'CORE_QPU',
    x: 22,
    y: 36,
    memoryType: 'Diamond NV Center + Superconducting Cavity',
    coherenceTime: '1.42 s',
    fidelity: 0.994,
    pairsPerSec: 12400,
    connectedTo: ['node-ny-gw', 'node-zurich-cryo', 'node-leo-sat1'],
    status: 'ONLINE',
    description: 'Primary computational node housing multi-dilution refrigerator cluster with microwave-to-optical quantum transducers for high-speed entanglement generation.',
    specifications: {
      transduction: 'Electro-Optomechanical (1550nm to 5.2GHz)',
      operatingTemp: '15 mK / Room Temp Interface',
      qubitCapacity: 64,
      errorRate: '0.12%',
    },
  },
  {
    id: 'node-ny-gw',
    name: 'Atlantic Optical Gateway',
    code: 'QNET-NYC-02',
    type: 'OPTICAL_GATEWAY',
    x: 26,
    y: 46,
    memoryType: 'Rare-Earth Doped Crystal (Eu³⁺:Y₂SiO₅)',
    coherenceTime: '820 ms',
    fidelity: 0.988,
    pairsPerSec: 8900,
    connectedTo: ['node-shield-core', 'node-london-gw', 'node-geneva-rep'],
    status: 'ONLINE',
    description: 'High-bandwidth telecom-band quantum interface multiplexing 64 frequency channels into dedicated submarine dark fiber conduits.',
    specifications: {
      transduction: 'Direct 1550 nm Telecom C-Band',
      operatingTemp: '3.2 K',
      qubitCapacity: 32,
      errorRate: '0.24%',
    },
  },
  {
    id: 'node-london-gw',
    name: 'London Quantum Transit Node',
    code: 'QNET-LON-01',
    type: 'OPTICAL_GATEWAY',
    x: 48,
    y: 32,
    memoryType: 'Trapped Ytterbium Ions (¹⁷¹Yb⁺)',
    coherenceTime: '3.10 s',
    fidelity: 0.991,
    pairsPerSec: 9600,
    connectedTo: ['node-ny-gw', 'node-geneva-rep', 'node-zurich-cryo'],
    status: 'ONLINE',
    description: 'European hub routing entangled photon pairs across terrestrial fiber backbones and inter-datacenter quantum key distribution rings.',
    specifications: {
      transduction: 'Ion-Cavity QED (369nm to 1550nm)',
      operatingTemp: 'Room Temp (Ion Trap UHV)',
      qubitCapacity: 48,
      errorRate: '0.18%',
    },
  },
  {
    id: 'node-geneva-rep',
    name: 'Geneva Entanglement Repeater Station',
    code: 'QNET-GVA-REP',
    type: 'REPEATER',
    x: 52,
    y: 42,
    memoryType: 'Optically Addressable Silicon-Vacancy (SiV)',
    coherenceTime: '550 ms',
    fidelity: 0.985,
    pairsPerSec: 14200,
    connectedTo: ['node-ny-gw', 'node-london-gw', 'node-zurich-cryo', 'node-tokyo-node'],
    status: 'SWAPPING',
    description: 'Automated Bell-State Measurement (BSM) repeater station performing real-time entanglement swapping across multi-hop links without classical decoherence.',
    specifications: {
      transduction: 'Nanophotonic Cavity Integrated',
      operatingTemp: '100 mK',
      qubitCapacity: 16,
      errorRate: '0.31%',
    },
  },
  {
    id: 'node-zurich-cryo',
    name: 'Zurich Cryogenic Quantum Lab Node',
    code: 'QNET-ZUR-03',
    type: 'CRYOGENIC_HUB',
    x: 56,
    y: 34,
    memoryType: 'Hybrid Superconducting Resonator + NV Center',
    coherenceTime: '1.85 s',
    fidelity: 0.995,
    pairsPerSec: 11800,
    connectedTo: ['node-shield-core', 'node-london-gw', 'node-geneva-rep', 'node-leo-sat1'],
    status: 'ONLINE',
    description: 'High-precision research terminal linking cryogenic superconducting processors to international quantum research testbeds.',
    specifications: {
      transduction: 'Piezo-Optomechanical Waveguide',
      operatingTemp: '12 mK',
      qubitCapacity: 80,
      errorRate: '0.09%',
    },
  },
  {
    id: 'node-tokyo-node',
    name: 'Tokyo Photonics Quantum Terminal',
    code: 'QNET-TYO-01',
    type: 'OPTICAL_GATEWAY',
    x: 82,
    y: 44,
    memoryType: 'Neutral Rubidium Atom Ensemble (⁸⁷Rb)',
    coherenceTime: '980 ms',
    fidelity: 0.987,
    pairsPerSec: 7400,
    connectedTo: ['node-geneva-rep', 'node-leo-sat1'],
    status: 'ONLINE',
    description: 'Trans-Pacific quantum terminal utilizing single-photon detectors (SNSPD) and space-to-ground quantum optical receiver systems.',
    specifications: {
      transduction: 'Electromagnetically Induced Transparency (EIT)',
      operatingTemp: 'Magneto-Optical Trap (MOT)',
      qubitCapacity: 24,
      errorRate: '0.22%',
    },
  },
  {
    id: 'node-leo-sat1',
    name: 'SHIELD-LEO-1 Quantum Satellite Downlink',
    code: 'QSAT-ORB-01',
    type: 'SATELLITE_DOWNLINK',
    x: 50,
    y: 14,
    memoryType: 'Space-Hardened Polarization Entanglement Source',
    coherenceTime: 'Free-space flight',
    fidelity: 0.981,
    pairsPerSec: 5200,
    connectedTo: ['node-shield-core', 'node-zurich-cryo', 'node-tokyo-node'],
    status: 'SYNCHRONIZING',
    description: 'Low-Earth Orbit satellite payload generating entangled photon pairs via SPDC, beaming polarized qubits to optical ground stations globally.',
    specifications: {
      transduction: '810 nm / 1550 nm Dual Optical Telescope',
      operatingTemp: 'Passive Space Radiator',
      qubitCapacity: 8,
      errorRate: '0.45%',
    },
  },
];

const networkLinks: QuantumLink[] = [
  { id: 'link-1', source: 'node-shield-core', target: 'node-ny-gw', medium: 'FIBER_DARK', distanceKm: 340, attenuationDb: 68, bellFidelity: 0.992, activeRate: '12.4 kPairs/s' },
  { id: 'link-2', source: 'node-ny-gw', target: 'node-london-gw', medium: 'FIBER_DARK', distanceKm: 5570, attenuationDb: 1114, bellFidelity: 0.978, activeRate: '4.8 kPairs/s' },
  { id: 'link-3', source: 'node-london-gw', target: 'node-geneva-rep', medium: 'FIBER_DARK', distanceKm: 750, attenuationDb: 150, bellFidelity: 0.989, activeRate: '9.2 kPairs/s' },
  { id: 'link-4', source: 'node-london-gw', target: 'node-zurich-cryo', medium: 'FIBER_DARK', distanceKm: 780, attenuationDb: 156, bellFidelity: 0.991, activeRate: '8.9 kPairs/s' },
  { id: 'link-5', source: 'node-geneva-rep', target: 'node-zurich-cryo', medium: 'FIBER_DARK', distanceKm: 230, attenuationDb: 46, bellFidelity: 0.996, activeRate: '14.2 kPairs/s' },
  { id: 'link-6', source: 'node-geneva-rep', target: 'node-tokyo-node', medium: 'FIBER_DARK', distanceKm: 9800, attenuationDb: 1960, bellFidelity: 0.972, activeRate: '3.1 kPairs/s' },
  { id: 'link-7', source: 'node-shield-core', target: 'node-zurich-cryo', medium: 'FIBER_DARK', distanceKm: 6100, attenuationDb: 1220, bellFidelity: 0.980, activeRate: '5.2 kPairs/s' },
  { id: 'link-8', source: 'node-shield-core', target: 'node-leo-sat1', medium: 'SATELLITE_LINK', distanceKm: 600, attenuationDb: 32, bellFidelity: 0.983, activeRate: '5.2 kPairs/s' },
  { id: 'link-9', source: 'node-zurich-cryo', target: 'node-leo-sat1', medium: 'SATELLITE_LINK', distanceKm: 550, attenuationDb: 29, bellFidelity: 0.985, activeRate: '5.2 kPairs/s' },
  { id: 'link-10', source: 'node-tokyo-node', target: 'node-leo-sat1', medium: 'SATELLITE_LINK', distanceKm: 700, attenuationDb: 35, bellFidelity: 0.979, activeRate: '4.7 kPairs/s' },
];

/* ———————————————————————————————————————————————————————
   Quantum Internet Protocol Stack (5 Layers)
   ——————————————————————————————————————————————————————— */

interface StackLayer {
  number: number;
  name: string;
  shortName: string;
  focus: string;
  functions: string[];
  analogousTo: string;
  color: string;
  textColor: string;
  borderColor: string;
}

const stackLayers: StackLayer[] = [
  {
    number: 5,
    name: 'Quantum Application & Services Layer',
    shortName: 'Layer 5: Application',
    focus: 'End-user quantum workflows, distributed computing algorithms, secure communication protocols.',
    functions: [
      'Blind Quantum Computing (privacy-preserving cloud execution)',
      'Quantum Key Distribution (QKD) key management and OTP encryption',
      'Distributed QPU Clustered Algorithms (Distributed VQE, Quantum Phase Estimation)',
      'Clock Synchronization & Long-Baseline Interferometry (Quantum VLBI)',
    ],
    analogousTo: 'OSI Application / Presentation (HTTP, TLS)',
    color: 'bg-quantum-violet/10',
    textColor: 'text-quantum-violet',
    borderColor: 'border-quantum-violet/30',
  },
  {
    number: 4,
    name: 'End-to-End Quantum Transport Layer',
    shortName: 'Layer 4: Transport',
    focus: 'Reliable transmission of arbitrary unknown quantum states (|ψ⟩) between distant endpoints.',
    functions: [
      'Quantum State Teleportation pipeline management',
      'Quantum error detection & syndrome feedback',
      'Qubit stream multiplexing and multi-user queueing',
      'Fidelity tracking and state re-purification triggers',
    ],
    analogousTo: 'OSI Transport (TCP / QUIC)',
    color: 'bg-photon-cyan/10',
    textColor: 'text-photon-cyan',
    borderColor: 'border-photon-cyan/30',
  },
  {
    number: 3,
    name: 'Quantum Routing & Repeater Layer',
    shortName: 'Layer 3: Network / Routing',
    focus: 'Multi-hop entanglement swapping, path finding through repeater chains, and memory allocation.',
    functions: [
      'Automated Bell-State Measurement (BSM) scheduling',
      'Quantum routing table updates based on link fidelity & latency',
      'Quantum memory read/write synchronization across nodes',
      'Path reservation with dynamic detour routing on link degradation',
    ],
    analogousTo: 'OSI Network (IP, BGP)',
    color: 'bg-quantum-emerald/10',
    textColor: 'text-quantum-emerald',
    borderColor: 'border-quantum-emerald/30',
  },
  {
    number: 2,
    name: 'Entanglement Link & Purification Layer',
    shortName: 'Layer 2: Data Link',
    focus: 'Creating heralded Bell pairs between directly adjacent physical quantum nodes.',
    functions: [
      'Heralded single-photon and two-photon entanglement generation',
      'Entanglement purification protocols (DEJMPS, BBPSSW)',
      'Link-level error acknowledgment and photon loss retry',
      'Phase drift compensation and polarization tracking',
    ],
    analogousTo: 'OSI Data Link (Ethernet, MAC)',
    color: 'bg-energy-amber/10',
    textColor: 'text-energy-amber',
    borderColor: 'border-energy-amber/30',
  },
  {
    number: 1,
    name: 'Physical Quantum Channel Layer',
    shortName: 'Layer 1: Physical',
    focus: 'Physical transmission of photons and quantum state transduction.',
    functions: [
      'Single-photon & entangled pair emission (SPDC, Quantum Dots)',
      'Low-loss single-mode optical fiber conduits (1550 nm Telecom C-band)',
      'Free-space optical satellite telescopes & adaptive optics',
      'Superconducting Nanowire Single-Photon Detectors (SNSPD)',
    ],
    analogousTo: 'OSI Physical (Optical Fiber, Radio, PHY)',
    color: 'bg-quantum-blue/10',
    textColor: 'text-quantum-blue',
    borderColor: 'border-quantum-blue/30',
  },
];

/* ———————————————————————————————————————————————————————
   Entanglement Swapping Protocol Steps
   ——————————————————————————————————————————————————————— */

const swappingSteps = [
  {
    step: 1,
    title: 'Independent Bell Pair Generation',
    desc: 'Station A creates entangled pair (A₁, A₂) and Station B creates pair (B₁, B₂). Photons A₂ and B₁ are transmitted over fiber to central Repeater R.',
    state: '|Φ⁺⟩_{A₁A₂} ⊗ |Φ⁺⟩_{B₁B₂}',
    action: 'Dual SPDC photon emission',
  },
  {
    step: 2,
    title: 'Joint Bell-State Measurement (BSM)',
    desc: 'At Repeater R, photons A₂ and B₁ interfere on a 50:50 beam splitter. Simultaneous single-photon detection projects them onto one of 4 Bell states.',
    state: 'BSM on (A₂, B₁) → Outcome: |Ψ⁺⟩',
    action: 'Coincidence photon detection at R',
  },
  {
    step: 3,
    title: 'Classical Feed-Forward Signal',
    desc: 'Repeater R sends 2 classical bits indicating the BSM outcome over classical internet to Station B.',
    state: 'Classical bits: [0, 1] transmitted at speed of light',
    action: 'Fast optical FPGA feed-forward',
  },
  {
    step: 4,
    title: 'Local Unitary Correction & Entanglement Finalization',
    desc: 'Station B applies a Pauli correction (I, X, Y, or Z) to photon B₂ based on the classical message. Now A₁ and B₂ are maximally entangled across the full distance.',
    state: 'Final State: |Φ⁺⟩_{A₁B₂} = (|00⟩ + |11⟩)/√2',
    action: 'End-to-end entanglement ready for teleportation',
  },
];

/* ═══════════════════════════════════════════════════════
   Page Component
   ═══════════════════════════════════════════════════════ */

export default function QuantumNetworkPage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>('node-shield-core');
  const [activeTab, setActiveTab] = useState<'MAP' | 'STACK' | 'SWAPPING' | 'TRANSDUCTION'>('MAP');
  const [activeLayer, setActiveLayer] = useState<number>(5);
  const [selectedSwappingStep, setSelectedSwappingStep] = useState<number>(1);
  const [simulationRunning, setSimulationRunning] = useState<boolean>(false);
  const [simulationLog, setSimulationLog] = useState<string[]>([]);
  const [routeSource, setRouteSource] = useState<string>('node-shield-core');
  const [routeDest, setRouteDest] = useState<string>('node-tokyo-node');

  const activeNode = useMemo(
    () => networkNodes.find((n) => n.id === selectedNodeId) || networkNodes[0],
    [selectedNodeId]
  );

  const startSimulation = () => {
    if (simulationRunning) return;
    setSimulationRunning(true);
    setSimulationLog(['[INIT] Quantum routing pipeline initialized...']);

    const sourceNode = networkNodes.find((n) => n.id === routeSource)?.name || 'Source';
    const destNode = networkNodes.find((n) => n.id === routeDest)?.name || 'Destination';

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        `[HERALD] Establishing physical link heralds: ${sourceNode} ↔ Repeaters`,
      ]);
    }, 500);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        `[MEMORY] Storing quantum state in rare-earth crystal memories (coherence margin > 92%)...`,
      ]);
    }, 1100);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        `[BSM] Bell-state measurement executed at Geneva Repeater. Outcome: |Ψ⁻⟩.`,
      ]);
    }, 1700);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        `[FEED-FORWARD] 2 classical correction bits sent to ${destNode}. Pauli-Z rotation applied.`,
      ]);
    }, 2300);

    setTimeout(() => {
      setSimulationLog((prev) => [
        ...prev,
        `[SUCCESS] End-to-end Bell pair established: ${sourceNode} ⇄ ${destNode} (Fidelity: 98.4%)`,
      ]);
      setSimulationRunning(false);
    }, 2900);
  };

  return (
    <>
      {/* Hero Section */}
      <Section fullHeight className="pt-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-center gap-2 mb-6">
              <Badge variant="cyan">Quantum Communication &amp; Internet</Badge>
              <Badge variant="violet">Distributed Entanglement</Badge>
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Quantum{' '}
              <span className="bg-gradient-to-r from-photon-cyan via-quantum-violet to-quantum-emerald bg-clip-text text-transparent">
                Network Architecture
              </span>
            </h1>
            <p className="mt-6 text-base sm:text-lg text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Engineering the world&apos;s next computational backbone: long-distance entanglement distribution,
              quantum repeaters, optical-to-microwave transducers, and secure quantum internet protocols.
            </p>
          </motion.div>

          {/* Quick Metrics Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto"
          >
            {[
              { label: 'Active Quantum Nodes', value: '7 Primary', sub: 'Terrestrial & Space' },
              { label: 'Max Entanglement Rate', value: '14.2 kEPR/s', sub: 'Telecom C-Band' },
              { label: 'Average Bell Fidelity', value: '98.9%', sub: 'State Tomography' },
              { label: 'Protocol Stack', value: '5 Layers', sub: 'Quantum ISO Compliant' },
            ].map((stat, i) => (
              <GlassCard key={i} className="p-4 text-center">
                <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted">{stat.label}</span>
                <div className="text-lg font-bold font-mono text-photon-cyan mt-1">{stat.value}</div>
                <span className="text-[9px] font-mono text-text-muted">{stat.sub}</span>
              </GlassCard>
            ))}
          </motion.div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* Navigation Tab Bar */}
      <Section id="network-explorer" className="py-8">
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {[
            { id: 'MAP', label: 'Global Topology Map', icon: Network },
            { id: 'STACK', label: '5-Layer Protocol Stack', icon: Layers },
            { id: 'SWAPPING', label: 'Entanglement Swapping', icon: Share2 },
            { id: 'TRANSDUCTION', label: 'Quantum Transduction', icon: Radio },
          ].map((tab) => {
            const Icon = tab.icon;
            const isCurrent = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-5 py-2.5 text-xs font-mono tracking-wider uppercase border rounded-md transition-all duration-200 ${
                  isCurrent
                    ? 'bg-photon-cyan/15 text-photon-cyan border-photon-cyan/40 shadow-[0_0_15px_rgba(0,212,255,0.15)] font-bold'
                    : 'bg-white/[0.02] text-text-muted border-white/[0.06] hover:text-text-secondary hover:border-white/15'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Global Topology Map */}
        {activeTab === 'MAP' && (
          <div>
            <SectionHeader
              label="Mesh Topology"
              title="Global Quantum Mesh &amp; Node Telemetry"
              description="Inspect active optical fiber routes, satellite downlinks, and real-time quantum node parameters across the SHIELD testbed."
            />

            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* SVG Map Visualization */}
              <div className="lg:col-span-8">
                <GlassCard className="p-4 relative aspect-[16/10] overflow-hidden flex flex-col justify-between">
                  <div
                    className="absolute inset-0 opacity-20 pointer-events-none"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle at 1px 1px, rgba(0, 212, 255, 0.2) 1px, transparent 0)',
                      backgroundSize: '24px 24px',
                    }}
                  />

                  {/* Header HUD */}
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-quantum-emerald animate-pulse" />
                      <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
                        Q-MESH LIVE TOPOLOGY // C-BAND OPTICAL &amp; SATELLITE
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-photon-cyan/80">
                      7 NODES // 10 ACTIVE QUANTUM LINKS
                    </span>
                  </div>

                  {/* SVG Diagram Canvas */}
                  <svg viewBox="0 0 100 65" className="w-full h-full relative z-10 my-auto">
                    <defs>
                      <linearGradient id="fiberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.8" />
                      </linearGradient>
                      <linearGradient id="satGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                        <stop offset="100%" stopColor="#00d4ff" stopOpacity="0.7" />
                      </linearGradient>
                      <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                        <feGaussianBlur stdDeviation="0.8" result="blur" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                      </filter>
                    </defs>

                    {/* Quantum Links (Lines) */}
                    {networkLinks.map((link) => {
                      const src = networkNodes.find((n) => n.id === link.source);
                      const tgt = networkNodes.find((n) => n.id === link.target);
                      if (!src || !tgt) return null;

                      const isSelectedLink =
                        selectedNodeId === src.id || selectedNodeId === tgt.id;
                      const isSat = link.medium === 'SATELLITE_LINK';

                      return (
                        <g key={link.id}>
                          <line
                            x1={src.x}
                            y1={src.y}
                            x2={tgt.x}
                            y2={tgt.y}
                            stroke={isSat ? 'url(#satGrad)' : 'url(#fiberGrad)'}
                            strokeWidth={isSelectedLink ? '0.7' : '0.35'}
                            strokeDasharray={isSat ? '1.2 0.8' : 'none'}
                            strokeOpacity={isSelectedLink ? 0.9 : 0.4}
                            filter={isSelectedLink ? 'url(#glow)' : undefined}
                            className="transition-all duration-300"
                          />
                          {/* Flow animation indicator */}
                          <circle r={isSelectedLink ? '0.6' : '0.4'} fill={isSat ? '#f59e0b' : '#00d4ff'}>
                            <animateMotion
                              path={`M ${src.x} ${src.y} L ${tgt.x} ${tgt.y}`}
                              dur={`${Math.max(2, link.distanceKm / 1200)}s`}
                              repeatCount="indefinite"
                            />
                          </circle>
                        </g>
                      );
                    })}

                    {/* Quantum Nodes (Points) */}
                    {networkNodes.map((node) => {
                      const isSelected = selectedNodeId === node.id;
                      const isSatellite = node.type === 'SATELLITE_DOWNLINK';
                      const nodeColor =
                        node.type === 'CORE_QPU'
                          ? '#00d4ff'
                          : node.type === 'REPEATER'
                          ? '#10b981'
                          : node.type === 'SATELLITE_DOWNLINK'
                          ? '#f59e0b'
                          : node.type === 'CRYOGENIC_HUB'
                          ? '#7c3aed'
                          : '#38bdf8';

                      return (
                        <g
                          key={node.id}
                          className="cursor-pointer group"
                          onClick={() => setSelectedNodeId(node.id)}
                        >
                          {isSelected && (
                            <circle
                              cx={node.x}
                              y={node.y}
                              r="3.5"
                              fill="none"
                              stroke={nodeColor}
                              strokeWidth="0.3"
                              strokeDasharray="1 0.8"
                              className="animate-spin-slow"
                            />
                          )}

                          <circle
                            cx={node.x}
                            y={node.y}
                            r={isSelected ? '2.4' : '1.8'}
                            fill={nodeColor}
                            fillOpacity={isSelected ? 0.35 : 0.15}
                            stroke={nodeColor}
                            strokeWidth="0.4"
                            className="transition-all duration-200 group-hover:scale-125"
                          />

                          <circle cx={node.x} cy={node.y} r="0.8" fill={nodeColor} filter="url(#glow)" />

                          <text
                            x={node.x}
                            y={node.y + (isSatellite ? -2.2 : 3.2)}
                            textAnchor="middle"
                            fill={isSelected ? '#e2e8f0' : 'rgba(226, 232, 240, 0.65)'}
                            fontSize="1.6"
                            fontFamily="monospace"
                            fontWeight={isSelected ? 'bold' : 'normal'}
                            className="pointer-events-none select-none tracking-wider"
                          >
                            {node.code}
                          </text>
                        </g>
                      );
                    })}
                  </svg>

                  {/* Legend Footer */}
                  <div className="relative z-10 pt-2 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-text-muted">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-0.5 bg-photon-cyan" /> Terrestrial Dark Fiber
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-2 h-0.5 bg-energy-amber border-b border-dashed" /> Satellite Laser Link
                      </span>
                    </div>
                    <span className="text-text-secondary">Click any node to inspect telemetry &amp; routing table</span>
                  </div>
                </GlassCard>
              </div>

              {/* Node Inspector Panel */}
              <div className="lg:col-span-4 flex flex-col gap-4">
                <GlassCard className="p-6 flex-1 flex flex-col justify-between border-photon-cyan/20">
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <Badge
                        variant={
                          activeNode.type === 'CORE_QPU'
                            ? 'cyan'
                            : activeNode.type === 'REPEATER'
                            ? 'emerald'
                            : activeNode.type === 'SATELLITE_DOWNLINK'
                            ? 'amber'
                            : 'violet'
                        }
                      >
                        {activeNode.type.replace('_', ' ')}
                      </Badge>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-quantum-emerald" />
                        <span className="text-[10px] font-mono text-quantum-emerald font-semibold">
                          {activeNode.status}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-text-primary leading-tight">
                      {activeNode.name}
                    </h3>
                    <p className="text-xs font-mono text-photon-cyan mt-0.5">{activeNode.code}</p>

                    <p className="mt-3 text-xs text-text-secondary leading-relaxed">
                      {activeNode.description}
                    </p>

                    <div className="mt-5 space-y-3 pt-4 border-t border-white/[0.06]">
                      <div className="grid grid-cols-2 gap-2 text-[11px] font-mono">
                        <div className="bg-white/[0.02] p-2 rounded border border-white/[0.04]">
                          <span className="text-text-muted block text-[9px] uppercase">Memory Coherence</span>
                          <span className="text-photon-cyan font-bold">{activeNode.coherenceTime}</span>
                        </div>
                        <div className="bg-white/[0.02] p-2 rounded border border-white/[0.04]">
                          <span className="text-text-muted block text-[9px] uppercase">Bell Fidelity</span>
                          <span className="text-quantum-emerald font-bold">
                            {(activeNode.fidelity * 100).toFixed(2)}%
                          </span>
                        </div>
                        <div className="bg-white/[0.02] p-2 rounded border border-white/[0.04]">
                          <span className="text-text-muted block text-[9px] uppercase">EPR Pair Rate</span>
                          <span className="text-quantum-violet font-bold">
                            {activeNode.pairsPerSec.toLocaleString()} pairs/s
                          </span>
                        </div>
                        <div className="bg-white/[0.02] p-2 rounded border border-white/[0.04]">
                          <span className="text-text-muted block text-[9px] uppercase">Qubit Register</span>
                          <span className="text-text-primary font-bold">
                            {activeNode.specifications.qubitCapacity} Qubits
                          </span>
                        </div>
                      </div>

                      <div className="text-[10px] font-mono space-y-1 bg-deep-space/40 p-2.5 rounded border border-white/[0.04]">
                        <div>
                          <span className="text-text-muted">Memory System: </span>
                          <span className="text-text-secondary">{activeNode.memoryType}</span>
                        </div>
                        <div>
                          <span className="text-text-muted">Transduction: </span>
                          <span className="text-text-secondary">{activeNode.specifications.transduction}</span>
                        </div>
                        <div>
                          <span className="text-text-muted">Environment: </span>
                          <span className="text-text-secondary">{activeNode.specifications.operatingTemp}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-white/[0.06]">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-text-muted block mb-2">
                      Connected Channels ({activeNode.connectedTo.length})
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {activeNode.connectedTo.map((targetId) => {
                        const target = networkNodes.find((n) => n.id === targetId);
                        return (
                          <button
                            key={targetId}
                            onClick={() => setSelectedNodeId(targetId)}
                            className="px-2 py-1 bg-white/[0.04] hover:bg-photon-cyan/15 hover:text-photon-cyan text-[10px] font-mono rounded border border-white/[0.08] transition-colors"
                          >
                            → {target?.code || targetId}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>

            {/* Interactive End-to-End Entanglement Swapping Tester */}
            <div className="max-w-6xl mx-auto mt-8">
              <GlassCard className="p-6">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <div>
                    <h4 className="text-sm font-mono font-semibold uppercase tracking-wider text-photon-cyan flex items-center gap-2">
                      <Zap className="w-4 h-4" /> Live Quantum Path Simulator
                    </h4>
                    <p className="text-xs text-text-secondary mt-1">
                      Execute a simulated entanglement swapping and quantum state teleportation cycle between two nodes.
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-text-muted">From:</span>
                      <select
                        value={routeSource}
                        onChange={(e) => setRouteSource(e.target.value)}
                        className="bg-deep-space border border-white/10 rounded px-2.5 py-1 text-photon-cyan text-xs font-mono focus:outline-none focus:border-photon-cyan"
                      >
                        {networkNodes.map((n) => (
                          <option key={n.id} value={n.id}>
                            {n.code} ({n.name.split(' ')[0]})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex items-center gap-2 text-xs font-mono">
                      <span className="text-text-muted">To:</span>
                      <select
                        value={routeDest}
                        onChange={(e) => setRouteDest(e.target.value)}
                        className="bg-deep-space border border-white/10 rounded px-2.5 py-1 text-quantum-violet text-xs font-mono focus:outline-none focus:border-quantum-violet"
                      >
                        {networkNodes
                          .filter((n) => n.id !== routeSource)
                          .map((n) => (
                            <option key={n.id} value={n.id}>
                              {n.code} ({n.name.split(' ')[0]})
                            </option>
                          ))}
                      </select>
                    </div>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={startSimulation}
                      disabled={simulationRunning}
                      icon={<Activity className={`w-3.5 h-3.5 ${simulationRunning ? 'animate-spin' : ''}`} />}
                    >
                      {simulationRunning ? 'Swapping In Progress...' : 'Establish Entangled Link'}
                    </Button>
                  </div>
                </div>

                {/* Simulation Telemetry Console */}
                <div className="bg-black/60 rounded-md p-3.5 border border-white/[0.08] font-mono text-[11px] min-h-[90px] flex flex-col justify-end space-y-1">
                  {simulationLog.length === 0 ? (
                    <span className="text-text-muted">
                      Ready. Click &quot;Establish Entangled Link&quot; to route Bell pairs and trigger BSM repeater logic.
                    </span>
                  ) : (
                    simulationLog.map((line, idx) => (
                      <div
                        key={idx}
                        className={
                          line.includes('[SUCCESS]')
                            ? 'text-quantum-emerald font-semibold'
                            : line.includes('[HERALD]')
                            ? 'text-photon-cyan'
                            : line.includes('[BSM]')
                            ? 'text-energy-amber'
                            : line.includes('[FEED-FORWARD]')
                            ? 'text-quantum-violet'
                            : 'text-text-secondary'
                        }
                      >
                        {line}
                      </div>
                    ))
                  )}
                </div>
              </GlassCard>
            </div>
          </div>
        )}

        {/* Tab 2: 5-Layer Protocol Stack */}
        {activeTab === 'STACK' && (
          <div>
            <SectionHeader
              label="Architecture Model"
              title="The 5-Layer Quantum Internet Protocol Stack"
              description="A systematic layered hierarchy defining quantum communications from single photons to distributed quantum cloud computing."
            />

            <div className="max-w-5xl mx-auto space-y-4">
              {stackLayers.map((layer) => {
                const isSelected = activeLayer === layer.number;
                return (
                  <motion.div
                    key={layer.number}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <GlassCard
                      hover
                      className={`p-6 cursor-pointer transition-all duration-300 ${
                        isSelected
                          ? `border-l-4 ${layer.borderColor} ${layer.color} bg-white/[0.04]`
                          : 'border-l-2 border-white/10 hover:border-white/20'
                      }`}
                      onClick={() => setActiveLayer(layer.number)}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-full border border-white/10 flex items-center justify-center font-mono text-xs font-bold ${layer.textColor} bg-deep-space`}
                          >
                            L{layer.number}
                          </span>
                          <h3 className={`text-base sm:text-lg font-semibold ${layer.textColor}`}>
                            {layer.name}
                          </h3>
                        </div>
                        <span className="text-[10px] font-mono text-text-muted bg-white/[0.03] px-2.5 py-1 rounded border border-white/[0.04] w-fit">
                          {layer.analogousTo}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-text-secondary leading-relaxed mb-4">
                        {layer.focus}
                      </p>

                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-4 border-t border-white/[0.06] grid grid-cols-1 sm:grid-cols-2 gap-2"
                        >
                          {layer.functions.map((func, i) => (
                            <div key={i} className="flex items-start gap-2 text-xs text-text-muted">
                              <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${layer.textColor}`} />
                              <span>{func}</span>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </GlassCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 3: Entanglement Swapping Visualizer */}
        {activeTab === 'SWAPPING' && (
          <div>
            <SectionHeader
              label="Physics Mechanism"
              title="Entanglement Swapping Protocol"
              description="How quantum repeaters connect two distant nodes (Alice and Bob) that have never directly interacted."
            />

            <div className="max-w-4xl mx-auto">
              {/* Protocol Visual Diagram */}
              <GlassCard className="p-8 mb-8 relative overflow-hidden">
                <div className="grid grid-cols-3 gap-4 items-center text-center relative z-10">
                  {/* Alice */}
                  <div className="p-4 rounded border border-photon-cyan/30 bg-photon-cyan/5">
                    <div className="w-12 h-12 rounded-full border-2 border-photon-cyan mx-auto mb-2 flex items-center justify-center font-bold text-photon-cyan">
                      A
                    </div>
                    <h4 className="text-sm font-semibold text-text-primary">Station Alice</h4>
                    <span className="text-[10px] font-mono text-photon-cyan">Photon A₁ (Stored)</span>
                  </div>

                  {/* Intermediate Repeater */}
                  <div className="p-4 rounded border border-quantum-emerald/30 bg-quantum-emerald/5">
                    <div className="w-12 h-12 rounded-full border-2 border-quantum-emerald mx-auto mb-2 flex items-center justify-center font-bold text-quantum-emerald">
                      R
                    </div>
                    <h4 className="text-sm font-semibold text-text-primary">Repeater Station</h4>
                    <span className="text-[10px] font-mono text-quantum-emerald">Bell-State Measurement</span>
                  </div>

                  {/* Bob */}
                  <div className="p-4 rounded border border-quantum-violet/30 bg-quantum-violet/5">
                    <div className="w-12 h-12 rounded-full border-2 border-quantum-violet mx-auto mb-2 flex items-center justify-center font-bold text-quantum-violet">
                      B
                    </div>
                    <h4 className="text-sm font-semibold text-text-primary">Station Bob</h4>
                    <span className="text-[10px] font-mono text-quantum-violet">Photon B₂ (Corrected)</span>
                  </div>
                </div>

                {/* Connection Line & States */}
                <div className="mt-8 pt-6 border-t border-white/[0.08] text-center font-mono">
                  <div className="text-xs text-text-muted uppercase tracking-wider mb-2">
                    Current Mathematical State Vector (Step {selectedSwappingStep})
                  </div>
                  <div className="text-sm font-bold text-photon-cyan bg-deep-space/80 p-3 rounded border border-white/10 inline-block">
                    {swappingSteps[selectedSwappingStep - 1].state}
                  </div>
                </div>
              </GlassCard>

              {/* Step By Step Selector */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 mb-6">
                {swappingSteps.map((s) => (
                  <button
                    key={s.step}
                    onClick={() => setSelectedSwappingStep(s.step)}
                    className={`p-3 text-left rounded border transition-all ${
                      selectedSwappingStep === s.step
                        ? 'border-photon-cyan/40 bg-photon-cyan/10'
                        : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15'
                    }`}
                  >
                    <span className="text-[10px] font-mono text-text-muted block">STEP 0{s.step}</span>
                    <span className="text-xs font-semibold text-text-primary mt-1 block">{s.title}</span>
                  </button>
                ))}
              </div>

              {/* Step Detail Explanation */}
              <GlassCard className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-base font-semibold text-text-primary">
                    Step {selectedSwappingStep}: {swappingSteps[selectedSwappingStep - 1].title}
                  </h4>
                  <Badge variant="cyan">{swappingSteps[selectedSwappingStep - 1].action}</Badge>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">
                  {swappingSteps[selectedSwappingStep - 1].desc}
                </p>
              </GlassCard>
            </div>
          </div>
        )}

        {/* Tab 4: Quantum Transduction & Microwave-to-Optical Conversion */}
        {activeTab === 'TRANSDUCTION' && (
          <div>
            <SectionHeader
              label="Physical Transduction"
              title="Microwave-to-Optical Quantum Transducers"
              description="How stationary qubits in 15 mK dilution refrigerators interface with 1550 nm infrared fiber photons for global networking."
            />

            <div className="max-w-5xl mx-auto">
              <GlassCard className="p-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Transduction Graphic */}
                  <div className="lg:col-span-7 aspect-[16/10] bg-black/80 rounded-lg p-4 border border-white/[0.08] relative">
                    <svg viewBox="0 0 360 200" className="w-full h-full">
                      {/* Left: 5 GHz Microwave Domain (Cryogenic 15 mK) */}
                      <rect x="20" y="20" width="130" height="160" rx="4" fill="rgba(0, 212, 255, 0.05)" stroke="#00d4ff" strokeWidth="1" strokeDasharray="3 2" />
                      <text x="85" y="40" textAnchor="middle" fill="#00d4ff" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        CRYOGENIC DOMAIN (15 mK)
                      </text>
                      <text x="85" y="55" textAnchor="middle" fill="rgba(0, 212, 255, 0.7)" fontSize="8" fontFamily="monospace">
                        5 GHz Microwave Qubit
                      </text>

                      {/* Microwave Waveform */}
                      <path d="M 35 100 Q 50 70, 65 100 T 95 100 T 125 100" fill="none" stroke="#00d4ff" strokeWidth="2.5" />

                      {/* Central Optomechanical Crystal Cavity */}
                      <rect x="150" y="70" width="60" height="60" rx="4" fill="rgba(245, 158, 11, 0.15)" stroke="#f59e0b" strokeWidth="1.5" />
                      <text x="180" y="95" textAnchor="middle" fill="#f59e0b" fontSize="8" fontFamily="monospace" fontWeight="bold">
                        PIEZO-OPTO
                      </text>
                      <text x="180" y="108" textAnchor="middle" fill="#f59e0b" fontSize="7" fontFamily="monospace">
                        CRYSTAL
                      </text>

                      {/* Right: 193 THz Optical Telecom Domain */}
                      <rect x="210" y="20" width="130" height="160" rx="4" fill="rgba(124, 58, 237, 0.05)" stroke="#7c3aed" strokeWidth="1" strokeDasharray="3 2" />
                      <text x="275" y="40" textAnchor="middle" fill="#7c3aed" fontSize="9" fontFamily="monospace" fontWeight="bold">
                        OPTICAL FIBER (300 K)
                      </text>
                      <text x="275" y="55" textAnchor="middle" fill="rgba(124, 58, 237, 0.7)" fontSize="8" fontFamily="monospace">
                        1550 nm Telecom C-Band
                      </text>

                      {/* Optical Pulse (Dense wave) */}
                      <path d="M 235 100 Q 242 80, 250 100 T 265 100 T 280 100 T 295 100 T 310 100 T 325 100" fill="none" stroke="#7c3aed" strokeWidth="2" />

                      {/* Conversion Arrows */}
                      <line x1="125" y1="100" x2="150" y2="100" stroke="#00d4ff" strokeWidth="1.5" />
                      <line x1="210" y1="100" x2="235" y2="100" stroke="#7c3aed" strokeWidth="1.5" />
                    </svg>
                  </div>

                  {/* Transduction Metrics */}
                  <div className="lg:col-span-5 space-y-3 font-mono text-xs">
                    <div className="p-3 bg-white/[0.02] rounded border border-white/[0.04]">
                      <span className="text-text-muted text-[10px] block">Photon Conversion Efficiency</span>
                      <span className="text-photon-cyan font-bold text-sm">η = 47.2%</span>
                    </div>
                    <div className="p-3 bg-white/[0.02] rounded border border-white/[0.04]">
                      <span className="text-text-muted text-[10px] block">Added Thermal Noise Photons</span>
                      <span className="text-quantum-emerald font-bold text-sm">N_add &lt; 0.08 quanta</span>
                    </div>
                    <div className="p-3 bg-white/[0.02] rounded border border-white/[0.04]">
                      <span className="text-text-muted text-[10px] block">Optical Fiber Loss</span>
                      <span className="text-energy-amber font-bold text-sm">0.18 dB / km (1550 nm)</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </div>
          </div>
        )}
      </Section>

      <div className="section-divider" />

      {/* Network Applications & Use Cases */}
      <Section>
        <SectionHeader
          label="Capabilities"
          title="Applications of Distributed Quantum Networks"
          description="Transformative computational, security, and scientific capabilities unlocked by the quantum internet."
        />

        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              title: 'Multi-Cryostat QPU Clustering',
              desc: 'Scaling quantum computers by connecting separate dilution fridges with optical links, achieving thousands of logical qubits beyond single-wafer limits.',
              badge: 'Scalability',
              icon: Server,
            },
            {
              title: 'Blind Cloud Quantum Computing',
              desc: 'Execute quantum algorithms on remote supercomputers with absolute mathematical privacy — the server never learns your algorithm, code, or output data.',
              badge: 'Privacy',
              icon: ShieldCheck,
            },
            {
              title: 'Global Entanglement-Based QKD',
              desc: 'Physics-backed key distribution where eavesdropping alters quantum state observables and is immediately recognized before data transmission.',
              badge: 'Security',
              icon: Radio,
            },
            {
              title: 'Telescope Array VLBI Interferometry',
              desc: 'Quantum-enhanced baselines linking optical telescope arrays across thousands of kilometers to resolve exoplanet details with unprecedented clarity.',
              badge: 'Astrophysics',
              icon: Globe,
            },
            {
              title: 'Quantum Clock Synchronisation',
              desc: 'Sub-picosecond atomic clock synchronization across continents enabling ultra-precise GPS, relativistic geodesy, and gravitational wave detection.',
              badge: 'Metrology',
              icon: Clock,
            },
            {
              title: 'Distributed Quantum Sensing',
              desc: 'Entangled sensor networks exceeding the classical standard quantum limit for ultra-sensitive electromagnetic and inertial navigation.',
              badge: 'Sensing',
              icon: Sparkles,
            },
          ].map((app) => {
            const Icon = app.icon;
            return (
              <GlassCard key={app.title} hover className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded border border-white/[0.06] text-photon-cyan bg-white/[0.02]">
                    <Icon className="w-4 h-4" />
                  </div>
                  <Badge variant="cyan">{app.badge}</Badge>
                </div>
                <h3 className="text-sm font-semibold text-text-primary mb-2">{app.title}</h3>
                <p className="text-xs text-text-secondary leading-relaxed">{app.desc}</p>
              </GlassCard>
            );
          })}
        </div>
      </Section>

      <div className="section-divider" />

      {/* Scientific Honesty & Current Limitations */}
      <Section>
        <div className="max-w-3xl mx-auto">
          <GlassCard className="p-6 sm:p-8 border-energy-amber/30 bg-energy-amber/[0.02]">
            <div className="flex items-start gap-4">
              <AlertCircle className="w-6 h-6 text-energy-amber flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-base font-semibold text-energy-amber">
                  Scientific Reality &amp; Engineering Constraints
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-text-secondary leading-relaxed">
                  Quantum networks are in an active experimental research phase. Unlike classical fiber networks
                  which amplify signals using EDFAs, quantum states cannot be amplified without collapsing superposition
                  (due to the <em>No-Cloning Theorem</em>).
                </p>
                <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-text-muted">
                  <div className="bg-black/30 p-2.5 rounded border border-white/[0.04]">
                    <span className="text-text-primary block font-semibold mb-1">Current Bottlenecks:</span>
                    • Optical fiber loss (0.18 dB/km at 1550nm)
                    <br />• Quantum memory storage lifetimes (ms to s)
                    <br />• Transducer photon efficiency (&lt; 50%)
                  </div>
                  <div className="bg-black/30 p-2.5 rounded border border-white/[0.04]">
                    <span className="text-text-primary block font-semibold mb-1">Development Roadmap:</span>
                    • Gen 1: Point-to-point Trusted QKD
                    <br />• Gen 2: Single-hop Entanglement Swapping
                    <br />• Gen 3: Fault-Tolerant Quantum Repeaters
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      <div className="section-divider" />

      {/* Bottom Exploration CTA */}
      <Section>
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-text-primary">
            Explore Related Quantum Laboratories
          </h2>
          <p className="mt-3 text-sm text-text-secondary leading-relaxed">
            Test optical quantum experiments in our virtual photonics lab or simulate multi-qubit circuits.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Button variant="primary" href="/labs/photonics" icon={<ArrowRight className="w-4 h-4" />}>
              Quantum Photonics Lab
            </Button>
            <Button variant="secondary" href="/security">
              Quantum Cybersecurity
            </Button>
            <Button variant="outline" href="/collaborate">
              Network Research Inquiries
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
}
