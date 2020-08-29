import {MigrationInterface, QueryRunner} from "typeorm";

export class AddBusinessToContacts1598667260057 implements MigrationInterface {
    name = 'AddBusinessToContacts1598667260057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" ADD "businessId" integer`);
        await queryRunner.query(`ALTER TABLE "contacts" ADD CONSTRAINT "FK_d0bcfd4756ee3dc38a0c252b2e2" FOREIGN KEY ("businessId") REFERENCES "businesses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "contacts" DROP CONSTRAINT "FK_d0bcfd4756ee3dc38a0c252b2e2"`);
        await queryRunner.query(`ALTER TABLE "contacts" DROP COLUMN "businessId"`);
    }

}
