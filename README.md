# Playwright country-routing example

Playwright can emulate browser geolocation, locale, and timezone without changing the network route used by requests. This example shows how to make the network route explicit with a country proxy and fail closed when the proxy is missing.

## What this example demonstrates

In this workflow, Playwright browser traffic does not automatically use the proxy environment variables provided by `shellroute run`. The included `playwright.config.ts` reads `HTTP_PROXY`, passes it explicitly to `use.proxy.server`, and throws if the proxy is not available.

That prevents a geo-sensitive test from silently running on your normal connection.

## Requirements

- shellroute CLI with an active account
- Node.js 18+

## Setup

```bash
npm install
npx playwright install chromium
```

## Run through a country route

US:

```bash
shellroute run US -- npx playwright test
```

Germany:

```bash
shellroute run DE -- npx playwright test
```

Each command starts the test locally and routes Playwright browser traffic through the selected country proxy.

## Direct vs routed behavior

A direct run with this config is intentionally blocked:

```bash
npx playwright test
```

Without `HTTP_PROXY`, the config throws immediately instead of letting the test continue on the normal connection.

The routed form supplies the proxy environment to the child process:

```bash
shellroute run DE -- npx playwright test
```

## How it works

1. `shellroute run <country> -- <command>` sets `HTTP_PROXY` and `HTTPS_PROXY` for the child process.
2. `playwright.config.ts` reads `process.env.HTTP_PROXY`.
3. The config passes that value to `use.proxy.server`.
4. Playwright routes browser requests through that proxy.

The included tests check the country reported by [ipinfo.io](https://ipinfo.io/) and the redirect destination returned by [Google Store](https://store.google.com/). Third-party responses and geo-IP data can change, so treat those checks as verification signals rather than fixed expected values.

## Troubleshooting

**`HTTP_PROXY is not set`**

Run the suite inside `shellroute run`:

```bash
shellroute run DE -- npx playwright test
```

**Browser is not installed**

```bash
npx playwright install chromium
```

**The reported country does not match the selected route**

The selected proxy route and a site's geo-IP classification can come from different data sources. Record the mismatch rather than assuming either source is definitive.

For the browser-geolocation versus network-route distinction, see the [Playwright IP geolocation troubleshooting guide](https://shellroute.com/tools/playwright-ip-geolocation/).

For shellroute setup, see the [Quickstart](https://shellroute.com/docs/quickstart/).
