import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { Product } from '@entities/Product';
import { CreateProductDTO } from '@modules/products/domain/dto/create-product.dto';
import { ProductFiltersDTO } from '@modules/products/domain/dto/product-filters.dto';
import { UpdateProductDTO } from '@modules/products/domain/dto/update-product.dto';
import { UpdateProductStockDTO } from '@modules/products/domain/dto/update-product-stock.dto';
import { IProductService } from '@modules/products/domain/service/IProduct.service';

@Controller()
export class ProductController {
  constructor(private readonly service: IProductService) {}

  @MessagePattern('product.create')
  async create(@Payload() data: CreateProductDTO): Promise<Product> {
    return await this.service.create(data);
  }

  @MessagePattern('product.update')
  async update(
    @Payload() payload: { id: string; data: UpdateProductDTO },
  ): Promise<Product> {
    return await this.service.update(payload.id, payload.data);
  }

  @MessagePattern('product.delete')
  async delete(@Payload() id: string): Promise<void> {
    return await this.service.delete(id);
  }

  @MessagePattern('product.findOne')
  async findOne(@Payload() id: string): Promise<Product | null> {
    return await this.service.findById(id);
  }

  @MessagePattern('product.findAll')
  async findAll(
    @Payload() filters: ProductFiltersDTO,
  ): Promise<IPaginatedResult<Product>> {
    return await this.service.findAll(filters);
  }

  @MessagePattern('product.stock.update')
  async updateStock(@Payload() data: UpdateProductStockDTO): Promise<void> {
    return await this.service.updateStock(data);
  }
}
