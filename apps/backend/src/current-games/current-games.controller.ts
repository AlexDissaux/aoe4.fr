import { Controller, Get, Sse, MessageEvent } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { CurrentGamesService } from "./current-games.services";
import { CurrentGamesWololoPlayerService } from "./current-games-wololo-player.service";


@Controller('current-games')
export class CurrentGamesController {

    constructor(
        private readonly currentGamesService: CurrentGamesService,
        private readonly currentGamesWololoPlayerService: CurrentGamesWololoPlayerService,
    ) {}

    @Get('')
    async getCurrentPlaying() {
            return await this.currentGamesService.getCurrentGames();
    }

    @Sse('stream')
    streamCurrentGames(): Observable<MessageEvent> {
        return this.currentGamesService.games$.pipe(
            map(games => ({ data: games }) as MessageEvent),
        );
    }

    @Get('wololo-players')
    async getWololoPlayerCurrentGames() {
        return await this.currentGamesWololoPlayerService.getCurrentGames();
    }

    @Sse('wololo-players/stream')
    streamWololoPlayerCurrentGames(): Observable<MessageEvent> {
        return this.currentGamesWololoPlayerService.games$.pipe(
            map(games => ({ data: games }) as MessageEvent),
        );
    }

}