import { useState, useEffect } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isMobile, setIsMobile] = useState(true);

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
  useEffect(() => {
    if (isMobile) return;

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  if (isMobile) return null;

  return (
    /* Trailing Ambient Emerald Screen Glow */
    <div
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: `radial-gradient(550px circle at ${position.x}px ${position.y}px, rgba(16, 185, 129, 0.13), transparent 75%)`,
      }}
    />
  );
}
