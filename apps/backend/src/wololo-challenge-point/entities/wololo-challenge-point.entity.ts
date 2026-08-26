import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('wololo_challenge_points')
export class WololoChallengePointEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'profile_id', type: 'int' })
  profileId: number;

  @Column({ type: 'int' })
  points: number;

  @Column({ type: 'varchar' })
  label: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;
}
