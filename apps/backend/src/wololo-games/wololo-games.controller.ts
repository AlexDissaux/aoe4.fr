import { Controller, Get } from '@nestjs/common';
import { IWololoGamesStats } from '@aoe4.fr/shared-types';
import { WololoGamesService } from './wololo-games.service';

@Controller('wololo-games')
export class WololoGamesController {
    constructor(private readonly wololoGamesService: WololoGamesService) {}

    @Get('stats')
    async getStats(): Promise<IWololoGamesStats> {
        const totalGames = await this.wololoGamesService.getTotalGamesCount();
        return { totalGames };
    }
}
