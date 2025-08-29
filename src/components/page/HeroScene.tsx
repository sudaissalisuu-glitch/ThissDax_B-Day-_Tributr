
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
  useGLTF,
} from '@react-three/drei';

// This is a placeholder. Once you provide the URL, I'll replace this component.
function Placeholder3D(props: { scale?: number; position?: [number, number, number] }) {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh position={props.position ?? [0, 0, 0]}>
        <boxGeometry args={[1.2, 1.2, 1.2]} />
        <meshStandardMaterial color={"#a855f7"} roughness={0.2} metalness={0.8} />
      </mesh>
    </Float>
  );
}

// When you give me the URL, I will use this component to load your model
function CustomModel({ url, ...props }) {
  const { scene } = useGLTF(url);
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <primitive object={scene} {...props} />
    </Float>
  );
}


export default function HeroScene({ modelUrl }: { modelUrl?: string }) {
  return (
    <Canvas className="rounded-3xl shadow-2xl" dpr={[1, 2]}>
      <color attach="background" args={["#1a052d"]} />
      <PerspectiveCamera makeDefault position={[0, 1.2, 4]} fov={50} />
      <hemisphereLight intensity={0.5} groundColor={"#12021f"} />
      <spotLight position={[2, 5, 3]} angle={0.6} penumbra={0.6} intensity={1.5} castShadow />
      <pointLight position={[-3, 2, -2]} intensity={1} color={"#a855f7"} />
      <Suspense fallback={<Html center><div className="animate-pulse text-sm">loading 3D…</div></Html>}>
        {modelUrl ? <CustomModel url={modelUrl} /> : <Placeholder3D />}
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

useGLTF.preload

    