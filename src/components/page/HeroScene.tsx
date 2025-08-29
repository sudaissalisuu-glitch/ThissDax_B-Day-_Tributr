
'use client'

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Environment,
  Html,
  Preload,
  PerspectiveCamera,
  Text as DreiText,
  Torus,
} from '@react-three/drei';

function Placeholder3D(props: { scale?: number; position?: [number, number, number] }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <Torus args={[0.8, 0.3, 16, 100]} position={props.position ?? [0, 0, 0]}>
        <meshStandardMaterial color={"#a855f7"} roughness={0.2} metalness={0.8} />
      </Torus>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <Canvas className="rounded-3xl shadow-2xl" dpr={[1, 2]}>
      <color attach="background" args={["#1a052d"]} />
      <PerspectiveCamera makeDefault position={[0, 1.2, 4]} fov={50} />
      <hemisphereLight intensity={0.5} groundColor={"#12021f"} />
      <spotLight position={[2, 5, 3]} angle={0.6} penumbra={0.6} intensity={1.5} castShadow />
      <pointLight position={[-3, 2, -2]} intensity={1} color={"#a855f7"} />
      <Suspense fallback={<Html center><div className="animate-pulse text-sm">loading 3D…</div></Html>}>
        <Placeholder3D />
        <DreiText position={[0, 1.6, 0]} fontSize={0.25} anchorX="center" anchorY="middle">
          THISSDAX
          <meshBasicMaterial color={"#c084fc"} />
        </DreiText>
        <Environment preset="night" />
        <Preload all />
      </Suspense>
      <OrbitControls enablePan={false} minDistance={2} maxDistance={6} />
    </Canvas>
  );
}
