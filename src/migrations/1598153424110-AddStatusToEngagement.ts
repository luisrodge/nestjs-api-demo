import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStatusToEngagement1598153424110 implements MigrationInterface {
    name = 'AddStatusToEngagement1598153424110'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "engagements" ADD "status" character varying NOT NULL DEFAULT 'In Progress'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "engagements" DROP COLUMN "status"`);
    }

}
