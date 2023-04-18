import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { FacultiesService } from './faculties.service';
import { Faculty } from './schemas/faculty.schema';

@ApiTags('Направления')
@Controller('faculties')
export class FacultiesController {
  constructor(private readonly facultiesService: FacultiesService) {}

  @ApiOperation({ summary: 'Получение всех направлений' })
  @ApiResponse({ status: 200, type: [Faculty] })
  @Get()
  getAll(): Promise<Faculty[]> {
    return this.facultiesService.getAll();
  }

  @ApiOperation({ summary: 'Получение направления по id' })
  @ApiResponse({ status: 200, type: Faculty })
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Faculty> {
    return this.facultiesService.getById(id);
  }

  @ApiOperation({ summary: 'Создание нового направления' })
  @ApiResponse({ status: 201, type: Faculty })
  @Post()
  create(@Body() createFacultyDto: CreateFacultyDto): Promise<Faculty> {
    return this.facultiesService.create(createFacultyDto);
  }

  @ApiOperation({ summary: 'Удаление направления по id' })
  @ApiResponse({ status: 200, type: Faculty })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Faculty> {
    return this.facultiesService.remove(id);
  }

  @ApiOperation({ summary: 'Обновление направления по id' })
  @ApiResponse({ status: 200, type: Faculty })
  @Put(':id')
  update(@Body() updateFacultyDto: UpdateFacultyDto, @Param('id') id: string): Promise<Faculty> {
    return this.facultiesService.update(id, updateFacultyDto);
  }
}
