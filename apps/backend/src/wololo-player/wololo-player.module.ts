import { Module } from '@nestjs/common';
import { WololoPlayerController } from './wololo-player.contoller';
import { WololoPlayerService } from './wololo-player.service';
import { WololoPlayerApi } from './wololo-player.api';

@Module({
  controllers: [WololoPlayerController],
  providers: [WololoPlayerService, WololoPlayerApi],
})
export class WololoPlayerModule {}
