import { useState, useRef, useEffect } from 'react';
import { CurrentGame } from '@aoe4.fr/shared-types';
import { CivFlag } from '@aoe4.fr/ui';

function formatLeaderboard(leaderboard: string): string {
    return leaderboard.replace(/_/g, ' ').toUpperCase();
}

function PopupContent({ game }: { game: CurrentGame }) {
    return (
        <>
            {/* Header */}
            <div className="px-3 py-2 border-b border-gray-800 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <span className="font-bold text-green-400 uppercase tracking-widest text-[10px]">Live</span>
                <span className="ml-auto text-gray-500 font-semibold">{formatLeaderboard(game.leaderboard)}</span>
            </div>

            {/* Map */}
            <div className="px-3 py-1.5 text-amber-300 font-bold text-center border-b border-gray-800 truncate tracking-wide">
                {game.map}
            </div>

            {/* Teams with VS between them */}
            <div className="flex items-stretch">
                <div className="flex-1 py-2 px-2 space-y-1 min-w-0">
                    {game.teams[0]?.map((p, pi) => (
                        <div key={pi} className="flex items-center gap-1.5 min-w-0">
                            <CivFlag civilization={p.civilization} className="w-5 h-auto flex-shrink-0 rounded-sm" />
                            <span className="text-gray-200 truncate flex-1">{p.name}</span>
                            {p.rating != null && (
                                <span className="text-amber-400 font-bold tabular-nums flex-shrink-0">{p.rating}</span>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex items-center px-1.5 text-gray-600 font-black text-[10px] tracking-widest border-x border-gray-800 flex-shrink-0">
                    VS
                </div>

                <div className="flex-1 py-2 px-2 space-y-1 min-w-0">
                    {game.teams[1]?.map((p, pi) => (
                        <div key={pi} className="flex items-center gap-1.5 min-w-0">
                            <CivFlag civilization={p.civilization} className="w-5 h-auto flex-shrink-0 rounded-sm" />
                            <span className="text-gray-200 truncate flex-1">{p.name}</span>
                            {p.rating != null && (
                                <span className="text-amber-400 font-bold tabular-nums flex-shrink-0">{p.rating}</span>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

interface LiveIndicatorProps {
    game: CurrentGame;
}

export function LiveIndicator({ game }: LiveIndicatorProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!open) return;
        function handleClickOutside(e: MouseEvent) {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [open]);

    return (
        <div
            ref={ref}
            className="relative inline-flex flex-shrink-0"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            {/* "IN GAME" button */}
            <button
                className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-green-400 border border-green-500/40 bg-green-950/40 hover:bg-green-950/70 transition-colors cursor-pointer focus:outline-none"
                onClick={() => setOpen(o => !o)}
                aria-label="In game"
                type="button"
            >
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                In game
            </button>

            {/* Popup — fixed on mobile (centered), absolute on desktop */}
            {open && (
                <>
                    {/* Mobile: fixed full-width bottom sheet */}
                    <div className="sm:hidden fixed inset-x-3 bottom-4 z-50 bg-gray-950 border border-green-500/30 shadow-2xl text-xs">
                        <PopupContent game={game} />
                    </div>

                    {/* Desktop: absolute above the button */}
                    <div className="hidden sm:block absolute bottom-full right-0 mb-2 z-50 w-64 bg-gray-950 border border-green-500/30 shadow-xl shadow-black/60 text-xs">
                        <PopupContent game={game} />
                    </div>
                </>
            )}
        </div>
    );
}
