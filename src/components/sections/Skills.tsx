import React from 'react';
import { SectionWrapper } from '../ui/SectionWrapper';
import { motion } from 'framer-motion';
import { Code2, MonitorPlay, ShoppingCart, Wrench, Cpu, Globe, Rocket, Shield, Layers } from 'lucide-react';
import { useTilt } from '../../hooks/useTilt';
import { cn } from '../../lib/utils';
import { fadeUp } from '../../lib/motion';
import { useTheme } from '../../context/ThemeContext';

const SkillCard = ({ category, className }: { category: any, className?: string }) => {
  const { theme } = useTheme();
  const tilt = useTilt({ max: 5, perspective: 1500, scale: 1.02 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    tilt.onMouseMove(e);
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <motion.div
      variants={fadeUp}
      style={{ ...tilt.style, willChange: 'transform, opacity' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      className={cn(
        "group relative rounded-[2rem] p-8 md:p-10 border transition-all duration-500",
        theme === 'dark' ? "border-foreground/5 bg-foreground/[0.02] hover:border-foreground/10 hover:bg-foreground/[0.04]" : "border-foreground/10 bg-foreground/[0.02] hover:border-foreground/20 hover:bg-foreground/[0.05]",
        className
      )}
    >
      {/* Mouse Reactive Spotlight */}
      <div 
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), ${category.spotlightColor}, transparent 40%)`
        }}
      />
      
      {/* Base glow */}
      <div className={`absolute -inset-10 opacity-0 group-hover:opacity-20 transition-opacity duration-1000 blur-[80px] pointer-events-none bg-gradient-to-br ${category.glowColor}`} />
      
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div className={cn("p-4 rounded-2xl border backdrop-blur-md shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500", theme === 'dark' ? "bg-foreground/5 border-foreground/10" : "bg-foreground/5 border-foreground/10")}>
            {category.icon}
          </div>
          
          {/* Animated decorative dots */}
          <div className="flex gap-1.5 pt-2">
             <div className="w-1.5 h-1.5 rounded-full bg-foreground/20 group-hover:bg-foreground/80 group-hover:animate-pulse transition-colors duration-300" />
             <div className="w-1.5 h-1.5 rounded-full bg-foreground/20 group-hover:bg-foreground/80 group-hover:animate-pulse transition-colors duration-300 delay-75" />
             <div className="w-1.5 h-1.5 rounded-full bg-foreground/20 group-hover:bg-foreground/80 group-hover:animate-pulse transition-colors duration-300 delay-150" />
          </div>
        </div>

        {/* Content */}
        <div className="mt-auto">
          <h3 className="text-2xl md:text-4xl font-black text-foreground mb-4 tracking-tighter">
            {category.title}
          </h3>
          <p className={`text-sm md:text-base ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'} mb-8 font-medium leading-relaxed max-w-sm`}>
            {category.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2.5">
            {category.skills.map((skill: string, i: number) => (
              <span 
                key={i} 
                className={cn("px-3.5 py-1.5 rounded-lg border text-[10px] font-black uppercase tracking-[0.15em] transition-colors duration-300 shadow-xl", theme === 'dark' ? "border-foreground/5 bg-foreground/5 text-slate-300 group-hover:border-foreground/10 group-hover:bg-foreground/10 group-hover:text-foreground" : "border-foreground/10 bg-foreground/5 text-slate-600 group-hover:border-foreground/20 group-hover:bg-foreground/10 group-hover:text-foreground")}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
      
      {/* Hardware corner accents */}
      <div className="absolute top-0 left-0 w-12 h-[1px] bg-gradient-to-r from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      <div className="absolute top-0 left-0 w-[1px] h-12 bg-gradient-to-b from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Scanline overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.2)_50%,transparent_100%)] bg-[size:100%_4px] opacity-0 group-hover:opacity-20 pointer-events-none transition-opacity duration-1000 mix-blend-multiply" />
    </motion.div>
  );
};

export const Skills = () => {
  const { theme } = useTheme();
  const skillCategories = [
    {
      title: 'Frontend Engineering',
      description: 'Building scalable, robust React and Next.js applications using TypeScript and advanced state management.',
      icon: <Layers className="text-purple-400" size={28} />,
      spotlightColor: 'rgba(168, 85, 247, 0.15)',
      glowColor: 'from-purple-500 to-indigo-500',
      skills: ['React.js', 'Next.js', 'TypeScript', 'Redux', 'Context API'],
      className: 'md:col-span-1'
    },
    {
      title: 'Performance Optimization',
      description: 'Crushing rendering bottlenecks, optimizing assets, lazy loading, and ensuring maximum Core Web Vitals performance.',
      icon: <Rocket className="text-blue-400" size={28} />,
      spotlightColor: 'rgba(59, 130, 246, 0.15)',
      glowColor: 'from-blue-500 to-cyan-500',
      skills: ['Lazy Loading', 'Code Splitting', 'Lighthouse Optimization', 'Core Web Vitals'],
      className: 'md:col-span-1'
    },
    {
      title: 'eCommerce Development',
      description: 'Engineering highly optimized Shopify stores, custom WordPress WooCommerce storefronts, and secure payment integrations.',
      icon: <ShoppingCart className="text-pink-400" size={28} />,
      spotlightColor: 'rgba(236, 72, 153, 0.15)',
      glowColor: 'from-pink-500 to-rose-500',
      skills: ['Shopify', 'WooCommerce', 'Payment Gateway Integration', 'Product UI'],
      className: 'md:col-span-1'
    },
    {
      title: 'UI/UX Implementation',
      description: 'Translating high-fidelity Figma designs into pixel-perfect, fully accessible, and highly responsive frontend code.',
      icon: <Cpu className="text-emerald-400" size={28} />,
      spotlightColor: 'rgba(16, 185, 129, 0.15)',
      glowColor: 'from-emerald-500 to-teal-500',
      skills: ['Figma to Code', 'Responsive Design', 'Accessibility', 'Cross-browser Support'],
      className: 'md:col-span-1'
    }
  ];

  return (
    <SectionWrapper id="skills" className="py-32 relative z-10 overflow-hidden">
      {/* Cinematic Blueprint Atmosphere & Layer Overlap */}
      <div className="absolute -top-40 left-0 right-0 h-80 bg-gradient-to-b from-background via-purple-900/10 to-transparent pointer-events-none z-0" />
      
      <div className="absolute inset-0 pointer-events-none z-0 opacity-10 mix-blend-overlay"
           style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
      
      {/* Massive Background Typography */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none ${theme === 'dark' ? 'opacity-[0.02]' : 'opacity-[0.05]'} flex justify-center z-0 mix-blend-overlay`}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-[12rem] md:text-[22rem] font-black whitespace-nowrap tracking-tighter"
        >
          ARCHITECTURE
        </motion.div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10">
        
        {/* Animated Background Mesh specifically for this section */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center items-center opacity-30 z-0">
          <div className="w-[800px] h-[800px] bg-gradient-to-tr from-purple-500/10 via-transparent to-blue-500/10 rounded-full blur-[100px]" />
        </div>

        <div className="mb-20 relative z-10 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-purple-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-4"
            >
              <span className="w-12 h-[1px] bg-purple-500/50" />
              Engineering Arsenal
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.9]"
            >
              System <br/>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme === 'dark' ? 'from-white/30 to-white' : 'from-slate-400 to-slate-900'}`}>Architecture.</span>
            </motion.h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="hidden lg:flex items-center gap-4 text-xs font-black uppercase tracking-widest text-slate-500"
          >
            <div className="flex gap-1.5">
              <span className="w-1 h-4 bg-purple-500/50 rounded-full animate-pulse" />
              <span className="w-1 h-4 bg-blue-500/50 rounded-full animate-pulse delay-75" />
              <span className="w-1 h-4 bg-pink-500/50 rounded-full animate-pulse delay-150" />
            </div>
            Active Modules
          </motion.div>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.15 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10"
        >
          {skillCategories.map((category, idx) => (
            <SkillCard key={idx} category={category} className={category.className} />
          ))}
        </motion.div>
      </div>
    </SectionWrapper>
  );
};
