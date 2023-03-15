import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { GlobalExceptionFilter } from './filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.setGlobalPrefix('api');

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Job-Portal application')
    .setDescription('Api spec for Job-Portal')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('/docs', app, document);

  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(3000);
}

bootstrap();
