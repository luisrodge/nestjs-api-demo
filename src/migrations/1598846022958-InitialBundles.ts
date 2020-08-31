import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialBundles1598846022958 implements MigrationInterface {
  name = 'InitialBundles1598846022958';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "bundles" ("id" SERIAL NOT NULL, "credits" integer NOT NULL, "price" integer, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a9118b2e4597aede4d5d4c43433" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "bundles"`);
  }
}
