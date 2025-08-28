import { PrismaService } from '@common/database/prisma/prisma.service';
import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { Product } from '@entities/Product';
import { CreateProductDTO } from '@modules/products/domain/dto/product/create-product.dto';
import { ProductFiltersDTO } from '@modules/products/domain/dto/product/product-filters.dto';
import { UpdateProductDTO } from '@modules/products/domain/dto/product/update-product.dto';
import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IProductRepository } from '@root/repository/IProduct.repository';

@Injectable()
export class ProductRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateProductDTO): Promise<Product> {
    return await this.prisma.product.create({ data });
  }

  async update(id: string, data: UpdateProductDTO): Promise<Product> {
    return await this.prisma.product.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({ where: { id } });
  }

  async findById(id: string): Promise<Product | null> {
    return await this.prisma.product.findUnique({ where: { id } });
  }

  async findAll({
    page,
    limit,
    ...filters
  }: ProductFiltersDTO): Promise<IPaginatedResult<Product>> {
    const where: Prisma.ProductWhereInput = {};

    if (filters.name)
      where.name = { contains: filters.name, mode: 'insensitive' };

    if (typeof filters.isActive === 'boolean')
      where.isActive = filters.isActive;

    if (filters.categoryId) where.categoryId = filters.categoryId;

    if (filters.minPrice || filters.maxPrice) {
      where.price = {
        ...(filters.minPrice && { gte: filters.minPrice }),
        ...(filters.maxPrice && { lte: filters.maxPrice }),
      };
    }

    if (filters.minQuantity || filters.maxQuantity) {
      where.quantity = {
        ...(filters.minQuantity && { gte: filters.minQuantity }),
        ...(filters.maxQuantity && { lte: filters.maxQuantity }),
      };
    }

    const [total, data] = await this.prisma.$transaction([
      this.prisma.product.count({ where }),
      this.prisma.product.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { total, data, page, totalPages: Math.ceil(total / limit) };
  }
}
