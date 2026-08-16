import { useState, useEffect, useRef } from 'react';

export default function Navbar({ activeSection, onNavClick }) {
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'console', label: 'Console' },
    { id: 'contact', label: 'Contact' },
  ];

  const containerRef = useRef(null); // Mobile scroll container
  const desktopNavRef = useRef(null);
  const mobileNavRef = useRef(null);

  const [isVisible, setIsVisible] = useState(true);
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [mobileIndicatorStyle, setMobileIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);
  const moveTimeout = useRef(null);
  const hasMounted = useRef(false);

  // Track scroll direction to hide/show navbar on mobile
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsVisible(false); // Scrolling down
      } else if (currentScrollY < lastScrollY.current) {
        setIsVisible(true); // Scrolling up
      }

      lastScrollY.current = currentScrollY;

      // Clear previous timeout
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Show navbar if scrolling stops for 300ms
      scrollTimeout.current = setTimeout(() => {
        setIsVisible(true);
      }, 300);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  // Auto-scroll the active nav item to the center of the scrollbar on mobile
  useEffect(() => {
    if (!containerRef.current) return;
    const activeEl = containerRef.current.querySelector('[data-active="true"]');
    if (activeEl) {
      activeEl.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'center',
      });
    }
  }, [activeSection]);

  // Update Sliding Pill positions and trigger Zoom
  useEffect(() => {
    if (hasMounted.current) {
      // Trigger the zoom/stretch effect on movement
      setIsMoving(true);
      if (moveTimeout.current) clearTimeout(moveTimeout.current);
      moveTimeout.current = setTimeout(() => {
        setIsMoving(false);
      }, 1000); // Match the 1s page scroll duration
    } else {
      // Wait for a tiny delay on mount to allow layout to settle before marking as mounted
      setTimeout(() => { hasMounted.current = true; }, 100);
    }

    // Desktop indicator
    if (desktopNavRef.current) {
      const activeEl = desktopNavRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        setIndicatorStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1,
        });
      }
    }
    // Mobile indicator
    if (mobileNavRef.current) {
      const activeEl = mobileNavRef.current.querySelector('[data-active="true"]');
      if (activeEl) {
        setMobileIndicatorStyle({
          left: activeEl.offsetLeft,
          width: activeEl.offsetWidth,
          opacity: 1,
        });
      }
    }
  }, [activeSection]);


  return (
    <header className={`fixed bottom-4 md:bottom-8 left-1/2 z-50 w-[96%] md:w-max max-w-[95vw] p-1.5 md:p-2 flex items-center justify-between navbar-3d-glass rounded-full gap-2 md:gap-3 transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? 'translate-y-0 -translate-x-1/2' : 'translate-y-[150%] -translate-x-1/2 md:translate-y-0'}`}>

      {/* Desktop Nav Links (Visible on md and larger) */}
      <div className="hidden md:flex items-center gap-2 md:gap-3">
        <nav id="navLinks" ref={desktopNavRef} className="flex items-center h-full relative">
          {/* Fluid Glass Pill Indicator for Desktop */}
          <div
            className="absolute z-0 rounded-full pointer-events-none"
            style={{
              top: '-4px',
              bottom: '-4px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 40%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: '1px solid rgba(255,255,255,0.25)',
              boxShadow: 'inset 0 4px 8px -3px rgba(255,255,255,0.25), 0 4px 15px rgba(0,0,0,0.3)',
              left: `${indicatorStyle.left}px`,
              width: `${indicatorStyle.width}px`,
              opacity: indicatorStyle.opacity,
              transform: isMoving || hoveredItem === activeSection ? 'scaleX(1.6) scaleY(1.4)' : 'scale(1)',
              transition: 'all 1s cubic-bezier(0.34, 1.8, 0.64, 1)'
            }}
          />

          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <NavItem
                key={item.id}
                item={item}
                isActive={isActive}
                onNavClick={onNavClick}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
              />
            );
          })}
        </nav>
      </div>

      {/* Mobile Horizontal Scrolling Nav Links (Visible on screens smaller than md) */}
      <div className="flex md:hidden flex-1 items-center justify-end overflow-visible ml-2 min-w-0" ref={containerRef}>
        <nav
          ref={mobileNavRef}
          className="relative flex items-center gap-1 overflow-x-auto overflow-y-visible scrollbar-none scroll-smooth py-1 pr-2 w-full justify-start mask-fade-edges"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {/* Fluid Glass Pill Indicator for Mobile */}
          <div
            className="absolute z-0 rounded-full pointer-events-none"
            style={{
              top: '-2px',
              bottom: '-2px',
              background: 'linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 40%)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderTop: '1px solid rgba(255,255,255,0.25)',
              boxShadow: 'inset 0 4px 8px -3px rgba(255,255,255,0.25), 0 4px 15px rgba(0,0,0,0.3)',
              left: `${mobileIndicatorStyle.left}px`,
              width: `${mobileIndicatorStyle.width}px`,
              opacity: mobileIndicatorStyle.opacity,
              transform: isMoving || hoveredItem === activeSection ? 'scaleX(1.5) scaleY(1.3)' : 'scale(1)',
              transition: 'all 1s cubic-bezier(0.34, 1.8, 0.64, 1)'
            }}
          />

          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-id={item.id}
                data-active={isActive ? 'true' : 'false'}
                onClick={(e) => {
                  e.preventDefault();
                  if (onNavClick) onNavClick(item.id);
                }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className={`relative flex items-center justify-center shrink-0 text-center font-sans tracking-wide px-5 py-2 rounded-full transition-colors duration-300 z-10 ${isActive
                  ? 'text-emerald-400 text-xs font-bold'
                  : 'text-[11px] text-neutral-400 font-medium'
                  }`}
              >
                <span className="relative z-10 drop-shadow-md">
                  {item.label}
                </span>
              </a>
            );
          })}
        </nav>
      </div>

    </header>
  );
}

function NavItem({ item, isActive, onNavClick, onMouseEnter, onMouseLeave }) {
  return (
    <a
      href={`#${item.id}`}
      data-id={item.id}
      data-active={isActive ? 'true' : 'false'}
      onClick={(e) => {
        e.preventDefault();
        if (onNavClick) onNavClick(item.id);
      }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className={`relative h-full flex items-center justify-center px-4 md:px-5 py-2 md:py-2.5 rounded-full font-medium text-xs md:text-sm transition-colors duration-300 z-10 shrink-0 ${isActive
        ? 'text-emerald-400 font-bold'
        : 'text-neutral-400 hover:text-white'
        }`}
    >
      <span className="relative z-10 drop-shadow-md">
        {item.label}
      </span>
    </a>
  );
}
