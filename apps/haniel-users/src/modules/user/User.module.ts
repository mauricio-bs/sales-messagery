import { PrismaService } from '@common/database/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { IUserService } from './domain/service/IUser.service';
import { UserService } from './service/user.service';
import { IUserRepository } from '@repository/IUser.repository';
import { UserRepository } from '@repository/implements/User.repository';

@Module({
  controllers: [],
  providers: [
    PrismaService,
    { provide: IUserService, useClass: UserService },
    { provide: IUserRepository, useClass: UserRepository },
  ],
})
export class UserModule {}
