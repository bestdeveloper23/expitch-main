import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty, getSchemaPath } from '@nestjs/swagger';
import { Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/components/user/model/user.schema';

export class GeneralFactor {
  @Prop({ type: String, required: true })
  letterGrade: string;

  @Prop({ type: String, required: true })
  evaluation: string;

  @Prop({ type: String, required: true })
  recommendations: string;
}

export class FeatureBenefits extends GeneralFactor {}

export class Readiness extends GeneralFactor {}

export class BarrierToEntry extends GeneralFactor {}

export class Adoption extends GeneralFactor {}

export class SupplyChain extends GeneralFactor {}

export class MarketSize extends GeneralFactor {}

export class EntrepreneurExperience extends GeneralFactor {}

export class FinancialExpectations extends GeneralFactor {}

@Schema({ collection: 'pitch', timestamps: true })
export class Pitch {
  _id!: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  userId: User;

  @Prop({ type: String, required: true })
  pitchText: string;

  @Prop({ type: FeatureBenefits, required: true })
  featureBenefits: FeatureBenefits;

  @Prop({ type: Readiness, required: true })
  readiness: Readiness;

  @Prop({ type: BarrierToEntry, required: true })
  barrierToEntry: BarrierToEntry;

  @Prop({ type: Adoption, required: true })
  adoption: Adoption;

  @Prop({ type: SupplyChain, required: true })
  supplyChain: SupplyChain;

  @Prop({ type: MarketSize, required: true })
  marketSize: MarketSize;

  @Prop({ type: EntrepreneurExperience, required: true })
  entrepreneurExperience: EntrepreneurExperience;

  @Prop({ type: FinancialExpectations, required: true })
  financialExpectations: FinancialExpectations;

  @Prop({ type: String, required: true })
  fileName: string;
}

export class newGeneralFactor {
  @ApiProperty({
    description: 'Letter grade for the general factor.',
    example: 'A',
  })
  @Prop({ type: String, required: true })
  LetterGrade: string;

  @ApiProperty({
    description: 'Evaluation for the general factor.',
    example: 'This is a really long field usually',
  })
  @Prop({ type: String, required: true })
  Evaluation: string;

  @ApiProperty({
    description: 'Recommendations for the general factor.',
    example: 'This is a really long field usually',
  })
  @Prop({ type: String, required: true })
  Recommendations: string;
}
export class PitchCost {
  @ApiProperty({
    description: 'Total cost of the prompts.',
    example: 0.020031,
  })
  @Prop({ type: Number, required: true })
  totalPromptCost: number;

  @ApiProperty({
    description: 'Total cost of the completions.',
    example: 0.006012,
  })
  @Prop({ type: Number, required: true })
  totalCompletionCost: number;

  @ApiProperty({
    description: 'Total cost of the pitch.',
    example: 0.026043,
  })
  @Prop({ type: Number, required: true })
  totalCost: number;
}

@Schema({ collection: 'pitch_evaluation', timestamps: true })
export class PitchEvaluation {
  @ApiProperty({
    description:
      'Feature benefits which can be either a string or a newGeneralFactor instance.',
    type: newGeneralFactor,
  })
  @Prop({ type: MongooseSchema.Types.Mixed })
  FeatureBenefits: string | newGeneralFactor;

  @ApiProperty({
    description:
      'Feature benefits which can be either a string or a newGeneralFactor instance.',
    type: newGeneralFactor,
  })
  @Prop({ type: MongooseSchema.Types.Mixed })
  Readiness: string | newGeneralFactor;

  @ApiProperty({
    description:
      'Feature benefits which can be either a string or a newGeneralFactor instance.',
    type: newGeneralFactor,
  })
  @Prop({ type: MongooseSchema.Types.Mixed })
  BarrierToEntry: string | newGeneralFactor;

  @ApiProperty({
    description:
      'Feature benefits which can be either a string or a newGeneralFactor instance.',
    type: newGeneralFactor,
  })
  @Prop({ type: MongooseSchema.Types.Mixed })
  Adoption: string | newGeneralFactor;

  @ApiProperty({
    description:
      'Feature benefits which can be either a string or a newGeneralFactor instance.',
    type: newGeneralFactor,
  })
  @Prop({ type: MongooseSchema.Types.Mixed })
  SupplyChain: string | newGeneralFactor;

  @ApiProperty({
    description:
      'Feature benefits which can be either a string or a newGeneralFactor instance.',
    type: newGeneralFactor,
  })
  @Prop({ type: MongooseSchema.Types.Mixed })
  MarketSize: string | newGeneralFactor;

  @ApiProperty({
    description:
      'Feature benefits which can be either a string or a newGeneralFactor instance.',
    type: newGeneralFactor,
  })
  @Prop({ type: MongooseSchema.Types.Mixed })
  EntrepreneurExperience: string | newGeneralFactor;

  @ApiProperty({
    description:
      'Feature benefits which can be either a string or a newGeneralFactor instance.',
    type: newGeneralFactor,
  })
  @Prop({ type: MongooseSchema.Types.Mixed })
  FinancialExpectations: string | newGeneralFactor;

  @ApiProperty({
    description: 'The latest evaluation of the pitch.',
    type: PitchCost,
  })
  @Prop({ type: PitchCost, required: true }) // assuming it's a required field
  cost: PitchCost;
}

@Schema({ collection: 'pitch_new', timestamps: true })
export class NewPitch {
  @ApiProperty({
    description: 'Unique identifier for the pitch.',
    example: '64f243563ce32e29de9dcacb',
  })
  _id!: MongooseSchema.Types.ObjectId;

  @ApiProperty({
    description: 'Unique identifier for the user.',
    example: '64f243563ce32e29de9dcacb',
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: User.name, required: true })
  userId: User;

  @ApiProperty({
    description: 'Pitch text.',
    example: 'This is a really long field usually',
  })
  @Prop({ type: String, required: true })
  pitchText: string;

  @ApiProperty({
    description: 'Pitch file name.',
    example: 'How its stored in the cloud',
  })
  @Prop({ type: String })
  fileName: string;

  @ApiProperty({
    description: 'The latest evaluation of the pitch.',
    example: '64f243563ce32e29de9dcacb',
  })
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'pitchEvaluation' })
  latestEvaluationId: MongooseSchema.Types.ObjectId;

  @ApiProperty({
    description: 'The list of evaluations of the pitch.',
    example: ['64f243563ce32e29de9dcacb'],
  })
  @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'pitchEvaluation' }])
  evaluationIds: MongooseSchema.Types.ObjectId[];
}

export const PitchSchema = SchemaFactory.createForClass(Pitch);
export const NewPitchSchema = SchemaFactory.createForClass(NewPitch);
export const PitchEvaluationSchema =
  SchemaFactory.createForClass(PitchEvaluation);
