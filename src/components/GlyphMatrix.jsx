import { useEffect, useRef, useState } from 'react';

export default function GlyphMatrix({
  className = '',
  glyphs = "01·•+*/\\<>=",
  cellSize = 14,
  mutationRate = 0.04,
  interval = 90,
  fadeBottom = 0.6,
  color = '#ffffff',
}) {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const context = useRef(null);
  const grid = useRef([]);
  const canvasSize = useRef({ w: 0, h: 0, cols: 0, rows: 0 });
  const animationFrameId = useRef(null);
  const lastTime = useRef(0);
  const dpr = typeof window !== 'undefined' ? window.devicePixelRatio : 1;

  useEffect(() => {
    if (canvasRef.current) {
      context.current = canvasRef.current.getContext('2d');
    }
    initCanvas();
    animate();
    window.addEventListener('resize', initCanvas);
    
    return () => {
      window.removeEventListener('resize', initCanvas);
      if (animationFrameId.current) {
        window.cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [color]);

  const initCanvas = () => {
    if (containerRef.current && canvasRef.current && context.current) {
      canvasSize.current.w = containerRef.current.offsetWidth;
      canvasSize.current.h = containerRef.current.offsetHeight;
      canvasRef.current.width = canvasSize.current.w * dpr;
      canvasRef.current.height = canvasSize.current.h * dpr;
      canvasRef.current.style.width = `${canvasSize.current.w}px`;
      canvasRef.current.style.height = `${canvasSize.current.h}px`;
      context.current.scale(dpr, dpr);
      
      canvasSize.current.cols = Math.floor(canvasSize.current.w / cellSize);
      canvasSize.current.rows = Math.floor(canvasSize.current.h / cellSize);
      
      // Initialize grid
      grid.current = [];
      for (let i = 0; i < canvasSize.current.cols; i++) {
        grid.current[i] = [];
        for (let j = 0; j < canvasSize.current.rows; j++) {
          grid.current[i][j] = {
            char: getRandomGlyph(),
            opacity: Math.random() * 0.5,
          };
        }
      }
      drawMatrix();
    }
  };

  const getRandomGlyph = () => {
    // 60% chance to be empty for a sparser look, or just return random
    if (Math.random() > 0.4) return ' ';
    return glyphs[Math.floor(Math.random() * glyphs.length)];
  };

  const drawMatrix = () => {
    if (!context.current) return;
    
    const ctx = context.current;
    ctx.clearRect(0, 0, canvasSize.current.w, canvasSize.current.h);
    
    ctx.font = `${cellSize - 2}px monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const r = parseInt(color.slice(1, 3), 16) || 255;
    const g = parseInt(color.slice(3, 5), 16) || 255;
    const b = parseInt(color.slice(5, 7), 16) || 255;

    for (let i = 0; i < canvasSize.current.cols; i++) {
      for (let j = 0; j < canvasSize.current.rows; j++) {
        const cell = grid.current[i][j];
        if (cell.char === ' ') continue;

        // Apply fadeBottom if needed (fade out towards bottom)
        let finalOpacity = cell.opacity;
        if (fadeBottom > 0) {
          const fadeStartRow = canvasSize.current.rows * (1 - fadeBottom);
          if (j > fadeStartRow) {
            const distance = j - fadeStartRow;
            const maxDistance = canvasSize.current.rows - fadeStartRow;
            finalOpacity *= (1 - (distance / maxDistance));
          }
        }

        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${finalOpacity})`;
        const x = i * cellSize + cellSize / 2;
        const y = j * cellSize + cellSize / 2;
        ctx.fillText(cell.char, x, y);
      }
    }
  };

  const animate = (timestamp) => {
    if (!lastTime.current) lastTime.current = timestamp;
    
    const elapsed = timestamp - lastTime.current;
    
    if (elapsed > interval) {
      lastTime.current = timestamp;
      
      // Mutate
      for (let i = 0; i < canvasSize.current.cols; i++) {
        for (let j = 0; j < canvasSize.current.rows; j++) {
          if (Math.random() < mutationRate) {
            grid.current[i][j].char = getRandomGlyph();
            grid.current[i][j].opacity = Math.random() * 0.8;
          }
        }
      }
      drawMatrix();
    }
    
    animationFrameId.current = window.requestAnimationFrame(animate);
  };

  return (
    <div className={className} ref={containerRef} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full pointer-events-none" />
    </div>
  );
}
