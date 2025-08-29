
'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Music2 } from 'lucide-react';

export default function NowPlayingNotification({ songTitle, artist, albumArtUrl }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 5000); // Disappear after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed top-4 left-1/2 -translate-x-1/2 z-50"
        >
          <motion.div
            className="flex items-center gap-3 bg-black/80 backdrop-blur-md text-white rounded-full overflow-hidden shadow-2xl ring-1 ring-purple-500/50"
            initial={{ width: 48, height: 48 }}
            animate={{ width: 'auto', height: 48, transition: { delay: 0.2, duration: 0.5 } }}
            exit={{ width: 48, height: 48, transition: { duration: 0.5 } }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 0.7 } }}
              exit={{ opacity: 0, transition: { duration: 0.2 } }}
              className="flex items-center gap-3 pl-2 pr-4"
            >
              <Image
                src={albumArtUrl}
                width={36}
                height={36}
                alt="Album Art"
                className="rounded-full aspect-square object-cover animate-spin"
                style={{ animationDuration: '5s' }}
                data-ai-hint="album art"
              />
              <div className="flex flex-col text-left whitespace-nowrap">
                <span className="text-sm font-medium">{songTitle}</span>
                <span className="text-xs text-white/60">{artist}</span>
              </div>
              <div className="flex items-center gap-1">
                 <Music2 size={16} className="text-purple-400" />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

    