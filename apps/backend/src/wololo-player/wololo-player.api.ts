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
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status} ${response.statusText}`);
            }
            this.logger.log(`Fetched player info for ${playerId}`);
            return response.json();
        } catch (err) {
            this.logger.error(`Failed to fetch player info for ${playerId}: ${err}`);
            throw err;
        }
    }

    public async fetchPlayerGames(playerId: number): Promise<any[]> {
        this.logger.log(`Fetching player games for ${playerId}`);
        const soloGames = await this.fetchPlayerGamesForLeaderboard(playerId, "rm_solo");
        await delay(200);
        const teamGames = await this.fetchPlayerGamesForLeaderboard(playerId, "rm_team");

        return [...soloGames, ...teamGames];
    }

    private async fetchPlayerGamesForLeaderboard(playerId: number, leaderboard: "rm_solo" | "rm_team"): Promise<any[]> {
        const firstPage = await this.fetchGamesPage(playerId, leaderboard, 1);

        if (firstPage.total_count === 0) return [];

        const games = [...firstPage.games];
        if (games[0].ongoing) {
            // Remove the first game if it's ongoing
            games.shift();
        }

        const totalPages = Math.ceil(firstPage.total_count / 50);

        for (let page = 2; page <= totalPages; page++) {
            await delay(200);
            const pageData = await this.fetchGamesPage(playerId, leaderboard, page);
            games.push(...pageData.games);
        }

        return games;
    }

    private async fetchGamesPage(playerId: number, leaderboard: "rm_solo" | "rm_team", page: number): Promise<PlayerGamesResponse> {
        const response = await fetch(
            `${API_BASE_URL}/players/${playerId}/games?since=${sinceDate}&leaderboard=${leaderboard}&page=${page}`
        );
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        return response.json() as Promise<PlayerGamesResponse>;
    }
}
