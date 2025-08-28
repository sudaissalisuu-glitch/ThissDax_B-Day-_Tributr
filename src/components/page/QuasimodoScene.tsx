"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Preload,
  PerspectiveCamera,
} from "@react-three/drei";

export default function QuasimodoScene() {
  return (
    <Canvas dpr={[1, 2]} className="rounded-2xl h-[360px]">
      <color attach="background" args={["#130322"]} />
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[6, 6, 6]} intensity={1.4} />
      <Suspense fallback={<Html center>loading…</Html>}>
        <gridHelper args={[20, 20, "#4c1d95", "#1f0a3a"]} />
        <mesh position={[-2, -1, 0]}>
          <boxGeometry args={[0.3, 1.2, 0.3]} />
          <meshStandardMaterial color={"#8b5cf6"} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.3, 2.2, 0.3]} />
          <meshStandardMaterial color={"#a78bfa"} />
        </mesh>
        <mesh position={[2, -0.6, 0]}>
          <boxGeometry args={[0.3, 1.0, 0.3]} />
          <meshStandardMaterial color={"#c4b5fd"} />
        </mesh>
        <Preload all />
      </Suspense>
      <OrbitControls enablePan={false} />
    </Canvas>
  );
}