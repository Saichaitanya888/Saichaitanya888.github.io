import { useEffect, useRef } from 'react';

export default function FlickeringCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const isMobile = window.innerWidth < 768;
    const squareSize = isMobile ? 3 : 4;
    const gridGap = isMobile ? 8 : 6;
    const color = { r: 107, g: 114, b: 128 };
    const maxOpacity = 0.35;
    const flickerChance = 0.02;
    const updateInterval = 80;

    let cols = 0;
    let rows = 0;
    let gridSquares = [];
    let lastUpdateTime = 0;
    let animationFrameId = null;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      cols = Math.floor(canvas.width / (squareSize + gridGap));
      rows = Math.floor(canvas.height / (squareSize + gridGap));
      gridSquares = Array.from({ length: cols * rows }, () => Math.random() * maxOpacity);
    };

    const animate = (currentTime) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const shouldUpdateGrid = currentTime - lastUpdateTime >= updateInterval;
      if (shouldUpdateGrid) lastUpdateTime = currentTime;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const index = r * cols + c;
          if (shouldUpdateGrid && Math.random() < flickerChance) {
            gridSquares[index] = Math.random() * maxOpacity;
          }
          ctx.fillStyle = `rgba(${color.r}, ${color.g}, ${color.b}, ${gridSquares[index]})`;
          ctx.fillRect(c * (squareSize + gridGap), r * (squareSize + gridGap), squareSize, squareSize);
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    animationFrameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="flickeringCanvas"
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
    />
  );
}
