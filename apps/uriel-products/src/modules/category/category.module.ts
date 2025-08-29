import { Module } from '@nestjs/common';

import { ICategoryRepository } from '@repository/ICategory.reposiory';
import { CategoryRepository } from '@repository/implements/postgres/Category.respository';
import { PrismaService } from '@common/database/prisma/prisma.service';

import { ICategoryService } from './domain/service/ICategory.service';
import { CategoryController } from './infra/amqp/controller/category.controller';
import { CategoryService } from './service/category.service';

@Module({
  controllers: [CategoryController],
  providers: [
    PrismaService,
    { provide: ICategoryService, useClass: CategoryService },
    { provide: ICategoryRepository, useClass: CategoryRepository },
  ],
})
export class CategoryModule {}
