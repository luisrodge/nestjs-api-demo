import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExpiresAtToPurchases1600569254812
  implements MigrationInterface {
  name = 'AddExpiresAtToPurchases1600569254812';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD "expiresAt" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "purchases" DROP COLUMN "expiresAt"`);
  }
}
