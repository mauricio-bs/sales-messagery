import { Injectable } from '@nestjs/common';

import { PrismaService } from '@common/database/prisma/prisma.service';
import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { User } from '@entities/User';
import { CreateUserDTO } from '@modules/user/domain/dto/create-user.dto';
import { FilterUsersDTO } from '@modules/user/domain/dto/filter-users.dto';
import { UpdateUserDTo } from '@modules/user/domain/dto/update-user.dto';
import { IUserRepository } from '@repository/IUser.repository';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO): Promise<User> {
    return await this.prisma.user.create({ data });
  }

  async update(id: string, data: UpdateUserDTo): Promise<User> {
    return await this.prisma.user.update({ where: { id }, data });
  }

  async delete(id: string): Promise<void> {
    return await this.prisma.user.delete({ where: { id } });
  }

  async findById(id: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findUnique({ where: { id } });
  }

  async findAll({
    page,
    limit,
    ...filters
  }: FilterUsersDTO): Promise<IPaginatedResult<User>> {
    const where: Prisma.UserWhereInput = {};

    if (filters.name)
      where.name = { contains: filters.name, case: 'insensitive' };

    if (filters.email)
      where.email = { contains: filters.email, case: 'insensitive' };

    if (typeof filters.isActive === 'boolean')
      where.isActive = filters.isActive;

    if (filters.role) where.role = filters.role;

    const [total, data] = await this.prisma.$transaction([
      this.prisma.user.count({ where }),
      this.prisma.user.findMany({
        where,
        take: limit,
        skip: (page - 1) * limit,
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return { total, data, page, totalPages: total / limit };
  }
}
