import { useState, useMemo } from "react";
import { usePlayers } from "../../hook/usePlayers";
import { useWololoCurrentGames } from "../../hook/useWololoCurrentGames";
import { useWololoTeams } from "../../hook/useWololoTeams";
import { SortKey } from "./leaderboard.types";
import { COLOR_PALETTE, DEFAULT_TEAM_COLOR } from "./teamColors";
import { LeaderboardFilters } from "./LeaderboardFilters";
import { LeaderboardTableHeader } from "./LeaderboardTableHeader";
import { PlayerRow } from "./PlayerRow";

export default function Leaderboard() {
    const { players } = usePlayers();
    const teams = useWololoTeams();
    const gamesMap = useWololoCurrentGames();
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<SortKey>('winrate');
    const [openTooltipIndex, setOpenTooltipIndex] = useState<number | null>(null);

    const filteredAndSorted = useMemo(() => {
        if (!players) return [];
        let list = [...players];
        if (selectedTeam) list = list.filter(p => p.teamId === selectedTeam);
        if (search.trim()) {
            const q = search.trim().toLowerCase();
            list = list.filter(p => p.name.toLowerCase().includes(q));
        }
        list.sort((a, b) => {
            switch (sortBy) {
                case 'winrate': return b.winRate - a.winRate;
                case 'games':   return b.gamesCount - a.gamesCount;
                case 'civs':    return (b.civsWon?.length ?? 0) - (a.civsWon?.length ?? 0);
                default:        return 0;
            }
        });
        return list;
    }, [players, selectedTeam, search, sortBy]);

    function handleTooltipToggle(index: number) {
        setOpenTooltipIndex(prev => prev === index ? null : index);
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-7 text-center">
                <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-12 sm:w-20 bg-linear-to-r from-transparent to-amber-300/70" />
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-stone-100">
                        Player Leaderboard
                    </h2>
                    <div className="h-px w-12 sm:w-20 bg-linear-to-l from-transparent to-amber-300/70" />
                </div>
            </div>

            <LeaderboardFilters
                teams={teams}
                selectedTeam={selectedTeam}
                onTeamChange={setSelectedTeam}
                search={search}
                onSearchChange={setSearch}
                sortBy={sortBy}
                onSortChange={setSortBy}
            />

            <div className="bg-gray-900/60 border border-gray-700/50">
                <LeaderboardTableHeader sortBy={sortBy} onSortChange={setSortBy} />

                {!players || players.length === 0 ? (
                    <div className="text-white text-center py-12">Loading players...</div>
                ) : filteredAndSorted.length === 0 ? (
                    <div className="text-gray-400 text-center py-12 text-sm">No players found</div>
                ) : (
                    <div className="divide-y divide-gray-700/30">
                        {filteredAndSorted.map((player, index) => (
                            <PlayerRow
                                key={player.profileId}
                                player={player}
                                index={index}
                                teamColor={COLOR_PALETTE[teams.find(t => t.id === player.teamId)?.color ?? ''] ?? DEFAULT_TEAM_COLOR}
                                openTooltipIndex={openTooltipIndex}
                                onTooltipToggle={handleTooltipToggle}
                                currentGame={gamesMap.get(player.name.toLowerCase())}
                            />
                        ))}
                    </div>
                )}
            </div>

            <div className="text-center mt-3 text-xs text-gray-600">
                {filteredAndSorted.length} player{filteredAndSorted.length !== 1 ? 's' : ''} shown
            </div>
        </div>
    );
}
