import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicantsModule } from './applicants/applicants.module';
import { FacultiesModule } from './faculties/faculties.module';
import { SubjectsModule } from './subjects/subjects.module';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: process.env.NODE_ENV }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_DB}.zafgvqd.mongodb.net/?retryWrites=true&w=majority`,
    ),
    SubjectsModule,
    FacultiesModule,
    ApplicantsModule,
  ],
})
export class AppModule {}
