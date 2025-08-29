import { Module } from '@nestjs/common';

import { UserModule } from './user/User.module';

@Module({
  imports: [UserModule],
})
export class IndexModule {}
