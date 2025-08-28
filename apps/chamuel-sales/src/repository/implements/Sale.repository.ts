import { PrismaService } from '@common/database/prisma/prisma.service';
import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { Sale } from '@entities/Sale';
import { CreateSaleDTO } from '@modules/sale/domain/dto/create-sale.dto';
import { FilterSalesDTO } from '@modules/sale/domain/dto/filter-sales.dto';
import { UpdateSaleDTO } from '@modules/sale/domain/dto/update-sale.dto';
import { Injectable } from '@nestjs/common';
import { ISaleRepository } from '@repository/ISaleRepository';
import { Prisma } from 'generated/prisma';

@Injectable()
export class SaleRepository implements ISaleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create({ items, ...data }: CreateSaleDTO): Promise<Sale> {
    return await this.prisma.sale.create({
      data: { ...data, items: { createMany: { data: items } } },
      include: { items: true },
    });
  }

  async update(id: string, { items, ...data }: UpdateSaleDTO): Promise<Sale> {
    return await this.prisma.sale.update({
      where: { id },
      data: { ...data, items: { deleteMany: {}, createMany: { data: items } } },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.sale.delete({ where: { id } });
  }

  async findById(id: string): Promise<Sale> {
    return await this.prisma.sale.findUnique({
      where: { id },
      include: { items: true },
    });
  }

  async findAll({
    page,
    limit,
    ...filters
  }: FilterSalesDTO): Promise<IPaginatedResult<Sale>> {
    const where: Prisma.SaleWhereInput = {};

    if (filters.status) where.status = filters.status;

    if (filters.from || filters.to) {
      where.createdAt = {
        ...(filters.from && { gte: filters.from }),
        ...(filters.to && { lte: filters.to }),
      };
    }

    const [total, data] = await this.prisma.$transaction([
      this.prisma.sale.count({ where }),
      this.prisma.sale.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { total, data, page, totalPages: total / limit };
  }
}
