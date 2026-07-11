import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ProgressAccessibility } from './components/progress-accessibility';
import { ProgressApi } from './components/progress-api';
import { ProgressHero } from './components/progress-hero';
import { ProgressPreview } from './components/progress-preview';
import { ProgressTokens } from './components/progress-tokens';
import { ProgressTones } from './components/progress-tones';
import { ProgressUsage } from './components/progress-usage';

@Component({
  selector: 'docs-progress-page',
  imports: [
    ProgressHero,
    ProgressPreview,
    ProgressUsage,
    ProgressTones,
    ProgressTokens,
    ProgressAccessibility,
    ProgressApi,
  ],
  template: `
    <article>
      <docs-progress-hero />
      <docs-progress-preview />
      <docs-progress-usage />
      <docs-progress-tones />
      <docs-progress-tokens />
      <docs-progress-accessibility />
      <docs-progress-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProgressPage {}
