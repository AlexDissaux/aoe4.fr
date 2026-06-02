import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const desktopNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `px-3 py-1.5 text-sm rounded-md transition-colors ${
    isActive ? 'text-white bg-zinc-800' : 'text-zinc-400 hover:text-white hover:bg-zinc-800'
  }`;

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  `w-full block px-6 py-4 text-sm font-medium transition-colors ${
    isActive ? 'text-amber-400 bg-zinc-800/50' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/30'
  }`;

function BurgerIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col justify-center items-center w-5 h-5 gap-1.5">
      <span className={`block h-0.5 w-5 bg-white transition-all duration-200 ${open ? 'translate-y-2 rotate-45' : ''}`} />
      <span className={`block h-0.5 w-5 bg-white transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
      <span className={`block h-0.5 w-5 bg-white transition-all duration-200 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
    </div>
  );
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <NavLink to="/" className="text-sm font-black uppercase tracking-wider">
          AoE4<span className="text-amber-400">.fr</span>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden sm:flex gap-1">
          <NavLink to="/" end className={desktopNavLinkClass}>Accueil</NavLink>
          <NavLink to="/classement" className={desktopNavLinkClass}>Classement</NavLink>
          <NavLink to="/en-jeu" className={desktopNavLinkClass}>Qui joue ?</NavLink>
          <NavLink to="/twitch" className={desktopNavLinkClass}>Twitch</NavLink>
          <NavLink to="/youtube" className={desktopNavLinkClass}>YouTube</NavLink>
        </nav>

        {/* Mobile burger */}
        <button
          className="sm:hidden p-2 text-white"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Menu"
        >
          <BurgerIcon open={menuOpen} />
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <nav className="sm:hidden border-t border-zinc-800 bg-zinc-900">
          <NavLink to="/" end onClick={() => setMenuOpen(false)} className={mobileNavLinkClass}>Accueil</NavLink>
          <NavLink to="/classement" onClick={() => setMenuOpen(false)} className={mobileNavLinkClass}>Classement</NavLink>
          <NavLink to="/en-jeu" onClick={() => setMenuOpen(false)} className={mobileNavLinkClass}>Qui joue ?</NavLink>
          <NavLink to="/twitch" onClick={() => setMenuOpen(false)} className={mobileNavLinkClass}>Twitch</NavLink>
          <NavLink to="/youtube" onClick={() => setMenuOpen(false)} className={mobileNavLinkClass}>YouTube</NavLink>
        </nav>
      )}
    </header>
  );
}
