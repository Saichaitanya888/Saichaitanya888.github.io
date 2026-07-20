import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { projects } from '../constants';

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [prevHovered, setPrevHovered] = useState(false);
  const [nextHovered, setNextHovered] = useState(false);

  // Touch Swipe & Drag State
  const [touchStart, setTouchStart] = useState(0);
  const [touchCurrent, setTouchCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [swipeDir, setSwipeDir] = useState(null); // 'left', 'right', or null

  const buttonGlow = 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.4))';

  // Data imported from constants

  // Down arrow / Swipe: Next project
  const handleNext = (dir = null) => {
    // If it's an event object, ignore it and pass null
    const direction = typeof dir === 'string' ? dir : null;
    setSwipeDir(direction);
    setActiveIndex(prev => (prev + 1) % projects.length);
  };

  // Up arrow: Previous project
  const handlePrev = () => {
    setSwipeDir(null);
    setActiveIndex(prev => (prev - 1 + projects.length) % projects.length);
  };

  // Touch Drag & Swipe Handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchCurrent(e.targetTouches[0].clientX);
    setIsDragging(true);
    setSwipeDir(null);
  };

  const handleTouchMove = (e) => {
    setTouchCurrent(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (!touchStart || !touchCurrent) return;
    const distance = touchStart - touchCurrent;
    
    if (distance > 50) {
      handleNext('left');
    } else if (distance < -50) {
      // Both left and right swipes clear the current card and go to Next
      handleNext('right');
    }

    setTouchStart(0);
    setTouchCurrent(0);
  };

  return (
    <section id="projects" className="min-h-screen py-20 flex flex-col justify-center overflow-hidden">
      {/* Header */}
      <ScrollReveal animation="fade-up">
        <div className="mb-10 text-center md:text-left md:flex justify-between items-end relative z-50">
          <div>
            <h2 className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-2">
              Selected Work
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
              Featured Projects
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Container with Vertical Stacked Cards and Side Arrows */}
      <div className="relative w-full flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mt-8 px-2 md:px-4">
        
        <div 
          className="relative w-full max-w-[340px] md:max-w-2xl lg:max-w-4xl h-[550px] md:h-[600px] touch-pan-y"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {projects.map((project, index) => {
            
            // Offset calculation using modulo for infinite loop
            let offset = (index - activeIndex + projects.length) % projects.length;
            
            const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
            
            // Card Positioning Logic:
            let translateX = 0;
            let translateY = 0;
            let scale = 1;
            let zIndex = 30 - offset; // Ensure proper stacking
            let opacity = 1;

            // Apply drag offset for active card
            if (offset === 0 && isDragging && touchStart) {
               translateX = touchCurrent - touchStart;
            }

            if (offset === 0) {
              // Active Card (Front)
              translateY = 0;
              scale = 1;
              zIndex = 40;
              opacity = 1;
            } else if (offset === projects.length - 1) {
              // Swiped Down/Away (Exit state)
              if (isMobile && swipeDir === 'left') {
                translateX = -500; // Fly off screen left
                translateY = 0;
              } else if (isMobile && swipeDir === 'right') {
                translateX = 500; // Fly off screen right
                translateY = 0;
              } else {
                translateX = 0;
                translateY = 300; // Default slide down
              }
              scale = 0.85;     // Shrink like down
              zIndex = 20;      // Slide under the stack
              opacity = 0;      // Fade out
            } else {
              // Cards peeking behind
              translateX = 0;
              translateY = -(offset * 50); // Move up by 50px per card
              scale = 1 - (offset * 0.05); // Shrink by 5% per card
              opacity = 1 - (offset * 0.15); // Fade slightly
            }

            return (
              <div
                key={index}
                className="absolute top-10 md:top-20 left-0 right-0 w-full"
                style={{
                  zIndex,
                  transform: `translateY(${translateY}px) translateX(${translateX}px) scale(${scale})`,
                  opacity,
                  transition: isDragging && offset === 0 ? 'none' : 'all 0.7s cubic-bezier(0.25,1,0.5,1)',
                  pointerEvents: offset === 0 ? 'auto' : 'none', // Only active card is interactive
                }}
              >
                <div
                  className={`group relative rounded-2xl p-[1px] flex flex-col h-full transition-all duration-500`}
                  style={{
                    boxShadow: offset === 0 ? `0 20px 40px -10px ${project.colorClasses.shadow}, 0 0 20px ${project.colorClasses.shadow}` : '0 10px 30px -10px rgba(0,0,0,0.5)',
                  }}
                >
                  <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.gradient} opacity-40 transition-opacity duration-500`}></span>
                  
                  <div className="relative flex-1 w-full h-full bg-neutral-900 rounded-2xl p-5 md:p-6 flex flex-col border border-neutral-700">
                    
                    {/* Top App Bar Simulation */}
                    <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800/80">
                      <div className="flex items-center gap-2">
                        <span className={`w-6 h-6 rounded-md flex items-center justify-center text-[10px] font-bold ${project.colorClasses.badgeBg} ${project.colorClasses.badgeText}`}>
                          {index + 1}
                        </span>
                        <span className="text-sm font-semibold text-white tracking-wide">{project.type}</span>
                      </div>
                      <div className="flex gap-1.5 opacity-60">
                        <span className="w-3 h-1 bg-white rounded-sm"></span>
                        <span className="w-3 h-1 bg-white rounded-sm"></span>
                      </div>
                    </div>

                    {/* Terminal Box (Compacted Height) */}
                    <div className="terminal-output relative w-full h-32 md:h-36 rounded-xl bg-black border border-neutral-800/50 mb-5 p-3 md:p-4 overflow-hidden text-[11px] md:text-xs flex flex-col">
                      <div className="flex items-center space-x-2 mb-2 border-b border-neutral-800/50 pb-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></span>
                        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></span>
                      </div>
                      <div className="space-y-1 overflow-y-auto custom-scrollbar pr-1">
                        {project.terminalOutput.map((line, i) => (
                          <p key={i} className={line.color}>{line.text}</p>
                        ))}
                      </div>
                    </div>

                    {/* Text Info */}
                    <div className="flex-1">
                      <h3 className={`text-lg md:text-xl font-bold text-white transition-colors mb-3 font-sans ${project.colorClasses.titleHover}`}>
                        {project.title}
                      </h3>
                      <ul className="space-y-1.5 text-neutral-400 text-xs md:text-sm font-light leading-relaxed mb-5">
                        {project.description.map((desc, i) => (
                          <li key={i} className="flex items-start gap-2" style={{ lineHeight: '1.4' }}>
                            <span className={`mt-1 h-1 w-1 md:h-1.5 md:w-1.5 rounded-full shrink-0 ${project.colorClasses.bullet}`}></span>
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-neutral-800/50">
                      {project.tags.map((tag, i) => (
                        <span 
                          key={i} 
                          role="button"
                          className={`px-2.5 py-1 text-[10px] md:text-xs font-mono rounded-md border transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${project.colorClasses.badgeBg} ${project.colorClasses.badgeBorder} ${project.colorClasses.badgeText} hover:brightness-125 cursor-default`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrows Column (Bottom on Mobile, Right on Desktop) */}
        <div className="flex flex-row md:flex-col gap-4 z-50 mt-4 md:mt-0">
          {/* Previous Arrow (Left on Mobile, Up on Desktop) */}
          <button
            onClick={handlePrev}
            className="group relative flex items-center justify-center w-12 h-12 md:w-12 md:h-12 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              boxShadow: '0 4px 12px rgba(0,0,0,0.55)',
              filter: prevHovered ? buttonGlow : 'none',
            }}
            onMouseEnter={() => setPrevHovered(true)}
            onMouseLeave={() => setPrevHovered(false)}
            aria-label="Previous Project"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <div className="absolute inset-[1px] bg-neutral-900 rounded-xl z-0"></div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="relative z-10 w-5 h-5 group-hover:text-emerald-300 md:group-hover:-translate-y-0.5 transition-all duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" className="block md:hidden" d="M15.75 19.5L8.25 12l7.5-7.5" />
              <path strokeLinecap="round" strokeLinejoin="round" className="hidden md:block" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>

          {/* Next Arrow (Right on Mobile, Down on Desktop) */}
          <button
            onClick={handleNext}
            className="group relative flex items-center justify-center w-12 h-12 md:w-12 md:h-12 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              boxShadow: '0 4px 12px rgba(0,0,0,0.55)',
              filter: nextHovered ? buttonGlow : 'none',
            }}
            onMouseEnter={() => setNextHovered(true)}
            onMouseLeave={() => setNextHovered(false)}
            aria-label="Next Project"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
            <div className="absolute inset-[1px] bg-neutral-900 rounded-xl z-0"></div>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="relative z-10 w-5 h-5 group-hover:text-emerald-300 md:group-hover:translate-y-0.5 transition-all duration-300">
              <path strokeLinecap="round" strokeLinejoin="round" className="block md:hidden" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              <path strokeLinecap="round" strokeLinejoin="round" className="hidden md:block" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
