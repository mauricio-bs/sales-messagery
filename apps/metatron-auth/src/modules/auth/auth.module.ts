import { Module } from '@nestjs/common';

import { MessagingModule } from '../messaging/messaging.module';
import { IAuthService } from './domain/service/IAuth.service';
import { AuthService } from './service/auth.service';

@Module({
  imports: [MessagingModule],
  controllers: [],
  providers: [{ provide: IAuthService, useClass: AuthService }],
})
export class AuthModule {}
