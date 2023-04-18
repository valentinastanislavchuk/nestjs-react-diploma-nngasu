import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { Faculty } from 'src/faculties/schemas/faculty.schema';
import { ApplicantsController } from './applicants.controller';
import { ApplicantsService } from './applicants.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { ExamResultDto } from './dto/exam-result.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { Applicant, AvailableFaculty } from './schemas/applicant.schema';

describe('ApplicantsController', () => {
  let controller: ApplicantsController;
  let service: ApplicantsService;

  const applicant: Applicant = { name: 'Римуру', email: 'rimuru@gmail.com' };
  const applicants: Applicant[] = [applicant];

  const createApplicantDto: CreateApplicantDto = applicant;
  const updateApplicantDto: UpdateApplicantDto = { email: 'rimuru@gmail.com' };

  const examResultsDto: ExamResultDto[] = [{ subject: '6058b77f63c49e4dc4ad06d5', score: 50, exam_year: 2023 }];
  const availableFaculties: AvailableFaculty[] = [
    { faculty: new mongoose.Types.ObjectId('6058b77f63c49e4dc4ad06d5'), success_chance: 0.55 },
  ];

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApplicantsController],
      providers: [
        ApplicantsService,
        {
          provide: getModelToken(Applicant.name),
          useValue: {},
        },
        {
          provide: getModelToken(Faculty.name),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<ApplicantsController>(ApplicantsController);
    service = module.get<ApplicantsService>(ApplicantsService);
  });

  describe('getAll', () => {
    it('should return an array of applicants', async () => {
      jest.spyOn(service, 'getAll').mockImplementation(async () => applicants);
      expect(await controller.getAll()).toStrictEqual(applicants);
    });
  });

  describe('getOne', () => {
    it('should return an applicant by id', async () => {
      jest.spyOn(service, 'getById').mockImplementation(async () => applicant);
      expect(await controller.getOne('1')).toStrictEqual(applicant);
    });
  });

  describe('create', () => {
    it('should create a new applicant', async () => {
      jest.spyOn(service, 'create').mockImplementation(async () => applicant);
      expect(await controller.create(createApplicantDto)).toStrictEqual(applicant);
    });
  });

  describe('remove', () => {
    it('should remove an applicant by id', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => applicant);
      expect(await controller.remove('1')).toStrictEqual(applicant);
    });
  });

  describe('update', () => {
    it('should update an applicant by id', async () => {
      jest.spyOn(service, 'update').mockImplementation(async () => applicant);
      expect(await controller.update(updateApplicantDto, '1')).toStrictEqual(applicant);
    });
  });

  describe('addExamResults', () => {
    it('should add exam results to an applicant by id', async () => {
      jest.spyOn(service, 'addExamResults').mockImplementation(async () => applicant);
      expect(await controller.addExamResults('1', examResultsDto)).toStrictEqual(applicant);
    });
  });

  describe('getFaculties', () => {
    it('should return relevant faculties for an applicant by id', async () => {
      jest.spyOn(service, 'getFaculties').mockImplementation(async () => availableFaculties);
      expect(await controller.getFaculties('1')).toStrictEqual(availableFaculties);
    });
  });
});
