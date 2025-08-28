import { PrismaService } from '@common/database/prisma/prisma.service';
import { Module } from '@nestjs/common';

import { IUserRepository } from '@repository/IUser.repository';
import { UserRepository } from '@repository/implements/User.repository';
import { IUserService } from './domain/service/IUser.service';
import { UserService } from './service/user.service';
import { UserController } from './infra/amqp/controller/user.controller';

@Module({
  controllers: [UserController],
  providers: [
    PrismaService,
    { provide: IUserService, useClass: UserService },
    { provide: IUserRepository, useClass: UserRepository },
  ],
})
export class UserModule {}
