import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { EnvError } from '@/components/env-error';

describe('EnvError', () => {
  it('names each missing variable', () => {
    render(<EnvError missing={['VITE_SUPABASE_URL', 'VITE_SUPABASE_PUBLISHABLE_KEY']} />);

    expect(screen.getByRole('heading', { name: 'Falta configuración' })).toBeInTheDocument();
    expect(screen.getByText('VITE_SUPABASE_URL')).toBeInTheDocument();
    expect(screen.getByText('VITE_SUPABASE_PUBLISHABLE_KEY')).toBeInTheDocument();
  });
});
