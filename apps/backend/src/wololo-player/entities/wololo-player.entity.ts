import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('wololo_players')
export class WololoPlayerEntity {
  @PrimaryColumn({ name: 'profile_id' })
  profileId: number;

  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  team: string;

  @Column({ name: 'is_cap', type: 'boolean' })
  isCap: boolean;

  @Column({ name: 'games_count', type: 'int' })
  gamesCount: number;

  @Column({ type: 'int' })
  wins: number;

  @Column({ type: 'int' })
  losses: number;

  @Column({ name: 'win_rate', type: 'decimal', precision: 5, scale: 1 })
  winRate: number;

  @Column({ name: 'civs_won', type: 'simple-array', nullable: true })
  civsWon: string[];

  @Column({ name: 'twitch_login', type: 'varchar', nullable: true })
  twitchLogin: string | null;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
