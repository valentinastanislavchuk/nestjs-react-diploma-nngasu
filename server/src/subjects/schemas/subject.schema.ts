import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose from 'mongoose';

export type SubjectDocument = Subject & mongoose.Document;

@Schema({ versionKey: false })
export class Subject {
  @ApiProperty({ example: 'Математика', description: 'Название предмета' })
  @Prop({ required: true })
  name!: string;

  @ApiProperty({ example: 25, description: 'Проходной балл для предмета', maximum: 100 })
  @Prop({ required: true })
  passing_score!: number;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
