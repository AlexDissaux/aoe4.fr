import { Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('players')
export class PlayerController {
  constructor(private readonly playerService: PlayerService) {}

  @Post('sync')
  @HttpCode(HttpStatus.ACCEPTED)
  syncPlayers(): void {
    this.playerService.syncPlayers();
  }
}
