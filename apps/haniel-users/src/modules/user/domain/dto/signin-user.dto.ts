import { IsEmail, IsString } from 'class-validator';

export class SigninUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
