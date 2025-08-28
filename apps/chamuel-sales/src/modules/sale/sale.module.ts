import { Module } from '@nestjs/common';

import { SaleController } from './infra/amqp/controller/sale.controller';
import { PrismaService } from '@common/database/prisma/prisma.service';
import { ISaleRepository } from '@repository/ISaleRepository';
import { SaleRepository } from '@repository/implements/Sale.repository';
import { ISaleService } from './domain/service/ISale.service';
import { SaleService } from './service/sale.service';

@Module({
  controllers: [SaleController],
  providers: [
    PrismaService,
    { provide: ISaleService, useClass: SaleService },
    { provide: ISaleRepository, useClass: SaleRepository },
  ],
})
export class SaleModule {}
