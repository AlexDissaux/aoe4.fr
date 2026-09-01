import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

export interface WololoGameTeamPlayer {
  profile_id: number;
  name: string;
  country: string;
  result: 'win' | 'loss' | null;
  civilization: string;
  civilization_randomized: boolean;
}

@Entity('wololo_games')
export class WololoGameEntity {
  @PrimaryColumn({ name: 'game_id' })
  gameId: number;

  // The wololo player this row is tracked for, so a team game can have one row per tracked player
  @PrimaryColumn({ name: 'profile_id' })
  profileId: number;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @Column({ name: 'started_at' })
  startedAt: Date;

  @Column({ type: 'varchar' })
  map: string;

  @Column({ type: 'varchar' })
  leaderboard: string;

  @Column({ type: 'boolean' })
  ongoing: boolean;

  // Raw teams payload from the aoe4world API: array of teams, each an array of { player: WololoGameTeamPlayer }
  @Column({ type: 'simple-json' })
  teams: { player: WololoGameTeamPlayer }[][];
}
