/// <reference types="vitest" />

import analog from '@analogjs/platform';
import tailwindcss from '@tailwindcss/vite';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

const chromeDevToolsProbePath =
  '/.well-known/appspecific/com.chrome.devtools.json';

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
            '/',
            '/components',
            '/components/accordion',
            '/components/avatar',
            '/components/badge',
            '/components/button',
            '/components/card',
            '/components/checkbox',
            '/components/dialog',
            '/components/image-card',
            '/components/input',
            '/components/input-group',
            '/components/label',
            '/components/marquee',
            '/components/select',
            '/components/textarea',
            '/components/title',
            '/docs',
            '/docs/introduction',
            '/docs/installation',
            '/docs/faq',
            '/showcase/portfolio',
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
