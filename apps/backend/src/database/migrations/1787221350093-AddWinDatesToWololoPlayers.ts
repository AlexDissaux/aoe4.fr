import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWinDatesToWololoPlayers1787221350093 implements MigrationInterface {
  name = 'AddWinDatesToWololoPlayers1787221350093';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wololo_players" ADD "win_dates" text`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "wololo_players" DROP COLUMN "win_dates"`);
  }
}
