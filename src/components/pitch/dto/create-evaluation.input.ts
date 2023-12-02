import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateEvaluationInput {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  modelName: string;
  recaptchaToken: string;
}

export class TranscribeAudioDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  // recaptchaToken: string;
}
