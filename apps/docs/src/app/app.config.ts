import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFileRouter, requestContextInterceptor } from '@analogjs/router';
import { provideNgNeoBrutalism } from '@ng-neo-brutalism/ui';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideFileRouter(),
    provideNgNeoBrutalism(),
    provideClientHydration(),
    provideHttpClient(
      withFetch(),
      withInterceptors([requestContextInterceptor])
    ),
  ],
};
