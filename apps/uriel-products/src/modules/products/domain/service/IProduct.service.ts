import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { Product } from '@entities/Product';

import { CreateProductDTO } from '../dto/create-product.dto';
import { ProductFiltersDTO } from '../dto/product-filters.dto';
import { UpdateProductDTO } from '../dto/update-product.dto';
import { UpdateProductStockDTO } from '../dto/update-product-stock.dto';

export abstract class IProductService {
  abstract create(data: CreateProductDTO): Promise<Product>;
  abstract update(id: string, data: UpdateProductDTO): Promise<Product>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Product | null>;
  abstract findAll(
    filters: ProductFiltersDTO,
  ): Promise<IPaginatedResult<Product>>;
  abstract updateStock(data: UpdateProductStockDTO): Promise<void>;
}
