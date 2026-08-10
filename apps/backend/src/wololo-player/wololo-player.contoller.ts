import { Controller, Get, Inject } from "@nestjs/common";
import { WololoPlayerService } from "./wololo-player.service";
import { WololoPlayerRepository } from "./wololo-player.repository";


@Controller('wololoPlayer')
export class WololoPlayerController {
    @Inject(WololoPlayerService)
    private readonly wololoPlayerService: WololoPlayerService;
    @Inject(WololoPlayerRepository)
    private readonly wololoPlayerRepository: WololoPlayerRepository;

    @Get()
    getWololoPlayer() {
        return this.wololoPlayerRepository.findAll();
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