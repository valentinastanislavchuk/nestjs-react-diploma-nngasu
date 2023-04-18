import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Faculty, FacultySchema } from 'src/faculties/schemas/faculty.schema';
import { ApplicantsController } from './applicants.controller';
import { ApplicantsService } from './applicants.service';
import { Applicant, ApplicantSchema } from './schemas/applicant.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Applicant.name, schema: ApplicantSchema },
      { name: Faculty.name, schema: FacultySchema },
    ]),
  ],
  providers: [ApplicantsService],
  controllers: [ApplicantsController],
})
export class ApplicantsModule {}
