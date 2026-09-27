import { defineConfig } from '@playwright/test';

const proxyServer = process.env.HTTP_PROXY;

if (!proxyServer) {
  throw new Error(
    'HTTP_PROXY is not set — run this suite inside shellroute, e.g. shellroute run DE -- npx playwright test',
  );
}

export default defineConfig({
  use: { proxy: { server: proxyServer } },
});
