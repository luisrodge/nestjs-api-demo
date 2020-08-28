import {MigrationInterface, QueryRunner} from "typeorm";

export class AddTitleToEngagements1598145397607 implements MigrationInterface {
    name = 'AddTitleToEngagements1598145397607'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "engagements" ADD "title" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "engagements" DROP COLUMN "title"`);
    }

}
