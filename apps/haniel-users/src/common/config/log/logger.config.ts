import { PrometheusTransport } from '@matsumana/winston-transport-prometheus';
import { WinstonModuleOptions } from 'nest-winston';
import * as winston from 'winston';

export const loggerOptions: WinstonModuleOptions = {
  levels: winston.config.npm.levels,
  level: process.env.LOG_LEVEL || 'verbose',
  exitOnError: false,
  handleRejections: true,
  handleExceptions: true,
  format: winston.format.simple(),
  transports: [new winston.transports.Console(), new PrometheusTransport()],
};
