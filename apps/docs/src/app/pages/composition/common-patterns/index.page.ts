import { ChangeDetectionStrategy, Component } from '@angular/core';

import { CompositionCommonPatternsCalloutPanel } from './components/common-patterns-callout-panel';
import { CompositionCommonPatternsCardShell } from './components/common-patterns-card-shell';
import { CompositionCommonPatternsFeatureStack } from './components/common-patterns-feature-stack';
import { CompositionCommonPatternsOverview } from './components/common-patterns-overview';
import { CompositionCommonPatternsPrimitivesUsedPanel } from './components/common-patterns-primitives-used-panel';
import { CompositionCommonPatternsToolbarRow } from './components/common-patterns-toolbar-row';
import { CompositionCommonPatternsTwoColumnCard } from './components/common-patterns-two-column-card';

@Component({
  selector: 'docs-composition-common-patterns-page',
  imports: [
    CompositionCommonPatternsOverview,
    CompositionCommonPatternsCardShell,
    CompositionCommonPatternsToolbarRow,
    CompositionCommonPatternsFeatureStack,
    CompositionCommonPatternsCalloutPanel,
    CompositionCommonPatternsTwoColumnCard,
    CompositionCommonPatternsPrimitivesUsedPanel,
  ],
  template: `
    <article>
      <docs-composition-common-patterns-overview />
      <docs-composition-common-patterns-card-shell />
      <docs-composition-common-patterns-toolbar-row />
      <docs-composition-common-patterns-feature-stack />
      <docs-composition-common-patterns-callout-panel />
      <docs-composition-common-patterns-two-column-card />
      <docs-composition-common-patterns-primitives-used-panel />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class CommonPatternsPage {}
