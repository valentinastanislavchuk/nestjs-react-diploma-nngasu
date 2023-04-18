import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './schemas/subject.schema';
import { SubjectsController } from './subjects.controller';
import { SubjectsService } from './subjects.service';

describe('SubjectsController', () => {
  let controller: SubjectsController;
  let service: SubjectsService;

  const subject: Subject = { name: 'Математика', passing_score: 32 };
  const subjects: Subject[] = [subject];

  const createSubjectDto: CreateSubjectDto = subject;
  const updateSubjectDto: UpdateSubjectDto = { passing_score: 32 };

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      controllers: [SubjectsController],
      providers: [
        SubjectsService,
        {
          provide: getModelToken(Subject.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<SubjectsService>(SubjectsService);
    controller = module.get<SubjectsController>(SubjectsController);
  });

  describe('getAll', () => {
    it('should return an array of subjects', async () => {
      jest.spyOn(service, 'getAll').mockImplementation(async () => subjects);
      expect(await controller.getAll()).toStrictEqual(subjects);
    });
  });

  describe('getOne', () => {
    it('should return a subject by id', async () => {
      jest.spyOn(service, 'getById').mockImplementation(async () => subject);
      expect(await controller.getOne('1')).toStrictEqual(subject);
    });
  });

  describe('create', () => {
    it('should create a new subject', async () => {
      jest.spyOn(service, 'create').mockImplementation(async () => subject);
      expect(await controller.create(createSubjectDto)).toStrictEqual(subject);
    });
  });

  describe('remove', () => {
    it('should remove a subject by id', async () => {
      jest.spyOn(service, 'remove').mockImplementation(async () => subject);
      expect(await controller.remove('1')).toStrictEqual(subject);
    });
  });

  describe('update', () => {
    it('should update a subject by id', async () => {
      jest.spyOn(service, 'update').mockImplementation(async () => subject);
      expect(await controller.update(updateSubjectDto, '1')).toStrictEqual(subject);
    });
  });
});
