import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { User } from '@entities/User';
import { CreateUserDTO } from '@modules/user/domain/dto/create-user.dto';
import { FilterUsersDTO } from '@modules/user/domain/dto/filter-users.dto';
import { UpdateUserDTo } from '@modules/user/domain/dto/update-user.dto';

export abstract class IUserRepository {
  abstract create(data: CreateUserDTO): Promise<User>;
  abstract update(id: string, data: UpdateUserDTo): Promise<User>;
  abstract delete(id: string): Promise<void>;
  abstract findById(id: string): Promise<User | null>;
  abstract findByEmail(email: string): Promise<User | null>;
  abstract findAll(filters: FilterUsersDTO): Promise<IPaginatedResult<User>>;
}
