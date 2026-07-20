import { useEffect, useState } from 'react';

export default function Preloader({ onComplete }) {
  const [phase, setPhase] = useState('404'); // '404' -> 'decrypting' -> 'granted'
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [glitchText, setGlitchText] = useState("ERROR 404: NOT FOUND");

  useEffect(() => {
    // Initial 404 glitch phase
    const glitchInterval = setInterval(() => {
      const chars = "!<>-_\\/[]{}—=+*^?#_01";
      let randomString = "";
      for (let i = 0; i < 10; i++) {
        randomString += chars[Math.floor(Math.random() * chars.length)];
      }
      if (Math.random() > 0.6) {
        setGlitchText(`ERROR 404: ${randomString}`);
      } else {
        setGlitchText("ERROR 404: NOT FOUND");
      }
    }, 100);

    // Transition to Decrypting phase after 1.2 seconds
    const phase2Timer = setTimeout(() => {
      clearInterval(glitchInterval);
      setPhase('decrypting');
      setGlitchText("BYPASSING SECURITY FIREWALL...");
    }, 1200);

    // Transition to Granted phase
    const phase3Timer = setTimeout(() => {
      setPhase('granted');
      setGlitchText("ACCESS GRANTED. WELCOME.");
    }, 2200);

    // Fade out and unmount
    const finishTimer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(onComplete, 500); // Wait for CSS opacity transition
    }, 2800);

    return () => {
      clearInterval(glitchInterval);
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
      clearTimeout(finishTimer);
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#050505] flex flex-col justify-center items-center p-6 transition-opacity duration-500 ease-in-out select-none ${
        isFadingOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent)] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        
        {/* Main Status Code */}
        <h1 
          className={`text-6xl md:text-8xl font-black font-mono tracking-widest text-center transition-colors duration-300 ${
            phase === '404' ? 'text-red-500 animate-pulse' : 
            phase === 'decrypting' ? 'text-cyan-500' : 
            'text-emerald-500'
          }`}
          style={{ 
            textShadow: phase === '404' ? '0 0 30px rgba(239,68,68,0.6)' : 
                        phase === 'decrypting' ? '0 0 30px rgba(6,182,212,0.6)' : 
                        '0 0 30px rgba(16,185,129,0.6)' 
          }}
        >
          {phase === '404' ? "404" : phase === 'decrypting' ? "DECRYPTING" : "200 OK"}
        </h1>
        
        {/* Subtext Logging */}
        <div className="h-8 flex items-center justify-center">
          <p className={`text-sm md:text-xl font-mono font-bold tracking-widest transition-colors duration-300 ${
            phase === '404' ? 'text-red-400' : 
            phase === 'decrypting' ? 'text-cyan-400 animate-pulse' : 
            'text-emerald-400'
          }`}>
            {glitchText}
          </p>
        </div>

        {/* Fake Progress Bar */}
        <div className="w-64 h-1.5 bg-neutral-900 overflow-hidden rounded-full mt-4 border border-neutral-800">
          <div 
            className={`h-full transition-all duration-1000 ease-out ${
              phase === '404' ? 'w-[12%] bg-red-500 shadow-[0_0_10px_rgba(239,68,68,1)]' : 
              phase === 'decrypting' ? 'w-[68%] bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,1)]' : 
              'w-[100%] bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,1)]'
            }`}
          />
        </div>

      </div>
    </div>
  );
}
