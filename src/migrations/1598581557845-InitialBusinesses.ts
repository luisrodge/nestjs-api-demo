import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialBusinesses1598581557845 implements MigrationInterface {
    name = 'InitialBusinesses1598581557845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "businesses" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "businessId" character varying NOT NULL, "email" character varying NOT NULL, "address" character varying NOT NULL, "phoneNumber" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_76874e4d78318eb5a3af1c21125" UNIQUE ("businessId"), CONSTRAINT "PK_bc1bf63498dd2368ce3dc8686e8" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "businesses"`);
    }

}
