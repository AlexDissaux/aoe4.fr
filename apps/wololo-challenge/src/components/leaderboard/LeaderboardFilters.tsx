import { IWololoTeam } from '@aoe4.fr/shared-types';
import { LeaderboardView, SortKey, TeamSortKey } from './leaderboard.types';
import { TeamFilterDropdown } from './TeamFilterDropdown';

interface LeaderboardFiltersProps {
    view: LeaderboardView;
    teams: IWololoTeam[];
    selectedTeam: string | null;
    onTeamChange: (team: string | null) => void;
    search: string;
    onSearchChange: (value: string) => void;
    sortBy: SortKey;
    onSortChange: (key: SortKey) => void;
    teamSortBy: TeamSortKey;
    onTeamSortChange: (key: TeamSortKey) => void;
}

function SortButton<T extends string>({ label, value, color, sortBy, onSortChange }: {
    label: string;
    value: T;
    color: string;
    sortBy: T;
    onSortChange: (key: T) => void;
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
    view,
    teams,
    selectedTeam,
    onTeamChange,
    search,
    onSearchChange,
    sortBy,
    onSortChange,
    teamSortBy,
    onTeamSortChange,
}: LeaderboardFiltersProps) {
    return (
        <>
            {/* Team filter */}
            {view === 'players' && (
                <TeamFilterDropdown teams={teams} selectedTeam={selectedTeam} onTeamChange={onTeamChange} />
            )}

            {/* Search */}
            <div className="flex justify-center mb-6">
                <div className="relative w-full max-w-sm">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
                    <input
                        type="text"
                        placeholder={view === 'players' ? 'Search a player...' : 'Search a team...'}
                        value={search}
                        onChange={e => onSearchChange(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-600 text-white placeholder-gray-500 pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                    />
                </div>
            </div>

            {/* Mobile sort */}
            <div className="flex gap-2 mb-4 overflow-x-auto pb-1 justify-center lg:hidden">
                {view === 'players' ? (
                    <>
                        <SortButton label="Wins" value="wins" color="border-green-400 text-green-400" sortBy={sortBy} onSortChange={onSortChange} />
                        <SortButton label="Civs" value="civs" color="border-amber-400 text-amber-400" sortBy={sortBy} onSortChange={onSortChange} />
                        <SortButton label="Maps" value="maps" color="border-cyan-400 text-cyan-400"   sortBy={sortBy} onSortChange={onSortChange} />
                    </>
                ) : (
                    <>
                        <SortButton label="Wins" value="wins" color="border-green-400 text-green-400" sortBy={teamSortBy} onSortChange={onTeamSortChange} />
                        <SortButton label="Civs" value="civs" color="border-amber-400 text-amber-400" sortBy={teamSortBy} onSortChange={onTeamSortChange} />
                        <SortButton label="Maps" value="maps" color="border-cyan-400 text-cyan-400"   sortBy={teamSortBy} onSortChange={onTeamSortChange} />
                        <SortButton label="Badges" value="tiers" color="border-yellow-300 text-yellow-300" sortBy={teamSortBy} onSortChange={onTeamSortChange} />
                        <SortButton label="Total" value="total" color="border-white text-white"       sortBy={teamSortBy} onSortChange={onTeamSortChange} />
                    </>
                )}
            </div>
        </>
    );
}
