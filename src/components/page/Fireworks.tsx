"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const particleVariants = {
  initial: {
    opacity: 0,
    scale: 0,
    x: 0,
    y: 0,
  },
  animate: (i: {x: number, y: number, delay: number}) => ({
    opacity: [0, 1, 0],
    scale: 1,
    x: i.x,
    y: i.y,
    transition: {
      duration: 1.2,
      delay: i.delay,
      ease: "easeOut",
    },
  }),
};

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  delay: number;
}

const colors = ["#A851EB", "#6A2CBD", "#FFFFFF", "#FBBF24"];

const generateParticles = (count: number): Particle[] => {
  const particles: Particle[] = [];
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * 2 * Math.PI;
    const radius = Math.random() * 80 + 30;
    particles.push({
      id: i,
      x: radius * Math.cos(angle),
      y: radius * Math.sin(angle),
      color: colors[Math.floor(Math.random() * colors.length)],
      size: Math.random() * 4 + 2,
      delay: Math.random() * 0.2,
    });
  }
  return particles;
};

const FireworkBurst = ({ x, y }: { x: number; y: number }) => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(generateParticles(40));
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="absolute" style={{ left: x, top: y }}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            backgroundColor: particle.color,
            width: particle.size,
            height: particle.size,
          }}
          variants={particleVariants}
          initial="initial"
          animate="animate"
          custom={{x: particle.x, y: particle.y, delay: particle.delay}}
        />
      ))}
    </div>
  );
};

export default function Fireworks() {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);

  useEffect(() => {
    const createBurst = () => {
      if (typeof window !== 'undefined') {
        setBursts(prev => [
          ...prev.slice(-10), // Keep the array size manageable
          {
            id: Date.now() + Math.random(),
            x: Math.random() * window.innerWidth,
            y: Math.random() * (window.innerHeight * 0.8),
          },
        ]);
      }
    };

    const intervalId = setInterval(createBurst, 1500);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {bursts.map(burst => (
        <FireworkBurst key={burst.id} x={burst.x} y={burst.y} />
      ))}
    </div>
  );
}
