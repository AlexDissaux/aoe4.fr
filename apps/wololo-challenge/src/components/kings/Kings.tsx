import { useCivKingStandings } from '../../hook/useCivKingStandings';
import { COLOR_PALETTE_HEX, DEFAULT_TEAM_COLOR_HEX } from '../../common/teamColors';
import { formatCivLabel } from '../../common/kingBadges';
import { ALL_CIVILIZATIONS, CivFlag, PlayerLink } from '@aoe4.fr/ui';
import { IWololoCivKingStanding } from '@aoe4.fr/shared-types';

const EMPTY_STANDING: Omit<IWololoCivKingStanding, 'civ'> = { king: null, leaderboard: [] };

export default function Kings() {
    const { standings } = useCivKingStandings();

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
            <div className="mb-1 text-center">
                <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-10 sm:w-16 bg-linear-to-r from-transparent to-amber-300/70" />
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-stone-100">Civ Kings</h2>
                    <div className="h-px w-10 sm:w-16 bg-linear-to-l from-transparent to-amber-300/70" />
                </div>
                <p className="mt-3 text-sm text-gray-500">
                    The player with the most wins on a civilization becomes its king (+15 pts for their team).
                    A player can only hold one crown — their best civilization.
                </p>
            </div>

            {standings.length === 0 ? (
                <div className="text-white text-center py-12">Loading kings...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {ALL_CIVILIZATIONS.map((civ) => {
                        const standing = standings.find((s) => s.civ === civ) ?? EMPTY_STANDING;
                        const { king, leaderboard } = standing;

                        return (
                            <div key={civ} className="bg-gray-900/60 border border-gray-700/50 p-4">
                                <div className="flex items-center gap-4">
                                    <CivFlag civilization={civ} size={64} />
                                    <div>
                                        <div className="text-lg font-black text-stone-100">{formatCivLabel(civ)}</div>
                                        {king ? (
                                            <div className="text-sm text-gray-400">
                                                <span className="font-bold" style={{ color: COLOR_PALETTE_HEX[king.teamColor] ?? DEFAULT_TEAM_COLOR_HEX }}>
                                                    <PlayerLink profileId={king.profileId} name={king.name} className="hover:underline" />
                                                </span>
                                                {' — '}
                                                <span style={{ color: COLOR_PALETTE_HEX[king.teamColor] ?? DEFAULT_TEAM_COLOR_HEX }}>{king.teamName}</span>
                                                {' '}
                                                <span className="text-amber-300 font-bold">{king.wins}</span> wins
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-600">Unclaimed — be the first!</div>
                                        )}
                                    </div>
                                </div>

                                {leaderboard.length > 0 ? (
                                    <ol className="mt-4 space-y-1.5 text-sm">
                                        {leaderboard.map((contender, i) => (
                                            <li key={contender.profileId} className="flex items-center gap-2">
                                                <span className={`font-bold text-xs w-4 text-right flex-shrink-0 ${i === 0 ? 'text-amber-300' : 'text-gray-600'}`}>
                                                    {i + 1}
                                                </span>
                                                <span
                                                    className={`truncate flex-1 ${i === 0 ? 'font-black' : 'font-bold'}`}
                                                    style={{ color: COLOR_PALETTE_HEX[contender.teamColor] ?? DEFAULT_TEAM_COLOR_HEX }}
                                                >
                                                    <PlayerLink profileId={contender.profileId} name={contender.name} className="hover:underline" />
                                                </span>
                                                <span className="text-gray-500 text-xs flex-shrink-0">{contender.wins} wins</span>
                                            </li>
                                        ))}
                                    </ol>
                                ) : (
                                    <div className="mt-4 text-xs text-gray-600">No recorded wins yet</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
