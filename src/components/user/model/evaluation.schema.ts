import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';
import { EvaluationNameConstants } from 'src/core/prompts';
const {
  IsInputAPitch,
  LetterGradeFeaturesBenefits,
  EvaluationFeaturesBenefits,
  RecommendationsFeaturesBenefits,
  LetterGradeReadiness,
  EvaluationReadiness,
  RecommendationsReadiness,
  LetterBTE,
  EvaluationBTE,
  RecommendationsBTE,
  LetterAdoption,
  EvaluationAdoption,
  RecommendationsAdoption,
  LetterSupplyChain,
  EvaluationSupplyChain,
  RecommendationsSupplyChain,
  LetterMarketSize,
  EvaluationMarketSize,
  RecommendationsMarketSize,
  LetterEE,
  EvaluationEE,
  RecommendationsEE,
  LetterFE,
  EvaluationFE,
  RecommendationsFE,
} = EvaluationNameConstants;

@Schema({ collection: 'evaluation', timestamps: true })
export class Evaluation {
  _id!: MongooseSchema.Types.ObjectId;

  @Prop({ type: String, default: 'main', unique: true })
  modelName: string;

  @Prop({ type: String, default: IsInputAPitch })
  IsInputAPitch: string;

  @Prop({ type: String, default: LetterGradeFeaturesBenefits })
  LetterGradeFeaturesBenefits: string;

  @Prop({ type: String, default: EvaluationFeaturesBenefits })
  EvaluationFeaturesBenefits: string;

  @Prop({ type: String, default: RecommendationsFeaturesBenefits })
  RecommendationsFeaturesBenefits: string;

  @Prop({ type: String, default: LetterGradeReadiness })
  LetterGradeReadiness: string;

  @Prop({ type: String, default: EvaluationReadiness })
  EvaluationReadiness: string;

  @Prop({ type: String, default: RecommendationsReadiness })
  RecommendationsReadiness: string;

  @Prop({ type: String, default: LetterBTE })
  LetterBTE: string;

  @Prop({ type: String, default: EvaluationBTE })
  EvaluationBTE: string;

  @Prop({ type: String, default: RecommendationsBTE })
  RecommendationsBTE: string;

  @Prop({ type: String, default: LetterAdoption })
  LetterAdoption: string;

  @Prop({ type: String, default: EvaluationAdoption })
  EvaluationAdoption: string;

  @Prop({ type: String, default: RecommendationsAdoption })
  RecommendationsAdoption: string;

  @Prop({ type: String, default: LetterSupplyChain })
  LetterSupplyChain: string;

  @Prop({ type: String, default: EvaluationSupplyChain })
  EvaluationSupplyChain: string;

  @Prop({ type: String, default: RecommendationsSupplyChain })
  RecommendationsSupplyChain: string;

  @Prop({ type: String, default: LetterMarketSize })
  LetterMarketSize: string;

  @Prop({ type: String, default: EvaluationMarketSize })
  EvaluationMarketSize: string;

  @Prop({ type: String, default: RecommendationsMarketSize })
  RecommendationsMarketSize: string;

  @Prop({ type: String, default: LetterEE })
  LetterEE: string;

  @Prop({ type: String, default: EvaluationEE })
  EvaluationEE: string;

  @Prop({ type: String, default: RecommendationsEE })
  RecommendationsEE: string;

  @Prop({ type: String, default: LetterFE })
  LetterFE: string;

  @Prop({ type: String, default: EvaluationFE })
  EvaluationFE: string;

  @Prop({ type: String, default: RecommendationsFE })
  RecommendationsFE: string;
}

export const EvaluationSchema = SchemaFactory.createForClass(Evaluation);
