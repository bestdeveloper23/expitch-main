import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEvaluationInput {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
