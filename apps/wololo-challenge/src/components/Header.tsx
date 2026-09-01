import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const TABS = [
    { to: '/',            label: 'Home',        end: true  },
    { to: '/podium',      label: 'Podium',      end: false },
    { to: '/leaderboard', label: 'Leaderboard', end: false },
    { to: '/milestones',  label: 'Milestones',  end: false },
    { to: '/kings',       label: 'Kings',        end: false },
    { to: '/challenges',  label: 'Challenges',  end: false },
    { to: '/live',        label: 'Live',        end: false },
    { to: '/twitch',      label: 'Twitch',      end: false },
    { to: '/sponsors',    label: 'Sponsors',    end: false },
    { to: '/rules',       label: 'Rules',       end: false },
];

function desktopClass({ isActive }: { isActive: boolean }) {
    return `px-4 h-full inline-flex items-center text-xs font-bold uppercase tracking-widest border-b-2 transition-colors ${
        isActive
            ? 'border-amber-300 text-amber-300'
            : 'border-transparent text-gray-400 hover:text-white hover:border-white/30'
    }`;
}

function mobileClass({ isActive }: { isActive: boolean }) {
    return `w-full block px-6 py-4 text-sm font-bold uppercase tracking-widest border-l-2 transition-colors ${
        isActive
            ? 'border-amber-300 text-amber-300 bg-amber-300/5'
            : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
    }`;
}

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
        <header className="sticky top-0 z-50 bg-black border-b border-white/10">
            {/* Main bar */}
            <div className="px-4 sm:px-6 flex items-center h-16">
                {/* Logo */}
                <img
                    src="/wololo-challenge-logo.png"
                    alt="Wololo Challenge"
                    className="h-10 w-auto flex-shrink-0"
                />

                {/* Desktop nav */}
                <nav className="hidden sm:flex items-stretch gap-1 h-16 ml-6">
                    {TABS.map(tab => (
                        <NavLink key={tab.to} to={tab.to} end={tab.end} className={desktopClass}>
                            {tab.to === '/live' ? (
                                <span className="inline-flex items-center gap-1.5">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    {tab.label}
                                </span>
                            ) : tab.label}
                        </NavLink>
                    ))}
                </nav>

                {/* Mobile burger */}
                <button
                    className="sm:hidden ml-auto p-2 text-white"
                    onClick={() => setMenuOpen(o => !o)}
                    aria-label="Toggle menu"
                >
                    <BurgerIcon open={menuOpen} />
                </button>
            </div>

            {/* Mobile dropdown */}
            {menuOpen && (
                <nav className="sm:hidden border-t border-white/10 bg-black">
                    {TABS.map(tab => (
                        <NavLink
                            key={tab.to}
                            to={tab.to}
                            end={tab.end}
                            onClick={() => setMenuOpen(false)}
                            className={mobileClass}
                        >
                            {tab.to === '/live' ? (
                                <span className="inline-flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                    {tab.label}
                                </span>
                            ) : tab.label}
                        </NavLink>
                    ))}
                </nav>
            )}
        </header>
    );
}
