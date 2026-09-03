import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WololoGamesService } from './wololo-games.service';
import { WololoGamesApi } from './wololo-games.api';
import { WololoGameEntity } from './wololo-games.entity';
import { WololoPlayerEntity } from '../wololo-player/entities/wololo-player.entity';
import { WololoPlayerModule } from '../wololo-player/wololo-player.module';

@Module({
  imports: [TypeOrmModule.forFeature([WololoGameEntity, WololoPlayerEntity]), WololoPlayerModule],
  providers: [WololoGamesService, WololoGamesApi],
  exports: [WololoGamesService],
})
export class WololoGamesModule {}
