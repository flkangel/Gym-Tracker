import '@/styles/index.css';

import { QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from '@tanstack/react-router';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { EnvError } from '@/components/env-error';
import { envResult } from '@/lib/env';
import { queryClient } from '@/lib/query-client';
import { router } from '@/router';

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Missing #root element');

createRoot(rootElement).render(
  <StrictMode>
    {envResult.ok ? (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    ) : (
      <EnvError missing={envResult.missing} />
    )}
  </StrictMode>,
);
