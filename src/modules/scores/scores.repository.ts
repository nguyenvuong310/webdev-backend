import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';
import { ChartDto } from './dto/chart.dto';
import { ChartCircletDto } from './dto/chartCircle.dto';

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

  //List top 10 students of group A00 including (math, physics, chemistry)
  async top10StudentsGroupA00(): Promise<Score[]> {
    const top10StudentsGroupA = await this.scoreRepository
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
        `COALESCE(score.math, 0) + COALESCE(score.physics, 0) + COALESCE(score.chemistry, 0)`,
        'DESC',
      )
      .limit(10)
      .getMany();

    return top10StudentsGroupA;
  }
  //List top 10 students of group A01 including (math, language, physics)
  async top10StudentsGroupA01(): Promise<Score[]> {
    const top10StudentsGroupA01 = await this.scoreRepository
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
        `COALESCE(score.math, 0) + COALESCE(score.physics, 0) + COALESCE(score.language, 0)`,
        'DESC',
      )
      .limit(10)
      .getMany();

    return top10StudentsGroupA01;
  }

  //List top 10 students of group B00 including (math, biology, chemistry)
  async top10StudentsGroupB00(): Promise<Score[]> {
    const top10StudentsGroupB00 = await this.scoreRepository
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
        `COALESCE(score.math, 0) + COALESCE(score.chemistry, 0) + COALESCE(score.biology, 0)`,
        'DESC',
      )
      .limit(10)
      .getMany();

    return top10StudentsGroupB00;
  }

  //List top 10 students of group D01 including (math, literature,langugae)
  async top10StudentsGroupD01(): Promise<Score[]> {
    const top10StudentsGroupD01 = await this.scoreRepository
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
        `COALESCE(score.math, 0) + COALESCE(score.literature, 0) + COALESCE(score.language, 0)`,
        'DESC',
      )
      .limit(10)
      .getMany();

    return top10StudentsGroupD01;
  }

  //List top 10 students of group C00 including (literature, history, geography)
  async top10StudentsGroupC00(): Promise<Score[]> {
    const top10StudentsGroupC00 = await this.scoreRepository
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
        `COALESCE(score.history, 0) + COALESCE(score.literature, 0) + COALESCE(score.geography, 0)`,
        'DESC',
      )
      .limit(10)
      .getMany();

    return top10StudentsGroupC00;
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

  async getSubjectScoreChartCircle(subject: string): Promise<ChartDto> {
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

    return new ChartCircletDto(value);
  }
}
