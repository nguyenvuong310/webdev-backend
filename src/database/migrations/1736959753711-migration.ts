import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736959753711 implements MigrationInterface {
  name = 'Migration1736959753711';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "scores" ("id" SERIAL NOT NULL, "math_score" integer, "literature_score" integer, "language_score" integer, "physics_score" integer, "chemistry_score" integer, "biology_score" integer, "history_score" integer, "geography_score" integer, "civic_education_score" integer, "language_code" character varying, "studentRegistrationNo" character varying NOT NULL, CONSTRAINT "REL_0295fd22e8dcb90240cff445ee" UNIQUE ("studentRegistrationNo"), CONSTRAINT "PK_c36917e6f26293b91d04b8fd521" PRIMARY KEY ("id"))`,
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
