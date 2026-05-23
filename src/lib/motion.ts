import type { Variants } from 'framer-motion';

type CubicBezier = [number, number, number, number];

// Master Easing Curves for Cinematic Motion
export const ease: Record<string, CubicBezier> = {
  // Apple-like luxurious slow ease
  luxury: [0.22, 1, 0.36, 1],
  // Smooth and snappy for interactive elements
  snappy: [0.4, 0, 0.2, 1],
  // Ultra smooth dissolve
  dissolve: [0.32, 0.72, 0, 1],
  // Bouncy spring emulation
  spring: [0.175, 0.885, 0.32, 1.275]
};

// Reusable Framer Motion Variants
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: ease.luxury } }
};

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: ease.luxury } }
};

export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    }
  }
};

export const textReveal: Variants = {
  hidden: { y: '100%', opacity: 0, filter: 'blur(10px)' },
  visible: { 
    y: '0%', 
    opacity: 1, 
    filter: 'blur(0px)',
    transition: { duration: 1, ease: ease.luxury } 
  }
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: ease.luxury } }
};

export const beamReveal: Variants = {
  hidden: { scaleY: 0, originY: 0 },
  visible: { scaleY: 1, originY: 0, transition: { duration: 1.5, ease: ease.luxury } }
};
