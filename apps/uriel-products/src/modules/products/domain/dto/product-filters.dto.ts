import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';

import { PaginationOptions } from '@common/interfaces/PaginationOptions';

export class ProductFiltersDTO extends PaginationOptions {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID('4')
  categoryId?: string;

  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @IsOptional()
  @IsNumber()
  minQuantity?: number;

  @IsOptional()
  @IsNumber()
  maxQuantity?: number;

  @IsOptional()
  @IsNumber()
  minPrice?: number;

  @IsOptional()
  @IsNumber()
  maxPrice?: number;
}
