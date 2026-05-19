import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  PLATFORM_ID,
  provideAppInitializer,
  DOCUMENT,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { NB_THEME_CONFIG, NbThemeConfig } from '../tokens/theme.tokens';

function applyThemeVars(doc: Document, config: NbThemeConfig): void {
  const root = doc.documentElement;
  const map: Record<keyof NbThemeConfig, string> = {
    primary: '--nb-primary',
    secondary: '--nb-secondary',
    accent: '--nb-accent',
    danger: '--nb-danger',
    success: '--nb-success',
    warning: '--nb-warning',
    radius: '--nb-radius',
    borderWidth: '--nb-border-width',
    shadowOffsetX: '--nb-shadow-offset-x',
    shadowOffsetY: '--nb-shadow-offset-y',
    fontSans: '--nb-font-sans',
    fontMono: '--nb-font-mono',
  };

  for (const [key, cssVar] of Object.entries(map)) {
    const value = config[key as keyof NbThemeConfig];
    if (value !== undefined) {
      root.style.setProperty(cssVar, value);
    }
  }
}

export interface NbConfig {
  theme?: NbThemeConfig;
}

export function provideNgBrutalism(
  config: NbConfig = {}
): EnvironmentProviders {
  return makeEnvironmentProviders([
    {
      provide: NB_THEME_CONFIG,
      useValue: config.theme ?? {},
    },
    provideAppInitializer(() => {
      const initializerFn = (() => {
        const doc = inject(DOCUMENT);
        const platformId = inject(PLATFORM_ID);
        const themeConfig = inject(NB_THEME_CONFIG);

        return () => {
          if (isPlatformBrowser(platformId)) {
            applyThemeVars(doc, themeConfig);
          }
        };
      })();
      return initializerFn();
    }),
  ]);
}
