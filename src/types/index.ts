/* ═══════════════════════════════════════════════════════
   SHIELD QUANTUM MACHINE AND TECHNOLOGY — Core Types
   ═══════════════════════════════════════════════════════ */

// Navigation
export interface NavItem {
  label: string;
  href: string;
  description?: string;
  badge?: 'NEW' | 'RESEARCH' | 'CONCEPT' | 'PROTOTYPE' | 'ACTIVE';
  children?: NavGroup[];
}

export interface NavGroup {
  title: string;
  items: NavLink[];
}

export interface NavLink {
  label: string;
  href: string;
  description: string;
  icon?: string;
  badge?: 'NEW' | 'RESEARCH' | 'CONCEPT' | 'PROTOTYPE' | 'ACTIVE';
}

// Research & Content
export interface ResearchArea {
  id: string;
  title: string;
  description: string;
  status: ContentStatus;
  category: ResearchCategory;
  topics: string[];
}

export type ContentStatus =
  | 'DEPLOYED'
  | 'ACTIVE'
  | 'RESEARCH'
  | 'PROTOTYPE'
  | 'CONCEPT'
  | 'FUTURE'
  | 'SIMULATION'
  | 'DEMO';

export type ResearchCategory =
  | 'quantum-computing'
  | 'quantum-hardware'
  | 'quantum-software'
  | 'quantum-ai'
  | 'quantum-cybersecurity'
  | 'quantum-photonics'
  | 'quantum-materials'
  | 'quantum-sensing'
  | 'cryogenic-engineering'
  | 'hpc';

// Lab Components
export interface LabComponent {
  id: string;
  name: string;
  purpose: string;
  principle: string;
  challenges: string[];
  researchArea: string;
  position: { x: number; y: number };
}

// Knowledge Center
export interface KnowledgeArticle {
  id: string;
  title: string;
  description: string;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  category: string;
  readTime: string;
}

// Applications
export interface ApplicationArea {
  id: string;
  title: string;
  problem: string;
  technology: string;
  quantumAdvantage: string;
  researchStatus: ContentStatus;
  icon: string;
}

// Roadmap
export interface RoadmapPhase {
  id: string;
  phase: number;
  title: string;
  description: string;
  status: 'COMPLETED' | 'ACTIVE' | 'PLANNED' | 'CONCEPTUAL' | 'FUTURE';
  milestones: string[];
}

// Quantum Simulator
export interface QuantumGate {
  type: 'X' | 'Y' | 'Z' | 'H' | 'S' | 'T' | 'CNOT' | 'MEASURE';
  qubit: number;
  controlQubit?: number;
  column: number;
}

export interface CircuitState {
  gates: QuantumGate[];
  numQubits: number;
  measurements: number[];
}

// Campus
export interface CampusFacility {
  id: string;
  name: string;
  purpose: string;
  description: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
}
