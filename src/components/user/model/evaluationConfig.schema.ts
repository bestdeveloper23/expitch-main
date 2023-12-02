import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

export class EvaluationPack {
  @Prop({ type: String, required: true })
  LetterGrade: string;
  @Prop({ type: String, required: true })
  Evaluation: string;
  @Prop({ type: String, required: true })
  Recommendations: string;
  temperature: number;
  maxTokens: number;
  @Prop({ type: String, required: true, default: 'gpt-3.5-turbo-16k-0613' })
  modelName: string;
}

@Schema({ collection: 'evaluation_config', timestamps: true })
export class EvaluationConfig {
  _id!: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, unique: true, required: true })
  name: string;

  @Prop({ type: EvaluationPack, required: true })
  FeatureBenefits: EvaluationPack;

  @Prop({ type: EvaluationPack, required: true })
  Readiness: EvaluationPack;

  @Prop({ type: EvaluationPack, required: true })
  BarrierToEntry: EvaluationPack;

  @Prop({ type: EvaluationPack, required: true })
  Adoption: EvaluationPack;

  @Prop({ type: EvaluationPack, required: true })
  SupplyChain: EvaluationPack;

  @Prop({ type: EvaluationPack, required: true })
  MarketSize: EvaluationPack;

  @Prop({ type: EvaluationPack, required: true })
  EntrepreneurExperience: EvaluationPack;

  @Prop({ type: EvaluationPack, required: true })
  FinancialExpectations: EvaluationPack;

  @Prop({ type: String, required: true })
  IsInputAPitch: string;
}
export const EvaluationConfigSchema =
  SchemaFactory.createForClass(EvaluationConfig);
