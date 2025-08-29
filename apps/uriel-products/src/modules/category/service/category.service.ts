import { Injectable, NotFoundException } from '@nestjs/common';

import { ICategoryRepository } from '@repository/ICategory.reposiory';
import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { Category } from '@entities/Category';

import { CategoryFiltersDTO } from '../domain/dto/category-filters.dto';
import { CreateCategoryDTO } from '../domain/dto/create-category.dto';
import { UpdateCategoryDTO } from '../domain/dto/update-category.dto';
import { ICategoryService } from '../domain/service/ICategory.service';

@Injectable()
export class CategoryService implements ICategoryService {
  constructor(private repository: ICategoryRepository) {}

  async create(data: CreateCategoryDTO): Promise<Category> {
    return await this.repository.create(data);
  }

  async update(id: string, data: UpdateCategoryDTO): Promise<Category> {
    const category = await this.repository.findById(id);
    if (!category) throw new NotFoundException('Category not found');

    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async findById(id: string): Promise<Category | null> {
    const category = await this.repository.findById(id);
    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  async findAll(
    filters: CategoryFiltersDTO,
  ): Promise<IPaginatedResult<Category>> {
    return await this.repository.findAll(filters);
  }
}
