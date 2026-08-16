import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { skillsData, certificationsData } from '../constants';

export default function Skills() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevHovered, setPrevHovered] = useState(false);
  const [nextHovered, setNextHovered] = useState(false);
  const [certHovered, setCertHovered] = useState(null);

  // Touch Swipe State
  const [touchStart, setTouchStart] = useState(0);
  const [touchCurrent, setTouchCurrent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const len = skillsData.length;

  const nextSkill = () => {
    setCurrentIndex((prev) => (prev + 1) % len);
  };

  const prevSkill = () => {
    setCurrentIndex((prev) => (prev - 1 + len) % len);
  };

  // Touch Swipe Handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchCurrent(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e) => {
    setTouchCurrent(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    if (!touchStart || !touchCurrent) return;
    const distance = touchStart - touchCurrent;
    const isLeftSwipe = distance > 40; // swipe left -> next card
    const isRightSwipe = distance < -40; // swipe right -> prev card

    if (isLeftSwipe) {
      nextSkill();
    } else if (isRightSwipe) {
      prevSkill();
    }

    // Reset touch coordinates
    setTouchStart(0);
    setTouchCurrent(0);
  };

  const buttonGlow = 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.4))';
  const certShadow = '0 0 20px rgba(16, 185, 129, 0.3)';

  return (
    <section id="skills" className="min-h-screen py-32 flex flex-col justify-center items-center">
      {/* Skillset Header */}
      <ScrollReveal animation="fade-up" className="w-full max-w-3xl">
        <div className="mb-12 w-full flex items-end justify-between px-4">
          <div>
            <h2 className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-2">
              Technical Arsenal
            </h2>
            <p className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
              Core Competencies
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex gap-4 relative z-50">
            <button
              onClick={prevSkill}
              className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                boxShadow: '0 4px 12px rgba(0,0,0,0.55)',
                filter: prevHovered ? buttonGlow : 'none',
              }}
              onMouseEnter={() => setPrevHovered(true)}
              onMouseLeave={() => setPrevHovered(false)}
              aria-label="Previous Skill"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <div className="absolute inset-[1px] bg-neutral-900 rounded-xl z-0"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="relative z-10 w-5 h-5 group-hover:text-emerald-300 group-hover:-translate-x-0.5 transition-all duration-300"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>

            <button
              onClick={nextSkill}
              className="group relative flex items-center justify-center w-12 h-12 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
              style={{
                boxShadow: '0 4px 12px rgba(0,0,0,0.55)',
                filter: nextHovered ? buttonGlow : 'none',
              }}
              onMouseEnter={() => setNextHovered(true)}
              onMouseLeave={() => setNextHovered(false)}
              aria-label="Next Skill"
            >
              <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 p-[1px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <div className="absolute inset-[1px] bg-neutral-900 rounded-xl z-0"></div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
                className="relative z-10 w-5 h-5 group-hover:text-emerald-300 group-hover:translate-x-0.5 transition-all duration-300"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* 3D Stack Viewport */}
      <ScrollReveal
        animation="zoom-in"
        delay={150}
        className="relative w-full max-w-2xl h-[520px] sm:h-[450px] md:h-[350px] mx-auto perspective-1000 mb-28"
      >
        <div
          className="w-full h-full relative touch-pan-y"
          style={{ transformStyle: 'preserve-3d' }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {skillsData.map((skill, index) => {
            const diff = (index - currentIndex + len) % len;

            let cardClass = 'card-hidden';
            if (diff === 0) {
              cardClass = 'card-active';
            } else if (diff === 1) {
              cardClass = 'card-next';
            } else if (diff === len - 1) {
              cardClass = 'card-prev';
            }

            let dragOffset = 0;
            if (diff === 0 && isDragging && touchStart) {
              dragOffset = touchCurrent - touchStart;
            }

            return (
              <div
                key={skill.title}
                className={`skill-card absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out origin-center rounded-2xl p-[1px] ${cardClass}`}
                style={{
                  filter: diff === 0 ? 'drop-shadow(0 20px 40px rgba(0,0,0,0.8))' : undefined,
                  pointerEvents: diff === 0 ? 'auto' : 'none',
                  transform: diff === 0 && isDragging ? `translateX(${dragOffset}px) scale(1) translateZ(0)` : undefined,
                  transition: diff === 0 && isDragging ? 'none' : 'all 0.7s cubic-bezier(0.25,1,0.5,1)'
                }}
              >
                <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.gradientBorder} opacity-30`}></span>
                <div className="relative w-full h-full bg-neutral-950 rounded-2xl p-6 md:p-8 flex flex-col justify-between">
                  <div>
                    <div className="mb-4 flex items-center gap-4">
                      <div className={`p-3 rounded-lg border ${skill.iconColorClass}`}>
                        {skill.icon}
                      </div>
                      <h3 className="text-xl md:text-2xl font-bold text-white font-sans">{skill.title}</h3>
                    </div>
                    <p className="text-neutral-400 text-sm md:text-base font-light leading-relaxed font-sans mb-4">
                      {skill.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2.5 mt-auto">
                    {skill.tags.map((tag) => (
                      <span
                        key={tag.text}
                        className={`tech-tag ${tag.colorClass.replace('hover:text-white', '')}`}
                      >
                        {tag.text}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </ScrollReveal>

      {/* Certifications Section */}
      <div className="w-full max-w-3xl mt-12">
        <ScrollReveal animation="fade-up">
          <div className="mb-8 px-4 text-center md:text-left">
            <h2 className="text-xs font-semibold tracking-widest text-cyan-400 uppercase mb-2">
              Credentials
            </h2>
            <p className="text-2xl md:text-3xl font-bold tracking-tight text-white font-sans">
              Professional Certifications
            </p>
          </div>
        </ScrollReveal>

        {/* Certs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 px-4">
          {certificationsData.map((cert, index) => {
            const isHovered = certHovered === index;
            return (
              <ScrollReveal
                key={cert.title}
                animation="fade-up"
                delay={index * 100}
                className="flex flex-col"
              >
                <div
                  className="group relative rounded-xl p-[1px] transition-all duration-300 hover:scale-[1.02] flex flex-col h-full"
                  onMouseEnter={() => setCertHovered(index)}
                  onMouseLeave={() => setCertHovered(null)}
                >
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-neutral-800 to-transparent opacity-40 transition-all duration-500"></span>
                  <div className="relative flex-grow w-full h-full bg-neutral-950 border border-neutral-900/50 rounded-xl p-5 flex items-start gap-4">
                    <div className="p-2.5 bg-neutral-900 border border-neutral-800 rounded-lg shrink-0">
                      {cert.icon}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-white font-sans leading-tight group-hover:text-emerald-300 transition-colors">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-neutral-500 mt-1 font-mono">{cert.issuer}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
