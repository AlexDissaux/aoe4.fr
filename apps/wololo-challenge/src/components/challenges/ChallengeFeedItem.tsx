import { IWololoChallengePointEntry } from '@aoe4.fr/shared-types';
import { PlayerLink } from '@aoe4.fr/ui';
import { COLOR_PALETTE_HEX, DEFAULT_TEAM_COLOR_HEX } from '../../common/teamColors';

interface ChallengeFeedItemProps {
    entry: IWololoChallengePointEntry;
}

export function ChallengeFeedItem({ entry }: ChallengeFeedItemProps) {
    const accent = COLOR_PALETTE_HEX[entry.teamColor] ?? DEFAULT_TEAM_COLOR_HEX;

    return (
        <div className="flex items-center gap-3 px-3 sm:px-4 py-3 odd:bg-white/[0.02] hover:bg-white/5 transition-colors duration-150">
            <span className="text-gray-500 text-xs w-20 flex-shrink-0">
                {new Date(entry.createdAt).toLocaleDateString()}
            </span>
            <span className="font-bold text-sm text-white truncate">
                <PlayerLink profileId={entry.profileId} name={entry.playerName} className="hover:underline" />
            </span>
            <span
                className="text-[11px] font-bold px-2 py-0.5 border flex-shrink-0"
                style={{ borderColor: accent, color: accent }}
            >
                {entry.teamName}
            </span>
            <span className="text-gray-300 text-sm truncate flex-1">{entry.label}</span>
            <span className="text-purple-400 font-black tabular-nums flex-shrink-0">+{entry.points}</span>
        </div>
    );
}
