
'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import {
  OrbitControls,
  Preload,
  useGLTF,
  Html,
  Center,
  Text,
} from '@react-three/drei';

function Model(props) {
  const { scene } = useGLTF(
    '/textured.glb'
  );
  return <primitive object={scene} {...props} />;
}

export default function QuasimodoScene() {
  return (
    <Canvas dpr={[1, 2]} camera={{ position: [0, 1, 5], fov: 50 }}>
      <color attach="background" args={['#130322']} />
      <ambientLight intensity={0.5} />
      <directionalLight intensity={1.5} position={[5, 5, 5]} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <pointLight position={[-10, -10, -10]} />

      <Suspense
        fallback={
          <Html center>
            <div className="text-white">Loading...</div>
          </Html>
        }
      >
        <Center>
          <Model scale={1.5} rotation={[0, -Math.PI / 4, 0]} />
        </Center>
        <Suspense fallback={null}>
          <Text
              position={[0, -1, 0]}
              fontSize={0.2}
              color="#a78bfa"
              font="https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff"
              anchorX="center"
              anchorY="middle"
              textAlign="center"
              >
              When you focus, the market listens.
          </Text>
        </Suspense>
        <Preload all />
      </Suspense>

      <OrbitControls
        autoRotate
        autoRotateSpeed={0.5}
        enableZoom={false}
        enablePan={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 2.5}
      />
    </Canvas>
  );
}

useGLTF.preload(
  '/textured.glb'
);
