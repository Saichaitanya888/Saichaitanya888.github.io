import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import MorphingText from './MorphingText';
import BorderGlow from './BorderGlow';

export default function Hero() {
  const [btn1Hovered, setBtn1Hovered] = useState(false);
  const [btn2Hovered, setBtn2Hovered] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);

  const buttonFilter = 'drop-shadow(0 0 12px rgba(16, 185, 129, 0.45)) drop-shadow(0 0 25px rgba(6, 182, 212, 0.25))';
  const imgFilter = 'drop-shadow(0 0 30px rgba(16, 185, 129, 0.45))';

  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col justify-center items-center md:items-start text-center md:text-left gap-6 pt-16 md:pt-20 pb-32 md:pb-48"
    >
      {/* Badge Indicator */}
      <ScrollReveal animation="fade-up" delay={50}>
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1 text-xs font-medium text-emerald-400">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
          CS Graduate | Open to Opportunities
        </div>
      </ScrollReveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full items-center">
        {/* Left Content Column */}
        <div className="lg:col-span-7 flex flex-col gap-6 order-2 lg:order-1">
          
          <ScrollReveal animation="fade-up" delay={100}>
            <h1 className="text-xl sm:text-2xl md:text-4xl xl:text-5xl font-extrabold tracking-tight leading-tight text-white flex flex-col gap-2">
              <span>Building</span>
              <MorphingText 
                texts={[
                  "Secure Systems.",
                  "Cloud Workflows.",
                  "Security Operations.",
                  "Linux Architectures.",
                  "Automated Solutions."
                ]} 
                className="text-emerald-400" 
              />
            </h1>
          </ScrollReveal>
          
          <ScrollReveal animation="fade-up" delay={150}>
            <p className="text-sm sm:text-base md:text-xl text-gray-200 font-medium leading-relaxed drop-shadow-md">
              I am a Computer Science graduate specializing in Linux systems, Google Cloud Platform (GCP), security operations (SIEM/SOAR), and automation. I focus on optimizing kernel stability, parsing logs to track threats, and engineering reliable software solutions.
            </p>
          </ScrollReveal>

          {/* Action Buttons */}
          <ScrollReveal animation="fade-up" delay={200}>
            <div className="flex flex-wrap items-center gap-4 mt-4 self-center md:self-start">
              <div className="relative group rounded-2xl">
                <a
                  href="#experience"
                  className="relative inline-block transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                >
                  <BorderGlow
                    backgroundColor="#120F17"
                    edgeSensitivity={30}
                    glowColor="160 84 40"
                    borderRadius={16}
                    glowRadius={6}
                    glowIntensity={0.6}
                    coneSpread={25}
                    animated={false}
                    fillOpacity={0}
                    colors={['#10b981', '#06b6d4', '#10b981']}
                  >
                    <div className="relative z-10 px-6 py-3 font-semibold leading-6 text-white flex items-center space-x-3">
                      <span className="transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-emerald-300">
                        Begin Journey
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-emerald-300"
                      >
                        <path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"></path>
                      </svg>
                    </div>
                  </BorderGlow>
                </a>
              </div>

              <div className="relative group rounded-2xl">
                <a
                  href="/sourcre/shanmukha_sai_chaitanya_resume.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="relative inline-block transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
                >
                  <BorderGlow
                    backgroundColor="#120F17"
                    edgeSensitivity={30}
                    glowColor="189 94 43"
                    borderRadius={16}
                    glowRadius={6}
                    glowIntensity={0.6}
                    coneSpread={25}
                    animated={false}
                    fillOpacity={0}
                    colors={['#06b6d4', '#38bdf8', '#06b6d4']}
                  >
                    <div className="relative z-10 px-6 py-3 font-semibold leading-6 text-white flex items-center space-x-3">
                      <span className="transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-cyan-300">
                        Resume
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-5 h-5 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-cyan-300"
                      >
                        <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"></path>
                      </svg>
                    </div>
                  </BorderGlow>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Right Image/Avatar Column */}
        <div className="lg:col-span-5 flex justify-center items-center order-1 lg:order-2">
          <ScrollReveal animation="zoom-in" delay={100}>
            <div
              className="relative group w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full transition-all duration-500 hover:scale-[1.03]"
              style={{
                transition: 'all 0.3s ease-in-out',
                filter: imgHovered ? imgFilter : 'none',
              }}
              onMouseEnter={() => setImgHovered(true)}
              onMouseLeave={() => setImgHovered(false)}
            >
              {/* Rotating Spark Border Wrapper */}
              <div className="absolute inset-0 rounded-full overflow-hidden p-[2px] bg-neutral-950 flex items-center justify-center">
                {/* Rotating Conic Gradient (The Spark) */}
                <div 
                  className="absolute inset-[-50%] bg-[conic-gradient(from_0deg,transparent_40%,#ffffff_50%,transparent_60%)] animate-[spin_4s_linear_infinite] z-0"
                />
                
                {/* Inner Mask & Profile Image */}
                <div className="absolute inset-[2.5px] rounded-full bg-neutral-950 overflow-hidden flex items-center justify-center z-10">
                  <img
                    src="/Images/photo_2026-06-05_21-02-48.jpg"
                    alt="Shanmukha Sai Chaitanya"
                    className="w-full h-full object-cover object-center transform transition-transform duration-700 hover:scale-110"
                    style={{
                      objectPosition: '50% 25%'
                    }}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
