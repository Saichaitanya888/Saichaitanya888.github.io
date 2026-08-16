import { useState, useEffect } from 'react';
import ScrollReveal from './ScrollReveal';

export default function Contact() {
  const [handshakeHovered, setHandshakeHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isPointerFine, setIsPointerFine] = useState(false);

  const handshakeGlow = 'drop-shadow(0 0 30px rgba(16, 185, 129, 0.4))';
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsPointerFine(window.matchMedia('(pointer: fine)').matches);
    }
  }, []);

  const socials = [
    {
      name: 'GitHub',
      url: 'https://github.com/Saichaitanya888',
      hoverBorder: 'hover:border-cyan-500/50',
      glow: 'drop-shadow(0 0 15px rgba(6, 182, 212, 0.4))',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      name: 'Telegram',
      url: 'https://t.me/Saichaitanya888',
      hoverBorder: 'hover:border-sky-500/50',
      glow: 'drop-shadow(0 0 15px rgba(14, 165, 233, 0.4))',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
        </svg>
      )
    }
  ];

  const getScale = (index) => {
    if (!isPointerFine || hoveredIndex === null) return 1;
    const dist = Math.abs(hoveredIndex - index);
    if (dist === 0) return 1.3;
    if (dist === 1) return 1.12;
    return 0.95;
  };

  return (
    <section
      id="contact"
      className="min-h-screen py-32 flex flex-col justify-center items-center text-center relative z-10"
    >
      {/* Header */}
      <ScrollReveal animation="fade-up">
        <div className="mb-12 flex flex-col items-center">
          <h2 className="text-xs font-semibold tracking-widest text-emerald-400 uppercase mb-2">
            Handshake
          </h2>
          <p className="text-3xl md:text-5xl font-extrabold tracking-tight text-white font-sans">
            Initiate Connection
          </p>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-up" delay={80}>
        <p className="text-neutral-400 max-w-xl mb-12 font-light leading-relaxed font-sans">
          I am actively seeking entry-level opportunities in Software Engineering, Systems/SecOps, and Cloud Automation. If you have an open role, a technical challenge, or just want to discuss system debugging—let's connect!
        </p>
      </ScrollReveal>

      {/* Connection Links */}
      <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
        {/* Handshake Email Button */}
        <ScrollReveal animation="fade-up" delay={160}>
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=pothulashanmukhasaichaitanya@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-block p-[1px] font-semibold rounded-2xl transition-transform duration-300 hover:scale-105 overflow-hidden bg-neutral-800/40"
            style={{
              boxShadow: handshakeHovered ? '0 0 15px rgba(16, 185, 129, 0.45)' : 'none',
            }}
            onMouseEnter={() => setHandshakeHovered(true)}
            onMouseLeave={() => setHandshakeHovered(false)}
          >
            {/* Border Beam (Hover) - Masked */}
            <div 
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl p-[1px]"
              style={{
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            >
              <div 
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300%] aspect-square animate-[spin_2s_linear_infinite]"
                style={{ background: 'conic-gradient(from 0deg, transparent 70%, rgba(16, 185, 129, 1) 100%)' }}
              />
            </div>
            
            <span className="relative z-10 flex items-center gap-3 px-8 py-4 rounded-2xl bg-black text-white tracking-wide group-hover:text-emerald-300 transition-colors duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                />
              </svg>
              Execute handshake
            </span>
          </a>
        </ScrollReveal>

        {/* Social Dock */}
        <ScrollReveal animation="fade-up" delay={240}>
          <div 
            className="flex items-center gap-4"
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {socials.map((social, idx) => {
              const scale = getScale(idx);
              const isHovered = hoveredIndex === idx;
              return (
                <div
                  key={social.name}
                  className="relative flex items-center justify-center"
                  onMouseEnter={() => setHoveredIndex(idx)}
                >
                  {/* Tooltip */}
                  <div 
                    className={`absolute -top-12 left-1/2 -translate-x-1/2 px-2.5 py-1 bg-neutral-950 border border-neutral-800 text-[10px] font-mono font-bold text-white rounded-lg transition-all duration-200 pointer-events-none ${
                      isHovered ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-90'
                    }`}
                  >
                    {social.name}
                  </div>

                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`w-14 h-14 flex items-center justify-center rounded-2xl bg-black border border-neutral-800 text-neutral-400 hover:text-white transition-all duration-300 active:scale-95 ${social.hoverBorder}`}
                    style={{
                      transform: `scale(${scale}) translateY(${isHovered ? '-4px' : '0px'})`,
                      filter: isHovered ? social.glow : 'none',
                    }}
                    aria-label={`${social.name} Profile`}
                  >
                    {social.icon}
                  </a>
                </div>
              );
            })}
          </div>
        </ScrollReveal>
      </div>

      {/* Footer Branding */}
      <div className="mt-32 border-t border-neutral-900 w-full flex justify-center pt-8">
        <p className="text-xs text-neutral-600 font-mono">
          Designed & Engineered by Shanmukha Sai Chaitanya © {currentYear}
        </p>
      </div>
    </section>
  );
}
