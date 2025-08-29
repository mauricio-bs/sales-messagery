import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { Category } from '@entities/Category';

import { CategoryFiltersDTO } from '../../../category/domain/dto/category-filters.dto';
import { CreateCategoryDTO } from '../../../category/domain/dto/create-category.dto';
import { UpdateCategoryDTO } from '../../../category/domain/dto/update-category.dto';

export abstract class ICategoryService {
  abstract create(data: CreateCategoryDTO): Promise<Category>;
  abstract update(id: string, data: UpdateCategoryDTO): Promise<Category>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Category | null>;
  abstract findAll(
    filters: CategoryFiltersDTO,
  ): Promise<IPaginatedResult<Category>>;
}
