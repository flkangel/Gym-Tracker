import { expect, test } from '@playwright/test';

test('the app shell renders', async ({ page }) => {
  await page.goto('/');
  // With real env vars the home page shows; without them, the config error screen does.
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
});

test('the web app manifest is served', async ({ request }) => {
  const response = await request.get('/manifest.webmanifest');
  expect(response.ok()).toBe(true);
  expect(await response.json()).toMatchObject({ display: 'standalone', lang: 'es-UY' });
});
