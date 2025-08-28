import { Injectable, NotFoundException } from '@nestjs/common';

import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { Sale } from '@entities/Sale';
import { ISaleRepository } from '@repository/ISaleRepository';
import { CreateSaleDTO } from '../domain/dto/create-sale.dto';
import { FilterSalesDTO } from '../domain/dto/filter-sales.dto';
import { UpdateSaleDTO } from '../domain/dto/update-sale.dto';
import { ISaleService } from '../domain/service/ISale.service';

@Injectable()
export class SaleService implements ISaleService {
  constructor(private repository: ISaleRepository) {}

  async create(data: CreateSaleDTO): Promise<Sale> {
    // TODO: Check if every product exists
    return await this.repository.create(data);
  }

  async update(id: string, data: UpdateSaleDTO): Promise<Sale> {
    // TODO: Check if products to update exists
    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Sale> {
    const sale = await this.repository.findById(id);
    if (!sale) throw new NotFoundException('Sale not found');

    return sale;
  }

  async findAll(filters: FilterSalesDTO): Promise<IPaginatedResult<Sale>> {
    return await this.repository.findAll(filters);
  }
}
