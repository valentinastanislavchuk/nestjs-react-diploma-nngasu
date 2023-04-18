import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { Faculty, FacultyDocument } from './schemas/faculty.schema';

@Injectable()
export class FacultiesService {
  constructor(@InjectModel(Faculty.name) private facultyModel: Model<FacultyDocument>) {}

  async getAll(): Promise<Faculty[]> {
    return this.facultyModel.find().populate('requirements.subjects', '-_id');
  }

  async getById(id: string): Promise<Faculty> {
    return this.facultyModel.findById(id).populate('requirements.subjects', '-_id');
  }

  async create(createFacultyDto: CreateFacultyDto): Promise<Faculty> {
    return this.facultyModel.create(createFacultyDto);
  }

  async remove(id: string): Promise<Faculty> {
    return this.facultyModel.findByIdAndRemove(id);
  }

  async update(id: string, updateFacultyDto: UpdateFacultyDto): Promise<Faculty> {
    return this.facultyModel.findByIdAndUpdate(id, updateFacultyDto, { new: true, runValidators: true });
  }
}
