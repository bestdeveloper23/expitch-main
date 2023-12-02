import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from '../auth/auth.module';
import { CloudStorageModule } from '../cloudStorage/cloudStorage.module';
import { OpenAiIntegrationModule } from '../openAiIntegration/openAiIntegration.module';
import { UserModule } from '../user/user.module';
import {
  NewPitch,
  NewPitchSchema,
  Pitch,
  PitchEvaluation,
  PitchEvaluationSchema,
  PitchSchema,
} from './model/pitch.schema';
import { PitchController } from './pitch.controller';
import { PitchService } from './pitch.service';
import { LangchainService } from '../langchain/langchain.service';
import { EvaluationModule } from '../evaluation/evaluation.module';
import { EvaluationService } from '../evaluation/evaluation.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Pitch.name, schema: PitchSchema },
      { name: NewPitch.name, schema: NewPitchSchema },
      { name: PitchEvaluation.name, schema: PitchEvaluationSchema },
    ]),
    OpenAiIntegrationModule,
    CloudStorageModule,
    UserModule,
    AuthModule,
    EvaluationModule,
  ],
  controllers: [PitchController],
  providers: [PitchService, LangchainService, EvaluationService],
  exports: [PitchService],
})
export class PitchModule {}
