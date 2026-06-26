"use client";

import { Float, Sphere, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Mesh } from "three";
import * as THREE from "three";

export interface GlobeMarker {
  id: string;
  lat: number;
  lng: number;
  label: string;
  risk: number;
}

interface CommandGlobeProps {
  className?: string;
  interactive?: boolean;
  paused?: boolean;
  markers?: GlobeMarker[];
  onMarkerClick?: (id: string) => void;
}

function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function GlobeCore({ paused }: { paused?: boolean }) {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current || paused) return;
    meshRef.current.rotation.y += delta * 0.08;
  });

  return (
    <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.25}>
      <group>
        <Sphere ref={meshRef} args={[1.6, 64, 64]}>
          <meshStandardMaterial
            color="#0f766e"
            emissive="#064e3b"
            emissiveIntensity={0.35}
            metalness={0.35}
            roughness={0.55}
          />
        </Sphere>
        <Sphere args={[1.63, 32, 32]}>
          <meshBasicMaterial color="#38bdf8" wireframe transparent opacity={0.1} />
        </Sphere>
        <Sphere args={[1.68, 24, 24]}>
          <meshBasicMaterial color="#10b981" wireframe transparent opacity={0.04} />
        </Sphere>
      </group>
    </Float>
  );
}

function SatelliteOrbits({ paused }: { paused?: boolean }) {
  const orbit1 = useRef<THREE.Group>(null);
  const orbit2 = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (paused) return;
    if (orbit1.current) orbit1.current.rotation.y += delta * 0.15;
    if (orbit2.current) orbit2.current.rotation.x += delta * 0.08;
  });

  return (
    <>
      <group ref={orbit1} rotation={[Math.PI / 3, 0, 0]}>
        <mesh>
          <torusGeometry args={[2.2, 0.004, 8, 128]} />
          <meshBasicMaterial color="#38bdf8" transparent opacity={0.25} />
        </mesh>
        <mesh position={[2.2, 0, 0]}>
          <boxGeometry args={[0.04, 0.04, 0.08]} />
          <meshBasicMaterial color="#7dd3fc" />
        </mesh>
      </group>
      <group ref={orbit2} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
        <mesh>
          <torusGeometry args={[2.6, 0.003, 8, 128]} />
          <meshBasicMaterial color="#10b981" transparent opacity={0.18} />
        </mesh>
        <mesh position={[0, 2.6, 0]}>
          <boxGeometry args={[0.035, 0.035, 0.07]} />
          <meshBasicMaterial color="#6ee7b7" />
        </mesh>
      </group>
    </>
  );
}

function ScanBeam({ paused }: { paused?: boolean }) {
  const beamRef = useRef<Mesh>(null);

  useFrame(({ clock }) => {
    if (!beamRef.current || paused) return;
    beamRef.current.rotation.y = clock.getElapsedTime() * 0.4;
  });

  return (
    <mesh ref={beamRef}>
      <coneGeometry args={[1.7, 0.01, 64, 1, true]} />
      <meshBasicMaterial
        color="#34d399"
        transparent
        opacity={0.06}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

function MarkerPoints({
  markers,
  onMarkerClick,
  paused,
}: {
  markers: GlobeMarker[];
  onMarkerClick?: (id: string) => void;
  paused?: boolean;
}) {
  const pulseRef = useRef(0);

  useFrame(({ clock }) => {
    if (!paused) pulseRef.current = clock.getElapsedTime();
  });

  const points = useMemo(
    () =>
      markers.map((marker) => ({
        ...marker,
        position: latLngToVector3(marker.lat, marker.lng, 1.64),
      })),
    [markers],
  );

  return (
    <group>
      {points.map((marker, i) => {
        const scale = 1 + Math.sin(pulseRef.current * 2 + i) * 0.15;
        return (
          <group key={marker.id} position={marker.position}>
            <mesh
              scale={scale}
              onClick={(event) => {
                event.stopPropagation();
                onMarkerClick?.(marker.id);
              }}
            >
              <sphereGeometry args={[0.035, 12, 12]} />
              <meshBasicMaterial color={marker.risk >= 70 ? "#f43f5e" : "#34d399"} />
            </mesh>
            <mesh scale={scale * 2.2}>
              <sphereGeometry args={[0.035, 8, 8]} />
              <meshBasicMaterial
                color={marker.risk >= 70 ? "#f43f5e" : "#34d399"}
                transparent
                opacity={0.15}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

export default function CommandGlobe({
  className,
  interactive = false,
  paused = false,
  markers = [],
  onMarkerClick,
}: CommandGlobeProps) {
  return (
    <div className={className} aria-hidden={!interactive}>
      <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }} dpr={[1, 1.5]}>
        <color attach="background" args={["#020408"]} />
        <ambientLight intensity={0.45} />
        <pointLight position={[4, 4, 4]} intensity={1.2} color="#38bdf8" />
        <pointLight position={[-4, -2, 2]} intensity={0.6} color="#10b981" />
        <Stars radius={80} depth={40} count={2000} factor={3} fade speed={0.35} />
        <SatelliteOrbits paused={paused} />
        <ScanBeam paused={paused} />
        <GlobeCore paused={paused} />
        <MarkerPoints markers={markers} onMarkerClick={onMarkerClick} paused={paused} />
      </Canvas>
    </div>
  );
}
