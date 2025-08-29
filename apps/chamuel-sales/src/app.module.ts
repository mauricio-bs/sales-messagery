import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { IndexModule } from '@modules/index.module';
import { DatabaseModule } from '@common/database/database.module';
import { RmqCacheInterceptor } from '@interceptor/http-cache.interceptor';
import { ConfigurationsModule } from '@config/configurations.module';

@Module({
  imports: [IndexModule, DatabaseModule, ConfigurationsModule],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_INTERCEPTOR, useClass: RmqCacheInterceptor },
  ],
})
export class AppModule {}
