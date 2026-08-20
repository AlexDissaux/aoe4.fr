import { useTierStandings } from '../../hook/useTierStandings';
import { COLOR_PALETTE_HEX, DEFAULT_TEAM_COLOR_HEX } from '../../common/teamColors';
import { getTierBadge, MAX_BADGES_PER_TIER } from '../../common/tierBadges';
import { RankIcon } from '@aoe4.fr/ui';

function formatReachedAt(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export default function Milestones() {
    const { standings } = useTierStandings();

    return (
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
            <div className="mb-1 text-center">
                <div className="flex items-center justify-center gap-4">
                    <div className="h-px w-10 sm:w-16 bg-linear-to-r from-transparent to-amber-300/70" />
                    <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-[0.08em] text-stone-100">Team Milestones</h2>
                    <div className="h-px w-10 sm:w-16 bg-linear-to-l from-transparent to-amber-300/70" />
                </div>
                <p className="mt-3 text-sm text-gray-500">
                    The first {MAX_BADGES_PER_TIER} teams to reach each win milestone earn its badge.
                </p>
            </div>

            {standings.length === 0 ? (
                <div className="text-white text-center py-12">Loading milestones...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {standings.map((standing) => {
                        const badge = getTierBadge(standing.threshold);
                        return (
                            <div key={standing.threshold} className="bg-gray-900/60 border border-gray-700/50 p-4">
                                <div className="flex items-center gap-4">
                                    {badge && <RankIcon rankLevel={badge.rankLevel} size={64} />}
                                    <div>
                                        <div className="text-lg font-black text-stone-100">{standing.threshold} wins</div>
                                        <div className="text-sm text-gray-400">
                                            <span className="text-amber-300 font-bold">{standing.remaining}</span>
                                            /{MAX_BADGES_PER_TIER} slots remaining
                                        </div>
                                    </div>
                                </div>

                                {standing.claimed.length > 0 ? (
                                    <ol className="mt-4 space-y-1.5 text-sm">
                                        {standing.claimed.map((claim, i) => (
                                            <li key={claim.teamId} className="flex items-center gap-2">
                                                <span className="text-gray-600 font-bold text-xs w-4 text-right flex-shrink-0">{i + 1}</span>
                                                <span
                                                    className="font-bold truncate flex-1"
                                                    style={{ color: COLOR_PALETTE_HEX[claim.color] ?? DEFAULT_TEAM_COLOR_HEX }}
                                                >
                                                    {claim.name}
                                                </span>
                                                <span className="text-gray-500 text-xs flex-shrink-0">{formatReachedAt(claim.reachedAt)}</span>
                                            </li>
                                        ))}
                                    </ol>
                                ) : (
                                    <div className="mt-4 text-xs text-gray-600">No team has reached this milestone yet</div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
