import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

const skillsData = [
  {
    title: 'Systems & Security',
    glow: 'rgba(16, 185, 129, 0.4)',
    gradientBorder: 'from-emerald-500/50 to-transparent',
    iconColorClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
        />
      </svg>
    ),
    description:
      'Deep expertise in Linux systems, cybersecurity protocols, and security operations frameworks.',
    tags: [
      { text: 'Linux / Unix', colorClass: 'text-emerald-400 border-emerald-500/20 hover:border-emerald-400 hover:text-white' },
      { text: 'CyberSecurity', colorClass: 'text-emerald-400 border-emerald-500/20 hover:border-emerald-400 hover:text-white' },
      { text: 'Network Security', colorClass: 'text-emerald-400 border-emerald-500/20 hover:border-emerald-400 hover:text-white' },
      { text: 'SIEM / SOAR', colorClass: 'text-emerald-400 border-emerald-500/20 hover:border-emerald-400 hover:text-white' },
    ],
  },
  {
    title: 'Cloud & Automation',
    glow: 'rgba(6, 182, 212, 0.4)',
    gradientBorder: 'from-cyan-500/50 to-transparent',
    iconColorClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z"
        />
      </svg>
    ),
    description:
      'Building scalable automated compilation environments, cloud-based compilers, and shell automation scripts.',
    tags: [
      { text: 'Python', colorClass: 'text-cyan-400 border-cyan-500/20 hover:border-cyan-400 hover:text-white' },
      { text: 'Bash Scripting', colorClass: 'text-cyan-400 border-cyan-500/20 hover:border-cyan-400 hover:text-white' },
      { text: 'Google Cloud (GCP)', colorClass: 'text-cyan-400 border-cyan-500/20 hover:border-cyan-400 hover:text-white' },
      { text: 'Git / GitHub', colorClass: 'text-cyan-400 border-cyan-500/20 hover:border-cyan-400 hover:text-white' },
    ],
  },
  {
    title: 'AI & Analytics',
    glow: 'rgba(168, 85, 247, 0.4)',
    gradientBorder: 'from-purple-500/50 to-transparent',
    iconColorClass: 'text-purple-400 bg-purple-500/10 border-purple-500/20',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
        />
      </svg>
    ),
    description:
      'Designing generative AI applications with LLMs and prompt patterns in Google Cloud Vertex AI.',
    tags: [
      { text: 'Vertex AI', colorClass: 'text-purple-400 border-purple-500/20 hover:border-purple-400 hover:text-white' },
      { text: 'Prompt Design', colorClass: 'text-purple-400 border-purple-500/20 hover:border-purple-400 hover:text-white' },
      { text: 'Gemini / LLMs', colorClass: 'text-purple-400 border-purple-500/20 hover:border-purple-400 hover:text-white' },
      { text: 'Streamlit', colorClass: 'text-purple-400 border-purple-500/20 hover:border-purple-400 hover:text-white' },
    ],
  },
  {
    title: 'Core Strengths',
    glow: 'rgba(236, 72, 153, 0.4)',
    gradientBorder: 'from-pink-500/50 to-transparent',
    iconColorClass: 'text-pink-400 bg-pink-500/10 border-pink-500/20',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
        />
      </svg>
    ),
    description:
      'Applying structured logic, critical debugging methods, and automation algorithms to resolve operational challenges.',
    tags: [
      { text: 'Problem Solving', colorClass: 'text-pink-400 border-pink-500/20 hover:border-pink-400 hover:text-white' },
      { text: 'Analytical Thinking', colorClass: 'text-pink-400 border-pink-500/20 hover:border-pink-400 hover:text-white' },
      { text: 'Workflow Automation', colorClass: 'text-pink-400 border-pink-500/20 hover:border-pink-400 hover:text-white' },
      { text: 'System Debugging', colorClass: 'text-pink-400 border-pink-500/20 hover:border-pink-400 hover:text-white' },
    ],
  },
];

const certificationsData = [
  {
    title: 'Prompt Design in Vertex AI',
    issuer: 'Google Cloud Platform',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-purple-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 21l8.982-11.761a2.25 2.25 0 00-.019-2.838L12.078 1.62a2.25 2.25 0 00-2.838-.019L1.62 9.813a2.25 2.25 0 00-.019 2.838L6.92 18.08a2.25 2.25 0 002.893.076l.019-.016M15 11.25l.041-.02a.75.75 0 11.082 1.25l-.041.02a.75.75 0 01-.082-1.25z" />
      </svg>
    )
  },
  {
    title: 'GenAI Apps with Gemini & Streamlit',
    issuer: 'Google Cloud Platform',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-cyan-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38 6.002 6.002 0 01-5.4-3.41 5.978 5.978 0 010-7.38c.64-.84 1.5-1.5 2.47-1.93a5.96 5.96 0 018.77 5.34z" />
      </svg>
    )
  },
  {
    title: 'Chronicle SecOps Platform Fundamentals',
    issuer: 'Google Cloud Security',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-emerald-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    )
  },
  {
    title: 'Google Security Operations (SIEM) Intro',
    issuer: 'Google Cloud Security',
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5 text-indigo-400">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    )
  }
];

export default function Skills() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevHovered, setPrevHovered] = useState(false);
  const [nextHovered, setNextHovered] = useState(false);
  const [certHovered, setCertHovered] = useState(null);

  // Touch Swipe State
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

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
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50; // swipe left -> next card
    const isRightSwipe = distance < -50; // swipe right -> prev card

    if (isLeftSwipe) {
      nextSkill();
    } else if (isRightSwipe) {
      prevSkill();
    }

    // Reset touch coordinates
    setTouchStart(0);
    setTouchEnd(0);
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
          className="w-full h-full relative"
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

            return (
              <div
                key={skill.title}
                className={`skill-card absolute top-0 left-0 w-full h-full transition-all duration-700 ease-in-out origin-center rounded-2xl p-[1px] ${cardClass}`}
                style={{
                  filter: diff === 0 ? `drop-shadow(0 20px 40px ${skill.glow})` : undefined,
                  pointerEvents: diff === 0 ? 'auto' : 'none',
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
                        className={`text-xs font-mono px-3 py-1.5 rounded-md bg-neutral-900/60 border transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 cursor-default ${tag.colorClass}`}
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
                  style={{
                    boxShadow: isHovered ? certShadow : 'none',
                  }}
                  onMouseEnter={() => setCertHovered(index)}
                  onMouseLeave={() => setCertHovered(null)}
                >
                  <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-neutral-800 to-transparent opacity-40 group-hover:opacity-100 group-hover:from-emerald-500/30 group-hover:to-cyan-500/20 transition-all duration-500"></span>
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
