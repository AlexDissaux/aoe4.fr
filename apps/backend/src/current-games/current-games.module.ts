import { Module } from "@nestjs/common";
import { CurrentGamesSyncScheduler } from "./current-games-sync.scheduler";
import { CurrentGamesService } from "./current-games.services";
import { PlayerModule } from "../player";
import { CurrentGamesController } from "./current-games.controller";
import { LeaderboardModule } from "../leaderboard/leaderboard.module";
import { WololoPlayerModule } from "../wololo-player/wololo-player.module";
import { CurrentGamesWololoPlayerService } from "./current-games-wololo-player.service";
import { CurrentGamesWololoPlayerScheduler } from "./current-games-wololo-player.scheduler";

@Module({
    imports: [PlayerModule, LeaderboardModule, WololoPlayerModule],
    controllers: [CurrentGamesController],
    providers: [
        CurrentGamesService,
        CurrentGamesSyncScheduler,
        CurrentGamesWololoPlayerService,
        CurrentGamesWololoPlayerScheduler,
    ]
})
export class CurrentGamesModule {}