import { WololoPlayer } from "@aoe4.fr/shared-types";
import { WololoPlayerRaw } from "./wololo-player.api";

function getPlayerResult(game: any, profileId: number): string {
    for (const team of game.teams ?? []) {
        for (const entry of team) {
            if (entry.player?.profile_id === profileId) {
                return entry.player.result ?? '';
            }
        }
    }
    return '';
}

function getWonCivs(games: any[], profileId: number): string[] {
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

export function toWololoPlayer(raw: WololoPlayerRaw): WololoPlayer {
    const wins = raw.games.filter(g => getPlayerResult(g, raw.profileId) === 'win').length;
    const losses = raw.games.filter(g => getPlayerResult(g, raw.profileId) === 'loss').length;
    const total = wins + losses;

    return {
        profileId: raw.profileId,
        name: raw.name,
        team: raw.team,
        isCap: raw.isCap,
        gamesCount: total,
        wins,
        losses,
        winRate: total > 0 ? Math.round((wins / total) * 1000) / 10 : 0,
        civsWon: getWonCivs(raw.games, raw.profileId),
    };
}
