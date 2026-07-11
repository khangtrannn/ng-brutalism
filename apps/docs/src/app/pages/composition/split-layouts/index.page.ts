import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CompositionSplitLayoutsApi } from './components/split-layouts-api';
import { CompositionSplitLayoutsHeroSplit } from './components/split-layouts-hero-split';
import { CompositionSplitLayoutsHowItWorks } from './components/split-layouts-how-it-works';
import { CompositionSplitLayoutsMediaContent } from './components/split-layouts-media-content';
import { CompositionSplitLayoutsOverview } from './components/split-layouts-overview';
import { CompositionSplitLayoutsWhenToUse } from './components/split-layouts-when-to-use';

@Component({
  selector: 'docs-composition-split-layouts-page',
  imports: [
    CompositionSplitLayoutsOverview,
    CompositionSplitLayoutsHowItWorks,
    CompositionSplitLayoutsHeroSplit,
    CompositionSplitLayoutsMediaContent,
    CompositionSplitLayoutsApi,
    CompositionSplitLayoutsWhenToUse,
  ],
  template: `
    <article>
      <docs-composition-split-layouts-overview />
      <docs-composition-split-layouts-how-it-works />
      <docs-composition-split-layouts-hero-split />
      <docs-composition-split-layouts-media-content />
      <docs-composition-split-layouts-api />
      <docs-composition-split-layouts-when-to-use />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SplitLayoutsPage {}
