import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WololoPlayerController } from './wololo-player.contoller';
import { WololoPlayerService } from './wololo-player.service';
import { WololoPlayerApi } from './wololo-player.api';
import { WololoPlayerRepository } from './wololo-player.repository';
import { WololoPlayerEntity } from './entities/wololo-player.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WololoPlayerEntity])],
  controllers: [WololoPlayerController],
  providers: [WololoPlayerService, WololoPlayerApi, WololoPlayerRepository],
})
export class WololoPlayerModule {}
