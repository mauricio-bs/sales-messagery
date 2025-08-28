import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'local']),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['verbose', 'info', 'warning', 'error']).default('verbose'),
  // DATABASE
  DATABASE_URL: z.string(),
  // RATE LIMIT
  RATELIMIT_TTL: z.coerce.number().default(1000),
  RATELIMIT_LIMIT: z.coerce.number().default(1),
  // CACHE
  CACHE_REDIS_URL: z.string(),
  CACHE_TTL: z.coerce.number().default(60),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(env: unknown): Env {
  return envSchema.parse(env);
}
