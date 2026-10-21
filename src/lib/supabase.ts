import { createClient, type SupabaseClient } from '@supabase/supabase-js';

import type { Env } from '@/lib/env';

let client: SupabaseClient | undefined;

/** Lazily creates the browser client; call only after the env was validated. */
export function getSupabase(env: Env): SupabaseClient {
  client ??= createClient(env.VITE_SUPABASE_URL, env.VITE_SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
  });
  return client;
}
