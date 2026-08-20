'use client';

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Zap,
  RotateCw,
  Sparkles,
  Gauge,
  CheckCircle2,
  Atom,
  Layers,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   WORLD-CLASS 3D BLOCH SPHERE & QUANTUM STATE VISUALIZER
   - Volumetric Fresnel glow qubit sphere
   - Explicit 3-axis coordinate frame with basis labels (|0⟩, |1⟩, |+⟩, |-⟩, |+i⟩, |-i⟩)
   - Dynamic luminous state vector |ψ⟩ with energy trail
   - Layered wavefunction probability cloud (2,000 particles modulated by |ψ|²)
   - Live Born-rule measurement collapse & Larmor precession
   - Research-grade laboratory telemetry HUD
   ═══════════════════════════════════════════════════════ */

const SPHERE_RADIUS = 2.1;

interface BlochVisualizerProps {
  theta: number;
  phi: number;
  isCollapsing: boolean;
  activeGate: string;
  autoPrecess: boolean;
}

function VolumetricBlochSphere({
  theta,
  phi,
  isCollapsing,
  activeGate,
  autoPrecess,
}: BlochVisualizerProps) {
  const masterGroupRef = useRef<THREE.Group>(null);
  const vectorGroupRef = useRef<THREE.Group>(null);
  const particleGeoRef = useRef<THREE.BufferGeometry>(null);
  const haloGlowRef = useRef<THREE.Mesh>(null);
  const trailLineRef = useRef<THREE.Line>(null);

  // Damped angles
  const currentTheta = useRef(theta);
  const currentPhi = useRef(phi);

  // Trail history points
  const trailPoints = useRef<THREE.Vector3[]>([]);

  // Damped cursor tracking
  const mouseX = useRef(0);
  const mouseY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.current = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY.current = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 2,000 Layered Wavefunction Probability Cloud Particles
  const { particlePositions, particlePhases, particleBaseRadii, particleDensities } = useMemo(() => {
    const count = 2000;
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const radii = new Float32Array(count);
    const densities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const u = Math.random();
      const v = Math.random();
      const t = Math.acos(2 * u - 1);
      const p = 2 * Math.PI * v;
      // Multi-layered depth distribution
      const layerOffset = (Math.random() - 0.5) * 0.9;
      const r = SPHERE_RADIUS + layerOffset;

      positions[i * 3] = r * Math.sin(t) * Math.cos(p);
      positions[i * 3 + 1] = r * Math.cos(t);
      positions[i * 3 + 2] = r * Math.sin(t) * Math.sin(p);

      phases[i] = Math.random() * Math.PI * 2;
      radii[i] = r;
      densities[i] = Math.random();
    }
    return {
      particlePositions: positions,
      particlePhases: phases,
      particleBaseRadii: radii,
      particleDensities: densities,
    };
  }, []);

  // Custom Particle Glow Map
  const particleTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    const grad = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.25, 'rgba(0, 212, 255, 0.9)');
    grad.addColorStop(0.65, 'rgba(124, 58, 237, 0.25)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 64, 64);
    return new THREE.CanvasTexture(canvas);
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Smooth angle interpolation toward target (θ, φ)
    const lerpSpeed = Math.min(delta * 7, 1);
    currentTheta.current += (theta - currentTheta.current) * lerpSpeed;
    currentPhi.current += (phi - currentPhi.current) * lerpSpeed;

    // Calculate Cartesian coordinates of state vector:
    // +Y = |0⟩, -Y = |1⟩, +X = |+⟩, -X = |-⟩, +Z = |+i⟩, -Z = |-i⟩
    const x = SPHERE_RADIUS * Math.sin(currentTheta.current) * Math.cos(currentPhi.current);
    const y = SPHERE_RADIUS * Math.cos(currentTheta.current);
    const z = SPHERE_RADIUS * Math.sin(currentTheta.current) * Math.sin(currentPhi.current);
    const tipPos = new THREE.Vector3(x, y, z);

    // Rotate State Vector Arrow via Quaternion
    if (vectorGroupRef.current) {
      const up = new THREE.Vector3(0, 1, 0);
      const quat = new THREE.Quaternion().setFromUnitVectors(up, tipPos.clone().normalize());
      vectorGroupRef.current.setRotationFromQuaternion(quat);
    }

    // Update dynamic state vector energy trail (last 30 frames)
    if (trailPoints.current.length === 0 || trailPoints.current[trailPoints.current.length - 1].distanceTo(tipPos) > 0.04) {
      trailPoints.current.push(tipPos.clone());
      if (trailPoints.current.length > 32) {
        trailPoints.current.shift();
      }
      if (trailLineRef.current) {
        trailLineRef.current.geometry.setFromPoints(trailPoints.current);
      }
    }

    // Parallax mouse tilt with subtle quantum laboratory precession
    if (masterGroupRef.current) {
      const targetRotY = mouseX.current * 0.4 + (autoPrecess ? time * 0.12 : 0);
      const targetRotX = mouseY.current * 0.3;
      masterGroupRef.current.rotation.y += (targetRotY - masterGroupRef.current.rotation.y) * 0.05;
      masterGroupRef.current.rotation.x += (targetRotX - masterGroupRef.current.rotation.x) * 0.05;
    }

    // Volumetric Particle Probability Modulation
    if (particleGeoRef.current) {
      const posArr = particleGeoRef.current.attributes.position.array as Float32Array;
      const count = particlePhases.length;
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        const phase = particlePhases[i] + time * 1.6;
        // Breathing oscillation + collapse concentration effect
        const wave = Math.sin(phase) * (isCollapsing ? 0.4 : 0.08);
        const currentR = particleBaseRadii[i] + wave;

        const currentPos = new THREE.Vector3(posArr[idx], posArr[idx + 1], posArr[idx + 2]);
        const len = currentPos.length() || 1;

        if (isCollapsing) {
          // Collapse particles toward measured pole
          const targetY = y > 0 ? SPHERE_RADIUS : -SPHERE_RADIUS;
          currentPos.y += (targetY - currentPos.y) * 0.1;
        } else {
          currentPos.multiplyScalar(currentR / len);
        }

        posArr[idx] = currentPos.x;
        posArr[idx + 1] = currentPos.y;
        posArr[idx + 2] = currentPos.z;
      }
      particleGeoRef.current.attributes.position.needsUpdate = true;
    }

    // Volumetric halo breathing
    if (haloGlowRef.current) {
      const pulse = 1 + Math.sin(time * 2.2) * 0.04;
      haloGlowRef.current.scale.set(pulse, pulse, pulse);
    }
  });

  return (
    <group ref={masterGroupRef}>
      {/* ═══════════════════════════════════════════════════════
          1. VOLUMETRIC GLASS & FRESNEL QUBIT SPHERE
          ═══════════════════════════════════════════════════════ */}
      {/* Inner Quantum Core Mesh */}
      <mesh>
        <sphereGeometry args={[SPHERE_RADIUS * 0.98, 48, 48]} />
        <meshPhysicalMaterial
          color="#00d4ff"
          transmission={0.88}
          opacity={0.35}
          transparent
          roughness={0.08}
          metalness={0.2}
          ior={1.45}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Volumetric Outer Halo Shell */}
      <mesh ref={haloGlowRef}>
        <sphereGeometry args={[SPHERE_RADIUS * 1.03, 36, 36]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
          side={THREE.BackSide}
        />
      </mesh>

      {/* ═══════════════════════════════════════════════════════
          2. ELEGANT ORTHOGONAL AXES & BASIS STATE LABELS
          ═══════════════════════════════════════════════════════ */}
      {/* Z-Axis (Vertical: |0⟩ North, |1⟩ South) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, SPHERE_RADIUS * 2.6, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* X-Axis (Horizontal: |+⟩, |-⟩) */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, SPHERE_RADIUS * 2.6, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Y-Axis (Depth: |+i⟩, |-i⟩) */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, SPHERE_RADIUS * 2.6, 16]} />
        <meshStandardMaterial color="#94a3b8" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Coordinate Reference Rings */}
      {/* Equatorial Ring (XY Superposition Plane) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[SPHERE_RADIUS, 0.016, 16, 96]} />
        <meshBasicMaterial color="#00d4ff" transparent opacity={0.75} />
      </mesh>

      {/* Prime Meridian (XZ Plane) */}
      <mesh rotation={[0, 0, 0]}>
        <torusGeometry args={[SPHERE_RADIUS, 0.012, 16, 96]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.4} />
      </mesh>

      {/* Orthogonal Meridian (YZ Plane) */}
      <mesh rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[SPHERE_RADIUS, 0.012, 16, 96]} />
        <meshBasicMaterial color="#3b82f6" transparent opacity={0.4} />
      </mesh>

      {/* 3D Scientific Basis State Pins & Labels */}
      {/* |0⟩ Ground State (+Y) */}
      <group position={[0, SPHERE_RADIUS * 1.35, 0]}>
        <mesh>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#00d4ff" />
        </mesh>
        <Html center distanceFactor={10} position={[0, 0.25, 0]}>
          <div className="bg-black/85 px-2 py-0.5 rounded text-[11px] font-mono font-bold text-photon-cyan border border-photon-cyan/40 shadow-[0_0_12px_rgba(0,212,255,0.3)] whitespace-nowrap select-none">
            |0⟩ Ground
          </div>
        </Html>
      </group>

      {/* |1⟩ Excited State (-Y) */}
      <group position={[0, -SPHERE_RADIUS * 1.35, 0]}>
        <mesh>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#7c3aed" />
        </mesh>
        <Html center distanceFactor={10} position={[0, -0.25, 0]}>
          <div className="bg-black/85 px-2 py-0.5 rounded text-[11px] font-mono font-bold text-quantum-violet border border-quantum-violet/40 shadow-[0_0_12px_rgba(124,58,237,0.3)] whitespace-nowrap select-none">
            |1⟩ Excited
          </div>
        </Html>
      </group>

      {/* |+⟩ Superposition State (+X) */}
      <group position={[SPHERE_RADIUS * 1.32, 0, 0]}>
        <Html center distanceFactor={10}>
          <div className="bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-mono text-text-primary border border-white/20 whitespace-nowrap select-none">
            |+⟩
          </div>
        </Html>
      </group>

      {/* |-⟩ Superposition State (-X) */}
      <group position={[-SPHERE_RADIUS * 1.32, 0, 0]}>
        <Html center distanceFactor={10}>
          <div className="bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-mono text-text-primary border border-white/20 whitespace-nowrap select-none">
            |-⟩
          </div>
        </Html>
      </group>

      {/* |+i⟩ Circular State (+Z) */}
      <group position={[0, 0, SPHERE_RADIUS * 1.32]}>
        <Html center distanceFactor={10}>
          <div className="bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-mono text-photon-cyan border border-photon-cyan/20 whitespace-nowrap select-none">
            |+i⟩
          </div>
        </Html>
      </group>

      {/* |-i⟩ Circular State (-Z) */}
      <group position={[0, 0, -SPHERE_RADIUS * 1.32]}>
        <Html center distanceFactor={10}>
          <div className="bg-black/80 px-1.5 py-0.5 rounded text-[9px] font-mono text-quantum-violet border border-quantum-violet/20 whitespace-nowrap select-none">
            |-i⟩
          </div>
        </Html>
      </group>

      {/* ═══════════════════════════════════════════════════════
          3. LUMINOUS STATE VECTOR |ψ⟩ & ENERGY TRAIL
          ═══════════════════════════════════════════════════════ */}
      <group ref={vectorGroupRef}>
        {/* Glowing Beam Shaft */}
        <mesh position={[0, SPHERE_RADIUS / 2, 0]}>
          <cylinderGeometry args={[0.035, 0.035, SPHERE_RADIUS, 24]} />
          <meshBasicMaterial color="#00d4ff" />
        </mesh>

        {/* Outer Volumetric Beam Glow */}
        <mesh position={[0, SPHERE_RADIUS / 2, 0]}>
          <cylinderGeometry args={[0.07, 0.07, SPHERE_RADIUS, 16]} />
          <meshBasicMaterial
            color="#00d4ff"
            transparent
            opacity={0.3}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* Glowing Arrowhead Tip */}
        <mesh position={[0, SPHERE_RADIUS, 0]}>
          <coneGeometry args={[0.11, 0.28, 24]} />
          <meshBasicMaterial color="#ffffff" />
        </mesh>

        {/* Intense Core Quantum Emitter */}
        <pointLight position={[0, SPHERE_RADIUS, 0]} color="#00d4ff" intensity={3.5} distance={5} />
      </group>

      {/* Historical Energy Trajectory Line */}
      <primitive
        ref={trailLineRef}
        object={
          new THREE.Line(
            new THREE.BufferGeometry(),
            new THREE.LineBasicMaterial({
              color: '#00d4ff',
              transparent: true,
              opacity: 0.65,
              linewidth: 2,
            })
          )
        }
      />

      {/* ═══════════════════════════════════════════════════════
          4. 2,000 LAYERED PROBABILITY WAVEFUNCTION PARTICLES
          ═══════════════════════════════════════════════════════ */}
      <points>
        <bufferGeometry ref={particleGeoRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[particlePositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          size={isCollapsing ? 0.24 : 0.09}
          map={particleTexture || undefined}
          transparent
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

/* ═══════════════════════════════════════════════════════
   MAIN COMPONENT: RESEARCH-GRADE TELEMETRY & CONTROLS
   ═══════════════════════════════════════════════════════ */
export default function InteractiveBlochSphere3D() {
  const [theta, setTheta] = useState<number>(Math.PI / 3); // 60 deg
  const [phi, setPhi] = useState<number>(Math.PI / 4);     // 45 deg
  const [isCollapsing, setIsCollapsing] = useState<boolean>(false);
  const [activeGate, setActiveGate] = useState<string>('Superposition |ψ⟩');
  const [autoPrecess, setAutoPrecess] = useState<boolean>(true);
  const [lastMeasurement, setLastMeasurement] = useState<string | null>(null);

  // Born-rule probabilities: P(0) = cos²(θ/2), P(1) = sin²(θ/2)
  const p0 = Math.cos(theta / 2) ** 2;
  const p1 = Math.sin(theta / 2) ** 2;
  const alphaVal = Math.cos(theta / 2).toFixed(3);
  const betaVal = Math.sin(theta / 2).toFixed(3);

  // Larmor phase precession effect
  useEffect(() => {
    if (!autoPrecess || isCollapsing) return;
    const interval = setInterval(() => {
      setPhi((prev) => (prev + 0.02) % (Math.PI * 2));
    }, 40);
    return () => clearInterval(interval);
  }, [autoPrecess, isCollapsing]);

  // Unitary Gate Rotations
  const applyGate = (gate: 'H' | 'X' | 'Y' | 'Z' | 'S' | 'T' | 'RESET') => {
    setAutoPrecess(false);
    if (gate === 'H') {
      // Hadamard: Toggles between pole and equator
      setTheta((prev) => (Math.abs(prev - Math.PI / 2) < 0.1 ? 0.01 : Math.PI / 2));
      setPhi(0);
      setActiveGate('Hadamard (H)');
    } else if (gate === 'X') {
      // Pauli-X: Bit flip (inverts θ)
      setTheta((prev) => Math.PI - prev);
      setActiveGate('Pauli-X (Bit-Flip)');
    } else if (gate === 'Y') {
      // Pauli-Y: Bit & phase flip
      setTheta((prev) => Math.PI - prev);
      setPhi((prev) => (prev + Math.PI / 2) % (Math.PI * 2));
      setActiveGate('Pauli-Y Gate');
    } else if (gate === 'Z') {
      // Pauli-Z: Phase flip (φ -> φ + π)
      setPhi((prev) => (prev + Math.PI) % (Math.PI * 2));
      setActiveGate('Pauli-Z (Phase-Flip)');
    } else if (gate === 'S') {
      // S-Gate (Phase π/2)
      setPhi((prev) => (prev + Math.PI / 2) % (Math.PI * 2));
      setActiveGate('S Gate (Phase π/2)');
    } else if (gate === 'T') {
      // T-Gate (Phase π/4)
      setPhi((prev) => (prev + Math.PI / 4) % (Math.PI * 2));
      setActiveGate('T Gate (Phase π/4)');
    } else if (gate === 'RESET') {
      setTheta(0.01);
      setPhi(0);
      setActiveGate('Reset |0⟩');
      setAutoPrecess(true);
    }
  };

  // Quantum Measurement Collapse Simulation
  const triggerMeasurement = () => {
    setIsCollapsing(true);
    setAutoPrecess(false);

    // Born-rule projection
    const collapsedToZero = Math.random() < p0;
    const collapsedTheta = collapsedToZero ? 0.01 : Math.PI - 0.01;
    setTheta(collapsedTheta);
    const resultStr = `|${collapsedToZero ? '0' : '1'}⟩`;
    setLastMeasurement(resultStr);
    setActiveGate(`Born Collapse -> ${resultStr}`);

    // Hold collapsed state then resume coherent evolution
    setTimeout(() => {
      setIsCollapsing(false);
      setTimeout(() => {
        // Return to superposition and resume Larmor evolution
        setTheta(Math.PI / 3);
        setAutoPrecess(true);
        setActiveGate('Coherent Larmor Evolution');
      }, 1200);
    }, 600);
  };

  return (
    <div className="relative w-full h-[540px] sm:h-[600px] lg:h-[650px] flex items-center justify-center rounded-2xl overflow-hidden bg-black/90 border border-photon-cyan/30 shadow-[0_0_70px_rgba(0,212,255,0.18)]">
      {/* 3D WebGL Canvas */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0.4, 6.8], fov: 44, near: 0.1, far: 100 }}
          dpr={[1, 1.5]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
          }}
          style={{ background: 'transparent' }}
        >
          {/* Scientific Lab Lighting & Volumetric Depth Fog */}
          <ambientLight intensity={0.65} />
          <directionalLight position={[6, 8, 6]} color="#ffffff" intensity={2.2} />
          <directionalLight position={[-6, -6, -4]} color="#7c3aed" intensity={1.4} />
          <pointLight position={[0, 0, 4]} color="#00d4ff" intensity={1.8} distance={7} />

          <VolumetricBlochSphere
            theta={theta}
            phi={phi}
            isCollapsing={isCollapsing}
            activeGate={activeGate}
            autoPrecess={autoPrecess}
          />
        </Canvas>
      </div>

      {/* Top HUD: Qubit Register & State Equation */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-2 bg-black/85 px-3 py-1.5 rounded-lg border border-white/[0.08] backdrop-blur-md">
          <div className="w-2 h-2 rounded-full bg-photon-cyan animate-pulse" />
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-wider text-text-primary uppercase">
            QUBIT Q-00 // TRANSMON SQUID // BLOCH SPHERE
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-2 bg-black/85 px-3 py-1.5 rounded-lg border border-photon-cyan/30 backdrop-blur-md text-[10px] sm:text-xs font-mono text-photon-cyan">
          <Activity className="w-3.5 h-3.5" />
          <span>STATUS: <strong className="text-white">{activeGate}</strong></span>
        </div>
      </div>

      {/* Right Side Telemetry Card (Research Grade) */}
      <div className="absolute right-3 top-14 bottom-24 z-10 hidden md:flex flex-col justify-center pointer-events-auto">
        <div className="bg-black/90 p-4 rounded-xl border border-photon-cyan/30 backdrop-blur-md w-64 space-y-3 shadow-2xl text-xs font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-white/[0.08]">
            <span className="text-[10px] text-photon-cyan font-bold uppercase tracking-wider">
              Quantum Telemetry
            </span>
            <span className="text-[9px] text-quantum-emerald font-bold">LIVE METRICS</span>
          </div>

          {/* Exact State Equation */}
          <div className="bg-white/[0.03] p-2 rounded border border-white/[0.06] text-[10px] text-photon-cyan">
            <span className="text-text-muted block text-[8px] uppercase">Wavefunction |ψ⟩</span>
            <span className="font-bold">
              {alphaVal}|0⟩ + {betaVal}e<sup>i{(phi / Math.PI).toFixed(2)}π</sup>|1⟩
            </span>
          </div>

          {/* Continuous Probabilities */}
          <div className="space-y-2">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-text-muted">P(|0⟩ Ground):</span>
                <span className="text-photon-cyan font-bold">{(p0 * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-photon-cyan h-full transition-all duration-300 shadow-[0_0_8px_#00d4ff]"
                  style={{ width: `${p0 * 100}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-text-muted">P(|1⟩ Excited):</span>
                <span className="text-quantum-violet font-bold">{(p1 * 100).toFixed(1)}%</span>
              </div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-quantum-violet h-full transition-all duration-300 shadow-[0_0_8px_#7c3aed]"
                  style={{ width: `${p1 * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Physical Coherence Specs */}
          <div className="pt-2 border-t border-white/[0.06] grid grid-cols-2 gap-1.5 text-[9px]">
            <div className="bg-black/50 p-1.5 rounded border border-white/[0.04]">
              <span className="text-text-muted block text-[7px] uppercase">T₁ Lifetime</span>
              <span className="text-quantum-emerald font-bold">92.4 µs</span>
            </div>
            <div className="bg-black/50 p-1.5 rounded border border-white/[0.04]">
              <span className="text-text-muted block text-[7px] uppercase">T₂* Dephasing</span>
              <span className="text-energy-amber font-bold">124.8 µs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gate Operations & Measurement Trigger */}
      <div className="absolute bottom-3 left-3 right-3 z-10 pointer-events-auto flex flex-wrap items-center justify-center gap-2">
        <div className="bg-black/90 px-3.5 py-2 rounded-xl border border-white/[0.1] backdrop-blur-md flex flex-wrap items-center gap-2 shadow-2xl">
          <span className="text-[9px] font-mono text-text-muted uppercase tracking-wider mr-1 hidden sm:inline">
            Unitary Operators:
          </span>

          <button
            onClick={() => applyGate('H')}
            className="px-2.5 py-1 text-[10px] font-mono font-bold bg-white/[0.04] hover:bg-photon-cyan/20 text-photon-cyan rounded border border-photon-cyan/40 transition-all hover:scale-105"
            title="Hadamard: Creates equal superposition"
          >
            [H]
          </button>
          <button
            onClick={() => applyGate('X')}
            className="px-2.5 py-1 text-[10px] font-mono font-bold bg-white/[0.04] hover:bg-quantum-violet/20 text-quantum-violet rounded border border-quantum-violet/40 transition-all hover:scale-105"
            title="Pauli-X: Bit-flip"
          >
            [X]
          </button>
          <button
            onClick={() => applyGate('Y')}
            className="px-2.5 py-1 text-[10px] font-mono font-bold bg-white/[0.04] hover:bg-quantum-blue/20 text-quantum-blue rounded border border-quantum-blue/40 transition-all hover:scale-105"
            title="Pauli-Y: Bit and phase flip"
          >
            [Y]
          </button>
          <button
            onClick={() => applyGate('Z')}
            className="px-2.5 py-1 text-[10px] font-mono font-bold bg-white/[0.04] hover:bg-energy-amber/20 text-energy-amber rounded border border-energy-amber/40 transition-all hover:scale-105"
            title="Pauli-Z: Phase flip"
          >
            [Z]
          </button>
          <button
            onClick={() => applyGate('S')}
            className="px-2.5 py-1 text-[10px] font-mono font-bold bg-white/[0.04] hover:bg-quantum-emerald/20 text-quantum-emerald rounded border border-quantum-emerald/40 transition-all hover:scale-105"
            title="S Gate: Phase π/2"
          >
            [S]
          </button>
          <button
            onClick={() => applyGate('T')}
            className="px-2.5 py-1 text-[10px] font-mono font-bold bg-white/[0.04] hover:bg-pink-500/20 text-pink-400 rounded border border-pink-500/40 transition-all hover:scale-105"
            title="T Gate: Phase π/4"
          >
            [T]
          </button>

          <button
            onClick={() => setAutoPrecess((prev) => !prev)}
            className={`px-2.5 py-1 text-[10px] font-mono font-bold rounded border transition-all flex items-center gap-1 ${
              autoPrecess
                ? 'bg-photon-cyan/20 text-photon-cyan border-photon-cyan/50'
                : 'bg-white/5 text-text-muted border-white/10'
            }`}
            title="Toggle continuous Larmor phase precession"
          >
            <RotateCw className={`w-3 h-3 ${autoPrecess ? 'animate-spin' : ''}`} />
            <span>Larmor</span>
          </button>

          <button
            onClick={triggerMeasurement}
            disabled={isCollapsing}
            className="px-3.5 py-1 text-[10px] font-mono font-bold bg-gradient-to-r from-quantum-violet to-quantum-blue hover:opacity-90 text-white rounded border border-quantum-violet shadow-[0_0_15px_rgba(124,58,237,0.4)] transition-all hover:scale-105 flex items-center gap-1.5 disabled:opacity-50"
          >
            <Zap className="w-3 h-3 text-energy-amber" />
            <span>{isCollapsing ? 'Collapsing...' : 'Measure Qubit'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
