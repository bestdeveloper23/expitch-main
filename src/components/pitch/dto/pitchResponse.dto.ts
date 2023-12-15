import { ApiProperty } from '@nestjs/swagger';
import defaultPitchText from './defaultPitch';
import { NewPitch, PitchEvaluation } from '../model/pitch.schema';

export class UploadPitchDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Pitch file',
  })
  pitchFile: any;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'Model name', example: 'main' })
  modelName: string;

  @ApiProperty({ description: 'Recaptcha token' })
  recaptchaToken: string;
}

export class UploadPitchAdminDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Pitch file',
  })
  pitchFile: any;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'Model name', example: 'main' })
  modelName: string;
}

export class UploadPitchAdminDtoNEW {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Pitch file',
  })
  pitchFile: any;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'Model name', example: 'main' })
  modelName: string;
}
export class UploadPitchDtoNEW {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Pitch file',
  })
  pitchFile: any;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'Model name', example: 'main' })
  modelName: string;

  @ApiProperty({ description: 'Recaptcha token' })
  recaptchaToken: string;
}
export class UploadAdminAudioDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Pitch file',
  })
  pitchFile: any;

  @ApiProperty({ description: 'User email' })
  email: string;
}
export class UploadAudioDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Pitch file',
  })
  pitchFile: any;

  @ApiProperty({ description: 'User email' })
  email: string;

  @ApiProperty({ description: 'Recaptcha token' })
  recaptchaToken: string;
}

export class EvaluateLCPitchDto {
  @ApiProperty({ description: 'User email', example: 'ben@expitch.com' })
  email: string;

  @ApiProperty({ description: 'Model name', example: defaultPitchText })
  pitchText: string;

  @ApiProperty({ description: 'Model name', example: 'main' })
  modelName: string;

  @ApiProperty({ description: 'Recaptcha token' })
  recaptchaToken: string;
}

export class EvaluateLCPitchAdminDto {
  @ApiProperty({ description: 'User email', example: 'ben@expitch.com' })
  email: string;

  @ApiProperty({ description: 'Model name', example: defaultPitchText })
  pitchText: string;

  @ApiProperty({ description: 'Model name', example: 'main' })
  modelName: string;
}
export class PitchResponseDtoPart1 {
  @ApiProperty({ description: 'Message', example: 'CONVERTED_TO_PITCH' })
  message: string;
  @ApiProperty({
    description: 'Pitch',
    example: 'This is a really long field usually',
  })
  pitch: string;
}

class EvaluationDetailsDto {
  @ApiProperty({
    description: 'Letter grade for the evaluation category.',
    example: 'A+',
  })
  letterGrade: string;

  @ApiProperty({
    description: 'Detailed evaluation for the category.',
    example: 'DoorDash has demonstrated a high level...',
  })
  evaluation: string;

  @ApiProperty({
    description: 'Recommendations based on the evaluation.',
    example: 'To further improve their readiness...',
  })
  recommendations: string;
}

export class PitchEvaluationResponseDto {
  @ApiProperty({
    description: 'Response message indicating the status of the operation.',
    example: 'EVALUATED',
  })
  message: string;

  @ApiProperty({
    description: 'Unique identifier for the evaluation.',
    example: '64f243563ce32e29de9dcacb',
  })
  _id: string;

  @ApiProperty({
    description: 'Evaluation details for feature benefits.',
    type: EvaluationDetailsDto,
  })
  featureBenefits: EvaluationDetailsDto;

  @ApiProperty({
    description: 'Evaluation details for readiness.',
    type: EvaluationDetailsDto,
  })
  readiness: EvaluationDetailsDto;

  @ApiProperty({
    description: 'Evaluation details for barrier to entry.',
    type: EvaluationDetailsDto,
  })
  barrierToEntry: EvaluationDetailsDto;

  @ApiProperty({
    description: 'Evaluation details for adoption.',
    type: EvaluationDetailsDto,
  })
  adoption: EvaluationDetailsDto;

  @ApiProperty({
    description: 'Evaluation details for supply chain.',
    type: EvaluationDetailsDto,
  })
  supplyChain: EvaluationDetailsDto;

  @ApiProperty({
    description: 'Evaluation details for market size.',
    type: EvaluationDetailsDto,
  })
  marketSize: EvaluationDetailsDto;

  @ApiProperty({
    description: 'Evaluation details for entrepreneur experience.',
    type: EvaluationDetailsDto,
  })
  entrepreneurExperience: EvaluationDetailsDto;

  @ApiProperty({
    description: 'Evaluation details for financial expectations.',
    type: EvaluationDetailsDto,
  })
  financialExpectations: EvaluationDetailsDto;

  @ApiProperty({
    description: 'Name of the uploaded file.',
    example: 'doordash-1693598526533.mp3',
  })
  fileName: string;
}

export class createTextPitchResponse {
  @ApiProperty({
    description: 'Object holding the evaluation Results.',
    type: PitchEvaluation,
  })
  evaluation: PitchEvaluation;

  @ApiProperty({
    description: 'Pitch record',
    type: NewPitch,
  })
  pitch: NewPitch;
}
export class PitchResponseDto {
  @ApiProperty({
    description: 'Unique identifier for the evaluation.',
    example: '64f243563ce32e29de9dcacb',
  })
  _id: string;

  @ApiProperty({
    description: 'Unique identifier for user.',
    example: '64f243563ce32e29de9dcacb',
  })
  userId: string;

  @ApiProperty({
    description: 'Contents for the business.',
    example: 'Pitch results for business',
  })
  pitchText: string;

  @ApiProperty({
    description: 'Evaluation details for feature benefits.',
    type: EvaluationDetailsDto,
  })
  featureBenefits: EvaluationDetailsDto;

  @ApiProperty({
    description: 'Evaluation details for readiness.',
    type: EvaluationDetailsDto,
  })
  readiness: EvaluationDetailsDto;

  @ApiProperty({
    description: 'Evaluation details for barrier to entry.',
    type: EvaluationDetailsDto,
  })
  barrierToEntry: EvaluationDetailsDto;

  @ApiProperty({
    description: 'Evaluation details for adoption.',
    type: EvaluationDetailsDto,
  })
  adoption: EvaluationDetailsDto;

  @ApiProperty({
    description: 'Evaluation details for supply chain.',
    type: EvaluationDetailsDto,
  })
  supplyChain: EvaluationDetailsDto;

  @ApiProperty({
    description: 'Evaluation details for market size.',
    type: EvaluationDetailsDto,
  })
  marketSize: EvaluationDetailsDto;

  @ApiProperty({
    description: 'Evaluation details for entrepreneur experience.',
    type: EvaluationDetailsDto,
  })
  entrepreneurExperience: EvaluationDetailsDto;

  @ApiProperty({
    description: 'Evaluation details for financial expectations.',
    type: EvaluationDetailsDto,
  })
  financialExpectations: EvaluationDetailsDto;

  @ApiProperty({
    description: 'Name of the uploaded file.',
    example: 'doordash-1693598526533.mp3',
  })
  fileName: string;

  @ApiProperty({
    description: 'Craeted date of pitch.',
  })
  createdAt: Date;
}
