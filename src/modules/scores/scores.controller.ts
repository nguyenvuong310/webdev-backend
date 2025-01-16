import { Controller, Get, Param } from '@nestjs/common';
import { ScoresService } from './scores.service';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.scoresService.checkScore(id);
  }

  @Get('/students/top10')
  top10StudentsGroupA() {
    return this.scoresService.top10StudentsGroupA();
  }

  @Get('/subject/report')
  getSubjectScoreClassification() {
    return this.scoresService.getSubjectScoreClassification();
  }
}
