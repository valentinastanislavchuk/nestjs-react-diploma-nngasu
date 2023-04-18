import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApplicantsService } from './applicants.service';
import { CreateApplicantDto } from './dto/create-applicant.dto';
import { ExamResultDto } from './dto/exam-result.dto';
import { UpdateApplicantDto } from './dto/update-applicant.dto';
import { Applicant, AvailableFaculty } from './schemas/applicant.schema';

@ApiTags('Абитуриенты')
@Controller('applicants')
export class ApplicantsController {
  constructor(private readonly applicantsService: ApplicantsService) {}

  @ApiOperation({ summary: 'Получение всех абитуриентов' })
  @ApiResponse({ status: 200, type: [Applicant] })
  @Get()
  getAll(): Promise<Applicant[]> {
    return this.applicantsService.getAll();
  }

  @ApiOperation({ summary: 'Получение абитуриента по id' })
  @ApiResponse({ status: 200, type: Applicant })
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Applicant> {
    return this.applicantsService.getById(id);
  }

  @ApiOperation({ summary: 'Создание нового абитуриента' })
  @ApiResponse({ status: 201, type: Applicant })
  @Post()
  create(@Body() createApplicantDto: CreateApplicantDto): Promise<Applicant> {
    return this.applicantsService.create(createApplicantDto);
  }

  @ApiOperation({ summary: 'Удаление абитуриента по id' })
  @ApiResponse({ status: 200, type: Applicant })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Applicant> {
    return this.applicantsService.remove(id);
  }

  @ApiOperation({ summary: 'Обновление абитуриента по id' })
  @ApiResponse({ status: 200, type: Applicant })
  @Put(':id')
  update(@Body() updateApplicantDto: UpdateApplicantDto, @Param('id') id: string): Promise<Applicant> {
    return this.applicantsService.update(id, updateApplicantDto);
  }

  @ApiOperation({ summary: 'Добавление результатов ЕГЭ в модель абитуриента' })
  @ApiResponse({ status: 201, type: Applicant })
  @Post(':id/exam-results')
  async addExamResults(@Param('id') id: string, @Body() examResultDto: ExamResultDto[]): Promise<Applicant> {
    return await this.applicantsService.addExamResults(id, examResultDto);
  }

  @ApiOperation({ summary: 'Получение направлений, релевантных для абитуриента (с вероятностями поступления)' })
  @ApiResponse({ status: 200, type: AvailableFaculty })
  @Get(':id/faculties')
  getFaculties(@Param('id') id: string): Promise<AvailableFaculty[]> {
    return this.applicantsService.getFaculties(id);
  }
}
