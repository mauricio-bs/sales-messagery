import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { Sale } from '@entities/Sale';
import { CreateSaleDTO } from '@modules/sale/domain/dto/create-sale.dto';
import { FilterSalesDTO } from '@modules/sale/domain/dto/filter-sales.dto';
import { UpdateSaleDTO } from '@modules/sale/domain/dto/update-sale.dto';

export abstract class ISaleRepository {
  abstract create(data: CreateSaleDTO): Promise<Sale>;
  abstract update(id: string, data: UpdateSaleDTO): Promise<Sale>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Sale>;
  abstract findAll(filters: FilterSalesDTO): Promise<IPaginatedResult<Sale>>;
}
