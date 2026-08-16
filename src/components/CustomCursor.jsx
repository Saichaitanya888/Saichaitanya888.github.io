import { useState, useEffect, useRef } from 'react';

export default function CustomCursor({ bgType = 'flicker' }) {
  const [isMobile, setIsMobile] = useState(true);
  
  const dotRef = useRef(null);
  const glowRef = useRef(null);
  const posRef = useRef({ x: -100, y: -100 });
  const isHoveringRef = useRef(false);
  const rafRef = useRef(null);

  // Check if touch device (disable custom cursor on mobile/tablets)
  useEffect(() => {
    const checkTouch = () => {
      const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
      setIsMobile(isTouch);
    };
    checkTouch();
    window.addEventListener('resize', checkTouch, { passive: true });
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    // Render loop using requestAnimationFrame for zero jitter and 144Hz/240Hz screen synchronization
    const updateCursorPosition = () => {
      const { x, y } = posRef.current;
      const isHovered = isHoveringRef.current;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${isHovered ? 2.5 : 1})`;
      }

      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }

      rafRef.current = requestAnimationFrame(updateCursorPosition);
    };

    rafRef.current = requestAnimationFrame(updateCursorPosition);

    const handleMouseMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
    };

    // Use event delegation for hover state to avoid calling querySelector/closest on every mousemove
    const handleMouseOver = (e) => {
      if (e.target && e.target.closest && e.target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer')) {
        isHoveringRef.current = true;
      }
    };

    const handleMouseOut = (e) => {
      if (e.target && e.target.closest && e.target.closest('a, button, input, textarea, select, [role="button"], .cursor-pointer')) {
        isHoveringRef.current = false;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseover', handleMouseOver, { passive: true });
    document.addEventListener('mouseout', handleMouseOut, { passive: true });

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [isMobile]);

  if (isMobile) return null;

  const isAltTheme = bgType === 'particles' || bgType === 'glyph';

  return (
    <>
      {/* Ambient Screen Glow - GPU translated static gradient texture */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed top-0 left-0 -ml-[250px] -mt-[250px] w-[500px] h-[500px] rounded-full z-0 will-change-transform"
        style={{
          background: isAltTheme
            ? 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)'
            : 'radial-gradient(circle, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
          transform: 'translate3d(-500px, -500px, 0)',
        }}
      />

      {/* Main Cursor Dot - GPU hardware accelerated translate3d */}
      <div 
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 -ml-1 -mt-1 z-[9999] w-2 h-2 rounded-full will-change-transform transition-transform duration-100 ease-out"
        style={{
          transform: 'translate3d(-100px, -100px, 0) scale(1)',
          backgroundColor: isAltTheme ? '#fff' : '#10b981',
          boxShadow: isAltTheme ? '0 0 10px rgba(255,255,255,0.8)' : '0 0 10px rgba(16,185,129,0.8)',
        }}
      />
    </>
  );
}

