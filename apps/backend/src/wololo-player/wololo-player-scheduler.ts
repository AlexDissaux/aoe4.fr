import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { WololoPlayerService } from './wololo-player.service';

@Injectable()
export class WololoPlayerScheduler {
  private readonly logger = new Logger(WololoPlayerScheduler.name);

  constructor(private readonly wololoPlayerService: WololoPlayerService) {}

  // @Cron('*/4 * * * *')
  // async handleWololoPlayersSync(): Promise<void> {
  //   try {
  //     await this.wololoPlayerService.syncWololoPlayers();
  //   } catch (error) {
  //     this.logger.error('Scheduled wololo players sync failed:', error);
  //   }
  // }
}
