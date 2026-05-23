import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Active section tracking
      const sections = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about', id: 'about' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  return (
    <motion.nav
      animate={{
        paddingTop: isScrolled ? '12px' : '32px',
        paddingBottom: isScrolled ? '12px' : '32px',
      }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-background/70 backdrop-blur-2xl border-b border-foreground/5 shadow-2xl'
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center max-w-7xl">
        <motion.a
          href="#"
          className="text-2xl font-black tracking-tighter origin-left flex items-center"
        >
          <span className="text-foreground">SURINDER</span>
          <span className="text-purple-500 ml-0.5">.</span>
        </motion.a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-12">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name} className="relative">
                <a
                  href={link.href}
                  className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                    activeSection === link.id ? 'text-foreground' : 'text-slate-500 hover:text-foreground'
                  }`}
                >
                  {link.name}
                </a>
                {activeSection === link.id && (
                  <motion.div 
                    layoutId="activeNav"
                    className="absolute -bottom-2 left-0 right-0 h-[1.5px] bg-purple-500"
                  />
                )}
              </li>
            ))}
          </ul>
          
          <div className="flex items-center space-x-4 border-l border-white/10 pl-8">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl bg-foreground/5 text-slate-500 hover:text-foreground transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <a
              href="/Surinder_Kumar_Resume.docx"
              download="Surinder_Kumar_Resume.docx"
              className="px-6 py-2.5 rounded-xl bg-purple-600 text-white font-black text-[10px] uppercase tracking-widest hover:bg-purple-500 transition-all duration-300 shadow-[0_10px_20px_-5px_rgba(139,92,246,0.4)]"
            >
              Resume
            </a>
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl bg-foreground/5 text-slate-400"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-foreground focus:outline-none"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-white/5 shadow-2xl md:hidden overflow-hidden"
          >
            <ul className="flex flex-col py-8 px-6 space-y-6">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`block text-xl font-black uppercase tracking-widest ${
                      activeSection === link.id ? 'text-purple-500' : 'text-slate-500'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="/Surinder_Kumar_Resume.docx"
                  download="Surinder_Kumar_Resume.docx"
                  className="block text-center px-6 py-4 rounded-xl bg-purple-600 text-white font-black uppercase tracking-widest"
                >
                  Download Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
