import { Logger } from "@nestjs/common";
import { delay } from "../common/utils";

export const API_BASE_URL = 'https://aoe4world.com/api/v0';

const PROFILE_IDS_BATCH_SIZE = 50;

interface GamesResponse {
    games: any[];
}

export async function fetchCurrentGames(profileIds: number[]): Promise<{ game: any; profileId: number }[]> {
    const since = new Date(Date.now() - 90 * 60 * 1000).toISOString();
    const allGames: { game: any; profileId: number }[] = [];

    const seenGameIds = new Set<number>();

    for (let i = 0; i < profileIds.length; i += PROFILE_IDS_BATCH_SIZE) {
        await delay(2000); // Add a delay between requests to avoid hitting rate limits
        const batch = profileIds.slice(i, i + PROFILE_IDS_BATCH_SIZE);
        const batchSet = new Set(batch);
        const url = `${API_BASE_URL}/games?since=${since}&profile_ids=${batch.join(',')}`;
        // Logger.debug('fetch url: ' + url);
        const res = await fetch(url);
        if (!res.ok) {
            Logger.warn(`aoe4world API returned ${res.status} for current games batch, skipping`, 'fetchCurrentGames');
            continue;
        }
        const response = await res.json() as GamesResponse;
        for (const game of (response.games ?? []).filter((game: any) => game?.ongoing && Array.isArray(game.teams))) {
            if (seenGameIds.has(game.game_id)) continue;
            seenGameIds.add(game.game_id);
            const profileId = (game.teams as any[][])
                .flat()
                .map((entry: any) => entry.player?.profile_id as number)
                .find((id) => batchSet.has(id)) ?? batch[0];
            allGames.push({ game, profileId });
        }
    }

    return allGames;
}