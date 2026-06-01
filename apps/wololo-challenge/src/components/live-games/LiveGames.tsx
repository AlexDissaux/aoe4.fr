import { useMemo } from 'react';
import { CurrentGame } from '@aoe4.fr/shared-types';
import { CivFlag } from '@aoe4.fr/ui';
import { useWololoCurrentGames } from '../../hook/useWololoCurrentGames';
import { usePlayers } from '../../hook/usePlayers';
import { TEAM_COLORS, DEFAULT_TEAM_COLOR } from '../leaderboard/teamColors';

function formatLeaderboard(leaderboard: string): string {
    return leaderboard.replace(/_/g, ' ').toUpperCase();
}

function GameCard({ game, playerTeamMap }: { game: CurrentGame; playerTeamMap: Map<string, string> }) {
    return (
        <div className="bg-gray-900/60 border border-gray-700/50">
            {/* Game header */}
            <div className="px-4 py-2.5 border-b border-gray-700/50 flex items-center gap-3">
                <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                    <span className="text-[10px] font-bold text-green-400 uppercase tracking-widest">Live</span>
                </span>
                <span className="text-amber-300 font-bold tracking-wide truncate">{game.map}</span>
                <span className="ml-auto text-gray-500 text-xs font-semibold">{formatLeaderboard(game.leaderboard)}</span>
            </div>

            {/* Teams */}
            <div className="flex divide-x divide-gray-700/50">
                {game.teams.map((team, ti) => (
                    <div key={ti} className="flex-1 py-3 px-4 space-y-2 min-w-0">
                        {team.map((player, pi) => {
                            const team = playerTeamMap.get(player.name.toLowerCase());
                            const color = team ? (TEAM_COLORS[team] ?? DEFAULT_TEAM_COLOR) : null;
                            return (
                                <div key={pi} className={`flex items-center gap-2 min-w-0 ${color ? 'opacity-100' : 'opacity-50'}`}>
                                    <CivFlag
                                        civilization={player.civilization}
                                        className="w-6 h-auto flex-shrink-0 rounded-sm"
                                    />
                                    <span className={`text-sm truncate flex-1 font-medium ${color ? color.text : 'text-gray-400'}`}>
                                        {player.name}
                                    </span>
                                    {player.rating != null && (
                                        <span className={`text-xs font-bold tabular-nums flex-shrink-0 ${color ? 'text-amber-400' : 'text-gray-600'}`}>
                                            {player.rating}
                                        </span>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>

            {/* VS divider label */}
            <div className="text-center text-gray-600 font-black text-xs tracking-widest pb-2 -mt-1">
                VS
            </div>
        </div>
    );
}

export default function LiveGames() {
    const { players } = usePlayers();
    const gamesMap = useWololoCurrentGames();
    const games = [...new Set(gamesMap.values())];

    const playerTeamMap = useMemo(() => {
        const map = new Map<string, string>();
        for (const p of players ?? []) {
            map.set(p.name.toLowerCase(), p.team);
        }
        return map;
    }, [players]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Title */}
            <div className="mb-8 text-center">
                <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-12 sm:w-20 bg-linear-to-r from-transparent to-amber-300/70" />
                    <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-stone-100 flex items-center gap-3">
                        Playing Now
                        {games.length > 0 && (
                            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-400 border border-green-500/30 px-2 py-0.5 bg-green-950/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                {games.length}
                            </span>
                        )}
                    </h1>
                    <div className="h-px w-12 sm:w-20 bg-linear-to-l from-transparent to-amber-300/70" />
                </div>
                <p className="mt-2 text-sm text-gray-500">Wololo Challenge players currently in a ranked game</p>
            </div>

            {games.length === 0 ? (
                <div className="text-center py-20 text-gray-600 text-sm italic">
                    No Wololo players are currently in a game.
                </div>
            ) : (
                <div className="space-y-4">
                    {games.map((game, i) => (
                        <GameCard key={i} game={game} playerTeamMap={playerTeamMap} />
                    ))}
                </div>
            )}
        </div>
    );
}
