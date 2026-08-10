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
