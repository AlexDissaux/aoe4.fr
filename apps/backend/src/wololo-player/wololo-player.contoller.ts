import { Controller, Get } from "@nestjs/common";
import { WololoPlayerService } from "./wololo-player.service";


@Controller('wololoPlayer')
export class WololoPlayerController {
    constructor(private wololoPlayerService: WololoPlayerService) {}

    @Get()
    getWololoPlayer() {
        return this.wololoPlayerService.getWololoPlayers();
    }

    @Get('streams')
    getWololoStreams() {
        return this.wololoPlayerService.getWololoStreams();
    }

    @Get('vods')
    getWololoVods() {
        return this.wololoPlayerService.getWololoVods();
    }
}