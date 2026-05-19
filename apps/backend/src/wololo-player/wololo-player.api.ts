import { Injectable, Logger } from "@nestjs/common";
import { sinceDate, wololoPlayersData } from "./wololo-player.data";
import { delay } from "../common/utils";

const API_BASE_URL = 'https://aoe4world.com/api/v0';

interface PlayerGamesResponse {
    total_count: number;
    games: any[];
}

export interface WololoPlayerRaw {
    profileId: number;
    name: string;
    team: string;
    isCap: boolean;
    games: any[];
}

@Injectable()
export class WololoPlayerApi {
    private readonly logger = new Logger(WololoPlayerApi.name);

    async fetchAllWololoPlayers(): Promise<WololoPlayerRaw[]> {
        const results: WololoPlayerRaw[] = [];

        for (const playerEntry of wololoPlayersData) {
            await delay(300);
            try {
                const [playerData, games] = await Promise.all([
                    this.fetchPlayerInfo(playerEntry.id),
                    this.fetchPlayerGames(playerEntry.id),
                ]);

                results.push({
                    profileId: Number(playerEntry.id),
                    name: playerData.name ?? `Player ${playerEntry.id}`,
                    team: playerEntry.team,
                    isCap: playerEntry.isCap,
                    games,
                });
            } catch (err) {
                this.logger.error(`Failed to fetch player ${playerEntry.id}: ${err}`);
            }
        }

        return results;
    }

    private async fetchPlayerInfo(playerId: string): Promise<any> {
        const response = await fetch(`${API_BASE_URL}/players/${playerId}`);
        return response.json();
    }

    private async fetchPlayerGames(playerId: string): Promise<any[]> {
        const firstPage = await (await fetch(
            `${API_BASE_URL}/players/${playerId}/games?since=${sinceDate}&leaderboard=rm_solo&page=1`
        )).json() as PlayerGamesResponse;

        if (firstPage.total_count === 0) return [];

        const games = [...firstPage.games];
        const totalPages = Math.ceil(firstPage.total_count / 50);

        for (let page = 2; page <= totalPages; page++) {
            await delay(200);
            const pageData = await (await fetch(
                `${API_BASE_URL}/players/${playerId}/games?since=${sinceDate}&leaderboard=rm_solo&page=${page}`
            )).json() as PlayerGamesResponse;
            games.push(...pageData.games);
        }

        return games;
    }
}
