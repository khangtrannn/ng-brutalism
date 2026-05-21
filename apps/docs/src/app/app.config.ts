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

import { DocsTitleStrategy } from './docs/docs-title-strategy';
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
          path: '',
          redirectTo: '/docs/introduction',
          pathMatch: 'full',
        },
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
