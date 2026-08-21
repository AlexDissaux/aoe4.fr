export function getPlayerResult(game: any, profileId: number): string {
    for (const team of game.teams ?? []) {
        for (const entry of team) {
            if (entry.player?.profile_id === profileId) {
                return entry.player.result ?? '';
            }
        }
    }
    return '';
}

export function getWonCivs(games: any[], profileId: number): string[] {
    const civs = new Set<string>();
    for (const game of games) {
        for (const team of game.teams ?? []) {
            for (const entry of team) {
                if (entry.player?.profile_id === profileId && entry.player.result === 'win') {
                    const civ = entry.player.civilization;
                    if (civ) civs.add(civ);
                }
            }
        }
    }
    return Array.from(civs).sort();
}

// Win count per civilization, used to determine a player's "king" civilization.
export function getCivWinCounts(games: any[], profileId: number): Record<string, number> {
    const civWins: Record<string, number> = {};
    for (const game of games) {
        for (const team of game.teams ?? []) {
            for (const entry of team) {
                if (entry.player?.profile_id === profileId && entry.player.result === 'win') {
                    const civ = entry.player.civilization;
                    if (civ) civWins[civ] = (civWins[civ] ?? 0) + 1;
                }
            }
        }
    }
    return civWins;
}

// Finish date of each won game, used to determine when a team reaches a win-tier.
export function getWonGameDates(games: any[], profileId: number): string[] {
    const dates: string[] = [];
    for (const game of games) {
        if (getPlayerResult(game, profileId) !== 'win') continue;
        const date = game.updated_at ?? game.started_at;
        if (date) dates.push(date);
    }
    return dates.sort();
}
