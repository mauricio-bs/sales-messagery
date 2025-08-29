import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { PaginationOptions } from '@common/interfaces/PaginationOptions';

export class CategoryFiltersDTO extends PaginationOptions {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
