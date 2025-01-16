import { Inject, Injectable } from '@nestjs/common';
import { ScoresRepository } from './scores.repository';
import { Score } from './entities/score.entity';

@Injectable()
export class ScoresService {
  constructor(
    @Inject(ScoresRepository) private scoresRepository: ScoresRepository,
  ) {}
  async checkScore(registrationNo: string): Promise<Score> {
    const scores = await this.scoresRepository.checkScore(registrationNo);

    if (!scores) {
      throw new Error('Score not found with this registration number');
    }
    return scores;
  }

  async top10StudentsGroupA(): Promise<Score[]> {
    return await this.scoresRepository.top10StudentsGroupA();
  }

  async getSubjectScoreClassification(): Promise<any> {
    return await this.scoresRepository.getAllSubjectsScoreClassification();
  }
}
