import { ChangeDetectionStrategy, Component } from '@angular/core';

import { StatAccessibility } from './components/stat-accessibility';
import { StatApi } from './components/stat-api';
import { StatHero } from './components/stat-hero';
import { StatPreview } from './components/stat-preview';
import { StatRowDirection } from './components/stat-row-direction';
import { StatTokens } from './components/stat-tokens';
import { StatUsage } from './components/stat-usage';
import { StatWithIcon } from './components/stat-with-icon';

@Component({
  selector: 'docs-stat-page',
  imports: [
    StatHero,
    StatPreview,
    StatUsage,
    StatWithIcon,
    StatRowDirection,
    StatTokens,
    StatAccessibility,
    StatApi,
  ],
  template: `
    <article>
      <docs-stat-hero />
      <docs-stat-preview />
      <docs-stat-usage />
      <docs-stat-with-icon />
      <docs-stat-row-direction />
      <docs-stat-tokens />
      <docs-stat-accessibility />
      <docs-stat-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StatPage {}
