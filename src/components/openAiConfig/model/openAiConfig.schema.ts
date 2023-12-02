import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OpenAiConfigDocument = HydratedDocument<OpenAiConfig>;

@Schema({ collection: 'openAIConfig' })
export class OpenAiConfig {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  modelId: string;

  @Prop({ required: true })
  maxTokens: number;

  @Prop({ required: true })
  temperature: number;
}

export const OpenAIConfigSchema = SchemaFactory.createForClass(OpenAiConfig);
