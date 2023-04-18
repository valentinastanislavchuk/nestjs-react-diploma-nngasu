import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length, Max, Min } from 'class-validator';

export class CreateSubjectDto {
  @IsString()
  @Length(2, 50)
  @IsNotEmpty()
  @ApiProperty({ example: 'Математика', description: 'Название предмета' })
  readonly name!: string;

  @IsInt()
  @Min(1)
  @Max(100)
  @IsNotEmpty()
  @ApiProperty({ example: 25, description: 'Проходной балл для предмета', maximum: 100 })
  readonly passing_score!: number;
}
