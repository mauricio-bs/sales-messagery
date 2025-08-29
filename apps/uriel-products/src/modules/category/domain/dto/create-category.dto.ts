import { IsOptional, IsString } from 'class-validator';

import { Category } from '@entities/Category';

export class CreateCategoryDTO
  implements Omit<Category, 'isActive' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
