export enum ModelName {
  Default = 'default',
  Gpt35Turbo = 'gpt35Turbo',
  Gpt35Turbo16kJune13 = 'gpt35Turbo16kJune13',
}

export enum EvaluationName {
  IsInputAPitch = 'IsInputAPitch',
  LetterGradeFeaturesBenefits = 'LetterGradeFeaturesBenefits',
  EvaluationFeaturesBenefits = 'EvaluationFeaturesBenefits',
  RecommendationsFeaturesBenefits = 'RecommendationsFeaturesBenefits',
  LetterGradeReadiness = 'LetterGradeReadiness',
  EvaluationReadiness = 'EvaluationReadiness',
  RecommendationsReadiness = 'RecommendationsReadiness',
  LetterBTE = 'LetterBTE',
  EvaluationBTE = 'EvaluationBTE',
  RecommendationsBTE = 'RecommendationsBTE',
  LetterAdoption = 'LetterAdoption',
  EvaluationAdoption = 'EvaluationAdoption',
  RecommendationsAdoption = 'RecommendationsAdoption',
  LetterSupplyChain = 'LetterSupplyChain',
  EvaluationSupplyChain = 'EvaluationSupplyChain',
  RecommendationsSupplyChain = 'RecommendationsSupplyChain',
  LetterMarketSize = 'LetterMarketSize',
  EvaluationMarketSize = 'EvaluationMarketSize',
  RecommendationsMarketSize = 'RecommendationsMarketSize',
  LetterEE = 'LetterEE',
  EvaluationEE = 'EvaluationEE',
  RecommendationsEE = 'RecommendationsEE',
  LetterFE = 'LetterFE',
  EvaluationFE = 'EvaluationFE',
  RecommendationsFE = 'RecommendationsFE',
}

export enum ResponseMessage {
  ConvertedToPitch = 'CONVERTED_TO_PITCH',
  Evaluated = 'EVALUATED',
}
