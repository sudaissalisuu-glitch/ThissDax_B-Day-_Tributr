
'use client'

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Float,
  Environment,
  Html,
  useGLTF,
  Preload,
  PerspectiveCamera,
  Text as DreiText,
} from '@react-three/drei';

function PurpleHoodie(props: { url?: string; scale?: number; position?: [number, number, number] }) {
  const url = props.url || "https://vazxmixjsiawhamofees.supabase.co/storage/v1/object/public/models/quasimoto/model.gltf";
  const { scene } = useGLTF(url);
  useGLTF.preload(url);
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.8}>
      <primitive object={scene} scale={props.scale ?? 0.04} position={props.position ?? [0, -1.2, 0]} />
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
        <PurpleHoodie />
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
