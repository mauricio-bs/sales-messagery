import { Module } from '@nestjs/common';

import { ICategoryRepository } from '@repository/ICategory.reposiory';
import { CategoryRepository } from '@repository/implements/postgres/Category.respository';
import { ProductRepository } from '@repository/implements/postgres/Product.repository';
import { IProductRepository } from '@repository/IProduct.repository';
import { PrismaService } from '@common/database/prisma/prisma.service';

import { IProductService } from './domain/service/IProduct.service';
import { ProductController } from './infra/amqp/controller/product.controller';
import { ProductService } from './service/product.service';

@Module({
  controllers: [ProductController],
  providers: [
    PrismaService,
    { provide: IProductService, useClass: ProductService },
    { provide: IProductRepository, useClass: ProductRepository },
    { provide: ICategoryRepository, useClass: CategoryRepository },
  ],
})
export class ProductModule {}
