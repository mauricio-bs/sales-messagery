import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { User } from '@entities/User';

import { CreateUserDTO } from '../dto/create-user.dto';
import { FilterUsersDTO } from '../dto/filter-users.dto';
import { SigninUserDTO } from '../dto/signin-user.dto';
import { UpdateUserDTo } from '../dto/update-user.dto';

export abstract class IUserService {
  abstract create(data: CreateUserDTO): Promise<User>;
  abstract update(id: string, data: UpdateUserDTo): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
  abstract findAll(filters: FilterUsersDTO): Promise<IPaginatedResult<User>>;
  abstract signin(data: SigninUserDTO): Promise<boolean>;
}
