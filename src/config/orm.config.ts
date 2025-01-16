import { DataSource, DataSourceOptions } from 'typeorm';
import * as dotenv from 'dotenv';
import { Student } from '../modules/students/entities/student.entity';
import { Score } from '../modules/scores/entities/score.entity';

dotenv.config();

export const ormConfig: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Student, Score],
  synchronize: false,
  migrationsRun: true,
  migrations: ['src/database/migrations/*.ts'],
};

export const AppDataSource = new DataSource(ormConfig);
