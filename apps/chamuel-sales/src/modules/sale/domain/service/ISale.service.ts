import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { Sale } from '@entities/Sale';

import { CreateSaleDTO } from '../dto/create-sale.dto';
import { FilterSalesDTO } from '../dto/filter-sales.dto';
import { UpdateSaleDTO } from '../dto/update-sale.dto';

export abstract class ISaleService {
  abstract create(data: CreateSaleDTO): Promise<Sale>;
  abstract update(id: string, data: UpdateSaleDTO): Promise<Sale>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Sale>;
  abstract findAll(filters: FilterSalesDTO): Promise<IPaginatedResult<Sale>>;
}
