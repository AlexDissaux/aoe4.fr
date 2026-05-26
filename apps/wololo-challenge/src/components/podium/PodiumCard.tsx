import type { Team } from '../../api/team.service';
import { StatPill } from './StatPill';
import { getTeamAccent } from './teamAccent';


const RANK_CONFIG = [
    { medal: '🥇', podiumColor: '#ca8a04', scoreColor: '#fbbf24', barHeight: 'h-20', order: 'order-2' },
    { medal: '🥈', podiumColor: '#6b7280', scoreColor: '#d1d5db', barHeight: 'h-14', order: 'order-1' },
    { medal: '🥉', podiumColor: '#b45309', scoreColor: '#fb923c', barHeight: 'h-10', order: 'order-3' },
];


export function PodiumCard({ team, rank }: { team: Team; rank: number }) {
    const cfg = RANK_CONFIG[rank];
    const accent = getTeamAccent(team.name);
    const captain = team.players.find((p: any) => p.isCap);

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
                    {captain && (
                        <div className="text-[11px] text-gray-500 mt-0.5">👑 {captain.name}</div>
                    )}
                </div>
                <div
                    className="text-3xl font-black tabular-nums"
                    style={{ color: cfg.scoreColor }}
                >
                    {team.rankingPoints}
                    <span className="text-xs font-normal text-gray-500 ml-1">pts</span>
                </div>
                <div className="w-full border-t border-white/5 pt-2 flex justify-around">
                    <StatPill label="WR" value={`${team.teamWinrate.winRate}%`} />
                    <StatPill label="Games" value={team.totalGames} />
                    <StatPill label="Civs" value={team.totalCivsWon} sub="" />
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
