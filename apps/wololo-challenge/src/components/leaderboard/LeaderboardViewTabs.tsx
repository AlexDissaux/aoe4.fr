import { LeaderboardView } from './leaderboard.types';

interface LeaderboardViewTabsProps {
    view: LeaderboardView;
    onViewChange: (view: LeaderboardView) => void;
}

export function LeaderboardViewTabs({ view, onViewChange }: LeaderboardViewTabsProps) {
    return (
        <div className="relative inline-flex p-1 rounded-full bg-gray-900/80 border-2 border-amber-400/40 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
            <button
                onClick={() => onViewChange('players')}
                className={`px-6 py-2.5 rounded-full text-sm sm:text-base font-extrabold uppercase tracking-wider transition-all ${
                    view === 'players'
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 shadow-lg'
                        : 'text-gray-300 hover:text-amber-300'
                }`}
            >
                👤 Players
            </button>
            <button
                onClick={() => onViewChange('teams')}
                className={`relative px-6 py-2.5 rounded-full text-sm sm:text-base font-extrabold uppercase tracking-wider transition-all ${
                    view === 'teams'
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 shadow-lg'
                        : 'text-gray-300 hover:text-amber-300'
                }`}
            >
                🛡️ Teams
            </button>
        </div>
    );
}
