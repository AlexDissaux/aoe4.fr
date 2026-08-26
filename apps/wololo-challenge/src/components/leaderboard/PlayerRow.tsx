import { CurrentGame, IWololoChallengePointEntry, WololoPlayer } from '@aoe4.fr/shared-types';
import { PlayerLink, LiveTwitch } from '@aoe4.fr/ui';
import { TeamColor } from './leaderboard.types';
import { LiveIndicator } from './LiveIndicator';
import { WonListTooltip } from './WonListTooltip';
import { KingBadge } from './KingBadge';

interface PlayerRowProps {
    player: WololoPlayer;
    index: number;
    teamColor: TeamColor;
    openTooltipKey: string | null;
    onTooltipToggle: (key: string) => void;
    currentGame?: CurrentGame;
    isStreaming?: boolean;
    kingCiv?: string | null;
    challengePoints: number;
    challengeEntries: IWololoChallengePointEntry[];
}

export function PlayerRow({ player, index, teamColor, openTooltipKey, onTooltipToggle, currentGame, isStreaming, kingCiv, challengePoints, challengeEntries }: PlayerRowProps) {
    const civsKey = `${index}-civs`;
    const mapsKey = `${index}-maps`;
    const challengesKey = `${index}-challenges`;
    const challengeItems = challengeEntries.map(e => `${e.label} (+${e.points})`);

    return (
        <div
            className={`px-3 sm:px-4 hover:bg-white/5 transition-colors duration-150 ${
                player.isCap ? `border-l-2 ${teamColor.border}` : 'border-l-2 border-transparent'
            } ${index % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
        >
            {/* Mobile */}
            <div className="lg:hidden py-3 space-y-1.5">
                {/* Name + team */}
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-bold text-xs w-5 text-right flex-shrink-0">{index + 1}</span>
                    {player.isCap && <span className="text-yellow-400 text-xs flex-shrink-0">👑</span>}
                    <span className={`font-bold text-sm truncate flex-1 ${player.isCap ? 'text-yellow-300' : 'text-white'}`}>
                        <PlayerLink profileId={player.profileId} name={player.name} className="hover:underline" />
                    </span>
                    {kingCiv && <KingBadge civ={kingCiv} size={20} />}
                    {currentGame && <LiveIndicator game={currentGame} />}
                    {isStreaming && player.twitchLogin && <LiveTwitch twitchLogin={player.twitchLogin} />}
                    <span className={`text-[11px] font-bold px-2 py-0.5 border flex-shrink-0 ${teamColor.border} ${teamColor.text}`}>
                        {player.team}
                    </span>
                </div>

                {/* Stats row */}
                <div className="grid grid-cols-4 pl-7 text-xs">
                    <div>
                        <span className="text-green-400 font-bold tabular-nums">{player.wins}</span>
                        <span className="text-gray-500"> wins</span>
                    </div>
                    <div
                        className="relative cursor-pointer"
                        onClick={() => onTooltipToggle(civsKey)}
                    >
                        <span className="text-amber-400 font-bold tabular-nums">{player.civsWon?.length ?? 0}</span>
                        <span className="text-gray-500"> civs</span>
                        {player.civsWon?.length > 0 && openTooltipKey === civsKey && (
                            <div className="absolute bottom-full left-0 mb-2 z-50 w-44">
                                <WonListTooltip title="Won civs" items={player.civsWon} />
                            </div>
                        )}
                    </div>
                    <div
                        className="relative cursor-pointer"
                        onClick={() => onTooltipToggle(mapsKey)}
                    >
                        <span className="text-cyan-400 font-bold tabular-nums">{player.mapsWon?.length ?? 0}</span>
                        <span className="text-gray-500"> maps</span>
                        {player.mapsWon?.length > 0 && openTooltipKey === mapsKey && (
                            <div className="absolute bottom-full left-0 mb-2 z-50 w-44">
                                <WonListTooltip title="Won maps" items={player.mapsWon} />
                            </div>
                        )}
                    </div>
                    <div
                        className="relative cursor-pointer"
                        onClick={() => onTooltipToggle(challengesKey)}
                    >
                        <span className="text-purple-400 font-bold tabular-nums">{challengePoints}</span>
                        <span className="text-gray-500"> challenges</span>
                        {challengeItems.length > 0 && openTooltipKey === challengesKey && (
                            <div className="absolute bottom-full left-0 mb-2 z-50 w-44">
                                <WonListTooltip title="Challenge points" items={challengeItems} />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden lg:grid grid-cols-12 gap-2 items-center py-3">
                <div className="col-span-1 text-center">
                    <span className="text-gray-500 font-bold">{index + 1}</span>
                </div>
                <div className="col-span-4 flex items-center gap-2">
                    {player.isCap && <span className="text-yellow-400 flex-shrink-0">👑</span>}
                    <span className={`font-bold truncate ${player.isCap ? 'text-yellow-300' : 'text-white'}`}>
                        <PlayerLink profileId={player.profileId} name={player.name} className="hover:underline" />
                    </span>
                    {kingCiv && <KingBadge civ={kingCiv} size={20} />}
                    {currentGame && <LiveIndicator game={currentGame} />}
                    {isStreaming && player.twitchLogin && <LiveTwitch twitchLogin={player.twitchLogin} />}
                </div>
                <div className="col-span-2 flex items-center">
                    <span className={`text-xs font-bold px-2 py-0.5 border ${teamColor.border} ${teamColor.text}`}>
                        {player.team}
                    </span>
                </div>
                <div className="col-span-2 text-center">
                    <span className="text-green-400 font-bold">{player.wins}</span>
                </div>
                <div className="col-span-1 text-center relative group">
                    <span className="text-amber-400 font-bold">{player.civsWon?.length ?? 0}</span>
                    {player.civsWon?.length > 0 && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 hidden group-hover:block z-50 w-44">
                            <WonListTooltip title="Won civs" items={player.civsWon} />
                        </div>
                    )}
                </div>
                <div className="col-span-1 text-center relative group">
                    <span className="text-cyan-400 font-bold">{player.mapsWon?.length ?? 0}</span>
                    {player.mapsWon?.length > 0 && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 hidden group-hover:block z-50 w-44">
                            <WonListTooltip title="Won maps" items={player.mapsWon} />
                        </div>
                    )}
                </div>
                <div className="col-span-1 text-center relative group">
                    <span className="text-purple-400 font-bold">{challengePoints}</span>
                    {challengeItems.length > 0 && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 hidden group-hover:block z-50 w-44">
                            <WonListTooltip title="Challenge points" items={challengeItems} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
