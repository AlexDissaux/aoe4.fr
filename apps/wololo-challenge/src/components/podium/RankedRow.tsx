import { IWololoTeamScore } from "@aoe4.fr/shared-types";
import { COLOR_PALETTE_HEX, DEFAULT_TEAM_COLOR_HEX } from '../../common/teamColors';

export function RankedRow({ team, rank }: { team: IWololoTeamScore; rank: number }) {
    const accent = COLOR_PALETTE_HEX[team.color] ?? DEFAULT_TEAM_COLOR_HEX;

    return (
        <div className="flex items-center gap-4 px-4 py-3 rounded-lg bg-gray-900/60 border border-white/5 hover:border-white/10 transition-colors">
            <span className="text-gray-500 font-bold tabular-nums w-5 text-center text-sm">{rank}</span>
            <div className="w-0.5 h-8 rounded-full flex-shrink-0" style={{ background: accent }} />
            <div className="flex-1 min-w-0">
                <div className="font-bold text-sm truncate" style={{ color: accent }}>{team.name}</div>
                {team.captainName && <div className="text-[11px] text-gray-500">👑 {team.captainName}</div>}
            </div>
            <div className="hidden sm:flex items-center gap-4 text-xs text-gray-400">
                <span>{team.categories.wins.total}<span className="text-gray-600"> wins</span></span>
                <span>{team.categories.civs.total}<span className="text-gray-600"> civs</span></span>
                <span>{team.categories.maps.total}<span className="text-gray-600"> maps</span></span>
            </div>
            <div className="font-black text-lg tabular-nums text-gray-300">
                {team.totalPoints}
                <span className="text-xs font-normal text-gray-600 ml-1">pts</span>
            </div>
        </div>
    );
}
