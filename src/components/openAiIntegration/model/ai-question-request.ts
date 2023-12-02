import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator';

export class AiQuestionRequestModel {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsOptional()
  modelId?: string;

  @IsNumber()
  @IsOptional()
  temperature?: number;

  @IsNumber()
  @IsOptional()
  maxTokens?: number;
}

export type AiQuestionModel = Pick<AiQuestionRequestModel, 'question'>;
