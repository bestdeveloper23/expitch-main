import { Module } from '@nestjs/common';
import { OpenAiIntegrationController } from './openAiIntegration.controller';
import { OpenAiIntegrationService } from './openAiIntegration.service';
import { OpenAiConfigModule } from '../openAiConfig/openAiConfig.module';
import { EvaluationModule } from '../evaluation/evaluation.module';
import { EvaluationService } from '../evaluation/evaluation.service';

@Module({
  imports: [OpenAiConfigModule, EvaluationModule],
  controllers: [OpenAiIntegrationController],
  providers: [OpenAiIntegrationService, EvaluationService],
  exports: [OpenAiIntegrationService],
})
export class OpenAiIntegrationModule {}
