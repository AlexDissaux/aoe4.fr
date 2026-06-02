import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { IWololoTeam } from '@aoe4.fr/shared-types';
import { WololoTeamRepository } from './wololo-team.repository';
import { WOLOLO_TEAMS_SEED } from './wololo-team.data';

@Injectable()
export class WololoTeamService implements OnApplicationBootstrap {
    constructor(private readonly wololoTeamRepository: WololoTeamRepository) {}

    async onApplicationBootstrap() {
        await this.wololoTeamRepository.upsertAll(WOLOLO_TEAMS_SEED);
    }

    async getAll(): Promise<IWololoTeam[]> {
        return this.wololoTeamRepository.findAll();
    }
}
