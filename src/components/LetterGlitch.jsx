import { useRef, useEffect, useCallback } from 'react';

const LetterGlitch = ({
  glitchColors = ['#2b4539', '#61dca3', '#61b3dc'],
  className = '',
  glitchSpeed = 70,
  centerVignette = false,
  outerVignette = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'
}) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const letters = useRef([]);
  const grid = useRef({ columns: 0, rows: 0, width: 0, height: 0 });
  const context = useRef(null);
  const lastGlitchTime = useRef(0);
  const isTabVisible = useRef(true);

  const lettersAndSymbols = Array.from(characters);

  const fontSize = 18;
  const charWidth = 12;
  const charHeight = 22;

  const getRandomChar = () => {
    return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
  };

  const getRandomColor = () => {
    return glitchColors[Math.floor(Math.random() * glitchColors.length)];
  };

  const calculateGrid = (width, height) => {
    const columns = Math.ceil(width / charWidth);
    const rows = Math.ceil(height / charHeight);
    return { columns, rows, width, height };
  };

  const initializeLetters = (columns, rows) => {
    grid.current = { ...grid.current, columns, rows };
    const totalLetters = columns * rows;
    letters.current = Array.from({ length: totalLetters }, () => ({
      char: getRandomChar(),
      color: getRandomColor(),
    }));
  };

  // Draw a single cell efficiently
  const drawCell = (ctx, index) => {
    const letter = letters.current[index];
    if (!letter) return;
    const { columns } = grid.current;
    const x = (index % columns) * charWidth;
    const y = Math.floor(index / columns) * charHeight;

    // Clear just this character cell
    ctx.clearRect(x, y, charWidth, charHeight);
    ctx.fillStyle = letter.color;
    ctx.fillText(letter.char, x, y);
  };

  // Initial full draw (only happens on mount or window resize)
  const drawAllLetters = () => {
    const ctx = context.current;
    const canvas = canvasRef.current;
    if (!ctx || !canvas || letters.current.length === 0) return;

    const { width, height } = canvas.getBoundingClientRect();
    ctx.clearRect(0, 0, width, height);
    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = 'top';

    for (let index = 0; index < letters.current.length; index++) {
      const letter = letters.current[index];
      const x = (index % grid.current.columns) * charWidth;
      const y = Math.floor(index / grid.current.columns) * charHeight;
      ctx.fillStyle = letter.color;
      ctx.fillText(letter.char, x, y);
    }
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2); // Cap at 2x for high-DPI performance
    const rect = parent.getBoundingClientRect();

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    if (context.current) {
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    const { columns, rows } = calculateGrid(rect.width, rect.height);
    initializeLetters(columns, rows);
    drawAllLetters();
  };

  // Update and redraw only the glitched cells (drastically reduces CPU & GPU load)
  const updateRandomLetters = () => {
    const ctx = context.current;
    if (!ctx || !letters.current || letters.current.length === 0) return;

    ctx.font = `${fontSize}px monospace`;
    ctx.textBaseline = 'top';

    // Update ~2.5% of characters per glitch tick (max 40 for optimal performance)
    const updateCount = Math.min(40, Math.max(2, Math.floor(letters.current.length * 0.025)));

    for (let i = 0; i < updateCount; i++) {
      const index = Math.floor(Math.random() * letters.current.length);
      const letter = letters.current[index];
      if (!letter) continue;

      letter.char = getRandomChar();
      letter.color = getRandomColor();
      drawCell(ctx, index);
    }
  };

  const animate = useCallback((timestamp) => {
    if (!isTabVisible.current) return;

    if (timestamp - lastGlitchTime.current >= glitchSpeed) {
      updateRandomLetters();
      lastGlitchTime.current = timestamp;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [glitchSpeed]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    context.current = canvas.getContext('2d', { alpha: true });
    resizeCanvas();
    lastGlitchTime.current = performance.now();
    animationRef.current = requestAnimationFrame(animate);

    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        cancelAnimationFrame(animationRef.current);
        resizeCanvas();
        lastGlitchTime.current = performance.now();
        animationRef.current = requestAnimationFrame(animate);
      }, 150);
    };

    const handleVisibility = () => {
      isTabVisible.current = !document.hidden;
      if (isTabVisible.current) {
        lastGlitchTime.current = performance.now();
        cancelAnimationFrame(animationRef.current);
        animationRef.current = requestAnimationFrame(animate);
      } else {
        cancelAnimationFrame(animationRef.current);
      }
    };

    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [animate]);

  const containerStyle = {
    position: 'relative',
    width: '100%',
    height: '100%',
    backgroundColor: '#000000',
    overflow: 'hidden',
    contain: 'strict',
    transform: 'translateZ(0)',
  };

  const canvasStyle = {
    display: 'block',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  };

  const outerVignetteStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)'
  };

  const centerVignetteStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)'
  };

  return (
    <div style={containerStyle} className={className}>
      <canvas ref={canvasRef} style={canvasStyle} />
      {outerVignette && <div style={outerVignetteStyle}></div>}
      {centerVignette && <div style={centerVignetteStyle}></div>}
    </div>
  );
};

export default LetterGlitch;