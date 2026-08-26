import { IWololoPlayerChallengeSummary } from '@aoe4.fr/shared-types';
import { PlayerLink } from '@aoe4.fr/ui';
import { COLOR_PALETTE_HEX, DEFAULT_TEAM_COLOR_HEX } from '../../common/teamColors';

interface ChallengeSummaryRowProps {
    summary: IWololoPlayerChallengeSummary;
    rank: number;
}

export function ChallengeSummaryRow({ summary, rank }: ChallengeSummaryRowProps) {
    const accent = COLOR_PALETTE_HEX[summary.teamColor] ?? DEFAULT_TEAM_COLOR_HEX;

    return (
        <div className="flex items-center gap-3 px-3 sm:px-4 py-3 odd:bg-white/[0.02] hover:bg-white/5 transition-colors duration-150">
            <span className="text-gray-500 font-bold text-sm w-5 text-right flex-shrink-0">{rank}</span>
            <span className="font-bold text-sm text-white truncate flex-1">
                <PlayerLink profileId={summary.profileId} name={summary.playerName} className="hover:underline" />
            </span>
            <span
                className="text-[11px] font-bold px-2 py-0.5 border flex-shrink-0"
                style={{ borderColor: accent, color: accent }}
            >
                {summary.teamName}
            </span>
            <span className="text-purple-400 font-black tabular-nums w-12 text-right flex-shrink-0">
                {summary.totalPoints}
            </span>
        </div>
    );
}
