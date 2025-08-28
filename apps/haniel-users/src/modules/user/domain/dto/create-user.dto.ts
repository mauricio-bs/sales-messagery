import { Role } from '@common/enum/role.enum';
import { User } from '@entities/User';
import {
  IsBoolean,
  IsEmail,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDTO
  implements Omit<User, 'id' | 'createdAt' | 'updatedAt' | 'role' | 'isActive'>
{
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsStrongPassword({
    minLength: 6,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minLowercase: 1,
  })
  password: string;
}
