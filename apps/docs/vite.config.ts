/// <reference types="vitest" />

import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import { DOCS_PUBLIC_ROUTES } from './src/app/docs/docs-public-routes';

const chromeDevToolsProbePath =
  '/.well-known/appspecific/com.chrome.devtools.json';

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
        '@ng-brutalism/ui/styles.css': resolve(
          __dirname,
          '../../libs/ui/src/lib/styles/styles.css'
        ),
        '@ng-brutalism/ui/theme.css': resolve(
          __dirname,
          '../../libs/ui/src/lib/styles/theme.css'
        ),
      },
    },
    server: {
      fs: {
        allow: [resolve(__dirname, '../..')],
      },
    },
    plugins: [
      {
        name: 'docs-chrome-devtools-probe',
        configureServer(server) {
          server.middlewares.use((req, res, next) => {
            if (req.url === chromeDevToolsProbePath) {
              res.statusCode = 204;
              res.end();
              return;
            }

            next();
          });
        },
      },
      tailwindcss(),
      analog({
        prerender: {
          routes: [
            ...DOCS_PUBLIC_ROUTES.map((route) => route.path),
            '/components',
            '/docs',
          ],
        },
      }),
      nxViteTsPaths(),
    ],
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['src/test-setup.ts'],
      include: ['src/**/*.spec.ts'],
      reporters: ['default'],
    },
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
