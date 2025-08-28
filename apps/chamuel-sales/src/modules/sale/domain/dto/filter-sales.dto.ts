import { ESaleStatus } from '@common/enum/SaleStatus.enum';
import { PaginationOptions } from '@common/interfaces/PaginationOptions';
import { IsDateString, IsEnum, IsOptional } from 'class-validator';

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
