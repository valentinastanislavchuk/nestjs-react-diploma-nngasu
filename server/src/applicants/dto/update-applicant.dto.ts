import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString, Length, ValidateNested } from 'class-validator';
import { AvailableFacultyDto } from './available-faculty.dto';
import { ExamResultDto } from './exam-result.dto';

export class UpdateApplicantDto {
  @IsString()
  @Length(2, 30)
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'Римуру', description: 'Имя абитуриента' })
  readonly name?: string;

  @IsEmail()
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'rimuru@gmail.com', description: 'E-mail абитуриента' })
  readonly email?: string;

  @ValidateNested({ each: true })
  @Type(() => ExamResultDto)
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ type: [ExamResultDto], description: 'Результаты ЕГЭ абитуриента' })
  readonly exam_results?: ExamResultDto[];

  @ValidateNested({ each: true })
  @Type(() => AvailableFacultyDto)
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ type: [AvailableFacultyDto], description: 'Релевантные направления для абитуриента' })
  readonly available_faculties?: AvailableFacultyDto[];
}
