import { IsNotEmpty } from 'class-validator';

export class VerifySessionInput {
  @IsNotEmpty()
  sessionJwt: string;

  @IsNotEmpty()
  sessionToken: string;

  recaptchaToken: string;
}
