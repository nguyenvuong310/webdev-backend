import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1736961062624 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `  CREATE INDEX idx_math_score ON score (math_score DESC);
        CREATE INDEX idx_physics_score ON score (physics_score DESC);
        CREATE INDEX idx_chemistry_score ON score (chemistry_score DESC);`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX idx_math_score;
        DROP INDEX idx_physics_score;
        DROP INDEX idx_chemistry_score;`,
    );
  }
}
