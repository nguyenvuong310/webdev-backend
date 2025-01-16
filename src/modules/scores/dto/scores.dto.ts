import { ApiProperty } from '@nestjs/swagger';
import { Score } from '../entities/score.entity';

export class ScoreDto {
  @ApiProperty({ example: '1000001' })
  studentRegistrationNo: string;

  @ApiProperty({ example: 9.5 })
  math: number | null;

  @ApiProperty({ example: 9.5 })
  literature: number | null;

  @ApiProperty({ example: 9.5 })
  language: number | null;

  @ApiProperty({ example: 9.5 })
  physics: number | null;

  @ApiProperty({ example: 9.5 })
  chemistry: number | null;

  @ApiProperty({ example: null })
  biology: number | null;

  @ApiProperty({ example: null })
  history: number | null;

  @ApiProperty({ example: null })
  geography: number | null;

  @ApiProperty({ example: null })
  civic_education: number | null;

  @ApiProperty({ example: null })
  language_code: string | null;

  constructor(scores: Score) {
    this.language_code = scores.language_code;
    this.studentRegistrationNo = scores.student.registrationNo;
    this.math = scores.math;
    this.literature = scores.literature;
    this.language = scores.language;
    this.physics = scores.physics;
    this.chemistry = scores.chemistry;
    this.biology = scores.biology;
    this.history = scores.history;
    this.geography = scores.geography;
    this.civic_education = scores.civic_education;
  }
}
