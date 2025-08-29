import z from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['production', 'development', 'local']),
  PORT: z.coerce.number().default(3000),
  LOG_LEVEL: z.enum(['verbose', 'info', 'warning', 'error']).default('verbose'),
  RABBITMQ_URL: z.url(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string(),
});

export type Env = z.infer<typeof envSchema>;

export function validateEnv(env: unknown): Env {
  return envSchema.parse(env);
}
