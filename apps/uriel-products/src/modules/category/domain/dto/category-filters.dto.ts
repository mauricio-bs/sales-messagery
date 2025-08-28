import { PaginationOptions } from '@common/interfaces/PaginationOptions';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CategoryFiltersDTO extends PaginationOptions {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
