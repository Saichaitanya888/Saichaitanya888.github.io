import { useState, useEffect, useRef } from 'react';

export default function Navbar({ activeSection, bgType, setBgType }) {
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'console', label: 'Console' },
    { id: 'contact', label: 'Contact' },
  ];

  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef(null);

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

  const cycleBgType = () => {
    if (bgType === 'flicker') setBgType('particles');
    else if (bgType === 'particles') setBgType('glyph');
    else setBgType('flicker');
  };

  const getBgIcon = (type, className) => {
    if (type === 'particles') {
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
        </svg>
      );
    } else if (type === 'glyph') {
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      );
    } else {
      return (
        <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      );
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 px-2 sm:px-4 py-3 md:py-4 md:px-12 flex items-center justify-between bg-neutral-950 border-b border-neutral-900/40 gap-2 transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 md:translate-y-0 md:opacity-100'}`}>
      {/* Left Side: Logo & Mobile Toggle */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Brand logo */}
        <a
          href="#hero"
          className="relative inline-block font-bold tracking-wide text-sm md:text-base transition-transform duration-300 hover:scale-105 whitespace-nowrap py-2 px-1 shrink-0"
        >
          <span className="btn-shine">
            <span className="md:hidden">Sai</span>
            <span className="hidden md:inline">Shanmukha Sai Chaitanya</span>
          </span>
        </a>

        {/* Mobile Background Toggle Button (Moved here so it's always visible and clickable) */}
        <button
          onClick={cycleBgType}
          className="md:hidden p-1.5 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-emerald-400 shrink-0 cursor-pointer relative z-[60]"
          title={`Current: ${bgType}. Click to switch theme.`}
        >
          {getBgIcon(bgType, "w-4 h-4")}
        </button>
      </div>

      {/* Desktop Nav Links (Visible on md and larger) */}
      <div className="hidden md:flex items-center gap-3 md:gap-4">
        <nav id="navLinks" className="flex items-center gap-3 md:gap-4">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return <NavItem key={item.id} item={item} isActive={isActive} />;
          })}
        </nav>
        {/* Background Toggle Button */}
        <button
          onClick={cycleBgType}
          className="relative group p-2 ml-2 rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-400 hover:text-emerald-400 hover:border-emerald-500/50 transition-all duration-300 flex items-center justify-center"
          title={`Current: ${bgType}. Click to switch theme.`}
        >
          {getBgIcon(bgType, "w-5 h-5 transition-transform duration-500 group-hover:scale-110")}
        </button>
      </div>

      {/* Mobile Horizontal Scrolling Nav Links (Visible on screens smaller than md) */}
      <div className="flex md:hidden flex-1 items-center justify-end overflow-hidden ml-2">
        <nav
          ref={containerRef}
          className="flex items-center gap-5 overflow-x-auto scrollbar-none scroll-smooth py-1 pr-2 w-full justify-start mask-fade-edges"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                data-active={isActive ? 'true' : 'false'}
                className={`transition-all duration-300 ease-out shrink-0 text-center font-sans tracking-wide ${
                  isActive
                    ? 'text-xs text-emerald-400 font-bold scale-110 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]'
                    : 'text-[10px] text-neutral-500 font-medium scale-90'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function NavItem({ item, isActive }) {
  const [isHovered, setIsHovered] = useState(false);

  const getFilterStyle = () => {
    if (isActive) {
      return 'drop-shadow(0 2px 4px rgba(16, 185, 129, 0.4))';
    }
    if (isHovered) {
      return 'drop-shadow(0 0 10px rgba(16, 185, 129, 0.4))';
    }
    return 'none';
  };

  return (
    <div className="relative group">
      <a
        href={`#${item.id}`}
        className={`relative inline-block p-px font-medium text-xs md:text-sm rounded-2xl transition-all duration-300 hover:scale-105 ${
          isActive ? 'text-white' : 'text-neutral-400'
        }`}
        style={{ filter: getFilterStyle() }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Gradient Border - Hidden when active */}
        <span
          className={`absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-600 p-[1px] transition-opacity duration-500 ${
            isActive ? 'hidden' : 'opacity-0 group-hover:opacity-100'
          }`}
        />

        {/* Inner block */}
        <span
          className={`relative z-10 block px-2 py-2 md:px-3 rounded-2xl transition-all duration-500 ${
            isActive
              ? 'bg-transparent text-emerald-300 font-semibold'
              : 'bg-gray-950/40 group-hover:bg-gray-950'
          }`}
        >
          {item.label}
        </span>

        {/* Underline Glow */}
        <span
          className={`underline-glow absolute -bottom-1 left-1/2 -translate-x-1/2 w-4/5 h-[2px] bg-gradient-to-r from-emerald-500 via-cyan-500 to-sky-600 rounded-full transition-all duration-300 ${
            isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
          }`}
          style={{ transition: 'all 0.3s ease-in-out' }}
        />
      </a>
    </div>
  );
}
