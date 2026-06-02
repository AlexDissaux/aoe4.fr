import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WololoTeamEntity } from './entities/wololo-team.entity';
import { WololoTeamRepository } from './wololo-team.repository';
import { WololoTeamService } from './wololo-team.service';
import { WololoTeamController } from './wololo-team.controller';

@Module({
    imports: [TypeOrmModule.forFeature([WololoTeamEntity])],
    controllers: [WololoTeamController],
    providers: [WololoTeamRepository, WololoTeamService],
    exports: [WololoTeamService],
})
export class WololoTeamModule {}
