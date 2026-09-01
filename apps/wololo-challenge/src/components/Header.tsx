import { useEffect, useRef, useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

interface NavLeaf {
    to: string;
    label: string;
}

interface NavSection {
    key: string;
    label: string;
    to?: string;
    end?: boolean;
    live?: boolean;
    children?: NavLeaf[];
}

const NAV: NavSection[] = [
    { key: 'home', label: 'Home', to: '/', end: true },
    {
        key: 'competition',
        label: 'Competition',
        children: [
            { to: '/podium', label: 'Podium' },
            { to: '/leaderboard', label: 'Leaderboard' },
            { to: '/milestones', label: 'Milestones' },
            { to: '/kings', label: 'Kings' },
            { to: '/challenges', label: 'Challenges' },
        ],
    },
    { key: 'live', label: 'Live Games', to: '/live-games', live: true },
    { key: 'twitch', label: 'Twitch', to: '/twitch' },
    {
        key: 'info',
        label: 'Info',
        children: [
            { to: '/sponsors', label: 'Sponsors' },
            { to: '/rules', label: 'Rules' },
        ],
    },
];

// Finds which group (if any) owns the current route, so its sub-nav can stay expanded.
function groupKeyForPath(pathname: string): string | null {
    return NAV.find(section => section.children?.some(leaf => leaf.to === pathname))?.key ?? null;
}

function desktopClass({ isActive }: { isActive: boolean }) {
    return `relative px-4 h-full inline-flex items-center text-xs font-bold uppercase tracking-widest transition-colors ${
        isActive
            ? 'text-amber-300'
            : 'text-gray-400 hover:text-white'
    } after:absolute after:left-4 after:right-4 after:bottom-0 after:h-[2px] after:rounded-full after:transition-all after:duration-300 ${
        isActive
            ? 'after:bg-gradient-to-r after:from-amber-400 after:to-amber-200 after:shadow-[0_0_8px_theme(colors.amber.400)]'
            : 'after:bg-transparent hover:after:bg-white/20'
    }`;
}

function groupTabClass(isActive: boolean) {
    return `relative px-4 h-full inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${
        isActive ? 'text-amber-300' : 'text-gray-400 hover:text-white'
    } after:absolute after:left-4 after:right-4 after:bottom-0 after:h-[2px] after:rounded-full after:transition-all after:duration-300 ${
        isActive
            ? 'after:bg-gradient-to-r after:from-amber-400 after:to-amber-200 after:shadow-[0_0_8px_theme(colors.amber.400)]'
            : 'after:bg-transparent hover:after:bg-white/20'
    }`;
}

function dropdownItemClass({ isActive }: { isActive: boolean }) {
    return `px-3.5 py-2 rounded-lg text-[11px] font-semibold uppercase tracking-wide transition-colors whitespace-nowrap ${
        isActive
            ? 'bg-amber-300/15 text-amber-300'
            : 'text-gray-400 hover:text-white hover:bg-white/5'
    }`;
}

function mobileClass({ isActive }: { isActive: boolean }) {
    return `w-full block px-6 py-4 text-sm font-bold uppercase tracking-widest border-l-2 transition-colors ${
        isActive
            ? 'border-amber-300 text-amber-300 bg-amber-300/5'
            : 'border-transparent text-gray-400 hover:text-white hover:bg-white/5'
    }`;
}

function mobileSubClass({ isActive }: { isActive: boolean }) {
    return `w-full block pl-10 pr-6 py-3 text-[13px] font-semibold uppercase tracking-wide border-l-2 transition-colors ${
        isActive
            ? 'border-amber-300 text-amber-300 bg-amber-300/5'
            : 'border-transparent text-gray-500 hover:text-white hover:bg-white/5'
    }`;
}

function LiveLabel({ label }: { label: string }) {
    return (
        <span className="inline-flex items-center gap-1.5">
            <span className="relative flex w-1.5 h-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-400" />
            </span>
            {label}
        </span>
    );
}

function ChevronIcon({ open }: { open: boolean }) {
    return (
        <svg viewBox="0 0 12 12" className={`w-2.5 h-2.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} fill="none">
            <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    );
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
    const location = useLocation();
    const navRef = useRef<HTMLElement>(null);

    // Desktop: which group's floating dropdown is currently open (only one at a time).
    const [openGroup, setOpenGroup] = useState<string | null>(null);
    // Mobile accordion: auto-expands the group containing the current route.
    const [openMobileGroup, setOpenMobileGroup] = useState<string | null>(() => groupKeyForPath(location.pathname));

    useEffect(() => {
        setOpenGroup(null);
        setOpenMobileGroup(groupKeyForPath(location.pathname));
    }, [location.pathname]);

    useEffect(() => {
        if (!openGroup) return;
        function handlePointerDown(e: MouseEvent) {
            if (navRef.current && !navRef.current.contains(e.target as Node)) {
                setOpenGroup(null);
            }
        }
        function handleKeyDown(e: KeyboardEvent) {
            if (e.key === 'Escape') setOpenGroup(null);
        }
        document.addEventListener('mousedown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);
        return () => {
            document.removeEventListener('mousedown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [openGroup]);

    return (
        <header className="sticky top-0 z-50 bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/80 border-b border-white/10">
            {/* Main bar */}
            <div className="px-4 sm:px-6 flex items-center h-16">
                {/* Logo */}
                <img
                    src="/wololo-challenge-logo.png"
                    alt="Wololo Challenge"
                    className="h-10 w-auto flex-shrink-0"
                />

                {/* Desktop nav */}
                <nav ref={navRef} className="hidden sm:flex items-stretch h-16 ml-6">
                    {NAV.map(section => {
                        if (section.children) {
                            const isOpen = openGroup === section.key;
                            const isActive = isOpen || section.children.some(leaf => leaf.to === location.pathname);
                            return (
                                <div key={section.key} className="relative flex">
                                    <button
                                        type="button"
                                        onClick={() => setOpenGroup(prev => (prev === section.key ? null : section.key))}
                                        className={groupTabClass(isActive)}
                                        aria-expanded={isOpen}
                                    >
                                        {section.label}
                                        <ChevronIcon open={isOpen} />
                                    </button>
                                    <div
                                        className={`absolute left-1/2 -translate-x-1/2 top-full mt-2 min-w-[10rem] origin-top rounded-xl border border-white/10 bg-black/95 backdrop-blur shadow-xl shadow-black/50 p-1.5 flex flex-col gap-0.5 z-50 transition-all duration-150 ${
                                            isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-95 pointer-events-none'
                                        }`}
                                    >
                                        {section.children.map(leaf => (
                                            <NavLink
                                                key={leaf.to}
                                                to={leaf.to}
                                                onClick={() => setOpenGroup(null)}
                                                className={dropdownItemClass}
                                            >
                                                {leaf.label}
                                            </NavLink>
                                        ))}
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <NavLink key={section.key} to={section.to!} end={section.end} className={desktopClass}>
                                {section.live ? <LiveLabel label={section.label} /> : section.label}
                            </NavLink>
                        );
                    })}
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
                    {NAV.map(section => {
                        if (section.children) {
                            const isOpen = openMobileGroup === section.key;
                            const isActive = section.children.some(leaf => leaf.to === location.pathname);
                            return (
                                <div key={section.key} className="border-b border-white/5 last:border-b-0">
                                    <button
                                        type="button"
                                        onClick={() => setOpenMobileGroup(prev => (prev === section.key ? null : section.key))}
                                        className={`w-full flex items-center justify-between px-6 py-4 text-sm font-bold uppercase tracking-widest transition-colors ${
                                            isActive ? 'text-amber-300' : 'text-gray-400 hover:text-white'
                                        }`}
                                        aria-expanded={isOpen}
                                    >
                                        {section.label}
                                        <ChevronIcon open={isOpen} />
                                    </button>
                                    <div
                                        className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                                            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                        }`}
                                    >
                                        <div className="overflow-hidden">
                                            {section.children.map(leaf => (
                                                <NavLink
                                                    key={leaf.to}
                                                    to={leaf.to}
                                                    onClick={() => setMenuOpen(false)}
                                                    className={mobileSubClass}
                                                >
                                                    {leaf.label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            );
                        }
                        return (
                            <NavLink
                                key={section.key}
                                to={section.to!}
                                end={section.end}
                                onClick={() => setMenuOpen(false)}
                                className={mobileClass}
                            >
                                {section.live ? <LiveLabel label={section.label} /> : section.label}
                            </NavLink>
                        );
                    })}
                </nav>
            )}
        </header>
    );
}
