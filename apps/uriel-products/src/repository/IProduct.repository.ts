import { CreateProductDTO } from '@modules/products/domain/dto/create-product.dto';
import { ProductFiltersDTO } from '@modules/products/domain/dto/product-filters.dto';
import { UpdateProductDTO } from '@modules/products/domain/dto/update-product.dto';
import { UpdateProductStockDTO } from '@modules/products/domain/dto/update-product-stock.dto';
import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { Product } from '@entities/Product';

export abstract class IProductRepository {
  abstract create(data: CreateProductDTO): Promise<Product>;
  abstract update(id: string, data: UpdateProductDTO): Promise<Product>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Product | null>;
  abstract findAll(
    filters: ProductFiltersDTO,
  ): Promise<IPaginatedResult<Product>>;
  abstract updateStock(data: UpdateProductStockDTO): Promise<void>;
}
