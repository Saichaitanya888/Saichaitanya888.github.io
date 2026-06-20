import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FlickeringCanvas from './components/FlickeringCanvas';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import ConsoleSandbox from './components/ConsoleSandbox';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

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
      {/* Custom Trailing Cursor & Ambient Glow */}
      <CustomCursor />

      {/* Background Flickering Sub-pixel Grid */}
      <FlickeringCanvas />

      {/* Navigation Header */}
      <Navbar activeSection={activeSection} />

      {/* Content Layout wrapper */}
      <main className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <ConsoleSandbox />
        <Contact />
      </main>
    </div>
  );
}
