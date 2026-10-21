import { z } from 'zod';

/**
 * Client-side environment. Only `VITE_*` variables reach the bundle, and every
 * one of them is public: never put a secret (service-role key, DB password,
 * access token) behind a `VITE_` prefix.
 */
const envSchema = z.object({
  VITE_SUPABASE_URL: z.url({ protocol: /^https?$/ }),
  VITE_SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;

export type EnvResult = { ok: true; env: Env } | { ok: false; missing: string[] };

export function parseEnv(source: Record<string, unknown>): EnvResult {
  const result = envSchema.safeParse(source);
  if (result.success) return { ok: true, env: result.data };
  return {
    ok: false,
    missing: [...new Set(result.error.issues.map((issue) => issue.path.join('.')))],
  };
}

export const envResult = parseEnv(import.meta.env);
