import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { Types } from 'mongoose';
import { Subject } from 'src/subjects/schemas/subject.schema';
import { EducationForm } from '../enums/education-form.enum';

@Schema({ _id: false })
export class FacultyRequirements {
  @ApiProperty({ example: 180, description: 'Средний балл поступивших за предыдущий год' })
  @Prop({ required: true })
  average_score!: number;

  @ApiProperty({
    type: [String],
    example: ['6058b77f63c49e4dc4ad06d4', '6058b77f63c49e4dc4ad06d5'],
    description: 'Список id предметов, требуемых для поступления',
  })
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: Subject.name, required: true })
  subjects!: Types.ObjectId[];
}

export const FacultyRequirementsSchema = SchemaFactory.createForClass(FacultyRequirements);

@Schema({ versionKey: false })
export class Faculty {
  @ApiProperty({ example: 'Экология и природопользование', description: 'Название направления' })
  @Prop({ required: true })
  name!: string;

  @ApiProperty({ example: '05.03.06', description: 'Код направления' })
  @Prop({ required: true })
  code!: string;

  @ApiProperty({ enum: EducationForm, description: 'Форма обучения' })
  @Prop({ required: true, enum: EducationForm })
  education_form!: EducationForm;

  @ApiProperty({ type: FacultyRequirements, description: 'Требования для поступления' })
  @Prop({ type: FacultyRequirementsSchema, required: true })
  requirements!: FacultyRequirements;
}

export type FacultyDocument = Faculty & mongoose.Document;
export const FacultySchema = SchemaFactory.createForClass(Faculty);
