import { useState, useMemo } from "react";
import { usePlayers } from "../../hook/usePlayers";
import { useWololoCurrentGames } from "../../hook/useWololoCurrentGames";
import { useWololoTeams } from "../../hook/useWololoTeams";
import { useTeams } from "../../hook/useTeams";
import { useTwitchSection } from "../../hook/useTwitchSection";
import { useCivKingStandings } from "../../hook/useCivKingStandings";
import { useChallengeSummaries } from "../../hook/useChallengeSummaries";
import { LeaderboardView, SortKey, TeamSortKey } from "./leaderboard.types";
import { COLOR_PALETTE, DEFAULT_TEAM_COLOR } from "../../common/teamColors";
import { LeaderboardFilters } from "./LeaderboardFilters";
import { LeaderboardTableHeader } from "./LeaderboardTableHeader";
import { LeaderboardViewTabs } from "./LeaderboardViewTabs";
import { PlayerRow } from "./PlayerRow";
import { TeamLeaderboard } from "./TeamLeaderboard";
import { TeamSummaryRow } from "./TeamSummaryRow";

export default function Leaderboard() {
    const { players } = usePlayers();
    const teams = useWololoTeams();
    const { teams: teamScores } = useTeams();
    const gamesMap = useWololoCurrentGames();
    const twitchState = useTwitchSection();
    const { standings: kingStandings } = useCivKingStandings();
    const { summaries: challengeSummaries } = useChallengeSummaries();

    const kingByProfileId = useMemo(
        () => new Map(kingStandings.filter(s => s.king).map(s => [s.king!.profileId, s.civ])),
        [kingStandings],
    );

    const challengeByProfileId = useMemo(
        () => new Map(challengeSummaries.map(s => [s.profileId, s])),
        [challengeSummaries],
    );

    const streamingLogins = useMemo(() => {
        if (twitchState.status !== 'live') return new Set<string>();
        return new Set(twitchState.streams.map(s => s.user_login.toLowerCase()));
    }, [twitchState]);
    const [view, setView] = useState<LeaderboardView>('teams');
    const [selectedTeam, setSelectedTeam] = useState<string | null>(null);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<SortKey>('wins');
    const [teamSortBy, setTeamSortBy] = useState<TeamSortKey>('total');
    const [openTooltipKey, setOpenTooltipKey] = useState<string | null>(null);

    const selectedTeamScore = useMemo(
        () => selectedTeam ? teamScores.find(t => t.teamId === selectedTeam) ?? null : null,
        [teamScores, selectedTeam],
    );

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
                case 'wins': return b.wins - a.wins;
                case 'civs': return (b.civsWon?.length ?? 0) - (a.civsWon?.length ?? 0);
                case 'maps': return (b.mapsWon?.length ?? 0) - (a.mapsWon?.length ?? 0);
                case 'challenges': return (challengeByProfileId.get(b.profileId)?.totalPoints ?? 0) - (challengeByProfileId.get(a.profileId)?.totalPoints ?? 0);
                default:     return 0;
            }
        });
        return list;
    }, [players, selectedTeam, search, sortBy, challengeByProfileId]);

    function handleTooltipToggle(key: string) {
        setOpenTooltipKey(prev => prev === key ? null : key);
    }

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-7 flex flex-col items-center gap-4">
                <div className="flex items-center justify-center gap-4 w-full">
                    <div className="h-px w-12 sm:w-20 bg-linear-to-r from-transparent to-amber-300/70" />
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-stone-100">
                        Leaderboard
                    </h2>
                    <div className="h-px w-12 sm:w-20 bg-linear-to-l from-transparent to-amber-300/70" />
                </div>
                <LeaderboardViewTabs view={view} onViewChange={setView} />
            </div>

            <LeaderboardFilters
                view={view}
                teams={teams}
                selectedTeam={selectedTeam}
                onTeamChange={setSelectedTeam}
                search={search}
                onSearchChange={setSearch}
                sortBy={sortBy}
                onSortChange={setSortBy}
                teamSortBy={teamSortBy}
                onTeamSortChange={setTeamSortBy}
            />

            {view === 'players' ? (
                <>
                    {selectedTeamScore && <TeamSummaryRow team={selectedTeamScore} />}

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
                                        openTooltipKey={openTooltipKey}
                                        onTooltipToggle={handleTooltipToggle}
                                        currentGame={gamesMap.get(player.name.toLowerCase())}
                                        isStreaming={!!player.twitchLogin && streamingLogins.has(player.twitchLogin.toLowerCase())}
                                        kingCiv={kingByProfileId.get(player.profileId) ?? null}
                                        challengePoints={challengeByProfileId.get(player.profileId)?.totalPoints ?? 0}
                                        challengeEntries={challengeByProfileId.get(player.profileId)?.entries ?? []}
                                    />
                                ))}
                            </div>
                        )}
                    </div>

                    <div className="text-center mt-3 text-xs text-gray-600">
                        {filteredAndSorted.length} player{filteredAndSorted.length !== 1 ? 's' : ''} shown
                    </div>
                </>
            ) : (
                <TeamLeaderboard
                    teams={teamScores}
                    players={players ?? []}
                    search={search}
                    sortBy={teamSortBy}
                    onSortChange={setTeamSortBy}
                    gamesMap={gamesMap}
                    streamingLogins={streamingLogins}
                    kingByProfileId={kingByProfileId}
                    challengeByProfileId={challengeByProfileId}
                />
            )}
        </div>
    );
}
