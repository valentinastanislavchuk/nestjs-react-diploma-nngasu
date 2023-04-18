import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Faculty, FacultyDocument, FacultyRequirements } from 'src/faculties/schemas/faculty.schema';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { ExamResultDto } from './dto/exam-result.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { Applicant, ApplicantDocument, AvailableFaculty, ExamResult } from './schemas/applicant.schema';

@Injectable()
export class ApplicantsService {
  constructor(
    @InjectModel(Applicant.name) private applicantModel: Model<ApplicantDocument>,
    @InjectModel(Faculty.name) private facultyModel: Model<FacultyDocument>,
  ) {}

  async getAll(): Promise<Applicant[]> {
    return this.applicantModel.find();
  }

  async getById(id: string): Promise<Applicant> {
    return this.applicantModel.findById(id);
  }

  async create(createApplicantDto: CreateApplicantDto): Promise<Applicant> {
    return this.applicantModel.create(createApplicantDto);
  }

  async remove(id: string): Promise<Applicant> {
    return this.applicantModel.findByIdAndRemove(id);
  }

  async update(id: string, updateApplicantDto: UpdateApplicantDto): Promise<Applicant> {
    return this.applicantModel.findByIdAndUpdate(id, updateApplicantDto, { new: true, runValidators: true });
  }

  async addExamResults(id: string, examResults: ExamResultDto[]): Promise<Applicant> {
    return this.applicantModel
      .findByIdAndUpdate(id, { exam_results: examResults }, { new: true, runValidators: true })
      .populate({ path: 'exam_results.subject', transform: (subject) => subject.name });
  }

  async getFaculties(id: string): Promise<AvailableFaculty[]> {
    const { available_faculties } = await this.applicantModel
      .findByIdAndUpdate(
        id,
        { available_faculties: await this.getAvailableFaculties(id) },
        { new: true, runValidators: true },
      )
      .populate('available_faculties.faculty');
    return available_faculties;
  }

  private async getAvailableFaculties(id: string): Promise<AvailableFaculty[]> {
    const { exam_results } = await this.getById(id);
    const subjects = exam_results.map((exam) => exam.subject);
    const available_faculties = await this.facultyModel.find({
      'requirements.subjects': { $not: { $elemMatch: { $nin: subjects } } },
    });

    return available_faculties.map(({ _id, requirements }) => ({
      success_chance: this.getSuccessChance(exam_results, requirements),
      faculty: _id,
    }));
  }

  private getSuccessChance(exam_results: ExamResult[], { subjects, average_score }: FacultyRequirements): number {
    const totalScore = exam_results.reduce(
      (acc, exam) => (subjects.some((s) => s.equals(exam.subject)) ? acc + exam.score : acc),
      0,
    );
    return Math.round((totalScore / average_score) * 100) / 100;
  }
}
