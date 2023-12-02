import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginInput {
  @IsNotEmpty()
  @IsEmail()
  email: string;
  recaptchaToken: string;
}
