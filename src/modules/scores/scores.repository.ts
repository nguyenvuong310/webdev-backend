import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { ChartDto } from './dto/chart.dto';
import { ChartCircleDto } from './dto/chartCircle.dto';
import { GroupValue } from 'src/enums/group_type.enum';

@Injectable()
export class ScoresRepository {
  constructor(
    @InjectRepository(Score) private scoreRepository: Repository<Score>,
  ) {}
  async checkScore(registrationNo: string): Promise<Score> {
    return this.scoreRepository
      .createQueryBuilder('score')
      .leftJoinAndSelect('score.student', 'student')
      .select([
        'score.id',
        'score.math',
        'score.literature',
        'score.language',
        'score.physics',
        'score.chemistry',
        'score.biology',
        'score.history',
        'score.geography',
        'score.civic_education',
        'score.language_code',
        'student',
      ])
      .where('score.studentRegistrationNo = :registrationNo', {
        registrationNo,
      })
      .getOne();
  }

  async top10StudentsGroup(type: string): Promise<Score[]> {
    const collections = GroupValue[type];
    if (!collections || collections.length !== 3) {
      throw new Error(`Invalid group type: ${type}`);
    }

    const top10StudentsGroupByType = await this.scoreRepository
      .createQueryBuilder('score')
      .leftJoinAndSelect('score.student', 'student')
      .select([
        'score.id',
        'score.math',
        'score.literature',
        'score.language',
        'score.physics',
        'score.chemistry',
        'score.biology',
        'score.history',
        'score.geography',
        'score.civic_education',
        'score.language_code',
        'student',
      ])
      .orderBy(
        `COALESCE(score.${collections[0]}, 0) + COALESCE(score.${collections[1]}, 0) + COALESCE(score.${collections[2]}, 0)`,
        'DESC',
      )
      .limit(10)
      .getMany();

    return top10StudentsGroupByType;
  }

  async getSubjectScoreChartBar(subject: string): Promise<ChartDto> {
    const rawResults = await this.scoreRepository
      .createQueryBuilder('score')
      .select(
        `COUNT(CASE WHEN score.${subject} >= 8 AND score.${subject} IS NOT NULL THEN 1 END)`,
        'excellent',
      )
      .addSelect(
        `COUNT(CASE WHEN score.${subject} >= 6 AND score.${subject} < 8 AND score.${subject} IS NOT NULL THEN 1 END)`,
        'good',
      )
      .addSelect(
        `COUNT(CASE WHEN score.${subject} >= 4 AND score.${subject} < 6 AND score.${subject} IS NOT NULL THEN 1 END)`,
        'average',
      )
      .addSelect(
        `COUNT(CASE WHEN score.${subject} < 4 AND score.${subject} IS NOT NULL THEN 1 END)`,
        'poor',
      )
      .getRawOne();

    const value = [
      rawResults.excellent,
      rawResults.good,
      rawResults.average,
      rawResults.poor,
    ];

    return new ChartDto(value);
  }

  async getSubjectScoreChartCircle(subject: string): Promise<ChartCircleDto> {
    const rawResults = await this.scoreRepository
      .createQueryBuilder('score')
      .select(
        `COUNT(CASE WHEN score.${subject} >= 8 AND score.${subject} IS NOT NULL THEN 1 END)`,
        'excellent',
      )
      .addSelect(
        `COUNT(CASE WHEN score.${subject} >= 6 AND score.${subject} < 8 AND score.${subject} IS NOT NULL THEN 1 END)`,
        'good',
      )
      .addSelect(
        `COUNT(CASE WHEN score.${subject} >= 4 AND score.${subject} < 6 AND score.${subject} IS NOT NULL THEN 1 END)`,
        'average',
      )
      .addSelect(
        `COUNT(CASE WHEN score.${subject} < 4 AND score.${subject} IS NOT NULL THEN 1 END)`,
        'poor',
      )
      .addSelect(
        `COUNT(CASE WHEN score.${subject} IS NOT NULL THEN 1 END)`,
        'total',
      )
      .getRawOne();

    const value = [
      rawResults.excellent,
      rawResults.good,
      rawResults.average,
      rawResults.poor,
      rawResults.total,
    ];

    return new ChartCircleDto(value);
  }
}
