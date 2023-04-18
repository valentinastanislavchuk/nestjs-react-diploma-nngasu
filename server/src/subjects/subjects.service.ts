import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject, SubjectDocument } from './schemas/subject.schema';

@Injectable()
export class SubjectsService {
  constructor(@InjectModel(Subject.name) private subjectModel: Model<SubjectDocument>) {}

  async getAll(): Promise<Subject[]> {
    return this.subjectModel.find();
  }

  async getById(id: string): Promise<Subject> {
    return this.subjectModel.findById(id);
  }

  async create(createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectModel.create(createSubjectDto);
  }

  async remove(id: string): Promise<Subject> {
    return this.subjectModel.findByIdAndRemove(id);
  }

  async update(id: string, updateSubjectDto: UpdateSubjectDto): Promise<Subject> {
    return this.subjectModel.findByIdAndUpdate(id, updateSubjectDto, { new: true, runValidators: true });
  }
}
