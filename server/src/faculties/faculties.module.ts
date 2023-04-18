import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FacultiesController } from './faculties.controller';
import { FacultiesService } from './faculties.service';
import { Faculty, FacultySchema } from './schemas/faculty.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Faculty.name, schema: FacultySchema }])],
  providers: [FacultiesService],
  controllers: [FacultiesController],
})
export class FacultiesModule {}
