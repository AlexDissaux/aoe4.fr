import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { WololoPlayer } from "@aoe4.fr/shared-types";
import { ITwitchStream, ITwitchVod } from "@aoe4.fr/shared-types";
import { WololoPlayerApi } from "./wololo-player.api";
import { WololoPlayerRepository } from "./wololo-player.repository";
import { TwitchApiService } from "../twitch/twitch-api.service";
import { toWololoPlayer } from "./wololo-player.mapper";

@Injectable()
export class WololoPlayerService implements OnApplicationBootstrap {
    private readonly logger = new Logger(WololoPlayerService.name);
    private wololoPlayers: WololoPlayer[] = [];

    constructor(
        private readonly wololoPlayerApi: WololoPlayerApi,
        private readonly wololoPlayerRepository: WololoPlayerRepository,
        private readonly twitchApiService: TwitchApiService,
    ) {}

    async onApplicationBootstrap() {
        this.wololoPlayers = await this.wololoPlayerRepository.findAll();
        this.logger.log(`Loaded ${this.wololoPlayers.length} wololo players from DB`);
        this.syncWololoPlayers();
    }

    async getWololoPlayers(): Promise<WololoPlayer[]> {
        if (this.wololoPlayers.length === 0) {
            this.wololoPlayers = await this.wololoPlayerRepository.findAll();
        }
        return this.wololoPlayers;
    }

    async syncWololoPlayers(): Promise<void> {
        this.logger.log('Syncing wololo players...');
        const rawPlayers = await this.wololoPlayerApi.fetchAllWololoPlayers();
        this.wololoPlayers = rawPlayers.map(toWololoPlayer);
        await this.wololoPlayerRepository.upsertAll(this.wololoPlayers);
        this.logger.log(`Synced ${this.wololoPlayers.length} wololo players`);
    }

    private getTwitchLogins(): string[] {
        return this.wololoPlayers
            .map(p => p.twitchLogin)
            .filter((l): l is string => l !== null && l.length > 0);
    }

    async getWololoStreams(): Promise<ITwitchStream[]> {
        const logins = this.getTwitchLogins();
        if (logins.length === 0) return [];
        return this.twitchApiService.fetchStreamsByLogins(logins);
    }

    async getWololoVods(): Promise<ITwitchVod[]> {
        const logins = this.getTwitchLogins();
        if (logins.length === 0) return [];
        return this.twitchApiService.fetchVodsByLogins(logins);
    }
}
