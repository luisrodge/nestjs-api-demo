import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialPurchases1598846759696 implements MigrationInterface {
  name = 'InitialPurchases1598846759696';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "purchases" ("id" SERIAL NOT NULL, "spentCredits" integer NOT NULL DEFAULT 0, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "businessId" integer, "bundleId" integer, CONSTRAINT "PK_1d55032f37a34c6eceacbbca6b8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "FK_c926ef94bc1571674f2bfa62cba" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" ADD CONSTRAINT "FK_db9762e5c995d4937a7276cc68f" FOREIGN KEY ("bundleId") REFERENCES "bundles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP CONSTRAINT "FK_db9762e5c995d4937a7276cc68f"`,
    );
    await queryRunner.query(
      `ALTER TABLE "purchases" DROP CONSTRAINT "FK_c926ef94bc1571674f2bfa62cba"`,
    );
    await queryRunner.query(`DROP TABLE "purchases"`);
  }
}
