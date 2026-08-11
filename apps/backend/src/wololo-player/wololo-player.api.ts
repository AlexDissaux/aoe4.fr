import { Injectable, Logger } from "@nestjs/common";
import { sinceDate, wololoPlayersData } from "./entities/wololo-player.data";
import { delay } from "../common/utils";
import { API_BASE_URL } from "src/config/api.config";
interface PlayerGamesResponse {
    total_count: number;
    games: any[];
}

export interface WololoPlayerRaw {
    profileId: number;
    name: string;
    teamId: string;
    team: string;
    isCap: boolean;
    games: any[];
    twitchLogin: string | null;
}

@Injectable()
export class WololoPlayerApi {
    private readonly logger = new Logger(WololoPlayerApi.name);

    public async fetchPlayerInfo(playerId: number): Promise<any> {
        try {
            const response = await fetch(`${API_BASE_URL}/players/${playerId}`);
            return response.json();
        } catch (err) {
            this.logger.error(`Failed to fetch player info for ${playerId}: ${err}`);
            throw err;
        }
    }

    public async fetchPlayerGames(playerId: number): Promise<any[]> {
        const firstPage = await (await fetch(
            `${API_BASE_URL}/players/${playerId}/games?since=${sinceDate}&leaderboard=rm_solo&page=1`
        )).json() as PlayerGamesResponse;

        if (firstPage.total_count === 0) return [];

        const games = [...firstPage.games];
        if (games[0].ongoing) {
            // Remove the first game if it's ongoing
            games.shift();
        }

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
