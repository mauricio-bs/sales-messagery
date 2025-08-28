import { IsNumber, IsOptional, IsPositive, Min } from 'class-validator';

export class PaginationOptions {
  @IsOptional()
  @IsNumber()
  @IsPositive()
  page: number = 1;

  @IsOptional()
  @IsNumber()
  @Min(10)
  limit: number = 10;
}
