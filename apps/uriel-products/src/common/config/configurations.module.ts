import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { seconds, ThrottlerModule } from '@nestjs/throttler';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { WinstonModule } from 'nest-winston';

import { cacheConfigFactory } from './cache/cache-config.factory';
import { Env, validateEnv } from './env/validate-env';
import { loggerOptions } from './log/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: cacheConfigFactory,
    }),
    WinstonModule.forRoot(loggerOptions),
    // Security
    ThrottlerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService<Env>) => [
        {
          ttl: seconds(configService.getOrThrow('RATELIMIT_TTL')),
          limit: configService.getOrThrow('RATELIMIT_LIMIT'),
        },
      ],
    }),
    // Monitoring
    PrometheusModule.register({
      defaultMetrics: { enabled: true },
      path: '/api/metrics',
    }),
  ],
  providers: [],
})
export class ConfigurationsModule {}
