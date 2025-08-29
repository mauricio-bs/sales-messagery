import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrometheusModule } from '@willsoto/nestjs-prometheus';
import { WinstonModule } from 'nest-winston';

import { validateEnv } from './env/validate-env';
import { loggerOptions } from './log/logger.config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validate: validateEnv }),
    WinstonModule.forRoot(loggerOptions),
    // Monitoring
    PrometheusModule.register({
      defaultMetrics: { enabled: true },
      path: '/api/metrics',
    }),
  ],
  providers: [],
})
export class ConfigurationsModule {}
