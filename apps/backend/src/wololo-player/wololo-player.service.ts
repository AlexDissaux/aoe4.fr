import { Inject, Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { WololoPlayer } from "@aoe4.fr/shared-types";
import { ITwitchStream, ITwitchVod } from "@aoe4.fr/shared-types";
import { WololoPlayerApi } from "./wololo-player.api";
import { WololoPlayerRepository } from "./wololo-player.repository";
import { TwitchApiService } from "../twitch/twitch-api.service";
import { delay } from "src/common/utils/delay.service";
import { getPlayerResult, getWonCivs } from "src/common/utils/games.utils";

@Injectable()
export class WololoPlayerService {
    @Inject(WololoPlayerRepository)
    private readonly wololoPlayerRepository: WololoPlayerRepository;
    private readonly logger = new Logger(WololoPlayerService.name);

    constructor(
        private readonly wololoPlayerApi: WololoPlayerApi,
        private readonly twitchApiService: TwitchApiService,
    ) {}

    async syncWololoPlayers(): Promise<void> {
        const wololoPlayers = await this.wololoPlayerRepository.findAll();
        for (let wololoPlayer of wololoPlayers) {

            await delay(300);            

            wololoPlayer = await this.updateWololoPlayerInfo(wololoPlayer);
            wololoPlayer = await this.updateWololoPlayerScores(wololoPlayer);
        }

        await this.wololoPlayerRepository.upsertAll(wololoPlayers);

        this.logger.log(`Synced ${wololoPlayers.length} wololo players`);
    }

    private async updateWololoPlayerScores(wololoPlayer: WololoPlayer): Promise<WololoPlayer> {
        const wololoPlayerGames = await this.wololoPlayerApi.fetchPlayerGames(wololoPlayer.profileId);
        const gamesWon = wololoPlayerGames.filter(g => getPlayerResult(g, wololoPlayer.profileId) === 'win');            
        wololoPlayer.gamesCount = wololoPlayerGames.length;
        wololoPlayer.wins = gamesWon.length;
        wololoPlayer.civsWon = getWonCivs(wololoPlayerGames, wololoPlayer.profileId);
        wololoPlayer.mapsWon = Array.from(new Set(gamesWon.map(g => g.map)));
        return wololoPlayer;
    }

    private async updateWololoPlayerInfo(wololoPlayer: WololoPlayer): Promise<WololoPlayer> {
        const wololoPlayerInfo = await this.wololoPlayerApi.fetchPlayerInfo(wololoPlayer.profileId);
        const twitchUrl: string | null = wololoPlayerInfo.social?.twitch ?? null;
        const twitchLogin = twitchUrl
            ? twitchUrl.replace(/.*twitch\.tv\//, '').replace(/\/.*$/, '').toLowerCase() || null
            : null;
        wololoPlayer.twitchLogin = twitchLogin;
        wololoPlayer.name = wololoPlayerInfo.name ?? wololoPlayer.name;
        return wololoPlayer;
    }

    async getWololoStreams(): Promise<ITwitchStream[]> {
        const logins = await this.getTwitchLogins();
        if (logins.length === 0) return [];
        return this.twitchApiService.fetchStreamsByLogins(logins);
    }

    async getWololoVods(): Promise<ITwitchVod[]> {
        const logins = await this.getTwitchLogins();
        if (logins.length === 0) return [];
        return this.twitchApiService.fetchVodsByLogins(logins);
    }


    private async getTwitchLogins(): Promise<string[]> {
        return (await this.wololoPlayerRepository.findAll())
            .map(p => p.twitchLogin)
            .filter((l): l is string => l !== null && l.length > 0);
    }
}
