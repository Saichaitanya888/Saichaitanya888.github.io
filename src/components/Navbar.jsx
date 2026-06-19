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

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-4 py-4 md:px-12 flex items-center justify-between backdrop-blur-sm bg-black/5">
      <a
        href="#hero"
        className="relative inline-block font-bold tracking-wide text-sm md:text-base transition-transform duration-300 hover:scale-105 whitespace-nowrap py-2 px-1"
      >
        <span className="btn-shine">
          <span className="md:hidden">Sai</span>
          <span className="hidden md:inline">Shanmukha Sai Chaitanya</span>
        </span>
      </a>
      <nav id="navLinks" className="flex items-center gap-3 md:gap-4">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return <NavItem key={item.id} item={item} isActive={isActive} />;
        })}
      </nav>
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
