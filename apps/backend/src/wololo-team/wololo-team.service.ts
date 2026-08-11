import { Injectable } from '@nestjs/common';
import { IWololoTeam, IWololoTeamScore } from '@aoe4.fr/shared-types';
import { WololoTeamRepository } from './wololo-team.repository';
import { WololoPlayerRepository } from '../wololo-player/wololo-player.repository';
import { computeWololoTeamScores } from './wololo-team.scoring';

@Injectable()
export class WololoTeamService {
    constructor(
        private readonly wololoTeamRepository: WololoTeamRepository,
        private readonly wololoPlayerRepository: WololoPlayerRepository,
    ) {}

    async getAll(): Promise<IWololoTeam[]> {
        return this.wololoTeamRepository.findAll();
    }

    async getTeamScores(): Promise<IWololoTeamScore[]> {
        const [teams, players] = await Promise.all([
            this.wololoTeamRepository.findAll(),
            this.wololoPlayerRepository.findAll(),
        ]);
        return computeWololoTeamScores(teams, players);
    }
}
