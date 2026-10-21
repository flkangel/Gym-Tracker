import { defineConfig, devices } from '@playwright/test';

const PORT = 4173;
const isCI = !!process.env.CI;

/**
 * E2E runs the production build (service worker included) on WebKit with an
 * iPhone viewport, the closest thing to Safari on iOS available on Linux.
 */
export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  reporter: isCI ? [['github'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: 'retain-on-failure',
    locale: 'es-UY',
  },
  projects: [{ name: 'iphone-webkit', use: { ...devices['iPhone 15'] } }],
  webServer: {
    command: 'pnpm build && pnpm preview',
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
});
