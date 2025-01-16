import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736960114515 implements MigrationInterface {
  name = 'Migration1736960114515';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "math_score"`);
    await queryRunner.query(
      `ALTER TABLE "scores" ADD "math_score" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" DROP COLUMN "literature_score"`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" ADD "literature_score" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" DROP COLUMN "language_score"`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" ADD "language_score" double precision`,
    );
    await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "physics_score"`);
    await queryRunner.query(
      `ALTER TABLE "scores" ADD "physics_score" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" DROP COLUMN "chemistry_score"`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" ADD "chemistry_score" double precision`,
    );
    await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "biology_score"`);
    await queryRunner.query(
      `ALTER TABLE "scores" ADD "biology_score" double precision`,
    );
    await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "history_score"`);
    await queryRunner.query(
      `ALTER TABLE "scores" ADD "history_score" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" DROP COLUMN "geography_score"`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" ADD "geography_score" double precision`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" DROP COLUMN "civic_education_score"`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" ADD "civic_education_score" double precision`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "scores" DROP COLUMN "civic_education_score"`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" ADD "civic_education_score" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" DROP COLUMN "geography_score"`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" ADD "geography_score" integer`,
    );
    await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "history_score"`);
    await queryRunner.query(`ALTER TABLE "scores" ADD "history_score" integer`);
    await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "biology_score"`);
    await queryRunner.query(`ALTER TABLE "scores" ADD "biology_score" integer`);
    await queryRunner.query(
      `ALTER TABLE "scores" DROP COLUMN "chemistry_score"`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" ADD "chemistry_score" integer`,
    );
    await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "physics_score"`);
    await queryRunner.query(`ALTER TABLE "scores" ADD "physics_score" integer`);
    await queryRunner.query(
      `ALTER TABLE "scores" DROP COLUMN "language_score"`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" ADD "language_score" integer`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" DROP COLUMN "literature_score"`,
    );
    await queryRunner.query(
      `ALTER TABLE "scores" ADD "literature_score" integer`,
    );
    await queryRunner.query(`ALTER TABLE "scores" DROP COLUMN "math_score"`);
    await queryRunner.query(`ALTER TABLE "scores" ADD "math_score" integer`);
  }
}
