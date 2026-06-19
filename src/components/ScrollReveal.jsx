import { useEffect, useRef, useState } from 'react';

export default function ScrollReveal({ children, className = '', animation = 'fade-up', delay = 0, duration = 500 }) {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) {
            observer.unobserve(domRef.current);
          }
        }
      },
      {
        root: null,
        rootMargin: '0px 0px -5% 0px', // trigger sooner as it enters the viewport
        threshold: 0.05, // trigger when at least 5% is visible
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getAnimationClass = () => {
    switch (animation) {
      case 'fade-up':
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
      case 'fade-in':
        return isVisible ? 'opacity-100' : 'opacity-0';
      case 'slide-left':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12';
      case 'slide-right':
        return isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12';
      case 'zoom-in':
        return isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95';
      default:
        return isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8';
    }
  };

  return (
    <div
      ref={domRef}
      className={`transition-all ease-out ${getAnimationClass()} ${className}`}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`
      }}
    >
      {children}
    </div>
  );
}

