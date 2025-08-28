import { Module } from '@nestjs/common';
import { ConfigurationsModule } from './common/config/configurations.module';
import { DatabaseModule } from './common/database/database.module';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { IndexModule } from '@modules/index.module';
import { RmqCacheInterceptor } from '@interceptor/http-cache.interceptor';

@Module({
  imports: [IndexModule, ConfigurationsModule, DatabaseModule],
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_INTERCEPTOR, useClass: RmqCacheInterceptor },
  ],
})
export class AppModule {}
