import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateBusinessesColsNullable1598667926233 implements MigrationInterface {
    name = 'UpdateBusinessesColsNullable1598667926233'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "businesses" ALTER COLUMN "email" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "businesses" ALTER COLUMN "address" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "businesses" ALTER COLUMN "phoneNumber" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "businesses" ALTER COLUMN "phoneNumber" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "businesses" ALTER COLUMN "address" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "businesses" ALTER COLUMN "email" SET NOT NULL`);
    }

}
