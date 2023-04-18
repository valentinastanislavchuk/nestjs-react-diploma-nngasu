import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, IsNumber, Max, Min } from 'class-validator';

export class AvailableFacultyDto {
  @IsNumber()
  @Min(0)
  @Max(1)
  @IsNotEmpty()
  @ApiProperty({ example: 0.55, description: 'Вероятность поступления на направление' })
  readonly success_chance!: number;

  @IsMongoId()
  @IsNotEmpty()
  @ApiProperty({ example: '6058b77f63c49e4dc4ad06d5', description: 'Id релевантного направления' })
  readonly faculty!: string;
}
