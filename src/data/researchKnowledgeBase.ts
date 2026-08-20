export type DocumentType =
  | 'PAPER'
  | 'THESIS'
  | 'STUDY_GUIDE'
  | 'TECHNICAL_REPORT'
  | 'RESEARCH_NOTE'
  | 'DIAGRAM_SPEC';

export type ResearchDomain =
  | 'Quantum Computing'
  | 'Quantum Hardware'
  | 'Quantum Processors'
  | 'Superconducting Qubits'
  | 'Cryogenic Systems'
  | 'Quantum Control Electronics'
  | 'Quantum Algorithms'
  | 'Quantum Simulation'
  | 'Quantum Error Correction'
  | 'Quantum Cryptography'
  | 'Post-Quantum Cryptography'
  | 'Quantum Communication'
  | 'Quantum Networking'
  | 'Quantum AI & ML'
  | 'Quantum Sensing'
  | 'Quantum Photonics'
  | 'EMI & RF Shielding'
  | 'Quantum Security & Cyber Defense';

export type ContentStatus =
  | 'RESEARCH'
  | 'CONCEPT'
  | 'STUDY'
  | 'PROPOSED'
  | 'EXPERIMENTAL'
  | 'PLANNED'
  | 'REFERENCE';

export interface ResearchDocument {
  id: string;
  title: string;
  slug: string;
  type: DocumentType;
  domain: ResearchDomain;
  status: ContentStatus;
  author: string;
  date: string;
  version?: string;
  summary: string;
  keyFindings: string[];
  equations?: {
    label: string;
    latex: string;
    description: string;
  }[];
  chapters?: {
    number: string;
    title: string;
    summary: string;
  }[];
  tags: string[];
  relatedTopics: string[];
  fullText: string;
  diagramUrl?: string;
  diagramCaption?: string;
}

export interface ScientificDiagram {
  id: string;
  title: string;
  domain: ResearchDomain;
  status: 'Conceptual Visualization' | 'Research Reference' | 'Laboratory Architecture';
  imageUrl: string;
  caption: string;
  description: string;
  keyFeatures: string[];
}

export const RESEARCH_DOCUMENTS: ResearchDocument[] = [
  {
    id: 'doc-thesis-01',
    title: 'Superconducting Transmon Qubit Hamiltonian & Microwave Control Synthesis',
    slug: 'superconducting-transmon-hamiltonian-thesis',
    type: 'THESIS',
    domain: 'Superconducting Qubits',
    status: 'RESEARCH',
    author: 'SHIELD Quantum Technology Research Group',
    date: '2025-Q3',
    version: 'v2.4',
    summary:
      'A comprehensive theoretical and numerical monograph on planar superconducting transmon circuits. Derives the non-linear Josephson potential, quantizes the LC circuit with a non-dissipative non-linear inductance, and optimizes DRAG (Derivative Removal by Adiabatic Gate) microwave pulse shaping to suppress leakage into the second excited state |2⟩.',
    keyFindings: [
      'Operating in the transmon regime (EJ/EC ≈ 50–80) reduces charge noise sensitivity exponentially while maintaining sufficient anharmonicity (~ -220 to -300 MHz) for addressable microwave transitions.',
      'DRAG pulse synthesis combining Gaussian in-phase microwave envelopes with derivative quadrature components reduces |2⟩ leakage rates below 0.01% for 15 ns single-qubit gate durations.',
      'Purcell filtering on the readout resonator suppresses spontaneous qubit radiative decay by over an order of magnitude, sustaining T1 relaxation times exceeding 100 µs.',
    ],
    equations: [
      {
        label: 'Transmon Hamiltonian (Charge Basis)',
        latex: '\\hat{H} = 4E_C(\\hat{n} - n_g)^2 - E_J\\cos\\hat{\\phi}',
        description:
          'Where EC = e²/(2C_Σ) is the single-electron charging energy, EJ = I_c Φ_0 / (2π) is the Josephson coupling energy, and n_g is the offset gate charge.',
      },
      {
        label: 'Anharmonicity Approximation',
        latex: '\\alpha = \\omega_{12} - \\omega_{01} \\approx -E_C',
        description:
          'Negative anharmonicity ensures the |1⟩ → |2⟩ transition frequency is shifted below the fundamental |0⟩ → |1⟩ frequency, permitting selective microwave frequency addressing.',
      },
      {
        label: 'DRAG Pulse Formulation',
        latex: '\\Omega_x(t) = \\mathcal{E}(t), \\quad \\Omega_y(t) = -\\frac{\\dot{\\mathcal{E}}(t)}{\\alpha}',
        description:
          'Quadrature derivative correction cancels spectral sidebands resonant with the |1⟩ → |2⟩ transition, eliminating phase error and state leakage.',
      },
    ],
    chapters: [
      {
        number: 'Chapter 1',
        title: 'Circuit Quantum Electrodynamics (cQED) Fundamentals',
        summary: 'Quantization of transmission line resonators coupled to non-linear superconducting dipoles via Jaynes-Cummings Hamiltonian.',
      },
      {
        number: 'Chapter 2',
        title: 'Josephson Junction Physics & Asymmetric SQUID Loops',
        summary: 'Tunable Josephson energy via external magnetic flux bias Φ_ext in DC-SQUID configurations.',
      },
      {
        number: 'Chapter 3',
        title: 'Microwave Pulse Synthesis & Gate Optimization',
        summary: 'Optimal control theory, GRAPE algorithms, and DRAG pulse calibrations on AWG platforms.',
      },
      {
        number: 'Chapter 4',
        title: 'Dispersive Readout & Quantum Non-Demolition (QND) Measurements',
        summary: 'State-dependent resonator frequency shifts Δω_r = ±χ and parametric amplification with TWPAs.',
      },
    ],
    tags: ['Transmon', 'cQED', 'Josephson Junction', 'DRAG Pulses', 'Hamiltonian', 'QPU Physics'],
    relatedTopics: ['Quantum Hardware', 'Cryogenic Systems', 'Quantum Control Electronics'],
    fullText: `## Abstract
Superconducting quantum processors rely on circuit quantum electrodynamics (cQED) where artificial atoms—composed of Josephson junctions shunted by large coplanar capacitors—are coupled dispersively to microwave coplanar waveguide resonators. This work investigates the Hamiltonian dynamics, non-linear energy level dispersion, and pulse synthesis protocols required to achieve gate fidelities above the fault-tolerant threshold.

## 1. Mathematical Quantization of Superconducting Circuits
Starting from the Lagrangian of an LC circuit modified by a Josephson element:
$$\\mathcal{L} = \\frac{1}{2}C_\\Sigma \\dot{\\Phi}^2 + E_J \\cos\\left(\\frac{2\\pi \\Phi}{\\Phi_0}\\right)$$
Applying the Legendre transformation yields the classical Hamiltonian, which upon canonical quantization $\\hat{\\Phi} \\rightarrow \\hat{\\phi}$, $\\hat{Q} \\rightarrow -i\\hbar \\frac{\\partial}{\\partial \\Phi}$ produces the Cooper-pair number operator $\\hat{n}$ and phase operator $\\hat{\\phi}$ obeying $[\\hat{\\phi}, \\hat{n}] = i$.

## 2. Transmon Regime & Charge Dispersion Suppression
In conventional Cooper Pair Boxes ($E_J \\sim E_C$), charge noise fluctuations $\\delta n_g$ cause severe dephasing. By dramatically increasing the shunting capacitance such that $E_J/E_C \\gg 1$, the energy levels become Mathieu functions whose charge dispersion scales asymptotically as:
$$\\epsilon_m \\propto \\exp\\left(-\\sqrt{8E_J/E_C}\\right)$$
This exponential suppression eliminates charge noise dephasing without requiring tunable gate charge tuning, making the transmon robust against ambient $1/f$ electric charge drift.

## 3. Dispersive Readout Architecture
When the qubit frequency $\\omega_q$ is far detuned from the readout resonator frequency $\\omega_r$ ($|\\Delta| = |\\omega_q - \\omega_r| \\gg g$), the interaction Hamiltonian reduces to the dispersive approximation:
$$\\hat{H}_{disp} \\approx \\hbar (\\omega_r + \\chi \\hat{\\sigma}_z) \\hat{a}^\\dagger \\hat{a} + \\frac{\\hbar \\omega_q}{2} \\hat{\\sigma}_z$$
Measuring the phase of transmitted microwave photons at frequency $\\omega_r$ yields single-shot non-destructive discrimination between $|0\\rangle$ and $|1\\rangle$.`,
    diagramUrl: '/images/labs/quantum_processor_chamber.jpg',
    diagramCaption: 'Superconducting Quantum Processor Chamber & Dilution Cryostat Packaging',
  },
  {
    id: 'doc-paper-01',
    title: 'Planar Surface Code Error Correction: Threshold Analysis & Decoder Benchmarks',
    slug: 'planar-surface-code-error-correction-paper',
    type: 'PAPER',
    domain: 'Quantum Error Correction',
    status: 'RESEARCH',
    author: 'SHIELD Quantum Algorithms & Fault Tolerance Group',
    date: '2025-Q4',
    version: 'v3.1',
    summary:
      'Analysis of rotated planar surface codes ($d=3, 5, 7$) implemented on square 2D transmon lattices. Evaluates Minimum-Weight Perfect Matching (MWPM) and Union-Find decoders under correlated Pauli noise models and circuit-level depolarization.',
    keyFindings: [
      'Rotated surface code topologies achieve a circuit-level threshold of p_th ≈ 0.94% with standard 2-qubit CNOT gate noise models.',
      'Union-Find decoders provide nearly linear-time $O(N\\alpha(N))$ execution with less than 0.05% threshold degradation compared to classical MWPM, making real-time FPGA syndrome extraction viable.',
      'Code distance scaling from $d=3$ (17 physical qubits) to $d=5$ (49 physical qubits) demonstrates an exponential suppression factor $\\Lambda \\approx 2.1$ per distance increase when physical error rates remain below $p < 10^{-3}$.',
    ],
    equations: [
      {
        label: 'Stabilizer Generators (Star & Plaquette)',
        latex: 'A_s = \\prod_{i \\in v(s)} \\hat{X}_i, \\quad B_p = \\prod_{j \\in \\partial p} \\hat{Z}_j',
        description:
          'Commuting multi-qubit Pauli operators measured synchronously via ancilla qubits to extract error syndromes without collapsing logical quantum data.',
      },
      {
        label: 'Logical Error Rate Suppression',
        latex: 'P_L \\approx C \\left(\\frac{p}{p_{th}}\\right)^{\\frac{d+1}{2}}',
        description:
          'Where d is code distance, p is physical gate error rate, and p_th is the fault-tolerant threshold (~1%).',
      },
    ],
    chapters: [
      {
        number: 'Section 1',
        title: 'Surface Code Topology & Synergistic Lattice Geometry',
        summary: 'Comparison of unrotated vs. rotated surface code tiling on square 2D coupling grids.',
      },
      {
        number: 'Section 2',
        title: 'Syndrome Measurement Cycles & Ancilla Scheduling',
        summary: 'Optimization of 8-step dynamical decoupling cycles to prevent cross-talk during syndrome extraction.',
      },
      {
        number: 'Section 3',
        title: 'Real-Time Hardware Decoding on FPGA Clusters',
        summary: 'Pipelined syndrome graph creation and parallel tree-growth Union-Find decoding at sub-microsecond latency.',
      },
    ],
    tags: ['Surface Code', 'Quantum Error Correction', 'Stabilizer Codes', 'MWPM', 'Fault Tolerance'],
    relatedTopics: ['Quantum Computing', 'Quantum Hardware', 'Quantum Processors'],
    fullText: `## Abstract
Physical qubits in solid-state quantum processors are inherently susceptible to environmental decoherence, $1/f$ flux noise, and control crosstalk. Quantum error correction (QEC) replaces vulnerable physical qubits with topological logical qubits whose states are encoded across the collective non-local degrees of freedom of a 2D stabilizer lattice. This paper presents an end-to-end simulation of rotated surface code patches up to code distance $d=7$.

## 1. Rotated Planar Surface Code Architecture
In a distance-$d$ rotated surface code, $d^2$ data qubits and $d^2 - 1$ syndrome ancilla qubits are arranged on a 2D square lattice with nearest-neighbor microwave coupling. The logical operators are non-trivial topological strings:
- Logical $\\hat{X}_L$: horizontal chain of $\\hat{X}$ operators traversing the lattice boundary.
- Logical $\\hat{Z}_L$: vertical chain of $\\hat{Z}$ operators traversing the opposite lattice boundary.

## 2. Syndrome Measurement & Error Graph Construction
Every syndrome extraction cycle executes four 2-qubit gates per stabilizer, measuring the eigenvalues $\\pm 1$ of $A_s$ (detecting bit-flips) and $B_p$ (detecting phase-flips). Consecutive syndrome difference vectors identify defect vertices in spacetime error graphs:
- Spatial edges represent physical gate errors occurring during the current cycle.
- Temporal edges represent ancilla measurement flip errors persisting across cycles.

## 3. Decoding Performance Benchmarks
We evaluated the decoder throughput against physical error rates $p \\in [10^{-4}, 10^{-2}]$. For physical error rates $p = 10^{-3}$, code distance $d=5$ achieves a logical failure rate of $P_L \\approx 1.2 \\times 10^{-5}$ per cycle, validating the sub-threshold scaling necessary for large-scale scientific algorithms.`,
    diagramUrl: '/images/labs/cryogenic_quantum_lab.jpg',
    diagramCaption: 'Cryogenic Laboratory Testbed for Multi-Qubit QEC Syndrome Extraction',
  },
  {
    id: 'doc-report-01',
    title: 'Millikelvin Cryostat Thermodynamics & RF Attenuation Thermal Budget',
    slug: 'millikelvin-cryostat-thermodynamics-report',
    type: 'TECHNICAL_REPORT',
    domain: 'Cryogenic Systems',
    status: 'RESEARCH',
    author: 'SHIELD Cryogenic Engineering Division',
    date: '2025-Q2',
    version: 'v1.8',
    summary:
      'Detailed thermal engineering budget for high-density coaxial line deployment in a closed-loop dilution refrigerator. Balances thermal conductive load, Johnson-Nyquist thermal noise suppression, and cryogenic cooling power from 300 K down to 15 mK.',
    keyFindings: [
      'Thermal anchoring with gold-plated OFHC copper heat sinks at each stage (50 K, 4 K, Still, Cold Plate, Mixing Chamber) limits total static heat load to under 12 µW at the 15 mK Mixing Chamber stage.',
      'Distributed attenuation profiles (0 dB at 50 K, -3 dB at 4 K, -10 dB at Still, -20 dB at Mixing Chamber) reduce thermal photon occupancy from 300 K room electronics to n_th < 10^-4 photons/mode at 5 GHz.',
      'Superconducting NbTi and CuNi semi-rigid coaxial cables minimize passive parasitic conduction while preserving microwave insertion loss below 0.8 dB/m.',
    ],
    equations: [
      {
        label: 'Dilution Refrigeration Cooling Power',
        latex: '\\dot{Q}_{MC} = 84 \\dot{n}_3 T_{MC}^2 - \\dot{Q}_{static}',
        description:
          'Where n_3 is the ³He molar circulation rate (mol/s), T_MC is the Mixing Chamber temperature, and Q_static is the total parasitic thermal heat load.',
      },
      {
        label: 'Johnson-Nyquist Noise Power Spectral Density',
        latex: 'S_V(f) = 4 k_B T R \\frac{h f / (k_B T)}{e^{h f / (k_B T)} - 1}',
        description:
          'Describes thermal photon noise entering microwave control lines from higher temperature stages.',
      },
    ],
    chapters: [
      {
        number: 'Section 1',
        title: 'Thermodynamic Enthalpy Balance of ³He/⁴He Mixtures',
        summary: 'Phase separation line, concentrated ³He phase enthalpy, and osmotic pressure dynamics across the dilution unit.',
      },
      {
        number: 'Section 2',
        title: 'Thermal Line Budget & Attenuator Sizing',
        summary: 'Stage-by-stage thermal conduction calculations through center conductors, dielectrics, and outer shields.',
      },
      {
        number: 'Section 3',
        title: 'Cryogenic Packaging & Thermal Shield Enclosures',
        summary: 'Radiation shield modeling, emissivity optimizations, and thermal anchoring clamping geometries.',
      },
    ],
    tags: ['Cryogenics', 'Dilution Refrigerator', 'Thermal Budget', 'RF Lines', 'Millikelvin', '3He-4He'],
    relatedTopics: ['Quantum Hardware', 'Quantum Processors', 'EMI & RF Shielding'],
    fullText: `## Executive Summary
Superconducting quantum processors must operate at temperatures below 20 mK so that the thermal energy $k_B T$ is orders of magnitude smaller than the qubit transition energy $\\hbar \\omega_{01} \\approx 200\\text{ µeV}$ ($5\\text{ GHz}$). This report details the complete thermodynamic design of the SHIELD Cryogenic Platform.

## 1. Dilution Cooling Principle
The system utilizes the endothermic enthalpy of mixing between the concentrated $^3\\text{He}$ phase (pure $^3\\text{He}$) and the dilute $^3\\text{He}$ phase ($6.6\\%$ $^3\\text{He}$ in $^4\\text{He}$ superfluid) across the Phase Separation Line. At temperatures below $100\\text{ mK}$, $^3\\text{He}$ atoms crossing the phase boundary absorb latent heat, providing continuous cooling power according to:
$$\\dot{Q} = \\dot{n}_3 \\left(96 T_{MC}^2 - 12 T_{in}^2\\right)\\text{ J/mol}$$

## 2. RF Line Thermal Loading & Heat Sinking
To route microwave drive and readout signals without boiling off cryogenic reserves, microwave coaxial cables utilize graded thermal conductivities:
- **300 K → 4 K**: CuNi outer shield with Ag-plated CuNi center conductor.
- **4 K → 15 mK**: Superconducting NbTi outer and inner conductors, whose electronic thermal conductivity vanishes exponentially below $T_c \\approx 9.2\\text{ K}$.

Each line incorporates cryogenic directional attenuators anchored to gold-plated OFHC copper brackets with torque-controlled indium gaskets, ensuring thermal boundary resistance $R_K < 0.1\\text{ K}\\cdot\\text{cm}^2/\\text{W}$.`,
    diagramUrl: '/images/labs/dilution_refrigerator.jpg',
    diagramCaption: 'Dilution Refrigerator Multi-Stage Cryostat Anatomy',
  },
  {
    id: 'doc-study-01',
    title: 'Quantum Key Distribution (QKD) & BB84 Heisenberg Uncertainty Security',
    slug: 'quantum-key-distribution-bb84-study-guide',
    type: 'STUDY_GUIDE',
    domain: 'Quantum Cryptography',
    status: 'STUDY',
    author: 'Dipak S. Dahifale — Cyber Security & Digital Forensics',
    date: '2025-Q1',
    version: 'v2.1',
    summary:
      'Educational and mathematical study guide on Quantum Key Distribution protocols. Explores the BB84 4-state protocol, conjugate measurement bases, quantum no-cloning theorem, eavesdropping detection via Quantum Bit Error Rate (QBER), and privacy amplification.',
    keyFindings: [
      'The security of BB84 relies on the non-commutativity of Pauli measurement bases [X, Z] ≠ 0 and the No-Cloning Theorem, guaranteeing any eavesdropping attempt creates measurable disturbance.',
      'The theoretical threshold for unconditional security under individual attacks occurs at QBER < 11.0% (Shor-Preskill security proof). Any QBER observed above 11% triggers an automated channel abort.',
      'Integration of decoy-state techniques overcomes photon-number-splitting (PNS) attacks on attenuated coherent laser sources, extending secure transmission distance across dark fiber beyond 100 km.',
    ],
    equations: [
      {
        label: 'Conjugate Polarization Bases',
        latex: '\\{|0\\rangle, |1\\rangle\\} \\quad \\text{and} \\quad \\{|+\\rangle = \\frac{|0\\rangle+|1\\rangle}{\\sqrt{2}}, |-\\rangle = \\frac{|0\\rangle-|1\\rangle}{\\sqrt{2}}\\}',
        description:
          'Rectilinear (Z) and Diagonal (X) measurement bases. Measuring a state in the conjugate basis yields an outcome with maximum uncertainty (entropy = 1 bit).',
      },
      {
        label: 'Quantum Bit Error Rate (QBER)',
        latex: '\\text{QBER} = \\frac{N_{error}}{N_{sifted}} = \\frac{N_{wrong}}{N_{correct} + N_{wrong}}',
        description:
          'Proportion of error bits in the sifted key sample compared during public parity estimation.',
      },
      {
        label: 'Secret Key Fraction (Devetak-Winter Formula)',
        latex: 'R \\ge 1 - H_2(\\text{QBER}) - H_2(\\text{QBER})',
        description:
          'Lower bound on the extractable secure key rate after classical error correction and privacy amplification.',
      },
    ],
    chapters: [
      {
        number: 'Module 1',
        title: 'Foundations of Quantum Information Security',
        summary: 'Heisenberg uncertainty relation, state distinguishability, and the Wootters-Zurek no-cloning theorem.',
      },
      {
        number: 'Module 2',
        title: 'Step-by-Step BB84 Protocol Execution',
        summary: 'State preparation, quantum channel transmission, conjugate basis selection, and classical sifting.',
      },
      {
        number: 'Module 3',
        title: 'Eavesdropping Analysis & Eve Intercept-Resend Model',
        summary: 'Mathematical calculation of 25% induced error rate when Eve measures in random conjugate bases.',
      },
      {
        number: 'Module 4',
        title: 'Classical Post-Processing: Error Correction & Privacy Amplification',
        summary: 'Cascade and LDPC syndrome reconciliation followed by Toeplitz matrix universal hashing.',
      },
    ],
    tags: ['QKD', 'BB84', 'Quantum Cryptography', 'No-Cloning', 'QBER', 'Cyber Security'],
    relatedTopics: ['Post-Quantum Cryptography', 'Quantum Networking', 'Quantum Security & Cyber Defense'],
    fullText: `## 1. Fundamental Principles
Classical cryptography relies on computational complexity assumptions (e.g., discrete logarithm, integer factorization) which are vulnerable to algorithmic breakthroughs and quantum polynomial-time algorithms. In contrast, Quantum Key Distribution (QKD) achieves information-theoretic security rooted in the laws of quantum mechanics.

## 2. No-Cloning Theorem & State Perturbation
Let $U$ be a unitary cloning operator such that $U(|\\psi\\rangle |0\\rangle) = |\\psi\\rangle |\\psi\\rangle$ for all $|\psi\\rangle$. For two non-orthogonal states $|u\\rangle$ and $|v\\rangle$:
$$\\langle u|v\\rangle = \\langle u| \\langle 0| U^\\dagger U |v\\rangle |0\\rangle = \\left(\\langle u|v\\rangle\\right)^2$$
This requires $\\langle u|v\\rangle = 0$ or $\\langle u|v\\rangle = 1$, proving that arbitrary unknown quantum states cannot be cloned faithfully. Consequently, an adversary (Eve) cannot intercept, clone, and forward qubits without introducing detectable errors into the quantum channel.

## 3. Intercept-Resend Attack Derivation
If Alice transmits a qubit in the $Z$-basis ($|0\\rangle$ or $|1\\rangle$), and Eve intercepts and measures in the $X$-basis ($|+\\rangle$ or $|-\\rangle$):
$$|0\\rangle = \\frac{1}{\\sqrt{2}}(|+\\rangle + |-\\rangle)$$
Eve obtains outcome $|+\\rangle$ with probability $1/2$ and resends it to Bob. If Bob measures in Alice's original $Z$-basis:
$$|+\\rangle = \\frac{1}{\\sqrt{2}}(|0\\rangle + |1\\rangle)$$
Bob observes outcome $|1\\rangle$ (an error) with probability $1/2$. Because Eve chooses the wrong basis $50\\%$ of the time, the total induced error rate on Eve-intercepted bits is $50\\% \\times 50\\% = 25\\%$.`,
    diagramUrl: '/images/labs/quantum_control_electronics.jpg',
    diagramCaption: 'High-Speed Single-Photon Detection & QKD Control Electronics Rack',
  },
  {
    id: 'doc-paper-02',
    title: 'Post-Quantum Cryptographic Migration: Lattice-Based Key Encapsulation (ML-KEM)',
    slug: 'post-quantum-cryptography-ml-kem-migration',
    type: 'PAPER',
    domain: 'Post-Quantum Cryptography',
    status: 'RESEARCH',
    author: 'Dipak S. Dahifale — Cyber Security & Digital Forensics',
    date: '2025-Q3',
    version: 'v2.0',
    summary:
      'Analysis of post-quantum cryptographic primitives standardized by NIST (FIPS 203 ML-KEM / CRYSTALS-Kyber, FIPS 204 ML-DSA / CRYSTALS-Dilithium). Details mathematical hardness of the Module Learning With Errors (M-LWE) problem, key sizes, and migration strategies against Harvest Now Decrypt Later (HNDL) threats.',
    keyFindings: [
      'Shor’s algorithm computes discrete logarithms and prime factorizations in polynomial time O((log N)³), rendering RSA-2048 and ECC (ECDSA, ECDH) completely insecure against cryptanalytically relevant quantum computers (CRQCs).',
      'ML-KEM-768 achieves NIST Security Category 3 (equivalent to AES-192) based on the hardness of high-dimensional lattice vector problems (SVP / CVP), with a public key size of 1,184 bytes and ciphertext of 1,088 bytes.',
      'A hybrid key exchange architecture combining classical X25519 with ML-KEM-768 provides dual-layer resilience during the transition phase, ensuring security if either primitive remains unbroken.',
    ],
    equations: [
      {
        label: 'Module Learning With Errors (M-LWE) Relation',
        latex: '\\mathbf{b} = \\mathbf{A} \\mathbf{s} + \\mathbf{e} \\pmod q',
        description:
          'Where A is a publicly known matrix of polynomials over ring R_q, s is a secret error-vector with small coefficients, and e is a Gaussian noise vector.',
      },
      {
        label: 'Ring Polynomial Structure',
        latex: 'R_q = \\mathbb{Z}_q[X] / (X^{256} + 1), \\quad q = 3329',
        description:
          'The cyclotomic polynomial ring utilized in ML-KEM enabling Number Theoretic Transform (NTT) for O(n log n) multiplication speedup.',
      },
    ],
    chapters: [
      {
        number: 'Section 1',
        title: 'Quantum Cryptanalysis Threat Landscape',
        summary: 'Quantum algorithm capabilities, Grover speedups on symmetric ciphers (AES-256), and Shor polynomial breaks of asymmetric PKI.',
      },
      {
        number: 'Section 2',
        title: 'Lattice Cryptography & Module-LWE Mathematical Foundations',
        summary: 'Ideal and module lattices, shortest vector problem (SVP), and NTT polynomial multiplication.',
      },
      {
        number: 'Section 3',
        title: 'Hybrid TLS 1.3 Key Encapsulation Architecture',
        summary: 'Draft IETF standards for hybrid classical/PQC key exchange in production transport security.',
      },
      {
        number: 'Section 4',
        title: 'Forensic & Security Audit Guidelines for Enterprise Migration',
        summary: 'Cryptographic inventory assessment, cipher agility, and memory side-channel protection in PQC implementations.',
      },
    ],
    tags: ['Post-Quantum', 'PQC', 'ML-KEM', 'Kyber', 'Lattice Cryptography', 'Cyber Security'],
    relatedTopics: ['Quantum Cryptography', 'Quantum Security & Cyber Defense', 'Quantum Computing'],
    fullText: `## Executive Overview
The impending advent of cryptanalytically relevant quantum computers poses an existential threat to modern asymmetric public key cryptography. Adversaries are actively intercepting and storing encrypted high-value communications today under "Harvest Now, Decrypt Later" doctrines. This research paper evaluates the mathematical hardness, implementation security, and enterprise migration roadmap for Module-LWE based Post-Quantum Cryptography.

## 1. Mathematical Hardness of Lattice Vector Problems
Lattice-based cryptography relies on the geometric hardness of finding short, non-zero vectors in an $n$-dimensional Euclidean vector lattice $\\Lambda \\subset \\mathbb{R}^n$. Unlike the integer factorization and elliptic curve discrete logarithm problems which possess hidden subgroup structures that Shor's algorithm exploits via the Quantum Fourier Transform, lattice shortest vector problems (SVP) exhibit no abelian periodicities.

## 2. ML-KEM (CRYSTALS-Kyber) Algorithm Pipeline
The Key Encapsulation Mechanism executes in three phases:
1. **Key Generation**: Generates seed $\\rho$, expands matrix $\\mathbf{A} \\in R_q^{k \\times k}$ via SHAKE-128, samples small secret vector $\\mathbf{s}$ and noise $\\mathbf{e}$, computes $\\mathbf{t} = \\mathbf{A}\\mathbf{s} + \\mathbf{e}$.
2. **Encapsulation**: Using public key $(\\mathbf{t}, \\rho)$, samples random message $m$, generates shared secret $K$ and ciphertext $(\\mathbf{u}, v)$.
3. **Decapsulation**: Recovers message $m' = \\text{Compress}(v - \\mathbf{s}^T \\mathbf{u})$ and verifies correctness with Fujisaki-Okamoto transform to achieve chosen-ciphertext attack (IND-CCA2) security.`,
    diagramUrl: '/images/labs/vibration_rf_shielding.jpg',
    diagramCaption: 'High-Integrity Cryptographic Hardware Security Enclosure',
  },
  {
    id: 'doc-note-01',
    title: 'Parameterized Quantum Circuits (PQCs) & Quantum Kernel Methods in Machine Learning',
    slug: 'parameterized-quantum-circuits-qml-research-notes',
    type: 'RESEARCH_NOTE',
    domain: 'Quantum AI & ML',
    status: 'RESEARCH',
    author: 'SHIELD Quantum AI & Machine Intelligence Division',
    date: '2025-Q4',
    version: 'v1.5',
    summary:
      'Research notes exploring Variational Quantum Classifiers (VQCs), barren plateau mitigation strategies in Parameterized Quantum Circuits, and Quantum Kernel Hilbert space embeddings $K(x, x\') = |\\langle\\phi(x)|\\phi(x\')\\rangle|^2$ on NISQ-era processors.',
    keyFindings: [
      'Quantum feature maps projecting classical data into exponentially large $2^N$-dimensional Hilbert state vectors can separate non-linearly separable datasets that are intractable for classical RBF kernels.',
      'Barren plateaus (exponential vanishing of gradient variance $\\text{Var}[\\partial_\\theta \\langle H \\rangle] \\sim 2^{-N}$) are mitigated by adopting shallow alternating layer architectures and local measurement operators.',
      'Hybrid quantum-classical training utilizing Parameter-Shift Rules allows exact analytical gradient computation on real quantum hardware without numerical finite-difference approximation.',
    ],
    equations: [
      {
        label: 'Quantum Kernel Matrix Element',
        latex: 'K(\\mathbf{x}, \\mathbf{x}\') = |\\langle \\phi(\\mathbf{x}) | \\phi(\\mathbf{x}\') \\rangle|^2 = |\\langle 0^{\\otimes N} | U^\\dagger(\\mathbf{x}) U(\\mathbf{x}\') | 0^{\\otimes N} \\rangle|^2',
        description:
          'Transition fidelity evaluated between two data-encoded quantum states via swap test or inversion circuit.',
      },
      {
        label: 'Parameter-Shift Rule for Analytical Gradient',
        latex: '\\frac{\\partial \\langle H \\rangle}{\\partial \\theta_i} = \\frac{1}{2} \\left( \\langle H \\rangle_{\\theta_i + \\frac{\\pi}{2}} - \\langle H \\rangle_{\\theta_i - \\frac{\\pi}{2}} \\right)',
        description:
          'Exact gradient of an expectation value with respect to gate rotation angle evaluated via two circuit executions.',
      },
    ],
    chapters: [
      {
        number: 'Note 1',
        title: 'Data Encoding Strategies: Basis vs. Amplitude vs. Angle Embedding',
        summary: 'Comparison of qubit overhead, circuit depth, and expressibility across data embedding schemes.',
      },
      {
        number: 'Note 2',
        title: 'Expressibility & Entangling Capacity of Variational Ansätze',
        summary: 'Kullback-Leibler divergence between ansatz-generated state ensembles and the uniform Haar measure.',
      },
      {
        number: 'Note 3',
        title: 'Hybrid Optimization Workflows (COBYLA, Adam, SPSA)',
        summary: 'Stochastic gradient descent in the presence of quantum measurement shot noise.',
      },
    ],
    tags: ['Quantum AI', 'QML', 'PQC', 'Quantum Kernels', 'Parameter Shift', 'Variational Circuits'],
    relatedTopics: ['Quantum Algorithms', 'Quantum Computing', 'AI + HPC Quantum Co-Processing'],
    fullText: `## 1. Quantum Embedding in High-Dimensional Hilbert Spaces
Quantum Machine Learning utilizes the geometry of Hilbert spaces $\\mathcal{H} = (\\mathbb{C}^2)^{\\otimes N}$ to discover patterns in complex datasets. A classical input $\\mathbf{x} \\in \\mathbb{R}^d$ is mapped to a quantum state $|\\phi(\\mathbf{x})\\rangle = U_{\\Phi}(\\mathbf{x})|0^{\\otimes N}\\rangle$ using non-linear unitary transformations.

## 2. The Parameter-Shift Rule
In classical neural networks, backpropagation relies on computational graph differentiation. Because physical quantum measurements collapse states, quantum circuits cannot store intermediate activations. However, for gates generated by Pauli operators $G(\\theta) = e^{-i \\frac{\\theta}{2} P}$ with $P^2 = I$, the exact analytical gradient is given by the Parameter-Shift Rule:
$$\\frac{\\partial \\langle \\hat{O} \\rangle}{\\partial \\theta} = \\frac{\\langle \\hat{O} \\rangle_{\\theta + \\frac{\\pi}{2}} - \\langle \\hat{O} \\rangle_{\\theta - \\frac{\\pi}{2}}}{2}$$
This allows classical gradient-based optimizers (e.g., Adam) to update quantum parameters with rigorous convergence guarantees.`,
    diagramUrl: '/images/labs/quantum_control_electronics.jpg',
    diagramCaption: 'High-Throughput Quantum AI Co-Processing Engine & Control Instrumentation',
  },
];

export const SCIENTIFIC_DIAGRAMS: ScientificDiagram[] = [
  {
    id: 'diag-01',
    title: 'Superconducting Transmon QPU Packaging & Cryogenic Chamber',
    domain: 'Superconducting Qubits',
    status: 'Laboratory Architecture',
    imageUrl: '/images/labs/quantum_processor_chamber.jpg',
    caption: 'Ultra-High Vacuum (UHV) Sub-20mK Dilution Refrigerator Core Chamber',
    description:
      'Conceptual layout of the physical quantum processor chamber, showing coaxial microwave feedthroughs, cold fingers, gold-plated OFHC copper mounting plates, and high-frequency shielding enclosures.',
    keyFeatures: [
      'Base temperature: 15 mK via continuous ³He/⁴He dilution refrigeration cycle',
      'Magnetic shielding: Multi-layer Cryogenic Mu-Metal and Superconducting Lead/Aluminum cans',
      'RF Interconnects: High-density SMA/SMPM non-magnetic microwave feedlines with 50 Ω impedance match',
      'Thermal anchoring: Indium-gasketed gold-plated brackets for sub-100 µW parasitic heat loads',
    ],
  },
  {
    id: 'diag-02',
    title: 'Dilution Refrigerator Multi-Stage Thermal Gradient Anatomy',
    domain: 'Cryogenic Systems',
    status: 'Research Reference',
    imageUrl: '/images/labs/dilution_refrigerator.jpg',
    caption: 'Complete Thermodynamic Gradient: 300 K → 50 K → 4 K → 800 mK → 100 mK → 15 mK',
    description:
      'Detailed subsystem breakdown of the dilution refrigerator chandelier structure, illustrating pulse tube cryocooler stages, still unit, continuous heat exchangers, and mixing chamber.',
    keyFeatures: [
      '50 K Stage: Pulse tube 1st stage thermal intercept (absorbs ambient conductive load)',
      '4 K Stage: Pulse tube 2nd stage condenser and superconducting transition threshold',
      'Still Stage (800 mK): ³He vapor distillation unit driving the circulation loop',
      'Mixing Chamber (15 mK): Phase separation boundary producing endothermic dilution cooling',
    ],
  },
  {
    id: 'diag-03',
    title: 'High-Speed Quantum Control Electronics & AWG Instrumentation Rack',
    domain: 'Quantum Control Electronics',
    status: 'Laboratory Architecture',
    imageUrl: '/images/labs/quantum_control_electronics.jpg',
    caption: 'Room-Temperature FPGA Microwave Pulse Synthesis & Dispersive Readout Rack',
    description:
      'Direct Digital Synthesis (DDS) Arbitrary Waveform Generator (AWG) racks delivering phase-coherent 5–7 GHz microwave control pulses with sub-nanosecond synchronization and IQ modulation.',
    keyFeatures: [
      'Sampling rate: 5+ GSa/s with 16-bit vertical resolution',
      'IQ Modulators: Phase and amplitude control with DRAG derivative shaping to eliminate leakage',
      'Readout chain: Traveling Wave Parametric Amplifier (TWPA) followed by cryogenic HEMT amplifiers at 4 K',
      'FPGA Decoders: Sub-microsecond syndrome processing for active error correction feedback',
    ],
  },
  {
    id: 'diag-04',
    title: 'Vibration Isolation, Acoustic Baffling & EMI/RF Shielding Bay',
    domain: 'EMI & RF Shielding',
    status: 'Conceptual Visualization',
    imageUrl: '/images/labs/vibration_rf_shielding.jpg',
    caption: 'Cleanroom Heavy Shielding Architecture with Active Pneumatic Decoupling',
    description:
      'Architectural blueprint of seismic dampening platforms, active pneumatic suspension springs, and Faraday cage enclosures isolating quantum processors from external acoustic and electromagnetic noise.',
    keyFeatures: [
      'Seismic decoupling: Active pneumatic air springs resonant below 1.5 Hz',
      'Magnetic attenuation: > 80 dB DC magnetic field shielding via dual-layer mu-metal',
      'RF Faraday enclosure: Double-wall copper seam-welded cleanroom room isolating ambient Wi-Fi and cellular noise',
      'Vibration damping: Acoustic absorption baffles reducing compressor vibrational harmonics',
    ],
  },
  {
    id: 'diag-05',
    title: 'Advanced Superconducting Quantum Research Laboratory Complex',
    domain: 'Quantum Computing',
    status: 'Conceptual Visualization',
    imageUrl: '/images/labs/cryogenic_quantum_lab.jpg',
    caption: 'SHIELD Quantum Technology Laboratory Research Complex Cleanroom Bay',
    description:
      'Conceptual high-tech cleanroom facility integrating multiple cryogenic dilution refrigerators, automated helium recycling loops, and real-time quantum diagnostics stations.',
    keyFeatures: [
      'Cleanroom standard: ISO 5 / Class 100 laminar airflow cleanroom environment',
      'Helium management: Closed-loop 100% helium recovery and purification liquefaction plant',
      'Power conditioning: Online double-conversion isolated microgrid with battery backup',
      'Safety: Oxygen depletion monitoring and automated emergency ventilation systems',
    ],
  },
];
