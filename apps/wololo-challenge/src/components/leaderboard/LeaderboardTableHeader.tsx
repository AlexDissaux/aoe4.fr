import { SortKey } from './leaderboard.types';

interface LeaderboardTableHeaderProps {
    sortBy: SortKey;
    onSortChange: (key: SortKey) => void;
}

export function LeaderboardTableHeader({ sortBy, onSortChange }: LeaderboardTableHeaderProps) {
    return (
        <div className="hidden lg:grid grid-cols-12 gap-2 px-4 py-3 border-b border-gray-700/50 text-gray-400 text-xs font-bold uppercase tracking-wider">
            <div className="col-span-1 text-center">#</div>
            <div className="col-span-3">Player</div>
            <div className="col-span-2">Team</div>
            <button
                onClick={() => onSortChange('winrate')}
                className={`col-span-2 text-center hover:text-yellow-400 transition-colors ${sortBy === 'winrate' ? 'text-yellow-400' : ''}`}
            >
                Win Rate {sortBy === 'winrate' && '▼'}
            </button>
            <button
                onClick={() => onSortChange('games')}
                className={`col-span-1 text-center hover:text-blue-400 transition-colors ${sortBy === 'games' ? 'text-blue-400' : ''}`}
            >
                Games {sortBy === 'games' && '▼'}
            </button>
            <div className="col-span-2 text-center">V / D</div>
            <button
                onClick={() => onSortChange('civs')}
                className={`col-span-1 text-center hover:text-amber-400 transition-colors ${sortBy === 'civs' ? 'text-amber-400' : ''}`}
            >
                Civs {sortBy === 'civs' && '▼'}
            </button>
        </div>
    );
}
