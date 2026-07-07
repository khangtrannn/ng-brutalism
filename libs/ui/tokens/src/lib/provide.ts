import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';

/**
 * Registers ng-brutalism environment providers. Theming is CSS-only — redefine
 * the `--nb-*` custom properties in your own stylesheet (or swap in one of the
 * `theme-*.css` presets) rather than configuring theme values here. This
 * function is the reserved home for future runtime config (default tone,
 * density, a11y flags).
 */
export function provideNgBrutalism(): EnvironmentProviders {
  return makeEnvironmentProviders([]);
}
