import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { experienceData } from '../constants';

export default function Experience() {
  const [hoveredIdx, setHoveredIdx] = useState(null);

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
        {experienceData.map((item, index) => {
          const isHovered = hoveredIdx === index;
          
          return (
            <ScrollReveal key={index} animation="slide-up" className="flex flex-col" delay={item.delay}>
              <div
                className="group relative rounded-2xl p-[1px] transition-all duration-500 hover:-translate-y-2 flex flex-col h-full overflow-hidden bg-neutral-800/40"
                style={{
                  boxShadow: isHovered ? `0 0 20px ${item.hoverGlow}` : 'none',
                }}
                onMouseEnter={() => setHoveredIdx(index)}
                onMouseLeave={() => setHoveredIdx(null)}
              >
                <span className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${item.gradient} to-transparent opacity-30 group-hover:opacity-0 transition-opacity duration-500`}></span>
                
                {/* Border Beam (Hover) */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div 
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] aspect-square animate-[spin_3s_linear_infinite]"
                    style={{ background: `conic-gradient(from 0deg, transparent 70%, ${item.borderBeam} 100%)` }}
                  />
                </div>

                <div className="relative flex-1 w-full h-full bg-neutral-950 rounded-2xl p-5 lg:p-6 flex flex-col justify-between">
                  <div>
                    {/* Badge & Timeline */}
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${item.badgeBorder} ${item.badgeBg} ${item.badgeText}`}>
                        {item.type}
                      </span>
                      <span className="text-sm font-mono text-neutral-500">{item.date}</span>
                    </div>

                    {/* Position Details */}
                    <h3 className={`text-2xl font-bold text-white mb-2 transition-colors font-sans ${item.titleHover}`}>
                      {item.title}
                    </h3>
                    <p className="text-neutral-400 font-medium mb-4 font-sans text-sm">
                      {item.company}
                    </p>

                    {/* Bullets */}
                    <ul className="space-y-2 text-neutral-400 text-xs md:text-sm font-light leading-relaxed">
                      {item.bullets.map((bullet, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <span className={`mt-2 h-1.5 w-1.5 rounded-full shrink-0 ${item.bulletColor}`}></span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Location / Extra Info */}
                  <div className="mt-5 border-t border-neutral-900 pt-4 flex items-center justify-between">
                    <span className="text-xs text-neutral-500 font-mono uppercase">{item.locationLabel}</span>
                    <span className={`text-sm font-medium font-mono ${item.locationColor}`}>{item.location}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          );
        })}

      </div>
    </section>
  );
}
