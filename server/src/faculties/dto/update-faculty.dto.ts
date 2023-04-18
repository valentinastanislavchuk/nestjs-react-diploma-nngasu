import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches, ValidateNested } from 'class-validator';
import { EducationForm } from '../enums/education-form.enum';
import { FacultyRequirementsDto } from './faculty-requirements.dto';

export class UpdateFacultyDto {
  @IsString()
  @Length(2, 200)
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: 'Экология и природопользование', description: 'Название направления' })
  readonly name?: string;

  @IsString()
  @Matches(/^(\d{2}\.){2}\d{2}$/)
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ example: '05.03.06', description: 'Код направления' })
  readonly code?: string;

  @IsEnum(EducationForm)
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ enum: EducationForm, description: 'Форма обучения' })
  readonly education_form?: EducationForm;

  @ValidateNested()
  @Type(() => FacultyRequirementsDto)
  @IsOptional()
  @IsNotEmpty()
  @ApiPropertyOptional({ type: FacultyRequirementsDto, description: 'Требования для поступления' })
  readonly requirements?: FacultyRequirementsDto;
}
