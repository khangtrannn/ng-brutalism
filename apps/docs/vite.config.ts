/// <reference types="vitest" />

import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    root: __dirname,
    cacheDir: `../../node_modules/.vite`,
    build: {
      outDir: '../../dist/apps/docs/client',
      reportCompressedSize: true,
      target: ['es2020'],
    },
    resolve: {
      alias: {
        '@ng-neo-brutalism/ui/styles.css': resolve(
          __dirname,
          '../../libs/ui/src/lib/styles/styles.css'
        ),
        '@ng-neo-brutalism/ui/theme.css': resolve(
          __dirname,
          '../../libs/ui/src/lib/styles/theme.css'
        ),
      },
    },
    server: {
      fs: {
        allow: ['.'],
      },
    },
    plugins: [
      tailwindcss(),
      analog({
        prerender: {
          routes: [
            '/',
            '/components/accordion',
            '/components/button',
            '/docs/accordion',
          ],
        },
      }),
      nxViteTsPaths(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['**/*.spec.ts'],
      reporters: ['default'],
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
