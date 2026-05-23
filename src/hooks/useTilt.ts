import { useCallback } from 'react';
import { useSpring, useMotionValue } from 'framer-motion';

export const useTilt = (settings = { max: 15, perspective: 1000, scale: 1.05 }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  // Smooth, snappy spring physics for premium feel
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springScale = useSpring(scale, springConfig);

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const tiltX = ((mouseY - centerY) / centerY) * settings.max;
    const tiltY = ((centerX - mouseX) / centerX) * settings.max;
    
    x.set(tiltX);
    y.set(tiltY);
    scale.set(settings.scale);
  }, [settings.max, settings.scale, x, y, scale]);

  const onMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
    scale.set(1);
  }, [x, y, scale]);

  return { 
    style: { 
      rotateX: springX, 
      rotateY: springY, 
      scale: springScale, 
      transformPerspective: settings.perspective,
      willChange: 'transform' 
    }, 
    onMouseMove, 
    onMouseLeave 
  };
};
