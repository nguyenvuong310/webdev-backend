import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresController } from './scores.controller';
import { ScoresRepository } from './scores.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { ServiceModule } from '../../services/service.module';

@Module({
  imports: [TypeOrmModule.forFeature([Score]), ServiceModule],
  controllers: [ScoresController],
  providers: [ScoresService, ScoresRepository],
})
export class ScoresModule {}
