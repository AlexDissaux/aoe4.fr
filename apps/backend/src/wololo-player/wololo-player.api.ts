import { Injectable, Logger } from "@nestjs/common";
import { sinceDate, wololoPlayersData } from "./wololo-player.data";
import { WOLOLO_TEAMS_SEED } from "../wololo-team/wololo-team.data";
import { delay } from "../common/utils";

const TEAM_NAME_BY_ID = new Map(WOLOLO_TEAMS_SEED.map(t => [t.id, t.name]));

const API_BASE_URL = 'https://aoe4world.com/api/v0';

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

    async fetchAllWololoPlayers(): Promise<WololoPlayerRaw[]> {
        const results: WololoPlayerRaw[] = [];

        for (const playerEntry of wololoPlayersData) {
            await delay(300);
            try {
                const [playerData, games] = await Promise.all([
                    this.fetchPlayerInfo(playerEntry.id),
                    this.fetchPlayerGames(playerEntry.id),
                ]);

                const twitchUrl: string | null = playerData.social?.twitch ?? null;
                const twitchLogin = twitchUrl
                    ? twitchUrl.replace(/.*twitch\.tv\//, '').replace(/\/.*$/, '').toLowerCase() || null
                    : null;

                results.push({
                    profileId: Number(playerEntry.id),
                    name: playerData.name ?? `Player ${playerEntry.id}`,
                    teamId: playerEntry.teamId,
                    team: TEAM_NAME_BY_ID.get(playerEntry.teamId) ?? playerEntry.teamId,
                    isCap: playerEntry.isCap,
                    games,
                    twitchLogin,
                });
            } catch (err) {
                this.logger.error(`Failed to fetch player ${playerEntry.id}: ${err}`);
            }
        }

        return results;
    }

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
