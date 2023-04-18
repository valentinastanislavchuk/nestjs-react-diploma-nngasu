import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Дипломный проект')
    .setDescription(
      'Документация REST API к дипломному проекту по разработке web-приложения для фильтрации направлений на основе результатов ЕГЭ с расчётом вероятности поступления. Стек: NestJS + MongoDb + React.',
    )
    .setVersion('1.0.0')
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('/api/docs', app, swaggerDocument);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
}
bootstrap();
