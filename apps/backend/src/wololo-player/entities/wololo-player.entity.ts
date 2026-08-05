import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('wololo_players')
export class WololoPlayerEntity {
  @PrimaryColumn({ name: 'profile_id' })
  profileId: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ name: 'twitch_login', type: 'varchar', nullable: true })
  twitchLogin: string | null;

  @Column({ name: 'is_cap', type: 'boolean' })
  isCap: boolean;

  @Column({ name: 'team_id', type: 'varchar', nullable: true })
  teamId: string;

  @Column({ name: 'games_count', type: 'int' })
  gamesCount: number;

  @Column({ name: 'civs_won', type: 'simple-array', nullable: true })
  civsWon: string[];

  @Column({ name: 'civs_won', type: 'simple-array', nullable: true })
  mapsWon: string[];

  @Column({ type: 'int' })
  wins: number;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
