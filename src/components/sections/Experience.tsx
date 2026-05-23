import React, { useRef } from 'react';
import { SectionWrapper } from '../ui/SectionWrapper';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useTilt } from '../../hooks/useTilt';
import { useTheme } from '../../context/ThemeContext';

const ExperienceCard = ({ exp, idx }: { exp: any, idx: number }) => {
  const { theme } = useTheme();
  const tilt = useTilt({ max: 5, perspective: 1500, scale: 1.02 });
  
  return (
    <div className={`relative flex flex-col md:flex-row items-start md:items-center justify-between w-full ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} group/timeline`}>
      {/* Timeline Node */}
      <div className={`absolute left-0 -translate-x-1/2 md:left-1/2 md:-translate-x-1/2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-background border-4 ${theme === 'dark' ? 'border-white/10' : 'border-black/10'} z-20 flex items-center justify-center shadow-[0_0_30px_rgba(168,85,247,0.15)] group-hover/timeline:border-purple-500/50 transition-colors duration-500`}>
         <motion.div 
           initial={{ scale: 0 }}
           whileInView={{ scale: 1 }}
           viewport={{ once: false, margin: "-100px" }}
           className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] animate-pulse" 
         />
      </div>

      {/* Content Card */}
      <div className={`w-[calc(100%-3rem)] ml-12 md:w-[45%] md:ml-0 relative z-10`}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: idx * 0.1 }}
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          style={tilt.style}
          className={`glass-card p-10 relative group border ${theme === 'dark' ? 'border-white/10 hover:border-white/20' : 'border-black/10 hover:border-black/20'} transition-all duration-500 rounded-[2rem] shadow-2xl`}
        >
          {/* Card Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 group-hover:from-purple-500/5 group-hover:to-blue-500/5 transition-colors duration-500 rounded-[2rem] pointer-events-none" />

          <div className="mb-8 relative z-10">
            <span className={`inline-block px-4 py-2 ${theme === 'dark' ? 'bg-purple-500/10 border-purple-500/20 text-purple-300' : 'bg-purple-500/5 border-purple-500/10 text-purple-600'} rounded-full text-[10px] font-black tracking-widest uppercase mb-6 shadow-xl backdrop-blur-md`}>
              {exp.duration}
            </span>
            <h3 className="text-3xl font-black text-foreground mb-2 tracking-tight leading-tight">{exp.role}</h3>
            <p className={`text-xl font-black text-transparent bg-clip-text bg-gradient-to-r ${exp.color}`}>{exp.company}</p>
          </div>
          
          <div className="relative z-10">
            <ul className="space-y-4">
              {exp.achievements.map((item: string, i: number) => (
                <li key={i} className="flex items-start group/item">
                  <span className={`h-1.5 w-1.5 rounded-full bg-gradient-to-r ${exp.color} mr-4 mt-2.5 flex-shrink-0 group-hover/item:scale-150 group-hover/item:shadow-[0_0_10px_white] transition-all`} />
                  <span className="text-slate-400 text-sm md:text-base leading-relaxed group-hover:text-foreground transition-colors font-medium">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Hardware Corner Accent */}
          <div className={`absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-r from-transparent to-${theme === 'dark' ? 'white/20' : 'black/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
          <div className={`absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-transparent to-${theme === 'dark' ? 'white/20' : 'black/10'} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
        </motion.div>
      </div>

      {/* Empty space for alternating layout */}
      <div className="hidden md:block w-[45%]" />
    </div>
  );
};

export const Experience = () => {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const experiences = [
    {
      role: 'Senior Frontend Developer',
      company: 'Gurully Technologies LLP',
      duration: 'Aug 2023 – Present',
      color: 'from-purple-400 to-pink-500',
      achievements: [
        'Developed and optimized high-performance B2B & B2C learning platforms utilizing React.js, Next.js, and TypeScript.',
        'Boosted overall platform rendering and load time performance by 20–30% through assets compression and dynamic code splitting.',
        'Built and documented a highly reusable React component system, enhancing layout consistency and reducing feature time-to-market.',
        'Integrated complex third-party REST APIs and secure payment gateway integrations for seamless voucher transaction flows.'
      ]
    },
    {
      role: 'Frontend Developer',
      company: 'Cue Blocks Tech Pvt. Ltd.',
      duration: 'Oct 2022 – Jul 2023',
      color: 'from-blue-400 to-indigo-500',
      achievements: [
        'Built and optimized fully responsive business websites using WordPress, Elementor, and custom templates.',
        'Customized and maintained Shopify e-commerce stores, custom sections, and custom themes using Liquid and JavaScript.',
        'Designed and developed high-converting landing pages focused on optimal mobile responsiveness and UX.',
        'Managed WooCommerce online stores, adding custom product selectors, filtering mechanisms, and cart UX improvements.'
      ]
    },
    {
      role: 'Frontend Developer',
      company: 'Vrinsoft Technology Pvt. Ltd.',
      duration: 'Jun 2021 – Sep 2022',
      color: 'from-purple-500 to-indigo-600',
      achievements: [
        'Engineered responsive web applications and interfaces, converting complex Figma layouts to pixel-perfect frontend code.',
        'Worked on complex e-commerce user interfaces with smooth state management, custom layouts, and interactive animations.',
        'Identified and resolved rendering performance bottlenecks to achieve better Lighthouse scores across target web pages.',
        'Ensured cross-browser compatibility and optimized mobile web performance across diverse client projects.'
      ]
    }
  ];

  return (
    <SectionWrapper id="experience" className="relative z-10 py-32 overflow-hidden bg-background">
      {/* Deep Space Minimalism Atmosphere */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] ${theme === 'dark' ? 'from-purple-900/5' : 'from-purple-100/20'} via-background to-background pointer-events-none -z-10`} />
      
      {/* Layer Overlap from previous section */}
      <div className={`absolute -top-40 left-0 right-0 h-80 bg-gradient-to-b from-transparent via-${theme === 'dark' ? 'purple-900/10' : 'purple-100/20'} to-background pointer-events-none z-0`} />

      {/* Massive Background Typography */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full overflow-hidden pointer-events-none ${theme === 'dark' ? 'opacity-[0.02]' : 'opacity-[0.05]'} flex justify-center z-0 mix-blend-overlay`}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="text-[12rem] md:text-[22rem] font-black whitespace-nowrap tracking-tighter"
        >
          JOURNEY
        </motion.div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 max-w-6xl relative z-10">
        <div className="mb-20 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-purple-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-4"
          >
            <span className="w-12 h-[1px] bg-purple-500/50" />
            Engineering Journey
            <span className="w-12 h-[1px] bg-purple-500/50" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.85]"
          >
            Experience <br/>
            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme === 'dark' ? 'from-white/30 to-white' : 'from-slate-400 to-slate-900'}`}>Timeline.</span>
          </motion.h2>
        </div>

        <div ref={containerRef} className="relative ml-6 md:ml-0 mt-16">
          {/* Glowing Energy Beam Background */}
          <div className={`absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
            <div className="absolute inset-0 bg-gradient-to-b from-purple-500/50 via-pink-500/50 to-blue-500/50 blur-[20px] pointer-events-none animate-pulse" />
            <motion.div 
              style={{ scaleY, originY: 0, willChange: 'transform' }}
              className="absolute inset-0 bg-gradient-to-b from-purple-400 via-pink-400 to-blue-400 shadow-[0_0_40px_rgba(168,85,247,1)]"
            />
          </div>

          <div className="flex flex-col gap-6 md:gap-8">
            {experiences.map((exp, idx) => (
              <ExperienceCard key={idx} exp={exp} idx={idx} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
};
