import { WololoPlayer } from '@aoe4.fr/shared-types';
import { TeamColor } from './leaderboard.types';

interface PlayerRowProps {
    player: WololoPlayer;
    index: number;
    teamColor: TeamColor;
    openTooltipIndex: number | null;
    onTooltipToggle: (index: number) => void;
}

function CivsTooltip({ civs }: { civs: string[] }) {
    return (
        <div className="bg-gray-900 border-2 border-amber-500/50 rounded shadow-xl p-2">
            <div className="text-amber-400 font-bold text-xs uppercase mb-1 text-center">Won civs</div>
            <div className="space-y-0.5 max-h-48 overflow-y-auto">
                {civs.map((civ, i) => (
                    <div key={i} className="text-gray-300 text-xs px-2 py-0.5 bg-gray-800/50">{civ}</div>
                ))}
            </div>
        </div>
    );
}

export function PlayerRow({ player, index, teamColor, openTooltipIndex, onTooltipToggle }: PlayerRowProps) {
    return (
        <div
            className={`px-3 sm:px-4 hover:bg-white/5 transition-colors duration-150 ${
                player.isCap ? `border-l-2 ${teamColor.border}` : 'border-l-2 border-transparent'
            } ${index % 2 === 0 ? 'bg-white/[0.02]' : ''}`}
        >
            {/* Mobile */}
            <div className="lg:hidden py-3">
                <div className="flex items-center gap-3 mb-2">
                    <span className="text-gray-500 font-bold text-sm w-6 text-center flex-shrink-0">{index + 1}</span>
                    <div className="flex items-center gap-1.5 min-w-0 flex-1">
                        {player.isCap && <span className="text-yellow-400 flex-shrink-0">👑</span>}
                        <span className={`font-bold text-sm truncate ${player.isCap ? 'text-yellow-300' : 'text-white'}`}>
                            {player.name}
                        </span>
                    </div>
                    <span className={`text-xs font-bold px-2 py-0.5 border ${teamColor.border} ${teamColor.text} flex-shrink-0`}>
                        {player.team}
                    </span>
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-xs ml-9">
                    <div className="bg-yellow-900/20 border border-yellow-500/30 px-2 py-1 text-center">
                        <div className="text-yellow-400 font-bold">{player.winRate}%</div>
                        <div className="text-gray-500">WR</div>
                    </div>
                    <div className="bg-blue-900/20 border border-blue-500/30 px-2 py-1 text-center">
                        <div className="text-blue-400 font-bold">{player.gamesCount}</div>
                        <div className="text-gray-500">Games</div>
                    </div>
                    <div
                        className="bg-amber-900/20 border border-amber-500/30 px-2 py-1 text-center relative cursor-pointer"
                        onClick={() => onTooltipToggle(index)}
                    >
                        <div className="text-amber-400 font-bold">{player.civsWon?.length ?? 0}</div>
                        <div className="text-gray-500">Civs</div>
                        {player.civsWon?.length > 0 && openTooltipIndex === index && (
                            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 z-50 w-44">
                                <CivsTooltip civs={player.civsWon} />
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
                <div className="col-span-3 flex items-center gap-2">
                    {player.isCap && <span className="text-yellow-400 flex-shrink-0">👑</span>}
                    <span className={`font-bold truncate ${player.isCap ? 'text-yellow-300' : 'text-white'}`}>
                        {player.name}
                    </span>
                </div>
                <div className="col-span-2 flex items-center">
                    <span className={`text-xs font-bold px-2 py-0.5 border ${teamColor.border} ${teamColor.text}`}>
                        {player.team}
                    </span>
                </div>
                <div className="col-span-2 text-center">
                    <span className="text-yellow-400 font-bold">{player.winRate}%</span>
                </div>
                <div className="col-span-1 text-center">
                    <span className="text-blue-400 font-semibold">{player.gamesCount}</span>
                </div>
                <div className="col-span-2 text-center">
                    <span className="text-green-400 font-bold">{player.wins}V</span>
                    <span className="text-gray-600 mx-1">/</span>
                    <span className="text-red-400 font-bold">{player.losses}D</span>
                </div>
                <div className="col-span-1 text-center relative group">
                    <span className="text-amber-400 font-bold">{player.civsWon?.length ?? 0}</span>
                    {player.civsWon?.length > 0 && (
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 w-44">
                            <CivsTooltip civs={player.civsWon} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
