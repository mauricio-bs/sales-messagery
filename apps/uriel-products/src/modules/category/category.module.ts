import { Module } from '@nestjs/common';
import { CategoryController } from './infra/amqp/controller/category.controller';
import { ICategoryService } from './domain/service/ICategory.service';
import { CategoryService } from './service/category.service';
import { ICategoryRepository } from '@repository/ICategory.reposiory';
import { CategoryRepository } from '@repository/implements/postgres/Category.respository';
import { PrismaService } from '@common/database/prisma/prisma.service';

@Module({
  controllers: [CategoryController],
  providers: [
    PrismaService,
    { provide: ICategoryService, useClass: CategoryService },
    { provide: ICategoryRepository, useClass: CategoryRepository },
  ],
})
export class CategoryModule {}
