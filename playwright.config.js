import { defineConfig } from '@playwright/test';

const nodeEnv = globalThis.process?.env ?? {};
const baseURL = nodeEnv.PLAYWRIGHT_BASE_URL || 'http://localhost:4173';

export default defineConfig({
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 10_000,
  },
  retries: nodeEnv.CI ? 2 : 0,
  use: {
    baseURL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  webServer: {
    command: 'npm run build && npx vite preview --host localhost --port 4173',
    url: baseURL,
    reuseExistingServer: !nodeEnv.CI,
    timeout: 180_000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
