import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';

import { RmqCacheInterceptor } from '@interceptor/http-cache.interceptor';
import { DatabaseModule } from '@common/database/database.module';
import { ConfigurationsModule } from '@config/configurations.module';
import { IndexModule } from '@modules/Index.module';

@Module({
  imports: [IndexModule, ConfigurationsModule, DatabaseModule],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_INTERCEPTOR, useClass: RmqCacheInterceptor },
  ],
})
export class AppModule {}
