export interface SimulatorVisualAsset {
  id: string;
  number: string;
  title: string;
  category:
    | 'Hardware & Packaging'
    | 'Cryogenics & Environment'
    | 'Qubit Physics'
    | 'Circuit & Unitary Math'
    | 'Quantum Information'
    | 'Noise & Error Correction'
    | 'Algorithms & Protocols'
    | 'Control & Readout';
  imageUrl: string;
  caption: string;
  description: string;
  scientificPrinciple: string;
  relatedQuantumConcept: string;
  relatedSimulatorFeature: string;
  formula?: string;
  specifications?: { label: string; value: string }[];
}

export const SIMULATOR_VISUAL_ASSETS: SimulatorVisualAsset[] = [
  {
    id: 'asset-01',
    number: '01',
    title: 'Quantum Processor',
    category: 'Hardware & Packaging',
    imageUrl: '/images/labs/quantum_processor_chamber.jpg',
    caption: 'Superconducting Quantum Processor in Gold-Plated Shielded Package',
    description:
      'High-coherence multi-qubit superconducting quantum processor mounted in a non-magnetic gold-plated OFHC copper enclosure with micro-coaxial wirebonds and low-loss microwave feedthroughs.',
    scientificPrinciple:
      'Planar Josephson junction transmons fabricated on high-resistivity silicon substrate, isolated from ambient thermal noise via 15 mK dilution refrigeration and superconducting lead/aluminum shields.',
    relatedQuantumConcept: 'Superconducting Transmon Qubits & cQED',
    relatedSimulatorFeature: 'QPU Architecture & 3D Hardware Lattice',
    formula: '\\hat{H}_{QPU} = \\sum_i \\omega_i \\hat{a}_i^\\dagger \\hat{a}_i + \\frac{\\alpha_i}{2} \\hat{a}_i^\\dagger \\hat{a}_i^\\dagger \\hat{a}_i \\hat{a}_i + \\sum_{\\langle i,j \\rangle} g_{ij} (\\hat{a}_i^\\dagger \\hat{a}_j + \\hat{a}_i \\hat{a}_j^\\dagger)',
    specifications: [
      { label: 'Operating Temperature', value: '15 mK (-273.135 °C)' },
      { label: 'Qubit Modality', value: 'Planar Transmon (Nb/Al/AlOx/Al)' },
      { label: 'Anharmonicity (α)', value: '-240 MHz' },
      { label: 'Coupling Architecture', value: 'Tunable Gmon / Capacitive Resonators' },
    ],
  },
  {
    id: 'asset-02',
    number: '02',
    title: 'Dilution Refrigerator',
    category: 'Cryogenics & Environment',
    imageUrl: '/images/labs/dilution_refrigerator.jpg',
    caption: 'Multi-Stage Closed-Loop Dilution Refrigerator Chandelier',
    description:
      'Continuous ³He/⁴He dilution cryostat providing progressive thermal gradient cooling across 300 K, 50 K, 4 K, 800 mK, 100 mK, down to 15 mK base temperature at the Mixing Chamber plate.',
    scientificPrinciple:
      'Endothermic enthalpy of mixing when ³He dilute phase crosses into the concentrated superfluid ⁴He phase absorbs heat continuously without boiling liquid cryogens.',
    relatedQuantumConcept: 'Millikelvin Thermodynamics & Thermal Dephasing',
    relatedSimulatorFeature: 'Hardware Specifications & Thermal Background',
    formula: '\\dot{Q} = 84 \\dot{n}_3 T_{MC}^2 - \\dot{Q}_{static}',
    specifications: [
      { label: 'Cooling Power @ 100 mK', value: '> 400 µW' },
      { label: 'Cooling Power @ 15 mK', value: '> 14 µW' },
      { label: 'Static Heat Load', value: '< 10 µW at Mixing Chamber' },
      { label: 'Thermal Shielding', value: 'Dual OFHC Gold-Plated Radiation Cans' },
    ],
  },
  {
    id: 'asset-03',
    number: '03',
    title: 'Superconducting Qubit',
    category: 'Qubit Physics',
    imageUrl: '/images/quantum_qpu_chip_macro.jpg',
    caption: 'Planar Transmon Circuit with Sub-Micron Josephson Junctions',
    description:
      'Non-linear artificial atom formed by an Al/AlOx/Al Josephson tunnel junction shunted by interdigitated coplanar capacitor pads to create an anharmonic multi-level quantum potential.',
    scientificPrinciple:
      'Large ratio of Josephson coupling energy to charging energy (EJ/EC ≈ 60) exponentially suppresses 1/f charge noise while maintaining addressable microwave transition frequencies.',
    relatedQuantumConcept: 'Anharmonic Two-Level System & Charge Insensitivity',
    relatedSimulatorFeature: 'Qubit Registry & Multi-Qubit Scaling (1-5 Qubits)',
    formula: '\\hat{H} = 4E_C(\\hat{n} - n_g)^2 - E_J\\cos\\hat{\\phi}',
    specifications: [
      { label: 'Transition Frequency (ω₀₁)', value: '4.8 – 5.4 GHz' },
      { label: 'Energy Ratio (EJ/EC)', value: '55 – 75' },
      { label: 'Relaxation Time (T₁)', value: '> 85 µs' },
      { label: 'Dephasing Time (T₂*)', value: '> 60 µs' },
    ],
  },
  {
    id: 'asset-04',
    number: '04',
    title: 'Quantum Chip Close-Up',
    category: 'Hardware & Packaging',
    imageUrl: '/images/quantum_qpu_chip_macro.jpg',
    caption: 'High-Density Transmon Lattice & Coplanar Waveguide Resonators',
    description:
      'Microscopic view of superconducting niobium transmission line resonators, Purcell filters, and aluminum qubit cross-islands patterned with electron-beam lithography.',
    scientificPrinciple:
      'Dispersive interaction between qubit dipoles and λ/4 coplanar resonators enables quantum non-demolition (QND) readout through state-dependent microwave frequency shifts Δω_r = ±χ.',
    relatedQuantumConcept: 'Circuit Quantum Electrodynamics (cQED)',
    relatedSimulatorFeature: 'QPU Physical Node Mapping & Qubit Canvas',
    formula: '\\hat{H}_{disp} = \\hbar(\\omega_r + \\chi \\hat{\\sigma}_z)\\hat{a}^\\dagger\\hat{a} + \\frac{\\hbar\\omega_q}{2}\\hat{\\sigma}_z',
    specifications: [
      { label: 'Readout Resonator Freq', value: '6.5 – 7.2 GHz' },
      { label: 'Dispersive Shift (2χ)', value: '1.2 MHz' },
      { label: 'Purcell Filter Suppression', value: '> 25 dB @ ω_q' },
      { label: 'Substrate', value: 'High-Resistivity Float-Zone Silicon (> 10 kΩ·cm)' },
    ],
  },
  {
    id: 'asset-05',
    number: '05',
    title: 'Qubit Network',
    category: 'Hardware & Packaging',
    imageUrl: '/images/photonics/optical_table_breadboard.jpg',
    caption: '2D Square Grid Connectivity & Nearest-Neighbor Coupling',
    description:
      'Interconnected planar lattice geometry where individual transmon qubits couple to four adjacent neighbors through capacitive couplers or tunable SQUID-based bus resonators.',
    scientificPrinciple:
      'Geometric arrangement optimized for planar surface codes, minimizing microwave crossing line crosstalk while enabling parallel two-qubit entangling gates.',
    relatedQuantumConcept: 'Planar Topology & Entangling Gates',
    relatedSimulatorFeature: '3D QPU Topology Tab & Multi-Qubit Moments',
    formula: '\\hat{H}_{int} = g (\\hat{\\sigma}_+^{(1)}\\hat{\\sigma}_-^{(2)} + \\hat{\\sigma}_-^{(1)}\\hat{\\sigma}_+^{(2)})',
    specifications: [
      { label: 'Lattice Geometry', value: '2D Heavy-Hex / Square Grid' },
      { label: 'Coupling Strength (g/2π)', value: '8 – 15 MHz' },
      { label: 'Crosstalk Isolation', value: '< -35 dB between non-neighbors' },
    ],
  },
  {
    id: 'asset-06',
    number: '06',
    title: 'Quantum Circuit',
    category: 'Circuit & Unitary Math',
    imageUrl: '/images/labs/quantum_processor_chamber.jpg',
    caption: 'Quantum Circuit Wire Architecture & Moment Scheduling',
    description:
      'Graphical timeline representation of quantum computational logic, where horizontal wires represent qubit state trajectories and vertical columns represent discrete unitary gate execution steps.',
    scientificPrinciple:
      'Any quantum algorithm is mathematically equivalent to the sequential application of unitary matrix transformations on the joint tensor product state space H = (ℂ²)^⊗N.',
    relatedQuantumConcept: 'Universal Quantum Gate Synthesis & Circuit Depth',
    relatedSimulatorFeature: 'Circuit Builder Grid & Gate Placement Canvas',
    formula: '|\\psi_{final}\\rangle = U_m U_{m-1} \\dots U_2 U_1 |00\\dots 0\\rangle',
    specifications: [
      { label: 'Supported Gates', value: '18 Unitary & Measurement Gates' },
      { label: 'State Vector Space', value: '2^N Complex Hilbert Space' },
      { label: 'Execution Mode', value: 'Step-by-Step Playback / Instant Evaluation' },
    ],
  },
  {
    id: 'asset-07',
    number: '07',
    title: 'Bloch Sphere',
    category: 'Quantum Information',
    imageUrl: '/images/labs/simulator_ambient_hero.jpg',
    caption: '3D Geometric Representation of Single-Qubit Pure & Mixed States',
    description:
      'Unit sphere S² mapping a single-qubit density matrix ρ = ½(I + r⃗ · σ⃗). Pure states lie on the surface (|r⃗| = 1), while decohered/mixed states lie inside (|r⃗| < 1).',
    scientificPrinciple:
      'Unitary operations correspond to geometric rotations R_n̂(θ) about the rotation axis n̂ by angle θ on the sphere surface.',
    relatedQuantumConcept: 'State Vectors, Density Matrices & Pauli Rotations',
    relatedSimulatorFeature: 'Interactive 3D Bloch Sphere View (Q[k])',
    formula: '|\\psi\\rangle = \\cos\\left(\\frac{\\theta}{2}\\right)|0\\rangle + e^{i\\phi}\\sin\\left(\\frac{\\theta}{2}\\right)|1\\rangle',
    specifications: [
      { label: 'Coordinates', value: 'Cartesian (x, y, z) & Spherical (θ, φ)' },
      { label: 'State Purity', value: '|r⃗| = √(⟨X⟩² + ⟨Y⟩² + ⟨Z⟩²)' },
      { label: 'Ground / Excited Prob', value: 'P(|0⟩) = ½(1 + z), P(|1⟩) = ½(1 - z)' },
    ],
  },
  {
    id: 'asset-08',
    number: '08',
    title: 'Quantum Superposition',
    category: 'Quantum Information',
    imageUrl: '/images/photonics/laser_beam_splitter.jpg',
    caption: 'Equal Superposition of Computational Basis States |0⟩ and |1⟩',
    description:
      'Linear combination of orthogonal basis states created by applying a Hadamard gate to the ground state |0⟩, yielding state |+⟩ with equal 50% probability amplitudes.',
    scientificPrinciple:
      'Quantum parallelism allows quantum circuits to process all 2^N computational basis states simultaneously across a single unified state vector.',
    relatedQuantumConcept: 'Hadamard Transform & Quantum Interference',
    relatedSimulatorFeature: 'H Gate & Uniform Superposition Preset',
    formula: 'H|0\\rangle = \\frac{|0\\rangle + |1\\rangle}{\\sqrt{2}} = |+\\rangle, \\quad H|1\\rangle = \\frac{|0\\rangle - |1\\rangle}{\\sqrt{2}} = |-\\rangle',
    specifications: [
      { label: 'Hadamard Matrix', value: '1/√2 [[1, 1], [1, -1]]' },
      { label: 'Measurement Probability', value: 'P(0) = 0.50, P(1) = 0.50' },
      { label: 'Relative Phase', value: 'Δφ = 0 rad (|+) / π rad (|-)' },
    ],
  },
  {
    id: 'asset-09',
    number: '09',
    title: 'Quantum Entanglement',
    category: 'Quantum Information',
    imageUrl: '/images/photonics/photonic_quantum_experiment.jpg',
    caption: 'Maximal Entanglement & Non-Local Bell State Generation',
    description:
      'Two-qubit composite state that cannot be factored into product states |ψ₁⟩ ⊗ |ψ₂⟩. Measuring one qubit instantaneously determines the state of the entangled counterpart.',
    scientificPrinciple:
      'Generated on superconducting hardware by sequencing a single-qubit Hadamard gate with a two-qubit CNOT gate: (CNOT)(H ⊗ I)|00⟩ = (|00⟩ + |11⟩)/√2.',
    relatedQuantumConcept: 'Bell States (|Φ⁺⟩, |Φ⁻⟩, |Ψ⁺⟩, |Ψ⁻⟩) & EPR Correlations',
    relatedSimulatorFeature: 'Bell State Algorithm Preset & CNOT / CZ Gates',
    formula: '|\\Phi^+\\rangle = \\frac{|00\\rangle + |11\\rangle}{\\sqrt{2}}',
    specifications: [
      { label: 'Entanglement Entropy', value: 'S(ρ_A) = 1.0 bit (Maximal)' },
      { label: 'Concurrence', value: 'C(|Φ⁺⟩) = 1.00' },
      { label: 'Bell-CHSH Inequality', value: '|S| = 2√2 ≈ 2.828 > 2 (Violates Local Realism)' },
    ],
  },
  {
    id: 'asset-10',
    number: '10',
    title: 'Quantum Measurement',
    category: 'Quantum Information',
    imageUrl: '/images/photonics/single_photon_detector.jpg',
    caption: 'Projective Born Measurement & Wavefunction Collapse',
    description:
      'Irreversible quantum measurement projecting the continuous complex state vector |ψ⟩ onto discrete computational basis states |i⟩ with Born probabilities P(i) = |⟨i|ψ⟩|².',
    scientificPrinciple:
      'Executed via dispersive microwave readout where transmitted microwave phase discrimination breaks quantum coherence to record classical bits 0 or 1.',
    relatedQuantumConcept: 'Born Rule, Wavefunction Collapse & QND Measurements',
    relatedSimulatorFeature: 'Empirical Measurement Sampler (100 / 1k / 10k Shots)',
    formula: 'P(i) = |c_i|^2 = |\\langle i|\\psi\\rangle|^2, \\quad \\sum_i P(i) = 1',
    specifications: [
      { label: 'Shot Sampler Range', value: '100, 1,000, 10,000 Shots' },
      { label: 'Readout Duration', value: '250 – 500 ns' },
      { label: 'State Assignment Fidelity', value: 'F_meas > 98.5%' },
    ],
  },
  {
    id: 'asset-11',
    number: '11',
    title: 'Quantum Gate',
    category: 'Circuit & Unitary Math',
    imageUrl: '/images/labs/quantum_processor_chamber.jpg',
    caption: 'Universal Single- & Multi-Qubit Unitary Operators',
    description:
      'Fundamental building blocks of quantum computation. Reversible norm-preserving operators that rotate state vectors within Hilbert space.',
    scientificPrinciple:
      'Any arbitrary N-qubit unitary operator can be decomposed into single-qubit rotations (Euler angles RX, RY, RZ) and entangling two-qubit CNOT gates.',
    relatedQuantumConcept: 'Unitary Matrices (U†U = I) & Gate Fidelities',
    relatedSimulatorFeature: '18-Gate Interactive Palette (Single & Multi-Qubit)',
    formula: 'U = e^{-i \\frac{\\theta}{2} (n_x X + n_y Y + n_z Z)}',
    specifications: [
      { label: 'Single-Qubit Gate Time', value: '15 – 25 ns (Microwave DRAG)' },
      { label: 'Two-Qubit Gate Time', value: '35 – 60 ns (Cross-Resonance / Flux)' },
      { label: 'Single-Qubit Fidelity', value: '99.92%' },
      { label: 'Two-Qubit Fidelity', value: '99.45%' },
    ],
  },
  {
    id: 'asset-12',
    number: '12',
    title: 'Quantum Error Correction',
    category: 'Noise & Error Correction',
    imageUrl: '/images/labs/cryogenic_quantum_lab.jpg',
    caption: 'Planar Surface Code & Stabilizer Syndrome Extraction',
    description:
      'Encodes a single logical qubit across an array of physical data and ancilla qubits. Continuous stabilizer parity measurements identify and correct bit-flip (X) and phase-flip (Z) errors.',
    scientificPrinciple:
      'Operates below the fault-tolerant threshold (p_th ≈ 1%), exponentially suppressing logical error rates P_L ∝ (p/p_th)^{(d+1)/2} as code distance d increases.',
    relatedQuantumConcept: 'Topological Stabilizer Codes & Logical Qubits',
    relatedSimulatorFeature: 'Hardware Connection & Fault-Tolerance Overview',
    formula: 'A_s = \\prod_{i \\in v(s)} X_i = \\pm 1, \\quad B_p = \\prod_{j \\in \\partial p} Z_j = \\pm 1',
    specifications: [
      { label: 'Distance-3 Patch', value: '17 Physical Qubits (9 Data, 8 Ancilla)' },
      { label: 'Distance-5 Patch', value: '49 Physical Qubits (25 Data, 24 Ancilla)' },
      { label: 'Syndrome Cycle Time', value: '200 – 400 ns' },
    ],
  },
  {
    id: 'asset-13',
    number: '13',
    title: 'Quantum Noise & Decoherence',
    category: 'Noise & Error Correction',
    imageUrl: '/images/labs/vibration_rf_shielding.jpg',
    caption: 'Decoherence, Depolarizing Channels & Readout Confusion Matrix',
    description:
      'Environmental interactions causing energy relaxation (T₁), phase decoherence (T₂), and measurement confusion that degrade pure quantum states into mixed statistical ensembles.',
    scientificPrinciple:
      'Modeled via Kraus channel operators: depolarizing noise mixes the state with the maximally mixed state ρ → (1-p)ρ + (p/d)I, while readout confusion swaps measured bit outcomes.',
    relatedQuantumConcept: 'Kraus Operators, T1/T2 Relaxation & State Fidelity',
    relatedSimulatorFeature: 'Configurable Noise Simulator (Depolarizing & Readout Sliders)',
    formula: '\\mathcal{E}(\\rho) = (1 - p)\\rho + \\frac{p}{2^N} I',
    specifications: [
      { label: 'Simulated Depolarizing Rate', value: '0.0% – 25.0%' },
      { label: 'Simulated Readout Error', value: '0.0% – 20.0%' },
      { label: 'State Fidelity Degradation', value: 'F(\\rho_{pure}, \\rho_{noisy}) = \\text{Tr}(\\sqrt{\\rho_{pure}}\\rho_{noisy}\\sqrt{\\rho_{pure}})' },
    ],
  },
  {
    id: 'asset-14',
    number: '14',
    title: 'Quantum Teleportation',
    category: 'Algorithms & Protocols',
    imageUrl: '/images/photonics/quantum_optical_fiber.jpg',
    caption: '3-Qubit State Teleportation via Shared Entanglement',
    description:
      'Transfers an unknown quantum state |ψ⟩ from Q0 to Q2 without physically transmitting the qubit itself, utilizing a shared Bell pair between Q1-Q2 and 2 classical feedforward bits.',
    scientificPrinciple:
      'Bell measurement on Q0-Q1 collapses the entanglement, mapping the state onto Q2 up to one of four Pauli operations (I, X, Z, XZ) corrected via classical feedforward.',
    relatedQuantumConcept: 'EPR Pairs, Bell Measurement & Classical Feedforward',
    relatedSimulatorFeature: 'Quantum Teleportation Algorithm Preset',
    formula: '|\\psi\\rangle = \\alpha|0\\rangle + \\beta|1\\rangle \\xrightarrow{\\text{Teleport}} Q_2 = \\alpha|0\\rangle + \\beta|1\\rangle',
    specifications: [
      { label: 'Required Qubits', value: '3 Qubits' },
      { label: 'Classical Channel', value: '2 Classical Bits' },
      { label: 'Protocol Fidelity', value: '100% (Ideal Simulation)' },
    ],
  },
  {
    id: 'asset-15',
    number: '15',
    title: 'Grover Search Algorithm',
    category: 'Algorithms & Protocols',
    imageUrl: '/images/photonics/optical_table_breadboard.jpg',
    caption: 'Quadratic Speedup Database Search & Amplitude Amplification',
    description:
      'Finds a unique marked item in an unsorted database of N = 2^n elements in O(√N) iterations compared to classical O(N) linear search, by rotating state vectors toward the target state.',
    scientificPrinciple:
      'Alternates between an Oracle phase inversion (marking the target state with a -1 phase) and a Grover Diffusion Operator (inverting amplitudes about the average mean).',
    relatedQuantumConcept: 'Amplitude Amplification & Quantum Oracles',
    relatedSimulatorFeature: "Grover's Search Algorithm Preset (Target |11⟩)",
    formula: 'G = (2|\\psi\\rangle\\langle\\psi| - I) U_{\\omega}',
    specifications: [
      { label: 'Speedup', value: 'Quadratic O(√N) vs Classical O(N)' },
      { label: 'Target State', value: '|11⟩ (2-Qubit Oracle)' },
      { label: 'Amplified Probability', value: 'P(|11⟩) = 100% (after 1 Grover iteration)' },
    ],
  },
  {
    id: 'asset-16',
    number: '16',
    title: 'Quantum Fourier Transform (QFT)',
    category: 'Algorithms & Protocols',
    imageUrl: '/images/photonics/optical_interferometer.jpg',
    caption: 'Discrete Quantum Fourier Transform with Controlled Phase Rotations',
    description:
      'Quantum analog of the discrete Fourier transform. Maps quantum amplitudes into frequency/phase representations in O(n²) gates compared to classical FFT O(n 2ⁿ).',
    scientificPrinciple:
      'Sequences Hadamard gates with controlled phase rotations R_k = diag(1, e^{2πi/2^k}) followed by qubit SWAP reversals to encode phase frequencies.',
    relatedQuantumConcept: 'Phase Estimation, Period Finding & Shor Algorithm Core',
    relatedSimulatorFeature: '3-Qubit QFT Algorithm Preset',
    formula: '|j\\rangle \\mapsto \\frac{1}{\\sqrt{N}} \\sum_{k=0}^{N-1} \\omega^{jk} |k\\rangle, \\quad \\omega = e^{2\\pi i / N}',
    specifications: [
      { label: 'Gate Complexity', value: 'O(n²) Gates vs Classical O(n 2ⁿ)' },
      { label: 'Qubits Utilized', value: '3 Qubits' },
      { label: 'Primary Application', value: 'Quantum Phase Estimation & Shor Factoring' },
    ],
  },
  {
    id: 'asset-17',
    number: '17',
    title: 'Quantum Algorithm Execution Flow',
    category: 'Circuit & Unitary Math',
    imageUrl: '/images/labs/quantum_control_electronics.jpg',
    caption: 'State Prep → Unitary Gates → Noise Channel → Measurement Sampling',
    description:
      'The comprehensive scientific computational pipeline: classical input initialization into ground state |00...0⟩, unitary circuit transformations, decoherence modeling, and multi-shot measurement collapse.',
    scientificPrinciple:
      'Mathematically exact state-vector matrix kernel executing unitary multiplications across 2^N complex amplitude dimensions.',
    relatedQuantumConcept: 'End-to-End Quantum Computational Pipeline',
    relatedSimulatorFeature: 'Simulation Engine & Technical Diagnostics HUD',
    formula: '\\rho_{out} = \\mathcal{E}\\left( U |0^{\\otimes N}\\rangle\\langle 0^{\\otimes N}| U^\\dagger \\right) \\xrightarrow{\\text{Sample}} \\{N_0, N_1, \\dots\\}',
    specifications: [
      { label: 'Dimension Scaling', value: '2^N Dimensions (32 Amplitudes for 5 Qubits)' },
      { label: 'Floating Point Precision', value: '64-Bit Double Precision Complex Math' },
      { label: 'Unitary Norm Verification', value: '∑ |c_i|² = 1.000000' },
    ],
  },
  {
    id: 'asset-18',
    number: '18',
    title: 'Quantum Control Electronics',
    category: 'Control & Readout',
    imageUrl: '/images/labs/quantum_control_electronics.jpg',
    caption: 'FPGA Direct Digital Synthesis & Microwave AWG Racks',
    description:
      'Room-temperature control infrastructure synthesizing high-speed 5–7 GHz microwave pulses with sub-nanosecond synchronization, IQ mixing, and active DRAG derivative shaping.',
    scientificPrinciple:
      'Generates shaped microwave envelopes V(t) = I(t)cos(ω_d t) + Q(t)sin(ω_d t) to drive selective Rabi oscillations between transmon energy levels |0⟩ and |1⟩.',
    relatedQuantumConcept: 'Rabi Oscillations, DRAG Pulses & Microwave Drive',
    relatedSimulatorFeature: 'Microwave Pulse Synthesis Connection Panel',
    formula: '\\Omega(t) = \\frac{e \\mathcal{E}(t) \\langle 0|\\hat{n}|1\\rangle}{\\hbar}',
    specifications: [
      { label: 'AWG Sampling Rate', value: '5.0 GSa/s (16-Bit Resolution)' },
      { label: 'Pulse Frequency Range', value: '4.5 – 7.5 GHz' },
      { label: 'Synchronization Jitter', value: '< 10 ps between channels' },
    ],
  },
  {
    id: 'asset-19',
    number: '19',
    title: 'Quantum Readout System',
    category: 'Control & Readout',
    imageUrl: '/images/labs/vibration_rf_shielding.jpg',
    caption: 'TWPA Parametric Amplification & Cryogenic Readout Chain',
    description:
      'Ultra-low-noise cryogenic amplification chain: transmitted readout microwave photons are amplified at 15 mK by a Traveling Wave Parametric Amplifier (TWPA), boosted by 4K HEMT amplifiers, and demodulated by room-temperature FPGAs.',
    scientificPrinciple:
      'Phase-preserving near-quantum-limited parametric amplification adds minimal excess noise photons (N_add ≈ 0.5), enabling high-fidelity single-shot state discrimination in < 300 ns.',
    relatedQuantumConcept: 'Near-Quantum-Limited Amplification & Heterodyne Readout',
    relatedSimulatorFeature: 'Measurement Shot Sampler & Error Models',
    formula: 'V_{out}(t) = G [V_{in}(t) + V_{quantum\\ noise}]',
    specifications: [
      { label: 'TWPA Gain @ 6.5 GHz', value: '> 20 dB' },
      { label: 'Added Noise Temperature', value: 'T_add < 300 mK (Near Quantum Limit)' },
      { label: 'Readout Demodulation', value: 'Heterodyne Digital IQ Filtering' },
    ],
  },
  {
    id: 'asset-20',
    number: '20',
    title: 'SHIELD Quantum Laboratory',
    category: 'Cryogenics & Environment',
    imageUrl: '/images/labs/simulator_ambient_hero.jpg',
    caption: 'Next-Generation Quantum Supercomputing Research Facility',
    description:
      'Wide cinematic view of the SHIELD Quantum research laboratory integrating multiple dilution refrigerators, ultra-cleanroom ISO-5 bays, automated helium recovery, and real-time quantum diagnostics.',
    scientificPrinciple:
      'Holistic physical infrastructure engineered to isolate solid-state quantum processors from thermal, electromagnetic, and vibrational perturbations.',
    relatedQuantumConcept: 'Facility Engineering & Scalable Supercomputing',
    relatedSimulatorFeature: 'Cinematic Live Laboratory Backdrop & Research Connection',
    formula: '\\text{Isolation} = \\text{Thermal}(15\\text{ mK}) + \\text{EMI}(>80\\text{ dB}) + \\text{Seismic}(<1.5\\text{ Hz})',
    specifications: [
      { label: 'Cleanroom Standard', value: 'ISO 5 Laminar Flow Environment' },
      { label: 'Magnetic Shielding', value: 'Dual-Layer Cryogenic Mu-Metal' },
      { label: 'Helium Recovery', value: '100% Closed-Loop Liquefaction' },
    ],
  },
];
