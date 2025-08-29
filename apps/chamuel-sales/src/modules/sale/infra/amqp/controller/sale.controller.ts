import { Controller, ParseUUIDPipe } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateSaleDTO } from '@modules/sale/domain/dto/create-sale.dto';
import { FilterSalesDTO } from '@modules/sale/domain/dto/filter-sales.dto';
import { UpdateSaleDTO } from '@modules/sale/domain/dto/update-sale.dto';
import { ISaleService } from '@modules/sale/domain/service/ISale.service';
import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { Sale } from '@entities/Sale';

@Controller()
export class SaleController {
  constructor(private readonly service: ISaleService) {}

  @MessagePattern('sale:create')
  async create(@Payload() data: CreateSaleDTO): Promise<Sale> {
    return await this.service.create(data);
  }

  @MessagePattern('sale:update')
  async update(
    @Payload() payload: { id: string; data: UpdateSaleDTO },
  ): Promise<Sale> {
    return await this.service.update(payload.id, payload.data);
  }

  @MessagePattern('sale:delete')
  async delete(@Payload(ParseUUIDPipe) id: string): Promise<void> {
    await this.service.delete(id);
  }

  @MessagePattern('sale:findById')
  async findById(@Payload(ParseUUIDPipe) id: string): Promise<Sale> {
    return await this.service.findById(id);
  }

  @MessagePattern('sale:findAll')
  async findAll(
    @Payload() filters: FilterSalesDTO,
  ): Promise<IPaginatedResult<Sale>> {
    return await this.service.findAll(filters);
  }
}
