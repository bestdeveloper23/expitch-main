import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { exampleBarrierToEntry } from 'src/components/user/model/evaluationConfig.entity';
import { EvaluationNameConstants } from 'src/core/prompts';

export class exampleConfig {
  @ApiProperty({
    description: 'This is the prompt for LetterGrade.',
    example: 'Based on the information provided in the pitch, evaluate the...',
  })
  LetterGrade: string;
  @ApiProperty({
    description: 'This is the prompt for Evaluation.',
    example:
      "Given the provided pitch, Evaluate the Barrier To Entry aspect of the startup's product...",
  })
  Evaluation: string;
  @ApiProperty({
    description: 'This is the prompt for Recommendations.',
    example:
      'Based on the evaluation of the Barrier To Entry aspect, provide...',
  })
  Recommendations: string;
  @ApiProperty({
    description: 'This is the model temperature from 0 - 2 .',
    example: 0.2,
  })
  temperature: number;
  @ApiProperty({
    description: 'This is max tokens. Default 7000.',
    example: 7000,
  })
  maxTokens: number;
}
export class CreateEvaluationDto {
  @ApiProperty({
    description: 'This is the name of the model to use.',
    example: 'model_1',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Evaluate if the text is a startup pitch.',
    example: EvaluationNameConstants.IsInputAPitch,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  IsInputAPitch: string;

  @ApiProperty({
    description: 'Evaluate if the text is a startup pitch.',
    type: exampleConfig,
  })
  FeatureBenefits: exampleConfig;
  @ApiProperty({
    description: 'Evaluate if the text is a startup pitch.',
    type: exampleConfig,
  })
  Readiness: exampleConfig;
  @ApiProperty({
    description: 'Evaluate if the text is a startup pitch.',
    type: exampleConfig,
  })
  BarrierToEntry: exampleConfig;
  @ApiProperty({
    description: 'Evaluate if the text is a startup pitch.',
    type: exampleConfig,
  })
  Adoption: exampleConfig;
  @ApiProperty({
    description: 'Evaluate if the text is a startup pitch.',
    type: exampleConfig,
  })
  SupplyChain: exampleConfig;
  @ApiProperty({
    description: 'Evaluate if the text is a startup pitch.',
    type: exampleConfig,
  })
  MarketSize: exampleConfig;
  @ApiProperty({
    description: 'Evaluate if the text is a startup pitch.',
    type: exampleConfig,
  })
  EntrepreneurExperience: exampleConfig;
  @ApiProperty({
    description: 'Evaluate if the text is a startup pitch.',
    type: exampleConfig,
  })
  FinancialExpectations: exampleConfig;
}
export class UpdateEvaluationDto extends PartialType(CreateEvaluationDto) {}
export class ExampleUpdateDto {
  @ApiProperty({
    description: 'This is the name of the model to use.',
    example: 'model_1',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Evaluate if the text is a startup pitch.',
    example: exampleBarrierToEntry,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  BarrierToEntry?: string;
}
