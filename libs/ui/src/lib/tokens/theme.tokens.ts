import { InjectionToken } from '@angular/core';

export interface NbThemeConfig {
  primary?: string;
  secondary?: string;
  accent?: string;
  danger?: string;
  success?: string;
  warning?: string;
  radius?: string;
  borderWidth?: string;
  shadowOffsetX?: string;
  shadowOffsetY?: string;
  fontSans?: string;
  fontMono?: string;
}

export const NB_THEME_CONFIG = new InjectionToken<NbThemeConfig>(
  'NB_THEME_CONFIG'
);
