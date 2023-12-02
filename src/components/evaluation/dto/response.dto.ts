import { ApiProperty } from '@nestjs/swagger';
import { CreateEvaluationDto } from './createEvaluation.dto';

export class GetModelResponse {
  @ApiProperty({
    description: 'The id of the model.',
    example: '1234567890',
    required: true,
  })
  _id: string;
  @ApiProperty({
    description: 'The name of the model.',
    example: 'model_1',
    required: true,
  })
  name: string;
}

export class UpsertEvaluationResponse extends CreateEvaluationDto {
  @ApiProperty({
    description: 'The id of the model.',
    example: '1234567890',
    required: true,
  })
  _id: string;
}
