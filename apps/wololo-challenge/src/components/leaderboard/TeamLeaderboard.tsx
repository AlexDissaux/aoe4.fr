import { useMemo, useState } from 'react';
import { CurrentGame, IWololoPlayerChallengeSummary, IWololoTeamScore, WololoPlayer } from '@aoe4.fr/shared-types';
import { COLOR_PALETTE, DEFAULT_TEAM_COLOR } from '../../common/teamColors';
import { SortKey, TeamSortKey } from './leaderboard.types';
import { TeamLeaderboardHeader } from './TeamLeaderboardHeader';
import { TeamRow } from './TeamRow';
import { LeaderboardTableHeader } from './LeaderboardTableHeader';
import { PlayerRow } from './PlayerRow';

interface TeamLeaderboardProps {
    teams: IWololoTeamScore[];
    players: WololoPlayer[];
    search: string;
    sortBy: TeamSortKey;
    onSortChange: (key: TeamSortKey) => void;
    gamesMap: Map<string, CurrentGame>;
    streamingLogins: Set<string>;
    kingByProfileId: Map<number, string>;
    challengeByProfileId: Map<number, IWololoPlayerChallengeSummary>;
}

export function TeamLeaderboard({
    teams,
    players,
    search,
    sortBy,
    onSortChange,
    gamesMap,
    streamingLogins,
    kingByProfileId,
    challengeByProfileId,
}: TeamLeaderboardProps) {
    const [expandedTeamId, setExpandedTeamId] = useState<string | null>(null);
    const [playersSortBy, setPlayersSortBy] = useState<SortKey>('wins');
    const [openTooltipKey, setOpenTooltipKey] = useState<string | null>(null);

    const filteredAndSorted = useMemo(() => {
        let list = [...teams];
        if (search.trim()) {
            const q = search.trim().toLowerCase();
            list = list.filter(t => t.name.toLowerCase().includes(q));
        }
        list.sort((a, b) => {
            switch (sortBy) {
                case 'wins': return b.categories.wins.points - a.categories.wins.points;
                case 'civs': return b.categories.civs.points - a.categories.civs.points;
                case 'maps': return b.categories.maps.points - a.categories.maps.points;
                case 'tiers': return (b.tiers.points + b.kings.points) - (a.tiers.points + a.kings.points);
                case 'challenges': return b.challenges.points - a.challenges.points;
                default: return b.totalPoints - a.totalPoints;
            }
        });
        return list;
    }, [teams, search, sortBy]);

    const expandedTeamPlayers = useMemo(() => {
        if (!expandedTeamId) return [];
        const list = players.filter(p => p.teamId === expandedTeamId);
        list.sort((a, b) => {
            switch (playersSortBy) {
                case 'wins': return b.wins - a.wins;
                case 'civs': return (b.civsWon?.length ?? 0) - (a.civsWon?.length ?? 0);
                case 'maps': return (b.mapsWon?.length ?? 0) - (a.mapsWon?.length ?? 0);
                case 'challenges': return (challengeByProfileId.get(b.profileId)?.totalPoints ?? 0) - (challengeByProfileId.get(a.profileId)?.totalPoints ?? 0);
                default: return 0;
            }
        });
        return list;
    }, [players, expandedTeamId, playersSortBy, challengeByProfileId]);

    function handleTeamToggle(teamId: string) {
        setExpandedTeamId(prev => prev === teamId ? null : teamId);
        setOpenTooltipKey(null);
    }

    function handleTooltipToggle(key: string) {
        setOpenTooltipKey(prev => prev === key ? null : key);
    }

    return (
        <div className="bg-gray-900/60 border border-gray-700/50">
            <TeamLeaderboardHeader sortBy={sortBy} onSortChange={onSortChange} />

            {teams.length === 0 ? (
                <div className="text-white text-center py-12">Loading teams...</div>
            ) : filteredAndSorted.length === 0 ? (
                <div className="text-gray-400 text-center py-12 text-sm">No teams found</div>
            ) : (
                <div className="divide-y divide-gray-700/30">
                    {filteredAndSorted.map((team, index) => {
                        const isExpanded = team.teamId === expandedTeamId;
                        const teamColor = COLOR_PALETTE[team.color] ?? DEFAULT_TEAM_COLOR;
                        return (
                            <div key={team.teamId}>
                                <TeamRow
                                    team={team}
                                    index={index}
                                    onToggleExpand={() => handleTeamToggle(team.teamId)}
                                />
                                {isExpanded && (
                                    <div className="bg-black/20 border-t border-gray-700/30">
                                        <LeaderboardTableHeader sortBy={playersSortBy} onSortChange={setPlayersSortBy} />
                                        {expandedTeamPlayers.length === 0 ? (
                                            <div className="text-gray-400 text-center py-8 text-sm">No players found</div>
                                        ) : (
                                            <div className="divide-y divide-gray-700/20">
                                                {expandedTeamPlayers.map((player, pIndex) => (
                                                    <PlayerRow
                                                        key={player.profileId}
                                                        player={player}
                                                        index={pIndex}
                                                        teamColor={teamColor}
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
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
