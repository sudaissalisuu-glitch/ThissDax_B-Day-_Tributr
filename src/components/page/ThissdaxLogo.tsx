
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
      width="150"
      height="28"
      viewBox="0 0 150 28"
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
      {/* Thiss */}
      <motion.path
        d="M 10 23 L 10 5"
        stroke="url(#grad1)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={0}
        variants={draw}
      />
      <motion.path
        d="M 2 14 L 18 14"
        stroke="url(#grad1)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={0.1}
        variants={draw}
      />
      <motion.path
        d="M 25 23 L 25 5"
        stroke="url(#grad1)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={0.2}
        variants={draw}
      />
      <motion.path
        d="M 32 23 L 32 5"
        stroke="url(#grad1)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={0.3}
        variants={draw}
      />
       <motion.path
        d="M 39,23 C 43,18 39,10 44,5"
        fill="none"
        stroke="url(#grad1)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={0.4}
        variants={draw}
      />
      <motion.path
        d="M 50,5 C 46,10 50,18 45,23"
        fill="none"
        stroke="url(#grad1)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={0.5}
        variants={draw}
      />

      {/* Separator */}
       <motion.circle
        cx="62"
        cy="14"
        r="2"
        fill="url(#grad1)"
        custom={0.7}
        variants={{
          hidden: { opacity: 0, scale: 0 },
          visible: (i: number) => ({
            opacity: 1,
            scale: 1,
            transition: { delay: i * 0.1, duration: 0.5 }
          })
        }}
      />

      {/* Dax */}
      <motion.path
        d="M 75 5 L 75 23 C 75 28 80 28 80 23 L 80 18 C 80 13 75 13 75 18"
        fill="none"
        stroke="url(#grad1)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={0.8}
        variants={draw}
      />
      <motion.path
        d="M 90 5 L 100 23"
        stroke="url(#grad1)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={0.9}
        variants={draw}
      />
      <motion.path
        d="M 100 5 L 90 23"
        stroke="url(#grad1)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={1.0}
        variants={draw}
      />
      <motion.path
        d="M 110 5 L 120 14 L 110 23"
        fill="none"
        stroke="url(#grad1)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={1.1}
        variants={draw}
      />
       <motion.path
        d="M 125,23 C 129,18 125,10 130,5"
        fill="none"
        stroke="url(#grad1)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={1.2}
        variants={draw}
      />
      <motion.path
        d="M 136,5 C 132,10 136,18 131,23"
        fill="none"
        stroke="url(#grad1)"
        strokeWidth="2"
        strokeLinecap="round"
        custom={1.3}
        variants={draw}
      />
    </motion.svg>
  );
}
