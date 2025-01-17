import { Module } from '@nestjs/common';
import { StudentsModule } from './modules/students/students.module';
import { ScoresModule } from './modules/scores/scores.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ServiceModule } from './services/service.module';
import { readFileSync } from 'fs';

@Module({
  imports: [
    ServiceModule,
    StudentsModule,
    ScoresModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_NAME'),
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: false,
        migrationsRun: true,
        migrations: ['dist/database/migrations/*.{ts,js}'],
        cli: {
          migrationsDir: 'src/database/migrations',
        },

        ssl:
          configService.get<string>('NODE_ENV') === 'production'
            ? { ca: readFileSync(__dirname + '/assets/ca.pem') }
            : false,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
