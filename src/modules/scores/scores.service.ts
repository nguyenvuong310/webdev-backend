import { Inject, Injectable } from '@nestjs/common';
import { ScoresRepository } from './scores.repository';
import { GroupType } from 'src/enums/group_type.enum';
import { ScoreDto } from './dto/scores.dto';
import { ChartDto } from './dto/chart.dto';
import { ChartType } from 'src/enums/chart_type.enum';

@Injectable()
export class ScoresService {
  constructor(
    @Inject(ScoresRepository) private scoresRepository: ScoresRepository,
  ) {}
  async checkScore(registrationNo: string): Promise<ScoreDto> {
    const score = await this.scoresRepository.checkScore(registrationNo);

    if (!score) {
      throw new Error('Score not found with this registration number');
    }
    return new ScoreDto(score);
  }

  async top10StudentsGroup(type: string): Promise<ScoreDto[]> {
    switch (type) {
      case GroupType.A00:
        const scoresA00 = await this.scoresRepository.top10StudentsGroupA00();
        return scoresA00.map((score) => new ScoreDto(score));
      case GroupType.A01:
        const scoresA01 = await this.scoresRepository.top10StudentsGroupA01();
        return scoresA01.map((score) => new ScoreDto(score));
      case GroupType.B00:
        const scoresB00 = await this.scoresRepository.top10StudentsGroupB00();
        return scoresB00.map((score) => new ScoreDto(score));
      case GroupType.C00:
        const scoresC00 = await this.scoresRepository.top10StudentsGroupC00();
        return scoresC00.map((score) => new ScoreDto(score));
      case GroupType.D01:
        const scoresD01 = await this.scoresRepository.top10StudentsGroupD01();
        return scoresD01.map((score) => new ScoreDto(score));
      default:
        throw new Error('Invalid group type');
    }
  }

  async getSubjectScoreChartByType(
    type: string,
    typeChart: string,
  ): Promise<ChartDto> {
    switch (typeChart) {
      case ChartType.BAR:
        return await this.scoresRepository.getSubjectScoreChartBar(type);
      case ChartType.CIRCLE:
        return await this.scoresRepository.getSubjectScoreChartCircle(type);
      default:
        throw new Error('Invalid chart type');
    }
  }
}
