import { useEffect, useState } from 'react';

export default function MorphingText({ texts, className = '' }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % texts.length);
    }, 3000); // 3 second cycle
    return () => clearInterval(interval);
  }, [texts.length]);

  return (
    <>
      <div 
        className={`relative inline-flex justify-center items-center align-bottom ${className}`}
      >
        {texts.map((text, i) => (
          <span
            key={i}
            className="absolute left-0 right-0 w-full text-center transition-all duration-[1500ms] ease-in-out"
            style={{
              opacity: index === i ? 1 : 0,
              // The active text has no blur, inactive text is heavily blurred.
              filter: index === i ? 'blur(0px)' : 'blur(12px)',
              pointerEvents: index === i ? 'auto' : 'none',
              transform: index === i ? 'scale(1)' : 'scale(0.8)',
            }}
          >
            {text}
          </span>
        ))}
        {/* Invisible placeholder to give the container correct physical width based on longest word */}
        <span className="opacity-0 pointer-events-none whitespace-nowrap px-1">
          {texts.reduce((a, b) => a.length > b.length ? a : b, "")}
        </span>
      </div>
    </>
  );
}
