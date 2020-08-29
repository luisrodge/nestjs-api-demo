import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddSubscriptionToBusinesses1598742122870
  implements MigrationInterface {
  name = 'AddSubscriptionToBusinesses1598742122870';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "businesses" ADD "subscriptionId" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "businesses" ADD CONSTRAINT "FK_f31d55a74e41d5f5e36bca8ed5d" FOREIGN KEY ("subscriptionId") REFERENCES "subscriptions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "businesses" DROP CONSTRAINT "FK_f31d55a74e41d5f5e36bca8ed5d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "businesses" DROP COLUMN "subscriptionId"`,
    );
  }
}
