import { Injectable, NotFoundException } from '@nestjs/common';
import { IProductRepository } from '@repository/IProduct.repository';
import { IProductService } from '../domain/service/IProduct.service';
import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { Product } from '@entities/Product';
import { CreateProductDTO } from '../domain/dto/create-product.dto';
import { ProductFiltersDTO } from '../domain/dto/product-filters.dto';
import { UpdateProductDTO } from '../domain/dto/update-product.dto';
import { ICategoryRepository } from '@repository/ICategory.reposiory';
import { UpdateProductStockDTO } from '../domain/dto/update-product-stock.dto';

@Injectable()
export class ProductService implements IProductService {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async create(data: CreateProductDTO): Promise<Product> {
    if (data.categoryId) {
      const category = await this.categoryRepository.findById(data.categoryId);
      if (!category) throw new NotFoundException('Category not found');
    }

    return await this.productRepository.create(data);
  }

  async update(id: string, data: UpdateProductDTO): Promise<Product> {
    const product = this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Product not found');

    return await this.productRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const product = this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Product not found');

    await this.productRepository.delete(id);
  }

  async findById(id: string): Promise<Product | null> {
    const product = await this.productRepository.findById(id);
    if (!product) throw new NotFoundException('Product not found');

    return product;
  }

  async findAll(
    filters: ProductFiltersDTO,
  ): Promise<IPaginatedResult<Product>> {
    return await this.productRepository.findAll(filters);
  }

  async updateStock(data: UpdateProductStockDTO): Promise<void> {
    await this.productRepository.updateStock(data);
  }
}
