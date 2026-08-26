import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WololoChallengePointEntity } from './entities/wololo-challenge-point.entity';
import { WololoPlayerEntity } from '../wololo-player/entities/wololo-player.entity';
import { WololoTeamEntity } from '../wololo-team/entities/wololo-team.entity';
import { WololoChallengePointRepository } from './wololo-challenge-point.repository';
import { WololoChallengePointService } from './wololo-challenge-point.service';
import { WololoChallengePointController } from './wololo-challenge-point.controller';

@Module({
  imports: [TypeOrmModule.forFeature([WololoChallengePointEntity, WololoPlayerEntity, WololoTeamEntity])],
  controllers: [WololoChallengePointController],
  providers: [WololoChallengePointRepository, WololoChallengePointService],
  exports: [WololoChallengePointRepository],
})
export class WololoChallengePointModule {}
