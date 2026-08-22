import { defineConfig } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4327/seaofcats/';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  outputDir: './node_modules/.cache/playwright-results',
  use: {
    baseURL,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'desktop-1920x1080',
      use: { viewport: { width: 1920, height: 1080 } },
    },
    {
      name: 'desktop-1672x941',
      use: { viewport: { width: 1672, height: 941 } },
    },
    {
      name: 'desktop-1440x900',
      use: { viewport: { width: 1440, height: 900 } },
    },
    {
      name: 'tablet-1024x768',
      use: { viewport: { width: 1024, height: 768 } },
    },
    {
      name: 'mobile-390x844',
      use: { viewport: { width: 390, height: 844 } },
    },
    {
      name: 'mobile-320x568',
      use: { viewport: { width: 320, height: 568 } },
    },
  ],
  webServer: {
    command: 'npm run build && npm run preview',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
