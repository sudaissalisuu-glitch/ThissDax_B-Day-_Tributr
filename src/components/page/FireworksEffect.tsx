
'use client'

import { Fireworks } from '@fireworks-js/react'

export default function FireworksEffect() {
  return (
    <Fireworks
      options={{
        rocketsPoint: {
          min: 0,
          max: 100
        },
        hue: {
          min: 260,
          max: 280
        },
        delay: {
          min: 30,
          max: 60
        },
        brightness: {
          min: 50,
          max: 80
        },
        decay: {
          min: 0.015,
          max: 0.03
        },
        flickering: 50,
        intensity: 5,
        friction: 0.97,
        gravity: 1.5,
        opacity: 0.5,
        particles: 50,
        traceSpeed: 3,
        explosion: 5,
      }}
      style={{
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        position: 'fixed',
        zIndex: 1,
        pointerEvents: 'none'
      }}
    />
  )
}
