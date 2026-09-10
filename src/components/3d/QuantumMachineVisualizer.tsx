'use client';

import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Thermometer } from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   HIGH-REALISM CRYOGENIC DILUTION REFRIGERATOR & QPU
   Scientifically proportioned 3D Cryostat:
   - 6 Gold-plated OFHC Copper Thermal Flanges
   - Stainless steel structural support truss
   - High-density semi-rigid coaxial microwave lines with SMA attenuators
   - He3/He4 condensing lines and silver-sinter heat exchangers
   - Bottom Magnetic Shield Canister with cutaway QPU Silicon Die
   - Cylindrical thermal radiation shield shroud with viewport
   ═══════════════════════════════════════════════════════ */

interface CryoStageData {
  name: string;
  temp: string;
  yPos: number;
  radius: number;
  thickness: number;
  color: string;
  pressure: string;
  hardware: string;
  purpose: string;
}

const CRYO_STAGES: CryoStageData[] = [
  {
    name: 'Top Vacuum Flange',
    temp: '300 K (27°C)',
    yPos: 3.0,
    radius: 2.1,
    thickness: 0.16,
    color: '#94a3b8',
    pressure: '10⁻⁸ mbar',
    hardware: 'Hermetic SMA Feedthroughs & Vacuum Port',
    purpose: 'Atmospheric isolation and classical control line ingress.',
  },
  {
    name: '50K Radiation Shield Plate',
    temp: '50 K (-223°C)',
    yPos: 1.9,
    radius: 1.85,
    thickness: 0.14,
    color: '#eab308',
    pressure: 'Cryo-pumping',
    hardware: 'Gold-plated OFHC Copper Disk & Thermal Braids',
    purpose: 'First thermal interception stage driven by pulse-tube stage 1.',
  },
  {
    name: '4K Condenser Cold Plate',
    temp: '4.2 K (-269°C)',
    yPos: 0.85,
    radius: 1.6,
    thickness: 0.13,
    color: '#eab308',
    pressure: 'Liquid Helium (⁴He)',
    hardware: '20 dB Cryogenic Attenuators & HEMT Amplifiers',
    purpose: 'Thermalizes incoming microwave cables and houses cryogenic low-noise amplifiers.',
  },
  {
    name: 'Still Evaporator Stage',
    temp: '800 mK',
    yPos: -0.15,
    radius: 1.35,
    thickness: 0.12,
    color: '#ca8a04',
    pressure: '³He Rich Phase',
    hardware: 'Distillation Chamber & 10 dB Attenuator Blocks',
    purpose: 'Continuously evaporates ³He gas to sustain dilution cooling cycle.',
  },
  {
    name: '100mK Cold Plate',
    temp: '100 mK',
    yPos: -1.05,
    radius: 1.1,
    thickness: 0.11,
    color: '#ca8a04',
    pressure: 'Continuous Phase Boundary',
    hardware: 'Step Heat Exchangers & Superconducting NbTi Coax',
    purpose: 'Pre-cools circulating helium mixture before entering mixing chamber.',
  },
  {
    name: 'Mixing Chamber & QPU Package',
    temp: '14.8 mK (-273.135°C)',
    yPos: -1.95,
    radius: 0.9,
    thickness: 0.15,
    color: '#00d4ff',
    pressure: 'Superfluid ³He/⁴He Interface',
    hardware: 'Cryoperm Magnetic Shield & Superconducting QPU Die',
    purpose: 'Base temperature stage where ³He dissolves into ⁴He, cooling qubits near absolute zero.',
  },
];

function DilutionRefrigeratorModel({
  activeStage,
  setActiveStage,
}: {
  activeStage: number | null;
  setActiveStage: (idx: number | null) => void;
}) {
  const machineRef = useRef<THREE.Group>(null);
  const qpuGlowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (machineRef.current) {
      // Very smooth, deliberate scientific inspection rotation
      machineRef.current.rotation.y = t * 0.15;
      machineRef.current.position.y = Math.sin(t * 0.6) * 0.05;
    }
    if (qpuGlowRef.current) {
      const pulse = 1 + Math.sin(t * 2.5) * 0.15;
      qpuGlowRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  // Structural Support Columns (Heavy Titanium / Stainless Steel Pillars)
  const supportPillars = useMemo(() => {
    const pillars = [];
    const count = 3;
    for (let i = 0; i < count; i++) {
      const angle = (i * Math.PI * 2) / count;
      const r = 1.35;
      pillars.push({
        x: r * Math.cos(angle),
        z: r * Math.sin(angle),
      });
    }
    return pillars;
  }, []);

  // Realistic Semi-Rigid Coaxial Wiring Bundles (Organized microwave harness paths)
  const coaxHarnesses = useMemo(() => {
    const bundles = [];
    const bundleCount = 8;
    for (let b = 0; b < bundleCount; b++) {
      const baseAngle = (b * Math.PI * 2) / bundleCount;
      const points = [];
      const steps = 40;
      for (let s = 0; s <= steps; s++) {
        const p = s / steps;
        const y = 3.0 - p * 5.0; // From top flange to 15mK base
        const radius = 0.55 + Math.sin(p * Math.PI) * 0.5;
        const angle = baseAngle + p * 0.8;
        points.push(new THREE.Vector3(radius * Math.cos(angle), y, radius * Math.sin(angle)));
      }
      bundles.push(new THREE.BufferGeometry().setFromPoints(points));
    }
    return bundles;
  }, []);

  // Helical Helium Condensing Tubes
  const condensingTube = useMemo(() => {
    const pts = [];
    const turns = 6;
    const steps = 120;
    for (let i = 0; i <= steps; i++) {
      const p = i / steps;
      const y = 2.8 - p * 4.4;
      const r = 0.35 + Math.sin(p * Math.PI) * 0.15;
      const theta = p * Math.PI * 2 * turns;
      pts.push(new THREE.Vector3(r * Math.cos(theta), y, r * Math.sin(theta)));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  }, []);

  return (
    <group ref={machineRef} position={[0, 0.1, 0]}>
      {/* Central Vacuum Extraction Column */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 5.4, 24]} />
        <meshStandardMaterial color="#64748b" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* Structural Pillars */}
      {supportPillars.map((p, i) => (
        <mesh key={i} position={[p.x, 0.5, p.z]}>
          <cylinderGeometry args={[0.045, 0.045, 5.0, 16]} />
          <meshStandardMaterial color="#cbd5e1" metalness={0.92} roughness={0.18} />
        </mesh>
      ))}

      {/* 6 Cryogenic Plates (Machined Gold & Stainless Steel) */}
      {CRYO_STAGES.map((stage, idx) => {
        const isSelected = activeStage === idx;
        const isBase = idx === CRYO_STAGES.length - 1;
        const isTop = idx === 0;

        return (
          <group key={stage.name} position={[0, stage.yPos, 0]}>
            {/* Main Stage Flange (Thick Machined Disk) */}
            <mesh
              onClick={(e) => {
                e.stopPropagation();
                setActiveStage(isSelected ? null : idx);
              }}
              onPointerOver={(e) => {
                e.stopPropagation();
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = 'default';
              }}
            >
              <cylinderGeometry args={[stage.radius, stage.radius, stage.thickness, 48]} />
              <meshStandardMaterial
                color={isSelected ? '#00d4ff' : isTop ? '#94a3b8' : '#eab308'}
                metalness={isTop ? 0.88 : 0.96}
                roughness={isTop ? 0.25 : 0.14}
                emissive={isSelected ? '#00d4ff' : '#000000'}
                emissiveIntensity={isSelected ? 0.45 : 0}
              />
            </mesh>

            {/* Perimeter Bolt Circle Details */}
            {Array.from({ length: 12 }).map((_, bIdx) => {
              const bAng = (bIdx * Math.PI * 2) / 12;
              const bR = stage.radius - 0.08;
              return (
                <mesh key={bIdx} position={[bR * Math.cos(bAng), stage.thickness / 2 + 0.015, bR * Math.sin(bAng)]}>
                  <cylinderGeometry args={[0.02, 0.02, 0.03, 8]} />
                  <meshStandardMaterial color="#f8fafc" metalness={0.95} roughness={0.1} />
                </mesh>
              );
            })}

            {/* Attenuator Blocks on 4K, Still, and 100mK plates */}
            {idx >= 2 && idx <= 4 && (
              <group position={[0, -stage.thickness / 2 - 0.15, 0]}>
                {Array.from({ length: 6 }).map((_, attIdx) => {
                  const attAng = (attIdx * Math.PI * 2) / 6 + 0.3;
                  const attR = stage.radius * 0.65;
                  return (
                    <group key={attIdx} position={[attR * Math.cos(attAng), 0, attR * Math.sin(attAng)]}>
                      {/* Cylindrical RF Attenuator */}
                      <mesh>
                        <cylinderGeometry args={[0.04, 0.04, 0.28, 12]} />
                        <meshStandardMaterial color="#d4d4d8" metalness={0.92} roughness={0.2} />
                      </mesh>
                      {/* Gold SMA connector caps */}
                      <mesh position={[0, 0.15, 0]}>
                        <cylinderGeometry args={[0.045, 0.045, 0.04, 8]} />
                        <meshStandardMaterial color="#eab308" metalness={0.96} roughness={0.15} />
                      </mesh>
                      <mesh position={[0, -0.15, 0]}>
                        <cylinderGeometry args={[0.045, 0.045, 0.04, 8]} />
                        <meshStandardMaterial color="#eab308" metalness={0.96} roughness={0.15} />
                      </mesh>
                    </group>
                  );
                })}
              </group>
            )}

            {/* Base 15mK Stage: Realistic QPU Enclosure & Chip Die */}
            {isBase && (
              <group position={[0, -0.55, 0]}>
                {/* Outer Cryoperm Magnetic Shield (Cutaway Canister) */}
                <mesh position={[0, 0, 0]}>
                  <cylinderGeometry args={[0.65, 0.65, 0.85, 36, 1, true, 0, Math.PI * 1.5]} />
                  <meshStandardMaterial
                    color="#0284c7"
                    metalness={0.92}
                    roughness={0.15}
                    side={THREE.DoubleSide}
                  />
                </mesh>

                {/* Shield Rim Rings */}
                <mesh position={[0, 0.425, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.65, 0.02, 12, 36]} />
                  <meshStandardMaterial color="#0284c7" metalness={0.95} roughness={0.1} />
                </mesh>
                <mesh position={[0, -0.425, 0]} rotation={[Math.PI / 2, 0, 0]}>
                  <torusGeometry args={[0.65, 0.02, 12, 36]} />
                  <meshStandardMaterial color="#0284c7" metalness={0.95} roughness={0.1} />
                </mesh>

                {/* Heavy Gold QPU Packaging Block */}
                <mesh position={[0, -0.05, 0]}>
                  <boxGeometry args={[0.55, 0.22, 0.55]} />
                  <meshStandardMaterial color="#eab308" metalness={0.96} roughness={0.12} />
                </mesh>

                {/* Silicon Quantum Processor Die Carrier */}
                <mesh position={[0, 0.07, 0]}>
                  <boxGeometry args={[0.38, 0.025, 0.38]} />
                  <meshStandardMaterial color="#1e293b" metalness={0.9} roughness={0.1} />
                </mesh>

                {/* Silicon Chip Die (Deep Reflective Black Surface) */}
                <mesh position={[0, 0.09, 0]}>
                  <boxGeometry args={[0.28, 0.015, 0.28]} />
                  <meshStandardMaterial color="#020617" metalness={0.98} roughness={0.04} />
                </mesh>

                {/* Superconducting Circuit Grid Pattern on Chip */}
                <mesh position={[0, 0.102, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <planeGeometry args={[0.22, 0.22]} />
                  <meshBasicMaterial color="#00d4ff" wireframe transparent opacity={0.65} />
                </mesh>

                {/* Quantum Coherent Core Glow */}
                <mesh ref={qpuGlowRef} position={[0, 0.12, 0]}>
                  <sphereGeometry args={[0.11, 24, 24]} />
                  <meshBasicMaterial
                    color="#00d4ff"
                    transparent
                    opacity={0.85}
                    blending={THREE.AdditiveBlending}
                  />
                </mesh>

                {/* Intense Cryogenic Illuminator */}
                <pointLight position={[0, 0.15, 0]} color="#00d4ff" intensity={3.5} distance={3.5} />
              </group>
            )}
          </group>
        );
      })}

      {/* Semi-Rigid Coaxial Wiring Bundles */}
      {coaxHarnesses.map((geo, i) => (
        <primitive
          key={i}
          object={
            new THREE.Line(
              geo,
              new THREE.LineBasicMaterial({
                color: i % 2 === 0 ? '#eab308' : '#cbd5e1',
                transparent: true,
                opacity: 0.85,
                linewidth: 1.8,
              })
            )
          }
        />
      ))}

      {/* Helical Helium Mixture Circulation Line */}
      <primitive
        object={
          new THREE.Line(
            condensingTube,
            new THREE.LineBasicMaterial({
              color: '#d97706',
              transparent: true,
              opacity: 0.6,
              linewidth: 1.5,
            })
          )
        }
      />

      {/* Subtle Outer Vacuum Shroud (Transparent Cryostat Enclosure with viewport) */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[2.35, 2.35, 6.2, 36, 1, true]} />
        <meshStandardMaterial
          color="#00d4ff"
          transparent
          opacity={0.03}
          metalness={0.9}
          roughness={0.1}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

export default function QuantumMachineVisualizer() {
  const [activeStage, setActiveStage] = useState<number | null>(5); // Default to mixing chamber & QPU
  const selectedData = activeStage !== null ? CRYO_STAGES[activeStage] : CRYO_STAGES[5];

  return (
    <div className="relative w-full h-[540px] sm:h-[600px] lg:h-[650px] flex items-center justify-center">
      {/* 3D WebGL Canvas with PBR Studio Lighting */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0.2, 7.6], fov: 42, near: 0.1, far: 100 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent' }}
        >
          {/* Studio Key & Rim Lighting tuned for gold and stainless steel specular highlights */}
          <ambientLight intensity={0.85} />
          <directionalLight position={[6, 10, 6]} intensity={2.8} color="#fffbeb" />
          <directionalLight position={[-6, -4, -4]} intensity={1.4} color="#00d4ff" />
          <pointLight position={[3, 2, 4]} color="#fbbf24" intensity={1.5} distance={8} />

          <DilutionRefrigeratorModel activeStage={activeStage} setActiveStage={setActiveStage} />
        </Canvas>
      </div>

      {/* Top HUD: Hardware Title & Live Telemetry Badge */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-black/85 px-3.5 py-1.5 rounded-lg border border-white/[0.08] backdrop-blur-md shadow-lg">
          <div className="w-2 h-2 rounded-full bg-quantum-emerald animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-text-primary uppercase">
            SHIELD MK-IV CRYOSTAT // 15 mK DILUTION REFRIGERATOR
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-black/85 px-3 py-1.5 rounded-lg border border-photon-cyan/40 backdrop-blur-md text-[10px] sm:text-xs font-mono text-photon-cyan shadow-lg">
          <Thermometer className="w-3.5 h-3.5" />
          <span>T_BASE: <strong className="text-white">14.8 mK</strong></span>
        </div>
      </div>

      {/* Stage Selector Pill Bar (Left side) */}
      <div className="absolute left-3 top-16 bottom-20 z-10 hidden md:flex flex-col justify-center pointer-events-auto">
        <div className="space-y-1.5 bg-black/85 p-2 rounded-lg border border-white/[0.08] backdrop-blur-md shadow-lg">
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-wider block mb-1 px-1">
            Cryo Flanges:
          </span>
          {CRYO_STAGES.map((st, i) => (
            <button
              key={st.name}
              onClick={() => setActiveStage(i)}
              className={`w-full text-left px-2.5 py-1.5 text-[10px] font-mono rounded flex items-center justify-between gap-3 transition-all ${
                activeStage === i
                  ? 'bg-photon-cyan/20 text-photon-cyan border border-photon-cyan/50 font-bold shadow-[0_0_10px_rgba(0,212,255,0.2)]'
                  : 'text-text-muted hover:text-text-secondary hover:bg-white/5'
              }`}
            >
              <span>{st.name.split(' ')[0]}</span>
              <span className="text-[9px] opacity-80">{st.temp.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Pinned Stage Telemetry Card */}
      <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-auto">
        <div className="bg-black/90 p-4 rounded-xl border border-photon-cyan/30 backdrop-blur-md max-w-2xl mx-auto shadow-[0_0_30px_rgba(0,212,255,0.12)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2.5 border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedData.color }} />
              <h4 className="text-xs sm:text-sm font-bold font-mono text-text-primary">
                {selectedData.name}
              </h4>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span className="text-photon-cyan font-bold">{selectedData.temp}</span>
              <span className="text-text-muted">|</span>
              <span className="text-text-secondary text-[11px]">{selectedData.pressure}</span>
            </div>
          </div>

          <div className="mt-2 text-[11px] text-text-secondary leading-relaxed">
            <strong className="text-text-primary font-mono">{selectedData.hardware}: </strong>
            {selectedData.purpose}
          </div>

          {/* Quick Hardware Metrics */}
          <div className="mt-3 pt-2.5 border-t border-white/[0.06] grid grid-cols-3 gap-2 text-center text-[10px] font-mono">
            <div className="bg-white/[0.02] p-1.5 rounded border border-white/[0.04]">
              <span className="text-text-muted block text-[8px] uppercase">Qubit Register</span>
              <span className="text-photon-cyan font-bold">128 Physical Qubits</span>
            </div>
            <div className="bg-white/[0.02] p-1.5 rounded border border-white/[0.04]">
              <span className="text-text-muted block text-[8px] uppercase">Coherence T₁ / T₂*</span>
              <span className="text-quantum-emerald font-bold">92 µs / 124 µs</span>
            </div>
            <div className="bg-white/[0.02] p-1.5 rounded border border-white/[0.04]">
              <span className="text-text-muted block text-[8px] uppercase">2Q Gate Fidelity</span>
              <span className="text-quantum-violet font-bold">99.94% (CZ Gate)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
