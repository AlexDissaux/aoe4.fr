import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WololoPlayerController } from './wololoPlayer.contoller';
import { WololoPlayerRepository } from './wololo-player.repository';
import { WololoPlayer } from './wololo-player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WololoPlayer])],
  controllers: [WololoPlayerController],
  providers: [WololoPlayerRepository],
})
export class WololoPlayerModule {}
