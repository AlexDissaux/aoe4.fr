import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WololoPlayer } from '@aoe4.fr/shared-types';
import { WololoPlayerEntity } from './entities/wololo-player.entity';
import { WololoTeamEntity } from 'src/wololo-team/entities/wololo-team.entity';

@Injectable()
export class WololoPlayerRepository {
  constructor(
    @InjectRepository(WololoPlayerEntity)
    private readonly repo: Repository<WololoPlayerEntity>,
    @InjectRepository(WololoTeamEntity)
    private readonly teamRepo: Repository<WololoTeamEntity>,
  ) {}

  async findAll(): Promise<WololoPlayer[]> {
    // get all team to get name for each player
    const teams = new Map((await this.teamRepo.find()).map(team => [team.id, team.name]));

    const entities = await this.repo.find();
    return entities.map((e) => ({
      profileId: e.profileId,
      name: e.name,
      teamId: e.teamId ?? '',
      team: teams.get(e.teamId) ?? '',
      isCap: e.isCap,
      gamesCount: e.gamesCount,
      wins: e.wins,
      civsWon: e.civsWon ?? [],
      mapsWon: e.mapsWon ?? [],
      twitchLogin: e.twitchLogin ?? null,
    }));
  }

  async upsertAll(players: WololoPlayer[]): Promise<void> {
    const entities: Partial<WololoPlayerEntity>[] = players.map((p) => ({
      profileId: p.profileId,
      name: p.name,
      teamId: p.teamId,
      isCap: p.isCap,
      gamesCount: p.gamesCount,
      wins: p.wins,
      civsWon: p.civsWon,
      mapsWon: p.mapsWon,
      twitchLogin: p.twitchLogin,
    }));
    await this.repo.upsert(entities, ['profileId']);

    // On supprime les joueurs qui ne sont plus dans la liste
    const activeProfileIds = players.map((p) => p.profileId);
    await this.repo
      .createQueryBuilder()
      .delete()
      .where('profile_id NOT IN (:...ids)', { ids: activeProfileIds })
      .execute();
  }
}
