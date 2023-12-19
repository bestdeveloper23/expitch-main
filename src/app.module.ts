import { Module, ValidationPipe } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OpenAiIntegrationModule } from './components/openAiIntegration/openAiIntegration.module';
import { OpenAiConfigModule } from './components/openAiConfig/openAiConfig.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_PIPE } from '@nestjs/core';
import {
  ConfigServiceWithEnv,
  environmentValidationSchema,
} from './config/environment.schema';
import { PitchModule } from './components/pitch/pitch.module';
import { EvaluationModule } from './components/evaluation/evaluation.module';

const getMongoUrl = (configService: ConfigServiceWithEnv) => {
  // const DB_USERNAME = configService.get('DB_USERNAME');
  // const DB_PASSWORD = configService.get('DB_PASSWORD');
  const DB_HOST = configService.get('DB_HOST');
  const DB_DATABASE = configService.get('DB_DATABASE');
  return `mongodb://${DB_HOST}/${DB_DATABASE}?retryWrites=true&w=majority`;
};

@Module({
  imports: [
    ConfigModule.forRoot(),
    OpenAiIntegrationModule,
    OpenAiConfigModule,
    PitchModule,
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: environmentValidationSchema,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigServiceWithEnv) => ({
        uri: getMongoUrl(configService),
      }),
    }),
    EvaluationModule,
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
