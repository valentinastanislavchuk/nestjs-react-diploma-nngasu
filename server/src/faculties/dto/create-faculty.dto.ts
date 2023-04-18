import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsNotEmpty, IsString, Length, Matches, ValidateNested } from 'class-validator';
import { EducationForm } from '../enums/education-form.enum';
import { FacultyRequirementsDto } from './faculty-requirements.dto';

export class CreateFacultyDto {
  @IsString()
  @Length(2, 200)
  @IsNotEmpty()
  @ApiProperty({ example: 'Экология и природопользование', description: 'Название направления' })
  readonly name!: string;

  @IsString()
  @Matches(/^(\d{2}\.){2}\d{2}$/)
  @IsNotEmpty()
  @ApiProperty({ example: '05.03.06', description: 'Код направления' })
  readonly code!: string;

  @IsEnum(EducationForm)
  @IsNotEmpty()
  @ApiProperty({ enum: EducationForm, description: 'Форма обучения' })
  readonly education_form!: EducationForm;

  @ValidateNested()
  @Type(() => FacultyRequirementsDto)
  @IsNotEmpty()
  @ApiProperty({ type: FacultyRequirementsDto, description: 'Требования для поступления' })
  readonly requirements!: FacultyRequirementsDto;
}
