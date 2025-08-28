import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { User } from '@entities/User';
import { IUserRepository } from '@repository/IUser.repository';
import { CreateUserDTO } from '../domain/dto/create-user.dto';
import { FilterUsersDTO } from '../domain/dto/filter-users.dto';
import { UpdateUserDTo } from '../domain/dto/update-user.dto';
import { IUserService } from '../domain/service/IUser.service';
import { compareHash } from '@common/utils/hash-utils';
import { SigninUserDTO } from '../domain/dto/signin-user.dto';

@Injectable()
export class UserService implements IUserService {
  constructor(private repository: IUserRepository) {}

  async create(data: CreateUserDTO): Promise<User> {
    const emailRegistered = await this.repository.findByEmail(data.email);
    if (emailRegistered)
      throw new ConflictException('Email already registered');

    return await this.repository.create(data);
  }

  async update(id: string, data: UpdateUserDTo): Promise<User> {
    const user = await this.repository.findById(id);
    if (!user) throw new NotFoundException('User not found');

    return await this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    const user = await this.repository.findById(id);
    if (!user) throw new NotFoundException('User not found');

    await this.repository.delete(id);
  }

  async findById(id: string): Promise<User | null> {
    const user = await this.repository.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findAll(filters: FilterUsersDTO): Promise<IPaginatedResult<User>> {
    return await this.repository.findAll(filters);
  }

  async signin(data: SigninUserDTO): Promise<boolean> {
    const user = await this.repository.findByEmail(data.email);

    if (!user || !user.isActive || !compareHash(data.password, user.password))
      return false;

    return true;
  }
}
