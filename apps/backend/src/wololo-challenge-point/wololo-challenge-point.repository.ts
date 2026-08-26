import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IWololoChallengePointEntry } from '@aoe4.fr/shared-types';
import { WololoChallengePointEntity } from './entities/wololo-challenge-point.entity';
import { WololoPlayerEntity } from '../wololo-player/entities/wololo-player.entity';
import { WololoTeamEntity } from '../wololo-team/entities/wololo-team.entity';

@Injectable()
export class WololoChallengePointRepository {
  constructor(
    @InjectRepository(WololoChallengePointEntity)
    private readonly wololoChallengePointRepo: Repository<WololoChallengePointEntity>,
    @InjectRepository(WololoPlayerEntity)
    private readonly wololoPlayerRepo: Repository<WololoPlayerEntity>,
    @InjectRepository(WololoTeamEntity)
    private readonly wololoTeamRepo: Repository<WololoTeamEntity>,
  ) {}

  async findAll(): Promise<IWololoChallengePointEntry[]> {
    const [entries, players, teams] = await Promise.all([
      this.wololoChallengePointRepo.find(),
      this.wololoPlayerRepo.find(),
      this.wololoTeamRepo.find(),
    ]);

    const playersById = new Map(players.map((p) => [p.profileId, p]));
    const teamsById = new Map(teams.map((t) => [t.id, t]));

    return entries.map((e) => {
      const player = playersById.get(e.profileId);
      const team = player ? teamsById.get(player.teamId) : undefined;
      return {
        id: e.id,
        profileId: e.profileId,
        playerName: player?.name ?? '',
        teamId: player?.teamId ?? '',
        teamName: team?.name ?? '',
        teamColor: team?.color ?? '',
        points: e.points,
        label: e.label,
        createdAt: e.createdAt.toISOString(),
      };
    });
  }
}
