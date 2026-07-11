import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ThemingBuildingYourOwn } from './components/theming-building-your-own';
import { ThemingDarkMode } from './components/theming-dark-mode';
import { ThemingOverview } from './components/theming-overview';
import { ThemingPresets } from './components/theming-presets';

@Component({
  selector: 'docs-theming-page',
  imports: [
    ThemingBuildingYourOwn,
    ThemingDarkMode,
    ThemingOverview,
    ThemingPresets,
  ],
  template: `
    <article>
      <docs-theming-overview />
      <docs-theming-presets />
      <docs-theming-building-your-own />
      <docs-theming-dark-mode />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ThemingPage {}
