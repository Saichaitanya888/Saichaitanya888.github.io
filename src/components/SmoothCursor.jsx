import { useEffect, useRef } from "react";

export function SmoothCursor() {
  const cursorRef = useRef(null);
  const position = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const requestRef = useRef(null);

  useEffect(() => {
    // Check if it's a touch device
    if (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window) {
      return;
    }

    const handleMouseMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const animate = () => {
      // Smooth lerping (spring-like physics used by Magic UI)
      position.current.x += (target.current.x - position.current.x) * 0.15;
      position.current.y += (target.current.y - position.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${position.current.x}px, ${position.current.y}px, 0) translate(-50%, -50%)`;
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[10000] h-8 w-8 rounded-full border-2 border-white bg-white/20 mix-blend-difference hidden md:block"
      style={{
        transform: "translate3d(-100px, -100px, 0) translate(-50%, -50%)",
      }}
    />
  );
}
