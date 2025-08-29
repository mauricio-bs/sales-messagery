import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { CreateUserDTO } from '@modules/user/domain/dto/create-user.dto';
import { FilterUsersDTO } from '@modules/user/domain/dto/filter-users.dto';
import { SigninUserDTO } from '@modules/user/domain/dto/signin-user.dto';
import { UpdateUserDTo } from '@modules/user/domain/dto/update-user.dto';
import { IUserService } from '@modules/user/domain/service/IUser.service';
import { IPaginatedResult } from '@common/interfaces/IPaginatedResult';
import { User } from '@entities/User';

@Controller()
export class UserController {
  constructor(private readonly service: IUserService) {}

  @MessagePattern('user:create')
  async create(@Payload() data: CreateUserDTO): Promise<User> {
    return await this.service.create(data);
  }

  @MessagePattern('user:update')
  async update(
    @Payload() payload: { id: string; data: UpdateUserDTo },
  ): Promise<User> {
    return await this.service.update(payload.id, payload.data);
  }

  @MessagePattern('user:delete')
  async delete(@Payload() id: string): Promise<void> {
    return await this.service.delete(id);
  }

  @MessagePattern('user:findById')
  async findById(@Payload() id: string): Promise<User> {
    return await this.service.findById(id);
  }

  @MessagePattern('user:findAll')
  async findAll(
    @Payload() filters: FilterUsersDTO,
  ): Promise<IPaginatedResult<User>> {
    return await this.service.findAll(filters);
  }

  @MessagePattern('user:signin')
  async signin(@Payload() data: SigninUserDTO): Promise<boolean> {
    return await this.service.signin(data);
  }
}
