import { IsNotEmpty } from 'class-validator';

export class VerifySessionInput {
  @IsNotEmpty()
  sessionToken: string;

  recaptchaToken: string;
}
