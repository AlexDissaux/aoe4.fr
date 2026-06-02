import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IWololoTeam } from '@aoe4.fr/shared-types';
import { WololoTeamEntity } from './entities/wololo-team.entity';

@Injectable()
export class WololoTeamRepository {
    constructor(
        @InjectRepository(WololoTeamEntity)
        private readonly repo: Repository<WololoTeamEntity>,
    ) {}

    async findAll(): Promise<IWololoTeam[]> {
        const entities = await this.repo.find({ order: { id: 'ASC' } });
        return entities.map((e) => ({
            id: e.id,
            name: e.name,
            color: e.color,
        }));
    }

    async upsertAll(teams: IWololoTeam[]): Promise<void> {
        const entities = teams.map((t) => ({ id: t.id, name: t.name, color: t.color }));
        await this.repo.upsert(entities, ['id']);
    }
}
