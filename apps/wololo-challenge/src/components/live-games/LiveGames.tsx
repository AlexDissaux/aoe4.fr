import { useMemo } from 'react';
import { CurrentGame } from '@aoe4.fr/shared-types';
import { CivFlag } from '@aoe4.fr/ui';
import { usePlayers } from '../../hook/usePlayers';
import { useWololoCurrentGames } from '../../hook/useWololoCurrentGames';
import { TEAM_COLORS, DEFAULT_TEAM_COLOR } from '../leaderboard/teamColors';

function formatLeaderboard(leaderboard: string): string {
    return leaderboard.replace(/_/g, ' ').toUpperCase();
}

interface GameCardProps {
    game: CurrentGame;
    wololoNames: Set<string>;
}

function GameCard({ game, wololoNames }: GameCardProps) {
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
                            const isWololo = wololoNames.has(player.name.toLowerCase());
                            return (
                                <div key={pi} className={`flex items-center gap-2 min-w-0 ${isWololo ? 'opacity-100' : 'opacity-50'}`}>
                                    <CivFlag
                                        civilization={player.civilization}
                                        className="w-6 h-auto flex-shrink-0 rounded-sm"
                                    />
                                    <span className={`text-sm truncate flex-1 font-medium ${isWololo ? 'text-white' : 'text-gray-400'}`}>
                                        {player.name}
                                        {isWololo && (
                                            <span className="ml-1.5 text-[10px] font-bold text-amber-400 uppercase tracking-wider">wololo</span>
                                        )}
                                    </span>
                                    {player.rating != null && (
                                        <span className={`text-xs font-bold tabular-nums flex-shrink-0 ${isWololo ? 'text-amber-400' : 'text-gray-600'}`}>
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

    const { activeWololoNames, uniqueGames } = useMemo(() => {
        if (!players || gamesMap.size === 0) return { activeWololoNames: new Set<string>(), uniqueGames: [] };

        const activeWololoNames = new Set<string>();
        const seen = new Set<CurrentGame>();
        const uniqueGames: { game: CurrentGame; wololoNames: Set<string> }[] = [];

        for (const player of players) {
            const key = player.name.toLowerCase();
            const game = gamesMap.get(key);
            if (!game) continue;

            activeWololoNames.add(key);

            if (!seen.has(game)) {
                seen.add(game);
                uniqueGames.push({ game, wololoNames: new Set() });
            }
            const entry = uniqueGames.find(e => e.game === game)!;
            entry.wololoNames.add(key);
        }

        return { activeWololoNames, uniqueGames };
    }, [players, gamesMap]);

    // Build player list sorted by team color for the "who's playing" badges
    const activePlayers = useMemo(() => {
        if (!players) return [];
        return players.filter(p => activeWololoNames.has(p.name.toLowerCase()));
    }, [players, activeWololoNames]);

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Title */}
            <div className="mb-8 text-center">
                <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-12 sm:w-20 bg-linear-to-r from-transparent to-amber-300/70" />
                    <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-stone-100 flex items-center gap-3">
                        Playing Now
                        {activeWololoNames.size > 0 && (
                            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-green-400 border border-green-500/30 px-2 py-0.5 bg-green-950/30">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                {activeWololoNames.size}
                            </span>
                        )}
                    </h1>
                    <div className="h-px w-12 sm:w-20 bg-linear-to-l from-transparent to-amber-300/70" />
                </div>
                <p className="mt-2 text-sm text-gray-500">Wololo Challenge players currently in a ranked game</p>
            </div>

            {gamesMap.size === 0 ? (
                /* Loading or empty state */
                <div className="text-center py-20">
                    <div className="text-gray-600 text-sm italic">
                        {activePlayers.length === 0 ? 'No Wololo players are currently in a game.' : 'Connecting…'}
                    </div>
                </div>
            ) : uniqueGames.length === 0 ? (
                <div className="text-center py-20 text-gray-600 text-sm italic">
                    No Wololo players are currently in a game.
                </div>
            ) : (
                <div className="space-y-4">
                    {/* Active players badges */}
                    {activePlayers.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {activePlayers.map(player => {
                                const color = TEAM_COLORS[player.team] ?? DEFAULT_TEAM_COLOR;
                                return (
                                    <span
                                        key={player.profileId}
                                        className={`inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 border ${color.border} ${color.text} bg-black/40`}
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                                        {player.name}
                                    </span>
                                );
                            })}
                        </div>
                    )}

                    {/* Game cards */}
                    {uniqueGames.map(({ game, wololoNames }, i) => (
                        <GameCard key={i} game={game} wololoNames={wololoNames} />
                    ))}
                </div>
            )}
        </div>
    );
}
