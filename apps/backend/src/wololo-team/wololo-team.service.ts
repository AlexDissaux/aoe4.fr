import { Injectable } from '@nestjs/common';
import { IWololoTeam, IWololoTeamScore, IWololoTierBadgeStanding, IWololoCivKingStanding } from '@aoe4.fr/shared-types';
import { WololoTeamRepository } from './wololo-team.repository';
import { WololoPlayerRepository } from '../wololo-player/wololo-player.repository';
import { computeWololoTeamScores, computeWololoTierStandings } from './wololo-team.scoring';
import { computeCivKingStandings } from './wololo-king.scoring';

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
        const civKingStandings = computeCivKingStandings(players, teams);
        return computeWololoTeamScores(teams, players, civKingStandings);
    }

    async getTierStandings(): Promise<IWololoTierBadgeStanding[]> {
        const [teams, players] = await Promise.all([
            this.wololoTeamRepository.findAll(),
            this.wololoPlayerRepository.findAll(),
        ]);
        return computeWololoTierStandings(teams, players);
    }

    async getCivKingStandings(): Promise<IWololoCivKingStanding[]> {
        const [teams, players] = await Promise.all([
            this.wololoTeamRepository.findAll(),
            this.wololoPlayerRepository.findAll(),
        ]);
        return computeCivKingStandings(players, teams);
    }
}
