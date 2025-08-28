import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';

import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { PrismaService } from '@common/database/prisma/prisma.service';
import { Category } from '@entities/Category';
import { CategoryFiltersDTO } from '@modules/category/domain/dto/category-filters.dto';
import { CreateCategoryDTO } from '@modules/category/domain/dto/create-category.dto';
import { UpdateCategoryDTO } from '@modules/category/domain/dto/update-category.dto';
import { ICategoryRepository } from '@repository/ICategory.reposiory';

@Injectable()
export class CategoryRepository implements ICategoryRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateCategoryDTO): Promise<Category> {
    return await this.prisma.category.create({ data });
  }

  async update(id: string, data: UpdateCategoryDTO): Promise<Category> {
    return await this.prisma.category.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.category.delete({ where: { id } });
  }

  async findById(id: string): Promise<Category | null> {
    return await this.prisma.category.findUnique({ where: { id } });
  }

  async findAll({
    page,
    limit,
    ...filters
  }: CategoryFiltersDTO): Promise<IPaginatedResult<Category>> {
    const where: Prisma.CategoryWhereInput = {};

    if (filters.name)
      where.name = { contains: filters.name, mode: 'insensitive' };

    if (typeof filters.isActive === 'boolean')
      where.isActive = filters.isActive;

    const [total, data] = await this.prisma.$transaction([
      this.prisma.category.count({ where }),
      this.prisma.category.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { data, total, page, totalPages: Math.ceil(total / limit) };
  }
}
