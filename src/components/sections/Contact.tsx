import React, { useState, useRef } from 'react';
import { SectionWrapper } from '../ui/SectionWrapper';
import { Mail, Send, CheckCircle2, MessageSquare, FileText } from 'lucide-react';
import { Github, Linkedin } from '../ui/Icons';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { MagneticButton } from '../ui/MagneticButton';
import { ease, fadeUp } from '../../lib/motion';
import { useTheme } from '../../context/ThemeContext';

const InputField = ({ label, id, name, type = "text", value, onChange, isTextArea = false }: any) => {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative mb-12 group">
      <motion.label 
        htmlFor={id}
        initial={false}
        animate={{
          y: isFocused || value ? -36 : 0,
          scale: isFocused || value ? 0.8 : 1,
          color: isFocused ? "#a855f7" : "#64748b",
        }}
        className="absolute left-6 top-5 text-[11px] font-black uppercase tracking-[0.2em] pointer-events-none z-20 origin-left"
      >
        {label}
      </motion.label>
      
      {/* Dynamic Halo */}
      <div 
        className={`absolute -inset-2 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-700 pointer-events-none ${isFocused ? 'opacity-20 group-hover:opacity-30' : ''}`}
      />

      <div className={`relative rounded-[1.5rem] border transition-all duration-500 bg-background/80 backdrop-blur-xl overflow-hidden ${isFocused ? 'border-purple-500 shadow-[0_0_30px_rgba(168,85,247,0.15)] scale-[1.01]' : `${theme === 'dark' ? 'border-white/10 group-hover:border-white/20' : 'border-black/10 group-hover:border-black/20'} shadow-2xl`}`}>
        
        {/* Inner Glare */}
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-gradient-to-b from-white/[0.04] to-transparent' : 'bg-gradient-to-b from-black/[0.02] to-transparent'} pointer-events-none`} />

        {isTextArea ? (
          <textarea
            id={id}
            name={name || id}
            required
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            rows={4}
            className="w-full px-6 pt-10 pb-4 bg-transparent outline-none text-foreground font-medium resize-none text-base relative z-10"
          />
        ) : (
          <input
            type={type}
            id={id}
            name={name || id}
            required
            value={value}
            onChange={onChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full px-6 pt-10 pb-4 bg-transparent outline-none text-foreground font-medium text-base h-20 relative z-10"
          />
        )}
        
        {/* Scanning Line on Focus */}
        <motion.div 
          initial={{ x: '-100%' }}
          animate={{ x: isFocused ? '100%' : '-100%' }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-purple-500/50 to-transparent pointer-events-none shadow-[0_0_10px_#a855f7]"
        />
      </div>
    </div>
  );
};

export const Contact = () => {
  const { theme } = useTheme();
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  const yHeader = useTransform(smoothProgress, [0, 1], [0, 150]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsError(false);

    const formDataObj = new FormData(e.currentTarget);
    formDataObj.append('access_key', '6134af28-77d8-405e-8697-a0faf8d34f6b');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formDataObj,
      });
      const data = await response.json();

      if (data.success) {
        setIsSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setIsSuccess(false), 6000);
      } else {
        setIsError(true);
        setTimeout(() => setIsError(false), 5000);
      }
    } catch {
      setIsError(true);
      setTimeout(() => setIsError(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SectionWrapper id="contact" className="py-32 relative z-10 overflow-hidden">
      {/* Massive Background Glow & Emotion */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background pointer-events-none z-0" />
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[800px] bg-gradient-to-b ${theme === 'dark' ? 'from-purple-900/10 via-pink-900/5' : 'from-purple-100/30 via-pink-100/20'} to-transparent blur-[120px] pointer-events-none rounded-full z-0`} />

      <div className="container mx-auto px-6 lg:px-12 max-w-7xl relative z-10" ref={containerRef}>
        
        {/* Massive Statement (The "Big Statement") */}
        <div className="mb-24 relative z-10 text-center flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: ease.luxury }}
            className={`w-24 h-24 rounded-full ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} flex items-center justify-center mb-10 shadow-[0_0_50px_rgba(255,255,255,0.05)] backdrop-blur-xl`}
          >
            <MessageSquare size={32} className="text-foreground" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl lg:text-[100px] font-black tracking-tighter leading-[0.9] text-foreground"
          >
            Let's Build Something <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 animate-pulse">Exceptional.</span>
          </motion.h2>
        </div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-20 items-start relative z-10 mt-20">
          
          <div className="lg:col-span-5 space-y-12 lg:space-y-20">
            <motion.p 
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-lg lg:text-xl text-slate-400 max-w-md leading-relaxed font-medium"
            >
              Available for frontend development, React.js projects, eCommerce platforms, and modern web applications.
            </motion.p>
            
            <div className="space-y-8">
              {[
                { icon: <Mail size={24} />, label: 'Secure Email', value: 'skn21264@gmail.com', href: 'mailto:skn21264@gmail.com' },
                { icon: <Linkedin size={24} />, label: 'LinkedIn', value: 'Surinder Kumar', href: 'https://www.linkedin.com/in/surinder-kumar-0835741b4/' },
                { icon: <Github size={24} />, label: 'GitHub', value: 'surindernokhwal', href: 'https://github.com/surindernokhwal' },
                { icon: <FileText size={24} />, label: 'Resume', value: 'Download Resume', href: '/Surinder_Kumar_Resume.docx', download: true }
              ].map((item, idx) => (
                <motion.div 
                  key={idx} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.8, ease: ease.luxury }}
                  className="flex items-center group relative w-full overflow-hidden"
                >
                  <div className="absolute -left-6 w-1 h-0 bg-gradient-to-b from-purple-500 to-pink-500 group-hover:h-full transition-all duration-500 rounded-full shadow-[0_0_10px_#a855f7]" />
                  
                  <div className={`h-14 w-14 sm:h-20 sm:w-20 rounded-[1.25rem] sm:rounded-[1.5rem] ${theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-black/[0.02] border-black/5'} flex items-center justify-center mr-4 sm:mr-8 text-slate-500 group-hover:text-foreground group-hover:border-purple-500/50 group-hover:bg-purple-500/10 transition-all duration-500 shadow-2xl group-hover:scale-110 group-hover:rotate-3 flex-shrink-0`}>
                    {item.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[10px] text-slate-600 font-black uppercase tracking-[0.4em] mb-2">{item.label}</p>
                    {item.href ? (
                      <a href={item.href} download={item.download ? "Surinder_Kumar_Resume.docx" : undefined} target={item.href.startsWith('http') ? "_blank" : undefined} rel={item.href.startsWith('http') ? "noopener noreferrer" : undefined} className="text-base sm:text-2xl font-black text-foreground hover:text-purple-400 transition-colors break-all sm:break-normal block">{item.value}</a>
                    ) : (
                      <p className="text-base sm:text-2xl font-black text-foreground break-all sm:break-normal block">{item.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: ease.luxury }}
            className="lg:col-span-7 relative"
          >
            {/* Ambient Background Gradient for Form */}
            <div className={`absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-bl ${theme === 'dark' ? 'from-purple-600/20 to-blue-600/20' : 'from-purple-100/30 to-blue-100/30'} blur-[120px] rounded-full pointer-events-none -z-10`} />

            <div className={`glass-card p-8 md:p-14 relative overflow-hidden rounded-[3rem] border ${theme === 'dark' ? 'border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)]' : 'border-black/10 shadow-[0_0_50px_rgba(0,0,0,0.1)]'} bg-background/50 backdrop-blur-3xl`}>
              <AnimatePresence mode="wait">
                {isSuccess ? (
                  <motion.div 
                    key="success"
                    initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: ease.luxury }}
                    className="h-[500px] flex flex-col items-center justify-center text-center space-y-8"
                  >
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.2 }}
                      className="h-40 w-40 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 mb-4 shadow-[0_0_100px_rgba(34,197,94,0.3)] relative"
                    >
                      <div className="absolute inset-0 rounded-full border-t-2 border-green-400 animate-spin" style={{ animationDuration: '3s' }} />
                      <CheckCircle2 size={64} />
                    </motion.div>
                    <div>
                      <h3 className="text-4xl md:text-5xl font-black text-foreground mb-6 tracking-tight">Transmission Successful</h3>
                      <p className="text-slate-400 max-w-sm mx-auto font-medium leading-relaxed text-lg">Data packet secured. I will analyze the coordinates and initiate contact shortly.</p>
                    </div>
                    <MagneticButton strength={20}>
                      <button 
                        onClick={() => setIsSuccess(false)}
                        className={`px-10 py-4 rounded-full border ${theme === 'dark' ? 'border-white/10 hover:bg-white/5' : 'border-black/10 hover:bg-black/5'} text-foreground text-[10px] font-black uppercase tracking-[0.2em] transition-colors mt-8`}
                      >
                        New Transmission
                      </button>
                    </MagneticButton>
                  </motion.div>
                ) : (
                  <motion.form 
                    key="form"
                    onSubmit={handleSubmit} 
                    initial={{ opacity: 0, filter: 'blur(10px)' }}
                    animate={{ opacity: 1, filter: 'blur(0px)' }}
                    exit={{ opacity: 0, filter: 'blur(10px)' }}
                    transition={{ duration: 0.8, ease: ease.luxury }}
                    className="relative z-10"
                  >
                    {/* Web3Forms hidden fields */}
                    <input type="hidden" name="subject" value="New Portfolio Contact — Surinder Kumar" />
                    <input type="hidden" name="from_name" value="Portfolio Contact Form" />
                    <input type="hidden" name="botcheck" value="" style={{ display: 'none' }} />

                    <InputField 
                      label="Identification (Name)" 
                      id="name" 
                      value={formData.name} 
                      onChange={(e: any) => setFormData({...formData, name: e.target.value})} 
                    />
                    <InputField 
                      label="Comm Channel (Email)" 
                      id="email" 
                      type="email" 
                      value={formData.email} 
                      onChange={(e: any) => setFormData({...formData, email: e.target.value})} 
                    />
                    <InputField 
                      label="Encrypted Payload (Message)" 
                      id="message" 
                      isTextArea={true} 
                      value={formData.message} 
                      onChange={(e: any) => setFormData({...formData, message: e.target.value})} 
                    />

                    {/* Error State Banner */}
                    <AnimatePresence>
                      {isError && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className="mb-6 px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-black uppercase tracking-widest text-center"
                        >
                          ⚠️ Transmission Failed — Please retry.
                        </motion.div>
                      )}
                    </AnimatePresence>
                    
                    <MagneticButton strength={40} className="w-full mt-6">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`group relative w-full flex items-center justify-center px-10 py-8 ${
                          isError
                            ? 'bg-red-500 text-white'
                            : theme === 'dark' ? 'bg-white text-black' : 'bg-slate-900 text-white'
                        } font-black text-xs uppercase tracking-[0.3em] rounded-[1.5rem] transition-all duration-500 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden hover:scale-[1.02] shadow-[0_0_40px_rgba(255,255,255,0.1)]`}
                      >
                        <span className="relative z-10 flex items-center">
                          {isSubmitting ? 'Transmitting Data...' : isError ? 'Retry Transmission' : (
                            <>
                              Deploy Payload
                              <Send size={18} className="ml-4 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                            </>
                          )}
                        </span>
                        {/* Hover fill effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-white/20' : 'bg-black/20'} translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-0`} />
                      </button>
                    </MagneticButton>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
          
        </div>
      </div>
    </SectionWrapper>
  );
};
