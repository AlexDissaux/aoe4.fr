const ACCENT_PALETTE = [
    '#f97316', '#22c55e', '#06b6d4', '#a855f7',
    '#ec4899', '#eab308', '#14b8a6', '#6366f1',
    '#f43f5e', '#84cc16',
];

export function getTeamAccent(name: string): string {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = (hash * 31 + name.charCodeAt(i)) >>> 0;
    }
    return ACCENT_PALETTE[hash % ACCENT_PALETTE.length];
}
