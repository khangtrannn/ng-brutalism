import {
  ApplicationConfig,
  ErrorHandler,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { TitleStrategy, withInMemoryScrolling } from '@angular/router';
import {
  provideFileRouter,
  requestContextInterceptor,
  withExtraRoutes,
} from '@analogjs/router';
import { provideNgBrutalism } from '@ng-brutalism/ui';

import { DocsTitleStrategy } from '@ng-brutalism/docs-ui';
import { DocsErrorHandler } from './stale-build-reload';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideFileRouter(
      withInMemoryScrolling({
        anchorScrolling: 'enabled',
        scrollPositionRestoration: 'enabled',
      }),
      withExtraRoutes([
        {
          path: 'docs',
          redirectTo: '/docs/introduction',
          pathMatch: 'full',
        },
        {
          path: 'src/app/pages/showcase/portfolio.page.ts',
          redirectTo: '/showcase/portfolio',
          pathMatch: 'full',
        },
        {
          path: 'composition',
          loadComponent: () => import('./pages/composition.page'),
          children: [
            {
              path: '',
              redirectTo: '/composition/overview',
              pathMatch: 'full',
            },
            {
              path: 'overview',
              loadComponent: () => import('./pages/composition/overview.page'),
            },
            {
              path: 'surface-and-section',
              loadComponent: () =>
                import('./pages/composition/surface-and-section.page'),
            },
            {
              path: 'stack-and-cluster',
              loadComponent: () =>
                import('./pages/composition/stack-and-cluster.page'),
            },
            {
              path: 'split-layouts',
              loadComponent: () =>
                import('./pages/composition/split-layouts.page'),
            },
            {
              path: 'common-patterns',
              loadComponent: () =>
                import('./pages/composition/common-patterns.page'),
            },
          ],
        },
      ])
    ),
    { provide: ErrorHandler, useClass: DocsErrorHandler },
    { provide: TitleStrategy, useClass: DocsTitleStrategy },
    provideNgBrutalism(),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    ),
  ],
};
