import { Category } from '@entities/Category';
import { IsOptional, IsString } from 'class-validator';

export class CreateCategoryDTO
  implements Omit<Category, 'isActive' | 'createdAt' | 'updatedAt'>
{
  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;
}
