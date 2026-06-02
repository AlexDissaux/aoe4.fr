import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('wololo_teams')
export class WololoTeamEntity {
    @PrimaryColumn({ type: 'varchar' })
    id: string;

    @Column({ type: 'varchar' })
    name: string;

    @Column({ type: 'varchar' })
    color: string;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
