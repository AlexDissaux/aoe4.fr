import { IWololoTeamScore } from '@aoe4.fr/shared-types';
import { COLOR_PALETTE_HEX, DEFAULT_TEAM_COLOR_HEX } from '../../common/teamColors';
import { getTierBadge } from '../../common/tierBadges';
import { TierBadge } from './TierBadge';
import { KingBadge } from './KingBadge';
import { WonListTooltip } from './WonListTooltip';

interface TeamRowProps {
    team: IWololoTeamScore;
    index: number;
}

function CategoryCell({ points, total }: { points: number; total: number }) {
    return (
        <span className="font-bold tabular-nums">
            {points} <span className="text-gray-500 font-normal">pts ({total})</span>
        </span>
    );
}

function TeamBadges({ badges, civs }: { badges: number[]; civs: string[] }) {
    if (badges.length === 0 && civs.length === 0) return <span className="text-gray-600">—</span>;
    return (
        <div className="flex items-center gap-1 flex-wrap">
            {badges.map((threshold) => {
                const badge = getTierBadge(threshold);
                if (!badge) return null;
                return <TierBadge key={threshold} badge={badge} size={20} />;
            })}
            {civs.map((civ) => (
                <KingBadge key={civ} civ={civ} size={20} />
            ))}
        </div>
    );
}

function ChallengePointsCell({ team }: { team: IWololoTeamScore }) {
    const items = team.challenges.entries.map(e => `${e.playerName}: ${e.label} (+${e.points})`);
    return (
        <span className="relative group cursor-default text-purple-400 font-bold tabular-nums">
            {team.challenges.points}
            {items.length > 0 && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 pb-2 hidden group-hover:block z-50 w-56">
                    <WonListTooltip title="Challenge points" items={items} />
                </div>
            )}
        </span>
    );
}

export function TeamRow({ team, index }: TeamRowProps) {
    const accent = COLOR_PALETTE_HEX[team.color] ?? DEFAULT_TEAM_COLOR_HEX;

    return (
        <div className={`px-3 sm:px-4 hover:bg-white/5 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white/[0.02]' : ''}`}>
            {/* Mobile */}
            <div className="lg:hidden py-3 space-y-1.5">
                <div className="flex items-center gap-2">
                    <span className="text-gray-600 font-bold text-xs w-5 text-right flex-shrink-0">{team.rank}</span>
                    <span className="font-bold text-sm truncate flex-1" style={{ color: accent }}>
                        {team.name}
                    </span>
                    {team.captainName && <span className="text-[11px] text-gray-500 flex-shrink-0">👑 {team.captainName}</span>}
                </div>
                <div className="grid grid-cols-4 pl-7 text-xs">
                    <div className="text-green-400"><CategoryCell points={team.categories.wins.points} total={team.categories.wins.total} /></div>
                    <div className="text-amber-400"><CategoryCell points={team.categories.civs.points} total={team.categories.civs.total} /></div>
                    <div className="text-cyan-400"><CategoryCell points={team.categories.maps.points} total={team.categories.maps.total} /></div>
                    <div className="text-white font-black">{team.totalPoints}</div>
                </div>
                <div className="pl-7 flex items-center gap-3">
                    <TeamBadges badges={team.tiers.badges} civs={team.kings.civs} />
                    <span className="text-[11px]"><ChallengePointsCell team={team} /> <span className="text-gray-500">challenges</span></span>
                </div>
            </div>

            {/* Desktop */}
            <div className="hidden lg:grid grid-cols-12 gap-2 items-center py-3">
                <div className="col-span-1 text-center">
                    <span className="text-gray-500 font-bold">{team.rank}</span>
                </div>
                <div className="col-span-3 flex items-center gap-2 min-w-0">
                    <span className="font-bold truncate" style={{ color: accent }}>{team.name}</span>
                    {team.captainName && <span className="text-[11px] text-gray-500 truncate">👑 {team.captainName}</span>}
                </div>
                <div className="col-span-1 text-center text-green-400">
                    <CategoryCell points={team.categories.wins.points} total={team.categories.wins.total} />
                </div>
                <div className="col-span-1 text-center text-amber-400">
                    <CategoryCell points={team.categories.civs.points} total={team.categories.civs.total} />
                </div>
                <div className="col-span-1 text-center text-cyan-400">
                    <CategoryCell points={team.categories.maps.points} total={team.categories.maps.total} />
                </div>
                <div className="col-span-2 flex items-center justify-center">
                    <TeamBadges badges={team.tiers.badges} civs={team.kings.civs} />
                </div>
                <div className="col-span-1 text-center">
                    <ChallengePointsCell team={team} />
                </div>
                <div className="col-span-2 text-center">
                    <span className="text-white font-black tabular-nums">{team.totalPoints}</span>
                </div>
            </div>
        </div>
    );
}
