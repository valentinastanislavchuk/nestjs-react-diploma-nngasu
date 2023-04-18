import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString, Length, Max, Min } from 'class-validator';

export class UpdateSubjectDto {
  @IsString()
  @Length(2, 50)
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'Математика', description: 'Название предмета' })
  readonly name?: string;

  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 25, description: 'Проходной балл для предмета', maximum: 100 })
  readonly passing_score?: number;
}
