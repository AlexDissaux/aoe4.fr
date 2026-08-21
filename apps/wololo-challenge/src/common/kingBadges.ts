// Points awarded to a team for each civ crown it currently holds.
export const KING_POINTS = 15;

export function formatCivLabel(civ: string): string {
    return civ
        .split('_')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function getKingBadgeTitle(civ: string): string {
    return `King of ${formatCivLabel(civ)} (+${KING_POINTS} pts)`;
}
