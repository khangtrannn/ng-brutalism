import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ComparisonCustomizationModel } from './components/comparison-customization-model';
import { ComparisonOverview } from './components/comparison-overview';
import { ComparisonWhenNotToUse } from './components/comparison-when-not-to-use';
import { ComparisonWhenToUse } from './components/comparison-when-to-use';

@Component({
  selector: 'docs-comparison-page',
  imports: [
    ComparisonCustomizationModel,
    ComparisonOverview,
    ComparisonWhenNotToUse,
    ComparisonWhenToUse,
  ],
  template: `
    <article>
      <docs-comparison-overview />
      <docs-comparison-when-to-use />
      <docs-comparison-when-not-to-use />
      <docs-comparison-customization-model />
    </article>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ComparisonPage {}
