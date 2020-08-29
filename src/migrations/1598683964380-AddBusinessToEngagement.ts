import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddBusinessToEngagement1598683964380
  implements MigrationInterface {
  name = 'AddBusinessToEngagement1598683964380';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "engagements" ADD "businessId" integer NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "engagements" ADD CONSTRAINT "FK_8dc81caaa89c4cb0cc0cf7e5299" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "engagements" DROP CONSTRAINT "FK_8dc81caaa89c4cb0cc0cf7e5299"`,
    );
    await queryRunner.query(
      `ALTER TABLE "engagements" DROP COLUMN "businessId"`,
    );
  }
}
