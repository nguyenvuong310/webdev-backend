import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, ArrayNotEmpty } from 'class-validator';
import { LevelType } from 'src/enums/level_type.enum';

export class ChartDto {
  @ApiProperty({ example: [198392, 505836, 258654, 82731] })
  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  values: number[];

  @ApiProperty({ example: ['>=8', '6 <= && < 8', '4 <= && < 6', '< 4'] })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  labels: string[];

  constructor(values: number[]) {
    this.values = values;
    this.labels = [
      LevelType.level1,
      LevelType.level2,
      LevelType.level3,
      LevelType.level4,
    ];
  }
}
