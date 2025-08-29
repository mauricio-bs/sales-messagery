import { OmitType, PartialType } from '@nestjs/mapped-types';

import { CreateUserDTO } from './create-user.dto';

export class UpdateUserDTo extends PartialType(
  OmitType(CreateUserDTO, ['email', 'password']),
) {}
