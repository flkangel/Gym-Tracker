import { describe, expect, it } from 'vitest';

import { parseEnv } from '@/lib/env';

const valid = {
  VITE_SUPABASE_URL: 'https://abcdefghijklmnop.supabase.co',
  VITE_SUPABASE_PUBLISHABLE_KEY: 'sb_publishable_test',
};

describe('parseEnv', () => {
  it('accepts a complete environment', () => {
    expect(parseEnv(valid)).toEqual({ ok: true, env: valid });
  });

  it('lists every missing variable', () => {
    expect(parseEnv({})).toEqual({
      ok: false,
      missing: ['VITE_SUPABASE_URL', 'VITE_SUPABASE_PUBLISHABLE_KEY'],
    });
  });

  it('rejects a URL that is not http(s)', () => {
    expect(parseEnv({ ...valid, VITE_SUPABASE_URL: 'ftp://example.com' })).toEqual({
      ok: false,
      missing: ['VITE_SUPABASE_URL'],
    });
  });

  it('rejects an empty key', () => {
    expect(parseEnv({ ...valid, VITE_SUPABASE_PUBLISHABLE_KEY: '' })).toMatchObject({ ok: false });
  });
});
