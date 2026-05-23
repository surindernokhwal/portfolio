import React, { useEffect, useState, useRef } from 'react';
import { SectionWrapper } from '../ui/SectionWrapper';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useTilt } from '../../hooks/useTilt';
import { fadeUp } from '../../lib/motion';
import { useTheme } from '../../context/ThemeContext';

const Counter = ({ value, label, color }: { value: string, label: string, color: string }) => {
  const { theme } = useTheme();
  const [count, setCount] = useState(0);
  const target = parseInt(value);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [target]);

  const tilt = useTilt({ max: 15, perspective: 1000, scale: 1.05 });

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={tilt.style}
      className={`relative p-10 rounded-[2rem] border ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.02] border-black/5'} transition-all duration-500 group overflow-hidden cursor-default shadow-2xl hover:border-foreground/10`}
    >
      {/* Dynamic Background Glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-xl pointer-events-none`} />
      
      {/* Corner Accent */}
      <div className={`absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl ${theme === 'dark' ? 'from-white/5' : 'from-black/5'} to-transparent pointer-events-none`} />

      <div className="relative z-10 text-center">
        <h3 className={`text-6xl lg:text-7xl font-black mb-4 tracking-tighter text-transparent bg-clip-text bg-gradient-to-br ${color} group-hover:scale-110 transition-transform duration-500 origin-bottom`}>
          {count}{value.includes('+') ? '+' : value.includes('%') ? '%' : ''}
        </h3>
        <p className={`text-[10px] ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} font-black uppercase tracking-[0.3em] group-hover:text-foreground transition-colors duration-300`}>
          {label}
        </p>
      </div>
    </motion.div>
  );
};

export const About = () => {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const yHeader = useTransform(smoothProgress, [0, 1], [0, 150]);

  return (
    <SectionWrapper id="about" className="relative z-10 py-32 overflow-hidden bg-background">
      {/* Soft & Intellectual Atmospheric Fog */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/5 via-background to-background pointer-events-none -z-10" />
      
      {/* Ambient Depth Layer Spill from Hero */}
      <div className="absolute top-0 right-0 w-[1000px] h-[1000px] bg-gradient-to-bl from-purple-600/10 via-pink-600/5 to-transparent blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className={`absolute -top-40 left-0 right-0 h-80 bg-gradient-to-b ${theme === 'dark' ? 'from-[#020617] via-blue-900/10' : 'from-background via-blue-100/20'} to-transparent pointer-events-none z-0`} />

      {/* Massive Background Typography */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none ${theme === 'dark' ? 'opacity-[0.02]' : 'opacity-[0.05]'} flex justify-center z-0 mix-blend-overlay`}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-[12rem] md:text-[22rem] font-black whitespace-nowrap tracking-tighter"
        >
          PHILOSOPHY
        </motion.div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10" ref={containerRef}>
        <motion.div style={{ y: yHeader }} className="mb-20 relative z-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-purple-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-4"
          >
            <span className="w-12 h-[1px] bg-purple-500/50" />
            Engineering Identity
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-tight"
          >
            Frontend <br/>
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme === 'dark' ? 'from-white/30 to-white' : 'from-slate-500 to-slate-900'}`}>Developer.</span>
          </motion.h2>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start relative z-10">
          <motion.div 
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={`lg:col-span-6 space-y-8 text-lg lg:text-xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} leading-relaxed font-medium`}
          >
            <p className="first-letter:text-7xl first-letter:font-black first-letter:text-transparent first-letter:bg-clip-text first-letter:bg-gradient-to-br first-letter:from-purple-400 first-letter:to-pink-500 first-letter:mr-4 first-letter:float-left">
              I specialize in building scalable frontend applications using React.js, Next.js, TypeScript, and modern UI frameworks. From eCommerce platforms to learning management systems, I create fast, responsive, and accessible user experiences focused on real business impact.
            </p>
            <p className="pl-6 border-l-2 border-purple-500/30 text-slate-400 text-base md:text-lg">
              Throughout my engineering journey, I have focused on solving real-world performance bottlenecks, reducing DOM complexity, optimizing Core Web Vitals, and implementing rich interactive design systems that feel alive.
            </p>
          </motion.div>

          <div className="lg:col-span-6 pt-4 w-full">
            <h3 className={`text-xs font-black uppercase tracking-[0.3em] mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
              TECHNICAL STACK & TOOLING
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { name: "React.js", color: "from-blue-500/10 to-cyan-500/10 text-cyan-300 border-cyan-500/20" },
                { name: "Next.js", color: "from-slate-500/10 to-slate-900/10 text-white border-white/10" },
                { name: "TypeScript", color: "from-blue-600/10 to-indigo-600/10 text-blue-300 border-blue-500/20" },
                { name: "Tailwind CSS", color: "from-teal-500/10 to-cyan-500/10 text-teal-300 border-teal-500/20" },
                { name: "Redux", color: "from-purple-500/10 to-indigo-500/10 text-purple-300 border-purple-500/20" },
                { name: "Firebase", color: "from-yellow-500/10 to-orange-500/10 text-yellow-300 border-yellow-500/20" },
                { name: "REST APIs", color: "from-emerald-500/10 to-teal-500/10 text-emerald-300 border-emerald-500/20" },
                { name: "Shopify", color: "from-green-500/10 to-emerald-600/10 text-green-300 border-green-500/20" },
                { name: "WooCommerce", color: "from-indigo-500/10 to-purple-600/10 text-indigo-300 border-indigo-500/20" },
                { name: "WordPress", color: "from-sky-500/10 to-blue-600/10 text-sky-300 border-sky-500/20" },
                { name: "GitHub", color: "from-zinc-500/10 to-zinc-800/10 text-zinc-300 border-zinc-500/10" },
                { name: "Figma", color: "from-rose-500/10 to-red-500/10 text-rose-300 border-rose-500/20" }
              ].map((tech, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 15 }}
                  className={`flex items-center justify-center px-4 py-4 rounded-xl border bg-background/40 backdrop-blur-md shadow-xl text-[10px] font-black uppercase tracking-wider text-center cursor-default ${theme === 'dark' ? tech.color : 'bg-slate-100 border-slate-200 text-slate-700 hover:bg-slate-200'}`}
                >
                  {tech.name}
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
