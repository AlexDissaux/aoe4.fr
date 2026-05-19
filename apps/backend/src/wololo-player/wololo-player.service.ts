import { Injectable, Logger, OnApplicationBootstrap } from "@nestjs/common";
import { WololoPlayer } from "@aoe4.fr/shared-types";
import { WololoPlayerApi } from "./wololo-player.api";
import { toWololoPlayer } from "./wololo-player.mapper";

@Injectable()
export class WololoPlayerService implements OnApplicationBootstrap {
    private readonly logger = new Logger(WololoPlayerService.name);
    private wololoPlayers: WololoPlayer[] = [];

    constructor(private readonly wololoPlayerApi: WololoPlayerApi) {}

    onApplicationBootstrap() {
        this.syncWololoPlayers();
    }

    getWololoPlayers(): WololoPlayer[] {
        return this.wololoPlayers;
    }

    async syncWololoPlayers(): Promise<void> {
        this.logger.log('Syncing wololo players...');
        const rawPlayers = await this.wololoPlayerApi.fetchAllWololoPlayers();
        this.wololoPlayers = rawPlayers.map(toWololoPlayer);
        this.logger.log(`Synced ${this.wololoPlayers.length} wololo players`);
    }
}
