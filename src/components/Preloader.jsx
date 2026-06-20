import { useEffect, useState, useRef } from 'react';

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [logs, setLogs] = useState([]);

  // Use a ref to store values for timer intervals so updates don't trigger state race conditions
  const progressIntervalRef = useRef(null);

  // Simulated log list mapped to progress brackets
  const getLogForProgress = (pct) => {
    if (pct < 15) return 'SYSBOOT v4.16.0-generic-amd64...';
    if (pct < 30) return 'Configuring local environment hooks...';
    if (pct < 45) return 'Loading core layouts & assets...';
    if (pct < 60) return 'Assembling responsive coverflow models...';
    if (pct < 75) return 'Mapping gesture swipes & animations...';
    if (pct < 90) return 'Securing client handshake parameters...';
    return 'Boot sequence complete. Launching profile...';
  };

  useEffect(() => {
    // Total default duration is 450ms for extremely fast loading
    const totalDuration = 450; 
    const stepTime = 15;
    const increment = 100 / (totalDuration / stepTime);

    progressIntervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + increment;
        if (next >= 100) {
          clearInterval(progressIntervalRef.current);
          
          // Complete loading state and transition out
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(onComplete, 300); // Snappy 300ms fade transition
          }, 50);
          
          return 100;
        }

        const currentLog = getLogForProgress(next);
        setLogs((prevLogs) => {
          if (prevLogs.length === 0 || prevLogs[prevLogs.length - 1] !== currentLog) {
            return [...prevLogs, currentLog];
          }
          return prevLogs;
        });

        return next;
      });
    }, stepTime);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#050505] flex flex-col justify-center items-center p-6 transition-all duration-300 ease-in-out select-none ${
        isFadingOut ? 'opacity-0 scale-105 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Ambient Grid overlay in background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.015),transparent)] pointer-events-none"></div>

      <div className="w-full max-w-md flex flex-col gap-5 items-center relative z-10">
        {/* HUD Scanner Wheel */}
        <div className="relative w-40 h-40 flex items-center justify-center shrink-0 border border-emerald-500/10 rounded-full bg-[#070707] shadow-[0_0_25px_rgba(16,185,129,0.05)]">
          {/* Rotating Dial Ring */}
          <div className="absolute inset-2 border-2 border-dashed border-emerald-500/30 rounded-full animate-orbit-cw"></div>
          {/* Counter-rotating Dotted Ring */}
          <div className="absolute inset-4 border border-dotted border-cyan-500/40 rounded-full animate-orbit-ccw"></div>
          
          {/* Scanner Radar Sweeper Line */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            <div className="w-full h-1 bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-80 animate-sweep-y"></div>
          </div>

          {/* Center Progress Text */}
          <div className="flex flex-col items-center justify-center z-10">
            <span className="text-[10px] text-neutral-500 tracking-[0.2em] uppercase font-semibold">LOAD SCAN</span>
            <span className="text-2xl font-bold text-emerald-400 font-mono tracking-tight">{Math.floor(progress)}%</span>
          </div>
        </div>

        {/* Grid Console Window for Logging */}
        <div className="w-full h-44 rounded-xl border border-neutral-900 bg-[#090909]/90 p-4 shadow-2xl overflow-hidden flex flex-col justify-between backdrop-blur-sm relative">
          <div className="flex items-center justify-between border-b border-neutral-900 pb-2 mb-2 shrink-0">
            <span className="text-[9px] text-neutral-500 uppercase tracking-widest font-bold">SYSTEM TELEMETRY DATA</span>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-pulse"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/70 animate-pulse"></span>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto scrollbar-none flex flex-col gap-1 text-[10px] text-emerald-400/80 leading-relaxed font-mono select-none">
            {logs.map((log, idx) => (
              <p key={idx} className="truncate">
                <span className="text-neutral-700 mr-1.5">&gt;</span>
                {log}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
