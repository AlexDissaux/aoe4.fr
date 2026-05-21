import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WololoPlayer } from '@aoe4.fr/shared-types';
import { WololoPlayerEntity } from './entities/wololo-player.entity';

@Injectable()
export class WololoPlayerRepository {
  constructor(
    @InjectRepository(WololoPlayerEntity)
    private readonly repo: Repository<WololoPlayerEntity>,
  ) {}

  async findAll(): Promise<WololoPlayer[]> {
    const entities = await this.repo.find();
    return entities.map((e) => ({
      profileId: e.profileId,
      name: e.name,
      team: e.team,
      isCap: e.isCap,
      gamesCount: e.gamesCount,
      wins: e.wins,
      losses: e.losses,
      winRate: Number(e.winRate),
      civsWon: e.civsWon ?? [],
      twitchLogin: e.twitchLogin ?? null,
    }));
  }

  async upsertAll(players: WololoPlayer[]): Promise<void> {
    const entities: Partial<WololoPlayerEntity>[] = players.map((p) => ({
      profileId: p.profileId,
      name: p.name,
      team: p.team,
      isCap: p.isCap,
      gamesCount: p.gamesCount,
      wins: p.wins,
      losses: p.losses,
      winRate: p.winRate,
      civsWon: p.civsWon,
      twitchLogin: p.twitchLogin,
    }));
    await this.repo.upsert(entities, ['profileId']);
  }
}
