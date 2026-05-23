import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { SectionWrapper } from '../ui/SectionWrapper';
import { ArrowUpRight, Activity, Users, Globe2, ShieldCheck, Zap, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useTilt } from '../../hooks/useTilt';
import { ease } from '../../lib/motion';
import { useTheme } from '../../context/ThemeContext';

import img79Score from '../../assets/79score.png';
import imgPtePromocode from '../../assets/pte-promocode.png';
import imgDetPractice from '../../assets/det-practice.png';
import imgGurully from '../../assets/gurully.png';
import imgFitPulse from '../../assets/fit-pulse.png';

const CinematicProjectCard = ({ project, idx }: { project: any, idx: number }) => {
  const { theme } = useTheme();
  const isEven = idx % 2 === 0;
  const ref = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const yImage = useTransform(smoothProgress, [0, 1], ["-10%", "10%"]);
  
  const scaleImage = useTransform(smoothProgress, [0, 0.5, 1], [0.95, 1, 1.05]);
  const tilt = useTilt({ max: 3, perspective: 2000, scale: 1.02 });

  return (
    <motion.div 
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 1, ease: ease.luxury }}
      className={`flex flex-col lg:flex-row ${isEven ? '' : 'lg:flex-row-reverse'} gap-12 lg:gap-16 items-stretch mb-40 relative group w-full`}
    >
      {/* Dynamic Background Glow */}
      <div 
        className={`absolute top-1/2 ${isEven ? 'left-1/4' : 'right-1/4'} -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[150px] opacity-0 group-hover:opacity-20 transition-opacity duration-1000 pointer-events-none -z-10`}
        style={{ backgroundColor: project.iconBg }}
      />

      {/* Large modern preview image portal */}
      <div className="w-full lg:w-[50%] relative z-10 flex flex-col justify-center">
        <motion.div
          onMouseMove={tilt.onMouseMove}
          onMouseLeave={tilt.onMouseLeave}
          style={tilt.style}
          onClick={() => project.link !== '#' && window.open(project.link, '_blank')}
          className={`relative h-[280px] sm:h-[420px] lg:h-[550px] w-full rounded-[2.5rem] overflow-hidden glass-card border ${theme === 'dark' ? 'border-white/10 group-hover:border-purple-500/30 shadow-[0_0_80px_rgba(0,0,0,0.6)]' : 'border-black/10 group-hover:border-purple-500/20 shadow-[0_0_50px_rgba(0,0,0,0.05)]'} transition-colors duration-700 cursor-pointer group/img`}
        >
          <motion.div 
            style={{ y: yImage, scale: scaleImage, backgroundImage: `url(${project.image})` }}
            className="absolute -inset-[15%] bg-cover bg-top will-change-transform transition-transform duration-700 group-hover/img:scale-105"
          />
          <div className="absolute inset-0 bg-background/20 group-hover:bg-background/5 transition-colors duration-700 mix-blend-overlay" />
          {/* Subtle cinematic gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-90" />
          
          <div className={`absolute bottom-8 right-8 w-16 h-16 rounded-full ${theme === 'dark' ? 'bg-black/60 border-white/20 hover:bg-purple-600 hover:border-purple-400' : 'bg-white/80 border-black/10 hover:bg-purple-600 hover:text-white'} backdrop-blur-xl flex items-center justify-center text-foreground hover:text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-2xl`}>
            <ArrowUpRight size={24} />
          </div>
        </motion.div>
      </div>

      {/* Project Narrative & Detailed Case Study Section */}
      <div className="w-full lg:w-[50%] flex flex-col justify-between relative z-10 py-4">
        <div>
          {/* Header Fold */}
          <div className="flex items-center gap-4 mb-5">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-xs shadow-[0_0_20px_rgba(255,255,255,0.1)] border ${theme === 'dark' ? 'border-white/20' : 'border-black/10'}`}
              style={{ background: project.iconBg }}
            >
              {project.iconLabel}
            </div>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-purple-400">{project.metrics}</span>
          </div>

          <h3 className={`text-3xl md:text-5xl font-black text-foreground mb-6 tracking-tighter leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r ${theme === 'dark' ? 'group-hover:from-white group-hover:to-purple-400' : 'group-hover:from-slate-900 group-hover:to-purple-600'} transition-all duration-500`}>
            {project.title}
          </h3>
          
          <p className={`text-base ${theme === 'dark' ? 'text-slate-300' : 'text-slate-600'} leading-relaxed font-medium mb-8`}>
            {project.description}
          </p>

          {/* Problem & Solution Comparative Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-white/[0.01] border-white/5' : 'bg-slate-50 border-slate-100'} backdrop-blur-sm shadow-xl`}>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-red-400 mb-2 flex items-center gap-2">
                <AlertCircle size={12} />
                THE PROBLEM
              </h4>
              <p className={`text-xs font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                {project.problem}
              </p>
            </div>
            <div className={`p-5 rounded-2xl border ${theme === 'dark' ? 'bg-white/[0.01] border-white/5' : 'bg-slate-50 border-slate-100'} backdrop-blur-sm shadow-xl`}>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-emerald-400 mb-2 flex items-center gap-2">
                <CheckCircle2 size={12} />
                THE SOLUTION
              </h4>
              <p className={`text-xs font-medium leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}`}>
                {project.solution}
              </p>
            </div>
          </div>

          {/* Detailed Impact Metrics Grid */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {project.impact.map((metric: any, mIdx: number) => (
              <div 
                key={mIdx} 
                className={`flex items-center gap-2 md:gap-3 p-2.5 md:p-3.5 rounded-xl border ${theme === 'dark' ? 'bg-white/[0.01] border-white/5 hover:bg-white/[0.03]' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'} transition-all duration-300 shadow-md group/metric`}
              >
                <div className={`p-2 rounded-lg ${theme === 'dark' ? 'bg-white/5 text-purple-400' : 'bg-black/5 text-purple-600'} group-hover/metric:scale-110 transition-transform`}>
                  {metric.icon}
                </div>
                <div>
                  <div className="text-sm font-black text-foreground">{metric.value}</div>
                  <div className={`text-[8px] font-black uppercase tracking-widest ${theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}`}>{metric.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Fold: Badges + Action */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-4 border-t border-foreground/5">
          <div className="flex flex-wrap gap-1.5">
            {project.tech.map((tech: string, tIdx: number) => (
              <span
                key={tIdx}
                className={`px-2.5 py-1 text-[8px] font-black uppercase tracking-wider rounded-lg border ${theme === 'dark' ? 'border-white/5 bg-white/[0.02] text-slate-300' : 'border-slate-200 bg-slate-100 text-slate-600'} backdrop-blur-md`}
              >
                {tech}
              </span>
            ))}
          </div>

          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`group/btn inline-flex items-center justify-center px-6 py-3 rounded-xl ${theme === 'dark' ? 'bg-white text-black hover:bg-purple-600 hover:text-white' : 'bg-slate-900 text-white hover:bg-purple-600'} font-black text-[9px] uppercase tracking-[0.2em] transition-all duration-300 hover:scale-[1.03] shadow-lg`}
          >
            Explore Platform
            <ArrowUpRight size={14} className="ml-1.5 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const { theme } = useTheme();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const y1 = useTransform(smoothProgress, [0, 1], [0, -100]);

  const projects = [
    {
      title: '79 Score Platform',
      description: 'Built a modern Next.js-powered PTE learning and mock-test platform with secure checkout workflows, responsive dashboard systems, AI-assisted scoring experiences, and scalable frontend architecture.',
      tech: ['Next.js', 'React.js', 'REST APIs', 'Payment Gateway', 'Dashboard UI', 'Responsive Design', 'Performance Optimization'],
      problem: 'The legacy workflow suffered from slow dashboard rendering, inconsistent checkout experiences, and poor responsiveness during practice-test and analytics interactions across devices.',
      solution: 'Engineered a scalable Next.js frontend architecture using reusable React components, optimized rendering patterns, secure payment workflows, responsive dashboard systems, and API-driven learning experiences.',
      metrics: '90+ Lighthouse Performance',
      impact: [
        { label: 'PERFORMANCE', value: '90+', icon: <Zap size={16} /> },
        { label: 'CHECKOUT UX', value: 'Optimized', icon: <Globe2 size={16} /> },
        { label: 'DUPLICATION', value: 'Reduced', icon: <Activity size={16} /> },
        { label: 'WORKFLOW', value: 'Secured', icon: <ShieldCheck size={16} /> }
      ],
      image: img79Score,
      link: 'https://www.79score.com/',
      iconLabel: '79',
      iconBg: '#f97316'
    },
    {
      title: 'FitPulse Ecosystem',
      description: 'Developed a modern fitness ecosystem platform with Firebase-powered authentication, responsive dashboard systems, analytics tracking, and scalable frontend architecture.',
      tech: ['React.js', 'Firebase', 'Authentication', 'Dashboard UI', 'Charts', 'Responsive Design'],
      problem: 'Rendering analytics-heavy fitness dashboards caused performance bottlenecks and poor responsiveness across mobile devices.',
      solution: 'Implemented optimized React rendering patterns, reusable UI architecture, responsive chart systems, and Firebase-based authentication workflows to improve scalability and frontend performance.',
      metrics: 'Mobile Optimized UX',
      impact: [
        { label: 'Dashboard Render', value: 'Smooth', icon: <Zap size={16} /> },
        { label: 'Engagement', value: 'Improved', icon: <Users size={16} /> },
        { label: 'Mobile Response', value: 'Optimized', icon: <Globe2 size={16} /> },
        { label: 'Architecture', value: 'Scalable', icon: <Activity size={16} /> }
      ],
      image: imgFitPulse,
      link: 'https://fit-pulse-theta.vercel.app/',  
      iconLabel: 'FP',
      iconBg: '#6366f1'
    },
    {
      title: 'DET Testing Portal',
      description: 'Built a modern Next.js-powered assessment platform for Duolingo English Test preparation with responsive mock-test workflows, optimized frontend performance, and scalable React component architecture.',
      tech: ['Next.js', 'React.js', 'REST APIs', 'Assessment System', 'Responsive UI', 'Performance Optimization'],
      problem: 'Students experienced inconsistent assessment workflows, delayed interactions, and layout responsiveness issues during mock test sessions across mobile and desktop devices.',
      solution: 'Engineered a scalable Next.js frontend architecture using reusable React components, optimized rendering patterns, responsive layouts, and API-driven workflows to ensure smooth exam-like experiences.',
      metrics: 'Sub-100ms Input Latency',
      impact: [
        { label: 'INPUT LATENCY', value: '<100ms', icon: <Zap size={16} /> },
        { label: 'ACCESSIBILITY', value: 'Mobile-First', icon: <Globe2 size={16} /> },
        { label: 'EXPERIENCE', value: 'Seamless', icon: <Activity size={16} /> },
        { label: 'API SYNC', value: 'Optimized', icon: <ShieldCheck size={16} /> }
      ],
      image: imgDetPractice,
      link: 'https://www.detpracticetest.com/',
      iconLabel: 'det',
      iconBg: '#22c55e'
    },
    {
      title: 'Gurully Mock Engine',
      description: 'Developed a responsive mock-test and student workflow platform for English proficiency exam preparation with optimized dashboard interfaces, scalable UI systems, and performance-focused frontend workflows.',
      tech: ['HTML5', 'CSS3', 'JavaScript', 'Dashboard UI', 'Responsive Design', 'Data Visualization'],
      problem: 'The platform faced bloated layouts, repeated UI structures, and inconsistent rendering performance while handling multi-category student dashboards and mock-test workflows.',
      solution: 'Built optimized frontend interfaces using HTML, CSS, and JavaScript with modular UI sections, reusable layout patterns, responsive dashboard systems, and streamlined student interaction workflows.',
      metrics: '40% Code Reduction',
      impact: [
        { label: 'CODEBASE SIZE', value: '-40%', icon: <Zap size={16} /> },
        { label: 'ACTIVE USERS', value: '10K+', icon: <Users size={16} /> },
        { label: 'ARCHITECTURE', value: 'Clean', icon: <Activity size={16} /> },
        { label: 'PERFORMANCE', value: 'Optimized', icon: <Globe2 size={16} /> }
      ],
      image: imgGurully,
      link: 'https://www.gurully.com/',
      iconLabel: 'Gu',
      iconBg: '#06b6d4'
    },
    {
      title: 'Global Promo Manager',
      description: 'Created a modern promotion management interface for handling campaigns, offers, and product visibility workflows.',
      tech: ['React.js', 'Admin Dashboard', 'Promotion Management', 'Responsive UI'],
      problem: 'Admin personnel struggled with a slow legacy interface that lacked validation, leading to catalog visibility issues.',
      solution: 'Developed a highly intuitive promotion management panel with state synchronization, instant validation indicators, and scalable filters.',
      metrics: '99.9% Validation Accuracy',
      impact: [
        { label: 'Validation Acc.', value: '99.9%', icon: <ShieldCheck size={16} /> },
        { label: 'UI Consistency', value: 'Perfect', icon: <Activity size={16} /> },
        { label: 'Workflow Eff.', value: 'Optimized', icon: <Zap size={16} /> },
        { label: 'Dashboard UX', value: 'Refined', icon: <Globe2 size={16} /> }
      ],
      image: imgPtePromocode,
      link: 'https://www.ptepromocode.com/',
      iconLabel: 'P₹',
      iconBg: '#eab308'
    }
  ];

  return (
    <SectionWrapper id="projects" className="py-24 relative z-10 overflow-hidden">
      {/* Cinematic Fog Overlay */}
      <div className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] ${theme === 'dark' ? 'from-purple-900/10' : 'from-purple-100/30'} via-background to-background pointer-events-none -z-10`} />

      <div className="container mx-auto px-6 lg:px-12 max-w-[1400px]" ref={containerRef}>
        <div className="mb-24 flex flex-col md:flex-row justify-between items-end gap-10">
          <div className="max-w-4xl relative z-10">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: theme === 'dark' ? 0.02 : 0.05 }}
              viewport={{ once: true }}
              className="absolute -top-20 -left-10 text-[10rem] font-black tracking-tighter text-foreground pointer-events-none"
            >
              CASE STUDIES
            </motion.div>
 
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-purple-400 text-[10px] font-black uppercase tracking-[0.4em] mb-6 flex items-center gap-4 relative z-10"
            >
              <span className="w-12 h-[1px] bg-purple-500/50" />
              Selected Masterpieces
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-6xl md:text-8xl lg:text-[110px] font-black tracking-tighter leading-[0.85] relative z-10"
            >
              Cinematic Product <br/>
              <span className={`text-transparent bg-clip-text bg-gradient-to-r ${theme === 'dark' ? 'from-white/30 to-white' : 'from-slate-400 to-slate-900'}`}>Showcase.</span>
            </motion.h2>
          </div>
          
          <motion.div 
            style={{ y: y1 }}
            className="hidden lg:block text-right relative z-10"
          >
            <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-500 mb-2">Scroll to explore</p>
            <div className={`w-[1px] h-32 bg-gradient-to-b ${theme === 'dark' ? 'from-white/20' : 'from-black/20'} to-transparent ml-auto`} />
          </motion.div>
        </div>

        {/* Dynamic Project Layout */}
        <div className="flex flex-col mt-20 relative z-10">
          {projects.map((project, idx) => (
            <CinematicProjectCard key={idx} project={project} idx={idx} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};
