import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Experience() {
  const [tritechHovered, setTritechHovered] = useState(false);
  const [eduHovered, setEduHovered] = useState(false);
  const [internHovered, setInternHovered] = useState(false);

  return (
    <section id="experience" className="min-h-screen py-20 flex flex-col justify-center">
      {/* Header */}
      <ScrollReveal animation="fade-up">
        <div className="mb-16">
          <h2 className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-2">
            History
          </h2>
          <p className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
            Experience & Education
          </p>
        </div>
      </ScrollReveal>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full items-stretch">
        
        {/* TriTech Internship Card */}
        <ScrollReveal animation="slide-left" className="flex flex-col" delay={0}>
          <div
            className="group relative rounded-2xl p-[1px] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden bg-neutral-800/40"
            style={{
              boxShadow: tritechHovered ? '0 0 20px rgba(168, 85, 247, 0.4)' : 'none',
            }}
            onMouseEnter={() => setTritechHovered(true)}
            onMouseLeave={() => setTritechHovered(false)}
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-purple-500/50 to-transparent opacity-30 group-hover:opacity-0 transition-opacity duration-500"></span>
            
            {/* Border Beam (Hover) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square animate-[spin_3s_linear_infinite]"
                style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(168, 85, 247, 1) 100%)' }}
              />
            </div>

            <div className="relative flex-1 w-full h-full bg-neutral-950 rounded-2xl p-5 lg:p-6 flex flex-col justify-between">
              <div>
                {/* Badge & Timeline */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-400">
                    Internship
                  </span>
                  <span className="text-sm font-mono text-neutral-500">Present</span>
                </div>

                {/* Position Details */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors font-sans">
                  AI/ML Intern
                </h3>
                <p className="text-neutral-400 font-medium mb-4 font-sans text-sm">
                  TriTech Innovations Private Limited
                </p>

                {/* Bullets */}
                <ul className="space-y-2 text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-purple-400 mt-2 h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0"></span>
                    Developing and deploying machine learning models to solve real-world problems.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-purple-400 mt-2 h-1.5 w-1.5 rounded-full bg-purple-400 shrink-0"></span>
                    Collaborating with the backend team to integrate AI/ML functionalities via APIs.
                  </li>
                </ul>
              </div>

              {/* Location */}
              <div className="mt-5 border-t border-neutral-900 pt-4 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-mono">LOCATION</span>
                <span className="text-sm font-medium text-purple-400 font-mono uppercase">Kondapur, Hyderabad</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Education Card */}
        <ScrollReveal animation="slide-left" className="flex flex-col" delay={50}>
          <div
            className="group relative rounded-2xl p-[1px] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden bg-neutral-800/40"
            style={{
              boxShadow: eduHovered ? '0 0 20px rgba(16, 185, 129, 0.4)' : 'none',
            }}
            onMouseEnter={() => setEduHovered(true)}
            onMouseLeave={() => setEduHovered(false)}
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/50 to-transparent opacity-30 group-hover:opacity-0 transition-opacity duration-500"></span>
            
            {/* Border Beam (Hover) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square animate-[spin_3s_linear_infinite]"
                style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(16, 185, 129, 1) 100%)' }}
              />
            </div>

            <div className="relative flex-1 w-full h-full bg-neutral-950 rounded-2xl p-5 lg:p-6 flex flex-col justify-between">
              <div>
                {/* Badge & Timeline */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    Education
                  </span>
                  <span className="text-sm font-mono text-neutral-500">2021 – 2025</span>
                </div>

                {/* Institution Details */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors font-sans">
                  Bachelor of Computer Science
                </h3>
                <p className="text-neutral-400 font-medium mb-4 font-sans text-sm">
                  Bapatla Engineering College
                </p>

                {/* Core Learnings / Focus */}
                <ul className="space-y-2 text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    Comprehensive study of computer architecture, algorithms, and system programming.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-emerald-400 mt-2 h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0"></span>
                    Gained deep theoretical foundation and hands-on laboratory experience in operating systems and networking security.
                  </li>
                </ul>
              </div>

              {/* Academic Score */}
              <div className="mt-5 border-t border-neutral-900 pt-4 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-mono">ACADEMIC PERFORMANCE</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">CGPA: 7.82</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Internship Card */}
        <ScrollReveal animation="slide-right" className="flex flex-col" delay={100}>
          <div
            className="group relative rounded-2xl p-[1px] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden bg-neutral-800/40"
            style={{
              boxShadow: internHovered ? '0 0 20px rgba(6, 182, 212, 0.4)' : 'none',
            }}
            onMouseEnter={() => setInternHovered(true)}
            onMouseLeave={() => setInternHovered(false)}
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/50 to-transparent opacity-30 group-hover:opacity-0 transition-opacity duration-500"></span>
            
            {/* Border Beam (Hover) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square animate-[spin_3s_linear_infinite]"
                style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(6, 182, 212, 1) 100%)' }}
              />
            </div>

            <div className="relative flex-1 w-full h-full bg-neutral-950 rounded-2xl p-5 lg:p-6 flex flex-col justify-between">
              <div>
                {/* Badge & Timeline */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                    Internship
                  </span>
                  <span className="text-sm font-mono text-neutral-500">May 2024 – July 2024</span>
                </div>

                {/* Position Details */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors font-sans">
                  Fraud Detection System Intern
                </h3>
                <p className="text-neutral-400 font-medium mb-4 font-sans text-sm">
                  SkillDzire Technologies Pvt. Ltd
                </p>

                {/* Bullets */}
                <ul className="space-y-2 text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
                  <li className="flex items-start gap-2.5">
                    <span className="text-cyan-400 mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                    Analyzed transaction data and identified anomalies, improving security detection parameters.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-cyan-400 mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                    Worked with large datasets to detect irregular patterns and troubleshoot workflow inconsistencies.
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-cyan-400 mt-2 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0"></span>
                    Gained valuable experience handling real-world data security threats and debugging logs.
                  </li>
                </ul>
              </div>

              {/* Location */}
              <div className="mt-5 border-t border-neutral-900 pt-4 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-mono">LOCATION</span>
                <span className="text-sm font-medium text-cyan-400 font-mono uppercase">Hyderabad, India</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
