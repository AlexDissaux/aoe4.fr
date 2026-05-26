import { Team } from "../../api/team.service";
import { getTeamAccent } from './teamAccent';

export function RankedRow({ team, rank }: { team: Team; rank: number }) {
    const accent = getTeamAccent(team.name);
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
                <span>{team.totalCivsWon}<span className="text-gray-600"> civs</span></span>
            </div>
            <div className="font-black text-lg tabular-nums text-gray-300">
                {team.rankingPoints}
                <span className="text-xs font-normal text-gray-600 ml-1">pts</span>
            </div>
        </div>
    );
}
