import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import {
  provideFileRouter,
  requestContextInterceptor,
  withExtraRoutes,
} from '@analogjs/router';
import { provideNgBrutalism } from '@ng-brutalism/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(
      withExtraRoutes([
        {
          path: 'src/app/pages/showcase/portfolio.page.ts',
          redirectTo: '/showcase/portfolio',
          pathMatch: 'full',
        },
      ])
    ),
    provideNgBrutalism(),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    ),
  ],
};
