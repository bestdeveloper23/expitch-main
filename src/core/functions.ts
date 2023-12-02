import { ChatCompletionFunctions } from 'openai';
import { ModelName } from './constants';
import { EvaluationNameConstants } from './prompts';

export type PitchEvaluation = {
  LetterGradeFeaturesBenefits?: string;
  EvaluationFeaturesBenefits?: string;
  RecommendationsFeaturesBenefits?: string;
  LetterGradeReadiness?: string;
  EvaluationReadiness?: string;
  RecommendationsReadiness?: string;
  LetterBTE?: string;
  EvaluationBTE?: string;
  RecommendationsBTE?: string;
  LetterAdoption?: string;
  EvaluationAdoption?: string;
  RecommendationsAdoption?: string;
  LetterSupplyChain?: string;
  EvaluationSupplyChain?: string;
  RecommendationsSupplyChain?: string;
  LetterMarketSize?: string;
  EvaluationMarketSize?: string;
  RecommendationsMarketSize?: string;
  LetterEE?: string;
  EvaluationEE?: string;
  RecommendationsEE?: string;
  LetterFE?: string;
  EvaluationFE?: string;
  RecommendationsFE?: string;
};

export const calculatePrice = (
  modelName: ModelName,
  promptTokens: number,
  completionTokens: number,
) => {
  switch (modelName) {
    case ModelName.Gpt35Turbo16kJune13:
      return (promptTokens / 1000) * 0.003 + (completionTokens / 1000) * 0.004;
      break;

    default:
      return 0;
      break;
  }
};

export const removeTrailingComma = (jsonString: string) => {
  // Use regex to find the last comma surrounded by optional white spaces and optional line breaks
  return jsonString.replace(/,\s*([\]}])/g, '$1');
};
