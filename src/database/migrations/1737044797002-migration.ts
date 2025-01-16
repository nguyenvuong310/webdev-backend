import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1737044797002 implements MigrationInterface {
  name = 'Migration1737044797002';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "scores" ("id" SERIAL NOT NULL, "math" double precision, "literature" double precision, "language" double precision, "physics" double precision, "chemistry" double precision, "biology" double precision, "history" double precision, "geography" double precision, "civic_education" double precision, "language_code" character varying, "studentRegistrationNo" character varying NOT NULL, CONSTRAINT "REL_0295fd22e8dcb90240cff445ee" UNIQUE ("studentRegistrationNo"), CONSTRAINT "PK_c36917e6f26293b91d04b8fd521" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "students" ("registrationNo" character varying NOT NULL, CONSTRAINT "PK_60f16c54676f44bc73073037eee" PRIMARY KEY ("registrationNo"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" ADD CONSTRAINT "FK_0295fd22e8dcb90240cff445ee5" FOREIGN KEY ("studentRegistrationNo") REFERENCES "students"("registrationNo") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "scores" DROP CONSTRAINT "FK_0295fd22e8dcb90240cff445ee5"`,
    );
    await queryRunner.query(`DROP TABLE "students"`);
    await queryRunner.query(`DROP TABLE "scores"`);
  }
}
