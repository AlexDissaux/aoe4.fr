import { SortKey } from './leaderboard.types';

interface LeaderboardTableHeaderProps {
    sortBy: SortKey;
    onSortChange: (key: SortKey) => void;
}

export function LeaderboardTableHeader({ sortBy, onSortChange }: LeaderboardTableHeaderProps) {
    return (
        <div className="hidden lg:grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-700/50 text-gray-400 text-xs font-bold uppercase tracking-wider">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-4">Player</div>
            <div className="col-span-2">Team</div>
            <button
                onClick={() => onSortChange('wins')}
                className={`col-span-2 text-center hover:text-green-400 transition-colors ${sortBy === 'wins' ? 'text-green-400' : ''}`}
            >
                Wins {sortBy === 'wins' && '▼'}
            </button>
            <button
                onClick={() => onSortChange('civs')}
                className={`col-span-1 text-center hover:text-amber-400 transition-colors ${sortBy === 'civs' ? 'text-amber-400' : ''}`}
            >
                Civs {sortBy === 'civs' && '▼'}
            </button>
            <button
                onClick={() => onSortChange('maps')}
                className={`col-span-1 text-center hover:text-cyan-400 transition-colors ${sortBy === 'maps' ? 'text-cyan-400' : ''}`}
            >
                Maps {sortBy === 'maps' && '▼'}
            </button>
            <button
                onClick={() => onSortChange('challenges')}
                className={`col-span-1 text-center hover:text-purple-400 transition-colors ${sortBy === 'challenges' ? 'text-purple-400' : ''}`}
            >
                Challenges {sortBy === 'challenges' && '▼'}
            </button>
        </div>
    );
}
