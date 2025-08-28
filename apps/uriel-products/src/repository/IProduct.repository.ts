import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { Product } from '@entities/Product';
import { CreateProductDTO } from '@modules/products/domain/dto/product/create-product.dto';
import { ProductFiltersDTO } from '@modules/products/domain/dto/product/product-filters.dto';
import { UpdateProductDTO } from '@modules/products/domain/dto/product/update-product.dto';

export abstract class IProductRepository {
  abstract create(data: CreateProductDTO): Promise<Product>;
  abstract update(id: string, data: UpdateProductDTO): Promise<Product>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Product | null>;
  abstract findAll(
    filters: ProductFiltersDTO,
  ): Promise<IPaginatedResult<Product>>;
}
