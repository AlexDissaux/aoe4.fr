import { RankIcon } from '@aoe4.fr/ui';
import { IWololoTierBadgeStanding, IWololoTierClaim } from '@aoe4.fr/shared-types';
import { COLOR_PALETTE_HEX, DEFAULT_TEAM_COLOR_HEX } from '../../common/teamColors';
import { MAX_BADGES_PER_TIER, TierBadgeDef } from '../../common/tierBadges';

function formatReachedAt(iso: string): string {
    return new Date(iso).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

export interface TierCardProps {
    tier: TierBadgeDef;
    standing: IWololoTierBadgeStanding;
    active: boolean;
    onClick?: () => void;
}

export function TierCard({ tier, standing, active, onClick }: TierCardProps) {
    const { claimed } = standing;
    // Always render MAX_BADGES_PER_TIER rows so the card reads as "N of 10 slots" instead of a sparse/empty list.
    const slots: (IWololoTierClaim | null)[] = Array.from({ length: MAX_BADGES_PER_TIER }, (_, i) => claimed[i] ?? null);

    return (
        <div
            onClick={active ? undefined : onClick}
            className={`h-full flex flex-col bg-gray-900/60 border p-4 sm:p-6 transition-colors ${active
                ? 'border-amber-300/50 shadow-[0_0_50px_-12px_rgba(252,211,77,0.4)]'
                : 'border-gray-700/50 cursor-pointer'
                }`}
        >
            <div className="flex items-center gap-4 sm:gap-5 shrink-0">
                <RankIcon rankLevel={tier.rankLevel} size={active ? 88 : 60} className="shrink-0 drop-shadow-lg" />
                <div className="min-w-0 flex-1">
                    <div className={`font-black text-stone-100 uppercase tracking-wide truncate ${active ? 'text-2xl sm:text-3xl' : 'text-lg'}`}>
                        {tier.threshold} wins
                    </div>
                    <div className={`text-gray-400 ${active ? 'text-base sm:text-lg mt-1' : 'text-xs mt-0.5'}`}>
                        <span className="text-amber-300 font-bold">{claimed.length}</span>/{MAX_BADGES_PER_TIER} claimed
                    </div>
                    <div className="mt-1.5 h-1.5 w-full max-w-[200px] bg-gray-800 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-amber-300/80 rounded-full transition-all"
                            style={{ width: `${(claimed.length / MAX_BADGES_PER_TIER) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            <ol className={`mt-4 flex-1 min-h-0 overflow-y-auto space-y-1.5 pr-1 ${active ? 'text-sm' : 'text-xs pointer-events-none'}`}>
                {slots.map((claim, i) =>
                    claim ? (
                        <li key={claim.teamId} className="flex items-center gap-2 bg-black/20 border border-gray-800 rounded px-2 py-1">
                            <span className={`font-bold text-xs w-4 text-right flex-shrink-0 ${i === 0 ? 'text-amber-300' : 'text-gray-600'}`}>
                                {i + 1}
                            </span>
                            <span
                                className="truncate flex-1 font-bold"
                                style={{ color: COLOR_PALETTE_HEX[claim.color] ?? DEFAULT_TEAM_COLOR_HEX }}
                            >
                                {claim.name}
                            </span>
                            <span className="hidden sm:inline text-gray-500 text-xs flex-shrink-0">{formatReachedAt(claim.reachedAt)}</span>
                        </li>
                    ) : (
                        <li key={`empty-${i}`} className="flex items-center gap-2 rounded border border-dashed border-gray-800/70 px-2 py-1 opacity-40">
                            <span className="font-bold text-xs w-4 text-right flex-shrink-0 text-gray-700">{i + 1}</span>
                            <span className="italic text-gray-700">Open slot</span>
                        </li>
                    )
                )}
            </ol>
        </div>
    );
}
