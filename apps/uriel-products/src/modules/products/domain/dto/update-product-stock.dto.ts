import { IsIn, IsNotEmpty, IsNumber, IsUUID } from 'class-validator';

export class UpdateProductStockDTO {
  @IsUUID(4)
  id: string;

  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsIn(['increase', 'decrease'])
  operation: 'increase' | 'decrease';
}
