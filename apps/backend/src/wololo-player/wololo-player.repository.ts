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
    private readonly WololoPlayerRepo: Repository<WololoPlayerEntity>,
    @InjectRepository(WololoTeamEntity)
    private readonly WololoTeamRepo: Repository<WololoTeamEntity>,
  ) {}

  async findAll(): Promise<WololoPlayer[]> {
    // get all team to get name for each player
    const teams = new Map((await this.WololoTeamRepo.find()).map(team => [team.id, team.name]));

    const entities = await this.WololoPlayerRepo.find();
    return entities.map((e) => ({
      profileId: e.profileId,
      name: e.name ?? '',
      teamId: e.teamId ?? '',
      team: teams.get(e.teamId) ?? '',
      isCap: e.isCap,
      gamesCount: e.gamesCount ?? 0,
      wins: e.wins ?? 0,
      civsWon: e.civsWon ?? [],
      mapsWon: e.mapsWon ?? [],
      twitchLogin: e.twitchLogin ?? null,
      winDates: e.winDates ?? [],
      civWins: e.civWins ?? {},
    }));
  }

  async upsertAll(players: WololoPlayer[]): Promise<void> {
    const entities: Partial<WololoPlayerEntity>[] = players.map((p) => ({
      profileId: p.profileId,
      name: p.name,
      gamesCount: p.gamesCount,
      teamId: p.teamId,
      isCap: p.isCap,
      wins: p.wins,
      civsWon: p.civsWon,
      mapsWon: p.mapsWon,
      twitchLogin: p.twitchLogin,
      winDates: p.winDates,
      civWins: p.civWins,
    }));
    await this.WololoPlayerRepo.upsert(entities, ['profileId']);
  }
}
