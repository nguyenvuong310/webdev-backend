import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migration1737044884805 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE INDEX idx_math ON scores (math);
  CREATE INDEX idx_literature ON scores (literature);
  CREATE INDEX idx_language ON scores (language);
  CREATE INDEX idx_physics ON scores (physics);
  CREATE INDEX idx_chemistry ON scores (chemistry);
  CREATE INDEX idx_biology ON scores (biology);
  CREATE INDEX idx_history ON scores (history);
  CREATE INDEX idx_geography ON scores (geography);
  CREATE INDEX idx_civic_education ON scores (civic_education);`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP INDEX idx_math;
      DROP INDEX idx_literature;
      DROP INDEX idx_language;
      DROP INDEX idx_physics;
      DROP INDEX idx_chemistry;
      DROP INDEX idx_biology;
      DROP INDEX idx_history;
      DROP INDEX idx_geography;
      DROP INDEX idx_civic_education;
    `);
  }
}
