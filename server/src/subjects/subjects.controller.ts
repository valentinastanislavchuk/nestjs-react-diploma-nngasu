import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { UpdateSubjectDto } from './dto/update-subject.dto';
import { Subject } from './schemas/subject.schema';
import { SubjectsService } from './subjects.service';

@ApiTags('Предметы')
@Controller('subjects')
export class SubjectsController {
  constructor(private readonly subjectsService: SubjectsService) {}

  @ApiOperation({ summary: 'Получение всех предметов' })
  @ApiResponse({ status: 200, type: [Subject] })
  @Get()
  getAll(): Promise<Subject[]> {
    return this.subjectsService.getAll();
  }

  @ApiOperation({ summary: 'Получение предмета по id' })
  @ApiResponse({ status: 200, type: Subject })
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Subject> {
    return this.subjectsService.getById(id);
  }

  @ApiOperation({ summary: 'Создание нового предмета' })
  @ApiResponse({ status: 201, type: Subject })
  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto): Promise<Subject> {
    return this.subjectsService.create(createSubjectDto);
  }

  @ApiOperation({ summary: 'Удаление предмета по id' })
  @ApiResponse({ status: 200, type: Subject })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Subject> {
    return this.subjectsService.remove(id);
  }

  @ApiOperation({ summary: 'Обновление предмета по id' })
  @ApiResponse({ status: 200, type: Subject })
  @Put(':id')
  update(@Body() updateSubjectDto: UpdateSubjectDto, @Param('id') id: string): Promise<Subject> {
    return this.subjectsService.update(id, updateSubjectDto);
  }
}
