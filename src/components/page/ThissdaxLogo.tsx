
'use client';

import { motion } from 'framer-motion';

export function ThissdaxLogo() {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => {
      const delay = 0.5 + i * 0.1;
      return {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { delay, type: 'spring', duration: 1.5, bounce: 0 },
          opacity: { delay, duration: 0.01 },
        },
      };
    },
  };

  return (
    <motion.svg
      width="160"
      height="32"
      viewBox="0 0 160 32"
      initial="hidden"
      animate="visible"
      className="h-7 w-auto"
    >
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" style={{ stopColor: 'hsl(var(--primary))', stopOpacity: 1 }} />
          <stop offset="100%" style={{ stopColor: 'rgb(217, 70, 239)', stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <motion.text
        x="0"
        y="24"
        fontFamily="Poppins, sans-serif"
        fontSize="28"
        fontWeight="800"
        fill="url(#grad1)"
        variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { delay: 0.5, duration: 1 } }
        }}
      >
        Thissdax
      </motion.text>
      <motion.path
        d="M0 28 H160"
        stroke="url(#grad1)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={1}
        variants={draw}
      />
    </motion.svg>
  );
}
