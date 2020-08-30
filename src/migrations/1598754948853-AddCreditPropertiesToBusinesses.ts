import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCreditPropertiesToBusinesses1598754948853
  implements MigrationInterface {
  name = 'AddCreditPropertiesToBusinesses1598754948853';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "businesses" ADD "rolloverCredits" integer NOT NULL DEFAULT 0`,
    );
    await queryRunner.query(
      `ALTER TABLE "businesses" ADD "spentCredits" integer NOT NULL DEFAULT 0`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "businesses" DROP COLUMN "spentCredits"`,
    );
    await queryRunner.query(
      `ALTER TABLE "businesses" DROP COLUMN "rolloverCredits"`,
    );
  }
}
