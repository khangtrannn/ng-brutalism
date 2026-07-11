import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BadgeAccessibility } from './components/badge-accessibility';
import { BadgeApi } from './components/badge-api';
import { BadgeHero } from './components/badge-hero';
import { BadgePreview } from './components/badge-preview';
import { BadgeTokens } from './components/badge-tokens';
import { BadgeTones } from './components/badge-tones';
import { BadgeUsage } from './components/badge-usage';

@Component({
  selector: 'docs-badge-page',
  imports: [
    BadgeHero,
    BadgePreview,
    BadgeUsage,
    BadgeTones,
    BadgeTokens,
    BadgeAccessibility,
    BadgeApi,
  ],
  template: `
    <article>
      <docs-badge-hero />
      <docs-badge-preview />
      <docs-badge-usage />
      <docs-badge-tones />
      <docs-badge-tokens />
      <docs-badge-accessibility />
      <docs-badge-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class BadgePage {}
