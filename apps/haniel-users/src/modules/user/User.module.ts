import { Module } from '@nestjs/common';

import { UserRepository } from '@repository/implements/User.repository';
import { IUserRepository } from '@repository/IUser.repository';
import { PrismaService } from '@common/database/prisma/prisma.service';

import { IUserService } from './domain/service/IUser.service';
import { UserController } from './infra/amqp/controller/user.controller';
import { UserService } from './service/user.service';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    { provide: IUserService, useClass: UserService },
    { provide: IUserRepository, useClass: UserRepository },
  ],
})
export class UserModule {}
