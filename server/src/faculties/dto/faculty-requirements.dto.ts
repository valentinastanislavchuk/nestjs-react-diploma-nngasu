import { ApiProperty } from '@nestjs/swagger';
import { ArrayMinSize, IsInt, IsMongoId, IsNotEmpty, Max, Min } from 'class-validator';

export class FacultyRequirementsDto {
  @IsInt()
  @Min(1)
  @Max(1000)
  @IsNotEmpty()
  @ApiProperty({ example: 180, description: 'Средний балл поступивших на данное направление за предыдущий год' })
  average_score!: number;

  @ArrayMinSize(1)
  @IsMongoId({ each: true })
  @IsNotEmpty()
  @ApiProperty({
    example: ['6058b77f63c49e4dc4ad06d4', '6058b77f63c49e4dc4ad06d5'],
    description: 'Список id предметов, требуемых для поступления на данное направление',
  })
  subjects!: string[];
}
