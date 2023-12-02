import { Module } from '@nestjs/common';
import { EvaluationService } from './evaluation.service';
import { EvaluationController } from './evaluation.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Evaluation, EvaluationSchema } from '../user/model/evaluation.schema';
import {
  EvaluationConfig,
  EvaluationConfigSchema,
} from '../user/model/evaluationConfig.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Evaluation.name, schema: EvaluationSchema },
      { name: EvaluationConfig.name, schema: EvaluationConfigSchema },
    ]),
  ],
  providers: [EvaluationService],
  controllers: [EvaluationController],
  exports: [
    EvaluationService,
    MongooseModule.forFeature([
      { name: Evaluation.name, schema: EvaluationSchema },
    ]),
  ],
})
export class EvaluationModule {}
