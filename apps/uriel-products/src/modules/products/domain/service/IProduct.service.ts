import { Product } from '@entities/Product';
import { CreateProductDTO } from '../dto/product/create-product.dto';
import { UpdateProductDTO } from '../dto/product/update-product.dto';
import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { ProductFiltersDTO } from '../dto/product/product-filters.dto';

export abstract class IProductService {
  abstract create(data: CreateProductDTO): Promise<Product>;
  abstract update(id: string, data: UpdateProductDTO): Promise<Product>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Product | null>;
  abstract findAll(
    filters: ProductFiltersDTO,
  ): Promise<IPaginatedResult<Product>>;
}
