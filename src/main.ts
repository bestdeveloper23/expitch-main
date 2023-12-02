import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { getCors } from './core/cors';
import { ConfigServiceWithEnv } from './config/environment.schema';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth'; 


async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const configService = app.get(ConfigService) as ConfigServiceWithEnv;
  const baseUrl = configService.getOrThrow<string>('BASE_URL');

  app.enableCors(getCors(configService));
  app.set('trust proxy', true);
  app.use(
    '/swagger',
    basicAuth({
      users: { 'admin': '@snackmunch' }, // Replace with desired username and password
      challenge: true,
      realm: 'Swagger API Documentation',
    }),
  );
  // Swagger Config

  const swaggerConfig = new DocumentBuilder()
    .addServer(baseUrl)
    .setTitle('Expitch API')
    .setDescription('API for Expitch - AI for your Pitch Deck')
    .setVersion('1.0')
    .addApiKey({ type: 'apiKey', name: 'x-api-key', in: 'header' }, 'expitch')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT || 8080);
}
bootstrap();
