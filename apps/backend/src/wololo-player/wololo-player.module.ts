import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WololoPlayerController } from './wololo-player.contoller';
import { WololoPlayerService } from './wololo-player.service';
import { WololoPlayerApi } from './wololo-player.api';
import { WololoPlayerRepository } from './wololo-player.repository';
import { WololoPlayerEntity } from './entities/wololo-player.entity';
import { WololoTeamEntity } from 'src/wololo-team/entities/wololo-team.entity';
import { WololoGameEntity } from 'src/wololo-games/wololo-games.entity';
import { TwitchModule } from '../twitch/twitch.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([WololoPlayerEntity, WololoTeamEntity, WololoGameEntity]),
    TwitchModule,
  ],
  controllers: [WololoPlayerController],
  providers: [WololoPlayerService, WololoPlayerApi, WololoPlayerRepository],
  exports: [WololoPlayerRepository],
})
export class WololoPlayerModule {}
