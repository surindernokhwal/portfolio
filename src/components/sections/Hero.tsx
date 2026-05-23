import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Terminal, Code2, Activity, Briefcase, Users, TrendingUp, Gauge, Globe, Mail } from 'lucide-react';
import { Github, Linkedin } from '../ui/Icons';
import { SectionWrapper } from '../ui/SectionWrapper';
import { MagneticButton } from '../ui/MagneticButton';
import { textReveal, staggerContainer } from '../../lib/motion';
import { useTheme } from '../../context/ThemeContext';

const OrbitalCore = () => {
  const { theme } = useTheme();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
      const y = (e.clientY / innerHeight - 0.5) * 2; // -1 to 1
      mouseX.set(x * 30);
      mouseY.set(y * -30);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const rotateX = useSpring(mouseY, { stiffness: 100, damping: 30 });
  const rotateY = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const translateX = useSpring(useTransform(mouseX, x => x * 1.5), { stiffness: 100, damping: 30 });
  const translateY = useSpring(useTransform(mouseY, y => y * 1.5), { stiffness: 100, damping: 30 });

  return (
    <motion.div 
      style={{ rotateX, rotateY, x: translateX, y: translateY, transformStyle: 'preserve-3d' }}
      className="relative w-full aspect-square max-w-[800px] mx-auto z-10 hidden lg:flex items-center justify-center will-change-transform"
    >
      {/* Intense Aurora Core Glow */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className={`absolute inset-0 bg-gradient-to-tr ${theme === 'dark' ? 'from-purple-600/40 via-blue-500/20' : 'from-purple-400/20 via-blue-300/10'} to-transparent rounded-full blur-[120px] pointer-events-none`} 
      />

      {/* Outer Ring */}
      <motion.div 
        animate={{ rotateZ: 360 }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className={`absolute w-full h-full rounded-full border ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} border-t-purple-500/50 border-b-blue-500/50 shadow-[0_0_50px_rgba(168,85,247,0.2)]`}
        style={{ transformStyle: 'preserve-3d', rotateX: 60 }}
      />

      {/* Middle Ring */}
      <motion.div 
        animate={{ rotateZ: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className={`absolute w-3/4 h-3/4 rounded-full border ${theme === 'dark' ? 'border-white/5' : 'border-black/5'} border-l-pink-500/50 border-r-cyan-500/50 shadow-[0_0_40px_rgba(236,72,153,0.1)]`}
        style={{ transformStyle: 'preserve-3d', rotateX: -40, rotateY: 30 }}
      />

      {/* Inner Plasma Core */}
      <motion.div 
        animate={{ rotate: 360, scale: [1, 1.05, 1] }}
        transition={{ rotate: { duration: 15, repeat: Infinity, ease: "linear" }, scale: { duration: 4, repeat: Infinity, ease: "easeInOut" } }}
        style={{ transformStyle: 'preserve-3d', translateZ: 50 }}
        className="absolute w-1/4 h-1/4 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 shadow-[0_0_100px_rgba(168,85,247,0.8)] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-40 mix-blend-overlay" />
      </motion.div>

      {/* Animated Terminal Window */}
      <motion.div 
        animate={{ y: [-15, 15, -15], rotateY: [-5, 5, -5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{ translateZ: 150, rotateX: 10, rotateY: -20 }}
        className={`absolute -right-20 top-1/4 w-64 rounded-xl border ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} bg-background/80 backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden`}
      >
        <div className={`flex items-center gap-2 px-4 py-3 border-b ${theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/5 bg-black/5'}`}>
           <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
           <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
           <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
           <span className={`ml-2 text-[10px] font-black tracking-widest ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} uppercase`}>System_Runtime</span>
        </div>
        <div className={`p-4 font-mono text-xs ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} flex flex-col gap-2`}>
           <p><span className="text-pink-500">const</span> <span className="text-blue-400">architect</span> = <span className="text-yellow-300">new</span> <span className="text-purple-400">FrontendSystem</span>();</p>
           <motion.p 
             animate={{ opacity: [0, 1] }} 
             transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
           >
             <span className="text-green-500">architect.initialize()</span>; █
           </motion.p>
        </div>
      </motion.div>

      {/* Floating Holographic UI Panel */}
      <motion.div 
        animate={{ y: [20, -20, 20], x: [-15, 15, -15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        style={{ translateZ: 100, rotateX: -15, rotateY: 25 }}
        className={`absolute -left-10 bottom-1/3 p-4 rounded-2xl border ${theme === 'dark' ? 'border-white/10 bg-white/[0.02]' : 'border-black/10 bg-black/[0.02]'} backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col gap-3 w-48`}
      >
        <div className="flex items-center gap-3 mb-1">
          <Activity size={16} className="text-cyan-400" />
          <span className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>Performance</span>
        </div>
        <div className={`${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} h-1.5 rounded-full overflow-hidden`}>
          <motion.div 
            animate={{ width: ['40%', '100%', '80%'] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 shadow-[0_0_10px_#22d3ee]" 
          />
        </div>
        <div className={`${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'} h-1.5 rounded-full overflow-hidden`}>
          <motion.div 
            animate={{ width: ['70%', '95%', '85%'] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="h-full bg-gradient-to-r from-purple-400 to-pink-500 shadow-[0_0_10px_#e879f9]" 
          />
        </div>
      </motion.div>
      
      {/* Floating Code Snippet */}
      <motion.div 
        animate={{ y: [-10, 10, -10], rotateZ: [-5, 5, -5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ translateZ: 200 }}
        className={`absolute top-10 left-10 p-3 rounded-xl border ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} bg-background/60 backdrop-blur-md flex items-center gap-3 shadow-2xl`}
      >
        <Code2 size={16} className="text-purple-400" />
        <span className={`text-[10px] font-mono ${theme === 'dark' ? 'text-purple-200' : 'text-purple-600'}`}>{"<CinematicMotion />"}</span>
      </motion.div>
    </motion.div>
  );
};

export const Hero = () => {
  const { theme } = useTheme();
  const { scrollY } = useScroll();
  const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  const yText = useTransform(smoothScrollY, [0, 1000], [0, 200]);
  const opacityText = useTransform(smoothScrollY, [0, 300, 800], [1, 1, 0]);
  const scaleHero = useTransform(smoothScrollY, [0, 1000], [1, 0.95]);

  return (
    <SectionWrapper id="hero" className="min-h-[100svh] flex flex-col justify-center items-center relative overflow-hidden bg-background">
      
      {/* Background Aurora & Animated Beams */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div 
          animate={{ x: ['-20%', '20%', '-20%'], y: ['-10%', '10%', '-10%'] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className={`absolute top-0 left-0 w-[80vw] h-[80vh] ${theme === 'dark' ? 'bg-purple-900/10' : 'bg-purple-100/30'} blur-[150px] rounded-full mix-blend-screen`}
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-1/4 -right-1/4 w-[1px] h-[200vh] bg-gradient-to-b from-transparent via-${theme === 'dark' ? 'blue-500/20' : 'blue-500/40'} to-transparent -rotate-45`}
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className={`absolute top-1/2 left-1/4 w-[1px] h-[200vh] bg-gradient-to-b from-transparent via-${theme === 'dark' ? 'purple-500/30' : 'purple-500/50'} to-transparent rotate-45`}
        />
      </div>

      {/* Huge Animated Background Typography */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200vw] overflow-hidden pointer-events-none ${theme === 'dark' ? 'opacity-[0.02]' : 'opacity-[0.06]'} flex justify-center z-0 mix-blend-overlay`}>
        <motion.div 
          animate={{ x: [0, -500, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          className="text-[18rem] md:text-[30rem] font-black whitespace-nowrap tracking-tighter"
        >
          FRONTEND DEVELOPER
        </motion.div>
      </div>

      {/* Centerpiece: Massive Background Orbital Core Ecosystem */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] lg:w-[1400px] opacity-20 pointer-events-none z-0 flex items-center justify-center">
        <OrbitalCore />
      </div>

      {/* Foreground Particles Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E')] opacity-[0.03] pointer-events-none mix-blend-overlay z-10" />

      {/* Cinematic Overlapping Vignette */}
      <div className={`absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none z-20`} />

      {/* MAIN CONTENT (Highest Z-Index) */}
      <motion.div 
        style={{ y: yText, opacity: opacityText, scale: scaleHero, willChange: 'transform, opacity' }}
        className="container mx-auto px-6 lg:px-12 relative z-40 flex flex-col items-center justify-center text-center mt-10 isolate"
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center w-full"
        >
          {/* Futuristic Badge */}
          <motion.div
            variants={textReveal}
            className={`group relative inline-flex items-center space-x-3 px-6 py-3 rounded-full border border-purple-500/30 bg-background/50 backdrop-blur-xl ${theme === 'dark' ? 'text-purple-300' : 'text-purple-600'} text-[10px] md:text-xs uppercase tracking-[0.3em] font-black mb-8 overflow-hidden shadow-[0_0_30px_rgba(168,85,247,0.2)]`}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/20 to-purple-500/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-purple-500 shadow-[0_0_10px_#a855f7]"></span>
            </span>
            <span>Senior Frontend Developer</span>
          </motion.div>
          
          {/* Layered Cinematic Typography */}
          <motion.h1
            variants={textReveal}
            className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter mb-6 leading-tight max-w-5xl relative"
          >
            <span className={`block ${theme === 'dark' ? 'text-white' : 'text-slate-900'} mb-2 relative z-10 drop-shadow-2xl`}>
              Building High-Performance
            </span>
            <span className="block relative">
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 blur-[40px] opacity-60 animate-pulse" />
              <span className={`relative z-10 text-transparent bg-clip-text bg-gradient-to-r ${theme === 'dark' ? 'from-white via-purple-300 to-white' : 'from-slate-900 via-purple-600 to-slate-900'} bg-[length:200%_auto] animate-gradient`}>
                Frontend Experiences with React & Next.js
              </span>
            </span>
          </motion.h1>
          
          <motion.p
            variants={textReveal}
            className={`text-base md:text-lg lg:text-xl ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} mb-10 max-w-3xl leading-relaxed font-medium drop-shadow-md`}
          >
            Frontend developer with 4+ years of experience building scalable, responsive, and high-performance web applications using React.js, Next.js, and modern frontend technologies.
          </motion.p>
          
          {/* Responsive & High-Contrast CTA Section */}
          <motion.div
            variants={textReveal}
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4 sm:gap-6 relative z-50 w-full sm:w-auto mb-16 px-4 sm:px-0"
          >
            <MagneticButton strength={40}>
              <a
                href="#projects"
                className="group relative flex sm:inline-flex items-center justify-center px-8 sm:px-10 py-5 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-[length:200%_auto] hover:bg-[center_right_1rem] text-white font-black text-[12px] sm:text-[10px] uppercase tracking-[0.2em] transition-all duration-500 hover:scale-[1.03] shadow-[0_10px_40px_rgba(168,85,247,0.4)] overflow-hidden"
              >
                <span className="relative z-10 flex items-center drop-shadow-md">
                  View Projects
                  <ArrowRight size={16} className="ml-3 group-hover:translate-x-1 group-hover:rotate-[-45deg] transition-transform duration-300" />
                </span>
                {/* Internal Glow sweep */}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </a>
            </MagneticButton>
            
            <MagneticButton strength={20}>
              <a
                href="/Surinder_Kumar_Resume.docx"
                download="Surinder_Kumar_Resume.docx"
                className={`group relative flex sm:inline-flex items-center justify-center px-8 sm:px-10 py-5 rounded-2xl border ${theme === 'dark' ? 'border-white/30 bg-white/10 text-white' : 'border-black/20 bg-black/5 text-slate-900'} backdrop-blur-2xl font-black text-[12px] sm:text-[10px] uppercase tracking-[0.2em] hover:bg-opacity-20 transition-all duration-500 hover:scale-[1.03] shadow-[0_10px_30px_rgba(0,0,0,0.1)]`}
              >
                <span className="relative z-10 flex items-center">
                  Download Resume
                </span>
              </a>
            </MagneticButton>

            <MagneticButton strength={20}>
              <a
                href="#contact"
                className={`group relative flex sm:inline-flex items-center justify-center px-8 sm:px-10 py-5 rounded-2xl border ${theme === 'dark' ? 'border-purple-500/30 bg-purple-500/10 text-purple-300 hover:bg-purple-500/25' : 'border-purple-500/20 bg-purple-500/5 text-purple-600 hover:bg-purple-500/10'} backdrop-blur-2xl font-black text-[12px] sm:text-[10px] uppercase tracking-[0.2em] transition-all duration-500 hover:scale-[1.03] shadow-[0_10px_30px_rgba(168,85,247,0.15)]`}
              >
                <span className="relative z-10 flex items-center">
                  Contact Me
                  <Mail size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </span>
              </a>
            </MagneticButton>
          </motion.div>

          {/* Floating Stats Grid */}
          <motion.div
            variants={textReveal}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 w-full max-w-6xl mt-4 px-4 relative z-50"
          >
            {[
              { val: "4+", lbl: "Years Experience", icon: <Briefcase size={20} className="text-purple-400" /> },
              { val: "10K+", lbl: "Learners Served", icon: <Users size={20} className="text-pink-400" /> },
              { val: "20-30%", lbl: "Perf. Gains", icon: <TrendingUp size={20} className="text-cyan-400" /> },
              { val: "90+", lbl: "Lighthouse Score", icon: <Gauge size={20} className="text-emerald-400" /> },
              { val: "10+", lbl: "Websites Delivered", icon: <Globe size={20} className="text-blue-400" /> }
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.05, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`flex flex-col items-center justify-center p-6 rounded-2xl border ${theme === 'dark' ? 'bg-white/[0.02] border-white/5 shadow-[0_4px_30px_rgba(0,0,0,0.4)]' : 'bg-black/[0.02] border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.05)]'} backdrop-blur-md transition-all group ${idx === 4 ? 'col-span-2 sm:col-span-1' : ''}`}
              >
                <div className={`p-3 rounded-xl mb-3 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border group-hover:scale-110 transition-transform duration-300`}>
                  {stat.icon}
                </div>
                <span className="text-3xl font-black tracking-tight text-foreground mb-1">
                  {stat.val}
                </span>
                <span className={`text-[9px] font-black uppercase tracking-[0.2em] text-center ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                  {stat.lbl}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </motion.div>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        style={{ opacity: opacityText }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 pointer-events-none z-30"
      >
        <motion.div 
          animate={{ height: ['0%', '100%', '0%'], top: ['0%', '0%', '100%'] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-[2px] h-20 bg-gradient-to-b from-purple-500 to-transparent relative overflow-hidden shadow-[0_0_10px_#a855f7]"
        />
      </motion.div>
    </SectionWrapper>
  );
};
