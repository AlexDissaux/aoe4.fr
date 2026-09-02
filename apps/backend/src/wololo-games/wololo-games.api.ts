import { API_BASE_URL } from "src/config/api.config";
import { delay } from "../common/utils";
import { Injectable } from "@nestjs/common";

interface PlayerGamesResponse {
    total_count: number;
    games: any[];
}

@Injectable()
export class WololoGamesApi {
    private readonly logger = console; // Add a simple logger for demonstration purposes


    public async fetchPlayerGames(playerId: number, lastGameDate: string): Promise<any[]> {
        this.logger.log(`Fetching player games for ${playerId}`);
        const soloGames = await this.fetchPlayerGamesForLeaderboard(playerId, "rm_solo", lastGameDate);
        await delay(200);
        const teamGames = await this.fetchPlayerGamesForLeaderboard(playerId, "rm_team", lastGameDate);

        return [...soloGames, ...teamGames];
    }

    private async fetchPlayerGamesForLeaderboard(playerId: number, leaderboard: "rm_solo" | "rm_team", lastGameDate: string): Promise<any[]> {
        const firstPage = await this.fetchGamesPage(playerId, leaderboard, 1, lastGameDate);

        if (firstPage.total_count === 0) return [];

        const games = [...firstPage.games];
        if (games[0].ongoing) {
            // Remove the first game if it's ongoing
            games.shift();
        }

        const totalPages = Math.ceil(firstPage.total_count / 50);

        for (let page = 2; page <= totalPages; page++) {
            await delay(200);
            const pageData = await this.fetchGamesPage(playerId, leaderboard, page, lastGameDate);
            games.push(...pageData.games);
        }

        return games;
    }

    private async fetchGamesPage(playerId: number, leaderboard: "rm_solo" | "rm_team", page: number, lastGameDate: string): Promise<PlayerGamesResponse> {
        const response = await fetch(
            `${API_BASE_URL}/players/${playerId}/games?since=${lastGameDate}&leaderboard=${leaderboard}&page=${page}`
        );
        if (!response.ok) {
            throw new Error(`API request failed: ${response.status} ${response.statusText}`);
        }
        return response.json() as Promise<PlayerGamesResponse>;
    }

}