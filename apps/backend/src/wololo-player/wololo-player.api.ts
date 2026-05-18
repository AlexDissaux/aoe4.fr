import { Injectable } from "@nestjs/common";
import { sinceDate } from "./wololo-player.data";


@Injectable()
export class WololoPLayerApi {

    async fetchWololoPlayer() {

        for (const player of wololoPlayersData) {
            const playerData = await (await fetch(`https://aoe4world.com/api/v0/players/${player.id}`)).json();
            await this.getPlayerDataGames(playerData, player.id);
        }
    }

    async getPlayerDataGames(playerData: any, playerId: string) {
        const games: any[] = [];
        const playerGamesPage1 = await (await fetch(`https://aoe4world.com/api/v0/players/${playerId}/games?since=${sinceDate}&leaderboard=rm_solo&page=1`)).json();
    if (playerGamesPage1.total_count === 0) {
        playerData.modes.rm_solo = {
            win_rate: 0,
            wins_count: 0,
            losses_count: 0,

        }
    } else {
        for (let i = 1; i <= Math.ceil(playerGamesPage1.total_count / 50); i++) {
            const playerGamesPage = await (await fetch(`https://aoe4world.com/api/v0/players/${playerId}/games?since=${sinceDate}&leaderboard=rm_solo&page=${i}`)).json();
            games.push(...playerGamesPage.games)
        }
    }
}