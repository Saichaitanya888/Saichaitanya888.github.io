import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Experience() {
  const [eduHovered, setEduHovered] = useState(false);
  const [internHovered, setInternHovered] = useState(false);

  const glowStyle = 'drop-shadow(0 0 15px rgba(16, 185, 129, 0.35))';

  return (
    <section id="experience" className="min-h-screen py-32 flex flex-col justify-center">
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full items-stretch">
        
        {/* Education Card */}
        <ScrollReveal animation="slide-left" className="flex flex-col" delay={50}>
          <div
            className="group relative rounded-2xl p-[1px] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
            style={{
              filter: eduHovered ? glowStyle : 'none',
            }}
            onMouseEnter={() => setEduHovered(true)}
            onMouseLeave={() => setEduHovered(false)}
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-emerald-500/50 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500"></span>
            <div className="relative flex-1 w-full h-full bg-neutral-950 rounded-2xl p-8 flex flex-col justify-between border border-neutral-900/50">
              <div>
                {/* Badge & Timeline */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    Education
                  </span>
                  <span className="text-sm font-mono text-neutral-500">2021 – 2025</span>
                </div>

                {/* Institution Details */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors font-sans">
                  Bachelor of Computer Science
                </h3>
                <p className="text-neutral-400 font-medium mb-6 font-sans">
                  Bapatla Engineering College
                </p>

                {/* Core Learnings / Focus */}
                <ul className="space-y-3 text-neutral-400 text-sm md:text-base font-light leading-relaxed">
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
              <div className="mt-8 border-t border-neutral-900 pt-6 flex items-center justify-between">
                <span className="text-xs text-neutral-500 font-mono">ACADEMIC PERFORMANCE</span>
                <span className="text-lg font-bold text-emerald-400 font-mono">CGPA: 7.82</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Internship Card */}
        <ScrollReveal animation="slide-right" className="flex flex-col" delay={100}>
          <div
            className="group relative rounded-2xl p-[1px] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full"
            style={{
              filter: internHovered ? glowStyle : 'none',
            }}
            onMouseEnter={() => setInternHovered(true)}
            onMouseLeave={() => setInternHovered(false)}
          >
            <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/50 to-transparent opacity-30 group-hover:opacity-100 transition-opacity duration-500"></span>
            <div className="relative flex-1 w-full h-full bg-neutral-950 rounded-2xl p-8 flex flex-col justify-between border border-neutral-900/50">
              <div>
                {/* Badge & Timeline */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-400">
                    Internship
                  </span>
                  <span className="text-sm font-mono text-neutral-500">May 2024 – July 2024</span>
                </div>

                {/* Position Details */}
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors font-sans">
                  Fraud Detection System Intern
                </h3>
                <p className="text-neutral-400 font-medium mb-6 font-sans">
                  SkillDzire Technologies Pvt. Ltd
                </p>

                {/* Bullets */}
                <ul className="space-y-3 text-neutral-400 text-sm md:text-base font-light leading-relaxed">
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
              <div className="mt-8 border-t border-neutral-900 pt-6 flex items-center justify-between">
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
