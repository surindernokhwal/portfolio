import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Skills } from './components/sections/Skills';
import { Experience } from './components/sections/Experience';
import { Projects } from './components/sections/Projects';
import { Contact } from './components/sections/Contact';
import { CustomCursor } from './components/ui/CustomCursor';
import { CursorTrail } from './components/ui/CursorTrail';
import { Background } from './components/ui/Background';
import { Preloader } from './components/ui/Preloader';
import { SmoothScroll } from './components/layout/SmoothScroll';

function App() {
  return (
    <ThemeProvider>
      <SmoothScroll>
        <div className="min-h-screen bg-background text-foreground font-sans relative selection:bg-purple-500/30 noise-overlay transition-colors duration-500">
          {/* Cinematic Preloader */}
          <Preloader />

          {/* World-Class Interactive Background */}
          <Background />

          {/* Premium Interactive Cursor Suite */}
          <CustomCursor />
          <CursorTrail />
          
          <div className="relative z-10">
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Contact />
            </main>
            <Footer />
          </div>
        </div>
      </SmoothScroll>
    </ThemeProvider>
  );
}

export default App;
