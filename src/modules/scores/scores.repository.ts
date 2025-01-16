import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';

import { InjectRepository } from '@nestjs/typeorm';
import { Score } from './entities/score.entity';

@Injectable()
export class ScoresRepository {
  constructor(
    @InjectRepository(Score) private scoreRepository: Repository<Score>,
  ) {}
  async checkScore(registrationNo: string): Promise<Score> {
    return this.scoreRepository
      .createQueryBuilder('score')
      .where('score.studentRegistrationNo = :registrationNo', {
        registrationNo,
      })
      .getOne();
  }

  //List top 10 students of group A including (math, physics, chemistry)
  async top10StudentsGroupA(): Promise<Score[]> {
    const top10StudentsGroupA = await this.scoreRepository
      .createQueryBuilder('score')
      .select('*')
      .orderBy(
        `COALESCE(score.math_score, 0) + COALESCE(score.physics_score, 0) + COALESCE(score.chemistry_score, 0)`,
        'DESC',
      )
      .limit(10)
      .getRawMany();

    return top10StudentsGroupA;
  }

  async getSubjectScoreClassification(subject: string): Promise<any> {
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
        `COUNT(CASE WHEN score.${subject} IS NOT NULL THEN 1 END) AS total`,
      )
      .getRawOne();

    return {
      subject,
      excellent: rawResults.excellent,
      good: rawResults.good,
      average: rawResults.average,
      poor: rawResults.poor,
      total: rawResults.total,
    };
  }

  // Method to get statistics for all subjects
  async getAllSubjectsScoreClassification(): Promise<any> {
    const subjects = [
      'math_score',
      'literature_score',
      'language_score',
      'physics_score',
      'chemistry_score',
      'biology_score',
      'history_score',
      'geography_score',
      'civic_education_score',
    ];

    const results = await Promise.all(
      subjects.map(async (subject) => {
        return await this.getSubjectScoreClassification(subject);
      }),
    );
    return results;
  }
}
