import { ChangeDetectionStrategy, Component } from '@angular/core';

import { SplitAccessibility } from './components/split-accessibility';
import { SplitAlignment } from './components/split-alignment';
import { SplitApi } from './components/split-api';
import { SplitCollapse } from './components/split-collapse';
import { SplitComposition } from './components/split-composition';
import { SplitGapsPadding } from './components/split-gaps-padding';
import { SplitHero } from './components/split-hero';
import { SplitPreview } from './components/split-preview';
import { SplitRatios } from './components/split-ratios';
import { SplitSeparators } from './components/split-separators';
import { SplitTokens } from './components/split-tokens';
import { SplitUsage } from './components/split-usage';

@Component({
  selector: 'docs-split-page',
  imports: [
    SplitHero,
    SplitPreview,
    SplitUsage,
    SplitRatios,
    SplitGapsPadding,
    SplitCollapse,
    SplitAlignment,
    SplitSeparators,
    SplitComposition,
    SplitTokens,
    SplitAccessibility,
    SplitApi,
  ],
  template: `
    <article>
      <docs-split-hero />
      <docs-split-preview />
      <docs-split-usage />
      <docs-split-ratios />
      <docs-split-gaps-padding />
      <docs-split-collapse />
      <docs-split-alignment />
      <docs-split-separators />
      <docs-split-composition />
      <docs-split-tokens />
      <docs-split-accessibility />
      <docs-split-api />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SplitPage {}
