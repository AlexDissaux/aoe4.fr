import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCivWinsToWololoPlayers1787324295689 implements MigrationInterface {
  name = 'AddCivWinsToWololoPlayers1787324295689';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wololo_players" ADD "civ_wins" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wololo_players" DROP COLUMN "civ_wins"`);
  }
}
