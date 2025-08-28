import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { Category } from '@entities/Category';
import { CategoryFiltersDTO } from '@modules/category/domain/dto/category-filters.dto';
import { CreateCategoryDTO } from '@modules/category/domain/dto/create-category.dto';
import { UpdateCategoryDTO } from '@modules/category/domain/dto/update-category.dto';

export abstract class ICategoryRepository {
  abstract create(data: CreateCategoryDTO): Promise<Category>;
  abstract update(id: string, data: UpdateCategoryDTO): Promise<Category>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<Category | null>;
  abstract findAll(
    filters: CategoryFiltersDTO,
  ): Promise<IPaginatedResult<Category>>;
}
