import { SortKey } from './leaderboard.types';
import { TEAMS, TEAM_COLORS } from './teamColors';

interface LeaderboardFiltersProps {
    selectedTeam: string | null;
    onTeamChange: (team: string | null) => void;
    search: string;
    onSearchChange: (value: string) => void;
    sortBy: SortKey;
    onSortChange: (key: SortKey) => void;
}

function SortButton({ label, value, color, sortBy, onSortChange }: {
    label: string;
    value: SortKey;
    color: string;
    sortBy: SortKey;
    onSortChange: (key: SortKey) => void;
}) {
    return (
        <button
            onClick={() => onSortChange(value)}
            className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all whitespace-nowrap ${
                sortBy === value
                    ? `${color} bg-white/10`
                    : 'border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-300'
            }`}
        >
            {label} {sortBy === value && '▼'}
        </button>
    );
}

export function LeaderboardFilters({
    selectedTeam,
    onTeamChange,
    search,
    onSearchChange,
    sortBy,
    onSortChange,
}: LeaderboardFiltersProps) {
    return (
        <>
            {/* Team filter */}
            <div className="flex flex-wrap gap-2 justify-center mb-4">
                <button
                    onClick={() => onTeamChange(null)}
                    className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider border transition-all ${
                        selectedTeam === null
                            ? 'border-white text-white bg-white/10'
                            : 'border-gray-600 text-gray-400 hover:border-gray-400 hover:text-gray-300'
                    }`}
                >
                    All teams
                </button>
                {TEAMS.map(teamName => {
                    const c = TEAM_COLORS[teamName] ?? { border: 'border-gray-500', text: 'text-gray-400', bg: 'hover:bg-gray-500/10', activeBg: 'bg-gray-500/20' };
                    const isActive = selectedTeam === teamName;
                    return (
                        <button
                            key={teamName}
                            onClick={() => onTeamChange(isActive ? null : teamName)}
                            className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider border transition-all ${c.border} ${c.text} ${
                                isActive ? c.activeBg : `bg-transparent ${c.bg}`
                            }`}
                        >
                            {teamName}
                        </button>
                    );
                })}
            </div>

            {/* Search */}
            <div className="flex justify-center mb-6">
                <div className="relative w-full max-w-sm">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                    <input
                        type="text"
                        placeholder="Search a player..."
                        value={search}
                        onChange={e => onSearchChange(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-600 text-white placeholder-gray-500 pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
            </div>

            {/* Mobile sort */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1 justify-center lg:hidden">
                <SortButton label="Winrate" value="winrate" color="border-yellow-400 text-yellow-400" sortBy={sortBy} onSortChange={onSortChange} />
                <SortButton label="Games"   value="games"   color="border-blue-400 text-blue-400"     sortBy={sortBy} onSortChange={onSortChange} />
                <SortButton label="Civs"    value="civs"    color="border-amber-400 text-amber-400"   sortBy={sortBy} onSortChange={onSortChange} />
            </div>
        </>
    );
}
