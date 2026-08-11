import { IWololoTeam } from '@aoe4.fr/shared-types';
import { SortKey } from './leaderboard.types';
import { COLOR_PALETTE, DEFAULT_TEAM_COLOR } from './teamColors';

interface LeaderboardFiltersProps {
    teams: IWololoTeam[];
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
    teams,
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
                {teams.map(team => {
                    const c = COLOR_PALETTE[team.color] ?? DEFAULT_TEAM_COLOR;
                    const isActive = selectedTeam === team.id;
                    return (
                        <button
                            key={team.id}
                            onClick={() => onTeamChange(isActive ? null : team.id)}
                            className={`px-4 py-2 text-xs sm:text-sm font-bold uppercase tracking-wider border transition-all ${c.border} ${c.text} ${
                                isActive ? c.activeBg : `bg-transparent ${c.bg}`
                            }`}
                        >
                            {team.name}
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
                <SortButton label="Wins" value="wins" color="border-green-400 text-green-400" sortBy={sortBy} onSortChange={onSortChange} />
                <SortButton label="Civs" value="civs" color="border-amber-400 text-amber-400" sortBy={sortBy} onSortChange={onSortChange} />
                <SortButton label="Maps" value="maps" color="border-cyan-400 text-cyan-400"   sortBy={sortBy} onSortChange={onSortChange} />
            </div>
        </>
    );
}
