import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vitest/config';

// Cascade behavior (inheritance, layers, precedence) needs a real browser;
// these specs drive Chromium through Playwright from a Node environment.
export default defineConfig({
  root: fileURLToPath(new URL('.', import.meta.url)),
  test: {
    environment: 'node',
    include: ['src/**/*.css-contract.spec.ts'],
    testTimeout: 30_000,
    hookTimeout: 60_000,
  },
});
