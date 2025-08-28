import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';

import { PrismaService } from '@common/database/prisma/prisma.service';
import { Role } from '@common/enum/role.enum';
import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { User } from '@entities/User';
import { CreateUserDTO } from '@modules/user/domain/dto/create-user.dto';
import { FilterUsersDTO } from '@modules/user/domain/dto/filter-users.dto';
import { UpdateUserDTo } from '@modules/user/domain/dto/update-user.dto';
import { IUserRepository } from '@repository/IUser.repository';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateUserDTO): Promise<User> {
    const user = await this.prisma.user.create({ data });
    return {
      ...user,
      role: Role[user.role],
    };
  }

  async update(id: string, data: UpdateUserDTo): Promise<User> {
    const user = await this.prisma.user.update({ where: { id }, data });
    return { ...user, role: Role[user.role] };
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    return { ...user, role: Role[user.role] };
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({ where: { email } });
    return { ...user, role: Role[user.role] };
  }

  async findAll({
    page,
    limit,
    ...filters
  }: FilterUsersDTO): Promise<IPaginatedResult<User>> {
    const where: Prisma.UserWhereInput = {};

    if (filters.name)
      where.name = { contains: filters.name, mode: 'insensitive' };

    if (filters.email)
      where.email = { contains: filters.email, mode: 'insensitive' };

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

    const mappedData = data.map((user) => ({
      ...user,
      role: Role[user.role],
    }));

    return { total, data: mappedData, page, totalPages: total / limit };
  }
}
