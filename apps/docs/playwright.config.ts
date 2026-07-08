import { defineConfig, devices } from '@playwright/test';
import { nxE2EPreset } from '@nx/playwright/preset';
import { workspaceRoot } from '@nx/devkit';
import { fileURLToPath } from 'node:url';

const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';
const configFile = fileURLToPath(import.meta.url);

export default defineConfig({
  ...nxE2EPreset(configFile, { testDir: './e2e' }),
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    command: 'pnpm run serve:docs',
    url: 'http://localhost:4200',
    reuseExistingServer: true,
    cwd: workspaceRoot,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});
