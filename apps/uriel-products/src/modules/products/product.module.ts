import { Module } from '@nestjs/common';
import { ProductController } from './infra/amqp/controller/product.controller';
import { PrismaService } from '@common/database/prisma/prisma.service';
import { IProductService } from './domain/service/IProduct.service';
import { ProductService } from './service/product.service';
import { IProductRepository } from '@repository/IProduct.repository';
import { ProductRepository } from '@repository/implements/postgres/Product.repository';
import { ICategoryRepository } from '@repository/ICategory.reposiory';
import { CategoryRepository } from '@repository/implements/postgres/Category.respository';

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
