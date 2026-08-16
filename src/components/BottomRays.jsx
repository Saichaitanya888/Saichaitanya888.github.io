import React from 'react';

export default function BottomRays() {
  return (
    <div className="pointer-events-none fixed bottom-0 left-0 w-full h-[60vh] z-30 overflow-hidden mix-blend-screen opacity-80">
      {/* Light Rays */}
      <div 
        className="absolute left-1/2 bottom-[-20%] w-[150%] h-[150%] -translate-x-1/2"
        style={{
          background: `
            repeating-conic-gradient(
              from 270deg at 50% 100%,
              transparent 0deg,
              rgba(16, 185, 129, 0.15) 4deg,
              transparent 8deg,
              rgba(6, 182, 212, 0.15) 12deg,
              transparent 16deg
            )
          `,
          filter: 'blur(12px)',
          maskImage: 'radial-gradient(circle at bottom center, black 0%, transparent 50%)',
          WebkitMaskImage: 'radial-gradient(circle at bottom center, black 0%, transparent 50%)',
          transform: 'perspective(1000px) rotateX(60deg) scale(1.5)',
        }}
      />
      
      {/* Intense Center Glow to anchor the rays */}
      <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[300px] h-[150px] bg-emerald-500/40 blur-[50px] rounded-full" />
    </div>
  );
}
