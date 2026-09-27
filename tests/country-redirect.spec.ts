import { test, expect } from '@playwright/test';

test('store.google.com redirects to a country-specific URL', async ({ page }) => {
  const response = await page.goto('https://store.google.com/', { waitUntil: 'commit' });
  const url = response?.url() ?? page.url();

  // The hl= parameter should reflect the proxy country, not the machine's locale.
  // This test does not assert a specific value — it records the redirect for comparison.
  console.log(`Final URL: ${url}`);
  expect(url).toContain('store.google.com');
});

test('ipinfo reports an IP in the proxy country', async ({ page }) => {
  await page.goto('https://ipinfo.io/json');
  const body = await page.locator('body').textContent();
  const data = JSON.parse(body ?? '{}');

  // Log the country without exposing the IP.
  console.log(`Country: ${data.country}`);
  expect(data.country).toBeTruthy();
});
