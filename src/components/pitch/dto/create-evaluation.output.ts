import {} from 'class-validator';

class GeneralFactor {
  letterGrade: string;
  evaluation: string;
  recommendations: string;
}

export class CreateEvaluationOutput {
  _id: string;
  featureBenefits: GeneralFactor;
  readiness: GeneralFactor;
  barrierToEntry: GeneralFactor;
  adoption: GeneralFactor;
  supplyChain: GeneralFactor;
  marketSize: GeneralFactor;
  entrepreneurExperience: GeneralFactor;
  financialExpectations: GeneralFactor;
  fileName: string;
}
