import { ConfigService } from '@nestjs/config';
import { Env } from '../env/validate-env';
import { CacheModuleOptions } from '@nestjs/cache-manager';
import { ioRedisStore } from '@tirke/node-cache-manager-ioredis';

export function cacheConfigFactory(
  configService: ConfigService<Env>,
): CacheModuleOptions {
  const url = new URL(configService.getOrThrow('CACHE_REDIS_URL'));

  return {
    store: ioRedisStore,
    host: url.hostname,
    port: Number(url.port),
    password: url.password,
    db: Number(url.pathname.split('/')[1]),
    ttl: configService.get('CACHE_TTL'),
  };
}
