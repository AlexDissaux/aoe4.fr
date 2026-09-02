import { Injectable, OnApplicationBootstrap } from "@nestjs/common";
import { Cron } from "@nestjs/schedule";
import { CurrentGamesWololoPlayerService } from "./current-games-wololo-player.service";

@Injectable()
export class CurrentGamesWololoPlayerScheduler implements OnApplicationBootstrap {

    constructor(private readonly currentGamesWololoPlayerService: CurrentGamesWololoPlayerService) {}

    @Cron('0 */2 * * * *')
    async handleCurrentGamesWololoPlayerSync() {
        console.log('Syncing wololo player current games...');
        await this.currentGamesWololoPlayerService.setCurrentGamesFromWololoPlayers();
    }

    async onApplicationBootstrap() {
        // console.log('Running initial wololo player current games sync on startup...');
        // this.handleCurrentGamesWololoPlayerSync();
    }
}
