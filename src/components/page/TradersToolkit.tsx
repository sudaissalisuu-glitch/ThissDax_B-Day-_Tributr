
'use client';

import { motion } from 'framer-motion';
import { Network, BarChart3, ListOrdered, GitMerge } from 'lucide-react';
import React from 'react';

const toolkitItems = [
  {
    icon: <Network className="w-8 h-8 text-purple-400" />,
    title: 'Abido Shaker (Orderflow)',
    description: 'Mastering the flow of orders to anticipate market direction.',
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-purple-400" />,
    title: 'Volume Profile',
    description: 'Identifying key levels of support and resistance based on trading volume.',
  },
  {
    icon: <ListOrdered className="w-8 h-8 text-purple-400" />,
    title: 'Depth of Market (DOM)',
    description: 'Reading the order book to see buy and sell pressure in real-time.',
  },
  {
    icon: <GitMerge className="w-8 h-8 text-purple-400" />,
    title: 'TA VWAP',
    description: 'Using the Volume Weighted Average Price as a key indicator.',
  },
];

const AnimatedText = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, delay }}
    className={className}
  >
    {children}
  </motion.div>
);

const TradersToolkit = () => {
  return (
    <section id="toolkit" className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 overflow-hidden">
      <div className="text-center space-y-4 mb-12">
        <AnimatedText>
          <h2 className="text-3xl sm:text-4xl font-bold">The Trader's Toolkit</h2>
        </AnimatedText>
        <AnimatedText delay={0.2}>
          <p className="text-white/70 max-w-2xl mx-auto">
            Core principles for navigating the market, inspired by Thissdax's mentorship.
          </p>
        </AnimatedText>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {toolkitItems.map((item, index) => (
          <motion.div
            key={index}
            className="bg-card/50 ring-1 ring-white/10 rounded-2xl p-6 flex flex-col items-start gap-4 transition-all duration-300 hover:ring-purple-400/50 hover:bg-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
          >
            <div className="bg-purple-900/50 p-3 rounded-xl ring-1 ring-purple-500/20">
                {item.icon}
            </div>
            <h3 className="text-xl font-bold text-white">{item.title}</h3>
            <p className="text-white/70 text-sm leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default TradersToolkit;
