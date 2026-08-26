import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWololoChallengePoints1787735491852 implements MigrationInterface {
  name = 'CreateWololoChallengePoints1787735491852';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "wololo_challenge_points" (
        "id" SERIAL PRIMARY KEY,
        "profile_id" integer NOT NULL,
        "points" integer NOT NULL,
        "label" character varying NOT NULL,
        "created_at" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "FK_wololo_challenge_points_profile_id" FOREIGN KEY ("profile_id") REFERENCES "wololo_players"("profile_id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "wololo_challenge_points"`);
  }
}
