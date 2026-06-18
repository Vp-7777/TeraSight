"use client";

import { Float, Sphere, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Mesh } from "three";

function Globe() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
      <group>
        <Sphere ref={meshRef} args={[1.45, 64, 64]}>
          <meshStandardMaterial
            color="#0f766e"
            emissive="#064e3b"
            emissiveIntensity={0.35}
            metalness={0.35}
            roughness={0.55}
            wireframe={false}
          />
        </Sphere>
        <Sphere args={[1.48, 32, 32]}>
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.12} />
        </Sphere>
      </group>
    </Float>
  );
}

function Particles() {
  const positions = useMemo(() => {
    const points = new Float32Array(120 * 3);
    for (let i = 0; i < 120; i += 1) {
      const radius = 2.2 + Math.random() * 1.2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      points[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      points[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      points[i * 3 + 2] = radius * Math.cos(phi);
    }
    return points;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.02} color="#34d399" transparent opacity={0.65} />
    </points>
  );
}

export default function GlobeScene({ className }: { className?: string }) {
  return (
    <div className={className} aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 4.2], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#06080f"]} />
        <ambientLight intensity={0.45} />
        <pointLight position={[4, 4, 4]} intensity={1.2} color="#38bdf8" />
        <pointLight position={[-4, -2, 2]} intensity={0.6} color="#10b981" />
        <Stars radius={60} depth={30} count={1200} factor={3} fade speed={0.4} />
        <Particles />
        <Globe />
      </Canvas>
    </div>
  );
}
