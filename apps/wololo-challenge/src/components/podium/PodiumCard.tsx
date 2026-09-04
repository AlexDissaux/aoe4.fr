import type { IWololoTeamScore } from '@aoe4.fr/shared-types';
import { StatPill } from './StatPill';
import { COLOR_PALETTE_HEX, DEFAULT_TEAM_COLOR_HEX } from '../../common/teamColors';


const RANK_CONFIG = [
    { medal: '🥇', podiumColor: '#ca8a04', scoreColor: '#fbbf24', barHeight: 'h-20', order: 'order-2', prize: '$1000' },
    { medal: '🥈', podiumColor: '#6b7280', scoreColor: '#d1d5db', barHeight: 'h-14', order: 'order-1', prize: '$600' },
    { medal: '🥉', podiumColor: '#b45309', scoreColor: '#fb923c', barHeight: 'h-10', order: 'order-3', prize: '$400' },
];


export function PodiumCard({ team, rank }: { team: IWololoTeamScore; rank: number }) {
    const cfg = RANK_CONFIG[rank];
    const accent = COLOR_PALETTE_HEX[team.color] ?? DEFAULT_TEAM_COLOR_HEX;

    return (
        <div className={`flex flex-col items-center gap-2 ${cfg.order} w-full max-w-[180px]`}>
            {/* Card */}
            <div
                className="w-full rounded-lg p-3 flex flex-col items-center gap-2 border border-white/5"
                style={{ background: `linear-gradient(160deg, ${accent}18 0%, #111827 100%)` }}
            >
                <div className="text-2xl">{cfg.medal}</div>
                <div className="text-center">
                    <div className="font-black text-base leading-tight" style={{ color: accent }}>{team.name}</div>
                    {team.captainName && (
                        <div className="text-[11px] text-gray-500 mt-0.5">👑 {team.captainName}</div>
                    )}
                </div>
                <div
                    className="text-3xl font-black tabular-nums"
                    style={{ color: cfg.scoreColor }}
                >
                    {team.totalPoints}
                    <span className="text-xs font-normal text-gray-500 ml-1">pts</span>
                </div>
                <div
                    className="text-sm font-bold px-2 py-0.5 rounded-full border"
                    style={{ color: cfg.scoreColor, borderColor: `${accent}40`, background: `${accent}10` }}
                >
                    💰 {cfg.prize}
                </div>
                <div className="w-full border-t border-white/5 pt-2 flex justify-around">
                    <StatPill label="Wins" value={team.categories.wins.total} />
                    <StatPill label="Civs" value={team.categories.civs.total} />
                    <StatPill label="Maps" value={team.categories.maps.total} />
                </div>
            </div>
            {/* Podium bar */}
            <div
                className={`w-full ${cfg.barHeight} rounded-t-sm`}
                style={{ background: `linear-gradient(to top, ${accent}40, ${accent}20)`, borderTop: `2px solid ${accent}60` }}
            />
        </div>
    );
}
