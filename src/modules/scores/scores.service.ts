import { Inject, Injectable } from '@nestjs/common';
import { ScoresRepository } from './scores.repository';
import { ScoreDto } from './dto/scores.dto';
import { ChartDto } from './dto/chart.dto';
import { ChartType } from '../../enums/chart_type.enum';
import { RedisService } from '../../services/redis/redis.service';
import { ChartCircleDto } from './dto/chartCircle.dto';

@Injectable()
export class ScoresService {
  constructor(
    @Inject(ScoresRepository) private scoresRepository: ScoresRepository,
    @Inject(RedisService) private redisService: RedisService,
  ) {}
  async checkScore(registrationNo: string): Promise<ScoreDto> {
    const dataCached = await this.redisService.getValue(registrationNo);

    const scoresCached: ScoreDto = dataCached ? JSON.parse(dataCached) : null;
    if (scoresCached) {
      return scoresCached;
    }

    const score = await this.scoresRepository.checkScore(registrationNo);

    if (!score) {
      throw new Error('Score not found with this registration number');
    }
    const scoreMapped = new ScoreDto(score);

    await this.redisService.setValue(
      registrationNo,
      JSON.stringify(scoreMapped),
    );
    return scoreMapped;
  }

  private async getScoresFromCache(
    cacheKey: string,
  ): Promise<ScoreDto[] | null> {
    const cachedData = await this.redisService.getValue(cacheKey);
    return cachedData ? JSON.parse(cachedData) : null;
  }

  private async saveScoresToCache(
    cacheKey: string,
    scores: ScoreDto[],
  ): Promise<void> {
    await this.redisService.setValue(cacheKey, JSON.stringify(scores));
  }

  private async getScoresFromRepository(type: string): Promise<ScoreDto[]> {
    const scores = await this.scoresRepository.top10StudentsGroup(type);
    return scores.map((score) => new ScoreDto(score));
  }

  async top10StudentsGroup(type: string): Promise<ScoreDto[]> {
    const cacheKey = `top10StudentsGroup${type}`;

    const scoresCached = await this.getScoresFromCache(cacheKey);
    if (
      scoresCached !== null ||
      (Array.isArray(scoresCached) && scoresCached.length > 0)
    ) {
      return scoresCached;
    }

    const scores = await this.getScoresFromRepository(type);

    await this.saveScoresToCache(cacheKey, scores);

    return scores;
  }

  async getSubjectScoreChartByType(
    type: string,
    typeChart: string,
  ): Promise<ChartDto | ChartCircleDto> {
    const cacheKey = `getSubjectScoreChartByType:${type}:${typeChart}`;

    const cachedData = await this.getCachedChartData(cacheKey, typeChart);
    if (cachedData) {
      return cachedData;
    }

    const chartData = await this.getChartData(type, typeChart);

    await this.cacheChartData(cacheKey, chartData);

    return chartData;
  }

  private async getCachedChartData(
    cacheKey: string,
    typeChart: string,
  ): Promise<ChartDto | ChartCircleDto | null> {
    const cachedData = await this.redisService.getValue(cacheKey);
    if (cachedData) {
      if (typeChart === ChartType.BAR) {
        return JSON.parse(cachedData) as ChartDto;
      } else if (typeChart === ChartType.CIRCLE) {
        return JSON.parse(cachedData) as ChartCircleDto;
      }
    }
    return null;
  }

  private async getChartData(
    type: string,
    typeChart: string,
  ): Promise<ChartDto | ChartCircleDto> {
    switch (typeChart) {
      case ChartType.BAR:
        return await this.scoresRepository.getSubjectScoreChartBar(type);
      case ChartType.CIRCLE:
        return await this.scoresRepository.getSubjectScoreChartCircle(type);
      default:
        throw new Error('Invalid chart type');
    }
  }

  private async cacheChartData(
    cacheKey: string,
    chartData: ChartDto | ChartCircleDto,
  ): Promise<void> {
    await this.redisService.setValue(cacheKey, JSON.stringify(chartData));
  }
}
