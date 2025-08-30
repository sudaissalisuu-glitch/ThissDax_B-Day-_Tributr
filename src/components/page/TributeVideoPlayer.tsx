
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import dynamic from 'next/dynamic';

const NowPlayingCard = dynamic(() => import('./NowPlayingCard'), { ssr: false });

const forexPairs = [
  'EUR/USD', 'GBP/JPY', 'AUD/USD', 'USD/CAD', 'NZD/USD', 'XAU/USD',
  'USD/CHF', 'EUR/GBP', 'AUD/JPY', 'US30', 'BTC/USD',
];

const tradingTerms = [
  'Order Filled', 'Take Profit', 'Stop Loss Hit', 'Market Execution', 'Limit Order', 'Bearish', 'Bullish', 'Risk Management', 'Liquidity Grab'
];

const profitLossItems = Array.from({ length: 15 }).map(() => {
  const isProfit = Math.random() > 0.4;
  const value = Math.floor(Math.random() * 2000) + 50;
  return {
    text: isProfit ? `+$${value}` : `-$${value}`,
    color: isProfit ? 'text-green-400' : 'text-red-500',
  };
});


const AnimatedFloatingItem = ({ text, delay, duration, className }) => {
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
          // Don't reschedule, just appear once based on delay
        }, duration);
      };
      
      const timeoutId = setTimeout(show, delay);
      return () => clearTimeout(timeoutId);
    }, [delay, duration]);
  
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], scale: 1 }}
            transition={{ duration: duration / 1000, ease: 'easeInOut' }}
            className={`absolute font-mono text-2xl ${className}`}
            style={{ ...position }}
          >
            {text}
          </motion.div>
        )}
      </AnimatePresence>
    );
  };

const AnimatedText = ({ children, delay, duration = 4, className = '', ...props }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: [0, 1, 1, 0], y: [20, 0, 0, -20] }}
    transition={{
      duration: duration,
      delay: delay / 1000,
      ease: 'easeInOut',
      times: [0, 0.2, 0.8, 1],
    }}
    className={className}
    {...props}
  >
    {children}
  </motion.div>
);

const FireworksPiece = ({ i, delay }) => {
  const colors = ['#a855f7', '#d946ef', '#ec4899', '#f97316', '#eab308', '#ffffff'];
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
        width: Math.random() * 8 + 4,
        height: Math.random() * 8 + 4,
      }}
      animate={{
        x: `${randomX * 400}px`,
        y: `${randomY * 400}px`,
        opacity: [1, 1, 0],
        scale: [0.5, 1.2, 0],
      }}
      transition={{
        duration: 1.5,
        delay: delay / 1000,
        ease: 'easeOut',
      }}
    />
  );
};

const TributeVideoPlayer = ({ onClose, audioRef }) => {
  const finalMessageDelay = 22000;
  const [showNowPlaying, setShowNowPlaying] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNowPlaying(true);
    }, finalMessageDelay);

    return () => clearTimeout(timer);
  }, []);


  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative w-full h-full" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white z-50"
        >
          <X size={32} />
        </button>

        <AnimatePresence>
            {showNowPlaying && <NowPlayingCard audioRef={audioRef} />}
        </AnimatePresence>

        {/* Scene 1: Forex Pairs & Trading Terms */}
        <div className="absolute inset-0 overflow-hidden">
          {forexPairs.map((pair, i) => (
            <AnimatedFloatingItem key={`pair-${i}`} text={pair} delay={1000 + i * 200} duration={3000} className="text-white/30" />
          ))}
          {[...tradingTerms, ...profitLossItems.map(item => item.text)].map((item, i) => (
             <AnimatedFloatingItem 
                key={`term-${i}`} 
                text={typeof item === 'string' ? item : item.text}
                delay={4000 + i * 250} 
                duration={2500} 
                className={profitLossItems.find(pl => pl.text === item) ? profitLossItems.find(pl => pl.text === item).color : 'text-white/40'}
            />
          ))}
        </div>

        {/* Scene 2 & 3: Animated Text */}
        <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
          <AnimatePresence>
            <AnimatedText
              delay={8000}
              duration={4}
              className="text-4xl md:text-5xl font-bold text-white mb-8"
            >
              The struggle is worth it.
            </AnimatedText>

            <AnimatedText
              delay={12000}
              duration={4}
              className="text-2xl md:text-3xl text-purple-300"
            >
              Your mentorship is the HL that prevents the LL.
            </AnimatedText>

            <AnimatedText
              delay={16000}
              duration={4}
              className="text-2xl md:text-3xl text-fuchsia-400"
            >
              Thanks for teaching us to see the market in purple.
            </AnimatedText>
            
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: finalMessageDelay / 1000, duration: 0.5, ease: 'easeOut' }}
                className="text-4xl md:text-6xl font-black text-white mt-8"
             >
                Happy Birthday, Thissdax! 🎂
             </motion.div>

             <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: (finalMessageDelay + 2000) / 1000, duration: 1 }}
                className="text-lg text-white/70 mt-4"
             >
                Thank you for everything.
             </motion.p>
          </AnimatePresence>
        </div>
        
        {/* Scene 4: Fireworks */}
        <div className="absolute inset-0">
          {Array.from({ length: 80 }).map((_, i) => (
            <FireworksPiece key={i} i={i} delay={finalMessageDelay} />
          ))}
        </div>

      </div>
    </motion.div>
  );
};

export default TributeVideoPlayer;
