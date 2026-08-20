'use client';

import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════
   SHIELD QUANTUM — 3D Quantum Field & Live System
   Combines:
   1. Central Wireframe Bloch Sphere with dynamic State Vector (|ψ⟩)
   2. Quantum Wavefunction Probability Grid (reactive to cursor)
   3. Entangled Qubit Pairs with glowing correlation bridges
   4. Photonic Trajectory Rings (Cavity QED / optical orbits)
   ═══════════════════════════════════════════════════════ */

/* ———————————————————————————————————————————————————————
   1. Central Bloch Sphere & Dynamic State Vector
   ——————————————————————————————————————————————————————— */
function BlochSphereCore() {
  const groupRef = useRef<THREE.Group>(null);
  const vectorRef = useRef<THREE.Line>(null);
  const tipRef = useRef<THREE.Mesh>(null);
  const equatorRef = useRef<THREE.LineLoop>(null);

  // Create equator circle points
  const equatorPoints = useMemo(() => {
    const pts = [];
    const segments = 64;
    const r = 2.4;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      pts.push(new THREE.Vector3(r * Math.cos(theta), 0, r * Math.sin(theta)));
    }
    return pts;
  }, []);

  const equatorGeo = useMemo(() => {
    const geo = new THREE.BufferGeometry().setFromPoints(equatorPoints);
    return geo;
  }, [equatorPoints]);

  // State vector line points
  const [vectorGeo, setVectorGeo] = useState<THREE.BufferGeometry>(() => {
    const geo = new THREE.BufferGeometry();
    const pts = new Float32Array([0, 0, 0, 0, 2.4, 0]);
    geo.setAttribute('position', new THREE.BufferAttribute(pts, 3));
    return geo;
  });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.15;
      groupRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
    }

    // Precessing quantum state vector |ψ⟩ = cos(θ/2)|0⟩ + e^{iφ}sin(θ/2)|1⟩
    const theta = (Math.sin(t * 0.4) * 0.5 + 0.5) * Math.PI; // 0 to π
    const phi = t * 0.8; // Azimuthal angle precession
    const r = 2.4;

    const x = r * Math.sin(theta) * Math.cos(phi);
    const y = r * Math.cos(theta);
    const z = r * Math.sin(theta) * Math.sin(phi);

    const pos = vectorGeo.attributes.position.array as Float32Array;
    pos[3] = x;
    pos[4] = y;
    pos[5] = z;
    vectorGeo.attributes.position.needsUpdate = true;

    if (tipRef.current) {
      tipRef.current.position.set(x, y, z);
    }
  });

  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>
      {/* Semi-transparent outer sphere boundary */}
      <mesh>
        <sphereGeometry args={[2.4, 32, 24]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.035}
          wireframe
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Equatorial Plane Ring */}
      <primitive object={new THREE.LineLoop(equatorGeo, new THREE.LineBasicMaterial({ color: '#00d4ff', transparent: true, opacity: 0.35 }))} />

      {/* Meridian Rings */}
      <group rotation={[Math.PI / 2, 0, 0]}>
        <primitive object={new THREE.LineLoop(equatorGeo, new THREE.LineBasicMaterial({ color: '#7c3aed', transparent: true, opacity: 0.25 }))} />
      </group>
      <group rotation={[0, 0, Math.PI / 2]}>
        <primitive object={new THREE.LineLoop(equatorGeo, new THREE.LineBasicMaterial({ color: '#06b6d4', transparent: true, opacity: 0.25 }))} />
      </group>

      {/* Axis Lines */}
      {/* Z-Axis (|0⟩ to |1⟩) */}
      <primitive
        object={
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -3, 0), new THREE.Vector3(0, 3, 0)]),
            new THREE.LineDashedMaterial({ color: '#ffffff', transparent: true, opacity: 0.3, dashSize: 0.2, gapSize: 0.1 })
          )
        }
      />

      {/* Dynamic State Vector |ψ⟩ */}
      <primitive object={new THREE.Line(vectorGeo, new THREE.LineBasicMaterial({ color: '#00d4ff', linewidth: 2, transparent: true, opacity: 0.85 }))} />

      {/* State Vector Tip (Sphere) */}
      <mesh ref={tipRef}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshBasicMaterial color="#00d4ff" />
      </mesh>

      {/* |0⟩ Pole Indicator */}
      <mesh position={[0, 2.6, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* |1⟩ Pole Indicator */}
      <mesh position={[0, -2.6, 0]}>
        <sphereGeometry args={[0.06, 12, 12]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>

      {/* Central Core Luminescence */}
      <mesh>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshBasicMaterial
          color="#00d4ff"
          transparent
          opacity={0.15}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

/* ———————————————————————————————————————————————————————
   2. Entangled Qubit Pairs & Correlation Bridges
   ——————————————————————————————————————————————————————— */
function EntangledQubitPairs() {
  const groupRef = useRef<THREE.Group>(null);
  const pairCount = 6;

  // Initial radii and phases for entangled particle pairs
  const pairs = useMemo(() => {
    return Array.from({ length: pairCount }).map((_, i) => ({
      orbitRadius: 4.8 + i * 0.9,
      speed: (i % 2 === 0 ? 1 : -1) * (0.25 + i * 0.05),
      inclination: (i * Math.PI) / pairCount,
      tilt: (Math.random() - 0.5) * 0.5,
      phaseOffset: (i * Math.PI * 2) / pairCount,
    }));
  }, []);

  const pairMeshes = useRef<{ a: THREE.Mesh | null; b: THREE.Mesh | null; line: THREE.Line | null }[]>([]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    pairs.forEach((pair, idx) => {
      const angle = t * pair.speed + pair.phaseOffset;
      const r = pair.orbitRadius;

      // Qubit A position
      const ax = r * Math.cos(angle);
      const ay = r * Math.sin(angle) * Math.sin(pair.inclination);
      const az = r * Math.sin(angle) * Math.cos(pair.inclination);

      // Entangled Qubit B position (diametrically opposite with phase correlation)
      const bx = -ax;
      const by = -ay;
      const bz = -az;

      const pRef = pairMeshes.current[idx];
      if (pRef) {
        if (pRef.a) pRef.a.position.set(ax, ay, az);
        if (pRef.b) pRef.b.position.set(bx, by, bz);
        if (pRef.line) {
          const pos = pRef.line.geometry.attributes.position.array as Float32Array;
          pos[0] = ax;
          pos[1] = ay;
          pos[2] = az;
          pos[3] = bx;
          pos[4] = by;
          pos[5] = bz;
          pRef.line.geometry.attributes.position.needsUpdate = true;
        }
      }
    });
  });

  return (
    <group ref={groupRef}>
      {pairs.map((_, i) => {
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(6), 3));

        return (
          <group key={i}>
            {/* Qubit A */}
            <mesh
              ref={(el) => {
                if (!pairMeshes.current[i]) pairMeshes.current[i] = { a: null, b: null, line: null };
                pairMeshes.current[i].a = el;
              }}
            >
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshBasicMaterial color="#00d4ff" blending={THREE.AdditiveBlending} />
            </mesh>

            {/* Qubit B */}
            <mesh
              ref={(el) => {
                if (!pairMeshes.current[i]) pairMeshes.current[i] = { a: null, b: null, line: null };
                pairMeshes.current[i].b = el;
              }}
            >
              <sphereGeometry args={[0.08, 12, 12]} />
              <meshBasicMaterial color="#7c3aed" blending={THREE.AdditiveBlending} />
            </mesh>

            {/* Entanglement Correlation Line (EPR Bridge) */}
            <primitive
              object={
                new THREE.Line(
                  lineGeo,
                  new THREE.LineBasicMaterial({
                    color: i % 2 === 0 ? '#00d4ff' : '#7c3aed',
                    transparent: true,
                    opacity: 0.18,
                    blending: THREE.AdditiveBlending,
                  })
                )
              }
              ref={(el: THREE.Line) => {
                if (!pairMeshes.current[i]) pairMeshes.current[i] = { a: null, b: null, line: null };
                pairMeshes.current[i].line = el;
              }}
            />
          </group>
        );
      })}
    </group>
  );
}

/* ———————————————————————————————————————————————————————
   3. Quantum Wavefunction Probability Surface Grid
   ——————————————————————————————————————————————————————— */
function QuantumWaveGrid() {
  const meshRef = useRef<THREE.Mesh>(null);
  const mouseRef = useRef(new THREE.Vector2(0, 0));
  const { size } = useThree();

  const gridX = 40;
  const gridY = 40;
  const sizeX = 28;
  const sizeY = 28;

  const geometry = useMemo(() => {
    return new THREE.PlaneGeometry(sizeX, sizeY, gridX - 1, gridY - 1);
  }, []);

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / size.width) * 2 - 1;
      mouseRef.current.y = -(e.clientY / size.height) * 2 + 1;
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [size]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const pos = meshRef.current.geometry.attributes.position.array as Float32Array;
    const t = state.clock.elapsedTime;

    const mx = mouseRef.current.x * (sizeX * 0.4);
    const my = mouseRef.current.y * (sizeY * 0.4);

    for (let i = 0; i < pos.length / 3; i++) {
      const x = pos[i * 3];
      const y = pos[i * 3 + 1];

      // Base quantum wavefunction harmonic oscillations |ψ(x,y,t)|²
      const r = Math.sqrt(x * x + y * y);
      let z = Math.sin(r * 0.8 - t * 1.5) * 0.35 * Math.exp(-r * 0.12);

      // Interactive ripple from cursor
      const dMouse = Math.sqrt((x - mx) ** 2 + (y - my) ** 2);
      if (dMouse < 6) {
        z += Math.sin(dMouse * 2 - t * 3) * 0.4 * (1 - dMouse / 6);
      }

      pos[i * 3 + 2] = z;
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} position={[0, -3.2, -2]} rotation={[-Math.PI / 2.3, 0, 0]}>
      <meshBasicMaterial
        color="#00d4ff"
        wireframe
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

/* ———————————————————————————————————————————————————————
   4. Floating Quantum Cloud Particles (Background Coherence)
   ——————————————————————————————————————————————————————— */
function QuantumCloudParticles() {
  const pointsRef = useRef<THREE.Points>(null);
  const particleCount = 450;

  const data = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      const r = 12 * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
      sizes[i] = Math.random() * 2 + 0.5;
    }
    return { pos, sizes };
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.elapsedTime;
    pointsRef.current.rotation.y = t * 0.03;
    pointsRef.current.rotation.x = t * 0.015;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[data.pos, 3]} />
        <bufferAttribute attach="attributes-size" args={[data.sizes, 1]} />
      </bufferGeometry>
      <pointsMaterial
        size={1.2}
        color="#00d4ff"
        transparent
        opacity={0.35}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

/* ═══════════════════════════════════════════════════════
   Exported Quantum Field Canvas Component
   ═══════════════════════════════════════════════════════ */
export default function QuantumField() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 55, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{ background: 'transparent' }}
      >
        <BlochSphereCore />
        <EntangledQubitPairs />
        <QuantumWaveGrid />
        <QuantumCloudParticles />
      </Canvas>
    </div>
  );
}
