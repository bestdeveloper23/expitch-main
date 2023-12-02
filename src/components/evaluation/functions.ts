import { ChatCompletionFunctions } from 'openai';

export default function formatSchema(
  EvaluationNameConstants,
): ChatCompletionFunctions[] {
  return [
    {
      name: 'getPitchEvaluation',
      description:
        'If the given text is a start up pitch, get the pitch evaluation. The text must contains some factors like Introduction and Elevator Pitch, Problem Statement, Solution, Market Opportunity, Business Model, Target Audience and Customer Segments, Competitive Advantage, Financials and Funding. Otherwise do not evaluate.',
      parameters: {
        type: 'object',
        properties: {
          LetterGradeFeaturesBenefits: {
            type: 'string',
            description: EvaluationNameConstants.LetterGradeFeaturesBenefits,
          },
          EvaluationFeaturesBenefits: {
            type: 'string',
            description: EvaluationNameConstants.EvaluationFeaturesBenefits,
          },
          RecommendationsFeaturesBenefits: {
            type: 'string',
            description:
              EvaluationNameConstants.RecommendationsFeaturesBenefits,
          },
          LetterGradeReadiness: {
            type: 'string',
            description: EvaluationNameConstants.LetterGradeReadiness,
          },
          EvaluationReadiness: {
            type: 'string',
            description: EvaluationNameConstants.EvaluationReadiness,
          },
          RecommendationsReadiness: {
            type: 'string',
            description: EvaluationNameConstants.RecommendationsReadiness,
          },
          LetterBTE: {
            type: 'string',
            description: EvaluationNameConstants.LetterBTE,
          },
          EvaluationBTE: {
            type: 'string',
            description: EvaluationNameConstants.EvaluationBTE,
          },
          RecommendationsBTE: {
            type: 'string',
            description: EvaluationNameConstants.RecommendationsBTE,
          },
          LetterAdoption: {
            type: 'string',
            description: EvaluationNameConstants.LetterAdoption,
          },
          EvaluationAdoption: {
            type: 'string',
            description: EvaluationNameConstants.EvaluationAdoption,
          },
          RecommendationsAdoption: {
            type: 'string',
            description: EvaluationNameConstants.RecommendationsAdoption,
          },
          LetterSupplyChain: {
            type: 'string',
            description: EvaluationNameConstants.LetterSupplyChain,
          },
          EvaluationSupplyChain: {
            type: 'string',
            description: EvaluationNameConstants.EvaluationSupplyChain,
          },
          RecommendationsSupplyChain: {
            type: 'string',
            description: EvaluationNameConstants.RecommendationsSupplyChain,
          },
          LetterMarketSize: {
            type: 'string',
            description: EvaluationNameConstants.LetterMarketSize,
          },
          EvaluationMarketSize: {
            type: 'string',
            description: EvaluationNameConstants.EvaluationMarketSize,
          },
          RecommendationsMarketSize: {
            type: 'string',
            description: EvaluationNameConstants.RecommendationsMarketSize,
          },
          LetterEE: {
            type: 'string',
            description: EvaluationNameConstants.LetterEE,
          },
          EvaluationEE: {
            type: 'string',
            description: EvaluationNameConstants.EvaluationEE,
          },
          RecommendationsEE: {
            type: 'string',
            description: EvaluationNameConstants.RecommendationsEE,
          },
          LetterFE: {
            type: 'string',
            description: EvaluationNameConstants.LetterFE,
          },
          EvaluationFE: {
            type: 'string',
            description: EvaluationNameConstants.EvaluationFE,
          },
          RecommendationsFE: {
            type: 'string',
            description: EvaluationNameConstants.RecommendationsFE,
          },
        },
        required: [
          'LetterGradeFeaturesBenefits',
          'EvaluationFeaturesBenefits',
          'RecommendationsFeaturesBenefits',
          'LetterGradeReadiness',
          'EvaluationReadiness',
          'RecommendationsReadiness',
          'LetterBTE',
          'EvaluationBTE',
          'RecommendationsBTE',
          'LetterAdoption',
          'EvaluationAdoption',
          'RecommendationsAdoption',
          'LetterSupplyChain',
          'EvaluationSupplyChain',
          'RecommendationsSupplyChain',
          'LetterMarketSize',
          'EvaluationMarketSize',
          'RecommendationsMarketSize',
          'LetterEE',
          'EvaluationEE',
          'RecommendationsEE',
          'LetterFE',
          'EvaluationFE',
          'RecommendationsFE',
        ],
      },
    },
  ];
}
