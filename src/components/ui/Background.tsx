import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';

const FloatingParticles = () => {
  const { theme } = useTheme();
  const particles = useMemo(() => {
    // Dynamically limit particles on mobile touch devices to ensure 60fps scrolling
    const isMobileDevice = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);
    const particleCount = isMobileDevice ? 15 : 50;
    
    return Array.from({ length: particleCount }).map(() => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.5 + 0.1
    }));
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${theme === 'dark' ? 'bg-white' : 'bg-purple-500'} will-change-transform ${theme === 'dark' ? 'mix-blend-screen' : 'mix-blend-multiply'}`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
            opacity: theme === 'dark' ? particle.opacity : particle.opacity * 0.4,
            boxShadow: theme === 'dark' ? `0 0 ${particle.size * 2}px rgba(255,255,255,0.8)` : `0 0 ${particle.size * 2}px rgba(139,92,246,0.2)`
          }}
          animate={{
            y: ['0vh', '-100vh'],
            x: ['0vw', `${Math.random() * 20 - 10}vw`]
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            ease: "linear",
            delay: particle.delay
          }}
        />
      ))}
    </div>
  );
};

export const Background = () => {
  const { theme } = useTheme();
  
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-background">
      {/* Deep Space Background gradient with dynamic bloom */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] ${theme === 'dark' ? 'from-indigo-900/30' : 'from-indigo-100/50'} via-background to-background`} />
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] ${theme === 'dark' ? 'from-purple-900/10' : 'from-purple-100/30'} via-transparent to-transparent ${theme === 'dark' ? 'mix-blend-screen' : 'mix-blend-normal'}`} />

      {/* Floating Cinematic Particles */}
      <FloatingParticles />

      {/* Ambient Fog / Animated Aurora Orbs */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-60 mix-blend-screen' : 'opacity-40 mix-blend-normal'}`}>
        <motion.div
          animate={{
            x: ['0vw', '15vw', '-5vw', '0vw'],
            y: ['0vh', '-10vh', '15vh', '0vh'],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className={`absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full ${theme === 'dark' ? 'bg-purple-600/20' : 'bg-purple-200/40'} blur-[130px]`}
        />
        
        <motion.div
          animate={{
            x: ['0vw', '-10vw', '15vw', '0vw'],
            y: ['0vh', '15vh', '-10vh', '0vh'],
            scale: [1, 1.1, 1.3, 1],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className={`absolute top-[20%] right-[-10%] w-[50vw] h-[70vw] rounded-full ${theme === 'dark' ? 'bg-blue-600/15' : 'bg-blue-100/40'} blur-[160px]`}
        />
        
        <motion.div
          animate={{
            x: ['0vw', '5vw', '-15vw', '0vw'],
            y: ['0vh', '-15vh', '10vh', '0vh'],
            scale: [1, 1.4, 1, 1],
          }}
          transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          className={`absolute bottom-[-10%] left-[20%] w-[70vw] h-[50vw] rounded-full ${theme === 'dark' ? 'bg-pink-600/10' : 'bg-pink-100/30'} blur-[140px]`}
        />
      </div>

      {/* Cinematic Beams (Moving Light Rays) */}
      <motion.div 
        animate={{ opacity: [0.1, 0.3, 0.1], x: [0, 100, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute top-0 left-1/4 w-[1px] h-[150vh] bg-gradient-to-b from-transparent via-${theme === 'dark' ? 'purple-500/40' : 'purple-400/20'} to-transparent rotate-45 transform-gpu blur-[2px]`} 
      />
      <motion.div 
        animate={{ opacity: [0.1, 0.2, 0.1], x: [0, -100, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className={`absolute top-0 right-1/4 w-[2px] h-[150vh] bg-gradient-to-b from-transparent via-${theme === 'dark' ? 'blue-500/30' : 'blue-400/15'} to-transparent -rotate-12 transform-gpu blur-[4px]`} 
      />

      {/* Subtle Moving SVG Grid */}
      <motion.div 
        animate={{ y: [0, 40] }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className={`absolute -inset-[40px] ${theme === 'dark' ? 'bg-[radial-gradient(rgba(139,92,246,0.06)_1px,transparent_1px)]' : 'bg-[radial-gradient(rgba(139,92,246,0.15)_1px,transparent_1px)]'} bg-[size:40px_40px]`} 
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black, transparent)'
        }}
      />
      
      {/* Premium Noise Overlay */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'opacity-[0.035]' : 'opacity-[0.02]'} mix-blend-overlay pointer-events-none bg-[url('data:image/svg+xml,%3Csvg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%25" height="100%25" filter="url(%23noiseFilter)"/%3E%3C/svg%3E')]`} />
      
      {/* Horizontal Cinematic Scanline effect */}
      <div className={`absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.1)_50%,transparent_100%)] bg-[size:100%_4px] ${theme === 'dark' ? 'opacity-30 mix-blend-multiply' : 'opacity-10 mix-blend-multiply'}`} />
      
      {/* Vignette */}
      <div className={`absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,${theme === 'dark' ? 'rgba(2,6,23,0.9)' : 'rgba(255,255,255,0.5)'} 100%)] pointer-events-none`} />
    </div>
  );
};
