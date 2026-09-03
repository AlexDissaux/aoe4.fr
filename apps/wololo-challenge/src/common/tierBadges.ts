// Maps each win-tier threshold to a rank icon, in ascending visual progression.
export interface TierBadgeDef {
    threshold: number;
    rankLevel: string;
    label: string;
}

export const TIER_BADGES: TierBadgeDef[] = [
    { threshold: 25, rankLevel: 'bronze_1', label: '25 wins' },
    { threshold: 100, rankLevel: 'silver_1', label: '100 wins' },
    { threshold: 200, rankLevel: 'gold_1', label: '200 wins' },
    { threshold: 300, rankLevel: 'gold_3', label: '300 wins' },
    { threshold: 400, rankLevel: 'platinum_2', label: '400 wins' },
    { threshold: 500, rankLevel: 'diamond_2', label: '500 wins' },
    { threshold: 700, rankLevel: 'conqueror_1', label: '700 wins' },
    { threshold: 1000, rankLevel: 'conqueror_3', label: '1000 wins' },
];

export const MAX_BADGES_PER_TIER = 10;
export const TIER_BADGE_POINTS = 5;

export function getTierBadge(threshold: number): TierBadgeDef | undefined {
    return TIER_BADGES.find((t) => t.threshold === threshold);
}

export function getTierBadgeTitle(badge: TierBadgeDef): string {
    return `${badge.label} milestone (+${TIER_BADGE_POINTS} pts)`;
}
