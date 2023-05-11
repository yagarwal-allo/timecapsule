import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

function createSwagger(app: INestApplication) {
  const SWAGGER_TITLE = 'Timecapsule API';
  const SWAGGER_DESCRIPTION = 'Api to upload and list timelocked files to web3.storage';
  const SWAGGER_PREFIX = '/docs';
  const VERSION = '1.0.0';
  const options = new DocumentBuilder()
    .setTitle(SWAGGER_TITLE)
    .setDescription(SWAGGER_DESCRIPTION)
    .setVersion(VERSION)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(SWAGGER_PREFIX, app, document);
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  createSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
