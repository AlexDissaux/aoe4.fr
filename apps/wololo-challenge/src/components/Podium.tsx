import { useTeams, } from '../hook/useTeams';
import type { Team } from '../api/team.service';

const TEAM_ACCENT: Record<string, string> = {
    'ODW':         '#f97316',
    'Lash':        '#94a3b8',
    'aoeItalia':   '#22c55e',
    'cup of tea':  '#06b6d4',
    'Shing Shong': '#a855f7',
};

const RANK_CONFIG = [
    { medal: '🥇', podiumColor: '#ca8a04', scoreColor: '#fbbf24', barHeight: 'h-20', order: 'order-2' },
    { medal: '🥈', podiumColor: '#6b7280', scoreColor: '#d1d5db', barHeight: 'h-14', order: 'order-1' },
    { medal: '🥉', podiumColor: '#b45309', scoreColor: '#fb923c', barHeight: 'h-10', order: 'order-3' },
];

function StatPill({ label, value, sub }: { label: string; value: string | number; sub?: string }) {
    return (
        <div className="flex flex-col items-center gap-0.5">
            <span className="text-[10px] uppercase tracking-widest text-gray-500 font-semibold">{label}</span>
            <span className="text-white font-bold text-sm leading-none">
                {value}{sub && <span className="text-gray-500 text-xs font-normal">{sub}</span>}
            </span>
        </div>
    );
}

function PodiumCard({ team, rank }: { team: Team; rank: number }) {
    const cfg = RANK_CONFIG[rank];
    const accent = TEAM_ACCENT[team.name] ?? '#6b7280';
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
                    <StatPill label="Civs" value={team.totalCivsWon} sub="/23" />
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

function RankedRow({ team, rank }: { team: Team; rank: number }) {
    const accent = TEAM_ACCENT[team.name] ?? '#6b7280';
    const captain = team.players.find((p: any) => p.isCap);

    return (
        <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-gray-900/60 border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-gray-500 font-bold tabular-nums w-5 text-center text-sm">{rank}</span>
            <div className="w-0.5 h-8 rounded-full flex-shrink-0" style={{ background: accent }} />
            <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate" style={{ color: accent }}>{team.name}</div>
                {captain && <div className="text-[11px] text-gray-500">👑 {captain.name}</div>}
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs text-gray-400">
                <span>{team.teamWinrate.winRate}<span className="text-gray-600">%</span></span>
                <span>{team.totalGames}<span className="text-gray-600"> games</span></span>
                <span>{team.totalCivsWon}<span className="text-gray-600">/23 civs</span></span>
            </div>
            <div className="font-black text-lg tabular-nums text-gray-300">
                {team.rankingPoints}
                <span className="text-xs font-normal text-gray-600 ml-1">pts</span>
            </div>
        </div>
    );
}

export default function Podium() {
    const { teams } = useTeams();

    if (!teams || teams.length === 0) {
        return (
            <div className="flex items-center justify-center py-16 text-gray-500 text-sm tracking-widest uppercase">
                Chargement du podium…
            </div>
        );
    }

    const top3 = teams.slice(0, 3);
    const rest = teams.slice(3);

    return (
        <div className="max-w-3xl mx-auto space-y-8 px-4 py-6">
            {/* Titre */}
            <div className="text-center">
                <h2 className="text-4xl font-black tracking-tight text-white">Classement</h2>
                <p className="text-gray-500 text-sm mt-1 tracking-widest uppercase">Wololo Challenge</p>
            </div>

            {/* Podium visuel top 3 */}
            <div className="flex items-end justify-center gap-3 sm:gap-6">
                {top3.map((team, i) => (
                    <PodiumCard key={team.name} team={team} rank={i} />
                ))}
            </div>

            {/* Reste du classement */}
            {rest.length > 0 && (
                <div className="space-y-2">
                    {rest.map((team, i) => (
                        <RankedRow key={team.name} team={team} rank={i + 4} />
                    ))}
                </div>
            )}
        </div>
    );
}
