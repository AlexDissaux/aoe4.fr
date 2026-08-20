import { IWololoTeamScore } from '@aoe4.fr/shared-types';
import { COLOR_PALETTE_HEX, DEFAULT_TEAM_COLOR_HEX } from '../../common/teamColors';
import { getTierBadge } from '../../common/tierBadges';
import { TierBadge } from './TierBadge';

function CategoryCell({ points, total, type }: { points: number; total: number; type?: string }) {
    return (
        <span className="font-bold tabular-nums">
            {points} <span className="text-gray-500 font-normal">({total} {type})</span>
        </span>
    );
}

export function TeamSummaryRow({ team }: { team: IWololoTeamScore }) {
    const accent = COLOR_PALETTE_HEX[team.color] ?? DEFAULT_TEAM_COLOR_HEX;

    return (
        <div className="mb-4 px-3 sm:px-4 py-3 bg-gray-900/60 border border-gray-700/50 flex items-center gap-3 flex-wrap">
            <span className="font-black truncate" style={{ color: accent }}>{team.name}</span>
            <span className="text-gray-600 text-xs">Team score:</span>
            <div className="flex items-center gap-3 text-s ml-auto">
                <div className="text-green-400"><CategoryCell points={team.categories.wins.points} total={team.categories.wins.total} type="wins" /></div>
                <div className="text-amber-400"><CategoryCell points={team.categories.civs.points} total={team.categories.civs.total} type="civs" /></div>
                <div className="text-cyan-400"><CategoryCell points={team.categories.maps.points} total={team.categories.maps.total} type="maps" /></div>
                {team.tiers.badges.length > 0 && (
                    <div className="flex items-center gap-1">
                        {team.tiers.badges.map((threshold) => {
                            const badge = getTierBadge(threshold);
                            return badge ? <TierBadge key={threshold} badge={badge} size={18} /> : null;
                        })}
                    </div>
                )}
                <div className="text-white font-black">{team.totalPoints}<span className="text-s font-normal text-gray-600 ml-1">pts</span></div>
            </div>
        </div>
    );
}
