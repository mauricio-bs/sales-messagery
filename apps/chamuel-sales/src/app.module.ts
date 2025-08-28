import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { DatabaseModule } from '@common/database/database.module';
import { ConfigurationsModule } from '@config/configurations.module';
import { RmqCacheInterceptor } from '@interceptor/http-cache.interceptor';
import { IndexModule } from '@modules/index.module';

@Module({
  imports: [IndexModule, DatabaseModule, ConfigurationsModule],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_INTERCEPTOR, useClass: RmqCacheInterceptor },
  ],
})
export class AppModule {}
