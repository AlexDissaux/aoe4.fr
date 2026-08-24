import { CivFlag, PlayerLink } from '@aoe4.fr/ui';
import { IWololoCivKingStanding } from '@aoe4.fr/shared-types';
import { COLOR_PALETTE_HEX, DEFAULT_TEAM_COLOR_HEX } from '../../common/teamColors';
import { formatCivLabel } from '../../common/kingBadges';

export interface CivCardProps {
    standing: IWololoCivKingStanding;
    active: boolean;
    onClick?: () => void;
}

export function CivCard({ standing, active, onClick }: CivCardProps) {
    const { civ, king, leaderboard } = standing;

    return (
        <div
            onClick={active ? undefined : onClick}
            className={`h-full flex flex-col bg-gray-900/60 border p-4 sm:p-6 transition-colors ${active
                ? 'border-amber-300/50 shadow-[0_0_50px_-12px_rgba(252,211,77,0.4)]'
                : 'border-gray-700/50 cursor-pointer'
                }`}
        >
            <div className="flex items-center gap-4 sm:gap-5 shrink-0">
                <CivFlag civilization={civ} size={active ? 88 : 60} className="shrink-0 drop-shadow-lg" />
                <div className="min-w-0">
                    <div className={`font-black text-stone-100 uppercase tracking-wide truncate ${active ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
                        {formatCivLabel(civ)}
                    </div>
                    {king ? (
                        <div className={`text-gray-400 ${active ? 'text-base sm:text-lg mt-1' : 'text-xs mt-0.5'}`}>
                            <span className="font-bold" style={{ color: COLOR_PALETTE_HEX[king.teamColor] ?? DEFAULT_TEAM_COLOR_HEX }}>
                                <PlayerLink profileId={king.profileId} name={king.name} className="hover:underline" />
                                <span className="text-[18px] leading-none">👑</span>
                            </span>
                            {' — '}
                            <span style={{ color: COLOR_PALETTE_HEX[king.teamColor] ?? DEFAULT_TEAM_COLOR_HEX }}>{king.teamName}</span>
                            {' '}
                            <span className="text-amber-300 font-bold">{king.wins}</span> wins
                        </div>
                    ) : (
                        <div className={`text-gray-600 ${active ? 'text-sm mt-1' : 'text-xs mt-0.5'}`}>Unclaimed — be the first!</div>
                    )}
                </div>
            </div>

            {leaderboard.length > 0 ? (
                <ol className={`mt-4 flex-1 min-h-0 overflow-y-auto space-y-1.5 pr-1 ${active ? 'text-sm' : 'text-xs pointer-events-none'}`}>
                    {leaderboard.map((contender, i) => {
                        const isSkipped = !!contender.alreadyKingOf;
                        return (
                            <li key={contender.profileId} className={`flex items-center gap-2 ${isSkipped ? 'opacity-40' : ''}`}>
                                <span className={`font-bold text-xs w-4 text-right flex-shrink-0 ${i === 0 && !isSkipped ? 'text-amber-300' : 'text-gray-600'}`}>
                                    {i + 1}
                                </span>
                                <span
                                    className={`truncate flex-1 ${isSkipped ? 'line-through' : i === 0 ? 'font-black' : 'font-bold'}`}
                                    style={{ color: isSkipped ? "gray" : (COLOR_PALETTE_HEX[contender.teamColor] ?? DEFAULT_TEAM_COLOR_HEX) }}
                                >
                                    <PlayerLink profileId={contender.profileId} name={contender.name} className="hover:underline" />
                                </span>
                                {isSkipped && (
                                    <span className="hidden sm:inline text-gray-600 text-xs italic flex-shrink-0">
                                        (already king of {formatCivLabel(contender.alreadyKingOf as string)})
                                    </span>
                                )}
                                <span className="text-gray-500 text-xs flex-shrink-0">{contender.wins} wins</span>
                            </li>
                        );
                    })}
                </ol>
            ) : (
                <div className="mt-4 text-xs text-gray-600">No recorded wins yet</div>
            )}
        </div>
    );
}
