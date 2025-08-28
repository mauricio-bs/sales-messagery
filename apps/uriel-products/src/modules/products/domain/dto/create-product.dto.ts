import { EUnitType } from '@common/enum/unitType.enum';
import { Category } from '@entities/Category';
import { Product } from '@entities/Product';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateProductDTO
  implements
    Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'Category' | 'isActive'>
{
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsNumber()
  @IsPositive()
  costValue: number;

  @IsNumber()
  quantity: number;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsEnum(EUnitType)
  unitMeasure: EUnitType;

  @IsOptional()
  @IsUUID('4')
  categoryId?: string;
}
