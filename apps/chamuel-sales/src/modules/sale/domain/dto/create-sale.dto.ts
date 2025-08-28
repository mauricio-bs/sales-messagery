import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

import { ESaleStatus } from '@common/enum/SaleStatus.enum';
import { Sale } from '@entities/Sale';
import { SaleItems } from '@entities/SaleItems';

class CreateSaleItemDTO
  implements
    Omit<SaleItems, 'id' | 'createdAt' | 'updatedAt' | 'sale' | 'saleId'>
{
  @IsString()
  name: string;

  @IsNumber()
  @IsPositive()
  quantity: number;

  @IsNumber()
  @IsPositive()
  unit_value: number;

  @IsNumber()
  @IsPositive()
  total_value: number;

  @IsUUID(4)
  productId: string;
}

export class CreateSaleDTO
  implements Omit<Sale, 'id' | 'createdAt' | 'updatedAt' | 'items'>
{
  @IsNumber()
  @IsPositive()
  total: number;

  @IsOptional()
  @IsEnum(ESaleStatus)
  status: ESaleStatus = ESaleStatus.pending;

  items: CreateSaleItemDTO[];
}
