
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, Music } from 'lucide-react';

const NowPlayingCard = ({ audioRef }) => {
  const [isPlaying, setIsPlaying] = useState(!audioRef.current?.paused);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);

    audio.addEventListener('play', onPlay);
    audio.addEventListener('pause', onPause);

    return () => {
      audio.removeEventListener('play', onPlay);
      audio.removeEventListener('pause', onPause);
    };
  }, [audioRef]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -100, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 w-[300px] bg-black/40 backdrop-blur-lg border border-white/10 rounded-2xl p-4 flex items-center gap-4 z-50 shadow-2xl"
    >
      <div className="p-3 rounded-full bg-purple-500/20">
        <Music className="w-6 h-6 text-purple-300" />
      </div>
      <div className="flex-grow">
        <p className="font-bold text-white">New Divide</p>
        <p className="text-sm text-white/70">Linkin Park</p>
      </div>
      <button
        onClick={togglePlayPause}
        className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
      >
        {isPlaying ? (
          <Pause className="w-5 h-5 text-white" />
        ) : (
          <Play className="w-5 h-5 text-white" />
        )}
      </button>
    </motion.div>
  );
};

export default NowPlayingCard;
