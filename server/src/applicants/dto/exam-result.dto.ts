import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsMongoId, IsNotEmpty, Max, Min } from 'class-validator';

export class ExamResultDto {
  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ example: '6058b77f63c49e4dc4ad06d5', description: 'Id предмета, который сдавал абитуриент' })
  readonly subject!: string;

  @IsInt()
  @Min(0)
  @Max(100)
  @IsNotEmpty()
  @ApiProperty({ example: 50, description: 'Балл за предмет' })
  readonly score!: number;

  @IsInt()
  @Min(new Date().getFullYear() - 10)
  @Max(new Date().getFullYear())
  @IsNotEmpty()
  @ApiProperty({ example: 2023, description: 'Год сдачи ЕГЭ' })
  readonly exam_year!: number;
}
