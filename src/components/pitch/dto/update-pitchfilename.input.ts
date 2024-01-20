import { IsNotEmpty } from 'class-validator';

export class UpdatePitchFileNameInput {
  @IsNotEmpty()
  _id: string;
  fileName: string;
  recaptchaToken: string;
}