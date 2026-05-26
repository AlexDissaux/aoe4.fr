import type { Team } from '../../api/team.service';
import { StatPill } from './StatPill';
import { getTeamAccent } from './teamAccent';

const RANK_CONFIG = [
    { medal: '🥇', scoreColor: '#fbbf24' },
    { medal: '🥈', scoreColor: '#d1d5db' },
    { medal: '🥉', scoreColor: '#fb923c' },
];

export function PodiumCardInline({
    team,
    rank,
    maxPoints,
}: {
    team: Team;
    rank: number;
    maxPoints: number;
}) {
    const cfg = RANK_CONFIG[rank] ?? { medal: `#${rank + 1}`, scoreColor: '#d1d5db' };
    const accent = getTeamAccent(team.name);
    const captain = team.players.find((p: any) => p.isCap);
    const safeMax = maxPoints > 0 ? maxPoints : 1;
    const barPercent = Math.max(30, Math.round((team.rankingPoints / safeMax) * 100));

    return (
        <div
            className="w-full rounded-lg p-3 border border-white/5"
            style={{ background: `linear-gradient(160deg, ${accent}12 0%, #111827 100%)` }}
        >
            <div className="flex items-start justify-between gap-3 mb-3">
                <div className="min-w-0">
                    <div className="flex items-center gap-2">
                        <span className="text-xl leading-none">{cfg.medal}</span>
                        <span className="font-black text-base truncate" style={{ color: accent }}>
                            {team.name}
                        </span>
                    </div>
                    {captain && <div className="text-[11px] text-gray-500 mt-0.5">👑 {captain.name}</div>}
                </div>
                <div className="text-right shrink-0">
                    <div className="text-2xl font-black tabular-nums leading-none" style={{ color: cfg.scoreColor }}>
                        {team.rankingPoints}
                    </div>
                    <div className="text-[11px] text-gray-500">pts</div>
                </div>
            </div>

            <div className="h-2 w-full rounded-full bg-white/5 overflow-hidden mb-3">
                <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                        width: `${barPercent}%`,
                        background: `linear-gradient(90deg, ${accent}, ${accent}66)`,
                    }}
                />
            </div>

            <div className="w-full border-t border-white/5 pt-2 flex justify-around">
                <StatPill label="WR" value={`${team.teamWinrate.winRate}%`} />
                <StatPill label="Games" value={team.totalGames} />
                <StatPill label="Civs" value={team.totalCivsWon} sub="" />
            </div>
        </div>
    );
}