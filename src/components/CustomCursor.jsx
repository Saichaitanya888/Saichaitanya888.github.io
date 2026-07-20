import { useState, useEffect, useRef } from 'react';

export default function CustomCursor({ bgType = 'flicker' }) {
  const [isMobile, setIsMobile] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  // Check if touch device (disable glow on mobile/tablets)
  useEffect(() => {
    const checkTouch = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsMobile(isTouch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  // Track mouse coordinate positions
  // We use direct DOM manipulation here instead of React State to eliminate React render latency
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;
      
      // Update DOM directly for zero-latency tracking
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
      }
      
      if (glowRef.current) {
        const bg = (bgType === 'particles' || bgType === 'glyph')
          ? `radial-gradient(450px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.08), transparent 75%)`
          : `radial-gradient(550px circle at ${x}px ${y}px, rgba(16, 185, 129, 0.13), transparent 75%)`;
        glowRef.current.style.background = bg;
      }
      
      // Detect if we are hovering over a clickable element
      if (e.target.closest('a, button, input, textarea, select, [role="button"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile, bgType]);

  if (isMobile) return null;

  return (
    <>
      {/* Ambient Screen Glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed inset-0 z-0"
      />

      {/* Main Cursor Dot */}
      <div 
        ref={dotRef}
        className="pointer-events-none fixed z-[9999] w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-transform duration-200"
        style={{
          left: '-100px',
          top: '-100px',
          backgroundColor: (bgType === 'particles' || bgType === 'glyph') ? '#fff' : '#10b981',
          boxShadow: (bgType === 'particles' || bgType === 'glyph') ? '0 0 10px rgba(255,255,255,0.8)' : '0 0 10px rgba(16,185,129,0.8)',
          transform: isHovering ? 'translate(-50%, -50%) scale(2.5)' : 'translate(-50%, -50%) scale(1)',
        }}
      />
    </>
  );
}
