import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import Particles from './components/Particles';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Preloader from './components/Preloader';

// Lazy loaded heavy components
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const ConsoleSandbox = lazy(() => import('./components/ConsoleSandbox'));
const Contact = lazy(() => import('./components/Contact'));

// Lazy load non-default backgrounds
const FlickeringCanvas = lazy(() => import('./components/FlickeringCanvas'));
const GlyphMatrix = lazy(() => import('./components/GlyphMatrix'));

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showLoader, setShowLoader] = useState(true);
  const [bgType, setBgType] = useState('particles'); // Default to particles

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -45% 0px', // larger, balanced active zone for mobile viewports
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            console.log("Intersecting active section:", id);
            setActiveSection(id);
          }
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  return (
    <div className="relative min-h-screen text-gray-100 font-sans overflow-x-hidden selection:bg-emerald-500/30 selection:text-white">
      {/* Boot Preloader Screen */}
      {showLoader && <Preloader onComplete={() => setShowLoader(false)} />}

      {/* Custom Trailing Cursor & Ambient Glow */}
      <CustomCursor bgType={bgType} />

      {/* Background Effect */}
      {bgType === 'particles' && (
        <Particles
          className="fixed inset-0 z-0 h-full w-full opacity-70"
          quantity={800}
          ease={80}
          color="#ffffff"
          refresh
        />
      )}
      {bgType === 'glyph' && (
        <Suspense fallback={null}>
          <GlyphMatrix
            className="fixed inset-0 z-0 h-full w-full opacity-30"
            glyphs="01·•+*/\<>="
            cellSize={14}
            mutationRate={0.04}
            interval={90}
            fadeBottom={0.6}
            color="#ffffff"
          />
        </Suspense>
      )}
      {bgType === 'flicker' && (
        <Suspense fallback={null}>
          <FlickeringCanvas />
        </Suspense>
      )}

      {/* Navigation Header */}
      <Navbar activeSection={activeSection} bgType={bgType} setBgType={setBgType} />

      {/* Content Layout wrapper */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <Hero />
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-emerald-500 font-mono text-sm animate-pulse">LOADING MODULES...</div>}>
          <Experience />
          <Projects />
          <Skills />
          <ConsoleSandbox />
          <Contact />
        </Suspense>
      </main>
    </div>
  );
}
