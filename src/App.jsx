import { useState, useEffect, lazy, Suspense } from 'react';
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './components/Hero';
import Preloader from './components/Preloader';
import LetterGlitch from './components/LetterGlitch';

// Lazy loaded heavy components
const Experience = lazy(() => import('./components/Experience'));
const Projects = lazy(() => import('./components/Projects'));
const Skills = lazy(() => import('./components/Skills'));
const ConsoleSandbox = lazy(() => import('./components/ConsoleSandbox'));
const Contact = lazy(() => import('./components/Contact'));

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [showLoader, setShowLoader] = useState(true);

  const handleNavClick = (id) => {
    // Clear any existing timeouts/animations
    if (window.navScrollTimeout) clearTimeout(window.navScrollTimeout);
    if (window.scrollAnimation) cancelAnimationFrame(window.scrollAnimation);

    const targetElement = document.getElementById(id);
    if (targetElement) {
      // Calculate target position without offset (since there are no top-fixed elements anymore)
      const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY;
      const startPosition = window.scrollY;
      const distance = targetPosition - startPosition;
      const duration = 1000; // 1 second for premium bouncy scroll
      let start = null;

      // Disable CSS smooth scroll to prevent massive conflict with our JS animation
      document.documentElement.style.scrollBehavior = 'auto';

      // Responsive premium easeOut function (starts instantly, settles smoothly)
      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const step = (timestamp) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percent = Math.min(progress / duration, 1);

        window.scrollTo(0, startPosition + distance * easeOutCubic(percent));

        if (progress < duration) {
          window.scrollAnimation = window.requestAnimationFrame(step);
        } else {
          // Restore CSS scroll behavior when done
          document.documentElement.style.scrollBehavior = '';
        }
      };

      window.scrollAnimation = window.requestAnimationFrame(step);
    }
  };

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-15% 0px -45% 0px', // balanced active zone for mobile and desktop viewports
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          if (id) {
            setActiveSection(id);
          }
        }
      });
    }, observerOptions);

    const observedElements = new Set();
    const targetSectionsCount = 6; // hero, experience, projects, skills, console, contact
    let mutationObserver = null;

    const observeSections = () => {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach((section) => {
        if (!observedElements.has(section)) {
          observer.observe(section);
          observedElements.add(section);
        }
      });

      if (observedElements.size >= targetSectionsCount && mutationObserver) {
        mutationObserver.disconnect();
        mutationObserver = null;
      }
    };

    // Initial check
    observeSections();

    // Watch for DOM changes to catch lazy-loaded sections and disconnect once found
    if (observedElements.size < targetSectionsCount) {
      mutationObserver = new MutationObserver(() => {
        observeSections();
      });
      mutationObserver.observe(document.body, { childList: true, subtree: true });
    }

    return () => {
      observer.disconnect();
      if (mutationObserver) mutationObserver.disconnect();
    };
  }, []);

  return (
    <div className="relative min-h-screen text-gray-100 font-sans overflow-x-hidden selection:bg-emerald-500/30 selection:text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0 opacity-[0.30] pointer-events-none contain-strict">
        <LetterGlitch
          glitchSpeed={80}
          centerVignette={false}
          outerVignette={true}
        />
      </div>

      {/* Boot Preloader Screen */}
      {showLoader && <Preloader onComplete={() => setShowLoader(false)} />}

      {/* Custom Trailing Cursor & Ambient Glow */}
      <CustomCursor />

      {/* Navigation Header */}
      <Navbar activeSection={activeSection} onNavClick={handleNavClick} />

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
