"use client";

import { Float, Sphere, Stars } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import type { Mesh } from "three";

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
  return {
    x: -(radius * Math.sin(phi) * Math.cos(theta)),
    y: radius * Math.cos(phi),
    z: radius * Math.sin(phi) * Math.sin(theta),
  };
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
      </group>
    </Float>
  );
}

function MarkerPoints({
  markers,
  onMarkerClick,
}: {
  markers: GlobeMarker[];
  onMarkerClick?: (id: string) => void;
}) {
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
      {points.map((marker) => (
        <mesh
          key={marker.id}
          position={[marker.position.x, marker.position.y, marker.position.z]}
          onClick={(event) => {
            event.stopPropagation();
            onMarkerClick?.(marker.id);
          }}
        >
          <sphereGeometry args={[0.035, 12, 12]} />
          <meshBasicMaterial color={marker.risk >= 70 ? "#f43f5e" : "#34d399"} />
        </mesh>
      ))}
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
        <Stars radius={80} depth={40} count={1500} factor={3} fade speed={0.35} />
        <GlobeCore paused={paused} />
        <MarkerPoints markers={markers} onMarkerClick={onMarkerClick} />
      </Canvas>
    </div>
  );
}
