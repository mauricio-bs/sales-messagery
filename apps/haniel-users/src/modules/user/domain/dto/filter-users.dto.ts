import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

import { Role } from '@common/enum/role.enum';
import { PaginationOptions } from '@common/interfaces/PaginationOptions';

export class FilterUsersDTO extends PaginationOptions {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
