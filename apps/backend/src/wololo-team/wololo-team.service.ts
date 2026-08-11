import { Injectable } from '@nestjs/common';
import { IWololoTeam } from '@aoe4.fr/shared-types';
import { WololoTeamRepository } from './wololo-team.repository';

@Injectable()
export class WololoTeamService {
    constructor(private readonly wololoTeamRepository: WololoTeamRepository) {}

    async getAll(): Promise<IWololoTeam[]> {
        return this.wololoTeamRepository.findAll();
    }
}
