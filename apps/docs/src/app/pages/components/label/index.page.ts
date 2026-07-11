import { ChangeDetectionStrategy, Component } from '@angular/core';

import { LabelAccessibility } from './components/label-accessibility';
import { LabelApi } from './components/label-api';
import { LabelDisabledControl } from './components/label-disabled-control';
import { LabelHero } from './components/label-hero';
import { LabelPreview } from './components/label-preview';
import { LabelTokens } from './components/label-tokens';
import { LabelUsage } from './components/label-usage';
import { LabelWithInput } from './components/label-with-input';

@Component({
  selector: 'docs-label-page',
  imports: [
    LabelHero,
    LabelPreview,
    LabelUsage,
    LabelWithInput,
    LabelDisabledControl,
    LabelTokens,
    LabelAccessibility,
    LabelApi,
  ],
  template: `
    <article>
      <docs-label-hero />
      <docs-label-preview />
      <docs-label-usage />
      <docs-label-with-input />
      <docs-label-disabled-control />
      <docs-label-tokens />
      <docs-label-accessibility />
      <docs-label-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class LabelPage {}
