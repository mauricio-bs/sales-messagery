import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { Category } from '@entities/Category';
import { CreateCategoryDTO } from '@modules/category/domain/dto/create-category.dto';
import { UpdateCategoryDTO } from '@modules/category/domain/dto/update-category.dto';
import { ICategoryService } from '@modules/category/domain/service/ICategory.service';
import { CategoryFiltersDTO } from '@modules/category/domain/dto/category-filters.dto';

@Controller()
export class CategoryController {
  constructor(private readonly service: ICategoryService) {}

  @MessagePattern('category.create')
  async create(@Payload() data: CreateCategoryDTO): Promise<Category> {
    return await this.service.create(data);
  }

  @MessagePattern('category.update')
  async update(
    @Payload() payload: { id: string; data: UpdateCategoryDTO },
  ): Promise<Category> {
    return await this.service.update(payload.id, payload.data);
  }

  @MessagePattern('category.delete')
  async delete(@Payload() id: string): Promise<void> {
    return await this.service.delete(id);
  }

  @MessagePattern('category.findOne')
  async findOne(@Payload() id: string): Promise<Category | null> {
    return await this.service.findById(id);
  }

  @MessagePattern('category.findAll')
  async findAll(
    @Payload() filters: CategoryFiltersDTO,
  ): Promise<IPaginatedResult<Category>> {
    return await this.service.findAll(filters);
  }
}
