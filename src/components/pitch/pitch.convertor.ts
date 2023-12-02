import { CreateEvaluationOutput } from './dto/create-evaluation.output';
import { Pitch } from './model/pitch.schema';

export const pitchModelToOutput = (pitch: Pitch): CreateEvaluationOutput => ({
  _id: String(pitch._id),
  featureBenefits: { ...pitch.featureBenefits },
  readiness: { ...pitch.readiness },
  barrierToEntry: { ...pitch.barrierToEntry },
  adoption: { ...pitch.adoption },
  supplyChain: { ...pitch.supplyChain },
  marketSize: { ...pitch.marketSize },
  entrepreneurExperience: { ...pitch.entrepreneurExperience },
  financialExpectations: { ...pitch.financialExpectations },
  fileName: pitch.fileName,
});
