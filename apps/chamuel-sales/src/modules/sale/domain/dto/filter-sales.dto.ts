import { IsDateString, IsEnum, IsOptional } from 'class-validator';

import { ESaleStatus } from '@common/enum/SaleStatus.enum';
import { PaginationOptions } from '@common/interfaces/PaginationOptions';

export class FilterSalesDTO extends PaginationOptions {
  @IsOptional()
  @IsEnum(ESaleStatus)
  status?: ESaleStatus;

  @IsOptional()
  @IsDateString()
  from?: Date | string;

  @IsOptional()
  @IsDateString()
  to?: Date | string;
}
