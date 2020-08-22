import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitialEngagements1598135119228 implements MigrationInterface {
  name = 'InitialEngagements1598135119228';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "engagements" ("id" SERIAL NOT NULL, "message" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_aec8c95c82a37a5791001cdb9ae" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "engagement_contacts" ("engagementId" integer NOT NULL, "contactId" integer NOT NULL, CONSTRAINT "PK_1cdfe65a1952ffceaa6900802b2" PRIMARY KEY ("engagementId", "contactId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_54154c993e9294e85b03a58fc7" ON "engagement_contacts" ("engagementId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_6de59488705b24d61f41aa2b43" ON "engagement_contacts" ("contactId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "engagement_contacts" ADD CONSTRAINT "FK_54154c993e9294e85b03a58fc76" FOREIGN KEY ("engagementId") REFERENCES "engagements"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "engagement_contacts" ADD CONSTRAINT "FK_6de59488705b24d61f41aa2b436" FOREIGN KEY ("contactId") REFERENCES "contacts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "engagement_contacts" DROP CONSTRAINT "FK_6de59488705b24d61f41aa2b436"`,
    );
    await queryRunner.query(
      `ALTER TABLE "engagement_contacts" DROP CONSTRAINT "FK_54154c993e9294e85b03a58fc76"`,
    );
    await queryRunner.query(`DROP INDEX "IDX_6de59488705b24d61f41aa2b43"`);
    await queryRunner.query(`DROP INDEX "IDX_54154c993e9294e85b03a58fc7"`);
    await queryRunner.query(`DROP TABLE "engagement_contacts"`);
    await queryRunner.query(`DROP TABLE "engagements"`);
  }
}
