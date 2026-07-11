import { ChangeDetectionStrategy, Component } from '@angular/core';

import { StatusDotAccessibility } from './components/status-dot-accessibility';
import { StatusDotApi } from './components/status-dot-api';
import { StatusDotHero } from './components/status-dot-hero';
import { StatusDotPreview } from './components/status-dot-preview';
import { StatusDotStates } from './components/status-dot-states';
import { StatusDotTokens } from './components/status-dot-tokens';
import { StatusDotUsage } from './components/status-dot-usage';

@Component({
  selector: 'docs-status-dot-page',
  imports: [
    StatusDotHero,
    StatusDotPreview,
    StatusDotUsage,
    StatusDotStates,
    StatusDotTokens,
    StatusDotAccessibility,
    StatusDotApi,
  ],
  template: `
    <article>
      <docs-status-dot-hero />
      <docs-status-dot-preview />
      <docs-status-dot-usage />
      <docs-status-dot-states />
      <docs-status-dot-tokens />
      <docs-status-dot-accessibility />
      <docs-status-dot-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class StatusDotPage {}
