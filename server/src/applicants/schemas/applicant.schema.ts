import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import mongoose, { Types } from 'mongoose';
import { Faculty } from 'src/faculties/schemas/faculty.schema';
import { Subject } from 'src/subjects/schemas/subject.schema';

@Schema({ _id: false })
export class ExamResult {
  @ApiProperty({
    type: String,
    example: '6058b77f63c49e4dc4ad06d5',
    description: 'Id предмета, который сдавал абитуриент',
  })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Subject.name, required: true })
  subject!: Types.ObjectId;

  @ApiProperty({ example: 50, description: 'Балл за предмет' })
  @Prop({ required: true })
  score!: number;

  @ApiProperty({ example: 2023, description: 'Год сдачи ЕГЭ' })
  @Prop({ required: true })
  exam_year!: number;
}

export const ExamResultSchema = SchemaFactory.createForClass(ExamResult);

@Schema({ _id: false })
export class AvailableFaculty {
  @ApiProperty({ example: 0.55, description: 'Вероятность поступления' })
  @Prop({ required: true })
  success_chance!: number;

  @ApiProperty({ type: String, example: '6058b77f63c49e4dc4ad06d5', description: 'Id релевантного направления' })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Faculty.name, required: true })
  faculty!: Types.ObjectId;
}

export const AvailableFacultySchema = SchemaFactory.createForClass(AvailableFaculty);

@Schema({ versionKey: false })
export class Applicant {
  @ApiProperty({ example: 'Римуру', description: 'Имя абитуриента' })
  @Prop({ required: true })
  name!: string;

  @ApiProperty({ example: 'rimuru@gmail.com', description: 'E-mail абитуриента' })
  @Prop({ required: true })
  email!: string;

  @ApiPropertyOptional({ type: [ExamResult], description: 'Результаты ЕГЭ абитуриента' })
  @Prop({ type: [ExamResultSchema] })
  exam_results?: ExamResult[];

  @ApiPropertyOptional({ type: [AvailableFaculty], description: 'Релевантные направления для абитуриента' })
  @Prop({ type: [AvailableFacultySchema] })
  available_faculties?: AvailableFaculty[];
}

export type ApplicantDocument = Applicant & mongoose.Document;
export const ApplicantSchema = SchemaFactory.createForClass(Applicant);
