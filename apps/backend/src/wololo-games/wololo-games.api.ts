import { API_BASE_URL } from "src/config/api.config";
import { delay } from "../common/utils";
import { Injectable } from "@nestjs/common";

interface PlayerGamesResponse {
    total_count: number;
    games: any[];
}

function isGameFullyProcessed(game: any): boolean {
    if (game.ongoing) return false;
    return (game.teams ?? []).every((team: any[]) => team.every((entry) => entry.player?.result != null));
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
        const totalPages = Math.ceil(firstPage.total_count / 50);

        for (let page = 2; page <= totalPages; page++) {
            await delay(200);
            const pageData = await this.fetchGamesPage(playerId, leaderboard, page, lastGameDate);
            games.push(...pageData.games);
        }

        // A game can be non-ongoing yet still have a null result briefly while aoe4world finishes
        // processing it. Skip those too so they aren't permanently saved with an unresolved result —
        // they'll simply be re-fetched on the next sync since they never advance the "last game" cursor.
        return games.filter(isGameFullyProcessed);
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