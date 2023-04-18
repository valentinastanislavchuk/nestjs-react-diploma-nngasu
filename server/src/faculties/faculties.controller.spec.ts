import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose from 'mongoose';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { EducationForm } from './enums/education-form.enum';
import { FacultiesController } from './faculties.controller';
import { FacultiesService } from './faculties.service';
import { Faculty } from './schemas/faculty.schema';

describe('FacultiesController', () => {
  let controller: FacultiesController;
  let service: FacultiesService;

  const faculty: Faculty = {
    name: 'Строительство',
    code: '08.03.01',
    education_form: EducationForm.FULLTIME,
    requirements: {
      average_score: 180,
      subjects: [
        new mongoose.Types.ObjectId('6058b77f63c49e4dc4ad06d4'),
        new mongoose.Types.ObjectId('6058b77f63c49e4dc4ad06d5'),
      ],
    },
  };
  const faculties: Faculty[] = [faculty];

  const createFacultyDto: CreateFacultyDto = {
    ...faculty,
    requirements: { ...faculty.requirements, subjects: ['6058b77f63c49e4dc4ad06d4', '6058b77f63c49e4dc4ad06d5'] },
  };
  const updateFacultyDto: UpdateFacultyDto = { code: '08.03.01' };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FacultiesController],
      providers: [
        FacultiesService,
        {
          provide: getModelToken(Faculty.name),
          useValue: {},
        },
      ],
    }).compile();

    controller = module.get<FacultiesController>(FacultiesController);
    service = module.get<FacultiesService>(FacultiesService);
  });

  describe('getAll', () => {
    it('should return an array of faculties', async () => {
      jest.spyOn(service, 'getAll').mockImplementation(async () => faculties);
      expect(await controller.getAll()).toStrictEqual(faculties);
    });
  });

  describe('getOne', () => {
    it('should return a faculty by id', async () => {
      jest.spyOn(service, 'getById').mockImplementation(async () => faculty);
      expect(await controller.getOne('1')).toStrictEqual(faculty);
    });
  });

  describe('create', () => {
    it('should create a new faculty', async () => {
      jest.spyOn(service, 'create').mockImplementation(async () => faculty);
      expect(await controller.create(createFacultyDto)).toStrictEqual(faculty);
    });
  });

  describe('remove', () => {
    it('should remove a faculty by id', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => faculty);
      expect(await controller.remove('1')).toStrictEqual(faculty);
    });
  });

  describe('update', () => {
    it('should update a faculty by id', async () => {
      jest.spyOn(service, 'update').mockImplementation(async () => faculty);
      expect(await controller.update(updateFacultyDto, '1')).toStrictEqual(faculty);
    });
  });
});
