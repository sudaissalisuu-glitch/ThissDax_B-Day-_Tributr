
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

        {/* Scene 1: Forex Pairs */}
        <div className="absolute inset-0">
          {forexPairs.map((pair) => (
            <Pair key={pair} pair={pair} />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default TributeVideoPlayer;
