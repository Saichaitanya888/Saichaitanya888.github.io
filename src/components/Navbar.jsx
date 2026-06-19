import { useState } from 'react';

export default function Navbar({ activeSection }) {
  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'console', label: 'Console' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-12 flex items-center justify-between backdrop-blur-md bg-black/40 border-b border-neutral-900/40">
        <a
          href="#hero"
          className="relative inline-block font-bold tracking-wide text-sm md:text-base transition-transform duration-300 hover:scale-105 whitespace-nowrap py-2 px-1"
        >
          <span className="btn-shine">
            <span className="md:hidden">Sai</span>
            <span className="hidden md:inline">Shanmukha Sai Chaitanya</span>
          </span>
        </a>

        {/* Desktop Nav Links */}
        <nav id="navLinks" className="hidden md:flex items-center gap-3 md:gap-4">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return <NavItem key={item.id} item={item} isActive={isActive} />;
          })}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={toggleMenu}
          className="flex md:hidden flex-col justify-center items-center w-10 h-10 rounded-xl bg-neutral-900/60 border border-neutral-800/80 text-white transition-all duration-300 focus:outline-none z-50 cursor-pointer"
          aria-label="Toggle Menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span className={`h-0.5 w-full bg-emerald-400 rounded-full transition-transform duration-300 origin-left ${isMenuOpen ? 'rotate-45 translate-x-[2px]' : ''}`}></span>
            <span className={`h-0.5 w-full bg-emerald-400 rounded-full transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}></span>
            <span className={`h-0.5 w-full bg-emerald-400 rounded-full transition-transform duration-300 origin-left ${isMenuOpen ? '-rotate-45 translate-x-[2px] -translate-y-[1px]' : ''}`}></span>
          </div>
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black/95 backdrop-blur-lg flex flex-col items-center justify-center gap-8 transition-all duration-500 md:hidden ${
          isMenuOpen ? 'opacity-100 pointer-events-auto translate-y-0' : 'opacity-0 pointer-events-none -translate-y-full'
        }`}
      >
        <div className="flex flex-col items-center gap-6">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setIsMenuOpen(false)}
                className={`text-2xl font-bold tracking-wider transition-all duration-300 py-2 ${
                  isActive 
                    ? 'text-emerald-400 scale-110 drop-shadow-[0_0_12px_rgba(16,185,129,0.35)]' 
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>
      </div>
    </>
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
