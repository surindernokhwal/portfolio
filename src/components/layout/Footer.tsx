import React from 'react';
import { Github, Linkedin } from '../ui/Icons';
import { motion } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { useTheme } from '../../context/ThemeContext';

export const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-20 overflow-hidden bg-background border-t border-foreground/5">
      {/* Dynamic Animated Background */}
      <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)]' : 'bg-[linear-gradient(to_right,#00000010_1px,transparent_1px),linear-gradient(to_bottom,#00000010_1px,transparent_1px)]'} bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20`} />
      
      {/* Glow Divider */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[2px] bg-gradient-to-r from-transparent via-purple-500 to-transparent shadow-[0_0_30px_rgba(168,85,247,0.8)]" />
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[400px] bg-gradient-to-b ${theme === 'dark' ? 'from-purple-600/20' : 'from-purple-100/40'} to-transparent blur-[120px] pointer-events-none rounded-full`} />

      {/* Floating Particles Map */}
      <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
         <motion.div animate={{ y: [-10, 10, -10] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} className="absolute top-10 left-1/4 w-1 h-1 bg-purple-400 rounded-full shadow-[0_0_10px_#a855f7]" />
         <motion.div animate={{ y: [10, -10, 10] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }} className="absolute top-40 right-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full shadow-[0_0_10px_#3b82f6]" />
         <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} className="absolute bottom-20 left-1/3 w-2 h-2 bg-pink-400 rounded-full blur-[1px]" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10 flex flex-col items-center text-center">
        
        {/* Animated Logo */}
        <motion.div 
          whileHover={{ scale: 1.05 }}
          className="mb-10 cursor-pointer relative group"
        >
          <div className="absolute -inset-4 bg-purple-500/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <a href="#" className={`text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter ${theme === 'dark' ? 'text-white' : 'text-slate-900'} flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-0 relative z-10`}>
            <span>
              SK<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-pulse">.</span>
            </span>
            <span className={`sm:ml-4 px-4 py-2 text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-purple-300 border-purple-500/30 bg-purple-500/10' : 'text-purple-600 border-purple-500/20 bg-purple-500/5'} border rounded-full shadow-[0_0_20px_rgba(168,85,247,0.1)]`}>
              Level 5 Architect
            </span>
          </a>
        </motion.div>

        {/* Premium Closing Statement */}
        <p className={`text-xl md:text-3xl ${theme === 'dark' ? 'text-white' : 'text-slate-900'} max-w-2xl mb-6 font-black tracking-tighter leading-tight`}>
          Engineering the future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">cinematic digital experiences.</span>
        </p>
        <p className="text-slate-400 text-sm md:text-base max-w-lg mb-12 font-medium leading-relaxed">
          Bridging the gap between award-winning creative design and uncompromising frontend system architecture.
        </p>

        {/* Built With Badge */}
        <motion.div 
          whileHover={{ scale: 1.02 }}
          className={`flex items-center gap-4 mb-20 px-6 py-3 rounded-full border ${theme === 'dark' ? 'border-white/10 bg-background/50' : 'border-black/10 bg-black/5'} shadow-2xl backdrop-blur-xl hover:border-purple-500/30 transition-colors cursor-pointer group`}
        >
           <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300 transition-colors">Engineered with</span>
           <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shadow-[0_0_10px_#a855f7]" />
           <span className={`text-[10px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>React + Motion</span>
        </motion.div>

        <div className={`w-full h-[1px] bg-gradient-to-r from-transparent via-${theme === 'dark' ? 'white/10' : 'black/10'} to-transparent mb-12`} />

        <div className="flex flex-col md:flex-row justify-between w-full items-center gap-8">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-600">
            &copy; {currentYear} Surinder Kumar. All Rights Reserved. Crafted with precision.
          </p>

          <div className="flex gap-4">
            <MagneticButton strength={20}>
              <a href="https://github.com/surindernokhwal" target="_blank" rel="noopener noreferrer" className={`w-14 h-14 rounded-full ${theme === 'dark' ? 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-purple-500/10' : 'bg-black/[0.02] border-black/5 text-slate-500 hover:text-slate-900 hover:bg-purple-500/5'} border flex items-center justify-center transition-all duration-300 shadow-xl group`}>
                <Github size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </MagneticButton>
            <MagneticButton strength={20}>
              <a href="https://www.linkedin.com/in/surinder-kumar-0835741b4/" target="_blank" rel="noopener noreferrer" className={`w-14 h-14 rounded-full ${theme === 'dark' ? 'bg-white/[0.02] border-white/5 text-slate-400 hover:text-white hover:bg-blue-500/10' : 'bg-black/[0.02] border-black/5 text-slate-500 hover:text-slate-900 hover:bg-blue-500/5'} border flex items-center justify-center transition-all duration-300 shadow-xl group`}>
                <Linkedin size={20} className="group-hover:scale-110 transition-transform" />
              </a>
            </MagneticButton>
          </div>
        </div>

      </div>
    </footer>
  );
};
