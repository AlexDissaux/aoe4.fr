import { RankIcon } from '@aoe4.fr/ui';
import { TierBadgeDef } from '../../common/tierBadges';

export interface TierSelectorProps {
    tiers: TierBadgeDef[];
    activeThreshold: number;
    onSelect: (threshold: number) => void;
}

export function TierSelector({ tiers, activeThreshold, onSelect }: TierSelectorProps) {
    return (
        <div className="flex flex-wrap justify-center gap-2 px-4 pb-1">
            {tiers.map((tier) => {
                const isActive = tier.threshold === activeThreshold;
                return (
                    <button
                        key={tier.threshold}
                        type="button"
                        onClick={() => onSelect(tier.threshold)}
                        title={tier.label}
                        className={`shrink-0 flex flex-col items-center gap-1 px-2 py-1.5 rounded-md border transition ${isActive
                            ? 'border-amber-300/70 bg-amber-300/10'
                            : 'border-transparent opacity-50 hover:opacity-90 hover:border-gray-600'
                            }`}
                    >
                        <RankIcon rankLevel={tier.rankLevel} size={28} />
                        <span className={`text-[10px] uppercase tracking-wide whitespace-nowrap ${isActive ? 'text-amber-300 font-bold' : 'text-gray-500'}`}>
                            {tier.threshold}
                        </span>
                    </button>
                );
            })}
        </div>
    );
}
