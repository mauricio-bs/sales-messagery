import { CACHE_KEY_METADATA, CacheInterceptor } from '@nestjs/cache-manager';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { RmqContext } from '@nestjs/microservices';
import { RedisCache } from '@tirke/node-cache-manager-ioredis';

@Injectable()
export class RmqCacheInterceptor extends CacheInterceptor {
  protected cacheManager: RedisCache;

  protected trackBy(context: ExecutionContext): string | undefined {
    let cacheMetadata = this.reflector.getAllAndOverride<string>(
      CACHE_KEY_METADATA,
      [context.getClass(), context.getHandler()],
    );

    if (context.getType() !== 'rcp') return cacheMetadata;

    const rmqContext = context.switchToRpc().getContext<RmqContext>();
    const data = context.switchToRpc().getData();

    if (!rmqContext || !data) return undefined;

    const channel = rmqContext.getChannelRef();
    const message = rmqContext.getMessage();

    const user: IUserInfo = data.user;
    const pattern = rmqContext.getPattern();

    cacheMetadata = cacheMetadata?.concat(':') ?? '';

    return `${this.getUserKey(user)}:${cacheMetadata}${pattern}`;
  }

  private getUserKey(user: IUserInfo): string {
    if (!user) return 'users:anonymus';

    return `users:${user.id}`;
  }
}
