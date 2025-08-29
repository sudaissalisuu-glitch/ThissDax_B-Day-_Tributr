
'use client'

import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';

const Spline = dynamic(() => import('@splinetool/react-spline'), {
  ssr: false,
});

export default function HeroScene() {
  return (
    <div className="rounded-3xl shadow-2xl overflow-hidden h-full w-full">
      <Suspense fallback={<div className="w-full h-full bg-black/20 animate-pulse" />}>
        <Spline scene="https://prod.spline.design/6VdD-aPl32R81pgy/scene.splinecode" />
      </Suspense>
    </div>
  );
}
