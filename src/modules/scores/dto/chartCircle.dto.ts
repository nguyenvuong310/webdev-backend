import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber, IsString, ArrayNotEmpty } from 'class-validator';

import { LevelType } from '../../../enums/level_type.enum';

export class ChartCircletDto {
  @ApiProperty({ example: [10, 20, 30, 40] })
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
    const value1 = ((values[0] / values[4]) * 100).toFixed(2);
    const value2 = ((values[1] / values[4]) * 100).toFixed(2);
    const value3 = ((values[2] / values[4]) * 100).toFixed(2);

    const value1Num = parseFloat(value1);
    const value2Num = parseFloat(value2);
    const value3Num = parseFloat(value3);

    const value4 = (100.0 - (value1Num + value2Num + value3Num)).toFixed(2);
    const value4Num = parseFloat(value4);

    this.values = [value1Num, value2Num, value3Num, value4Num];
    this.labels = [
      LevelType.level1,
      LevelType.level2,
      LevelType.level3,
      LevelType.level4,
    ];
  }
}
