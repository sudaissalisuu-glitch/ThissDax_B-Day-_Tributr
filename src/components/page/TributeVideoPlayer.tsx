
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const forexPairs = [
  'EUR/USD', 'GBP/JPY', 'AUD/USD', 'USD/CAD', 'NZD/USD', 'XAU/USD',
  'USD/CHF', 'EUR/GBP', 'AUD/JPY', 'US30', 'BTC/USD',
];

const Pair = ({ pair }) => {
  const [position, setPosition] = useState({ top: '50%', left: '50%' });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const show = () => {
      setPosition({
        top: `${Math.random() * 80 + 10}%`,
        left: `${Math.random() * 80 + 10}%`,
      });
      setIsVisible(true);
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(show, Math.random() * 3000 + 2000);
      }, Math.random() * 2000 + 1000);
    };
    const initialDelay = Math.random() * 5000;
    const timeoutId = setTimeout(show, initialDelay);

    return () => clearTimeout(timeoutId);
  }, [pair]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: [0, 0.5, 0.5, 0], scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 3, ease: 'easeInOut' }}
          className="absolute text-white/40 text-2xl font-mono"
          style={{ ...position }}
        >
          {pair}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const AnimatedText = ({ children, delay, ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
    transition={{
      duration: 4,
      delay,
      ease: 'easeInOut',
      times: [0, 0.2, 0.8, 1],
    }}
    {...props}
  >
    {children}
  </motion.div>
);

const ConfettiPiece = ({ i }) => {
  const colors = ['#a855f7', '#d946ef', '#ec4899', '#f97316', '#eab308'];
  const randomColor = colors[i % colors.length];
  const randomX = Math.random() * 2 - 1;
  const randomY = Math.random() * 2 - 1;

  return (
    <motion.div
      className="absolute rounded-full"
      style={{
        backgroundColor: randomColor,
        top: '50%',
        left: '50%',
        width: 10,
        height: 10,
      }}
      animate={{
        x: `${randomX * 300}px`,
        y: `${randomY * 300}px`,
        opacity: [1, 1, 0],
        scale: [0.5, 1.5, 0],
      }}
      transition={{
        duration: 1.5,
        delay: 18,
        ease: 'easeOut',
      }}
    />
  );
};

const TributeVideoPlayer = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white z-50"
        >
          <X size={32} />
        </button>

        {/* Scene 1: Forex Pairs Background */}
        <div className="absolute inset-0 overflow-hidden">
          {forexPairs.map((pair) => (
            <Pair key={pair} pair={pair} />
          ))}
        </div>

        {/* Scene 2 & 3: Animated Text */}
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
          <AnimatePresence>
            <AnimatedText
              delay={6}
              className="text-4xl md:text-5xl font-bold text-white mb-8"
            >
              The struggle is worth it.
            </AnimatedText>

            <AnimatedText
              delay={10}
              className="text-2xl md:text-3xl text-purple-300"
            >
              Your mentorship is the HL that prevents the LL.
            </AnimatedText>

            <AnimatedText
              delay={14}
              className="text-2xl md:text-3xl text-fuchsia-400"
            >
              Thanks for teaching us to see the market in purple.
            </AnimatedText>
            
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 18, duration: 0.5, ease: 'easeOut' }}
                className="text-4xl md:text-6xl font-black text-white mt-8"
             >
                Happy Birthday, Thissdax! 🎂
             </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Scene 4: Confetti */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <ConfettiPiece key={i} i={i} />
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default TributeVideoPlayer;
