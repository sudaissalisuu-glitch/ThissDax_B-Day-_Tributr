
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';
import Image from 'next/image';

const SongDetailView = ({ onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div 
        className="relative w-full max-w-md bg-gradient-to-br from-purple-900/30 to-black/50 backdrop-blur-lg rounded-2xl p-8 text-white text-center shadow-2xl ring-1 ring-purple-500/50" 
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/50 hover:text-white z-50"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col items-center gap-6">
            <Image
                src="https://raw.githubusercontent.com/dreadshades-cpu/ssmmsm/main/images.png"
                width={150}
                height={150}
                alt="Album Art"
                className="rounded-xl shadow-lg animate-spin"
                style={{ animationDuration: '10s' }}
                data-ai-hint="album art"
            />
            <div className='space-y-1'>
                <h2 className="text-3xl font-bold">New Divide</h2>
                <p className="text-lg text-white/70">Linkin Park</p>
            </div>
            <p className="text-sm text-white/60">
                "New Divide" is a song by American rock band Linkin Park. It was released as a single and was featured as the theme for the film *Transformers: Revenge of the Fallen*.
            </p>
             <a 
                href="https://open.spotify.com/track/6Wx88Mv6b9ofj43i1j3Yal" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block bg-green-500 text-white font-bold py-2 px-6 rounded-full hover:bg-green-600 transition-colors"
            >
                Listen on Spotify
            </a>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SongDetailView;
