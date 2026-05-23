import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ease } from '../../lib/motion';

export const Preloader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2500; // 2.5 seconds loading simulation
    const interval = 20;
    const increment = 100 / (duration / interval);

    const timer = setInterval(() => {
      start += increment;
      if (start >= 100) {
        clearInterval(timer);
        setProgress(100);
        setTimeout(() => setLoading(false), 800); // Hold at 100% briefly
      } else {
        // Add some random easing to the progress calculation for realism
        const jitter = Math.random() * 2 - 1;
        setProgress(Math.min(100, start + jitter));
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1, filter: 'blur(0px)' }}
          exit={{ 
            opacity: 0,
            filter: 'blur(20px)',
            transition: { duration: 1.2, ease: ease.luxury }
          }}
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-background overflow-hidden"
        >
          {/* Ambient Lighting */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: ease.luxury }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] md:w-[600px] md:h-[600px] bg-purple-900/20 blur-[120px] rounded-full pointer-events-none"
          />

          <div className="relative z-10 flex flex-col items-center w-full max-w-sm px-6">
            {/* Logo Reveal */}
            <div className="overflow-hidden mb-12">
              <motion.div
                initial={{ y: '100%', opacity: 0, filter: 'blur(10px)' }}
                animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1.2, ease: ease.luxury }}
                className="text-5xl md:text-7xl font-black tracking-tighter text-white flex items-center"
              >
                SURINDER
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 10 }}
                  className="text-purple-500 inline-block ml-1"
                >.</motion.span>
              </motion.div>
            </div>
            
            {/* Minimalist Progress Indicator */}
            <div className="w-full flex justify-between items-end mb-3">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 1 }}
                className="text-[10px] text-slate-500 font-black uppercase tracking-[0.3em]"
              >
                System Initialization
              </motion.span>
              <motion.span 
                className="text-sm font-mono text-purple-400 font-bold"
              >
                {Math.floor(progress)}%
              </motion.span>
            </div>

            {/* Progress Bar Container */}
            <div className="w-full h-[1px] bg-white/10 relative overflow-hidden">
              <motion.div 
                className="absolute top-0 left-0 bottom-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500"
                style={{ width: `${progress}%` }}
                initial={{ width: '0%' }}
                transition={{ ease: "linear" }}
              />
              
              {/* Glow head */}
              <motion.div
                className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[4px]"
                style={{ left: `calc(${progress}% - 8px)` }}
              />
            </div>
          </div>
          
          {/* Subtle noise overlay specifically for preloader */}
          <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')]" />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
