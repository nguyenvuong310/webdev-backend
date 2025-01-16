import { Controller, Get, Param, Query } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';
import { GroupType } from 'src/enums/group_type.enum';

import { ScoreDto } from './dto/scores.dto';
import { ResponseMessage } from 'src/decorator/reposone_message.decorator';
import { SubjectType } from 'src/enums/subject_type.enum';
import { ChartType } from 'src/enums/chart_type.enum';

@Controller('scores')
export class ScoresController {
  constructor(private readonly scoresService: ScoresService) {}

  @Get(':id')
  @ResponseMessage('Score')
  @ApiOperation({
    summary: 'Check score by registration number',
  })
  async findOne(@Param('id') id: string) {
    return this.scoresService.checkScore(id);
  }

  @Get('/students/top10')
  @ApiQuery({
    enum: GroupType,
    name: 'type',
  })
  @ApiOperation({
    summary: 'List top 10 students of group type (A00, A01, B00, C00, D01) ',
  })
  async top10StudentsGroupA(@Query('type') type: string): Promise<ScoreDto[]> {
    return this.scoresService.top10StudentsGroup(type);
  }

  @Get('/subject/chart')
  @ApiOperation({
    summary: 'Get subject score classification',
  })
  @ApiQuery({
    enum: SubjectType,
    name: 'typeSubject',
  })
  @ApiQuery({
    enum: ChartType,
    name: 'typeChart',
  })
  async getSubjectScoreClassificationCircle(
    @Query('typeSubject') type: string,
    @Query('typeChart') typeChart: string,
  ) {
    return this.scoresService.getSubjectScoreChartByType(type, typeChart);
  }
}
