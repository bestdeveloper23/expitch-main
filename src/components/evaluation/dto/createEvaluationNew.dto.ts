import {
  IsString,
  IsOptional,
  Validate,
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@ValidatorConstraint({ async: false })
export class EvaluationValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const obj = args.object as CreateEvaluationNewDto;
    if (
      obj.discrimination &&
      (obj.letterGrade || obj.Evaluation || obj.Recommendations)
    ) {
      return false;
    }
    if (
      obj.letterGrade &&
      obj.Evaluation &&
      obj.Recommendations &&
      obj.discrimination
    ) {
      return false;
    }
    return true;
  }

  defaultMessage(args: ValidationArguments) {
    return 'Either set letterGrade, Evaluation, and Recommendations or set discrimination, but not both.';
  }
}

export class CreateEvaluationNewDto {
  @ApiProperty({ description: 'Type of the evaluation.' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: 'Letter grade for the evaluation.' })
  @IsOptional()
  @IsString()
  letterGrade?: string;

  @ApiPropertyOptional({ description: 'Evaluation details.' })
  @IsOptional()
  @IsString()
  Evaluation?: string;

  @ApiPropertyOptional({
    description: 'Recommendations based on the evaluation.',
  })
  @IsOptional()
  @IsString()
  Recommendations?: string;

  @ApiProperty({ description: 'Discrimination details.' })
  @IsString()
  @Validate(EvaluationValidator)
  discrimination: string;
}
