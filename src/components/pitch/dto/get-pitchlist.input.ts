import { IsEmail, IsNotEmpty } from 'class-validator';

export class GetPitchListForEmail {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}