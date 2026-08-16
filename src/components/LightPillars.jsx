import React from 'react';

export default function LightPillars() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-[#050505] pointer-events-none mix-blend-screen">
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent"></div>
      
      {/* Light Pillars */}
      <div className="absolute inset-0 w-full h-full">
        {[...Array(15)].map((_, i) => {
          const left = Math.random() * 100;
          const width = 1 + Math.random() * 4;
          const height = 50 + Math.random() * 80;
          const duration = 10 + Math.random() * 15;
          const delay = Math.random() * -20;
          const opacity = 0.15 + Math.random() * 0.25;
          
          return (
            <div
              key={i}
              className="absolute bottom-[-20%] origin-bottom"
              style={{
                left: `${left}%`,
                width: `${width}%`,
                height: `${height}%`,
                background: 'linear-gradient(to top, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0.1) 40%, transparent 100%)',
                filter: 'blur(20px)',
                opacity: opacity,
                animation: `pillarMove ${duration}s ease-in-out infinite alternate`,
                animationDelay: `${delay}s`,
              }}
            />
          );
        })}
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes pillarMove {
          0% { transform: translateX(-10vw) rotate(-8deg) scaleY(0.8); opacity: 0.1; }
          50% { opacity: 0.5; }
          100% { transform: translateX(10vw) rotate(8deg) scaleY(1.3); opacity: 0.1; }
        }
      `}} />
    </div>
  );
}
